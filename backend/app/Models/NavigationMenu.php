<?php

namespace App\Models;

use App\Models\Concerns\HasCmsActive;
use Illuminate\Database\Eloquent\Model;

class NavigationMenu extends Model
{
    use HasCmsActive;

    protected $table = 'navigation_menus';

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'visible' => 'boolean',
            'active' => 'boolean',
        ];
    }
}
