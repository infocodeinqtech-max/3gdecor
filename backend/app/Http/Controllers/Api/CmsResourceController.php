<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SectionHeader;
use App\Rules\IndianPhone;
use App\Support\CmsRegistry;
use Illuminate\Http\Request;

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

        $model = $cfg['model'];
        $query = $model::query()
            ->active()
            ->orderBy($cfg['order_by'] ?? 'id');

        if (! empty($cfg['item_type'])) {
            $query->where('item_type', $cfg['item_type']);
        }

        $rows = $query->get();

        return response()->json([
            'success' => true,
            'data' => $rows->map($cfg['map_out'])->values(),
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
        $payload['active'] = true;
        $row = $cfg['model']::query()->create($payload);

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
        if ($resource === 'contact-offices') {
            $this->applyContactOfficeMapFallback($payload);
        }
        // Keep existing active unless explicitly sent
        if (! $request->exists('active')) {
            unset($payload['active']);
        }
        $row->update($payload);

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

        return response()->json([
            'success' => true,
            'message' => 'Record deactivated.',
        ]);
    }

    /** Replace entire list — deactivate old rows, create new active rows */
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
        $deactivate = $model::query();
        if (! empty($cfg['item_type'])) {
            $deactivate->where('item_type', $cfg['item_type']);
        }
        $deactivate->update(['active' => false]);

        $out = [];
        foreach ($items as $i => $item) {
            $payload = $cfg['map_in'](is_array($item) ? $item : []);
            if (! isset($payload['sort_order']) || $payload['sort_order'] === 0) {
                $payload['sort_order'] = $i + 1;
            }
            $payload['active'] = true;
            $row = $model::query()->create($payload);
            $out[] = ($cfg['map_out'])($row);
        }

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

        $row = $cfg['model']::query()->active()->first();

        return response()->json([
            'success' => true,
            'data' => $row ? ($cfg['map_out'])($row) : null,
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
        if ($resource === 'footer') {
            $request->merge(is_array($input) ? $input : []);
            $request->validate([
                'email' => ['required', 'email:filter', 'max:190'],
                'phone' => ['required', 'string', 'max:40', new IndianPhone(true)],
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

        $row = SectionHeader::query()
            ->active()
            ->where('key', $meta['key'])
            ->first();

        return response()->json([
            'success' => true,
            'data' => $row ? CmsRegistry::mapSectionOut($row) : null,
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

        return response()->json([
            'success' => true,
            'data' => CmsRegistry::mapSectionOut($row->fresh()),
        ]);
    }
}
