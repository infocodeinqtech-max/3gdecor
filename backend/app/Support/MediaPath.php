<?php

namespace App\Support;

/**
 * Helpers for public upload paths used by CMS and seeders.
 */
class MediaPath
{
    /** Relative path stored in DB, e.g. /uploads/expertise/expertise-1.jpg */
    public static function path(string $section, string $filename): string
    {
        return '/uploads/'.trim($section, '/').'/'.ltrim($filename, '/');
    }

    /** Absolute public URL for API consumers / seed dumps */
    public static function url(string $section, string $filename): string
    {
        $base = rtrim((string) config('app.url'), '/');

        return $base.self::path($section, $filename);
    }
}
