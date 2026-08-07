<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\CmsPublicController;
use App\Models\SectionHeader;
use App\Rules\IndianPhone;
use App\Support\CmsRegistry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

/**
 * Unified CMS API for admin dashboard sections.
 *
 * Deletes soft-deactivate (`active = false`); public reads return active rows only.
 */
class CmsResourceController extends Controller
{
    private function ensurePermission(Request $request, string $permission): void
    {
        $user = $request->user();
        if (! $user || ! $user->hasPermission($permission)) {
            abort(403, 'You do not have permission for this section.');
        }
    }

    /** @return array<string, mixed> */
    private function validateListPayload(Request $request, string $resource): array
    {
        if ($resource === 'contact-offices') {
            return $request->validate([
                'label' => ['required', 'string', 'max:80'],
                'heading' => ['required', 'string', 'max:120'],
                'studioTitle' => ['required', 'string', 'max:160'],
                'address' => ['required', 'string', 'max:500'],
                'phone' => ['required', 'string', 'max:40', new IndianPhone(true)],
                'email' => ['required', 'email:filter', 'max:190'],
                'hours' => ['nullable', 'string', 'max:120'],
                'mapEmbed' => ['nullable', 'string', 'max:2000'],
                'sort_order' => ['nullable', 'integer'],
                'active' => ['nullable', 'boolean'],
            ]);
        }

        return $request->all();
    }

    /** @param array<string, mixed> $payload */
    private function applyContactOfficeMapFallback(array &$payload): void
    {
        $embed = trim((string) ($payload['map_embed'] ?? ''));
        $address = trim((string) ($payload['address'] ?? ''));
        if ($embed === '' && $address !== '') {
            $payload['map_embed'] = 'https://maps.google.com/maps?q='.rawurlencode($address).'&t=&z=16&ie=UTF8&iwloc=&output=embed';
        }
    }

    // ─── Lists ───────────────────────────────────────────────

    public function listIndex(string $resource)
    {
        $cfg = CmsRegistry::lists()[$resource] ?? null;
        if (! $cfg) {
            abort(404, 'Unknown list resource.');
        }

        $data = Cache::remember("cms.public.list.{$resource}", 90, function () use ($cfg) {
            $query = $cfg['model']::query()
                ->active()
                ->orderBy($cfg['order_by'] ?? 'id');

            if (! empty($cfg['item_type'])) {
                $query->where('item_type', $cfg['item_type']);
            }

            return $query->get()->map($cfg['map_out'])->values()->all();
        });

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function listStore(Request $request, string $resource)
    {
        $cfg = CmsRegistry::lists()[$resource] ?? null;
        if (! $cfg) {
            abort(404);
        }
        $this->ensurePermission($request, $cfg['permission']);

        $this->validateListPayload($request, $resource);
        $payload = $cfg['map_in']($request->all());
        if ($resource === 'contact-offices') {
            $this->applyContactOfficeMapFallback($payload);
        }
        /* Added By Moumita*/
        if ($resource !== 'about-page-hero-features') {
            $payload['active'] = true;
        }
        /** End */
        $row = $cfg['model']::query()->create($payload);
        $this->bustPublicCache($resource);

        return response()->json([
            'success' => true,
            'data' => ($cfg['map_out'])($row),
        ], 201);
    }

    public function listUpdate(Request $request, string $resource, int $id)
    {
        $cfg = CmsRegistry::lists()[$resource] ?? null;
        if (! $cfg) {
            abort(404);
        }
        $this->ensurePermission($request, $cfg['permission']);

        $row = $cfg['model']::query()->findOrFail($id);
        if (! empty($cfg['item_type']) && $row->item_type !== $cfg['item_type']) {
            abort(404);
        }
        $this->validateListPayload($request, $resource);
        $payload = $cfg['map_in']($request->all());
        if ($resource === 'projects-page-items') {
            $payload = $this->partialProjectsPageItemPayload($request->all(), $payload);
        }
        if ($resource === 'contact-offices') {
            $this->applyContactOfficeMapFallback($payload);
        }
        // Keep existing active unless explicitly sent
        if (! $request->exists('active')) {
            unset($payload['active']);
        }
        $row->update($payload);
        $this->bustPublicCache($resource);

        return response()->json([
            'success' => true,
            'data' => ($cfg['map_out'])($row->fresh()),
        ]);
    }

    public function listDestroy(Request $request, string $resource, int $id)
    {
        $cfg = CmsRegistry::lists()[$resource] ?? null;
        if (! $cfg) {
            abort(404);
        }
        $this->ensurePermission($request, $cfg['permission']);

        $row = $cfg['model']::query()->findOrFail($id);
        if (! empty($cfg['item_type']) && $row->item_type !== $cfg['item_type']) {
            abort(404);
        }
        $row->deactivate();
        $this->bustPublicCache($resource);

        return response()->json([
            'success' => true,
            'message' => 'Record deactivated.',
        ]);
    }

    /** Upsert list items: update existing ids, create new, soft-delete removed. */
    public function listSync(Request $request, string $resource)
    {
        $cfg = CmsRegistry::lists()[$resource] ?? null;
        if (! $cfg) {
            abort(404);
        }
        $this->ensurePermission($request, $cfg['permission']);

        $items = $request->validate([
            'data' => ['required', 'array'],
        ])['data'];

        $model = $cfg['model'];
        $keptIds = [];
        $out = [];

        foreach ($items as $i => $item) {
            $itemArr = is_array($item) ? $item : [];
            $payload = $cfg['map_in']($itemArr);
            $payload['sort_order'] = (int) ($payload['sort_order'] ?? ($i + 1));
            if ($payload['sort_order'] === 0) {
                $payload['sort_order'] = $i + 1;
            }
            if($resource != 'about'){
                $payload['active'] = true;
            }
            
            $id = isset($itemArr['id']) ? (int) $itemArr['id'] : 0;
            $existing = null;
            if ($id > 0) {
                $existing = $model::query()->find($id);
                if ($existing && ! empty($cfg['item_type']) && $existing->item_type !== $cfg['item_type']) {
                    $existing = null;
                }
            }

            if ($existing) {
                // Never recreate — update the same row
                unset($payload['active']); // keep active unless we set true below
                $payload['active'] = true;
                $existing->update($payload);
                $row = $existing->fresh();
            } else {
                $row = $model::query()->create($payload);
            }

            $keptIds[] = $row->id;
            $out[] = ($cfg['map_out'])($row);
        }

        // Soft-delete only rows not present in the submitted list
        $deactivate = $model::query()->whereNotIn('id', $keptIds ?: [0]);
        if (! empty($cfg['item_type'])) {
            $deactivate->where('item_type', $cfg['item_type']);
        }
        $deactivate->update(['active' => false]);

        $this->bustPublicCache($resource);

        return response()->json([
            'success' => true,
            'data' => $out,
        ]);
    }

    // ─── Singletons ──────────────────────────────────────────

    public function singletonShow(string $resource)
    {
        $cfg = CmsRegistry::singletons()[$resource] ?? null;
        if (! $cfg) {
            abort(404);
        }

        $data = Cache::remember("cms.public.singleton.{$resource}", 90, function () use ($cfg) {
            $row = $cfg['model']::query()->active()->first();

            return $row ? ($cfg['map_out'])($row) : null;
        });

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function singletonUpsert(Request $request, string $resource)
    {
        $cfg = CmsRegistry::singletons()[$resource] ?? null;
        if (! $cfg) {
            abort(404);
        }
        $this->ensurePermission($request, $cfg['permission']);

        $input = $request->input('data', $request->all());
        if ($resource === 'site-contact') {
            $request->merge(is_array($input) ? $input : []);
            $request->validate([
                'email' => ['required', 'email:filter', 'max:190'],
                'phone' => ['required', 'string', 'max:40', new IndianPhone(true)],
                'whatsappNumber' => ['required', 'string', 'size:10', new IndianPhone(false)],
                'address' => ['required', 'string', 'max:500'],
                'country' => ['required', 'string', 'max:120'],
            ]);
        }

        $payload = $cfg['map_in'](is_array($input) ? $input : $request->all());
        $payload['active'] = true;

        $row = $cfg['model']::query()->first();
        if ($row) {
            $row->update($payload);
        } else {
            $row = $cfg['model']::query()->create($payload);
        }

        $this->bustPublicCache($resource);

        return response()->json([
            'success' => true,
            'data' => ($cfg['map_out'])($row->fresh()),
        ]);
    }

    // ─── Section headers ─────────────────────────────────────

    public function sectionShow(string $storageKey)
    {
        $meta = CmsRegistry::sectionHeaderKeys()[$storageKey] ?? null;
        if (! $meta) {
            abort(404);
        }

        $data = Cache::remember("cms.public.section.{$storageKey}", 90, function () use ($meta) {
            $row = SectionHeader::query()
                ->active()
                ->where('key', $meta['key'])
                ->first();

            return $row ? CmsRegistry::mapSectionOut($row) : null;
        });

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function sectionUpsert(Request $request, string $storageKey)
    {
        $meta = CmsRegistry::sectionHeaderKeys()[$storageKey] ?? null;
        if (! $meta) {
            abort(404);
        }
        $this->ensurePermission($request, $meta['permission']);

        $payload = CmsRegistry::mapSectionIn($storageKey, $request->input('data', $request->all()));
        $payload['key'] = $meta['key'];
        $payload['content_table'] = $meta['content_table'];
        $payload['active'] = true;

        $row = SectionHeader::query()->updateOrCreate(
            ['key' => $meta['key']],
            $payload
        );

        CmsRegistry::syncSectionContentTables();
        $this->bustPublicCache($storageKey);

        return response()->json([
            'success' => true,
            'data' => CmsRegistry::mapSectionOut($row->fresh()),
        ]);
    }

    private function bustPublicCache(?string $key = null): void
    {
        CmsPublicController::bustCache();
        if ($key) {
            Cache::forget("cms.public.list.{$key}");
            Cache::forget("cms.public.singleton.{$key}");
            Cache::forget("cms.public.section.{$key}");
        }
    }

    /** @param  array<string, mixed>  $input
     * @param  array<string, mixed>  $mapped
     * @return array<string, mixed>
     */
    private function partialProjectsPageItemPayload(array $input, array $mapped): array
    {
        $fieldKeys = [
            'category_id' => ['categoryId', 'category_id'],
            'title' => ['title'],
            'location' => ['location'],
            'filter_tag' => ['filterTag', 'filter_tag'],
            'image' => ['image'],
            'slug' => ['slug'],
            'hero_tagline' => ['heroTagline', 'hero_tagline'],
            'status_label' => ['statusLabel', 'status_label'],
            'hero_slides' => ['heroSlides', 'hero_slides'],
            'about_title' => ['aboutTitle', 'about_title'],
            'about_description' => ['aboutDescription', 'about_description'],
            'about_features' => ['aboutFeatures', 'about_features'],
            'about_image' => ['aboutImage', 'about_image'],
            'stat_completed' => ['statCompleted', 'stat_completed'],
            'stat_area' => ['statArea', 'stat_area'],
            'stat_duration' => ['statDuration', 'stat_duration'],
            'gallery_eyebrow' => ['galleryEyebrow', 'gallery_eyebrow'],
            'gallery_title' => ['galleryTitle', 'gallery_title'],
            'gallery_description' => ['galleryDescription', 'gallery_description'],
            'gallery_images' => ['galleryImages', 'gallery_images'],
            'sort_order' => ['order', 'sort_order'],
            'active' => ['active'],
        ];

        $payload = [];
        foreach ($fieldKeys as $column => $aliases) {
            foreach ($aliases as $alias) {
                if (array_key_exists($alias, $input)) {
                    $payload[$column] = $mapped[$column];
                    break;
                }
            }
        }

        return $payload;
    }
}
