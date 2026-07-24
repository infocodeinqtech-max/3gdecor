<?php

namespace App\Models;

use App\Models\Concerns\HasCmsActive;
use Illuminate\Database\Eloquent\Model;

class FooterContent extends Model
{
    use HasCmsActive;

    protected $table = 'footer_contents';

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }
}
