<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('footer_contents', function (Blueprint $table) {
            if (! Schema::hasColumn('footer_contents', 'whatsapp_number')) {
                $table->string('whatsapp_number', 10)->nullable()->after('phone');
            }
        });
    }

    public function down(): void
    {
        Schema::table('footer_contents', function (Blueprint $table) {
            if (Schema::hasColumn('footer_contents', 'whatsapp_number')) {
                $table->dropColumn('whatsapp_number');
            }
        });
    }
};
