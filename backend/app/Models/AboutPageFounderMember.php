<?php

namespace App\Models;

use App\Models\Concerns\HasCmsActive;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AboutPageFounderMember extends Model
{
    use HasCmsActive;

    protected $table = 'about_page_founder_members';

    protected $guarded = [];

    public const SINGLETON_ID = 7;

    public const IMAGE_DIRECTORY = 'uploads/about/founders';

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