import { motion } from "framer-motion";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import PageLoader from "../app/components/PageLoader";
import { useNavigate } from "react-router-dom";
import { loadPublicSiteCms } from "../content/publicCms";
import { useCmsPageGate } from "../hooks/useCmsPageGate";
import {
  ChevronRight,
  Briefcase,
  Building2,
  Award,
  Building,
  Landmark,
  ArrowRight,
} from "lucide-react";
import projectBanner from "../assets/images/project-banner.png";
import corporateCategory from "../assets/images/project-category-corporate.png";
import civilCategory from "../assets/images/project-category-corporate.png";

import office1 from "../assets/images/cp_int-1.jpeg";
import office2 from "../assets/images/cp-int-2.jpeg";
import office3 from "../assets/images/cp-int-3.jpeg";
import office4 from "../assets/images/cp-int-4.jpeg";
import office5 from "../assets/images/cp-int-5.jpeg";

import civil1 from "../assets/images/cv_1.png";
import civil2 from "../assets/images/cv_2.png";
import civil3 from "../assets/images/cv_3.png";
import civil4 from "../assets/images/cv_4.png";
import FeaturedProjects from "../app/components/FeaturedProjects";

const projectStats = [
  {
    icon: Briefcase,
    number: "250+",
    title: "Projects Delivered",
  },
  {
    icon: Building2,
    number: "15+",
    title: "Years Experience",
  },
  {
    icon: Award,
    number: "100%",
    title: "Client Satisfaction",
  },
];

const projectCategories = [
  {
    id: 1,
    title: "Corporate Interiors",
    image: corporateCategory,
    icon: Building2,

    subtitle:
      "Workspaces that inspire. Interiors that perform. Environments that elevate everyday experiences.",

    tags: ["Workspaces", "Offices", "Showrooms", "Banks"],

    button: "View Projects",

    link: "/projects/corporate",
  },

  {
    id: 2,
    title: "Civil Structures",
    image: civilCategory,
    icon: Landmark,

    subtitle:
      "Strong foundations. Timeless structures. Built to shape skylines and empower communities.",

    tags: ["Residential", "Commercial", "Industrial", "Infrastructure"],

    button: "View Projects",

    link: "/projects/civil",
  },
];

const corporateProjects = [
  {
    id: 1,
    title: "Tech Mahindra Office",
    location: "Kolkata, India",
    image: office1,
    slug: "tech-mahindra",
  },
  {
    id: 2,
    title: "Siemens Innovation Hub",
    location: "Kolkata, India",
    image: office2,
    slug: "siemens",
  },
  {
    id: 3,
    title: "Executive Dining Space",
    location: "Kolkata, India",
    image: office3,
    slug: "executive-dining",
  },
  {
    id: 4,
    title: "Creative Studio Workspace",
    location: "Kolkata, India",
    image: office4,
    slug: "creative-workspace",
  },
  {
    id: 5,
    title: "Corporate Reception",
    location: "Kolkata, India",
    image: office5,
    slug: "reception",
  },
];

const civilProjects = [
  {
    id: 1,
    title: "Luxury Villa",
    location: "Bhuvaneshwar, India",
    image: civil1,
    slug: "luxury-villa",
  },
  {
    id: 2,
    title: "Flender Drives",
    location: "Kharagpur, India",
    image: civil2,
    slug: "industrial-facility",
  },
  {
    id: 3,
    title: "Residential",
    location: "Kolkata, India",
    image: civil3,
    slug: "residential-building",
  },
  {
    id: 4,
    title: "Industrial Complex",
    location: "Bhubaneswar, India",
    image: civil4,
    slug: "industrial-complex",
  },
];

function HeroSection() {
  const navigate = useNavigate();
  return (
    <section
      // className="bg-[#F5F1EA] px-4 lg:px-5"
      className="
        bg-[#F5F1EA]
        px-4
        lg:px-5
        pt-[72px]     
        lg:pt-[80px]
      "
      style={{
        position: "relative",
      }}
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-[20px] md:rounded-[32px]
          w-full
          min-h-[70svh]
          h-auto
          lg:min-h-[760px]
          "
      >
        {/* ── Full-bleed background image ── */}
        <div className="absolute inset-0 z-0">
          <img
            src={projectBanner}
            alt="3G Decorative Group reception"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: "brightness(1.45) contrast(1.08) saturate(1.1)",
            }}
          />
          {/* Left-heavy dark overlay — text readable, image glows through on right  -- Dark Gradient */}
          {/* Dark Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(
                    circle at 18% 88%,
                    rgba(6,5,4,0.98) 0%,
                    rgba(8,6,5,0.92) 22%,
                    rgba(10,8,6,0.75) 42%,
                    rgba(10,8,6,0.28) 65%,
                    rgba(10,8,6,0) 100%
                ),

                linear-gradient(
                    90deg,
                    rgba(8,6,5,0.92) 0%,
                    rgba(8,6,5,0.72) 24%,
                    rgba(8,6,5,0.35) 46%,
                    rgba(8,6,5,0.12) 70%,
                    rgba(8,6,5,0) 100%
                ),
                linear-gradient(
                      270deg,
                      rgba(8,6,5,0.22) 0%,
                      rgba(8,6,5,0.14) 18%,
                      rgba(8,6,5,0.08) 35%,
                      rgba(8,6,5,0) 60%
                  ),

                linear-gradient(
                    180deg,
                    rgba(8,6,5,0.10) 0%,
                    rgba(8,6,5,0) 45%,
                    rgba(8,6,5,0.08) 65%,
                    rgba(8,6,5,0.45) 100%
                )
                `,
            }}
          />
        </div>

        {/* Gold top bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 right-0 h-[3px] origin-left z-30"
          // style={{
          //   background: "linear-gradient(90deg,#f3bb27,#ea7a12,#f3bb27)",
          // }}
        />

        {/* Ambient orb — warm left */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle,rgba(243,187,39,0.06) 0%,transparent 65%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Main text content ── */}
        <div
          className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-16"
          style={{
            paddingTop: "clamp(100px, 18vw, 160px)",
            paddingBottom: "80px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex items-center gap-3 mb-8"
          >
            <a
              href="./"
              className="text-[#F5F1EA]/35 hover:text-[#f3bb27] text-[11px] uppercase tracking-[0.25em] transition-colors"
              style={{ fontFamily: "'Parkinsans', sans-serif" }}
            >
              Home
            </a>
            <ChevronRight className="size-3 text-[#f3bb27]/30" />
            <span
              className="text-[#f3bb27] text-[11px] uppercase tracking-[0.25em]"
              style={{ fontFamily: "'Parkinsans', sans-serif" }}
            >
              Projects
            </span>
          </motion.div>

          {/* Pre-label */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-10 h-px bg-gradient-to-r from-[#f3bb27] to-[#ea7a12]" />
            <span
              className="text-[#f3bb27] text-[11px] uppercase tracking-[0.32em]"
              style={{ fontFamily: "'Parkinsans', sans-serif" }}
            >
              Projects
            </span>
          </motion.div>

          {/* Main heading — matches reference: Design. Build. Deliver Excellence. */}

          <div className="max-w-2xl mb-7">
            <div style={{ overflow: "hidden" }}>
              <motion.h1
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.48,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  fontFamily: "'Parkinsans', sans-serif",
                  fontSize: "clamp(56px, 7vw, 96px)",
                  fontWeight: 400,
                  lineHeight: "92%",
                  letterSpacing: "-0.03em",
                }}
              >
                <span className="text-[#F5F1EA]">Our </span>

                <span
                  style={{
                    background: "linear-gradient(90deg,#f3bb27,#ea7a12)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Projects
                </span>
              </motion.h1>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.92 }}
            className="text-[#D5D0C8] max-w-xl"
            style={{
              fontFamily: "'Parkinsans', sans-serif",
              fontSize: "15px",
              lineHeight: 1.75,
            }}
          >
            Explore a curated collection of premium corporate interiors and
            civil infrastructure projects that reflect our passion for
            craftsmanship, precision, and timeless architectural excellence.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.02 }}
            className="text-[#BEB6AD] max-w-xl mt-7"
            style={{
              fontFamily: "'Parkinsans', sans-serif",
              fontSize: "15px",
              lineHeight: 1.9,
            }}
          >
            From collaborative workspaces and executive offices to reception
            lounges and business environments, we combine creativity, precision,
            and timeless design to create spaces that leave a lasting
            impression.
          </motion.p>

          {/* Statistics */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1,
            }}
            className="flex flex-wrap gap-14 mt-16"
          >
            {projectStats.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={index} className="flex items-center gap-5">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      border: "1px solid rgba(244,178,35,.35)",
                      background: "rgba(255,255,255,.05)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Icon
                      className="w-9 h-9 text-[#f4b223]"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div>
                    <h3
                      className="text-white"
                      style={{
                        fontFamily: "Cormorant Garamond",
                        fontSize: "44px",
                      }}
                    >
                      {item.number}
                    </h3>

                    <p
                      className="text-[#DDD6CC]"
                      style={{
                        fontFamily: "Parkinsans",
                        fontSize: "14px",
                      }}
                    >
                      {item.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Bottom Fade */}

          <div
            className="absolute bottom-0 left-0 right-0 h-44"
            style={{
              background: "linear-gradient(to top,rgba(0,0,0,.35),transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

function ProjectCategories() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#F5F1EA] py-20 lg:py-28">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="uppercase tracking-[.28em] text-[#D49A2D] text-xs font-semibold">
            OUR PROJECT CATEGORIES
          </span>

          <h2
            className="mt-5 text-[#2A231D]"
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: "clamp(42px,5vw,68px)",
              lineHeight: 1.1,
            }}
          >
            Two Domains.
            <br className="sm:hidden" />
            Endless Possibilities.
          </h2>

          <p
            className="mx-auto mt-6 max-w-2xl text-[#7C756F]"
            style={{
              fontFamily: "Parkinsans",
              lineHeight: 1.8,
            }}
          >
            From inspiring interiors to iconic structures, our work spans across
            two core domains.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {projectCategories.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                }}
                onClick={() => navigate(item.link)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-[22px] h-[430px] xl:h-[450px]">
                  <img
                    src={item.image}
                    className="absolute inset-0 w-full h-full object-cover transition duration-700 transition-all duration-1000 group-hover:scale-[1.04]"
                    style={{
                      filter: "brightness(1.12) contrast(1.05) saturate(1.05)",
                    }}
                  />

                  {/* Overlay */}

                  <div
                    className="absolute inset-0"
                    style={{
                      background: `
                        linear-gradient(
                              90deg,
                              rgba(5,5,5,.92) 0%,
                              rgba(5,5,5,.82) 22%,
                              rgba(5,5,5,.55) 38%,
                              rgba(5,5,5,.15) 65%,
                              rgba(5,5,5,.05) 100%
                          ),
                        radial-gradient(
                          circle at bottom left,
                          rgba(212,154,45,.22),
                          transparent 55%
                        )
                      `,
                    }}
                  />

                  {/* Content */}

                  <div className="absolute inset-0 flex flex-col justify-between">
                    {/* Top */}
                    <div className="p-7 md:p-9 lg:p-10">
                      <div
                        className="
                          w-16
                          h-16
                          rounded-full
                          border
                          border-[#D49A2D]
                          bg-black/20
                          backdrop-blur-md
                          flex
                          items-center
                          justify-center
                          "
                      >
                        <Icon
                          className="w-8 h-8 text-[#D49A2D]"
                          strokeWidth={1.4}
                        />
                      </div>
                    </div>

                    {/* Bottom */}
                    <div className="px-7 md:px-9 lg:px-10 pb-10">
                      <h3
                        className="text-white"
                        style={{
                          fontFamily: "Cormorant Garamond",
                          fontSize: "clamp(32px,3vw,46px)",
                          lineHeight: 1.05,
                        }}
                      >
                        {item.title}
                      </h3>

                      <div
                        className="flex flex-wrap items-center mt-5"
                        style={{ fontFamily: "Parkinsans" }}
                      >
                        {item.tags.map((tag, index) => (
                          <span
                            key={tag}
                            className="text-[#E6E0D8] text-[15px]"
                          >
                            {tag}
                            {index !== item.tags.length - 1 && (
                              <span className="mx-3 text-[#D49A2D]">•</span>
                            )}
                          </span>
                        ))}
                      </div>

                      <button
                        className="
                          mt-8
                          flex
                          items-center
                          gap-3
                          text-[#D49A2D]
                          font-medium
                          group-hover:gap-5
                          transition-all
                          "
                      >
                        {item.button}
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Projects() {
  const { showLoader, fading } = useCmsPageGate((force) =>
    loadPublicSiteCms(force),
  );

  return (
    <>
      {showLoader && <PageLoader fading={fading} />}
      <Navbar activeNav="projects" />

      <div
        className="w-full overflow-x-hidden"
        style={{ fontFamily: "'Parkinsans', sans-serif" }}
      >
        {/* Hero Section */}
        <HeroSection />

        {!showLoader && (
          <>
            {/* Category Section */}
            <ProjectCategories />

            {/* Corporate Projects */}
            <FeaturedProjects
              subtitle="CORPORATE INTERIORS"
              title="Featured Projects"
              description="Thoughtfully crafted interiors that enhance productivity, reflect brand identity and create memorable experiences."
              button="View All Corporate Projects"
              viewAllLink="/projects/corporate"
              projects={corporateProjects}
            />

            {/* Civil Projects */}

            <FeaturedProjects
              title="Featured Projects"
              description="Delivering durable civil infrastructure with precision engineering, sustainable practices, and uncompromising quality."
              subtitle="CIVIL STRUCTURES"
              button="View All Civil Projects"
              viewAllLink="/projects/civil"
              projects={civilProjects}
            />

            {/* CTA */}
          </>
        )}
      </div>

      {!showLoader && <Footer />}
    </>
  );
}
