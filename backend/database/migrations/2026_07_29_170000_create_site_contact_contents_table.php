<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_contact_contents', function (Blueprint $table) {
            $table->id();
            $table->string('address')->nullable();
            $table->string('country')->nullable();
            $table->string('phone', 40)->nullable();
            $table->string('email', 190)->nullable();
            $table->string('hours')->nullable();
            $table->string('whatsapp_number', 10)->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        if (Schema::hasTable('footer_contents')) {
            $footer = DB::table('footer_contents')->orderBy('id')->first();
            if ($footer) {
                $whatsapp = '';
                if (Schema::hasColumn('footer_contents', 'whatsapp_number')) {
                    $whatsapp = (string) ($footer->whatsapp_number ?? '');
                }
                if ($whatsapp === '' && ! empty($footer->phone)) {
                    $digits = preg_replace('/\D+/', '', (string) $footer->phone) ?? '';
                    if (strlen($digits) === 10) {
                        $whatsapp = $digits;
                    } elseif (strlen($digits) === 11 && str_starts_with($digits, '0')) {
                        $whatsapp = substr($digits, 1);
                    }
                }

                DB::table('site_contact_contents')->insert([
                    'address' => $footer->address ?? 'Kolkata, West Bengal',
                    'country' => $footer->country ?? 'India',
                    'phone' => $footer->phone ?? '8167028450',
                    'email' => $footer->email ?? 'info@3gdecorativegroup.com',
                    'hours' => $footer->hours ?? 'Mon - Sat : 10 AM - 7 PM',
                    'whatsapp_number' => $whatsapp !== '' ? $whatsapp : '8167028450',
                    'active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            } else {
                DB::table('site_contact_contents')->insert([
                    'address' => 'Kolkata, West Bengal',
                    'country' => 'India',
                    'phone' => '8167028450',
                    'email' => 'info@3gdecorativegroup.com',
                    'hours' => 'Mon - Sat : 10 AM - 7 PM',
                    'whatsapp_number' => '8167028450',
                    'active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        if (Schema::hasColumn('footer_contents', 'whatsapp_number')) {
            Schema::table('footer_contents', function (Blueprint $table) {
                $table->dropColumn('whatsapp_number');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('footer_contents') && ! Schema::hasColumn('footer_contents', 'whatsapp_number')) {
            Schema::table('footer_contents', function (Blueprint $table) {
                $table->string('whatsapp_number', 10)->nullable()->after('phone');
            });

            $contact = DB::table('site_contact_contents')->orderBy('id')->first();
            if ($contact) {
                DB::table('footer_contents')->update([
                    'whatsapp_number' => $contact->whatsapp_number,
                ]);
            }
        }

        Schema::dropIfExists('site_contact_contents');
    }
};
