<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('about_page_founder_members', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('home_about_contents_id')
                ->constrained('home_about_contents')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->string('image')->nullable();

            $table->string('name',150);

            $table->string('title',150);

            $table->string('short_description',255);

            $table->unsignedInteger('sort_order')->default(1);

            $table->boolean('active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_page_founder_members');
    }
};
