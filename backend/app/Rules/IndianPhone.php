<?php

namespace App\Rules;

use App\Support\PhoneValidator;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class IndianPhone implements ValidationRule
{
    public function __construct(
        private readonly bool $allowLandline = false,
    ) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_string($value) || trim($value) === '') {
            $fail('Enter a valid phone number.');

            return;
        }

        $ok = $this->allowLandline
            ? PhoneValidator::isMobileOrLandline($value)
            : PhoneValidator::isMobile($value);

        if (! $ok) {
            $fail(
                $this->allowLandline
                    ? 'Enter a 10-digit mobile (6–9…) or 11-digit landline (0…).'
                    : 'Enter a valid 10-digit Indian mobile number (starts with 6–9).'
            );
        }
    }
}
