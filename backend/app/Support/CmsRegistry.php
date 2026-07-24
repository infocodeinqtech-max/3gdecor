<?php

namespace App\Support;

use App\Models\AboutContent;
use App\Models\ContactOfficeContent;
use App\Models\ExpertiseContent;
use App\Models\FooterContent;
use App\Models\HeroContent;
use App\Models\NavigationMenu;
use App\Models\ProcessContent;
use App\Models\ProjectContent;
use App\Models\SectionHeader;
use App\Models\ServiceContent;
use App\Models\TestimonialContent;

/**
 * Maps frontend storage keys → backend resources.
 * content_table values on section_headers are derived from list models here.
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
                    'address' => $d['address'] ?? '',
                    'country' => $d['country'] ?? '',
                    'phone' => $d['phone'] ?? '',
                    'email' => $d['email'] ?? '',
                    'hours' => $d['hours'] ?? '',
                    'newsletter_title' => $d['newsletterTitle'] ?? '',
                    'newsletter_text' => $d['newsletterText'] ?? '',
                    'copyright' => $d['copyright'] ?? '',
                    'active' => array_key_exists('active', $d) ? (bool) $d['active'] : true,
                ],
                'map_out' => fn ($row) => [
                    'tagline' => $row->tagline,
                    'address' => $row->address,
                    'country' => $row->country,
                    'phone' => $row->phone,
                    'email' => $row->email,
                    'hours' => $row->hours,
                    'newsletterTitle' => $row->newsletter_title,
                    'newsletterText' => $row->newsletter_text,
                    'copyright' => $row->copyright,
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

    /** Keep section_headers.content_table aligned with current model table names. */
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
            $row->content_table = $liveTable;
            $row->saveQuietly();
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
