<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects_page_items', function (Blueprint $table) {
            $table->text('hero_tagline')->nullable()->after('slug');
            $table->string('status_label')->nullable()->after('hero_tagline');
            $table->json('hero_slides')->nullable()->after('status_label');
            $table->string('about_title')->nullable()->after('hero_slides');
            $table->text('about_description')->nullable()->after('about_title');
            $table->json('about_features')->nullable()->after('about_description');
            $table->longText('about_image')->nullable()->after('about_features');
            $table->string('stat_completed')->nullable()->after('about_image');
            $table->string('stat_area')->nullable()->after('stat_completed');
            $table->string('stat_duration')->nullable()->after('stat_area');
            $table->string('gallery_eyebrow')->nullable()->after('stat_duration');
            $table->string('gallery_title')->nullable()->after('gallery_eyebrow');
            $table->text('gallery_description')->nullable()->after('gallery_title');
            $table->json('gallery_images')->nullable()->after('gallery_description');
        });

        $items = DB::table('projects_page_items')->get();
        foreach ($items as $item) {
            $image = $item->image ?: '';
            DB::table('projects_page_items')->where('id', $item->id)->update([
                'hero_tagline' => 'A future-ready space crafted to inspire collaboration, creativity, and productivity while reflecting innovative design excellence.',
                'status_label' => 'Completed Project',
                'hero_slides' => json_encode($image ? [$image] : []),
                'about_title' => $item->title,
                'about_description' => "Designed with precision and crafted for lasting impact, {$item->title} showcases our commitment to quality interiors, thoughtful planning and refined architectural detail.",
                'about_features' => json_encode([
                    'Premium Design Language',
                    'Collaborative Planning',
                    'Sustainable Material Palette',
                    'Precision Execution',
                ]),
                'about_image' => $image,
                'stat_completed' => '2025',
                'stat_area' => '12.5K',
                'stat_duration' => '8 Mo',
                'gallery_eyebrow' => 'Project Gallery',
                'gallery_title' => 'A Visual Journey',
                'gallery_description' => 'Every corner reflects our dedication to timeless design, functionality and refined craftsmanship.',
                'gallery_images' => json_encode($image ? [$image, $image, $image] : []),
            ]);
        }
    }

    public function down(): void
    {
        Schema::table('projects_page_items', function (Blueprint $table) {
            $table->dropColumn([
                'hero_tagline',
                'status_label',
                'hero_slides',
                'about_title',
                'about_description',
                'about_features',
                'about_image',
                'stat_completed',
                'stat_area',
                'stat_duration',
                'gallery_eyebrow',
                'gallery_title',
                'gallery_description',
                'gallery_images',
            ]);
        });
    }
};
