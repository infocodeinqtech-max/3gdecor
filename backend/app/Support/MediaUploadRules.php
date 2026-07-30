<?php

namespace App\Support;

/**
 * Shared media upload rules — keep in sync with frontend admin/utils/mediaUploadRules.ts
 */
class MediaUploadRules
{
    public const MAX_SIZE_KB = 2048; // 2 MB

    /** @var list<string> */
    public const ALLOWED_EXTENSIONS = ['jpeg', 'jpg', 'png', 'webp', 'gif'];

    /** @var list<string> */
    public const ALLOWED_MIME_TYPES = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
    ];

    /** @var list<string> */
    public const ALLOWED_SECTIONS = [
        'hero',
        'about',
        'expertise',
        'projects',
        'services',
        'testimonials',
        'contact',
        'footer',
        'pages/contact',
        'pages/about',
        'pages/services',
        'misc',
    ];

    /** @return list<string> */
    public static function fileRules(): array
    {
        $mimes = implode(',', self::ALLOWED_EXTENSIONS);
        $types = implode(',', self::ALLOWED_MIME_TYPES);

        return [
            'required',
            'file',
            'image',
            'mimes:'.$mimes,
            'mimetypes:'.$types,
            'max:'.self::MAX_SIZE_KB,
        ];
    }

    /** @return array<string, string> */
    public static function messages(): array
    {
        return [
            'file.required' => 'Please select an image file.',
            'file.file' => 'Upload must be a valid file.',
            'file.image' => 'Only image files are allowed.',
            'file.mimes' => 'Image must be jpeg, jpg, png, webp, or gif.',
            'file.mimetypes' => 'Image MIME type must be jpeg, png, webp, or gif.',
            'file.max' => 'Image must be under 2MB.',
            'section.required' => 'Upload section is required.',
        ];
    }
}
