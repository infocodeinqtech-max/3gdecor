<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Support\MediaUploadRules;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * Save admin-uploaded images under public/uploads/{section}/...
 */
class MediaUploadController extends Controller
{
    /**
     * POST /api/media/upload
     * multipart: section + file
     */
    public function upload(Request $request)
    {
        $validated = $request->validate([
            'section' => ['required', 'string', 'max:80'],
            'file' => MediaUploadRules::fileRules(),
        ], MediaUploadRules::messages());

        $section = $this->normalizeSection($validated['section']);
        if ($section === '' || ! in_array($section, MediaUploadRules::ALLOWED_SECTIONS, true)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid upload section.',
            ], 422);
        }

        $file = $validated['file'];
        $ext = strtolower($file->getClientOriginalExtension() ?: 'jpg');
        if ($ext === 'jpeg') {
            $ext = 'jpg';
        }
        if (! in_array($ext, MediaUploadRules::ALLOWED_EXTENSIONS, true)) {
            return response()->json([
                'success' => false,
                'message' => 'Image must be jpeg, jpg, png, webp, or gif.',
            ], 422);
        }

        $filename = now()->format('YmdHis').'-'.Str::lower(Str::random(8)).'.'.$ext;
        $dir = public_path('uploads/'.$section);
        if (! is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        $file->move($dir, $filename);

        $path = '/uploads/'.$section.'/'.$filename;

        return response()->json([
            'success' => true,
            'data' => [
                'path' => $path,
                'section' => $section,
                'filename' => $filename,
            ],
        ], 201);
    }

    private function normalizeSection(string $section): string
    {
        $section = str_replace('\\', '/', trim($section));
        $section = preg_replace('#/+#', '/', $section) ?? $section;
        $section = trim($section, '/');
        $section = strtolower($section);

        if (str_contains($section, '..')) {
            return '';
        }

        return $section;
    }
}
