<?php

namespace App\Models;

use App\Models\Concerns\HasCmsActive;
use Illuminate\Database\Eloquent\Model;

class Enquiry extends Model
{
    use HasCmsActive;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'service',
        'message',
        'status',
        'active',
    ];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }
}
