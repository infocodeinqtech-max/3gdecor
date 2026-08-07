<?php

namespace App\Support;

use App\Models\AboutContent;
use App\Models\ContactOfficeContent;
use App\Models\ContactPageContent;
use App\Models\ExpertiseContent;
use App\Models\FooterContent;
use App\Models\HeroContent;
use App\Models\NavigationMenu;
use App\Models\ProcessContent;
use App\Models\ProjectContent;
use App\Models\SectionHeader;
use App\Models\ServiceContent;
use App\Models\SiteContactContent;
use App\Models\TestimonialContent;
use App\Models\AboutPageHero;
use App\Models\AboutPageHeroFeature;
use App\Models\AboutPageFounderMember;
use App\Models\AboutPagePrinciple;
use App\Models\ProjectsPageContent;
use App\Models\ProjectsPageCategory;
use App\Models\ProjectsPageItem;

/**
 * Maps frontend storage keys → backend resources.
 * content_table values on home_section_headers are derived from list models here.
 */
class CmsRegistry
{
    public static function lists(): array
    {
        return [
            'navigation' => [
                'model' => NavigationMenu::class,
                'permission' => 'navigation',
                'order_by' => 'sort_order',
                'map_in' => fn (array $d) => [
                    'label' => $d['label'] ?? '',
                    'link' => $d['link'] ?? '',
                    'sort_order' => (int) ($d['order'] ?? $d['sort_order'] ?? 0),
                    'visible' => (bool) ($d['visible'] ?? true),
                    'active' => array_key_exists('active', $d) ? (bool) $d['active'] : true,
                ],
                'map_out' => fn ($row) => [
                    'id' => $row->id,
                    'label' => $row->label,
                    'link' => $row->link,
                    'order' => $row->sort_order,
                    'visible' => (bool) $row->visible,
                    'active' => (bool) $row->active,
                ],
            ],
            'expertise' => [
                'model' => ExpertiseContent::class,
                'permission' => 'expertise',
                'order_by' => 'sort_order',
                'map_in' => fn (array $d) => [
                    'title' => $d['title'] ?? '',
                    'description' => $d['description'] ?? '',
                    'image' => $d['image'] ?? '',
                    'sort_order' => (int) ($d['sort_order'] ?? $d['id'] ?? 0),
                    'active' => array_key_exists('active', $d) ? (bool) $d['active'] : true,
                ],
                'map_out' => fn ($row) => [
                    'id' => $row->id,
                    'title' => $row->title,
                    'description' => $row->description,
                    'image' => $row->image,
                    'active' => (bool) $row->active,
                ],
            ],
            'projects' => [
                'model' => ProjectContent::class,
                'permission' => 'projects',
                'order_by' => 'sort_order',
                'map_in' => fn (array $d) => [
                    'title' => $d['title'] ?? '',
                    'category' => $d['category'] ?? '',
                    'image' => $d['image'] ?? '',
                    'featured' => (bool) ($d['featured'] ?? false),
                    'sort_order' => (int) ($d['sort_order'] ?? $d['id'] ?? 0),
                    'active' => array_key_exists('active', $d) ? (bool) $d['active'] : true,
                ],
                'map_out' => fn ($row) => [
                    'id' => $row->id,
                    'title' => $row->title,
                    'category' => $row->category,
                    'image' => $row->image,
                    'featured' => (bool) $row->featured,
                    'active' => (bool) $row->active,
                ],
            ],
            'services' => [
                'model' => ServiceContent::class,
                'permission' => 'services',
                'order_by' => 'sort_order',
                'map_in' => fn (array $d) => [
                    'title' => $d['title'] ?? '',
                    'category' => $d['category'] ?? '',
                    'description' => $d['description'] ?? '',
                    'background_image' => $d['backgroundImage'] ?? $d['background_image'] ?? '',
                    'sort_order' => (int) ($d['sort_order'] ?? $d['id'] ?? 0),
                    'active' => array_key_exists('active', $d) ? (bool) $d['active'] : true,
                ],
                'map_out' => fn ($row) => [
                    'id' => $row->id,
                    'title' => $row->title,
                    'category' => $row->category,
                    'description' => $row->description,
                    'backgroundImage' => $row->background_image,
                    'active' => (bool) $row->active,
                ],
            ],
            'process' => [
                'model' => ProcessContent::class,
                'permission' => 'process',
                'order_by' => 'sort_order',
                'map_in' => fn (array $d) => [
                    'step' => $d['step'] ?? '',
                    'title' => $d['title'] ?? '',
                    'description' => $d['description'] ?? '',
                    'sort_order' => (int) ($d['sort_order'] ?? $d['id'] ?? 0),
                    'active' => array_key_exists('active', $d) ? (bool) $d['active'] : true,
                ],
                'map_out' => fn ($row) => [
                    'id' => $row->id,
                    'step' => $row->step,
                    'title' => $row->title,
                    'description' => $row->description,
                    'active' => (bool) $row->active,
                ],
            ],
            'testimonials' => [
                'model' => TestimonialContent::class,
                'permission' => 'testimonials',
                'order_by' => 'sort_order',
                'map_in' => fn (array $d) => [
                    'quote' => $d['quote'] ?? '',
                    'author' => $d['author'] ?? '',
                    'role' => $d['role'] ?? '',
                    'image' => $d['image'] ?? '',
                    'rating' => $d['rating'] ?? '',
                    'sort_order' => (int) ($d['sort_order'] ?? $d['id'] ?? 0),
                    'active' => array_key_exists('active', $d) ? (bool) $d['active'] : true,
                ],
                'map_out' => fn ($row) => [
                    'id' => $row->id,
                    'quote' => $row->quote,
                    'author' => $row->author,
                    'role' => $row->role,
                    'image' => $row->image,
                    'rating' => $row->rating,
                    'active' => (bool) $row->active,
                ],
            ],
            'contact-offices' => [
                'model' => ContactOfficeContent::class,
                'permission' => 'contact-offices',
                'order_by' => 'sort_order',
                'map_in' => fn (array $d) => [
                    'label' => $d['label'] ?? '',
                    'heading' => $d['heading'] ?? '',
                    'studio_title' => $d['studioTitle'] ?? $d['studio_title'] ?? '',
                    'address' => $d['address'] ?? '',
                    'phone' => $d['phone'] ?? '',
                    'email' => $d['email'] ?? '',
                    'hours' => $d['hours'] ?? '',
                    'map_embed' => $d['mapEmbed'] ?? $d['map_embed'] ?? '',
                    'sort_order' => (int) ($d['sort_order'] ?? $d['id'] ?? 0),
                    'active' => array_key_exists('active', $d) ? (bool) $d['active'] : true,
                ],
                'map_out' => fn ($row) => [
                    'id' => $row->id,
                    'label' => $row->label,
                    'heading' => $row->heading,
                    'studioTitle' => $row->studio_title,
                    'address' => $row->address,
                    'phone' => $row->phone,
                    'email' => $row->email,
                    'hours' => $row->hours,
                    'mapEmbed' => $row->map_embed,
                    'active' => (bool) $row->active,
                ],
            ],
            'about-page-hero-features' => [
                'model' => AboutPageHeroFeature::class,
                'permission' => 'about-page-hero-features',
                'order_by' => 'sort_order', 

                'map_in' => fn (array $d) => [
                    'home_about_contents_id' => AboutContent::query()->firstOrFail()->id,
                    'title'              => $d['title'] ?? '',
                    'description'        => $d['description'] ?? '',
                    'icon'               => $d['icon'] ?? '',
                    'sort_order'         => (int) ($d['sort_order'] ?? 0),
                    'active'             => array_key_exists('active', $d) ? (bool) $d['active'] : true,
                ],

                'map_out' => fn ($row) => [
                    'id'                => $row->id,
                    'home_about_contents_id'   => $row->home_about_contents_id,
                    'title'             => $row->title,
                    'description'       => $row->description,
                    'icon'              => $row->icon,
                    'sort_order'         => $row->sort_order,
                    'active'            => (bool) $row->active,
                ],
            ],
            'about-page-founder-members' => [
                'model' => AboutPageFounderMember::class,
                'permission' => 'about-page-founder-members',
                'order_by' => 'sort_order',

                'map_in' => fn (array $d) => [
                    'home_about_contents_id' => AboutContent::query()->firstOrFail()->id,
                    'image' => $d['image'] ?? '',
                    'name' => $d['name'] ?? '',
                    'title' => $d['title'] ?? '',
                    'short_description' => $d['short_description'] ?? '',
                    'sort_order' => (int) ($d['sort_order'] ?? 1),
                    'active' => array_key_exists('active', $d)
                        ? (bool) $d['active']
                        : true,
                ],

                'map_out' => fn ($row) => [
                    'id' => $row->id,
                    'home_about_contents_id' => $row->home_about_contents_id,
                    'image' => $row->image,
                    'name' => $row->name,
                    'title' => $row->title,
                    'short_description' => $row->short_description,
                    'sort_order' => $row->sort_order,
                    'active' => (bool) $row->active,
                ],
            ],
            'about-page-principles' => [
                'model' => AboutPagePrinciple::class,
                'permission' => 'about-page-principles',
                'order_by' => 'sort_order',

                'map_in' => fn (array $d) => [
                    'home_about_contents_id' => AboutContent::query()->firstOrFail()->id,
                    'icon' => $d['icon'] ?? '',
                    'title' => $d['title'] ?? '',
                    'description' => $d['description'] ?? '',
                    'sort_order' => (int) ($d['sort_order'] ?? 0),
                    'active' => array_key_exists('active', $d)
                        ? (bool) $d['active']
                        : true,
                ],

                'map_out' => fn ($row) => [
                    'id' => $row->id,
                    'home_about_contents_id' => $row->home_about_contents_id,
                    'icon' => $row->icon,
                    'title' => $row->title,
                    'description' => $row->description,
                    'sort_order' => $row->sort_order,
                    'active' => (bool) $row->active,
                ],
            ],
            'projects-page-categories' => [
                'model' => ProjectsPageCategory::class,
                'permission' => 'projects-page',
                'order_by' => 'sort_order',
                'map_in' => fn (array $d) => [
                    'title' => $d['title'] ?? '',
                    'slug' => $d['slug'] ?? '',
                    'image' => $d['image'] ?? '',
                    'icon' => $d['icon'] ?? 'Building2',
                    'tags' => $d['tags'] ?? '',
                    'button' => $d['button'] ?? 'View Projects',
                    'link' => $d['link'] ?? '/projects',
                    'section_subtitle' => $d['sectionSubtitle'] ?? '',
                    'section_title' => $d['sectionTitle'] ?? '',
                    'section_description' => $d['sectionDescription'] ?? '',
                    'list_banner_image' => $d['listBannerImage'] ?? '',
                    'list_breadcrumb' => $d['listBreadcrumb'] ?? '',
                    'list_hero_title' => $d['listHeroTitle'] ?? '',
                    'list_description' => $d['listDescription'] ?? '',
                    'list_filters' => $d['listFilters'] ?? [],
                    'sort_order' => (int) ($d['sort_order'] ?? $d['order'] ?? 0),
                    'active' => array_key_exists('active', $d) ? (bool) $d['active'] : true,
                ],
                'map_out' => fn ($row) => [
                    'id' => $row->id,
                    'title' => $row->title,
                    'slug' => $row->slug,
                    'image' => $row->image,
                    'icon' => $row->icon,
                    'tags' => $row->tags,
                    'button' => $row->button,
                    'link' => $row->link,
                    'sectionSubtitle' => $row->section_subtitle,
                    'sectionTitle' => $row->section_title,
                    'sectionDescription' => $row->section_description,
                    'listBannerImage' => $row->list_banner_image,
                    'listBreadcrumb' => $row->list_breadcrumb,
                    'listHeroTitle' => $row->list_hero_title,
                    'listDescription' => $row->list_description,
                    'listFilters' => $row->list_filters ?? [],
                    'order' => $row->sort_order,
                    'active' => (bool) $row->active,
                ],
            ],
            'projects-page-items' => [
                'model' => ProjectsPageItem::class,
                'permission' => 'projects-page',
                'order_by' => 'sort_order',
                'map_in' => fn (array $d) => [
                    'category_id' => (int) ($d['categoryId'] ?? $d['category_id'] ?? 0) ?: null,
                    'title' => $d['title'] ?? '',
                    'location' => $d['location'] ?? '',
                    'filter_tag' => $d['filterTag'] ?? '',
                    'image' => $d['image'] ?? '',
                    'slug' => $d['slug'] ?? '',
                    'hero_tagline' => $d['heroTagline'] ?? '',
                    'status_label' => $d['statusLabel'] ?? 'Completed Project',
                    'hero_slides' => $d['heroSlides'] ?? [],
                    'about_title' => $d['aboutTitle'] ?? '',
                    'about_description' => $d['aboutDescription'] ?? '',
                    'about_features' => $d['aboutFeatures'] ?? [],
                    'about_image' => $d['aboutImage'] ?? '',
                    'stat_completed' => $d['statCompleted'] ?? '',
                    'stat_area' => $d['statArea'] ?? '',
                    'stat_duration' => $d['statDuration'] ?? '',
                    'gallery_eyebrow' => $d['galleryEyebrow'] ?? 'Project Gallery',
                    'gallery_title' => $d['galleryTitle'] ?? 'A Visual Journey',
                    'gallery_description' => $d['galleryDescription'] ?? '',
                    'gallery_images' => $d['galleryImages'] ?? [],
                    'sort_order' => (int) ($d['sort_order'] ?? $d['order'] ?? 0),
                    'active' => array_key_exists('active', $d) ? (bool) $d['active'] : true,
                ],
                'map_out' => fn ($row) => [
                    'id' => $row->id,
                    'categoryId' => $row->category_id,
                    'title' => $row->title,
                    'location' => $row->location,
                    'filterTag' => $row->filter_tag,
                    'image' => $row->image,
                    'slug' => $row->slug,
                    'heroTagline' => $row->hero_tagline,
                    'statusLabel' => $row->status_label,
                    'heroSlides' => $row->hero_slides ?? [],
                    'aboutTitle' => $row->about_title,
                    'aboutDescription' => $row->about_description,
                    'aboutFeatures' => $row->about_features ?? [],
                    'aboutImage' => $row->about_image,
                    'statCompleted' => $row->stat_completed,
                    'statArea' => $row->stat_area,
                    'statDuration' => $row->stat_duration,
                    'galleryEyebrow' => $row->gallery_eyebrow,
                    'galleryTitle' => $row->gallery_title,
                    'galleryDescription' => $row->gallery_description,
                    'galleryImages' => $row->gallery_images ?? [],
                    'order' => $row->sort_order,
                    'active' => (bool) $row->active,
                ],
            ],
        ];
    }

    public static function singletons(): array
    {
        return [
            'hero' => [
                'model' => HeroContent::class,
                'permission' => 'hero',
                'map_in' => fn (array $d) => [
                    'tagline' => $d['tagline'] ?? '',
                    'headline_line1' => $d['headlineLine1'] ?? '',
                    'headline_line2' => $d['headlineLine2'] ?? '',
                    'script_text' => $d['scriptText'] ?? '',
                    'description' => $d['description'] ?? '',
                    'left_card_title' => $d['leftCardTitle'] ?? '',
                    'right_card_title' => $d['rightCardTitle'] ?? '',
                    'cta_corporate_text' => $d['ctaCorporateText'] ?? '',
                    'cta_corporate_link' => $d['ctaCorporateLink'] ?? '',
                    'cta_civil_text' => $d['ctaCivilText'] ?? '',
                    'cta_civil_link' => $d['ctaCivilLink'] ?? '',
                    'background_image' => $d['backgroundImage'] ?? '',
                    'stats' => $d['stats'] ?? [],
                    'active' => array_key_exists('active', $d) ? (bool) $d['active'] : true,
                ],
                'map_out' => fn ($row) => [
                    'tagline' => $row->tagline,
                    'headlineLine1' => $row->headline_line1,
                    'headlineLine2' => $row->headline_line2,
                    'scriptText' => $row->script_text,
                    'description' => $row->description,
                    'leftCardTitle' => $row->left_card_title,
                    'rightCardTitle' => $row->right_card_title,
                    'ctaCorporateText' => $row->cta_corporate_text,
                    'ctaCorporateLink' => $row->cta_corporate_link,
                    'ctaCivilText' => $row->cta_civil_text,
                    'ctaCivilLink' => $row->cta_civil_link,
                    'backgroundImage' => $row->background_image,
                    'stats' => $row->stats ?? [],
                    'active' => (bool) $row->active,
                ],
            ],
            'about' => [
                'model' => AboutContent::class,
                'permission' => 'about',
                'map_in' => fn (array $d) => [
                    'label' => $d['label'] ?? '',
                    'title_line1' => $d['titleLine1'] ?? '',
                    'title_line2' => $d['titleLine2'] ?? '',
                    'title_highlight' => $d['titleHighlight'] ?? '',
                    'paragraph1' => $d['paragraph1'] ?? '',
                    'paragraph2' => $d['paragraph2'] ?? '',
                    'images' => $d['images'] ?? ['', '', '', ''],
                    'badge_image' => $d['badgeImage'] ?? '',
                    'active' => array_key_exists('active', $d) ? (bool) $d['active'] : true,
                ],
                'map_out' => fn ($row) => [
                    'label' => $row->label,
                    'titleLine1' => $row->title_line1,
                    'titleLine2' => $row->title_line2,
                    'titleHighlight' => $row->title_highlight,
                    'paragraph1' => $row->paragraph1,
                    'paragraph2' => $row->paragraph2,
                    'images' => $row->images ?? ['', '', '', ''],
                    'badgeImage' => $row->badge_image,
                    'active' => (bool) $row->active,
                ],
            ],
            'footer' => [
                'model' => FooterContent::class,
                'permission' => 'footer',
                'map_in' => fn (array $d) => [
                    'tagline' => $d['tagline'] ?? '',
                    'newsletter_title' => $d['newsletterTitle'] ?? '',
                    'newsletter_text' => $d['newsletterText'] ?? '',
                    'copyright' => $d['copyright'] ?? '',
                    'active' => array_key_exists('active', $d) ? (bool) $d['active'] : true,
                ],
                'map_out' => fn ($row) => [
                    'tagline' => $row->tagline,
                    'newsletterTitle' => $row->newsletter_title,
                    'newsletterText' => $row->newsletter_text,
                    'copyright' => $row->copyright,
                    'active' => (bool) $row->active,
                ],
            ],
            'site-contact' => [
                'model' => SiteContactContent::class,
                'permission' => 'contact-offices',
                'map_in' => fn (array $d) => [
                    'address' => $d['address'] ?? '',
                    'country' => $d['country'] ?? '',
                    'phone' => preg_replace('/\D+/', '', (string) ($d['phone'] ?? '')) ?: '',
                    'email' => $d['email'] ?? '',
                    'hours' => $d['hours'] ?? '',
                    'whatsapp_number' => preg_replace('/\D+/', '', (string) ($d['whatsappNumber'] ?? '')) ?: '',
                    'active' => array_key_exists('active', $d) ? (bool) $d['active'] : true,
                ],
                'map_out' => fn ($row) => [
                    'address' => $row->address,
                    'country' => $row->country,
                    'phone' => $row->phone,
                    'email' => $row->email,
                    'hours' => $row->hours,
                    'whatsappNumber' => $row->whatsapp_number,
                    'active' => (bool) $row->active,
                ],
            ],
            'contact-page' => [
                'model' => ContactPageContent::class,
                'permission' => 'contact-offices',
                'map_in' => fn (array $d) => [
                    'banner_image' => $d['bannerImage'] ?? '',
                    'hero_eyebrow' => $d['heroEyebrow'] ?? '',
                    'hero_title_line1' => $d['heroTitleLine1'] ?? '',
                    'hero_title_line2' => $d['heroTitleLine2'] ?? '',
                    'hero_title_highlight' => $d['heroTitleHighlight'] ?? '',
                    'hero_description' => $d['heroDescription'] ?? '',
                    'details_eyebrow' => $d['detailsEyebrow'] ?? '',
                    'details_title' => $d['detailsTitle'] ?? '',
                    'details_title_highlight' => $d['detailsTitleHighlight'] ?? '',
                    'details_description' => $d['detailsDescription'] ?? '',
                    'form_eyebrow' => $d['formEyebrow'] ?? '',
                    'form_title' => $d['formTitle'] ?? '',
                    'form_description' => $d['formDescription'] ?? '',
                    'active' => array_key_exists('active', $d) ? (bool) $d['active'] : true,
                ],
                'map_out' => fn ($row) => [
                    'bannerImage' => $row->banner_image,
                    'heroEyebrow' => $row->hero_eyebrow,
                    'heroTitleLine1' => $row->hero_title_line1,
                    'heroTitleLine2' => $row->hero_title_line2,
                    'heroTitleHighlight' => $row->hero_title_highlight,
                    'heroDescription' => $row->hero_description,
                    'detailsEyebrow' => $row->details_eyebrow,
                    'detailsTitle' => $row->details_title,
                    'detailsTitleHighlight' => $row->details_title_highlight,
                    'detailsDescription' => $row->details_description,
                    'formEyebrow' => $row->form_eyebrow,
                    'formTitle' => $row->form_title,
                    'formDescription' => $row->form_description,
                    'active' => (bool) $row->active,
                ],
            ],
            'about-page-hero' => [
                'model' => AboutPageHero::class,
                'permission' => 'about-page-hero',

                'map_in' => fn (array $d) => [
                    'small_title'      => $d['smallTitle'] ?? '',
                    'title'            => $d['title'] ?? '',
                    'description'      => $d['description'] ?? '',
                    'background_image' => $d['backgroundImage'] ?? '',
                    'active'           => array_key_exists('active', $d) ? (bool) $d['active'] : true,
                ],

                'map_out' => fn ($row) => [
                    'smallTitle'      => $row->small_title,
                    'title'           => $row->title,
                    'description'     => $row->description,
                    'backgroundImage' => $row->background_image,
                    'active'          => (bool) $row->active,
                ],
            ],
            'projects-page' => [
                'model' => ProjectsPageContent::class,
                'permission' => 'projects-page',
                'map_in' => fn (array $d) => [
                    'banner_image' => $d['bannerImage'] ?? '',
                    'hero_eyebrow' => $d['heroEyebrow'] ?? '',
                    'hero_title_prefix' => $d['heroTitlePrefix'] ?? '',
                    'hero_title_highlight' => $d['heroTitleHighlight'] ?? '',
                    'hero_description_1' => $d['heroDescription1'] ?? '',
                    'hero_description_2' => $d['heroDescription2'] ?? '',
                    'categories_eyebrow' => $d['categoriesEyebrow'] ?? '',
                    'categories_title_line1' => $d['categoriesTitleLine1'] ?? '',
                    'categories_title_line2' => $d['categoriesTitleLine2'] ?? '',
                    'categories_description' => $d['categoriesDescription'] ?? '',
                    'active' => array_key_exists('active', $d) ? (bool) $d['active'] : true,
                ],
                'map_out' => fn ($row) => [
                    'bannerImage' => $row->banner_image,
                    'heroEyebrow' => $row->hero_eyebrow,
                    'heroTitlePrefix' => $row->hero_title_prefix,
                    'heroTitleHighlight' => $row->hero_title_highlight,
                    'heroDescription1' => $row->hero_description_1,
                    'heroDescription2' => $row->hero_description_2,
                    'categoriesEyebrow' => $row->categories_eyebrow,
                    'categoriesTitleLine1' => $row->categories_title_line1,
                    'categoriesTitleLine2' => $row->categories_title_line2,
                    'categoriesDescription' => $row->categories_description,
                    'active' => (bool) $row->active,
                ],
            ],
        ];
    }

    /**
     * Section header storage keys → meta.
     * content_table is taken from the related list model so renames stay in sync.
     */
    public static function sectionHeaderKeys(): array
    {
        $lists = self::lists();

        return [
            'expertise-section' => [
                'key' => 'expertise',
                'permission' => 'expertise',
                'content_table' => (new $lists['expertise']['model'])->getTable(),
            ],
            'projects-section' => [
                'key' => 'projects',
                'permission' => 'projects',
                'content_table' => (new $lists['projects']['model'])->getTable(),
            ],
            'services-section' => [
                'key' => 'services',
                'permission' => 'services',
                'content_table' => (new $lists['services']['model'])->getTable(),
            ],
            'process-section' => [
                'key' => 'process',
                'permission' => 'process',
                'content_table' => (new $lists['process']['model'])->getTable(),
            ],
            'testimonials-section' => [
                'key' => 'testimonials',
                'permission' => 'testimonials',
                'content_table' => (new $lists['testimonials']['model'])->getTable(),
            ],
        ];
    }

    /** Keep home_section_headers.content_table aligned with current model table names. */
    public static function syncSectionContentTables(): void
    {
        foreach (self::sectionHeaderKeys() as $meta) {
            SectionHeader::query()
                ->where('key', $meta['key'])
                ->update(['content_table' => $meta['content_table']]);
        }
    }

    public static function mapSectionIn(string $storageKey, array $d): array
    {
        $meta = self::sectionHeaderKeys()[$storageKey] ?? null;

        return [
            'label' => $d['label'] ?? null,
            'title' => $d['title'] ?? null,
            'title_line1' => $d['titleLine1'] ?? null,
            'title_line2' => $d['titleLine2'] ?? null,
            'title_highlight' => $d['titleHighlight'] ?? null,
            'description' => $d['description'] ?? null,
            'cta_text' => $d['ctaText'] ?? null,
            'content_table' => $meta['content_table'] ?? ($d['contentTable'] ?? null),
            'active' => array_key_exists('active', $d) ? (bool) $d['active'] : true,
        ];
    }

    public static function mapSectionOut(SectionHeader $row): array
    {
        // Prefer live registry table name so renames auto-reflect
        $liveTable = null;
        foreach (self::sectionHeaderKeys() as $meta) {
            if ($meta['key'] === $row->key) {
                $liveTable = $meta['content_table'];
                break;
            }
        }

        if ($liveTable && $row->content_table !== $liveTable) {
            // Do not write on public reads — that slows every page load.
            // content_table is corrected on admin section upsert / seeder sync.
        }

        return [
            'label' => $row->label ?? '',
            'title' => $row->title ?? '',
            'titleLine1' => $row->title_line1 ?? '',
            'titleLine2' => $row->title_line2 ?? '',
            'titleHighlight' => $row->title_highlight ?? '',
            'description' => $row->description ?? '',
            'ctaText' => $row->cta_text ?? '',
            'contentTable' => $liveTable ?? $row->content_table ?? '',
            'active' => (bool) $row->active,
        ];
    }
}
