<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SectionHeader;
use App\Support\CmsRegistry;
use Illuminate\Support\Facades\Cache;

/**
 * Public, cached CMS reads for the website (fast page loads).
 */
class CmsPublicController extends Controller
{
    private const TTL_SECONDS = 90;

    /**
     * GET /api/cms-public/site
     * One response for nav, hero, footer, about, sections + lists used on the homepage.
     */
    public function site()
    {
        $data = Cache::remember('cms.public.site', self::TTL_SECONDS, function () {
            return [
                'navigation' => $this->listData('navigation'),
                'hero' => $this->singletonData('hero'),
                'footer' => $this->singletonData('footer'),
                'siteContact' => $this->singletonData('site-contact'),
                'about' => $this->singletonData('about'),
                'contactPage' => $this->singletonData('contact-page'),
                'contactOffices' => $this->listData('contact-offices'),
                'projectsPage' => $this->singletonData('projects-page'),
                'projectsPageCategories' => $this->listData('projects-page-categories'),
                'projectsPageItems' => $this->listData('projects-page-items'),
                'expertiseSection' => $this->sectionData('expertise-section'),
                'expertise' => $this->listData('expertise'),
                'projectsSection' => $this->sectionData('projects-section'),
                'projects' => $this->listData('projects'),
                'servicesSection' => $this->sectionData('services-section'),
                'services' => $this->listData('services'),
                'processSection' => $this->sectionData('process-section'),
                'process' => $this->listData('process'),
                'testimonialsSection' => $this->sectionData('testimonials-section'),
                'testimonials' => $this->listData('testimonials'),
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public static function bustCache(): void
    {
        Cache::forget('cms.public.site');
    }

    /** @return list<array<string, mixed>> */
    private function listData(string $resource): array
    {
        $cfg = CmsRegistry::lists()[$resource] ?? null;
        if (! $cfg) {
            return [];
        }

        $query = $cfg['model']::query()
            ->active()
            ->orderBy($cfg['order_by'] ?? 'id');

        if (! empty($cfg['item_type'])) {
            $query->where('item_type', $cfg['item_type']);
        }

        return $query->get()->map($cfg['map_out'])->values()->all();
    }

    /** @return array<string, mixed>|null */
    private function singletonData(string $resource): ?array
    {
        $cfg = CmsRegistry::singletons()[$resource] ?? null;
        if (! $cfg) {
            return null;
        }

        $row = $cfg['model']::query()->active()->first();

        return $row ? ($cfg['map_out'])($row) : null;
    }

    /** @return array<string, mixed>|null */
    private function sectionData(string $storageKey): ?array
    {
        $meta = CmsRegistry::sectionHeaderKeys()[$storageKey] ?? null;
        if (! $meta) {
            return null;
        }

        $row = SectionHeader::query()
            ->active()
            ->where('key', $meta['key'])
            ->first();

        return $row ? CmsRegistry::mapSectionOut($row) : null;
    }
}
