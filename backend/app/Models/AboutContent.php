<?php

namespace App\Models;

use App\Models\Concerns\HasCmsActive;
use Illuminate\Database\Eloquent\Model;

class AboutContent extends Model
{
    use HasCmsActive;

    protected $table = 'about_contents';

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'images' => 'array',
            'active' => 'boolean',
        ];
    }
}
