<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects_page_contents', function (Blueprint $table) {
            $table->id();
            $table->longText('banner_image')->nullable();
            $table->string('hero_eyebrow')->nullable();
            $table->string('hero_title_prefix')->nullable();
            $table->string('hero_title_highlight')->nullable();
            $table->text('hero_description_1')->nullable();
            $table->text('hero_description_2')->nullable();
            $table->json('stats')->nullable();

            $table->string('categories_eyebrow')->nullable();
            $table->string('categories_title_line1')->nullable();
            $table->string('categories_title_line2')->nullable();
            $table->text('categories_description')->nullable();

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

            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('projects_page_categories', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->text('subtitle')->nullable();
            $table->longText('image')->nullable();
            $table->string('icon')->nullable();
            $table->text('tags')->nullable();
            $table->string('button')->nullable();
            $table->string('link')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('projects_page_items', function (Blueprint $table) {
            $table->id();
            $table->string('domain')->default('corporate'); // corporate | civil
            $table->string('title')->nullable();
            $table->string('location')->nullable();
            $table->longText('image')->nullable();
            $table->string('slug')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects_page_items');
        Schema::dropIfExists('projects_page_categories');
        Schema::dropIfExists('projects_page_contents');
    }
};
