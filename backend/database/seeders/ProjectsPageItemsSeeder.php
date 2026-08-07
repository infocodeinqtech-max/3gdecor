<?php

namespace Database\Seeders;

use App\Models\ProjectsPageCategory;
use App\Models\ProjectsPageItem;
use App\Support\MediaPath;
use Illuminate\Database\Seeder;

class ProjectsPageItemsSeeder extends Seeder
{
    private function p(string $file): string
    {
        return MediaPath::path('pages/projects', $file);
    }

    private function c(string $file): string
    {
        return MediaPath::path('pages/projects/client', $file);
    }

    /** @return array<string, mixed> */
    private function detail(string $title, string $image, array $slides, string $filterTag = ''): array
    {
        $gallery = array_values(array_unique($slides));

        return [
            'hero_tagline' => 'A future-ready space crafted to inspire collaboration, creativity, and productivity while reflecting innovative design excellence.',
            'status_label' => 'Completed Project',
            'hero_slides' => $gallery,
            'about_title' => $title,
            'about_description' => "Designed with precision and crafted for lasting impact, {$title} showcases our commitment to quality interiors, thoughtful planning and refined architectural detail.",
            'about_features' => [
                'Premium Design Language',
                'Collaborative Planning',
                'Sustainable Material Palette',
                'Precision Execution',
            ],
            'about_image' => $image,
            'stat_completed' => '2025',
            'stat_area' => '12.5K',
            'stat_duration' => '8 Mo',
            'gallery_eyebrow' => 'Project Gallery',
            'gallery_title' => 'A Visual Journey',
            'gallery_description' => 'Every corner reflects our dedication to timeless design, functionality and refined craftsmanship.',
            'gallery_images' => $gallery,
            'filter_tag' => $filterTag,
        ];
    }

    public function run(): void
    {
        $corporate = ProjectsPageCategory::query()->where('slug', 'corporate')->first();
        $civil = ProjectsPageCategory::query()->where('slug', 'civil')->first();

        if (! $corporate || ! $civil) {
            return;
        }

        ProjectsPageItem::query()->delete();

        $corporateProjects = [
            ['Tech Mahindra Office', 'Kolkata, India', 'Offices', 'tech-mahindra-office', 'cp_int-1.jpeg', ['cp_int-1.jpeg', 'tech-mahindra-office.jpeg', 'client/client-001.jpeg', 'client/client-002.jpeg']],
            ['Siemens Innovation Hub', 'Kolkata, India', 'Workspaces', 'siemens-innovation-hub', 'cp-int-2.jpeg', ['cp-int-2.jpeg', 'siemens-innovation-hub.jpeg', 'client/client-003.jpeg', 'client/client-004.jpeg']],
            ['Executive Dining Space', 'Kolkata, India', 'Workspaces', 'executive-dining-space', 'cp-int-3.jpeg', ['cp-int-3.jpeg', 'executive-dining-space.jpeg', 'client/client-005.jpeg', 'client/client-006.jpeg']],
            ['Creative Studio Workspace', 'Kolkata, India', 'Workspaces', 'creative-studio-workspace', 'cp-int-4.jpeg', ['cp-int-4.jpeg', 'creative-studio-workspace.jpeg', 'client/client-007.jpeg', 'client/client-008.jpeg']],
            ['HDFC Bank Branch', 'Kolkata, India', 'Banks', 'hdfc-bank', 'hdfc-bank-branch.jpeg', ['hdfc-bank-branch.jpeg', 'client/client-009.jpeg', 'client/client-010.jpeg', 'client/client-011.jpeg']],
            ['DataSoft IT Park', 'Kolkata, India', 'IT Parks', 'datasoft-it-park', 'datasoft-it-park.jpeg', ['datasoft-it-park.jpeg', 'client/client-012.jpeg', 'client/client-013.jpeg', 'client/client-014.jpeg']],
            ['Mahindra & Mahindra Office', 'Kolkata, India', 'Offices', 'mahindra-office', 'mahindra-office.jpeg', ['mahindra-office.jpeg', 'client/client-015.jpeg', 'client/client-016.jpeg', 'client/client-017.jpeg']],
            ['Acme Corp Headquarters', 'Kolkata, India', 'Offices', 'acme-corporate', 'acme-headquarters.jpeg', ['acme-headquarters.jpeg', 'client/client-018.jpeg', 'client/client-019.jpeg', 'client/client-020.jpeg']],
            ['Corporate Reception Lounge', 'Kolkata, India', 'Offices', 'corporate-reception', 'cp-int-5.jpeg', ['cp-int-5.jpeg', 'client/client-021.jpeg', 'client/client-022.jpeg', 'client/client-023.jpeg']],
            ['Premium Workspace Hub', 'Hyderabad, India', 'Workspaces', 'premium-workspace-hub', 'client/client-024.jpeg', ['client/client-024.jpeg', 'client/client-025.jpeg', 'client/client-026.jpeg', 'client/client-027.jpeg']],
            ['Innovation Collaboration Center', 'Bengaluru, India', 'Workspaces', 'innovation-collaboration-center', 'client/client-028.jpeg', ['client/client-028.jpeg', 'client/client-029.jpeg', 'client/client-030.jpeg', 'client/client-031.jpeg']],
            ['Executive Boardroom Suite', 'Mumbai, India', 'Offices', 'executive-boardroom-suite', 'client/client-032.jpeg', ['client/client-032.jpeg', 'client/client-033.jpeg', 'client/client-034.jpeg', 'client/client-035.jpeg']],
        ];

        $civilProjects = [
            ['Luxury Villa', 'Bhuvaneshwar, India', 'Residential', 'luxury-villa', 'cv_1.png', ['cv_1.png', 'client/client-080.jpeg', 'client/client-081.jpeg', 'client/client-082.jpeg']],
            ['Flender Drives', 'Kharagpur, India', 'Industrial', 'industrial-facility', 'cv_2.png', ['cv_2.png', 'client/client-083.jpeg', 'client/client-084.jpeg', 'client/client-085.jpeg']],
            ['Residential Enclave', 'Kolkata, India', 'Residential', 'residential-building', 'cv_3.png', ['cv_3.png', 'client/client-086.jpeg', 'client/client-087.jpeg', 'client/client-088.jpeg']],
            ['Industrial Complex', 'Bhubaneswar, India', 'Industrial', 'industrial-complex', 'cv_4.png', ['cv_4.png', 'client/client-089.jpeg', 'client/client-090.jpeg', 'client/client-091.jpeg']],
            ['Commercial Tower', 'Kolkata, India', 'Commercial', 'commercial-tower', 'client/client-092.jpeg', ['client/client-092.jpeg', 'client/client-093.jpeg', 'client/client-094.jpeg', 'client/client-095.jpeg']],
            ['Institutional Campus', 'Howrah, India', 'Institutional', 'institutional-campus', 'client/client-096.jpeg', ['client/client-096.jpeg', 'client/client-097.jpeg', 'client/client-098.jpeg', 'client/client-099.jpeg']],
            ['Infrastructure Hub', 'Durgapur, India', 'Infrastructure', 'infrastructure-hub', 'client/client-100.jpeg', ['client/client-100.jpeg', 'client/client-101.jpeg', 'client/client-102.jpeg', 'client/client-103.jpeg']],
            ['Skyline Residences', 'Kolkata, India', 'Residential', 'skyline-residences', 'client/client-104.jpeg', ['client/client-104.jpeg', 'client/client-105.jpeg', 'client/client-106.jpeg', 'client/client-107.jpeg']],
            ['Industrial Plant', 'Haldia, India', 'Industrial', 'industrial-plant', 'client/client-108.jpeg', ['client/client-108.jpeg', 'client/client-109.jpeg', 'client/client-110.jpeg', 'client/client-111.jpeg']],
            ['Mixed-Use Development', 'Bhubaneswar, India', 'Commercial', 'mixed-use-development', 'client/client-112.jpeg', ['client/client-112.jpeg', 'client/client-113.jpeg', 'client/client-114.jpeg', 'client/client-115.jpeg']],
            ['Urban Infrastructure Project', 'Kolkata, India', 'Infrastructure', 'urban-infrastructure-project', 'client/client-116.jpeg', ['client/client-116.jpeg', 'client/client-117.jpeg', 'client/client-118.jpeg', 'client/client-119.jpeg']],
            ['Premium Commercial Block', 'Siliguri, India', 'Commercial', 'premium-commercial-block', 'client/client-120.jpeg', ['client/client-120.jpeg', 'client/client-001.jpeg', 'client/client-002.jpeg', 'client/client-003.jpeg']],
        ];

        $order = 1;
        foreach ($corporateProjects as [$title, $location, $filterTag, $slug, $cover, $slides]) {
            $coverPath = str_starts_with($cover, 'client/') ? $this->c(basename($cover)) : $this->p($cover);
            $slidePaths = array_map(
                fn (string $file) => str_starts_with($file, 'client/') ? $this->c(basename($file)) : $this->p($file),
                $slides,
            );

            ProjectsPageItem::query()->create(array_merge([
                'category_id' => $corporate->id,
                'title' => $title,
                'location' => $location,
                'image' => $coverPath,
                'slug' => $slug,
                'sort_order' => $order++,
                'active' => true,
            ], $this->detail($title, $coverPath, $slidePaths, $filterTag)));
        }

        $order = 1;
        foreach ($civilProjects as [$title, $location, $filterTag, $slug, $cover, $slides]) {
            $coverPath = str_starts_with($cover, 'client/') ? $this->c(basename($cover)) : $this->p($cover);
            $slidePaths = array_map(
                fn (string $file) => str_starts_with($file, 'client/') ? $this->c(basename($file)) : $this->p($file),
                $slides,
            );

            ProjectsPageItem::query()->create(array_merge([
                'category_id' => $civil->id,
                'title' => $title,
                'location' => $location,
                'image' => $coverPath,
                'slug' => $slug,
                'sort_order' => $order++,
                'active' => true,
            ], $this->detail($title, $coverPath, $slidePaths, $filterTag)));
        }
    }
}
