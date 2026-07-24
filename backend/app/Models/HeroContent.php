<?php

namespace App\Models;

use App\Models\Concerns\HasCmsActive;
use Illuminate\Database\Eloquent\Model;

class HeroContent extends Model
{
    use HasCmsActive;

    protected $table = 'hero_contents';

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'stats' => 'array',
            'active' => 'boolean',
        ];
    }
}
