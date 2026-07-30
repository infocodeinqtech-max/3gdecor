import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import NotFound from "./NotFound";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import corporateBanner from "../assets/images/corporate-banner.png";
// import civilBanner from "../assets/images/civil-banner.jpg";
import { ChevronRight, LayoutGrid, List } from "lucide-react";
import { useState } from "react";

const projectPages = {
  corporate: {
    title: "Corporate",
    breadcrumb: "Corporate Interiors",
    banner: corporateBanner,
    description:
      "Exceptional workplaces begin with exceptional design. At 3G Decorative Group, we create premium corporate interiors that blend functionality, innovation, and timeless aesthetics to shape environments where businesses thrive.",

    filters: [
      "All Projects",
      "Offices",
      "Workspaces",
      "Showrooms",
      "Banks",
      "Hospitality",
      "IT Parks",
    ],
  },

  civil: {
    title: "Civil",
    breadcrumb: "Civil Structures",
    // banner: civilBanner,
    banner: corporateBanner,
    description:
      "Explore our portfolio of residential, commercial and industrial projects engineered with quality, innovation and long-lasting excellence.",

    filters: [
      "All Projects",
      "Residential",
      "Commercial",
      "Industrial",
      "Institutional",
      "Infrastructure",
    ],
  },
} as const;

type ProjectCategory = keyof typeof projectPages;

function HeroSection({ category }: { category: ProjectCategory }) {
  const pageData = projectPages[category];

  return (
    <section
      className="
        bg-[#F5F1EA]
        px-3
        sm:px-4
        lg:px-5
        "
      style={{
        position: "relative",
      }}
    >
      <div
        className="
        relative
        overflow-hidden
        rounded-[18px] sm:rounded-[24px] md:rounded-[32px] lg:rounded-[32px]
        w-full
        min-h-[70svh]
        h-[520px]
        sm:h-[560px]
        md:h-[600px]
        lg:h-[650px]
        xl:h-[700px]
        "
      >
        {/* ── Full-bleed background image ── */}
        <div className="absolute inset-0 z-0">
          <img
            src={pageData.banner}
            alt={pageData.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: "brightness(1.15) contrast(1.08) saturate(1.08)",
            }}
          />
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `
            radial-gradient(
                circle at 18% 88%,
                rgba(6,5,4,.92) 0%,
                rgba(8,6,5,.78) 18%,
                rgba(10,8,6,.45) 36%,
                rgba(10,8,6,.12) 58%,
                rgba(10,8,6,0) 100%
            ),

            linear-gradient(
                90deg,
                rgba(8,6,5,.82) 0%,
                rgba(8,6,5,.58) 20%,
                rgba(8,6,5,.22) 42%,
                rgba(8,6,5,.08) 60%,
                rgba(8,6,5,0) 100%
            ),

            linear-gradient(
                180deg,
                rgba(8,6,5,.05) 0%,
                rgba(8,6,5,0) 38%,
                rgba(8,6,5,.06) 72%,
                rgba(8,6,5,.28) 100%
            )
            `,
            }}
          />

          {/* Gold Border */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute top-0 left-0 right-0 h-[3px] origin-left z-20"
            style={{
              background: "linear-gradient(90deg,#f3bb27,#ea7a12,#f3bb27)",
            }}
          />
          {/* Glow */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
            }}
            className="
                absolute
                left-[-120px]
                bottom-[-120px]
                w-[320px]
                h-[320px]
                sm:w-[450px]
                sm:h-[450px]
                lg:w-[600px]
                lg:h-[600px]
                rounded-full
                "
            style={{
              background:
                "radial-gradient(circle,rgba(243,187,39,.08),transparent 70%)",
              filter: "blur(90px)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
              {/* Breadcrumb */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="
                    flex
                    flex-wrap
                    items-center
                    gap-2
                    sm:gap-3
                    mb-6
                    "
              >
                <a
                  href="/"
                  className="text-[#F5F1EA]/40 hover:text-[#F3BB27] text-[11px] uppercase tracking-[0.25em]"
                  style={{ fontFamily: "Parkinsans" }}
                >
                  Home
                </a>

                <ChevronRight className="w-3 h-3 text-[#F3BB27]/40" />

                <a
                  href="/projects"
                  className="text-[#F5F1EA]/40 hover:text-[#F3BB27] text-[11px] uppercase tracking-[0.25em]"
                  style={{ fontFamily: "Parkinsans" }}
                >
                  Projects
                </a>

                <ChevronRight className="w-3 h-3 text-[#F3BB27]/40" />

                <span
                  className="text-[#F3BB27] text-[11px] uppercase tracking-[0.25em]"
                  style={{ fontFamily: "Parkinsans" }}
                >
                  {pageData.breadcrumb}
                </span>
              </motion.div>

              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 mb-7"
              >
                <div className="w-10 h-px bg-gradient-to-r from-[#F3BB27] to-[#EA7A12]" />

                <span
                  //   className="text-[#F3BB27] uppercase tracking-[0.35em] text-xs"
                  className="
                    text-[#F3BB27]
                    uppercase
                    tracking-[0.18em]
                    sm:tracking-[0.35em]
                    text-[10px]
                    sm:text-xs
                    "
                  style={{ fontFamily: "Parkinsans" }}
                >
                  OUR PORTFOLIO
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                }}
                className="max-w-3xl"
                style={{
                  fontFamily: "Cormorant Garamond",
                  fontSize: "clamp(46px,8vw,92px)",
                  lineHeight: ".92",
                  fontWeight: 500,
                }}
              >
                <span className="text-white">{pageData.title}</span>

                <br />

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

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.7,
                }}
                className="
                    mt-8
                    max-w-md
                    sm:max-w-lg
                    lg:max-w-xl
                    text-[#DDD5CB]
                    text-[14px]
                    sm:text-[15px]
                    lg:text-[16px]
                    leading-7
                    sm:leading-8
                    "
                style={{
                  fontFamily: "Parkinsans",
                }}
              >
                {pageData.description}
              </motion.p>
            </div>
          </div>

          {/* Bottom Fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32"
            style={{
              background: "linear-gradient(to top,rgba(0,0,0,.35),transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

function ProjectFilters({ category }: { category: ProjectCategory }) {
  const pageData = projectPages[category];

  const filters = pageData.filters;

  const [activeFilter, setActiveFilter] = useState("All Projects");
  const [sortBy, setSortBy] = useState("Latest");
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <section className="bg-[#F5F1EA] py-10">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div className="flex flex-wrap gap-3">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setActiveFilter(item)}
                className={`
                  px-5
                  h-11
                  rounded-xl
                  border
                  text-sm
                  font-medium
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-md

                  ${
                    activeFilter === item
                      ? "bg-[#D89A2B] border-[#D89A2B] text-white"
                      : "bg-white border-[#E6DDD2] text-[#5A5249] hover:border-[#D89A2B] hover:text-[#D89A2B]"
                  }
                `}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="
                h-11
                min-w-[160px]
                rounded-xl
                border
                border-[#E6DDD2]
                bg-white
                px-4
                text-sm
                outline-none
                focus:border-[#D89A2B]
              "
            >
              <option>Latest</option>
              <option>Oldest</option>
              <option>A-Z</option>
            </select>

            <button
              onClick={() => setView("grid")}
              className={`
                w-11
                h-11
                rounded-xl
                border
                flex
                items-center
                justify-center
                transition-all

                ${
                  view === "grid"
                    ? "bg-[#D89A2B] text-white border-[#D89A2B]"
                    : "bg-white border-[#E6DDD2] text-[#5A5249]"
                }
              `}
            >
              <LayoutGrid size={18} />
            </button>

            <button
              onClick={() => setView("list")}
              className={`
                w-11
                h-11
                rounded-xl
                border
                flex
                items-center
                justify-center
                transition-all

                ${
                  view === "list"
                    ? "bg-[#D89A2B] text-white border-[#D89A2B]"
                    : "bg-white border-[#E6DDD2] text-[#5A5249]"
                }
              `}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProjectList() {
  const { category } = useParams();
  const valid =
    category === "corporate" || category === "civil"
      ? (category as ProjectCategory)
      : null;

  if (!valid) {
    return (
      <NotFound
        title="Page not found"
        description="This project category doesn’t exist. Choose Corporate or Civil projects from the portfolio."
      />
    );
  }

  return (
    <>
      <Navbar activeNav="projects" />

      <div
        className="w-full overflow-x-hidden"
        style={{ fontFamily: "'Parkinsans', sans-serif" }}
      >
        <HeroSection category={valid} />
        <ProjectFilters category={valid} />
      </div>

      <Footer />
    </>
  );
}
