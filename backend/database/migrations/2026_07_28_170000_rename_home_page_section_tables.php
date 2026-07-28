<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Prefix Home Page Section CMS tables with home_.
 * Safe no-op when tables already use the new names (fresh installs).
 */
return new class extends Migration
{
    private array $renames = [
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
        foreach (array_reverse($this->renames, true) as $from => $to) {
            if (Schema::hasTable($to) && ! Schema::hasTable($from)) {
                Schema::rename($to, $from);
            }
        }

        if (Schema::hasTable('section_headers') && Schema::hasColumn('section_headers', 'content_table')) {
            foreach ($this->sectionContentTables as $key => $contentTable) {
                DB::table('section_headers')
                    ->where('key', $key)
                    ->update(['content_table' => str_replace('home_', '', $contentTable)]);
            }
        }
    }
};
