<?php

/**
 * Download external CMS images, lightly modify, save under public/uploads/{section}/
 * Run: php scripts/localize_images.php
 */

$root = dirname(__DIR__);
$uploads = $root.'/public/uploads';

$sections = [
    'about',
    'expertise',
    'projects',
    'services',
    'testimonials',
    'footer',
    'pages/about',
    'pages/services',
];

foreach ($sections as $section) {
    $dir = $uploads.'/'.$section;
    if (! is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
}

function downloadBinary(string $url): string
{
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT => 60,
        CURLOPT_USERAGENT => '3GDecoImageLocalizer/1.0',
        CURLOPT_SSL_VERIFYPEER => false,
    ]);
    $data = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($data === false || $code >= 400 || $data === '') {
        throw new RuntimeException("Download failed ({$code}): {$url}");
    }

    return $data;
}

/**
 * Light modification: re-encode JPEG, mild contrast + slight warm tint + re-compress.
 * Makes a practical local derivative for site use.
 */
function processAndSave(string $binary, string $destPath, int $maxWidth = 1600, int $quality = 82): void
{
    $img = @imagecreatefromstring($binary);
    if (! $img) {
        throw new RuntimeException('Invalid image data for '.$destPath);
    }

    $w = imagesx($img);
    $h = imagesy($img);

    if ($w > $maxWidth) {
        $nw = $maxWidth;
        $nh = (int) round($h * ($maxWidth / $w));
        $resized = imagecreatetruecolor($nw, $nh);
        imagecopyresampled($resized, $img, 0, 0, 0, 0, $nw, $nh, $w, $h);
        imagedestroy($img);
        $img = $resized;
        $w = $nw;
        $h = $nh;
    }

    // Mild contrast + slight warmth
    imagefilter($img, IMG_FILTER_CONTRAST, -8);
    imagefilter($img, IMG_FILTER_COLORIZE, 8, 4, -2, 0);
    imagefilter($img, IMG_FILTER_BRIGHTNESS, 4);

    // Tiny 1px crop shuffle to further differentiate bytes
    if ($w > 4 && $h > 4) {
        $cropped = imagecreatetruecolor($w - 1, $h - 1);
        imagecopy($cropped, $img, 0, 0, 1, 1, $w - 1, $h - 1);
        imagedestroy($img);
        $img = $cropped;
    }

    if (! imagejpeg($img, $destPath, $quality)) {
        imagedestroy($img);
        throw new RuntimeException('Failed writing '.$destPath);
    }
    imagedestroy($img);
}

$jobs = [
    // About (reuse local assets + lightly process)
    ['about', 'about-1.jpg', null, $root.'/../frontend/src/assets/images/about1.jpg', 900],
    ['about', 'about-2.jpg', null, $root.'/../frontend/src/assets/images/about2.jpg', 900],
    ['about', 'about-3.jpg', null, $root.'/../frontend/src/assets/images/about3.jpg', 900],
    ['about', 'about-4.jpg', null, $root.'/../frontend/src/assets/images/about4.jpg', 900],
    ['about', 'badge.jpg', null, $root.'/../frontend/src/assets/images/3g-badge.png', 400],

    // Expertise
    ['expertise', 'expertise-1.jpg', 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=1200', null, 1000],
    ['expertise', 'expertise-2.jpg', 'https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=1200', null, 1000],
    ['expertise', 'expertise-3.jpg', 'https://images.unsplash.com/photo-1646987916641-1f3c8992daa2?w=1200', null, 1000],

    // Projects
    ['projects', 'project-1.jpg', 'https://images.unsplash.com/photo-1724582586495-d050726cf354?w=1200', null, 1000],
    ['projects', 'project-2.jpg', 'https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=1200', null, 1000],
    ['projects', 'project-3.jpg', 'https://images.unsplash.com/photo-1648881806148-e5c51179c826?w=1200', null, 1000],
    ['projects', 'project-4.jpg', 'https://images.unsplash.com/photo-1663811397219-c572550dffc5?w=1200', null, 1000],
    ['projects', 'project-5.jpg', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200', null, 1000],

    // Services (homepage CMS)
    ['services', 'service-1.jpg', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600', null, 1600],
    ['services', 'service-2.jpg', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600', null, 1600],
    ['services', 'service-3.jpg', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600', null, 1600],
    ['services', 'service-4.jpg', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600', null, 1600],
    ['services', 'service-5.jpg', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600', null, 1600],
    ['services', 'service-6.jpg', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600', null, 1600],

    // Testimonials
    ['testimonials', 'testimonial-1.jpg', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', null, 400],
    ['testimonials', 'testimonial-2.jpg', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', null, 400],
    ['testimonials', 'testimonial-3.jpg', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', null, 400],

    // Footer bg
    ['footer', 'footer-bg.jpg', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600', null, 1600],

    // About page team
    ['pages/about', 'team-1.jpg', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800', null, 700],
    ['pages/about', 'team-2.jpg', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', null, 700],
    ['pages/about', 'team-3.jpg', 'https://images.unsplash.com/photo-1543949806-2c9935e6aa78?w=800', null, 700],
    ['pages/about', 'team-4.jpg', 'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?w=800', null, 700],

    // Services page gallery
    ['pages/services', 'gallery-1.jpg', 'https://images.unsplash.com/photo-1715593949273-09009558300a?w=1200', null, 1100],
    ['pages/services', 'gallery-2.jpg', 'https://images.unsplash.com/photo-1690999934686-85806c270eb7?w=1200', null, 1100],
    ['pages/services', 'gallery-3.jpg', 'https://images.unsplash.com/photo-1608303588026-884930af2559?w=1200', null, 1100],
    ['pages/services', 'gallery-4.jpg', 'https://images.unsplash.com/photo-1766475554436-82d116d96c60?w=1200', null, 1100],
    ['pages/services', 'gallery-5.jpg', 'https://images.unsplash.com/photo-1706074793638-da28b90ea8ae?w=1200', null, 1100],
    ['pages/services', 'gallery-6.jpg', 'https://images.unsplash.com/photo-1740759546813-6b58d44f5dce?w=1200', null, 1100],
    ['pages/services', 'process-1.jpg', 'https://images.unsplash.com/photo-1608303588026-884930af2559?w=800', null, 700],
    ['pages/services', 'process-2.jpg', 'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800', null, 700],
    ['pages/services', 'process-3.jpg', 'https://images.unsplash.com/photo-1766475554436-82d116d96c60?w=800', null, 700],
    ['pages/services', 'process-4.jpg', 'https://images.unsplash.com/photo-1706074793638-da28b90ea8ae?w=800', null, 700],
];

$ok = 0;
$fail = 0;

foreach ($jobs as [$section, $file, $url, $local, $maxW]) {
    $dest = $uploads.'/'.$section.'/'.$file;
    echo "→ {$section}/{$file} ... ";
    try {
        if ($local && is_file($local)) {
            $binary = file_get_contents($local);
        } elseif ($url) {
            $binary = downloadBinary($url);
        } else {
            throw new RuntimeException('No source');
        }
        processAndSave($binary, $dest, $maxW);
        echo 'OK ('.filesize($dest)." bytes)\n";
        $ok++;
    } catch (Throwable $e) {
        echo 'FAIL: '.$e->getMessage()."\n";
        $fail++;
    }
}

echo "\nDone. Success: {$ok}, Failed: {$fail}\n";
echo "Uploads root: {$uploads}\n";
