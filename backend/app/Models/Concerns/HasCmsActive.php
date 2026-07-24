<?php

namespace App\Models\Concerns;

use Illuminate\Database\Eloquent\Builder;

trait HasCmsActive
{
    public function initializeHasCmsActive(): void
    {
        $this->casts['active'] = 'boolean';
    }

    protected static function bootHasCmsActive(): void
    {
        static::creating(function ($model): void {
            if ($model->active === null) {
                $model->active = true;
            }
        });
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where($query->getModel()->getTable().'.active', true);
    }

    public function deactivate(): bool
    {
        return $this->update(['active' => false]);
    }

    public function activate(): bool
    {
        return $this->update(['active' => true]);
    }
}
