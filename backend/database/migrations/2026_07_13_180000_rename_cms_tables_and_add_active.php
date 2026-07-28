<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Renames legacy CMS table names, adds `active` flags, and
 * stores related content table names on home_section_headers.
 *
 * Safe for DBs that already ran the old create migration.
 * No-ops cleanly when tables already use the new names.
 */
return new class extends Migration
{
    private array $renames = [
        'navigation_items' => 'home_navigation_menus',
        'expertise_items' => 'home_expertise_contents',
        'projects' => 'home_projects_contents',
        'services' => 'home_services_contents',
        'process_steps' => 'home_process_contents',
        'testimonials' => 'home_testimonials_contents',
        // Intermediate names (pre-home_ prefix)
        'navigation_menus' => 'home_navigation_menus',
        'hero_contents' => 'home_hero_contents',
        'about_contents' => 'home_about_contents',
        'section_headers' => 'home_section_headers',
        'expertise_contents' => 'home_expertise_contents',
        'projects_contents' => 'home_projects_contents',
        'services_contents' => 'home_services_contents',
        'process_contents' => 'home_process_contents',
        'testimonials_contents' => 'home_testimonials_contents',
    ];

    private array $cmsTables = [
        'home_navigation_menus',
        'home_hero_contents',
        'home_about_contents',
        'home_section_headers',
        'home_expertise_contents',
        'home_projects_contents',
        'home_services_contents',
        'home_process_contents',
        'home_testimonials_contents',
        'footer_contents',
        'enquiries',
    ];

    private array $sectionContentTables = [
        'expertise' => 'home_expertise_contents',
        'projects' => 'home_projects_contents',
        'services' => 'home_services_contents',
        'process' => 'home_process_contents',
        'testimonials' => 'home_testimonials_contents',
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

        if (Schema::hasTable('home_section_headers') && ! Schema::hasColumn('home_section_headers', 'content_table')) {
            Schema::table('home_section_headers', function (Blueprint $table) {
                $table->string('content_table')->nullable()->after('key');
            });
        }

        if (Schema::hasTable('home_section_headers') && Schema::hasColumn('home_section_headers', 'content_table')) {
            foreach ($this->sectionContentTables as $key => $contentTable) {
                DB::table('home_section_headers')
                    ->where('key', $key)
                    ->update(['content_table' => $contentTable]);
            }
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('home_section_headers') && Schema::hasColumn('home_section_headers', 'content_table')) {
            Schema::table('home_section_headers', function (Blueprint $table) {
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
