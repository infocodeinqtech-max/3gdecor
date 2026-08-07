<?php

namespace Database\Seeders;

use App\Models\ProjectsPageItem;
use Illuminate\Database\Seeder;

class RestoreProjectsPageItemCardsSeeder extends Seeder
{
    /** @var array<string, array{title: string, location: string, filter_tag: string, category_id: int}> */
    private array $bySlug = [
        'tech-mahindra-office' => ['title' => 'Tech Mahindra Office', 'location' => 'Kolkata, India', 'filter_tag' => 'Offices', 'category_id' => 1],
        'siemens-innovation-hub' => ['title' => 'Siemens Innovation Hub', 'location' => 'Kolkata, India', 'filter_tag' => 'Workspaces', 'category_id' => 1],
        'executive-dining-space' => ['title' => 'Executive Dining Space', 'location' => 'Kolkata, India', 'filter_tag' => 'Workspaces', 'category_id' => 1],
        'creative-studio-workspace' => ['title' => 'Creative Studio Workspace', 'location' => 'Kolkata, India', 'filter_tag' => 'Workspaces', 'category_id' => 1],
        'hdfc-bank' => ['title' => 'HDFC Bank Branch', 'location' => 'Kolkata, India', 'filter_tag' => 'Banks', 'category_id' => 1],
        'datasoft-it-park' => ['title' => 'DataSoft IT Park', 'location' => 'Kolkata, India', 'filter_tag' => 'IT Parks', 'category_id' => 1],
        'mahindra-office' => ['title' => 'Mahindra & Mahindra Office', 'location' => 'Kolkata, India', 'filter_tag' => 'Offices', 'category_id' => 1],
        'acme-corporate' => ['title' => 'Acme Corp Headquarters', 'location' => 'Kolkata, India', 'filter_tag' => 'Offices', 'category_id' => 1],
        'corporate-reception' => ['title' => 'Corporate Reception Lounge', 'location' => 'Kolkata, India', 'filter_tag' => 'Offices', 'category_id' => 1],
        'premium-workspace-hub' => ['title' => 'Premium Workspace Hub', 'location' => 'Hyderabad, India', 'filter_tag' => 'Workspaces', 'category_id' => 1],
        'innovation-collaboration-center' => ['title' => 'Innovation Collaboration Center', 'location' => 'Bengaluru, India', 'filter_tag' => 'Workspaces', 'category_id' => 1],
        'executive-boardroom-suite' => ['title' => 'Executive Boardroom Suite', 'location' => 'Mumbai, India', 'filter_tag' => 'Offices', 'category_id' => 1],
        'luxury-villa' => ['title' => 'Luxury Villa', 'location' => 'Bhuvaneshwar, India', 'filter_tag' => 'Residential', 'category_id' => 2],
        'industrial-facility' => ['title' => 'Flender Drives', 'location' => 'Kharagpur, India', 'filter_tag' => 'Industrial', 'category_id' => 2],
        'residential-building' => ['title' => 'Residential Enclave', 'location' => 'Kolkata, India', 'filter_tag' => 'Residential', 'category_id' => 2],
        'industrial-complex' => ['title' => 'Industrial Complex', 'location' => 'Bhubaneswar, India', 'filter_tag' => 'Industrial', 'category_id' => 2],
        'commercial-tower' => ['title' => 'Commercial Tower', 'location' => 'Kolkata, India', 'filter_tag' => 'Commercial', 'category_id' => 2],
        'institutional-campus' => ['title' => 'Institutional Campus', 'location' => 'Howrah, India', 'filter_tag' => 'Institutional', 'category_id' => 2],
        'infrastructure-hub' => ['title' => 'Infrastructure Hub', 'location' => 'Durgapur, India', 'filter_tag' => 'Infrastructure', 'category_id' => 2],
        'skyline-residences' => ['title' => 'Skyline Residences', 'location' => 'Kolkata, India', 'filter_tag' => 'Residential', 'category_id' => 2],
        'industrial-plant' => ['title' => 'Industrial Plant', 'location' => 'Haldia, India', 'filter_tag' => 'Industrial', 'category_id' => 2],
        'mixed-use-development' => ['title' => 'Mixed-Use Development', 'location' => 'Bhubaneswar, India', 'filter_tag' => 'Commercial', 'category_id' => 2],
        'urban-infrastructure-project' => ['title' => 'Urban Infrastructure Project', 'location' => 'Kolkata, India', 'filter_tag' => 'Infrastructure', 'category_id' => 2],
        'premium-commercial-block' => ['title' => 'Premium Commercial Block', 'location' => 'Siliguri, India', 'filter_tag' => 'Commercial', 'category_id' => 2],
    ];

    public function run(): void
    {
        $categories = \App\Models\ProjectsPageCategory::query()
            ->pluck('id', 'slug');

        $corporateId = $categories['corporate'] ?? 1;
        $civilId = $categories['civil'] ?? 2;

        $broken = ProjectsPageItem::query()
            ->where(function ($q) {
                $q->whereNull('title')->orWhere('title', '');
            })
            ->get();

        foreach ($broken as $item) {
            $seed = $this->bySlug[$item->slug] ?? null;
            if (! $seed) {
                continue;
            }

            $categoryId = $seed['category_id'] === 1 ? $corporateId : $civilId;

            $item->update([
                'title' => $seed['title'],
                'location' => $seed['location'],
                'filter_tag' => $seed['filter_tag'],
                'category_id' => $categoryId,
            ]);

            echo "Restored: {$item->slug}\n";
        }
    }
}
