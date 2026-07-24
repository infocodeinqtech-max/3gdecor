<?php

namespace App\Models;

use App\Models\Concerns\HasCmsActive;
use Illuminate\Database\Eloquent\Model;

class TestimonialContent extends Model
{
    use HasCmsActive;

    protected $table = 'testimonials_contents';

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }
}
