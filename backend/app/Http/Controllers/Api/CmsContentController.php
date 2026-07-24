<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CmsContent;
use Illuminate\Http\Request;

class CmsContentController extends Controller
{
    /**
     * GET /api/cms
     * List all CMS keys (admin)
     */
    public function index()
    {
        $items = CmsContent::query()
            ->orderBy('key')
            ->get()
            ->map(fn (CmsContent $row) => [
                'key' => $row->key,
                'type' => $row->type,
                'data' => $row->data,
                'updated_at' => $row->updated_at?->toIso8601String(),
            ]);

        return response()->json([
            'success' => true,
            'data' => $items,
        ]);
    }

    /**
     * GET /api/cms/{key}
     * Public-friendly: returns data for one key
     */
    public function show(string $key)
    {
        $row = CmsContent::query()->where('key', $key)->first();

        return response()->json([
            'success' => true,
            'key' => $key,
            'data' => $row?->data,
        ]);
    }

    /**
     * PUT /api/cms/{key}
     * Create or update CMS JSON for a key
     */
    public function upsert(Request $request, string $key)
    {
        $data = $request->validate([
            'data' => ['required'],
            'type' => ['nullable', 'in:singleton,list,json'],
        ]);

        $type = $data['type'] ?? (is_array($data['data']) && array_is_list($data['data']) ? 'list' : 'singleton');

        $row = CmsContent::query()->updateOrCreate(
            ['key' => $key],
            [
                'type' => $type,
                'data' => $data['data'],
            ]
        );

        return response()->json([
            'success' => true,
            'key' => $row->key,
            'type' => $row->type,
            'data' => $row->data,
        ]);
    }

    /**
     * DELETE /api/cms/{key}
     */
    public function destroy(string $key)
    {
        CmsContent::query()->where('key', $key)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Content deleted.',
        ]);
    }
}
