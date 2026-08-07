<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects_page_categories', function (Blueprint $table) {
            $table->string('slug')->nullable()->after('title');
            $table->longText('list_banner_image')->nullable()->after('section_description');
            $table->string('list_breadcrumb')->nullable()->after('list_banner_image');
            $table->string('list_hero_title')->nullable()->after('list_breadcrumb');
            $table->text('list_description')->nullable()->after('list_hero_title');
            $table->json('list_filters')->nullable()->after('list_description');
        });

        Schema::table('projects_page_items', function (Blueprint $table) {
            $table->string('filter_tag')->nullable()->after('location');
        });

        $categories = DB::table('projects_page_categories')->orderBy('sort_order')->get();
        foreach ($categories as $index => $row) {
            $slug = match ($index) {
                0 => 'corporate',
                1 => 'civil',
                default => null,
            };
            if (! $slug && $row->link && preg_match('#/projects/([^/]+)#', $row->link, $m)) {
                $slug = $m[1];
            }

            $updates = ['slug' => $slug];

            if ($slug === 'corporate') {
                $updates += [
                    'list_banner_image' => '/uploads/pages/projects/corporate-banner.png',
                    'list_breadcrumb' => 'Corporate Interiors',
                    'list_hero_title' => 'Corporate',
                    'list_description' => 'Exceptional workplaces begin with exceptional design. At 3G Decorative Group, we create premium corporate interiors that blend functionality, innovation, and timeless aesthetics to shape environments where businesses thrive.',
                    'list_filters' => json_encode(['All Projects', 'Offices', 'Workspaces', 'Showrooms', 'Banks', 'IT Parks']),
                ];
            }

            if ($slug === 'civil') {
                $updates += [
                    'list_banner_image' => '/uploads/pages/projects/civil-banner.png',
                    'list_breadcrumb' => 'Civil Structures',
                    'list_hero_title' => 'Civil',
                    'list_description' => 'Explore our portfolio of residential, commercial and industrial projects engineered with quality, innovation and long-lasting excellence.',
                    'list_filters' => json_encode(['All Projects', 'Residential', 'Commercial', 'Industrial', 'Institutional', 'Infrastructure']),
                ];
            }

            if ($slug) {
                DB::table('projects_page_categories')->where('id', $row->id)->update($updates);
            }
        }

        $corporateId = DB::table('projects_page_categories')->where('slug', 'corporate')->value('id');
        $civilId = DB::table('projects_page_categories')->where('slug', 'civil')->value('id');

        if ($corporateId) {
            $corporateTags = [
                'tech-mahindra' => 'Offices',
                'siemens' => 'Workspaces',
                'executive-dining' => 'Workspaces',
                'creative-workspace' => 'Workspaces',
                'reception' => 'Offices',
            ];
            foreach ($corporateTags as $slug => $tag) {
                DB::table('projects_page_items')
                    ->where('category_id', $corporateId)
                    ->where('slug', $slug)
                    ->update(['filter_tag' => $tag]);
            }
        }

        if ($civilId) {
            $civilTags = [
                'luxury-villa' => 'Residential',
                'industrial-facility' => 'Industrial',
                'residential-building' => 'Residential',
                'industrial-complex' => 'Industrial',
            ];
            foreach ($civilTags as $slug => $tag) {
                DB::table('projects_page_items')
                    ->where('category_id', $civilId)
                    ->where('slug', $slug)
                    ->update(['filter_tag' => $tag]);
            }
        }
    }

    public function down(): void
    {
        Schema::table('projects_page_categories', function (Blueprint $table) {
            $table->dropColumn([
                'slug',
                'list_banner_image',
                'list_breadcrumb',
                'list_hero_title',
                'list_description',
                'list_filters',
            ]);
        });

        Schema::table('projects_page_items', function (Blueprint $table) {
            $table->dropColumn('filter_tag');
        });
    }
};
