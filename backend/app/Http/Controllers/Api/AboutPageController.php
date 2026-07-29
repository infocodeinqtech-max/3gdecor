<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AboutPageHero;
use App\Models\AboutPageHeroFeature;
use Illuminate\Http\Request;

class AboutPageController extends Controller
{
    /**
     * GET /api/about-page/hero
     */
    public function hero()
    {
        $hero = AboutPageHero::first();

        return response()->json([
            'success' => true,
            'data' => $hero,
        ]);
    }

    /**
     * PUT /api/about-page/hero
     */
    public function updateHero(Request $request)
    {
        $validated = $request->validate([
            'small_title'      => ['nullable', 'string', 'max:255'],
            'title'            => ['required', 'string', 'max:255'],
            'description'      => ['nullable', 'string'],
            'background_image' => ['nullable', 'string', 'max:255'],
            'active'           => ['nullable', 'boolean'],
        ]);

        $hero = AboutPageHero::updateOrCreate(
            ['id' => 1],
            $validated
        );

        return response()->json([
            'success' => true,
            'message' => 'About Hero saved successfully.',
            'data' => $hero,
        ]);
    }

    /**
     * GET /api/about-page/heroFeatures
     */

    public function heroFeatures()
    {
        $features = AboutPageHeroFeature::where('about_page_hero_id',1)
        ->orderBy('sort_order')
        ->get();

        return response()->json([
            'success' => true,
            'data' => $features,
        ]);
    }
}