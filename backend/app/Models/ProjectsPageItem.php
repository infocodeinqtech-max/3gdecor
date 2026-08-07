<?php

namespace App\Models;

use App\Models\Concerns\HasCmsActive;
use Illuminate\Database\Eloquent\Model;

/**
 * Unified project record: listing/featured card fields + detail page content.
 *
 * Card fields: category_id, title, location, filter_tag, image, slug, sort_order, active
 * Detail fields: hero_tagline, status_label, hero_slides, about_*, stat_*, gallery_*
 */
class ProjectsPageItem extends Model
{
    use HasCmsActive;

    protected $table = 'projects_page_items';

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'hero_slides' => 'array',
            'about_features' => 'array',
            'gallery_images' => 'array',
            'active' => 'boolean',
        ];
    }
}
