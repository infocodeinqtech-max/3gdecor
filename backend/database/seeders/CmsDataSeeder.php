<?php

namespace Database\Seeders;

use App\Models\AboutContent;
use App\Models\ContactOfficeContent;
use App\Models\ContactPageContent;
use App\Models\Enquiry;
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
use App\Support\CmsRegistry;
use App\Support\MediaPath;
use Illuminate\Database\Seeder;

class CmsDataSeeder extends Seeder
{
    public function run(): void
    {
        // Navigation
        NavigationMenu::query()->delete();
        foreach ([
            ['HOME', '/', 1],
            ['EXPERTISE', '/#features', 2],
            ['ABOUT', '/about', 3],
            ['SERVICES', '/services', 4],
            ['PROJECTS', '/#projects', 5],
            ['CONTACT', '/contact', 6],
        ] as [$label, $link, $order]) {
            NavigationMenu::query()->create([
                'label' => $label,
                'link' => $link,
                'sort_order' => $order,
                'visible' => true,
                'active' => true,
            ]);
        }

        // Hero
        HeroContent::query()->delete();
        HeroContent::query()->create([
            'tagline' => 'SPACES THAT INSPIRE.',
            'headline_line1' => 'Corporate Interiors.',
            'headline_line2' => 'Civil Structures.',
            'script_text' => 'Built to Elevate.',
            'description' => 'From modern workplaces to industrial landmarks — we design and build spaces that drive productivity, efficiency and sustainable growth.',
            'left_card_title' => "Corporate\nInteriors",
            'right_card_title' => "Civil\nStructures",
            'cta_corporate_text' => 'Explore Corporate Projects',
            'cta_corporate_link' => '#corporate-projects',
            'cta_civil_text' => 'Explore Civil Projects',
            'cta_civil_link' => '#civil-projects',
            'background_image' => '',
            'stats' => [
                ['id' => 1, 'number' => '250+', 'label' => 'Projects Delivered'],
                ['id' => 2, 'number' => '15+', 'label' => 'Years Experience'],
                ['id' => 3, 'number' => '100%', 'label' => 'Client Satisfaction'],
            ],
            'active' => true,
        ]);

        // About
        AboutContent::query()->delete();
        AboutContent::query()->create([
            'label' => 'ABOUT US',
            'title_line1' => 'Creating Spaces',
            'title_line2' => 'That',
            'title_highlight' => 'Inspire',
            'paragraph1' => 'With over 15 years of excellence in interior architecture, 3G Decorative Group transforms visions into timeless spaces blending luxury, innovation, and refined sophistication.',
            'paragraph2' => 'Every detail is carefully crafted to create environments that inspire comfort, beauty and lasting elegance.',
            'images' => [
                MediaPath::path('about', 'about-1.jpg'),
                MediaPath::path('about', 'about-2.jpg'),
                MediaPath::path('about', 'about-3.jpg'),
                MediaPath::path('about', 'about-4.jpg'),
            ],
            'badge_image' => MediaPath::path('about', 'badge.jpg'),
            'active' => true,
        ]);

        // Section headers (content_table filled from CmsRegistry)
        SectionHeader::query()->delete();
        $sectionMeta = CmsRegistry::sectionHeaderKeys();

        SectionHeader::query()->create([
            'key' => 'expertise',
            'content_table' => $sectionMeta['expertise-section']['content_table'],
            'title_line1' => 'Crafting',
            'title_line2' => 'Exceptional Spaces',
            'description' => 'Timeless interiors shaped through elegance, precision, and visionary craftsmanship.',
            'active' => true,
        ]);
        SectionHeader::query()->create([
            'key' => 'projects',
            'content_table' => $sectionMeta['projects-section']['content_table'],
            'label' => 'PORTFOLIO',
            'title' => 'Featured Projects',
            'description' => 'A curated selection of our most prestigious interior design projects',
            'cta_text' => 'Explore All Projects',
            'active' => true,
        ]);
        SectionHeader::query()->create([
            'key' => 'services',
            'content_table' => $sectionMeta['services-section']['content_table'],
            'label' => 'Services',
            'title' => 'Services Crafted for You',
            'active' => true,
        ]);
        SectionHeader::query()->create([
            'key' => 'process',
            'content_table' => $sectionMeta['process-section']['content_table'],
            'label' => 'OUR PROCESS',
            'title' => 'How We Work',
            'description' => 'A seamless journey from concept to completion',
            'active' => true,
        ]);
        SectionHeader::query()->create([
            'key' => 'testimonials',
            'content_table' => $sectionMeta['testimonials-section']['content_table'],
            'label' => 'TESTIMONIALS',
            'title_line1' => 'Genuine Feedback From',
            'title_highlight' => 'Our Loyal Customers',
            'description' => 'Trusted by homeowners and businesses for creating spaces defined by elegance, comfort, and timeless luxury.',
            'active' => true,
        ]);

        // Expertise
        ExpertiseContent::query()->delete();
        foreach ([
            ['Innovative Interior Concepts', 'Fresh and creative design solutions crafted to reflect personality and functionality.', MediaPath::path('expertise', 'expertise-1.jpg')],
            ['Luxury Living Spaces', 'Elegant interiors blending comfort, sophistication, and timeless aesthetics.', MediaPath::path('expertise', 'expertise-2.jpg')],
            ['Modern Architectural Vision', 'Bold architectural concepts designed with precision, balance, and innovation.', MediaPath::path('expertise', 'expertise-3.jpg')],
        ] as $i => [$title, $desc, $img]) {
            ExpertiseContent::query()->create([
                'title' => $title,
                'description' => $desc,
                'image' => $img,
                'sort_order' => $i + 1,
                'active' => true,
            ]);
        }

        // Projects
        ProjectContent::query()->delete();
        $projects = [
            ['Modern Elegance Villa', 'Residential', MediaPath::path('projects', 'project-1.jpg'), true],
            ['Contemporary Dining', 'Commercial', MediaPath::path('projects', 'project-2.jpg'), false],
            ['Luxury Penthouse', 'Residential', MediaPath::path('projects', 'project-3.jpg'), false],
            ['Executive Office', 'Commercial', MediaPath::path('projects', 'project-4.jpg'), false],
            ['Minimalist Lounge', 'Residential', MediaPath::path('projects', 'project-5.jpg'), false],
        ];
        foreach ($projects as $i => [$title, $cat, $img, $featured]) {
            ProjectContent::query()->create([
                'title' => $title,
                'category' => $cat,
                'image' => $img,
                'featured' => $featured,
                'sort_order' => $i + 1,
                'active' => true,
            ]);
        }

        // Services
        ServiceContent::query()->delete();
        $services = [
            ['Interior Design', 'Design', 'Bespoke interior solutions that blend aesthetics with functionality for residential and commercial spaces.', MediaPath::path('services', 'service-1.jpg')],
            ['Architectural Planning', 'Architecture', 'Innovative architectural planning and design services that bring your vision to structural reality.', MediaPath::path('services', 'service-2.jpg')],
            ['Furniture Design', 'Custom', 'Custom furniture pieces crafted to perfection, combining luxury with comfort and timeless style.', MediaPath::path('services', 'service-3.jpg')],
            ['Turnkey Projects', 'Development', 'Complete end-to-end project execution from concept to completion with seamless coordination.', MediaPath::path('services', 'service-4.jpg')],
            ['Commercial Interiors', 'Commercial', 'Professional workspace design that enhances productivity while reflecting your brand identity.', MediaPath::path('services', 'service-5.jpg')],
            ['Luxury Renovations', 'Renovation', 'Transform existing spaces into luxurious environments with our expert renovation services.', MediaPath::path('services', 'service-6.jpg')],
        ];
        foreach ($services as $i => [$title, $cat, $desc, $img]) {
            ServiceContent::query()->create([
                'title' => $title,
                'category' => $cat,
                'description' => $desc,
                'background_image' => $img,
                'sort_order' => $i + 1,
                'active' => true,
            ]);
        }

        // Process
        ProcessContent::query()->delete();
        foreach ([
            ['01', 'Consultation', 'Understanding your vision and requirements'],
            ['02', 'Concept Design', 'Creating detailed design proposals'],
            ['03', 'Planning', 'Refining every detail to perfection'],
            ['04', 'Execution', 'Bringing your dream space to life'],
            ['05', 'Delivery', 'Final handover with quality assurance'],
        ] as $i => [$step, $title, $desc]) {
            ProcessContent::query()->create([
                'step' => $step,
                'title' => $title,
                'description' => $desc,
                'sort_order' => $i + 1,
                'active' => true,
            ]);
        }

        // Testimonials
        TestimonialContent::query()->delete();
        foreach ([
            ['3G Decorative Group\'s ability to create exceptional luxury interiors stands out. Their attention to architectural detail and refined aesthetics transformed our residence into a timeless masterpiece.', 'Sarah Mitchell', 'Luxury Homeowner, Manhattan', MediaPath::path('testimonials', 'testimonial-1.jpg'), '4.9 out of 5'],
            ['The level of sophistication and precision they bring to every design decision is remarkable. Our commercial space now reflects the premium quality we stand for.', 'David Chen', 'CEO, Design Studio', MediaPath::path('testimonials', 'testimonial-2.jpg'), '4.8 out of 5'],
            ['Working with 3G was an extraordinary experience. They understood our vision for luxury and elegance, delivering interior architecture that exceeds every expectation.', 'Emily Rodriguez', 'Property Developer, Miami', MediaPath::path('testimonials', 'testimonial-3.jpg'), '4.9 out of 5'],
        ] as $i => [$quote, $author, $role, $img, $rating]) {
            TestimonialContent::query()->create([
                'quote' => $quote,
                'author' => $author,
                'role' => $role,
                'image' => $img,
                'rating' => $rating,
                'sort_order' => $i + 1,
                'active' => true,
            ]);
        }

        // Contact offices (location-wise contact details)
        ContactOfficeContent::query()->delete();
        $sharedAddress = '14, 16A, Golf Club Rd, Rajendra Prasad Colony, Tollygunge, Kolkata, West Bengal 700033, India';
        $sharedMap = 'https://maps.google.com/maps?q=14%2C%2016A%2C%20Golf%20Club%20Rd%2C%20Rajendra%20Prasad%20Colony%2C%20Tollygunge%2C%20Kolkata%2C%20West%20Bengal%20700033%2C%20India&t=&z=16&ie=UTF8&iwloc=&output=embed';
        $sharedPhone = '8167028450';
        $sharedEmail = 'info@3gdecorative.com';
        $sharedHours = 'Mon – Sat, 9:00 AM – 7:00 PM';

        foreach ([
            ['Kolkata', 'Kolkata Address', 'Visit Our Kolkata Studio'],
            ['Bangalore', 'Bangalore Address', 'Visit Our Bangalore Studio'],
            ['Goa', 'Goa Address', 'Visit Our Goa Studio'],
        ] as $i => [$label, $heading, $studioTitle]) {
            ContactOfficeContent::query()->create([
                'label' => $label,
                'heading' => $heading,
                'studio_title' => $studioTitle,
                'address' => $sharedAddress,
                'phone' => $sharedPhone,
                'email' => $sharedEmail,
                'hours' => $sharedHours,
                'map_embed' => $sharedMap,
                'sort_order' => $i + 1,
                'active' => true,
            ]);
        }

        // Contact page (banner + written sections)
        ContactPageContent::query()->delete();
        ContactPageContent::query()->create([
            'banner_image' => MediaPath::path('pages/contact', 'contact-banner.jpg'),
            'hero_eyebrow' => 'Get In Touch',
            'hero_title_line1' => "Let's Build",
            'hero_title_line2' => 'Something',
            'hero_title_highlight' => 'Remarkable.',
            'hero_description' => 'Share your vision for corporate interiors, civil structures, or turnkey projects — our team responds within 24 hours.',
            'details_eyebrow' => 'Reach Us',
            'details_title' => 'Company Details &',
            'details_title_highlight' => 'Inquiry Form',
            'details_description' => 'Find our studios on the map or send us a message — tell us what your project is regarding and we will guide you from there.',
            'form_eyebrow' => 'Send an Inquiry',
            'form_title' => 'Tell us about your project',
            'form_description' => 'Fields marked with your details help us respond faster.',
            'active' => true,
        ]);

        // Footer (branding / newsletter only — contact is in site_contact_contents)
        FooterContent::query()->delete();
        FooterContent::query()->create([
            'tagline' => 'Crafting luxurious interiors that blend elegance, innovation and timeless sophistication.',
            'address' => 'Kolkata, West Bengal',
            'country' => 'India',
            'phone' => '8167028450',
            'email' => 'info@3gdecorativegroup.com',
            'hours' => 'Mon - Sat : 10 AM - 7 PM',
            'newsletter_title' => 'STAY INSPIRED',
            'newsletter_text' => 'Subscribe to our newsletter and be the first to know about our latest projects and ideas.',
            'copyright' => '© 2025 3G Decorative Group. All Rights Reserved.',
            'active' => true,
        ]);

        SiteContactContent::query()->delete();
        SiteContactContent::query()->create([
            'address' => 'Kolkata, West Bengal',
            'country' => 'India',
            'phone' => '8167028450',
            'email' => 'info@3gdecorativegroup.com',
            'hours' => 'Mon - Sat : 10 AM - 7 PM',
            'whatsapp_number' => '8167028450',
            'active' => true,
        ]);

        CmsRegistry::syncSectionContentTables();

        // Sample enquiries
        Enquiry::query()->delete();
        Enquiry::query()->create([
            'name' => 'Amit Kumar',
            'email' => 'amit@email.com',
            'phone' => '+91 98765 43210',
            'service' => 'Corporate Interior',
            'message' => 'Looking for office renovation in Kolkata.',
            'status' => 'new',
            'active' => true,
        ]);
        Enquiry::query()->create([
            'name' => 'Sneha Iyer',
            'email' => 'sneha@email.com',
            'phone' => '+91 99887 76655',
            'service' => 'Luxury Renovation',
            'message' => 'Need consultation for penthouse interior.',
            'status' => 'in_progress',
            'active' => true,
        ]);
    }
}
