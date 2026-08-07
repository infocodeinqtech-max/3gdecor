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
            $table->string('section_subtitle')->nullable()->after('link');
            $table->string('section_title')->nullable()->after('section_subtitle');
            $table->text('section_description')->nullable()->after('section_title');
        });

        Schema::table('projects_page_items', function (Blueprint $table) {
            $table->unsignedBigInteger('category_id')->nullable()->after('id');
        });

        $content = DB::table('projects_page_contents')->first();
        $categories = DB::table('projects_page_categories')
            ->orderBy('sort_order')
            ->get();

        if ($content && $categories->count() >= 1) {
            DB::table('projects_page_categories')
                ->where('id', $categories[0]->id)
                ->update([
                    'section_subtitle' => $content->corporate_subtitle,
                    'section_title' => $content->corporate_title,
                    'section_description' => $content->corporate_description,
                    'link' => $content->corporate_link ?: $categories[0]->link,
                ]);
        }

        if ($content && $categories->count() >= 2) {
            DB::table('projects_page_categories')
                ->where('id', $categories[1]->id)
                ->update([
                    'section_subtitle' => $content->civil_subtitle,
                    'section_title' => $content->civil_title,
                    'section_description' => $content->civil_description,
                    'link' => $content->civil_link ?: $categories[1]->link,
                ]);
        }

        if ($categories->count() >= 1) {
            DB::table('projects_page_items')
                ->where('domain', 'corporate')
                ->update(['category_id' => $categories[0]->id]);
        }

        if ($categories->count() >= 2) {
            DB::table('projects_page_items')
                ->where('domain', 'civil')
                ->update(['category_id' => $categories[1]->id]);
        }

        Schema::table('projects_page_items', function (Blueprint $table) {
            $table->dropColumn('domain');
        });

        Schema::table('projects_page_contents', function (Blueprint $table) {
            $table->dropColumn([
                'stats',
                'corporate_subtitle',
                'corporate_title',
                'corporate_description',
                'corporate_button',
                'corporate_link',
                'civil_subtitle',
                'civil_title',
                'civil_description',
                'civil_button',
                'civil_link',
            ]);
        });
    }

    public function down(): void
    {
        Schema::table('projects_page_contents', function (Blueprint $table) {
            $table->json('stats')->nullable()->after('hero_description_2');
            $table->string('corporate_subtitle')->nullable();
            $table->string('corporate_title')->nullable();
            $table->text('corporate_description')->nullable();
            $table->string('corporate_button')->nullable();
            $table->string('corporate_link')->nullable();
            $table->string('civil_subtitle')->nullable();
            $table->string('civil_title')->nullable();
            $table->text('civil_description')->nullable();
            $table->string('civil_button')->nullable();
            $table->string('civil_link')->nullable();
        });

        Schema::table('projects_page_items', function (Blueprint $table) {
            $table->string('domain')->default('corporate')->after('id');
        });

        Schema::table('projects_page_categories', function (Blueprint $table) {
            $table->dropColumn(['section_subtitle', 'section_title', 'section_description']);
        });

        Schema::table('projects_page_items', function (Blueprint $table) {
            $table->dropColumn('category_id');
        });
    }
};
