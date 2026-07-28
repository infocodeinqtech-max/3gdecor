<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Consolidate many service_* tables into:
 * - service_page_contents (singleton page copy)
 * - service_items (child rows: offer | process | why_stat | why_feature)
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_page_contents', function (Blueprint $table) {
            $table->id();
            // Hero
            $table->longText('hero_banner_image')->nullable();
            $table->string('hero_eyebrow')->nullable();
            $table->string('hero_title_line1')->nullable();
            $table->string('hero_title_line2')->nullable();
            $table->string('hero_title_highlight')->nullable();
            $table->text('hero_description')->nullable();
            $table->string('hero_cta_text')->nullable();
            // Offer section header
            $table->string('offer_eyebrow')->nullable();
            $table->string('offer_title')->nullable();
            $table->string('offer_title_highlight')->nullable();
            // Process section header
            $table->string('process_eyebrow')->nullable();
            $table->string('process_title')->nullable();
            $table->string('process_title_highlight')->nullable();
            // Why section
            $table->string('why_eyebrow')->nullable();
            $table->string('why_title')->nullable();
            $table->string('why_title_highlight')->nullable();
            $table->string('why_commitment_eyebrow')->nullable();
            $table->string('why_commitment_title_line1')->nullable();
            $table->string('why_commitment_title_line2')->nullable();
            $table->string('why_commitment_title_highlight')->nullable();
            $table->text('why_commitment_description')->nullable();
            $table->string('why_cta_text')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('service_items', function (Blueprint $table) {
            $table->id();
            $table->string('item_type', 32); // offer|process|why_stat|why_feature
            $table->string('icon')->nullable();
            $table->string('category')->nullable();
            $table->string('title')->nullable();
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->longText('image')->nullable();
            $table->string('tag')->nullable();
            $table->string('step_number', 10)->nullable();
            $table->string('label')->nullable();
            $table->string('tagline')->nullable();
            $table->string('accent_color')->nullable();
            $table->string('stat')->nullable();
            $table->string('detail')->nullable();
            $table->text('text')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();

            $table->index(['item_type', 'active', 'sort_order']);
        });

        $this->migrateLegacyData();
        $this->dropLegacyTables();
    }

    private function migrateLegacyData(): void
    {
        $page = [
            'active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ];

        if (Schema::hasTable('service_hero_contents')) {
            $hero = DB::table('service_hero_contents')->orderBy('id')->first();
            if ($hero) {
                $page['hero_banner_image'] = $hero->banner_image ?? null;
                $page['hero_eyebrow'] = $hero->eyebrow ?? null;
                $page['hero_title_line1'] = $hero->title_line1 ?? null;
                $page['hero_title_line2'] = $hero->title_line2 ?? null;
                $page['hero_title_highlight'] = $hero->title_highlight ?? null;
                $page['hero_description'] = $hero->description ?? null;
                $page['hero_cta_text'] = $hero->cta_text ?? null;
            }
        }

        if (Schema::hasTable('service_offer_section_contents')) {
            $offer = DB::table('service_offer_section_contents')->orderBy('id')->first();
            if ($offer) {
                $page['offer_eyebrow'] = $offer->eyebrow ?? null;
                $page['offer_title'] = $offer->title ?? null;
                $page['offer_title_highlight'] = $offer->title_highlight ?? null;
            }
        }

        if (Schema::hasTable('service_process_section_contents')) {
            $process = DB::table('service_process_section_contents')->orderBy('id')->first();
            if ($process) {
                $page['process_eyebrow'] = $process->eyebrow ?? null;
                $page['process_title'] = $process->title ?? null;
                $page['process_title_highlight'] = $process->title_highlight ?? null;
            }
        }

        if (Schema::hasTable('service_why_contents')) {
            $why = DB::table('service_why_contents')->orderBy('id')->first();
            if ($why) {
                $page['why_eyebrow'] = $why->eyebrow ?? null;
                $page['why_title'] = $why->title ?? null;
                $page['why_title_highlight'] = $why->title_highlight ?? null;
                $page['why_commitment_eyebrow'] = $why->commitment_eyebrow ?? null;
                $page['why_commitment_title_line1'] = $why->commitment_title_line1 ?? null;
                $page['why_commitment_title_line2'] = $why->commitment_title_line2 ?? null;
                $page['why_commitment_title_highlight'] = $why->commitment_title_highlight ?? null;
                $page['why_commitment_description'] = $why->commitment_description ?? null;
                $page['why_cta_text'] = $why->cta_text ?? null;
            }
        }

        if (count($page) > 3) {
            DB::table('service_page_contents')->insert($page);
        }

        if (Schema::hasTable('service_offer_contents')) {
            foreach (DB::table('service_offer_contents')->orderBy('sort_order')->get() as $row) {
                DB::table('service_items')->insert([
                    'item_type' => 'offer',
                    'icon' => $row->icon ?? null,
                    'category' => $row->category ?? null,
                    'title' => $row->title ?? null,
                    'subtitle' => $row->subtitle ?? null,
                    'description' => $row->description ?? null,
                    'image' => $row->image ?? null,
                    'tag' => $row->tag ?? null,
                    'sort_order' => (int) ($row->sort_order ?? 0),
                    'active' => (bool) ($row->active ?? true),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        if (Schema::hasTable('service_process_contents')) {
            foreach (DB::table('service_process_contents')->orderBy('sort_order')->get() as $row) {
                DB::table('service_items')->insert([
                    'item_type' => 'process',
                    'icon' => $row->icon ?? null,
                    'step_number' => $row->step_number ?? null,
                    'label' => $row->label ?? null,
                    'tagline' => $row->tagline ?? null,
                    'description' => $row->description ?? null,
                    'image' => $row->image ?? null,
                    'accent_color' => $row->accent_color ?? null,
                    'sort_order' => (int) ($row->sort_order ?? 0),
                    'active' => (bool) ($row->active ?? true),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        if (Schema::hasTable('service_why_stats')) {
            foreach (DB::table('service_why_stats')->orderBy('sort_order')->get() as $row) {
                DB::table('service_items')->insert([
                    'item_type' => 'why_stat',
                    'icon' => $row->icon ?? null,
                    'stat' => $row->stat ?? null,
                    'label' => $row->label ?? null,
                    'detail' => $row->detail ?? null,
                    'sort_order' => (int) ($row->sort_order ?? 0),
                    'active' => (bool) ($row->active ?? true),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        if (Schema::hasTable('service_why_features')) {
            foreach (DB::table('service_why_features')->orderBy('sort_order')->get() as $row) {
                DB::table('service_items')->insert([
                    'item_type' => 'why_feature',
                    'text' => $row->text ?? null,
                    'sort_order' => (int) ($row->sort_order ?? 0),
                    'active' => (bool) ($row->active ?? true),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    private function dropLegacyTables(): void
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

    public function down(): void
    {
        Schema::dropIfExists('service_items');
        Schema::dropIfExists('service_page_contents');
    }
};
