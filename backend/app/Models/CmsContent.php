<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsContent extends Model
{
    protected $fillable = [
        'key',
        'type',
        'data',
    ];

    protected function casts(): array
    {
        return [
            'data' => 'array',
        ];
    }
}
