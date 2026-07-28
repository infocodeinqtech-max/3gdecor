<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('home_navigation_menus', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->string('link');
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('visible')->default(true);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('home_hero_contents', function (Blueprint $table) {
            $table->id();
            $table->string('tagline')->nullable();
            $table->string('headline_line1')->nullable();
            $table->string('headline_line2')->nullable();
            $table->string('script_text')->nullable();
            $table->text('description')->nullable();
            $table->string('left_card_title')->nullable();
            $table->string('right_card_title')->nullable();
            $table->string('cta_corporate_text')->nullable();
            $table->string('cta_corporate_link')->nullable();
            $table->string('cta_civil_text')->nullable();
            $table->string('cta_civil_link')->nullable();
            $table->longText('background_image')->nullable();
            $table->json('stats')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('home_about_contents', function (Blueprint $table) {
            $table->id();
            $table->string('label')->nullable();
            $table->string('title_line1')->nullable();
            $table->string('title_line2')->nullable();
            $table->string('title_highlight')->nullable();
            $table->text('paragraph1')->nullable();
            $table->text('paragraph2')->nullable();
            $table->json('images')->nullable();
            $table->longText('badge_image')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('home_section_headers', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique(); // expertise|projects|services|process|testimonials
            /** Related list table name, e.g. home_expertise_contents — kept in sync via CmsRegistry */
            $table->string('content_table')->nullable();
            $table->string('label')->nullable();
            $table->string('title')->nullable();
            $table->string('title_line1')->nullable();
            $table->string('title_line2')->nullable();
            $table->string('title_highlight')->nullable();
            $table->text('description')->nullable();
            $table->string('cta_text')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('home_expertise_contents', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->longText('image')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('home_projects_contents', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category')->nullable();
            $table->longText('image')->nullable();
            $table->boolean('featured')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('home_services_contents', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category')->nullable();
            $table->text('description')->nullable();
            $table->longText('background_image')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('home_process_contents', function (Blueprint $table) {
            $table->id();
            $table->string('step', 20)->nullable();
            $table->string('title');
            $table->text('description')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('home_testimonials_contents', function (Blueprint $table) {
            $table->id();
            $table->text('quote');
            $table->string('author');
            $table->string('role')->nullable();
            $table->longText('image')->nullable();
            $table->string('rating')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('footer_contents', function (Blueprint $table) {
            $table->id();
            $table->text('tagline')->nullable();
            $table->string('address')->nullable();
            $table->string('country')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('hours')->nullable();
            $table->string('newsletter_title')->nullable();
            $table->text('newsletter_text')->nullable();
            $table->string('copyright')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('footer_contents');
        Schema::dropIfExists('home_testimonials_contents');
        Schema::dropIfExists('home_process_contents');
        Schema::dropIfExists('home_services_contents');
        Schema::dropIfExists('home_projects_contents');
        Schema::dropIfExists('home_expertise_contents');
        Schema::dropIfExists('home_section_headers');
        Schema::dropIfExists('home_about_contents');
        Schema::dropIfExists('home_hero_contents');
        Schema::dropIfExists('home_navigation_menus');
    }
};
