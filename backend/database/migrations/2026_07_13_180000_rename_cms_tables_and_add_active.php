<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Renames legacy CMS table names, adds `active` flags, and
 * stores related content table names on section_headers.
 *
 * Safe for DBs that already ran the old create migration.
 * No-ops cleanly when tables already use the new names.
 */
return new class extends Migration
{
    private array $renames = [
        'navigation_items' => 'navigation_menus',
        'expertise_items' => 'expertise_contents',
        'projects' => 'projects_contents',
        'services' => 'services_contents',
        'process_steps' => 'process_contents',
        'testimonials' => 'testimonials_contents',
    ];

    private array $cmsTables = [
        'navigation_menus',
        'hero_contents',
        'about_contents',
        'section_headers',
        'expertise_contents',
        'projects_contents',
        'services_contents',
        'process_contents',
        'testimonials_contents',
        'footer_contents',
        'enquiries',
    ];

    private array $sectionContentTables = [
        'expertise' => 'expertise_contents',
        'projects' => 'projects_contents',
        'services' => 'services_contents',
        'process' => 'process_contents',
        'testimonials' => 'testimonials_contents',
    ];

    public function up(): void
    {
        foreach ($this->renames as $from => $to) {
            if (Schema::hasTable($from) && ! Schema::hasTable($to)) {
                Schema::rename($from, $to);
            }
        }

        foreach ($this->cmsTables as $table) {
            if (! Schema::hasTable($table)) {
                continue;
            }
            Schema::table($table, function (Blueprint $blueprint) use ($table) {
                if (! Schema::hasColumn($table, 'active')) {
                    $blueprint->boolean('active')->default(true)->after('id');
                }
            });
        }

        if (Schema::hasTable('section_headers') && ! Schema::hasColumn('section_headers', 'content_table')) {
            Schema::table('section_headers', function (Blueprint $table) {
                $table->string('content_table')->nullable()->after('key');
            });
        }

        if (Schema::hasTable('section_headers') && Schema::hasColumn('section_headers', 'content_table')) {
            foreach ($this->sectionContentTables as $key => $contentTable) {
                DB::table('section_headers')
                    ->where('key', $key)
                    ->update(['content_table' => $contentTable]);
            }
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('section_headers') && Schema::hasColumn('section_headers', 'content_table')) {
            Schema::table('section_headers', function (Blueprint $table) {
                $table->dropColumn('content_table');
            });
        }

        foreach ($this->cmsTables as $table) {
            if (! Schema::hasTable($table) || ! Schema::hasColumn($table, 'active')) {
                continue;
            }
            Schema::table($table, function (Blueprint $blueprint) {
                $blueprint->dropColumn('active');
            });
        }

        foreach (array_reverse($this->renames, true) as $from => $to) {
            if (Schema::hasTable($to) && ! Schema::hasTable($from)) {
                Schema::rename($to, $from);
            }
        }
    }
};
