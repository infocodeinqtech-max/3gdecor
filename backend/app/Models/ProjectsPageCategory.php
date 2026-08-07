<?php

namespace App\Models;

use App\Models\Concerns\HasCmsActive;
use Illuminate\Database\Eloquent\Model;

class ProjectsPageCategory extends Model
{
    use HasCmsActive;

    protected $table = 'projects_page_categories';

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'list_filters' => 'array',
            'active' => 'boolean',
        ];
    }
}
