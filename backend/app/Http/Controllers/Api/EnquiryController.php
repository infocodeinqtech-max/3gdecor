<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use App\Rules\IndianPhone;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EnquiryController extends Controller
{
    private const OTP_CACHE_PREFIX = 'enquiry_otp:';
    private const OTP_RATE_PREFIX = 'enquiry_otp_rate:';

    /**
     * GET /api/enquiries  (admin) — active only
     */
    public function index()
    {
        $items = Enquiry::query()
            ->active()
            ->latest()
            ->get()
            ->map(fn (Enquiry $e) => $this->format($e));

        return response()->json([
            'success' => true,
            'data' => $items,
        ]);
    }

    /**
     * POST /api/enquiries  (public contact form)
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email:filter', 'max:190'],
            'phone' => ['required', 'string', 'max:40', new IndianPhone(false)],
            'service' => ['nullable', 'string', 'max:100'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $enquiry = Enquiry::query()->create([
            ...$data,
            'status' => 'new',
            'active' => true,
        ]);

        return response()->json([
            'success' => true,
            'data' => $this->format($enquiry),
        ], 201);
    }

    /**
     * POST /api/enquiries/otp/send  (public contact form)
     */
    public function sendOtp(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email:filter', 'max:190'],
            'phone' => ['required', 'string', 'max:40', new IndianPhone(false)],
            'service' => ['nullable', 'string', 'max:100'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $rateKey = self::OTP_RATE_PREFIX.sha1(strtolower($data['email']).'|'.$request->ip());
        $sentCount = (int) Cache::get($rateKey, 0);
        if ($sentCount >= 5) {
            abort(429, 'Too many OTP requests. Please try again later.');
        }

        $ttlMinutes = max(1, (int) env('ENQUIRY_OTP_TTL_MINUTES', 10));
        $testOtp = trim((string) env('ENQUIRY_TEST_OTP', '999999'));
        $otp = $testOtp !== '' ? $testOtp : (string) random_int(100000, 999999);
        $verificationToken = (string) Str::uuid();

        Cache::put(self::OTP_CACHE_PREFIX.$verificationToken, [
            'otp_hash' => Hash::make($otp),
            'attempts' => 0,
            'payload' => $data,
        ], now()->addMinutes($ttlMinutes));

        Cache::put($rateKey, $sentCount + 1, now()->addHour());

        if ($testOtp === '') {
            Mail::raw(
                "Your OTP for enquiry submission is: {$otp}\n\nThis OTP is valid for {$ttlMinutes} minutes.",
                function ($message) use ($data): void {
                    $message
                        ->to($data['email'])
                        ->from(
                            env('ENQUIRY_OTP_FROM_ADDRESS', 'info.codeinqtech@gmail.com'),
                            env('ENQUIRY_OTP_FROM_NAME', env('APP_NAME', '3G Decorative Group'))
                        )
                        ->subject('Enquiry OTP Verification');
                }
            );
        }

        return response()->json([
            'success' => true,
            'message' => $testOtp !== ''
                ? 'Test OTP generated successfully.'
                : 'OTP sent to your email address.',
            'verification_token' => $verificationToken,
            'expires_in' => $ttlMinutes * 60,
            'test_mode' => $testOtp !== '',
        ]);
    }

    /**
     * POST /api/enquiries/otp/verify  (public contact form)
     */
    public function verifyOtp(Request $request)
    {
        $data = $request->validate([
            'verification_token' => ['required', 'uuid'],
            'otp' => ['required', 'digits:6'],
        ]);

        $key = self::OTP_CACHE_PREFIX.$data['verification_token'];
        $pending = Cache::get($key);

        if (! is_array($pending)) {
            abort(410, 'OTP expired or invalid. Please request a new OTP.');
        }

        $attempts = (int) ($pending['attempts'] ?? 0);
        if ($attempts >= 5) {
            Cache::forget($key);
            abort(422, 'Too many invalid attempts. Please request a new OTP.');
        }

        if (! Hash::check($data['otp'], (string) ($pending['otp_hash'] ?? ''))) {
            $pending['attempts'] = $attempts + 1;
            Cache::put($key, $pending, now()->addMinutes(max(1, (int) env('ENQUIRY_OTP_TTL_MINUTES', 10))));
            abort(422, 'Invalid OTP. Please try again.');
        }

        $payload = $pending['payload'] ?? null;
        if (! is_array($payload)) {
            Cache::forget($key);
            abort(422, 'Invalid verification payload. Please submit again.');
        }

        $enquiry = Enquiry::query()->create([
            ...$payload,
            'status' => 'new',
            'active' => true,
        ]);

        Cache::forget($key);

        return response()->json([
            'success' => true,
            'data' => $this->format($enquiry),
        ], 201);
    }

    /**
     * PATCH /api/enquiries/{id}
     */
    public function update(Request $request, int $id)
    {
        $enquiry = Enquiry::query()->active()->findOrFail($id);

        $data = $request->validate([
            'status' => ['required', 'string'],
        ]);

        $statusMap = [
            'New' => 'new',
            'In Review' => 'in_progress',
            'Closed' => 'closed',
            'new' => 'new',
            'in_progress' => 'in_progress',
            'closed' => 'closed',
        ];

        $status = $statusMap[$data['status']] ?? null;
        if (! $status) {
            abort(422, 'Invalid status.');
        }

        $enquiry->update(['status' => $status]);

        return response()->json([
            'success' => true,
            'data' => $this->format($enquiry),
        ]);
    }

    /**
     * DELETE /api/enquiries/{id} — soft deactivate
     */
    public function destroy(int $id)
    {
        $enquiry = Enquiry::query()->findOrFail($id);
        $enquiry->deactivate();

        return response()->json([
            'success' => true,
            'message' => 'Enquiry deactivated.',
        ]);
    }

    private function format(Enquiry $e): array
    {
        $statusMap = [
            'new' => 'New',
            'in_progress' => 'In Review',
            'closed' => 'Closed',
        ];

        return [
            'id' => (string) $e->id,
            'name' => $e->name,
            'email' => $e->email,
            'phone' => $e->phone,
            'service' => $e->service,
            'message' => $e->message,
            'status' => $statusMap[$e->status] ?? $e->status,
            'date' => $e->created_at?->toDateString(),
            'createdAt' => $e->created_at?->toIso8601String(),
            'active' => (bool) $e->active,
        ];
    }
}
