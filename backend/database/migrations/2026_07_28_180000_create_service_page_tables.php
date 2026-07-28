<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_hero_contents', function (Blueprint $table) {
            $table->id();
            $table->longText('banner_image')->nullable();
            $table->string('eyebrow')->nullable();
            $table->string('title_line1')->nullable();
            $table->string('title_line2')->nullable();
            $table->string('title_highlight')->nullable();
            $table->text('description')->nullable();
            $table->string('cta_text')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('service_offer_section_contents', function (Blueprint $table) {
            $table->id();
            $table->string('eyebrow')->nullable();
            $table->string('title')->nullable();
            $table->string('title_highlight')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('service_offer_contents', function (Blueprint $table) {
            $table->id();
            $table->string('icon')->nullable();
            $table->string('category')->nullable();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->longText('image')->nullable();
            $table->string('tag')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('service_process_section_contents', function (Blueprint $table) {
            $table->id();
            $table->string('eyebrow')->nullable();
            $table->string('title')->nullable();
            $table->string('title_highlight')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('service_process_contents', function (Blueprint $table) {
            $table->id();
            $table->string('step_number', 10)->nullable();
            $table->string('icon')->nullable();
            $table->string('label');
            $table->string('tagline')->nullable();
            $table->text('description')->nullable();
            $table->longText('image')->nullable();
            $table->string('accent_color')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('service_why_contents', function (Blueprint $table) {
            $table->id();
            $table->string('eyebrow')->nullable();
            $table->string('title')->nullable();
            $table->string('title_highlight')->nullable();
            $table->string('commitment_eyebrow')->nullable();
            $table->string('commitment_title_line1')->nullable();
            $table->string('commitment_title_line2')->nullable();
            $table->string('commitment_title_highlight')->nullable();
            $table->text('commitment_description')->nullable();
            $table->string('cta_text')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('service_why_stats', function (Blueprint $table) {
            $table->id();
            $table->string('icon')->nullable();
            $table->string('stat');
            $table->string('label');
            $table->string('detail')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('service_why_features', function (Blueprint $table) {
            $table->id();
            $table->string('text');
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_why_features');
        Schema::dropIfExists('service_why_stats');
        Schema::dropIfExists('service_why_contents');
        Schema::dropIfExists('service_process_contents');
        Schema::dropIfExists('service_process_section_contents');
        Schema::dropIfExists('service_offer_contents');
        Schema::dropIfExists('service_offer_section_contents');
        Schema::dropIfExists('service_hero_contents');
    }
};
