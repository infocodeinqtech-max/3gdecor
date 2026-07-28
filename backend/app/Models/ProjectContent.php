<?php

namespace App\Models;

use App\Models\Concerns\HasCmsActive;
use Illuminate\Database\Eloquent\Model;

class ProjectContent extends Model
{
    use HasCmsActive;

    protected $table = 'home_projects_contents';

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'featured' => 'boolean',
            'active' => 'boolean',
        ];
    }
}
