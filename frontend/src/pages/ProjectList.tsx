import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import PageLoader from "../app/components/PageLoader";
import CustomDropdown from "../app/components/CustomDropdown";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import { loadPublicSiteCms } from "../content/publicCms";
import { useCmsPageGate } from "../hooks/useCmsPageGate";
import corporateBanner from "../assets/images/corporate-banner.png";
import civilBanner from "../assets/images/civil-banner.png";
import office1 from "../assets/images/cp_int-1.jpeg";
import office2 from "../assets/images/cp-int-2.jpeg";
import office3 from "../assets/images/cp-int-3.jpeg";
import office4 from "../assets/images/cp-int-4.jpeg";
import office5 from "../assets/images/cp-int-5.jpeg";
import techMahindra from "../assets/images/tech-mahindra-office.jpeg";
import siemens from "../assets/images/siemens-innovation-hub.jpeg";
import executiveDining from "../assets/images/executive-dining-space.jpeg";
import creativeStudio from "../assets/images/creative-studio-workspace.jpeg";
import hdfc from "../assets/images/hdfc-bank-branch.jpeg";
import datasoft from "../assets/images/datasoft-it-park.jpeg";
import mahindra from "../assets/images/mahindra-office.jpeg";
import acme from "../assets/images/acme-headquarters.jpeg";
import civil1 from "../assets/images/cv_1.png";
import civil2 from "../assets/images/cv_2.png";
import civil3 from "../assets/images/cv_3.png";
import civil4 from "../assets/images/cv_4.png";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import {
  seedProjectsPageCategories,
  seedProjectsPageItems,
  type ProjectsPageCategoryItem,
  type ProjectsPageItem,
} from "../admin/data/seedContent";
import { getListContent } from "../admin/utils/contentStorage";
import { mediaUrl, preloadImage } from "../utils/mediaUrl";

const FALLBACK_BANNERS: Record<string, string> = {
  corporate: corporateBanner,
  civil: civilBanner,
};

const FALLBACK_ITEM_IMAGES: Record<string, string> = {
  "tech-mahindra-office": techMahindra,
  "siemens-innovation-hub": siemens,
  "executive-dining-space": executiveDining,
  "creative-studio-workspace": creativeStudio,
  "hdfc-bank": hdfc,
  "datasoft-it-park": datasoft,
  "mahindra-office": mahindra,
  "acme-corporate": acme,
  "corporate-reception": office5,
  "premium-workspace-hub": office1,
  "innovation-collaboration-center": office2,
  "executive-boardroom-suite": office3,
  "luxury-villa": civil1,
  "industrial-facility": civil2,
  "residential-building": civil3,
  "industrial-complex": civil4,
  "commercial-tower": civilBanner,
  "institutional-campus": civilBanner,
  "infrastructure-hub": civilBanner,
  "skyline-residences": civil1,
  "industrial-plant": civil2,
  "mixed-use-development": civil3,
  "urban-infrastructure-project": civil4,
  "premium-commercial-block": civilBanner,
};

type ListProject = {
  id: number | string;
  title: string;
  location: string;
  image: string;
  slug: string;
  filterTag?: string;
  order?: number;
};

function resolveCategorySlug(category: ProjectsPageCategoryItem): string {
  if (category.slug?.trim()) return category.slug.trim();
  const match = category.link?.match(/\/projects\/([^/]+)/);
  return match?.[1] || "";
}

function resolveListBanner(category: ProjectsPageCategoryItem): string {
  const fromDb = category.listBannerImage?.trim()
    ? mediaUrl(category.listBannerImage)
    : "";
  const slug = resolveCategorySlug(category);
  return fromDb || FALLBACK_BANNERS[slug] || corporateBanner;
}

function resolveItemImage(item: ProjectsPageItem): string {
  const fromDb = item.image?.trim() ? mediaUrl(item.image) : "";
  return fromDb || FALLBACK_ITEM_IMAGES[item.slug] || corporateBanner;
}

function findCategoryBySlug(
  categories: ProjectsPageCategoryItem[],
  slug: string,
): ProjectsPageCategoryItem | undefined {
  return categories.find((cat) => resolveCategorySlug(cat) === slug);
}

function HeroSection({ category }: { category: ProjectsPageCategoryItem }) {
  const banner = resolveListBanner(category);
  const breadcrumb =
    category.listBreadcrumb?.trim() || category.title || "Projects";
  const heroTitle = category.listHeroTitle?.trim() || category.title;
  const description = category.listDescription?.trim() || "";

  return (
    <section
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
          w-full
          rounded-[20px]
          md:rounded-[32px]
          shadow-[0_30px_80px_rgba(0,0,0,.12)]
          min-h-[75svh]
          h-[620px]
          sm:h-[650px]
          md:h-[650px]
          lg:h-[650px]
          xl:h-[700px]
        "
      >
        <div className="absolute inset-0 z-0">
          <img
            src={banner}
            alt={heroTitle}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: "brightness(1.15) contrast(1.08) saturate(1.08)",
            }}
          />
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

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute top-0 left-0 right-0 h-[3px] origin-left z-20"
          />
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

          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6"
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
                  {breadcrumb}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 mb-7"
              >
                <div className="w-10 h-px bg-gradient-to-r from-[#F3BB27] to-[#EA7A12]" />

                <span
                  className="text-[#F3BB27] uppercase tracking-[0.18em] sm:tracking-[0.35em] text-[10px] sm:text-xs"
                  style={{ fontFamily: "Parkinsans" }}
                >
                  {breadcrumb}
                </span>
              </motion.div>

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
                <span className="text-white">{heroTitle}</span>

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

              {description ? (
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.7,
                  }}
                  className="mt-8 max-w-md sm:max-w-lg lg:max-w-xl text-[#DDD5CB] text-[14px] sm:text-[15px] lg:text-[16px] leading-7 sm:leading-8"
                  style={{
                    fontFamily: "Parkinsans",
                  }}
                >
                  {description}
                </motion.p>
              ) : null}
            </div>
          </div>

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
  filters,
  activeFilter,
  setActiveFilter,
  sortBy,
  setSortBy,
}: {
  filters: string[];
  activeFilter: string;
  setActiveFilter: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <section className="bg-[#F5F1EA] py-10">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap lg:flex-nowrap gap-3 pt-2 pb-2">
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

function ProjectCard({
  project,
  categorySlug,
}: {
  project: ListProject;
  categorySlug: string;
}) {
  return (
    <Link
      to={`/projects/${categorySlug}/${project.slug}`}
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
          alt={project.title}
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

function ProjectGrid({ projects }: { projects: ListProject[] }) {
  const { category } = useParams();
  const categorySlug = category || "";

  return (
    <section className="bg-[#F5F1EA] pb-16">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
        {projects.length === 0 ? (
          <p
            className="text-center text-[#746C63] py-12"
            style={{ fontFamily: "Parkinsans" }}
          >
            No projects found for this filter.
          </p>
        ) : (
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
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.35 }}
                  key={project.id}
                >
                  <ProjectCard
                    project={project}
                    categorySlug={categorySlug}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

const PAGE_SIZE = 8;

function buildPageNumbers(
  current: number,
  total: number,
): Array<number | "..."> {
  if (total <= 1) return [1];
  if (total <= 6) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const pages: Array<number | "..."> = [1];

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (current < total - 2) pages.push("...");

  pages.push(total);
  return pages;
}

function ProjectPagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = buildPageNumbers(currentPage, totalPages);

  return (
    <section className="bg-[#F5F1EA] pb-24">
      <div className="flex justify-center items-center gap-3">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl border bg-white disabled:opacity-40 flex items-center justify-center"
        >
          <ChevronLeft size={18} />
        </button>

        {pages.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl border bg-white flex items-center justify-center text-[#5A5249]"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl border flex items-center justify-center ${
                currentPage === page
                  ? "bg-[#D89A2B] text-white border-[#D89A2B]"
                  : "bg-white text-[#5A5249]"
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl border bg-white disabled:opacity-40 flex items-center justify-center"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}

function sortProjects(projects: ListProject[], sortBy: string): ListProject[] {
  const rows = [...projects];
  if (sortBy === "Oldest") {
    return rows.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
  if (sortBy === "A-Z") {
    return rows.sort((a, b) => a.title.localeCompare(b.title));
  }
  return rows.sort((a, b) => (b.order ?? 0) - (a.order ?? 0));
}

export default function ProjectList() {
  const { category: categorySlug } = useParams();
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const [sortBy, setSortBy] = useState("Latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<ProjectsPageCategoryItem[]>(
    seedProjectsPageCategories,
  );
  const [items, setItems] = useState<ProjectsPageItem[]>(seedProjectsPageItems);
  const [readySlug, setReadySlug] = useState<string | null>(null);

  const { showLoader, fading } = useCmsPageGate(async (force) => {
    const site = await loadPublicSiteCms(force);

    const nextCategories = (
      (site.projectsPageCategories as ProjectsPageCategoryItem[] | undefined)
        ?.length
        ? (site.projectsPageCategories as ProjectsPageCategoryItem[])
        : await getListContent(
            "projects-page-categories",
            seedProjectsPageCategories,
          )
    ).filter((row) => row.active !== false);

    const nextItems = (
      (site.projectsPageItems as ProjectsPageItem[] | undefined)?.length
        ? (site.projectsPageItems as ProjectsPageItem[])
        : await getListContent("projects-page-items", seedProjectsPageItems)
    ).filter((row) => row.active !== false);

    const rows = nextCategories.length
      ? nextCategories
      : seedProjectsPageCategories;
    setCategories(rows);
    setItems(nextItems.length ? nextItems : seedProjectsPageItems);

    const matched = categorySlug
      ? findCategoryBySlug(rows, categorySlug)
      : undefined;

    if (matched) {
      await preloadImage(resolveListBanner(matched));
    }

    setReadySlug(categorySlug || null);
  });

  const matchedCategory = useMemo(
    () =>
      categorySlug ? findCategoryBySlug(categories, categorySlug) : undefined,
    [categories, categorySlug],
  );

  const categoryProjects = useMemo(() => {
    if (!matchedCategory) return [] as ListProject[];

    return items
      .filter(
        (item) =>
          String(item.categoryId) === String(matchedCategory.id) &&
          item.active !== false,
      )
      .map((item) => ({
        id: item.id,
        title: item.title,
        location: item.location,
        image: resolveItemImage(item),
        slug: item.slug,
        filterTag: item.filterTag,
        order: item.order,
      }));
  }, [items, matchedCategory]);

  const filters = useMemo(() => {
    const fromCategory = matchedCategory?.listFilters?.filter(Boolean) || [];
    if (fromCategory.length) return fromCategory;
    const tags = new Set<string>(["All Projects"]);
    categoryProjects.forEach((item) => {
      if (item.filterTag) tags.add(item.filterTag);
    });
    return [...tags];
  }, [matchedCategory, categoryProjects]);

  useEffect(() => {
    setActiveFilter("All Projects");
    setSortBy("Latest");
    setCurrentPage(1);
  }, [categorySlug]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, sortBy]);

  useEffect(() => {
    if (!filters.includes(activeFilter)) {
      setActiveFilter(filters[0] || "All Projects");
    }
  }, [filters, activeFilter]);

  const filteredProjects = useMemo(() => {
    const filtered =
      activeFilter === "All Projects"
        ? categoryProjects
        : categoryProjects.filter((item) => item.filterTag === activeFilter);
    return sortProjects(filtered, sortBy);
  }, [activeFilter, categoryProjects, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProjects.slice(start, start + PAGE_SIZE);
  }, [filteredProjects, currentPage]);

  if (!categorySlug) {
    return (
      <NotFound
        title="Page not found"
        description="This project category doesn’t exist. Choose a category from the projects page."
      />
    );
  }

  if (!showLoader && readySlug === categorySlug && !matchedCategory) {
    return (
      <NotFound
        title="Page not found"
        description="This project category doesn’t exist. Choose a category from the projects page."
      />
    );
  }

  return (
    <>
      {showLoader && <PageLoader fading={fading} />}
      <Navbar activeNav="projects" />

      <div
        className="w-full overflow-x-hidden"
        style={{ fontFamily: "'Parkinsans', sans-serif" }}
      >
        {matchedCategory ? <HeroSection category={matchedCategory} /> : null}

        {!showLoader && matchedCategory ? (
          <>
            <ProjectFilters
              filters={filters}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            <ProjectGrid projects={paginatedProjects} />

            <ProjectPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : null}
      </div>

      {!showLoader && matchedCategory ? <Footer /> : null}
    </>
  );
}
