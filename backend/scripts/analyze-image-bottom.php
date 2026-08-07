<?php

$files = $argv[1] ?? 'public/uploads/pages/projects/client/client-032.jpeg';
foreach (glob($files) ?: [$files] as $path) {
    if (! is_file($path)) {
        continue;
    }
    $img = imagecreatefromjpeg($path);
    $w = imagesx($img);
    $h = imagesy($img);
    echo basename($path) . " {$w}x{$h}\n";
    for ($y = $h - 1; $y >= max(0, $h - 120); $y -= 5) {
        $total = 0;
        $count = 0;
        for ($x = 0; $x < $w; $x += 15) {
            $rgb = imagecolorat($img, $x, $y);
            $r = ($rgb >> 16) & 0xFF;
            $g = ($rgb >> 8) & 0xFF;
            $b = $rgb & 0xFF;
            $total += ($r + $g + $b) / 3;
            $count++;
        }
        $avg = round($total / $count, 1);
        $bar = $avg > 220 ? 'WHITE' : ($avg > 180 ? 'light' : 'dark');
        echo "  y={$y} avg={$avg} ({$bar})\n";
    }
    imagedestroy($img);
    echo "\n";
}
