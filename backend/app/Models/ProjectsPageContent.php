<?php

namespace App\Models;

use App\Models\Concerns\HasCmsActive;
use Illuminate\Database\Eloquent\Model;

class ProjectsPageContent extends Model
{
    use HasCmsActive;

    protected $table = 'projects_page_contents';

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'stats' => 'array',
            'active' => 'boolean',
        ];
    }
}
