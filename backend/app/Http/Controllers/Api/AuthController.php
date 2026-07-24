<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * POST /api/auth/login
     * Body: email, password, role (optional filter)
     */
    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'role' => ['nullable', 'in:superadmin,admin'],
        ]);

        $query = User::query()
            ->where('email', $data['email'])
            ->where('active', true);

        if (! empty($data['role'])) {
            $query->where('role', $data['role']);
        }

        $user = $query->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Invalid email or password.'],
            ]);
        }

        // One token per login session
        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'token' => $token,
            'user' => $user->toPublicArray(),
        ]);
    }

    /**
     * POST /api/auth/logout
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out.',
        ]);
    }

    /**
     * GET /api/auth/me
     */
    public function me(Request $request)
    {
        return response()->json([
            'success' => true,
            'user' => $request->user()->toPublicArray(),
        ]);
    }

    /**
     * POST /api/auth/change-password
     */
    public function changePassword(Request $request)
    {
        $data = $request->validate([
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);

        $user = $request->user();

        if (! Hash::check($data['current_password'], $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Current password is incorrect.'],
            ]);
        }

        $user->update(['password' => $data['password']]);

        return response()->json([
            'success' => true,
            'message' => 'Password updated.',
        ]);
    }
}
