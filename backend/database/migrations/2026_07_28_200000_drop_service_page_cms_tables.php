<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

/** Remove /services page CMS tables (admin CMS removed). */
return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('service_items');
        Schema::dropIfExists('service_page_contents');
    }

    public function down(): void
    {
        // Intentionally empty — re-create via older migrations if needed.
    }
};
