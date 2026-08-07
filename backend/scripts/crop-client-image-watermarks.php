<?php

/**
 * Crop vivo/Zeiss camera watermark bars from client project images.
 * Removes the light metadata strip at the bottom of phone photos.
 */

$targetDir = $argv[1] ?? (__DIR__ . '/../public/uploads/pages/projects/client');
$maxPasses = (int) ($argv[2] ?? 3);

if (! is_dir($targetDir)) {
    fwrite(STDERR, "Directory not found: {$targetDir}\n");
    exit(1);
}

$files = glob(rtrim($targetDir, '\\/') . '/*.{jpg,jpeg,JPG,JPEG,png,PNG}', GLOB_BRACE) ?: [];
sort($files);

if (! $files) {
    fwrite(STDERR, "No images found in {$targetDir}\n");
    exit(1);
}

function loadImage(string $path): ?GdImage
{
    $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));

    return match ($ext) {
        'jpg', 'jpeg' => @imagecreatefromjpeg($path) ?: null,
        'png' => @imagecreatefrompng($path) ?: null,
        default => null,
    };
}

function saveImage(GdImage $image, string $path): bool
{
    $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));

    return match ($ext) {
        'jpg', 'jpeg' => imagejpeg($image, $path, 92),
        'png' => imagepng($image, $path, 6),
        default => false,
    };
}

function rowBrightness(GdImage $image, int $y, int $width): float
{
    $step = max(1, (int) floor($width / 160));
    $total = 0;
    $count = 0;

    for ($x = 0; $x < $width; $x += $step) {
        $rgb = imagecolorat($image, $x, $y);
        $r = ($rgb >> 16) & 0xFF;
        $g = ($rgb >> 8) & 0xFF;
        $b = $rgb & 0xFF;
        $total += ($r + $g + $b) / 3;
        $count++;
    }

    return $count ? $total / $count : 0;
}

function cornerBrightness(GdImage $image, int $height, int $width): float
{
    $sampleYs = [];
    for ($y = $height - 1; $y >= max(0, $height - 90); $y -= 8) {
        $sampleYs[] = $y;
    }

    $total = 0;
    $count = 0;

    foreach ($sampleYs as $y) {
        foreach ([12, 36, $width - 36, $width - 12] as $x) {
            if ($x < 0 || $x >= $width) {
                continue;
            }
            $rgb = imagecolorat($image, $x, $y);
            $r = ($rgb >> 16) & 0xFF;
            $g = ($rgb >> 8) & 0xFF;
            $b = $rgb & 0xFF;
            $total += ($r + $g + $b) / 3;
            $count++;
        }
    }

    return $count ? $total / $count : 0;
}

function detectWatermarkHeight(GdImage $image): int
{
    $width = imagesx($image);
    $height = imagesy($image);

    if ($width <= 0 || $height <= 0) {
        return 0;
    }

    $maxScan = (int) max(80, round($height * 0.16));
    $watermarkThreshold = 198;
    $transitionThreshold = 188;
    $watermarkTop = $height;

    for ($y = $height - 1; $y >= max(0, $height - $maxScan); $y--) {
        if (rowBrightness($image, $y, $width) >= $watermarkThreshold) {
            $watermarkTop = $y;
            continue;
        }

        break;
    }

    if ($watermarkTop >= $height) {
        return 0;
    }

    for ($y = $watermarkTop - 1; $y >= max(0, $watermarkTop - 20); $y--) {
        if (rowBrightness($image, $y, $width) >= $transitionThreshold) {
            $watermarkTop = $y;
            continue;
        }

        break;
    }

    $crop = $height - $watermarkTop + 12;
    $crop = min($crop, $maxScan);

    if ($crop < 24) {
        return 0;
    }

    $corners = cornerBrightness($image, $height, $width);
    if ($corners < 185 && $crop < 40) {
        return 0;
    }

    return max(0, $crop);
}

function cropImage(string $file): ?string
{
    $image = loadImage($file);
    if (! $image) {
        return null;
    }

    $width = imagesx($image);
    $height = imagesy($image);
    $crop = detectWatermarkHeight($image);

    if ($crop <= 0 || $crop >= $height - 40) {
        imagedestroy($image);

        return null;
    }

    $newHeight = $height - $crop;
    $cropped = imagecreatetruecolor($width, $newHeight);
    if (! $cropped) {
        imagedestroy($image);

        return null;
    }

    imagecopy($cropped, $image, 0, 0, 0, 0, $width, $newHeight);
    imagedestroy($image);

    if (! saveImage($cropped, $file)) {
        imagedestroy($cropped);

        return null;
    }

    imagedestroy($cropped);

    return "{$width}x{$height} -> {$width}x{$newHeight} (-{$crop}px)";
}

$processed = 0;
$skipped = 0;

foreach ($files as $file) {
    $result = null;

    for ($pass = 1; $pass <= $maxPasses; $pass++) {
        $passResult = cropImage($file);
        if (! $passResult) {
            break;
        }

        $result = $passResult;
    }

    if ($result) {
        $processed++;
        echo basename($file) . " cropped {$result}\n";
    } else {
        $skipped++;
    }
}

echo "Done. Processed: {$processed}, skipped: {$skipped}\n";
