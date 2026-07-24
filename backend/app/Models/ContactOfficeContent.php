<?php

namespace App\Models;

use App\Models\Concerns\HasCmsActive;
use Illuminate\Database\Eloquent\Model;

class ContactOfficeContent extends Model
{
    use HasCmsActive;

    protected $table = 'contact_office_contents';

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }
}
