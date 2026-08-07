import { useState } from "react";
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
  type LucideIcon,
} from "lucide-react";
import projectBanner from "../assets/images/project-banner.png";
import corporateCategory from "../assets/images/project-category-corporate.png";
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
import FeaturedProjects from "../app/components/FeaturedProjects";
import {
  seedProjectsPage,
  seedProjectsPageCategories,
  seedProjectsPageItems,
  seedHero,
  type HeroContent,
  type HeroStat,
  type ProjectsPageCategoryItem,
  type ProjectsPageContent,
  type ProjectsPageItem,
} from "../admin/data/seedContent";
import { getContent, getListContent } from "../admin/utils/contentStorage";
import {
  resolveCategorySlug,
} from "../utils/projectsCms";
import { mediaUrl, preloadImage } from "../utils/mediaUrl";

const ICON_MAP: Record<string, LucideIcon> = {
  Briefcase,
  Building2,
  Award,
  Building,
  Landmark,
};

const FALLBACK_CATEGORY_IMAGES = [corporateCategory, corporateCategory];
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
  "commercial-tower": civil4,
  "institutional-campus": civil3,
  "infrastructure-hub": civil2,
  "skyline-residences": civil1,
  "industrial-plant": civil2,
  "mixed-use-development": civil3,
  "urban-infrastructure-project": civil4,
  "premium-commercial-block": civil4,
};

function resolveProjectsBanner(content: ProjectsPageContent): string {
  return content.bannerImage?.trim()
    ? mediaUrl(content.bannerImage) || projectBanner
    : projectBanner;
}

function parseTags(tags: string | string[] | undefined): string[] {
  if (Array.isArray(tags)) return tags.map(String).filter(Boolean);
  return String(tags || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function resolveCategoryImage(
  item: ProjectsPageCategoryItem,
  index: number,
): string {
  const fromDb = item.image?.trim() ? mediaUrl(item.image) : "";
  return fromDb || FALLBACK_CATEGORY_IMAGES[index % FALLBACK_CATEGORY_IMAGES.length];
}

function resolveItemImage(item: ProjectsPageItem): string {
  const fromDb = item.image?.trim() ? mediaUrl(item.image) : "";
  return fromDb || FALLBACK_ITEM_IMAGES[item.slug] || office1;
}

const STAT_ICONS = [Briefcase, Building2, Award] as const;

function heroStatsFromSite(
  site: { hero?: Record<string, unknown> | null } | null | undefined,
): HeroStat[] {
  if (site?.hero && typeof site.hero === "object") {
    const hero = { ...seedHero, ...(site.hero as HeroContent) };
    if (Array.isArray(hero.stats) && hero.stats.length) {
      return hero.stats;
    }
  }
  return seedHero.stats;
}

function HeroSection({
  content,
  stats,
}: {
  content: ProjectsPageContent;
  stats: HeroStat[];
}) {
  const bannerImage = resolveProjectsBanner(content);

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
          rounded-[20px] md:rounded-[32px]
          w-full
          min-h-[70svh]
          h-auto
          lg:min-h-[760px]
          "
      >
        <div className="absolute inset-0 z-0">
          <img
            src={bannerImage}
            alt="3G Decorative Group projects"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: "brightness(1.45) contrast(1.08) saturate(1.1)",
            }}
          />
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

        {/* <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 right-0 h-[3px] origin-left z-30"
          style={{
            background: "linear-gradient(90deg,#f3bb27,#ea7a12,#f3bb27)",
          }}
        /> */}

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
              {content.heroEyebrow}
            </span>
          </motion.div>

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
                <span className="text-[#F5F1EA]">{content.heroTitlePrefix}</span>
                <span
                  style={{
                    background: "linear-gradient(90deg,#f3bb27,#ea7a12)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {content.heroTitleHighlight}
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
            {content.heroDescription1}
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
            {content.heroDescription2}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap gap-14 mt-16"
          >
            {stats.map((item, index) => {
                const Icon = STAT_ICONS[index % STAT_ICONS.length];

                return (
                  <div key={item.id ?? index} className="flex items-center gap-5">
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
                        {item.label}
                      </p>
                    </div>
                  </div>
                );
              })}
          </motion.div>

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

function ProjectCategories({
  content,
  categories,
}: {
  content: ProjectsPageContent;
  categories: ProjectsPageCategoryItem[];
}) {
  const navigate = useNavigate();
  const rows = categories.length ? categories : seedProjectsPageCategories;

  return (
    <section className="bg-[#F5F1EA] py-20 lg:py-28">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="uppercase tracking-[.28em] text-[#D49A2D] text-xs font-semibold">
            {content.categoriesEyebrow}
          </span>

          <h2
            className="mt-5 text-[#2A231D]"
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: "clamp(42px,5vw,68px)",
              lineHeight: 1.1,
            }}
          >
            {content.categoriesTitleLine1}
            <br className="sm:hidden" />
            {content.categoriesTitleLine2}
          </h2>

          <p
            className="mx-auto mt-6 max-w-2xl text-[#7C756F]"
            style={{
              fontFamily: "Parkinsans",
              lineHeight: 1.8,
            }}
          >
            {content.categoriesDescription}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {rows.map((item, index) => {
            const Icon = ICON_MAP[item.icon] || Building2;
            const tags = parseTags(item.tags);
            const image = resolveCategoryImage(item, index);

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
                onClick={() => navigate(item.link || "/projects")}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-[22px] h-[430px] xl:h-[450px]">
                  <img
                    src={image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    style={{
                      filter: "brightness(1.12) contrast(1.05) saturate(1.05)",
                    }}
                  />

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

                  <div className="absolute inset-0 flex flex-col justify-between">
                    <div className="p-7 md:p-9 lg:p-10">
                      <div
                        className="
                          w-16 h-16 rounded-full border border-[#D49A2D]
                          bg-black/20 backdrop-blur-md
                          flex items-center justify-center
                          "
                      >
                        <Icon
                          className="w-8 h-8 text-[#D49A2D]"
                          strokeWidth={1.4}
                        />
                      </div>
                    </div>

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
                        {tags.map((tag, tagIndex) => (
                          <span
                            key={tag}
                            className="text-[#E6E0D8] text-[15px]"
                          >
                            {tag}
                            {tagIndex !== tags.length - 1 && (
                              <span className="mx-3 text-[#D49A2D]">•</span>
                            )}
                          </span>
                        ))}
                      </div>

                      <button
                        className="
                          mt-8 flex items-center gap-3
                          text-[#D49A2D] font-medium
                          group-hover:gap-5 transition-all
                          "
                      >
                        {item.button || "View Projects"}
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
  const [pageContent, setPageContent] =
    useState<ProjectsPageContent>(seedProjectsPage);
  const [heroContent, setHeroContent] =
    useState<ProjectsPageContent>(seedProjectsPage);
  const [heroStats, setHeroStats] = useState<HeroStat[]>(seedHero.stats);
  const [categories, setCategories] = useState<ProjectsPageCategoryItem[]>(
    seedProjectsPageCategories,
  );
  const [items, setItems] = useState<ProjectsPageItem[]>(seedProjectsPageItems);

  const { showLoader, fading } = useCmsPageGate(async (force) => {
    const site = await loadPublicSiteCms(force);

    let nextPage: ProjectsPageContent;
    if (site.projectsPage && typeof site.projectsPage === "object") {
      nextPage = {
        ...seedProjectsPage,
        ...(site.projectsPage as ProjectsPageContent),
      };
    } else {
      nextPage = await getContent<ProjectsPageContent>(
        "projects-page",
        seedProjectsPage,
      );
    }

    await preloadImage(resolveProjectsBanner(nextPage));
    setPageContent(nextPage);
    setHeroContent(nextPage);
    setHeroStats(heroStatsFromSite(site));

    const nextCategories = (
      (site.projectsPageCategories as ProjectsPageCategoryItem[] | undefined)
        ?.length
        ? (site.projectsPageCategories as ProjectsPageCategoryItem[])
        : await getListContent(
            "projects-page-categories",
            seedProjectsPageCategories,
          )
    ).filter((row) => row.active !== false);
    setCategories(nextCategories.length ? nextCategories : seedProjectsPageCategories);

    const nextItems = (
      (site.projectsPageItems as ProjectsPageItem[] | undefined)?.length
        ? (site.projectsPageItems as ProjectsPageItem[])
        : await getListContent("projects-page-items", seedProjectsPageItems)
    ).filter((row) => row.active !== false);
    setItems(nextItems.length ? nextItems : seedProjectsPageItems);
  });

  const sortedCategories = [...categories].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  const projectsForCategory = (categoryId: number | string) =>
    items
      .filter((p) => String(p.categoryId) === String(categoryId))
      .map((p) => ({
        id: Number(p.id) || 0,
        title: p.title,
        location: p.location,
        image: resolveItemImage(p),
        slug: p.slug,
      }));

  return (
    <>
      {showLoader && <PageLoader fading={fading} />}
      <Navbar activeNav="projects" />

      <div
        className="w-full overflow-x-hidden"
        style={{ fontFamily: "'Parkinsans', sans-serif" }}
      >
        <HeroSection content={heroContent} stats={heroStats} />

        {!showLoader && (
          <>
            <ProjectCategories
              content={pageContent}
              categories={categories}
            />

            {sortedCategories.map((category) => {
              const categoryProjects = projectsForCategory(category.id);
              const fallbackSeed = seedProjectsPageItems.filter(
                (p) => String(p.categoryId) === String(category.id),
              );

              return (
                <FeaturedProjects
                  key={category.id}
                  subtitle={category.sectionSubtitle || ""}
                  title={category.sectionTitle || "Featured Projects"}
                  description={category.sectionDescription || ""}
                  button={`View All ${category.title} Projects`}
                  viewAllLink={category.link || "/projects"}
                  projects={
                    categoryProjects.length
                      ? categoryProjects.map((p) => ({
                          ...p,
                          categorySlug: resolveCategorySlug(category),
                        }))
                      : fallbackSeed.map((p) => ({
                          id: Number(p.id),
                          title: p.title,
                          location: p.location,
                          image: resolveItemImage(p),
                          slug: p.slug,
                          categorySlug: resolveCategorySlug(category),
                        }))
                  }
                />
              );
            })}
          </>
        )}
      </div>

      {!showLoader && <Footer />}
    </>
  );
}
