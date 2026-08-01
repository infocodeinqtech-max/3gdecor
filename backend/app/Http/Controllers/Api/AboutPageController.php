<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AboutPageHero;
use App\Models\AboutPageHeroFeature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Services\FileUploadService;
use Illuminate\Http\JsonResponse;

class AboutPageController extends Controller
{
    /**
     * GET /api/about-page/hero
     */
    public function hero()
    {
        $hero = AboutPageHero::with([
            'features' => function ($query) {
                $query->where('active', true)
                      ->orderBy('sort_order');
            }
        ])->first();

        return response()->json([
            'success' => true,
            'data' => $hero,
        ]);
    }

    /**
     * PUT /api/about-page/hero
     */
    public function updateHero(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'small_title' => ['nullable', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'background_image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],
            'active' => ['nullable', 'boolean'],
        ]);

        // Existing singleton record
        $hero = AboutPageHeroFeature::find(
            AboutPageHeroFeature::SINGLETON_ID
        );

        $data = $validated;

        // Upload / Replace image only if a new file is provided
        if ($request->hasFile('background_image')) {

            $data['background_image'] = $hero
                ? FileUploadService::replace(
                    $request->file('background_image'),
                    $hero->background_image,
                    AboutPageHeroFeature::IMAGE_DIRECTORY
                )
                : FileUploadService::store(
                    $request->file('background_image'),
                    AboutPageHeroFeature::IMAGE_DIRECTORY
                );
        } else {
            // Prevent accidental overwrite
            unset($data['background_image']);
        }

        $hero = AboutPageHero::updateOrCreate(
            ['id' => AboutPageHero::SINGLETON_ID],
            $data
        );

        return response()->json([
            'success' => true,
            'message' => 'About Hero saved successfully.',
            'data' => $hero->fresh(),
        ]);
    }

    /**
     * GET /api/about-page/hero/features
     * Admin - List all Hero Features
     */

    public function heroFeatures()
    {
        $features = AboutPageHeroFeature::query()
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $features,
        ]);
    }

    /**
     * POST /api/about-page/hero-features
     */
    public function storeHeroFeature(Request $request)
    {
        $validated = $request->validate([
            'title'              => ['required', 'string', 'max:255'],
            'description'        => ['nullable', 'string'],
            'sort_order'         => ['nullable', 'integer'],
            'active'             => ['nullable', 'boolean'],
        ]);

        $feature = AboutPageHeroFeature::create([
            'home_about_contents_id' => AboutPageHeroFeature::SINGLETON_ID,
            'title'              => $validated['title'],
            'description'        => $validated['description'] ?? '',
            'sort_order'         => $validated['sort_order'] ?? 0,
            'active'             => $validated['active'] ?? true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Hero feature created successfully.',
            'data' => $feature,
        ], 201);
    }

    /**
     * PUT /api/about-page/hero-features/{id}
     */
    public function updateHeroFeature(Request $request, int $id)
    {
        $feature = AboutPageHeroFeature::findOrFail($id);

        $validated = $request->validate([
            'home_about_contents_id' => ['required', 'exists:home_about_contents,id'],
            'title'              => ['required', 'string', 'max:255'],
            'description'        => ['nullable', 'string'],
            'sort_order'         => ['nullable', 'integer'],
            'active'             => ['nullable', 'boolean'],
        ]);

        $feature->update([
            'home_about_contents_id' => $validated['home_about_contents_id'],
            'title'              => $validated['title'],
            'description'        => $validated['description'] ?? '',
            'sort_order'         => $validated['sort_order'] ?? 0,
            'active'             => $validated['active'] ?? true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Hero feature updated successfully.',
            'data' => $feature->fresh(),
        ]);
    }

    /**
     * DELETE /api/about-page/hero-features/{id}
     */
    public function deleteHeroFeature(int $id)
    {
        $feature = AboutPageHeroFeature::findOrFail($id);

        $feature->delete();

        return response()->json([
            'success' => true,
            'message' => 'Hero feature deleted successfully.',
        ]);
    }
}