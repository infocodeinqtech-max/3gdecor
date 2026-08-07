<?php

$dir = $argv[1] ?? 'public/uploads/pages/projects/client';
$files = glob(rtrim($dir, '\\/') . '/*.jpeg') ?: [];
$issues = [];

foreach ($files as $path) {
    $img = imagecreatefromjpeg($path);
    $w = imagesx($img);
    $h = imagesy($img);
    $total = 0;
    $count = 0;
    for ($x = 0; $x < $w; $x += 20) {
        $rgb = imagecolorat($img, $x, $h - 1);
        $total += ((($rgb >> 16) & 255) + (($rgb >> 8) & 255) + ($rgb & 255)) / 3;
        $count++;
    }
    $avg = $total / $count;
    if ($avg >= 200) {
        $issues[] = basename($path) . " bottom_avg={$avg}";
    }
    imagedestroy($img);
}

if ($issues) {
    echo "Remaining issues:\n" . implode("\n", $issues) . "\n";
} else {
    echo "All " . count($files) . " images look clean at bottom.\n";
}
