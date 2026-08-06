import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, useInView } from "motion/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import about1 from "../assets/images/about1.jpg";
import about2 from "../assets/images/about2.jpg";
import about3 from "../assets/images/about3.jpg";
import about4 from "../assets/images/about4.jpg";
import badge3G from "../assets/images/3g-badge.png";
import HeroSection from "../app/components/HeroSection";
import { getDefaultAboutData, loadHomepageCms, resolveImage } from "../content/homepageData";
import PageLoader from "../app/components/PageLoader";
import { useCmsPageGate } from "../hooks/useCmsPageGate";
import {
  seedExpertiseSection,
  seedExpertise,
  seedProjectsSection,
  seedProjects,
  seedServicesSection,
  seedServices,
  seedProcessSection,
  seedProcess,
  seedTestimonialsSection,
  seedTestimonials,
} from "../admin/data/seedContent";

import {
  Award,
  Building2,
  Sparkles,
  Lightbulb,
  PenTool,
  Sofa,
  Briefcase,
  Palette,
  MessageSquare,
  FileText,
  Hammer,
  PackageCheck,
} from "lucide-react";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import FloatingWhatsApp from "../app/components/FloatingWhatsApp";

const FEATURE_ICONS = [
  <Lightbulb className="size-12" key="lightbulb" />,
  <Sparkles className="size-12" key="sparkles" />,
  <Building2 className="size-12" key="building" />,
];

const SERVICE_ICONS = [
  <PenTool className="size-10" key="pen" />,
  <Building2 className="size-10" key="building" />,
  <Sofa className="size-10" key="sofa" />,
  <Briefcase className="size-10" key="briefcase" />,
  <Sparkles className="size-10" key="sparkles" />,
  <Palette className="size-10" key="palette" />,
];

const PROCESS_ICONS = [
  <MessageSquare className="size-8" key="msg" />,
  <Palette className="size-8" key="palette" />,
  <FileText className="size-8" key="file" />,
  <Hammer className="size-8" key="hammer" />,
  <PackageCheck className="size-8" key="package" />,
];

export default function HomePage() {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState("home");
  const [activeServiceIndex, setActiveServiceIndex] = useState(-1);
  const isAnyCardHovered = activeServiceIndex !== -1;
  const testimonialSliderRef = useRef<Slider | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "features",
        "about",
        "services",
        "projects",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveNav(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [cms, setCms] = useState({
    about: getDefaultAboutData(),
    expertiseSection: seedExpertiseSection,
    expertiseItems: seedExpertise.map((item) => ({
      ...item,
      image: resolveImage(item.image, item.image),
    })),
    projectsSection: seedProjectsSection,
    projectsItems: seedProjects.map((item) => ({
      ...item,
      image: resolveImage(item.image, item.image),
    })),
    servicesSection: seedServicesSection,
    servicesItems: seedServices.map((item) => ({
      ...item,
      backgroundImage: resolveImage(item.backgroundImage, item.backgroundImage),
    })),
    processSection: seedProcessSection,
    processItems: seedProcess,
    testimonialsSection: seedTestimonialsSection,
    testimonialsItems: seedTestimonials.map((item) => ({
      ...item,
      image: resolveImage(item.image, item.image),
    })),
  });

  const { showLoader, fading } = useCmsPageGate(async (force) => {
    const data = await loadHomepageCms(force);
    setCms(data);
  });

  const about = cms.about;
  const expertiseSection = cms.expertiseSection;
  const features = cms.expertiseItems.map((feature, index) => ({
    ...feature,
    image: resolveImage(feature.image, feature.image),
    icon: FEATURE_ICONS[index % FEATURE_ICONS.length],
  }));
  const projectsSection = cms.projectsSection;
  const projects = cms.projectsItems.map((project) => ({
    ...project,
    image: resolveImage(project.image, project.image),
  }));
  const servicesSection = cms.servicesSection;
  const services = cms.servicesItems.map((service, index) => ({
    ...service,
    backgroundImage: resolveImage(
      service.backgroundImage,
      service.backgroundImage,
    ),
    icon: SERVICE_ICONS[index % SERVICE_ICONS.length],
  }));
  const processSection = cms.processSection;
  const process = cms.processItems.map((item, index) => ({
    ...item,
    icon: PROCESS_ICONS[index % PROCESS_ICONS.length],
  }));
  const testimonialsSection = cms.testimonialsSection;
  const testimonials = cms.testimonialsItems.map((item) => ({
    ...item,
    image: resolveImage(item.image, item.image),
  }));

  const testimonialSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: true,
  };

  const aboutImageLayouts = [
    {
      img: about.images[0]?.trim() || about1,
      mobile: {
        top: "3%",
        left: "0%",
        width: "47%",
        height: "36%",
      },
      desktop: {
        top: 3,
        left: 0,
        width: 270,
        height: 220,
      },
    },
    {
      img: about.images[1]?.trim() || about2,
      mobile: {
        top: "8%",
        left: "53%",
        width: "47%",
        height: "46%",
      },
      desktop: {
        top: 40,
        left: 285,
        width: 250,
        height: 300,
      },
    },
    {
      img: about.images[2]?.trim() || about3,
      mobile: {
        top: "44%",
        left: "0%",
        width: "47%",
        height: "46%",
      },
      desktop: {
        top: 240,
        left: 0,
        width: 270,
        height: 300,
      },
    },
    {
      img: about.images[3]?.trim() || about4,
      mobile: {
        top: "58%",
        left: "53%",
        width: "47%",
        height: "36%",
      },
      desktop: {
        top: 355,
        left: 285,
        width: 270,
        height: 220,
      },
    },
  ];

  const cards = aboutImageLayouts;

  return (
    <div className="min-h-full w-full bg-[#F5F1EA] text-[#332C26] overflow-x-hidden">
      {showLoader && <PageLoader fading={fading} />}
      <Navbar activeNav={activeNav} />

      {/* Hero Section - Premium Editorial Framing */}
      <HeroSection />

      {!showLoader && (
        <>
      {/* About Section - Light Background */}
      <section
        id="about"
        className="
            relative
            overflow-hidden
            bg-[#F8F4EE]
            py-28
            px-6
            md:px-10
            lg:px-20
            "
      >
        {/* BACKGROUND ARCHITECTURE LINE */}

        <div
          className="
          absolute
          right-0
          top-0
          opacity-[0.06]
          pointer-events-none
          "
        >
          {/* <svg width="320" height="520">
            <path
              d="
              M220 20
              L300 70
              L300 470
              M240 40
              L240 470
              M200 80
              L200 470
              M160 120
              L160 470
              "
              stroke="#B78B42"
              strokeWidth="1"
            />
          </svg> */}
        </div>

        <div
          className="
            max-w-7xl
            mx-auto
            grid
            lg:grid-cols-2
            gap-10
            md:gap-14
            lg:gap-20
            items-center
            "
        >
          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
            }}
          >
            <div
              className="
              flex
              items-center
              gap-5
              mb-7
              "
            >
              <div
                className="
              w-[52px]
              h-[1.5px]
              bg-[#C4973B]
              opacity-90
              "
              />

              <span
                className="
              uppercase
              tracking-[0.28em]
              sm:tracking-[0.38em]
              text-[11px]
              sm:text-[13px]
              font-medium
              text-[#C4973B]
              "
              >
                {about.label}
              </span>
            </div>

            <h2
              className="
                leading-[1.05]
                mb-8
                "
              style={{
                fontFamily: "'Parkinsans',sans-serif",
                fontSize: "clamp(34px,8vw,72px)",
                fontWeight: 400,
                color: "#171717",
              }}
            >
              {about.titleLine1}
              <br />
              {about.titleLine2}
              <span
                className="
                italic
                text-[#B88735]
                ml-3
                "
              >
                {about.titleHighlight}
              </span>
            </h2>

            <p
              className="
              text-[#6E655C]
              leading-7
              sm:leading-8
              mb-8
              max-w-xl
              "
              style={{
                fontFamily: "'Parkinsans',sans-serif",
                fontSize: "clamp(15px,3.8vw,18px)",
                fontWeight: 400,
              }}
            >
              {about.paragraph1}
            </p>

            <p
              className="
              text-[#6E655C]
              leading-7
              sm:leading-8
              mb-12
              max-w-xl
              "
              style={{
                fontFamily: "'Parkinsans',sans-serif",
                fontSize: "clamp(15px,3.8vw,18px)",
                fontWeight: 400,
              }}
            >
              {about.paragraph2}
            </p>
          </motion.div>

          {/* RIGHT IMAGE GRID */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-[620px]">
              {/* Images */}
              <div
                className="
                    relative
                    w-full
                    max-w-[620px]
                    mx-auto

                    aspect-[1/1]
                    md:aspect-auto
                    md:h-[620px]
                  "
              >
                {cards.map((card, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="absolute overflow-hidden rounded-[34px] shadow-xl group"
                    style={{
                      top: card.mobile.top,
                      left: card.mobile.left,
                      width: card.mobile.width,
                      height: card.mobile.height,
                    }}
                  >
                    <img
                      src={card.img}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    {/* Plus Icon */}
                    <div
                      className="
                          absolute
                          top-2.5
                          left-2.5
                          md:top-4
                          md:left-4

                          w-8
                          h-8
                          sm:w-10
                          sm:h-10
                          md:w-12
                          md:h-12

                          rounded-full
                          bg-[#F6ECD7]
                          border
                          border-[#D4A64B]

                          flex
                          items-center
                          justify-center

                          shadow-[0_0_20px_rgba(215,162,75,0.35)]
                          group-hover:shadow-[0_0_28px_rgba(215,162,75,0.65)]

                          transition-all
                          duration-300

                          group-hover:scale-110
                          group-hover:bg-[#D7A24B]
                        "
                    >
                      <span
                        className="
                            text-[#C59131]
                            group-hover:text-white

                            text-sm
                            sm:text-lg
                            md:text-xl

                            font-medium
                            leading-none
                          "
                      >
                        +
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Center Badge */}
              <motion.div
                className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    pointer-events-none
                    z-40
                  "
                animate={{
                  y: [0, -7, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="absolute w-40 h-40 md:w-52 md:h-52 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.25, 0.45, 0.25],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  style={{
                    background:
                      "radial-gradient(circle,#D7A24B55 0%,transparent 70%)",
                  }}
                />

                <motion.img
                  src={about.badgeImage?.trim() || badge3G}
                  alt="3G Decorative Group"
                  className="
                      relative
                      w-[130px]
                      sm:w-[170px]
                      md:w-[190px]
                      drop-shadow-[0_0_35px_rgba(215,162,75,.45)]
                    "
                />
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT IMAGE GRID ENDS*/}
        </div>
      </section>

      {/* Crafting Expertise Section - Blended with Hero */}
      <section
        id="features"
        className="relative bg-[#2E2723] px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-[75px] pt-20 md:pt-[110px] pb-16 md:pb-[90px] z-20"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-24"
          >
            <div className="w-20 mx-auto mb-10" />
            <div
              className="text-center
                mb-16
                md:mb-20
                lg:mb-24

                -mt-6
                md:-mt-10
                lg:-mt-14"
            >
              {/* Luxury Label */}
              {/* <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-2 h-2 bg-[#f3bb27] rotate-45" />
                <span
                  className="text-white tracking-[0.2em] text-xs font-medium uppercase"
                  style={{ fontFamily: "'Parkinsans', sans-serif" }}
                >
                  Expertise
                </span>
              </div> */}
              {/* Luxury Heading */}
              <h2
                className="
                  text-[#F5F1EA]
                  mb-6
                  leading-[1.02]
                "
                style={{
                  fontFamily: "'Parkinsans',sans-serif",
                  fontSize: "clamp(38px,5vw,58px)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                {expertiseSection.titleLine1}
                <br />
                {expertiseSection.titleLine2}
              </h2>
              {/* Luxury Description */}
              <p
                className="
                    mx-auto
                    text-[#BEB5AC]
                    max-w-[620px]
                  "
                style={{
                  fontFamily: "'Parkinsans',sans-serif",
                  fontSize: "17px",
                  lineHeight: "30px",
                  fontWeight: 400,
                }}
              >
                {expertiseSection.description}
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <LuxuryFeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Gallery - Light Background */}
      <section
        id="projects"
        className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#F5F1EA] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <div
              className="
                flex
                items-center
                justify-center
                gap-3
                mb-5
                "
            >
              <div
                className="
                w-14
                h-[1px]
                bg-gradient-to-r
                from-transparent
                to-[#D9A441]
                "
              />

              <div
                className="
                uppercase
                tracking-[0.45em]
                text-[12px]
                font-medium
                text-[#C89A38]
                "
                style={{
                  fontFamily: "'Parkinsans',sans-serif",
                }}
              >
                {projectsSection.label}
              </div>

              <div
                className="
                w-14
                h-[1px]
                bg-gradient-to-l
                from-transparent
                to-[#D9A441]
                "
              />
            </div>

            <h2
              className="
                mb-5
                text-[#332C26]
                "
              style={{
                fontFamily: "'Parkinsans',sans-serif",

                fontSize: "clamp(36px, 7vw, 64px)",

                fontWeight: 500,

                lineHeight: "1.05",

                letterSpacing: "-.03em",
              }}
            >
              {projectsSection.title}
            </h2>

            <div
              className="
                w-36
                h-[1px]
                bg-gradient-to-r
                from-transparent
                via-[#D9A441]
                to-transparent
                mx-auto
                mb-6
                relative
                "
            >
              <div
                className="
                absolute
                left-1/2
                top-1/2
                w-2
                h-2
                bg-[#D9A441]
                rotate-45
                -translate-x-1/2
                -translate-y-1/2
                "
              />
            </div>

            <p
              className="
                text-[#6A635D]
                max-w-xl
                mx-auto
                font-light
                "
              style={{
                fontFamily: "'Parkinsans',sans-serif",

                fontSize: "17px",

                lineHeight: "1.9",
              }}
            >
              {projectsSection.description}
            </p>
          </motion.div>

          {/* GRID */}

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-12
              gap-7
              auto-rows-[220px]
              md:auto-rows-[180px]
              items-stretch
              "
          >
            {/* LARGE CARD */}

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="
                lg:col-span-7
                lg:row-span-2
                relative
                overflow-hidden
                rounded-[32px]
                group
                shadow-[0_25px_60px_rgba(0,0,0,.08)]
                "
            >
              <img
                src={projects[0]?.image}
                className="
                  w-full
                  h-full
                  object-cover
                  duration-[1200ms]
                  group-hover:scale-[1.08]
                  group-hover:rotate-[1deg]
                  "
              />

              <div
                className="
                  absolute inset-0
                  bg-gradient-to-r
                  from-black/88
                  via-black/40
                  to-transparent
                  "
              />

              <div
                className="
                  absolute
                  left-5
                  right-5
                  bottom-5
                  sm:left-8
                  sm:right-8
                  sm:bottom-8
                  lg:left-10
                  lg:right-10
                  lg:top-10
                  lg:bottom-10

                  flex
                  flex-col
                  justify-end
                  "
              >
                <p
                  className="
                    text-[#C79A4A]
                    text-[22px]
                    sm:text-4xl
                    lg:text-5xl
                    mb-1.5
                    sm:mb-3
                    "
                  style={{
                    fontFamily: "'Parkinsans',sans-serif",
                  }}
                >
                  01
                </p>

                <h3
                  className="
                    text-white
                    text-[22px]
                    sm:text-4xl
                    lg:text-5xl
                    leading-tight
                    mb-2
                    sm:mb-5
                    "
                  style={{
                    fontFamily: "'Parkinsans',sans-serif",
                  }}
                >
                  {projects[0]?.title}
                </h3>

                <p
                  className="
                    text-[#D9C9B7]
                    mb-3
                    sm:mb-8
                    text-sm
                    sm:text-base
                    "
                >
                  {projects[0]?.category}
                </p>

                <button
                  className="
                    text-[#C79A4A]
                    tracking-[0.15em]
                    uppercase
                    text-sm
                    "
                >
                  View Project →
                </button>
              </div>
            </motion.div>

            {/* SMALL CARDS */}

            {projects.slice(1, 5).map((project, index) => (
              <motion.div
                key={project.id ?? index}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`
                  relative
                  overflow-hidden
                  rounded-[30px]
                  group
                  w-full
                  h-full
                  min-h-[180px]
                  min-w-0

                  ${index === 0 ? "lg:col-span-5" : ""}
                  ${index === 1 ? "lg:col-span-5" : ""}

                  ${index === 2 ? "lg:col-span-6" : ""}
                  ${index === 3 ? "lg:col-span-6" : ""}
                  `}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover

                    duration-[1400ms]
                    ease-out

                    group-hover:scale-[1.12]
                    group-hover:rotate-[1.5deg]
                    "
                />

                <div
                  className="
                  absolute inset-0
                  bg-gradient-to-r
                  from-black/90
                  via-black/45
                  to-transparent
                  "
                />

                <div
                  className="
                  absolute
                  left-5
                  sm:left-7
                  bottom-6
                  sm:bottom-8
                  "
                >
                  <p
                    className="
                    text-[#C79A4A]
                    text-[22px]
                    sm:text-[24px]
                    lg:text-[28px]
                    mb-2
                    "
                    style={{
                      fontFamily: "'Parkinsans',sans-serif",
                    }}
                  >
                    0{index + 2}
                  </p>

                  <h4
                    className="
                    text-white
                    text-[20px]
                    sm:text-[24px]
                    lg:text-[28px]
                    leading-tight
                    mb-2
                    "
                    style={{
                      fontFamily: "'Parkinsans',sans-serif",
                    }}
                  >
                    {project.title}
                  </h4>

                  <p
                    className="
                    text-[#D8CCBD]
                    text-sm
                    "
                  >
                    {project.category}
                  </p>
                </div>

                <motion.div
                  animate={{
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="
                  absolute
                  right-6
                  bottom-6
                  w-12
                  h-12
                  sm:w-14
                  sm:h-14
                  rounded-full
                  border
                  border-[#C79A4A]
                  flex
                  items-center
                  justify-center
                  text-[#C79A4A]
                  text-[22px]
                  sm:text-[28px]
                  backdrop-blur-sm
                  "
                >
                  +
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            whileHover={{ x: 8 }}
            className="
              flex
              justify-center
              mt-16
              "
          >
            <button
              className="
                text-[#2B2118]
                tracking-[0.25em]
                uppercase
                text-sm
                flex
                items-center
                gap-4
                "
            >
              {projectsSection.ctaText}
              <span
                className="
                  text-[#C79A4A]
                  text-xl
                  "
              >
                →
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Exact Decoria Style with Slide Animation */}
      <section
        id="services"
        // className="relative py-32 px-8 overflow-hidden min-h-screen flex items-center"
        className="
          relative
         overflow-hidden


          min-h-screen

          flex
          items-center

          py-16
          sm:py-20
          lg:py-32

          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* Background Images Container */}
        <div className="absolute inset-0 z-0">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity:
                  activeServiceIndex === index ||
                  (activeServiceIndex === -1 && index === 0)
                    ? 1
                    : 0,
                scale:
                  activeServiceIndex === index ||
                  (activeServiceIndex === -1 && index === 0)
                    ? 1
                    : 0.8,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${service.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                zIndex: activeServiceIndex === index ? 1 : 0,
              }}
            />
          ))}
          {/* Lighter overlay for better background visibility */}
          <div className="absolute inset-0 bg-[#1a1a1a]/70 z-10" />
        </div>

        {/* Content */}
        {/* <div className="relative z-20 max-w-7xl w-full mx-auto">*/}
        <div
          className="
            relative
            z-20
            w-full
            max-w-7xl
            mx-auto           
            
          "
        >
          {/* Title Section - Centered */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-2 h-2 bg-[#f3bb27] rotate-45" />
                <span
                  className="text-white tracking-[0.2em] text-xs font-medium uppercase"
                  style={{ fontFamily: "'Parkinsans', sans-serif" }}
                >
                  {servicesSection.label}
                </span>
              </div>
              <h2
                className="text-[#f3bb27]  text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight"
                style={{
                  fontFamily: "'Parkinsans', sans-serif",
                  // fontSize: "48px",
                  // fontWeight: 600,
                  // lineHeight: 1.2,
                  // letterSpacing: "0.02em",
                }}
              >
                {servicesSection.title}
              </h2>
            </motion.div>
          </div>

          {/* Service Cards Grid with Slide/Hide Animation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full max-w-6xl mx-auto items-stretch">
            {services.slice(0, 3).map((service, index) => (
              <motion.div
                key={service.id ?? index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.7,
                  opacity: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  x: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }}
                // onMouseEnter={() => setActiveServiceIndex(index)}
                // onMouseLeave={() => setActiveServiceIndex(-1)}
                onMouseEnter={() => {
                  if (!isMobile) setActiveServiceIndex(index);
                }}
                onMouseLeave={() => {
                  if (!isMobile) setActiveServiceIndex(-1);
                }}
                animate={{
                  opacity: 1,
                  x:
                    activeServiceIndex !== index
                      ? index < activeServiceIndex
                        ? -30
                        : index > activeServiceIndex
                          ? 30
                          : 0
                      : 0,
                  scale: activeServiceIndex === index ? 1.02 : 1,
                }}
                // className="relative bg-transparent border border-white/10 hover:border-white/20 cursor-pointer rounded-2xl overflow-hidden"
                className="relative w-full max-w-[340px] sm:max-w-[360px] md:max-w-none md:w-full bg-transparent border border-white/10 rounded-2xl overflow-hidden cursor-pointer
                  "
                style={{ aspectRatio: "3/4" }}
              >
                {/* Card Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-6 lg:p-8">
                  {/* Top Content */}
                  <div>
                    {/* Top Row: Icon and Category Badge */}
                    <div className="flex items-start justify-between mb-8">
                      {/* Icon Circle - Always Yellow */}
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-[#f3bb27] transition-all duration-300">
                        {service.icon}
                      </div>
                    </div>

                    {/* Large Category Text */}
                    <h3
                      // className="text-[#f3bb27] uppercase"
                      className="
                        text-[#f3bb27]
                        uppercase
                        text-[22px]
                        sm:text-[26px]
                        lg:text-[40px]
                        "
                      style={{
                        fontFamily: "'Parkinsans', sans-serif",
                        fontWeight: 400,
                        letterSpacing: "0.02em",
                        lineHeight: 1.1,
                        textShadow: "1px 1px 0px #f3bb27",
                      }}
                    >
                      {service.category}
                    </h3>
                  </div>

                  {/* Bottom: Curved Card that Slides/Hides on Hover */}
                  <motion.div
                    animate={{
                      y: isAnyCardHovered ? "110%" : "0%",

                      opacity: isAnyCardHovered ? 0 : 1,
                    }}
                    transition={{ duration: 0.65, ease: [0.19, 1, 0.22, 1] }}
                    // className="relative bg-[#F5F1EA] p-6 shadow-xl"
                    className="
                    relative
                    w-full

                    bg-[#F5F1EA]

                    p-4
                    sm:p-5
                    lg:p-6

                    shadow-xl
                    "
                    style={{
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                      borderBottomLeftRadius: "16px",
                      borderBottomRightRadius: "80px",
                    }}
                  >
                    {/* Service Title */}
                    <h4
                      className="text-[#1a1a1a] mb-3 text-[18px] sm:text-[20px] lg:text-[22px]"
                      style={{
                        fontFamily: "'Parkinsans', sans-serif",
                        // fontSize: "22px",
                        fontWeight: 600,
                        lineHeight: 1.3,
                      }}
                    >
                      {service.title}
                    </h4>

                    {/* Description - Gray text */}
                    <p
                      className="text-[#666666] font-normal text-[13px] sm:text-[14px] lg:text-[17px]"
                      style={{
                        fontFamily: "'Parkinsans', sans-serif",
                        // fontSize: "17px",
                        lineHeight: 1.5,
                      }}
                    >
                      {service.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline - Dark Background */}
      <section className="pt-16 sm:pt-24 pb-24 sm:pb-40 px-4 sm:px-6 lg:px-8 bg-[#332C26]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-2 h-2 bg-[#f3bb27] rotate-45" />
                <span
                  className="
                text-[#f3bb27]
                tracking-[0.22em]
                text-xs
                font-medium
                uppercase
                "
                  style={{
                    fontFamily: "'Parkinsans',sans-serif",
                  }}
                >
                  {processSection.label}
                </span>
              </div>
              <h2
                className="text-[#f3bb27]"
                style={{
                  fontFamily: "'Parkinsans', sans-serif",
                  fontSize: "clamp(32px, 6vw, 48px)",
                  fontWeight: 600,
                  lineHeight: 1.2,
                  letterSpacing: "0.02em",
                }}
              >
                {processSection.title}
              </h2>
              <p
                className="
                max-w-[650px]
                mx-auto
                text-[#BEB5AC]
                "
                style={{
                  fontFamily: "'Parkinsans',sans-serif",
                  fontSize: "17px",
                  lineHeight: "30px",
                }}
              >
                {processSection.description}
              </p>
            </motion.div>
          </div>

          <div className="relative">
            <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#f3bb27]/30 to-transparent hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 sm:gap-12 lg:gap-16">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.2,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -15 }}
                  className="relative text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 360 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 size-24 mx-auto mb-10 bg-gradient-to-br from-[#ea7a12] to-[#f3bb27] rounded-full flex items-center justify-center text-white shadow-2xl shadow-[#f3bb27]/30"
                  >
                    {item.icon}
                  </motion.div>
                  <div
                    className="text-sm text-[#f3bb27] tracking-widest mb-5 font-medium"
                    style={{ fontFamily: "'Parkinsans', sans-serif" }}
                  >
                    {item.step}
                  </div>
                  <h3
                    className="text-[#F5F1EA] mb-5"
                    style={{
                      fontFamily: "'Parkinsans', sans-serif",
                      fontSize: "clamp(22px,5.6vw,28px)",
                      fontWeight: 500,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[#b8b1a8] font-light"
                    style={{
                      fontFamily: "'Parkinsans', sans-serif",
                      fontSize: "clamp(14px,3.6vw,16px)",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Decoria Luxury Circular Design */}
      <section id="clients" className="pt-16 sm:pt-20 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8 bg-[#F5F1EA]">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Title Section - Centered */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
            text-center
            mb-20
            "
          >
            <div
              className="
            flex
            items-center
            justify-center
            gap-3
            mb-5
            "
            >
              <div
                className="
            w-14
            h-[1px]
            bg-gradient-to-r
            from-transparent
            to-[#D9A441]
            "
              />

              <div
                className="
            uppercase
            tracking-[0.45em]
            text-[12px]
            font-medium
            text-[#C89A38]
            "
                style={{
                  fontFamily: "'Parkinsans',sans-serif",
                }}
              >
                {testimonialsSection.label}
              </div>

              <div
                className="
            w-14
            h-[1px]
            bg-gradient-to-l
            from-transparent
            to-[#D9A441]
            "
              />
            </div>

            <h2
              className="
            text-[#332C26]
            mb-5
            "
              style={{
                fontFamily: "'Parkinsans',sans-serif",
                fontSize: "clamp(36px, 7vw, 56px)",
                fontWeight: 500,
                lineHeight: "1.08",
                letterSpacing: "-.03em",
              }}
            >
              {testimonialsSection.titleLine1}
              <br />
              <span className="text-[#C28B2D]">{testimonialsSection.titleHighlight}</span>
            </h2>

            <div
              className="
            w-36
            h-[1px]
            bg-gradient-to-r
            from-transparent
            via-[#D9A441]
            to-transparent

            mx-auto
            mb-6
            relative
            "
            >
              <div
                className="
            absolute
            left-1/2
            top-1/2

            w-2
            h-2

            bg-[#D9A441]

            rotate-45

            -translate-x-1/2
            -translate-y-1/2
            "
              />
            </div>

            <p
              className="
            text-[#6B645E]
            max-w-xl
            mx-auto
            "
              style={{
                fontFamily: "'Parkinsans',sans-serif",

                fontSize: "16px",

                lineHeight: "1.9",
              }}
            >
              {testimonialsSection.description}
            </p>
          </motion.div>

          {/* Testimonial Carousel with Pill-Shaped Card */}
          <div className="relative max-w-5xl mx-auto mt-6">
            {/* SVG Gradient Definition */}
            <svg width="0" height="0" style={{ position: "absolute" }}>
              <defs>
                <linearGradient
                  id="arrowGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#ea7a12" />
                  <stop offset="100%" stopColor="#f3bb27" />
                </linearGradient>
              </defs>
            </svg>

            {/* Navigation Arrows - Outside Circle */}
            <motion.button
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => testimonialSliderRef.current?.slickPrev()}
              className="absolute left-2 md:left-4 xl:-left-28 top-1/2 -translate-y-1/2 z-30 flex items-center gap-1.5 transition-all bg-[#F5F1EA]/90 md:bg-transparent rounded-full px-2 py-2 md:px-0 md:py-0 shadow-sm md:shadow-none"
              style={{
                fontFamily: "'Parkinsans', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#arrowGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="bg-gradient-to-r from-[#ea7a12] to-[#f3bb27] bg-clip-text text-transparent">
                Prev
              </span>
            </motion.button>

            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => testimonialSliderRef.current?.slickNext()}
              className="absolute right-2 md:right-4 xl:-right-28 top-1/2 -translate-y-1/2 z-30 flex items-center gap-1.5 transition-all bg-[#F5F1EA]/90 md:bg-transparent rounded-full px-2 py-2 md:px-0 md:py-0 shadow-sm md:shadow-none"
              style={{
                fontFamily: "'Parkinsans', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              <span className="bg-gradient-to-r from-[#ea7a12] to-[#f3bb27] bg-clip-text text-transparent">
                Next
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#arrowGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </motion.button>

            {/* Carousel */}
            <Slider ref={testimonialSliderRef} {...testimonialSettings}>
              {testimonials.map((testimonial, index) => (
                <div key={index}>
                  {/* Pill-Shaped Testimonial Card with 200px border-radius */}
                  <div
                    className="text-center mt-8 sm:mt-12 border border-[#332C26]/10 bg-white/50 rounded-3xl md:rounded-[200px] px-5 py-8 sm:px-10 sm:py-12 md:px-[60px] md:py-10"
                  >
                    {/* Circular Avatar - Floating */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      className="mb-8"
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="size-20 rounded-full mx-auto object-cover shadow-lg"
                      />
                    </motion.div>

                    {/* Testimonial Quote - Medium Typography */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-[#332C26] mb-8 max-w-2xl mx-auto"
                      style={{
                        fontFamily: "'Parkinsans', sans-serif",
                        fontSize: "18px",
                        lineHeight: 1.6,
                        fontWeight: 400,
                      }}
                    >
                      "{testimonial.quote}"
                    </motion.p>

                    {/* Rating Section with Lines and Diamonds - Decoria Style */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="flex items-center justify-center gap-5 mb-6"
                    >
                      {/* Left Diamonds */}
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#332C26]/30 rotate-45" />
                        <div className="w-1.5 h-1.5 bg-[#332C26]/30 rotate-45" />
                        <div className="w-1.5 h-1.5 bg-[#332C26]/30 rotate-45" />
                      </div>

                      {/* Left Line - Extended Length */}
                      <div className="w-32 h-px bg-[#332C26]/25" />

                      {/* Rating with Star - Pill Shape */}
                      <div
                        className="flex items-center gap-2 px-4 py-1.5 border border-[#332C26]/15 bg-white uppercase"
                        style={{
                          fontFamily: "'Parkinsans', sans-serif",
                          fontSize: "13px",
                          fontWeight: 600,
                          borderRadius: "50px",
                        }}
                      >
                        <Award className="size-4 text-[#332C26]" />
                        <span className="text-[#332C26]">
                          {testimonial.rating}
                        </span>
                      </div>

                      {/* Right Line - Extended Length */}
                      <div className="w-32 h-px bg-[#332C26]/25" />

                      {/* Right Diamonds */}
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#332C26]/30 rotate-45" />
                        <div className="w-1.5 h-1.5 bg-[#332C26]/30 rotate-45" />
                        <div className="w-1.5 h-1.5 bg-[#332C26]/30 rotate-45" />
                      </div>
                    </motion.div>

                    {/* Author Info - Clean Typography */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      <div
                        className="bg-gradient-to-r from-[#ea7a12] to-[#f3bb27] bg-clip-text text-transparent mb-1"
                        style={{
                          fontFamily: "'Parkinsans', sans-serif",
                          fontSize: "18px",
                          fontWeight: 700,
                        }}
                      >
                        {testimonial.author}
                      </div>
                      <div
                        className="text-[#332C26]/60"
                        style={{
                          fontFamily: "'Parkinsans', sans-serif",
                          fontSize: "14px",
                          fontWeight: 400,
                        }}
                      >
                        {testimonial.role}
                      </div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Footer - Dark Background */}
      <Footer />
      <FloatingWhatsApp />
        </>
      )}
    </div>
  );
}

// Luxury Feature Card Component
function LuxuryFeatureCard({
  feature,
  index,
}: {
  feature: any;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 1,
        delay: index * 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -20 }}
      className="group relative overflow-hidden rounded-3xl cursor-pointer shadow-2xl"
    >
      <div className="relative h-[380px] md:h-[480px] lg:h-[600px]">
        <motion.img
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          src={feature.image}
          alt={feature.title}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#332C26] via-[#332C26]/70 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: index * 0.25 + 0.4 }}
          className="absolute bottom-0 left-0 right-0 p-12"
        >
          <motion.div
            whileHover={{ y: -8, scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="text-[#f3bb27] mb-8"
          >
            {feature.icon}
          </motion.div>

          <div className="w-16 h-1 bg-gradient-to-r from-[#ea7a12] to-[#f3bb27] mb-8" />

          <h3
            className="text-[#F5F1EA] mb-6 group-hover:text-[#f3bb27] transition-colors duration-500"
            style={{
              fontFamily: "'Parkinsans', sans-serif",
              fontSize: "32px",
              fontWeight: 500,
            }}
          >
            {feature.title}
          </h3>
          <p
            className="text-[#b8b1a8] font-light"
            style={{
              fontFamily: "'Parkinsans', sans-serif",
              fontSize: "16px",
              lineHeight: 1.8,
            }}
          >
            {feature.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
