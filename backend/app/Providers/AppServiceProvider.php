<?php

namespace App\Providers;

use App\Support\CmsRegistry;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Keep home_section_headers.content_table in sync with model table names
        try {
            if (Schema::hasTable('home_section_headers') && Schema::hasColumn('home_section_headers', 'content_table')) {
                CmsRegistry::syncSectionContentTables();
            }
        } catch (\Throwable) {
            // DB may not be ready during early boot / package discovery
        }
    }
}
