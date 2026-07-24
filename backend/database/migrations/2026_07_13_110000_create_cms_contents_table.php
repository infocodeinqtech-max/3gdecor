<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * CMS content stored as JSON by key.
     * Keys match frontend localStorage: hero, about, services, etc.
     */
    public function up(): void
    {
        Schema::create('cms_contents', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique(); // e.g. hero, about, services
            $table->string('type', 20)->default('json'); // singleton | list
            $table->json('data');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cms_contents');
    }
};
