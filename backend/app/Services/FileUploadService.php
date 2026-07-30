<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadService
{
    /**
     * Store a new file and return its path.
     */
    public static function store(UploadedFile $file, string $directory, string $disk = 'public'): string {

        $fileName = Str::uuid() . '.' . $file->extension();

        return $file->storeAs(
            $directory,
            $fileName,
            $disk
        );
    }

    /**
     * Replace an existing file with a new one.
     */
    public static function replace(UploadedFile $file, ?string $oldFilePath, string $directory, string $disk = 'public'): string {

        // Delete old file if exists
        if ($oldFilePath && Storage::disk($disk)->exists($oldFilePath)) {
            Storage::disk($disk)->delete($oldFilePath);
        }

        // Store new file
        return self::store(
            $file,
            $directory,
            $disk
        );
    }

    /**
     * Delete a file.
     */
    public static function delete(?string $filePath,string $disk = 'public'): bool {

        if (!$filePath) {
            return false;
        }

        if (Storage::disk($disk)->exists($filePath)) {
            return Storage::disk($disk)->delete($filePath);
        }

        return false;
    }
}