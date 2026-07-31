import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import CustomDropdown from "../app/components/CustomDropdown";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import corporateBanner from "../assets/images/corporate-banner.png";
import civilBanner from "../assets/images/civil-banner.png";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  LayoutGrid,
  List,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import techMahindra from "../assets/images/tech-mahindra-office.jpeg";
import siemens from "../assets/images/siemens-innovation-hub.jpeg";
import dining from "../assets/images/executive-dining-space.jpeg";
import workspace from "../assets/images/creative-studio-workspace.jpeg";
import bank from "../assets/images/hdfc-bank-branch.jpeg";
import itpark from "../assets/images/datasoft-it-park.jpeg";
import mahindra from "../assets/images/mahindra-office.jpeg";
import acme from "../assets/images/acme-headquarters.jpeg";

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
      "IT Parks",
    ],
  },

  civil: {
    title: "Civil",
    breadcrumb: "Civil Structures",
    banner: civilBanner,
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
};

const projects: Project[] = [
  {
    id: 1,
    title: "Tech Mahindra Office",
    category: "Offices",
    location: "Kolkata, India",
    image: techMahindra,
    slug: "tech-mahindra-office",
  },
  {
    id: 2,
    title: "Siemens Innovation Hub",
    category: "Workspaces",
    location: "Kolkata, India",
    image: siemens,
    slug: "siemens-innovation-hub",
  },
  {
    id: 3,
    title: "Executive Dining Space",
    category: "Hospitality",
    location: "Kolkata, India",
    image: dining,
    slug: "executive-dining-space",
  },
  {
    id: 4,
    title: "Creative Studio Workspace",
    category: "Workspaces",
    location: "Kolkata, India",
    image: workspace,
    slug: "creative-studio-workspace",
  },
  {
    id: 5,
    title: "HDFC Bank Branch",
    category: "Banks",
    location: "Kolkata, India",
    image: bank,
    slug: "hdfc-bank",
  },
  {
    id: 6,
    title: "DataSoft IT Park",
    category: "IT Parks",
    location: "Kolkata, India",
    image: itpark,
    slug: "datasoft-it-park",
  },
  {
    id: 7,
    title: "Mahindra & Mahindra Office",
    category: "Offices",
    location: "Kolkata, India",
    image: mahindra,
    slug: "mahindra-office",
  },
  {
    id: 8,
    title: "Acme Corp Headquarters",
    category: "Offices",
    location: "Kolkata, India",
    image: acme,
    slug: "acme-corporate",
  },
];

type Project = {
  id: number;
  title: string;
  category: string;
  location: string;
  image: string;
  slug: string;
};

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

function ProjectFilters({
  activeFilter,
  setActiveFilter,
  sortBy,
  setSortBy,
  view,
  setView,
}: {
  activeFilter: string;
  setActiveFilter: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  view: "grid" | "list";
  setView: React.Dispatch<React.SetStateAction<"grid" | "list">>;
}) {
  const { category } = useParams();

  const pageData = projectPages[category as ProjectCategory];
  const filters = pageData.filters;

  return (
    <section className="bg-[#F5F1EA] py-10">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div
            className="
                  flex
                  flex-wrap
                  lg:flex-nowrap
                  gap-3
                  pt-2
                  pb-2
                "
          >
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
            <CustomDropdown
              value={sortBy}
              options={["Latest", "Oldest", "A-Z"]}
              onChange={setSortBy}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={project.slug}
      className="
          group
          flex
          flex-col
          h-full
          bg-white
          rounded-[26px]
          overflow-hidden
          border
          border-[#E8DED2]
          transition-all
          duration-500
          hover:-translate-y-2
          hover:shadow-[0_18px_50px_rgba(0,0,0,.10)]
        "
    >
      <div className="overflow-hidden rounded-t-[24px]">
        <img
          src={project.image}
          className="
              w-full
              aspect-[4/3]
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
          "
        />
      </div>

      <div className="flex flex-col flex-1 p-4 sm:p-5 lg:p-6">
        <h3
          className="
              min-h-[80px]
              text-[24px]
              lg:text-[28px]
              leading-[1.15]
              font-semibold
              text-[#2B231E]
            "
          style={{
            fontFamily: "Cormorant Garamond",
          }}
        >
          {project.title}
        </h3>

        <div className="mt-3 flex items-center gap-2">
          <MapPin size={14} className="text-[#D89A2B] flex-shrink-0" />

          <span
            className="text-[14px] text-[#746C63]"
            style={{ fontFamily: "Parkinsans" }}
          >
            {project.location}
          </span>
        </div>

        <div
          className="
              mt-auto
              pt-6
              flex
              items-center
              gap-2
              text-[#D89A2B]
              text-[15px]
              font-medium
              transition-all
              duration-300
              group-hover:gap-3
            "
        >
          View Project
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition"
          />
        </div>
      </div>
    </Link>
  );
}

function ProjectGrid({
  projects,
  view,
}: {
  projects: Project[];
  view: "grid" | "list";
}) {
  return (
    <section className="bg-[#F5F1EA] pb-16">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
        <div
          className="
              grid
              gap-8
              items-stretch
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <motion.div
                layout
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -40,
                }}
                transition={{
                  duration: 0.35,
                }}
                key={project.id}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProjectPagination() {
  return (
    <section className="bg-[#F5F1EA] pb-24">
      <div className="flex justify-center items-center gap-3">
        <button className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl border bg-white">
          <ChevronLeft size={18} />
        </button>

        <button className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#D89A2B] text-white">
          1
        </button>

        <button className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl border bg-white">
          2
        </button>

        <button className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl border bg-white">
          3
        </button>

        <button className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl border bg-white">
          ...
        </button>

        <button className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl border bg-white">
          6
        </button>

        <button className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl border bg-white">
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}

export default function ProjectList() {
  const { category } = useParams();

  const [activeFilter, setActiveFilter] = useState("All Projects");

  const [sortBy, setSortBy] = useState("Latest");

  const [view, setView] = useState<"grid" | "list">("grid");

  const filteredProjects =
    activeFilter === "All Projects"
      ? projects
      : projects.filter((x) => x.category === activeFilter);
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
        {/* Hero */}
        <HeroSection category={valid} />

        {/* Filter */}
        <ProjectFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          view={view}
          setView={setView}
        />

        {/* Project Grid */}
        <ProjectGrid projects={filteredProjects} view={view} />

        {/* Pagination */}
        <ProjectPagination />
      </div>

      <Footer />
    </>
  );
}
