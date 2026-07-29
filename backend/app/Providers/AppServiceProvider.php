<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Avoid per-request DB writes / schema checks here — they slow every API call.
        // home_section_headers.content_table is set during section upsert / seeders.
    }
}
