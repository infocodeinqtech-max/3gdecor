<?php

namespace App\Support;

class PhoneValidator
{
    public static function digits(string $value): string
    {
        return preg_replace('/\D+/', '', $value) ?? '';
    }

    /** Exactly 10 digits, starts with 6–9. */
    public static function isIndianMobile(string $value): bool
    {
        $d = self::digits($value);

        return strlen($d) === 10 && (bool) preg_match('/^[6-9]\d{9}$/', $d);
    }

    /** Exactly 11 digits, starts with 0. */
    public static function isIndianLandline(string $value): bool
    {
        $d = self::digits($value);

        return strlen($d) === 11 && (bool) preg_match('/^0\d{10}$/', $d);
    }

    public static function isMobile(string $value): bool
    {
        return self::isIndianMobile($value);
    }

    public static function isMobileOrLandline(string $value): bool
    {
        return self::isIndianMobile($value) || self::isIndianLandline($value);
    }
}
