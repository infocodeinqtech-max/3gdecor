export const seedNavigation = [
  { id: 1, label: "HOME", link: "/", order: 1, visible: true },
  { id: 2, label: "EXPERTISE", link: "/#features", order: 2, visible: true },
  { id: 3, label: "ABOUT", link: "/about", order: 3, visible: true },
  { id: 4, label: "SERVICES", link: "/services", order: 4, visible: true },
  { id: 5, label: "PROJECTS", link: "/projects", order: 5, visible: true },
  { id: 6, label: "CONTACT", link: "/contact", order: 6, visible: true },
];

export interface HeroStat {
  id: number;
  number: string;
  label: string;
}

export interface HeroContent {
  tagline: string;
  headlineLine1: string;
  headlineLine2: string;
  scriptText: string;
  description: string;
  leftCardTitle: string;
  rightCardTitle: string;
  ctaCorporateText: string;
  ctaCorporateLink: string;
  ctaCivilText: string;
  ctaCivilLink: string;
  backgroundImage: string;
  stats: HeroStat[];
}

export const seedHero: HeroContent = {
  tagline: "SPACES THAT INSPIRE.",
  headlineLine1: "Corporate Interiors.",
  headlineLine2: "Civil Structures.",
  scriptText: "Built to Elevate.",
  description:
    "From modern workplaces to industrial landmarks â€” we design and build spaces that drive productivity, efficiency and sustainable growth.",
  leftCardTitle: "Corporate\nInteriors",
  rightCardTitle: "Civil\nStructures",
  ctaCorporateText: "Explore Corporate Projects",
  ctaCorporateLink: "#corporate-projects",
  ctaCivilText: "Explore Civil Projects",
  ctaCivilLink: "#civil-projects",
  backgroundImage: "",
  stats: [
    { id: 1, number: "250+", label: "Projects Delivered" },
    { id: 2, number: "15+", label: "Years Experience" },
    { id: 3, number: "100%", label: "Client Satisfaction" },
  ],
};

export interface HeroFeature {
  id: number;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
  active: boolean;
}

export interface FounderMember {
  id: number;
  image: string;
  name: string;
  title: string;
  short_description: string;
  sort_order: number;
  active: boolean;
}

export interface Principle {
  id: number;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
  active: boolean;
}

export const seedAbout = {
  label: "ABOUT US",
  titleLine1: "Creating Spaces",
  titleLine2: "That",
  titleHighlight: "Inspire",
  paragraph1:
    "With over 15 years of excellence in interior architecture, 3G Decorative Group transforms visions into timeless spaces blending luxury, innovation, and refined sophistication.",
  paragraph2:
    "Every detail is carefully crafted to create environments that inspire comfort, beauty and lasting elegance.",
  images: [
    "/uploads/about/about-1.jpg",
    "/uploads/about/about-2.jpg",
    "/uploads/about/about-3.jpg",
    "/uploads/about/about-4.jpg",
  ],
  badgeImage: "/uploads/about/badge.jpg",
};

export type AboutContent = typeof seedAbout;

export const seedExpertiseSection = {
  titleLine1: "Crafting",
  titleLine2: "Exceptional Spaces",
  description:
    "Timeless interiors shaped through elegance, precision, and visionary craftsmanship.",
};

export const seedExpertise = [
  {
    id: 1,
    title: "Innovative Interior Concepts",
    description:
      "Fresh and creative design solutions crafted to reflect personality and functionality.",
    image: "/uploads/expertise/expertise-1.jpg",
  },
  {
    id: 2,
    title: "Luxury Living Spaces",
    description:
      "Elegant interiors blending comfort, sophistication, and timeless aesthetics.",
    image: "/uploads/expertise/expertise-2.jpg",
  },
  {
    id: 3,
    title: "Modern Architectural Vision",
    description:
      "Bold architectural concepts designed with precision, balance, and innovation.",
    image: "/uploads/expertise/expertise-3.jpg",
  },
];

export const seedProjectsSection = {
  label: "PORTFOLIO",
  title: "Featured Projects",
  description:
    "A curated selection of our most prestigious interior design projects",
  ctaText: "Explore All Projects",
};

export const seedProjects = [
  {
    id: 1,
    title: "Modern Elegance Villa",
    category: "Residential",
    image: "/uploads/projects/project-1.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Contemporary Dining",
    category: "Commercial",
    image: "/uploads/projects/project-2.jpg",
    featured: false,
  },
  {
    id: 3,
    title: "Luxury Penthouse",
    category: "Residential",
    image: "/uploads/projects/project-3.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Executive Office",
    category: "Commercial",
    image: "/uploads/projects/project-4.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "Minimalist Lounge",
    category: "Residential",
    image: "/uploads/projects/project-5.jpg",
    featured: false,
  },
];

export const seedServicesSection = {
  label: "Services",
  title: "Services Crafted for You",
};

export interface ServiceItem {
  id: number;
  title: string;
  category: string;
  description: string;
  backgroundImage: string;
}

export const seedServices: ServiceItem[] = [
  {
    id: 1,
    title: "Interior Design",
    category: "Design",
    description:
      "Bespoke interior solutions that blend aesthetics with functionality for residential and commercial spaces.",
    backgroundImage: "/uploads/services/service-1.jpg",
  },
  {
    id: 2,
    title: "Architectural Planning",
    category: "Architecture",
    description:
      "Innovative architectural planning and design services that bring your vision to structural reality.",
    backgroundImage: "/uploads/services/service-2.jpg",
  },
  {
    id: 3,
    title: "Furniture Design",
    category: "Custom",
    description:
      "Custom furniture pieces crafted to perfection, combining luxury with comfort and timeless style.",
    backgroundImage: "/uploads/services/service-3.jpg",
  },
  {
    id: 4,
    title: "Turnkey Projects",
    category: "Development",
    description:
      "Complete end-to-end project execution from concept to completion with seamless coordination.",
    backgroundImage: "/uploads/services/service-4.jpg",
  },
  {
    id: 5,
    title: "Commercial Interiors",
    category: "Commercial",
    description:
      "Professional workspace design that enhances productivity while reflecting your brand identity.",
    backgroundImage: "/uploads/services/service-5.jpg",
  },
  {
    id: 6,
    title: "Luxury Renovations",
    category: "Renovation",
    description:
      "Transform existing spaces into luxurious environments with our expert renovation services.",
    backgroundImage: "/uploads/services/service-6.jpg",
  },
];

export const seedProcessSection = {
  label: "OUR PROCESS",
  title: "How We Work",
  description: "A seamless journey from concept to completion",
};

export const seedProcess = [
  {
    id: 1,
    step: "01",
    title: "Consultation",
    description: "Understanding your vision and requirements",
  },
  {
    id: 2,
    step: "02",
    title: "Concept Design",
    description: "Creating detailed design proposals",
  },
  {
    id: 3,
    step: "03",
    title: "Planning",
    description: "Refining every detail to perfection",
  },
  {
    id: 4,
    step: "04",
    title: "Execution",
    description: "Bringing your dream space to life",
  },
  {
    id: 5,
    step: "05",
    title: "Delivery",
    description: "Final handover with quality assurance",
  },
];

export const seedTestimonialsSection = {
  label: "TESTIMONIALS",
  titleLine1: "Genuine Feedback From",
  titleHighlight: "Our Loyal Customers",
  description:
    "Trusted by homeowners and businesses for creating spaces defined by elegance, comfort, and timeless luxury.",
};

export const seedTestimonials = [
  {
    id: 1,
    quote:
      "3G Decorative Group's ability to create exceptional luxury interiors stands out. Their attention to architectural detail and refined aesthetics transformed our residence into a timeless masterpiece.",
    author: "Sarah Mitchell",
    role: "Luxury Homeowner, Manhattan",
    image: "/uploads/testimonials/testimonial-1.jpg",
    rating: "4.9 out of 5",
  },
  {
    id: 2,
    quote:
      "The level of sophistication and precision they bring to every design decision is remarkable. Our commercial space now reflects the premium quality we stand for.",
    author: "David Chen",
    role: "CEO, Design Studio",
    image: "/uploads/testimonials/testimonial-2.jpg",
    rating: "4.8 out of 5",
  },
  {
    id: 3,
    quote:
      "Working with 3G was an extraordinary experience. They understood our vision for luxury and elegance, delivering interior architecture that exceeds every expectation.",
    author: "Emily Rodriguez",
    role: "Property Developer, Miami",
    image: "/uploads/testimonials/testimonial-3.jpg",
    rating: "4.9 out of 5",
  },
];

export const seedFooter = {
  tagline:
    "Crafting luxurious interiors that blend elegance, innovation and timeless sophistication.",
  address: "Kolkata, West Bengal",
  country: "India",
  phone: "8167028450",
  email: "info@3gdecorativegroup.com",
  hours: "Mon - Sat : 10 AM - 7 PM",
  newsletterTitle: "STAY INSPIRED",
  newsletterText:
    "Subscribe to our newsletter and be the first to know about our latest projects and ideas.",
  copyright: "Â© 2025 3G Decorative Group. All Rights Reserved.",
};

/** Shared site contact + WhatsApp (footer contact block + homepage WhatsApp button). */
export const seedSiteContact = {
  address: "Kolkata, West Bengal",
  country: "India",
  phone: "8167028450",
  email: "info@3gdecorativegroup.com",
  hours: "Mon - Sat : 10 AM - 7 PM",
  whatsappNumber: "8167028450",
};

export interface ContactPageContent {
  bannerImage: string;
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroTitleHighlight: string;
  heroDescription: string;
  detailsEyebrow: string;
  detailsTitle: string;
  detailsTitleHighlight: string;
  detailsDescription: string;
  formEyebrow: string;
  formTitle: string;
  formDescription: string;
}

export const seedContactPage: ContactPageContent = {
  bannerImage: "",
  heroEyebrow: "Get In Touch",
  heroTitleLine1: "Let's Build",
  heroTitleLine2: "Something",
  heroTitleHighlight: "Remarkable.",
  heroDescription:
    "Share your vision for corporate interiors, civil structures, or turnkey projects â€” our team responds within 24 hours.",
  detailsEyebrow: "Reach Us",
  detailsTitle: "Company Details &",
  detailsTitleHighlight: "Inquiry Form",
  detailsDescription:
    "Find our studios on the map or send us a message â€” tell us what your project is regarding and we'll guide you from there.",
  formEyebrow: "Send an Inquiry",
  formTitle: "Tell us about your project",
  formDescription: "Fields marked with your details help us respond faster.",
};

const sharedOfficeAddress =
  "14, 16A, Golf Club Rd, Rajendra Prasad Colony, Tollygunge, Kolkata, West Bengal 700033, India";
const sharedMapEmbed =
  "https://maps.google.com/maps?q=14%2C%2016A%2C%20Golf%20Club%20Rd%2C%20Rajendra%20Prasad%20Colony%2C%20Tollygunge%2C%20Kolkata%2C%20West%20Bengal%20700033%2C%20India&t=&z=16&ie=UTF8&iwloc=&output=embed";

export type ContactOfficeItem = {
  id: number;
  label: string;
  heading: string;
  studioTitle: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapEmbed: string;
};

export const seedContactOffices: ContactOfficeItem[] = [
  {
    id: 1,
    label: "Kolkata",
    heading: "Kolkata Address",
    studioTitle: "Visit Our Kolkata Studio",
    address: sharedOfficeAddress,
    phone: "8167028450",
    email: "info@3gdecorative.com",
    hours: "Mon â€“ Sat, 9:00 AM â€“ 7:00 PM",
    mapEmbed: sharedMapEmbed,
  },
  {
    id: 2,
    label: "Bangalore",
    heading: "Bangalore Address",
    studioTitle: "Visit Our Bangalore Studio",
    address: sharedOfficeAddress,
    phone: "8167028450",
    email: "info@3gdecorative.com",
    hours: "Mon â€“ Sat, 9:00 AM â€“ 7:00 PM",
    mapEmbed: sharedMapEmbed,
  },
  {
    id: 3,
    label: "Goa",
    heading: "Goa Address",
    studioTitle: "Visit Our Goa Studio",
    address: sharedOfficeAddress,
    phone: "8167028450",
    email: "info@3gdecorative.com",
    hours: "Mon â€“ Sat, 9:00 AM â€“ 7:00 PM",
    mapEmbed: sharedMapEmbed,
  },
];

export const seedEnquiries = [
  {
    id: 1,
    name: "Amit Kumar",
    email: "amit@email.com",
    phone: "9876543210",
    service: "Corporate Interior",
    message: "Looking for office renovation in Kolkata.",
    date: "2025-05-17",
    status: "New",
  },
  {
    id: 2,
    name: "Sneha Iyer",
    email: "sneha@email.com",
    phone: "9988776655",
    service: "Luxury Renovation",
    message: "Need consultation for penthouse interior.",
    date: "2025-05-16",
    status: "In Review",
  },
];

/* â”€â”€â”€ /services page CMS seeds â”€â”€â”€ */

export type ServicePageContent = {
  heroBannerImage: string;
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroTitleHighlight: string;
  heroDescription: string;
  heroCtaText: string;
  offerEyebrow: string;
  offerTitle: string;
  offerTitleHighlight: string;
  processEyebrow: string;
  processTitle: string;
  processTitleHighlight: string;
  whyEyebrow: string;
  whyTitle: string;
  whyTitleHighlight: string;
  whyCommitmentEyebrow: string;
  whyCommitmentTitleLine1: string;
  whyCommitmentTitleLine2: string;
  whyCommitmentTitleHighlight: string;
  whyCommitmentDescription: string;
  whyCtaText: string;
};

export type ServiceOfferItem = {
  id: number;
  icon: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
};

export type ServiceProcessItem = {
  id: number;
  stepNumber: string;
  icon: string;
  label: string;
  tagline: string;
  description: string;
  image: string;
  accentColor: string;
};

export type ServiceWhyStatItem = {
  id: number;
  icon: string;
  stat: string;
  label: string;
  detail: string;
};

export type ServiceWhyFeatureItem = {
  id: number;
  text: string;
};

/** @deprecated Use ServicePageContent slices instead */
export type ServicePageHero = {
  bannerImage: string;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  titleHighlight: string;
  description: string;
  ctaText: string;
};

/** @deprecated */
export type ServiceOfferSection = {
  eyebrow: string;
  title: string;
  titleHighlight: string;
};

/** @deprecated */
export type ServiceProcessSection = {
  eyebrow: string;
  title: string;
  titleHighlight: string;
};

/** @deprecated */
export type ServiceWhySection = {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  commitmentEyebrow: string;
  commitmentTitleLine1: string;
  commitmentTitleLine2: string;
  commitmentTitleHighlight: string;
  commitmentDescription: string;
  ctaText: string;
};

export const seedServicePage: ServicePageContent = {
  heroBannerImage: "",
  heroEyebrow: "Our Services",
  heroTitleLine1: "Design. Build.",
  heroTitleLine2: "Deliver ",
  heroTitleHighlight: "Excellence.",
  heroDescription:
    "At 3G Deco, we offer end-to-end design and construction solutions that combine creativity, functionality, and precision to create spaces that truly inspire.",
  heroCtaText: "Explore Our Services",
  offerEyebrow: "What We Offer",
  offerTitle: "Services",
  offerTitleHighlight: "Crafted",
  processEyebrow: "How We Work",
  processTitle: "From Brief to",
  processTitleHighlight: "Handover",
  whyEyebrow: "The 3G Advantage",
  whyTitle: "Why Choose",
  whyTitleHighlight: "3G Decorative Group?",
  whyCommitmentEyebrow: "Our Commitment",
  whyCommitmentTitleLine1: "One Partner.",
  whyCommitmentTitleLine2: "Every Stage.",
  whyCommitmentTitleHighlight: "Zero Gaps.",
  whyCommitmentDescription:
    "We built 3G Deco to eliminate the fragmentation that kills most fit-out projects. One team, one contract, one point of accountability â€” from the first sketch to the final handover.",
  whyCtaText: "Book a Consultation",
};

export const seedServicePageHero: ServicePageHero = {
  bannerImage: seedServicePage.heroBannerImage,
  eyebrow: seedServicePage.heroEyebrow,
  titleLine1: seedServicePage.heroTitleLine1,
  titleLine2: seedServicePage.heroTitleLine2,
  titleHighlight: seedServicePage.heroTitleHighlight,
  description: seedServicePage.heroDescription,
  ctaText: seedServicePage.heroCtaText,
};

export const seedServiceOfferSection: ServiceOfferSection = {
  eyebrow: seedServicePage.offerEyebrow,
  title: seedServicePage.offerTitle,
  titleHighlight: seedServicePage.offerTitleHighlight,
};

export const seedServiceOffers: ServiceOfferItem[] = [
  {
    id: 1,
    icon: "PenTool",
    category: "Interior",
    title: "Corporate Interior Design",
    subtitle: "Offices Â· Lounges Â· Open Plans",
    description:
      "Bespoke workspace environments designed to elevate productivity and reflect your corporate identity â€” from executive suites to open-plan floors.",
    image: "/uploads/pages/services/gallery-1.jpg",
    tag: "Most Popular",
  },
  {
    id: 2,
    icon: "Sparkles",
    category: "Hospitality",
    title: "Cafeteria & Canteen Design",
    subtitle: "Dining Â· Food Courts Â· Pantries",
    description:
      "Vibrant, functional dining spaces that boost employee morale â€” from compact pantry zones to multi-floor corporate cafeterias with full fit-out.",
    image: "/uploads/pages/services/gallery-2.jpg",
    tag: "",
  },
  {
    id: 3,
    icon: "Building2",
    category: "Architecture",
    title: "Architectural Planning",
    subtitle: "Blueprints Â· Layouts Â· Approvals",
    description:
      "End-to-end architectural design services â€” structural layouts, space planning, regulatory approvals, and coordination with civil teams on site.",
    image: "/uploads/pages/services/gallery-3.jpg",
    tag: "",
  },
  {
    id: 4,
    icon: "Hammer",
    category: "Civil",
    title: "Civil & Industrial Builds",
    subtitle: "Warehouses Â· Factories Â· Sheds",
    description:
      "Heavy-duty civil construction for industrial clients â€” warehouses, factory sheds, PEB structures, and large-span buildings built to last.",
    image: "/uploads/pages/services/gallery-4.jpg",
    tag: "Civil Specialists",
  },
  {
    id: 5,
    icon: "Briefcase",
    category: "Turnkey",
    title: "Turnkey Project Delivery",
    subtitle: "Concept to Handover Â· Zero Gaps",
    description:
      "We own the entire project lifecycle â€” design, procurement, civil, MEP, furniture, and handover â€” so you never have to manage multiple vendors.",
    image: "/uploads/pages/services/gallery-5.jpg",
    tag: "",
  },
  {
    id: 6,
    icon: "Sofa",
    category: "Furniture",
    title: "Custom Furniture & Fit-out",
    subtitle: "Joinery Â· Modular Â· FF&E",
    description:
      "Custom-crafted workstations, cabinets, reception counters, and soft furnishings â€” all specified, sourced, and installed by our in-house team.",
    image: "/uploads/pages/services/gallery-6.jpg",
    tag: "",
  },
];

export const seedServiceProcessSection: ServiceProcessSection = {
  eyebrow: seedServicePage.processEyebrow,
  title: seedServicePage.processTitle,
  titleHighlight: seedServicePage.processTitleHighlight,
};

export const seedServiceProcess: ServiceProcessItem[] = [
  {
    id: 1,
    stepNumber: "01",
    icon: "Users",
    label: "Discovery",
    tagline: "We Listen First",
    description:
      "Site visit, brief deep-dive, stakeholder alignment. We map out your requirements, constraints, and vision before a single line is drawn.",
    image: "/uploads/pages/services/process-1.jpg",
    accentColor: "#f3bb27",
  },
  {
    id: 2,
    stepNumber: "02",
    icon: "PenTool",
    label: "Concept Design",
    tagline: "Vision on Paper",
    description:
      "Mood boards, space plans, 3D visualisations and material palettes â€” refined through collaborative review until every detail is right.",
    image: "/uploads/pages/services/process-2.jpg",
    accentColor: "#ea7a12",
  },
  {
    id: 3,
    stepNumber: "03",
    icon: "Hammer",
    label: "Execution",
    tagline: "Built to Spec",
    description:
      "Civil works, MEP coordination, furniture installation â€” our in-house teams execute every stage with precision and zero subcontractor gaps.",
    image: "/uploads/pages/services/process-3.jpg",
    accentColor: "#f3bb27",
  },
  {
    id: 4,
    stepNumber: "04",
    icon: "Award",
    label: "Handover",
    tagline: "Zero Defects",
    description:
      "Thorough QA walkthrough, snag resolution, as-built documentation, and post-handover support. We don't leave until you're completely satisfied.",
    image: "/uploads/pages/services/process-4.jpg",
    accentColor: "#ea7a12",
  },
];

export const seedServiceWhy: ServiceWhySection = {
  eyebrow: seedServicePage.whyEyebrow,
  title: seedServicePage.whyTitle,
  titleHighlight: seedServicePage.whyTitleHighlight,
  commitmentEyebrow: seedServicePage.whyCommitmentEyebrow,
  commitmentTitleLine1: seedServicePage.whyCommitmentTitleLine1,
  commitmentTitleLine2: seedServicePage.whyCommitmentTitleLine2,
  commitmentTitleHighlight: seedServicePage.whyCommitmentTitleHighlight,
  commitmentDescription: seedServicePage.whyCommitmentDescription,
  ctaText: seedServicePage.whyCtaText,
};

export const seedServiceWhyStats: ServiceWhyStatItem[] = [
  {
    id: 1,
    icon: "Award",
    stat: "15+",
    label: "Years of Excellence",
    detail: "Trusted since 2009",
  },
  {
    id: 2,
    icon: "CheckCircle2",
    stat: "200+",
    label: "Projects Delivered",
    detail: "On time, on budget",
  },
  {
    id: 3,
    icon: "Users",
    stat: "98%",
    label: "Client Retention",
    detail: "Repeat & referral business",
  },
  {
    id: 4,
    icon: "Clock",
    stat: "100%",
    label: "Turnkey Capability",
    detail: "Single-vendor solution",
  },
];

export const seedServiceWhyFeatures: ServiceWhyFeatureItem[] = [
  { id: 1, text: "Single-vendor accountability from concept to handover" },
  { id: 2, text: "In-house civil, interior, and furniture teams" },
  { id: 3, text: "ISO-compliant project management processes" },
  { id: 4, text: "Transparent costing with no hidden extras" },
];

/* ─── Projects Page CMS ─── */

export interface ProjectsPageContent {
  bannerImage: string;
  heroEyebrow: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroDescription1: string;
  heroDescription2: string;
  categoriesEyebrow: string;
  categoriesTitleLine1: string;
  categoriesTitleLine2: string;
  categoriesDescription: string;
}

export interface ProjectsPageCategoryItem {
  id: number | string;
  title: string;
  slug?: string;
  image: string;
  icon: string;
  tags: string;
  button: string;
  link: string;
  sectionSubtitle?: string;
  sectionTitle?: string;
  sectionDescription?: string;
  listBannerImage?: string;
  listBreadcrumb?: string;
  listHeroTitle?: string;
  listDescription?: string;
  listFilters?: string[];
  order?: number;
  active?: boolean;
}

export interface ProjectsPageItem {
  id: number | string;
  categoryId: number | string;
  title: string;
  location: string;
  filterTag?: string;
  image: string;
  slug: string;
  heroTagline?: string;
  statusLabel?: string;
  heroSlides?: string[];
  aboutTitle?: string;
  aboutDescription?: string;
  aboutFeatures?: string[];
  aboutImage?: string;
  statCompleted?: string;
  statArea?: string;
  statDuration?: string;
  galleryEyebrow?: string;
  galleryTitle?: string;
  galleryDescription?: string;
  galleryImages?: string[];
  order?: number;
  active?: boolean;
}

const defaultProjectDetail = (title: string) => ({
  heroTagline:
    "A future-ready space crafted to inspire collaboration, creativity, and productivity while reflecting innovative design excellence.",
  statusLabel: "Completed Project",
  aboutTitle: title,
  aboutDescription: `Designed with precision and crafted for lasting impact, ${title} showcases our commitment to quality interiors, thoughtful planning and refined architectural detail.`,
  aboutFeatures: [
    "Premium Design Language",
    "Collaborative Planning",
    "Sustainable Material Palette",
    "Precision Execution",
  ],
  statCompleted: "2025",
  statArea: "12.5K",
  statDuration: "8 Mo",
  galleryEyebrow: "Project Gallery",
  galleryTitle: "A Visual Journey",
  galleryDescription:
    "Every corner reflects our dedication to timeless design, functionality and refined craftsmanship.",
});

const seedProjectItem = (
  id: number,
  categoryId: number,
  title: string,
  location: string,
  filterTag: string,
  slug: string,
  order: number,
): ProjectsPageItem => ({
  id,
  categoryId,
  title,
  location,
  filterTag,
  image: "",
  slug,
  ...defaultProjectDetail(title),
  order,
});

export const seedProjectsPage: ProjectsPageContent = {
  bannerImage: "",
  heroEyebrow: "Projects",
  heroTitlePrefix: "Our ",
  heroTitleHighlight: "Projects",
  heroDescription1:
    "Explore a curated collection of premium corporate interiors and civil infrastructure projects that reflect our passion for craftsmanship, precision, and timeless architectural excellence.",
  heroDescription2:
    "From collaborative workspaces and executive offices to reception lounges and business environments, we combine creativity, precision, and timeless design to create spaces that leave a lasting impression.",
  categoriesEyebrow: "OUR PROJECT CATEGORIES",
  categoriesTitleLine1: "Two Domains.",
  categoriesTitleLine2: "Endless Possibilities.",
  categoriesDescription:
    "From inspiring interiors to iconic structures, our work spans across two core domains.",
};

export const seedProjectsPageCategories: ProjectsPageCategoryItem[] = [
  {
    id: 1,
    title: "Corporate Interiors",
    slug: "corporate",
    image: "",
    icon: "Building2",
    tags: "Workspaces, Offices, Showrooms, Banks",
    button: "View Projects",
    link: "/projects/corporate",
    sectionSubtitle: "CORPORATE INTERIORS",
    sectionTitle: "Featured Projects",
    sectionDescription:
      "Thoughtfully crafted interiors that enhance productivity, reflect brand identity and create memorable experiences.",
    listBreadcrumb: "Corporate Interiors",
    listHeroTitle: "Corporate",
    listDescription:
      "Exceptional workplaces begin with exceptional design. At 3G Decorative Group, we create premium corporate interiors that blend functionality, innovation, and timeless aesthetics to shape environments where businesses thrive.",
    listFilters: [
      "All Projects",
      "Offices",
      "Workspaces",
      "Showrooms",
      "Banks",
      "IT Parks",
    ],
    order: 1,
  },
  {
    id: 2,
    title: "Civil Structures",
    slug: "civil",
    image: "",
    icon: "Landmark",
    tags: "Residential, Commercial, Industrial, Infrastructure",
    button: "View Projects",
    link: "/projects/civil",
    sectionSubtitle: "CIVIL STRUCTURES",
    sectionTitle: "Featured Projects",
    sectionDescription:
      "Delivering durable civil infrastructure with precision engineering, sustainable practices, and uncompromising quality.",
    listBreadcrumb: "Civil Structures",
    listHeroTitle: "Civil",
    listDescription:
      "Explore our portfolio of residential, commercial and industrial projects engineered with quality, innovation and long-lasting excellence.",
    listFilters: [
      "All Projects",
      "Residential",
      "Commercial",
      "Industrial",
      "Institutional",
      "Infrastructure",
    ],
    order: 2,
  },
];

export const seedProjectsPageItems: ProjectsPageItem[] = [
  seedProjectItem(1, 1, "Tech Mahindra Office", "Kolkata, India", "Offices", "tech-mahindra-office", 1),
  seedProjectItem(2, 1, "Siemens Innovation Hub", "Kolkata, India", "Workspaces", "siemens-innovation-hub", 2),
  seedProjectItem(3, 1, "Executive Dining Space", "Kolkata, India", "Workspaces", "executive-dining-space", 3),
  seedProjectItem(4, 1, "Creative Studio Workspace", "Kolkata, India", "Workspaces", "creative-studio-workspace", 4),
  seedProjectItem(5, 1, "HDFC Bank Branch", "Kolkata, India", "Banks", "hdfc-bank", 5),
  seedProjectItem(6, 1, "DataSoft IT Park", "Kolkata, India", "IT Parks", "datasoft-it-park", 6),
  seedProjectItem(7, 1, "Mahindra & Mahindra Office", "Kolkata, India", "Offices", "mahindra-office", 7),
  seedProjectItem(8, 1, "Acme Corp Headquarters", "Kolkata, India", "Offices", "acme-corporate", 8),
  seedProjectItem(9, 1, "Corporate Reception Lounge", "Kolkata, India", "Offices", "corporate-reception", 9),
  seedProjectItem(10, 1, "Premium Workspace Hub", "Hyderabad, India", "Workspaces", "premium-workspace-hub", 10),
  seedProjectItem(11, 1, "Innovation Collaboration Center", "Bengaluru, India", "Workspaces", "innovation-collaboration-center", 11),
  seedProjectItem(12, 1, "Executive Boardroom Suite", "Mumbai, India", "Offices", "executive-boardroom-suite", 12),
  seedProjectItem(13, 2, "Luxury Villa", "Bhuvaneshwar, India", "Residential", "luxury-villa", 1),
  seedProjectItem(14, 2, "Flender Drives", "Kharagpur, India", "Industrial", "industrial-facility", 2),
  seedProjectItem(15, 2, "Residential Enclave", "Kolkata, India", "Residential", "residential-building", 3),
  seedProjectItem(16, 2, "Industrial Complex", "Bhubaneswar, India", "Industrial", "industrial-complex", 4),
  seedProjectItem(17, 2, "Commercial Tower", "Kolkata, India", "Commercial", "commercial-tower", 5),
  seedProjectItem(18, 2, "Institutional Campus", "Howrah, India", "Institutional", "institutional-campus", 6),
  seedProjectItem(19, 2, "Infrastructure Hub", "Durgapur, India", "Infrastructure", "infrastructure-hub", 7),
  seedProjectItem(20, 2, "Skyline Residences", "Kolkata, India", "Residential", "skyline-residences", 8),
  seedProjectItem(21, 2, "Industrial Plant", "Haldia, India", "Industrial", "industrial-plant", 9),
  seedProjectItem(22, 2, "Mixed-Use Development", "Bhubaneswar, India", "Commercial", "mixed-use-development", 10),
  seedProjectItem(23, 2, "Urban Infrastructure Project", "Kolkata, India", "Infrastructure", "urban-infrastructure-project", 11),
  seedProjectItem(24, 2, "Premium Commercial Block", "Siliguri, India", "Commercial", "premium-commercial-block", 12),
];
