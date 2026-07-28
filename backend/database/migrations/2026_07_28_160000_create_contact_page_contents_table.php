<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_page_contents', function (Blueprint $table) {
            $table->id();
            $table->longText('banner_image')->nullable();
            $table->string('hero_eyebrow')->nullable();
            $table->string('hero_title_line1')->nullable();
            $table->string('hero_title_line2')->nullable();
            $table->string('hero_title_highlight')->nullable();
            $table->text('hero_description')->nullable();

            $table->string('details_eyebrow')->nullable();
            $table->string('details_title')->nullable();
            $table->string('details_title_highlight')->nullable();
            $table->text('details_description')->nullable();

            $table->string('form_eyebrow')->nullable();
            $table->string('form_title')->nullable();
            $table->text('form_description')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_page_contents');
    }
};
