<?php

namespace App\Models;

use App\Models\Concerns\HasCmsActive;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AboutPageHeroFeature extends Model
{
    use HasCmsActive;

    protected $table = 'about_page_hero_features';

    protected $guarded = [];

    public const SINGLETON_ID = 7;

    public const IMAGE_DIRECTORY = 'uploads/about/hero';

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }

    public function hero(): BelongsTo
    {
        return $this->belongsTo(
            AboutContent::class,
            'home_about_contents_id',
            'id'
        );
    }
}