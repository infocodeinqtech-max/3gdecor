<?php

namespace App\Models;

use App\Models\Concerns\HasCmsActive;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AboutPagePrinciple extends Model
{
    use HasCmsActive;

    protected $table = 'about_page_principles';

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }

    public function about(): BelongsTo
    {
        return $this->belongsTo(
            AboutContent::class,
            'home_about_contents_id',
            'id'
        );
    }
}
