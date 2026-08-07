<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('projects_page_items')) {
            return;
        }

        DB::statement(
            "ALTER TABLE projects_page_items COMMENT = 'Unified CMS: featured/listing card + project detail page per row'"
        );
    }

    public function down(): void
    {
        if (! Schema::hasTable('projects_page_items')) {
            return;
        }

        DB::statement('ALTER TABLE projects_page_items COMMENT = \'\'');
    }
};
