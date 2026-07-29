<?php

namespace App\Models;

use App\Models\Concerns\HasCmsActive;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AboutPageHero extends Model
{
    use HasCmsActive;

    protected $table = 'about_page_heroes';

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }

    public function features(): HasMany
    {
        return $this->hasMany(
            AboutPageHeroFeature::class,
            'about_page_hero_id',
            'id'
        )->orderBy('sort_order');
    }
}