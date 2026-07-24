export const seedNavigation = [
  { id: 1, label: "HOME", link: "/", order: 1, visible: true },
  { id: 2, label: "EXPERTISE", link: "/#features", order: 2, visible: true },
  { id: 3, label: "ABOUT", link: "/about", order: 3, visible: true },
  { id: 4, label: "SERVICES", link: "/services", order: 4, visible: true },
  { id: 5, label: "PROJECTS", link: "/#projects", order: 5, visible: true },
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
    "From modern workplaces to industrial landmarks — we design and build spaces that drive productivity, efficiency and sustainable growth.",
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
  copyright: "© 2025 3G Decorative Group. All Rights Reserved.",
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
    hours: "Mon – Sat, 9:00 AM – 7:00 PM",
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
    hours: "Mon – Sat, 9:00 AM – 7:00 PM",
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
    hours: "Mon – Sat, 9:00 AM – 7:00 PM",
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
