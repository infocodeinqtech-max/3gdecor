<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use App\Rules\IndianPhone;
use Illuminate\Http\Request;

class EnquiryController extends Controller
{
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
