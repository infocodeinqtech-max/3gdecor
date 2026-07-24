<?php

namespace App\Models;

use App\Models\Concerns\HasCmsActive;
use Illuminate\Database\Eloquent\Model;

class SectionHeader extends Model
{
    use HasCmsActive;

    protected $table = 'section_headers';

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }
}
