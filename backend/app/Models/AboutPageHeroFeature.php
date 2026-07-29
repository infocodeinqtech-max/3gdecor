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

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }

    public function hero(): BelongsTo
    {
        return $this->belongsTo(
            AboutPageHero::class,
            'about_page_hero_id',
            'id'
        );
    }
}