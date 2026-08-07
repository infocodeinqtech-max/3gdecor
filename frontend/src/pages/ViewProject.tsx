import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import PageLoader from "../app/components/PageLoader";
import NotFound from "./NotFound";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  ChevronRight,
  X,
  ChevronLeft,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useNavigate, useParams } from "react-router-dom";
import { loadPublicSiteCms } from "../content/publicCms";
import { useCmsPageGate } from "../hooks/useCmsPageGate";
import {
  seedProjectsPageCategories,
  seedProjectsPageItems,
  type ProjectsPageCategoryItem,
  type ProjectsPageItem,
} from "../admin/data/seedContent";
import { getListContent } from "../admin/utils/contentStorage";
import { preloadImage } from "../utils/mediaUrl";
import {
  findCategoryBySlug,
  findProjectBySlug,
  resolveProjectCardImage,
  resolveProjectImages,
  withProjectDetailDefaults,
} from "../utils/projectsCms";
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

function resolveDetailImage(item: ProjectsPageItem, slug?: string): string {
  const fromCms = resolveProjectCardImage(item);
  if (fromCms) return fromCms;
  if (slug && FALLBACK_ITEM_IMAGES[slug]) return FALLBACK_ITEM_IMAGES[slug];
  return office1;
}

type DetailProject = ReturnType<typeof withProjectDetailDefaults> & {
  categorySlug: string;
  categoryLabel: string;
};

function HeroSection({ project }: { project: DetailProject }) {
  if (!project) return null;

  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    const timer = setInterval(() => {
      emblaApi?.scrollNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [emblaApi]);

  const cardImage = resolveDetailImage(project, project.slug);
  const slides = resolveProjectImages(project.heroSlides, cardImage);

  return (
    <section className="bg-[#F5F1EA] px-4 lg:px-5 pt-[72px] lg:pt-[80px]">
      <div className="relative overflow-hidden w-full rounded-[20px] md:rounded-[32px] shadow-[0_30px_80px_rgba(0,0,0,.12)] min-h-[75svh] h-[620px] sm:h-[650px] md:h-[650px] lg:h-[650px] xl:h-[700px]">
        <div className="absolute inset-0 z-0 overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {slides.map((slide, index) => (
              <div key={`${slide}-${index}`} className="relative flex-[0_0_100%] h-full">
                <img
                  src={slide}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  style={{
                    filter: "brightness(.92) contrast(1.05) saturate(1.08)",
                  }}
                />
              </div>
            ))}
          </div>
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(90deg,rgba(0,0,0,.82) 0%,rgba(0,0,0,.75) 18%,rgba(0,0,0,.58) 34%,rgba(0,0,0,.28) 48%,rgba(0,0,0,.08) 60%,rgba(0,0,0,0) 72%),
                linear-gradient(180deg,rgba(0,0,0,.25) 0%,rgba(0,0,0,.08) 18%,rgba(0,0,0,0) 42%,rgba(0,0,0,.12) 100%)
              `,
            }}
          />
        </div>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          onClick={() => navigate(`/projects/${project.categorySlug}`)}
          className="absolute top-10 left-10 z-30 flex items-center gap-3 text-[#F5F1EA] hover:text-[#f3bb27] transition"
        >
          <ArrowLeft size={18} />
          <span className="uppercase tracking-[.25em] text-[11px]">
            Back to Projects
          </span>
        </motion.button>

        <div className="relative z-20 max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-16 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-24 sm:pb-28 lg:pb-32 flex flex-col justify-end h-full">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex flex-wrap items-center gap-2 mb-8"
          >
            <button
              onClick={() => navigate("/")}
              className="text-[#F5F1EA]/55 hover:text-[#F3BB27] text-[11px] uppercase tracking-[0.22em]"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-[#F3BB27]/35" />
            <button
              onClick={() => navigate("/projects")}
              className="text-[#F5F1EA]/55 hover:text-[#F3BB27] text-[11px] uppercase tracking-[0.22em]"
            >
              Projects
            </button>
            <ChevronRight className="w-3 h-3 text-[#F3BB27]/35" />
            <button
              onClick={() => navigate(`/projects/${project.categorySlug}`)}
              className="text-[#F3BB27] hover:text-[#F8C24A] text-[11px] uppercase tracking-[0.22em]"
            >
              {project.categoryLabel}
            </button>
            <ChevronRight className="w-3 h-3 text-[#F3BB27]/35" />
            <span className="text-[#F5F1EA]/85 text-[11px] uppercase tracking-[0.22em]">
              {project.title}
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.45 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              letterSpacing: "-0.03em",
            }}
            className="max-w-4xl text-[#F5F1EA] text-[44px] sm:text-[56px] md:text-[64px] lg:text-[70px] leading-[0.95]"
          >
            {project.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="flex items-center gap-3 mt-10"
          >
            <MapPin size={18} className="text-[#f3bb27]" />
            <span className="text-[#E9E5DF] text-sm sm:text-base lg:text-lg">
              {project.location}
            </span>
          </motion.div>

          {project.heroTagline ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="mt-6 text-white/85 text-[15px] sm:text-[16px] lg:text-[18px] leading-7 lg:leading-8 max-w-[520px]"
            >
              {project.heroTagline}
            </motion.p>
          ) : null}

          {project.statusLabel ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-4 mt-10"
            >
              <div className="w-10 h-[1px] bg-[#D8A042]" />
              <span className="uppercase text-[11px] tracking-[.28em] text-[#f3bb27]">
                {project.statusLabel}
              </span>
            </motion.div>
          ) : null}
        </div>

        {slides.length > 1 ? (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.05 }}
            className="absolute bottom-8 right-8 z-30 flex gap-4"
          >
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="w-16 h-16 rounded-full border border-white/15 bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-[#f3bb27] hover:border-[#f3bb27] transition-all duration-300"
            >
              <ArrowLeft size={18} className="text-white" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="w-16 h-16 rounded-full border border-white/15 bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-[#f3bb27] hover:border-[#f3bb27] transition-all duration-300"
            >
              <ArrowRight size={18} className="text-white" />
            </button>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

function AboutProjectSection({ project }: { project: DetailProject }) {
  if (!project) return null;

  const cardImage = resolveDetailImage(project, project.slug);
  const aboutImage = project.aboutImage?.trim()
    ? resolveProjectImages([project.aboutImage], cardImage)[0]
    : cardImage;

  return (
    <section className="bg-[#F5F1EA] py-20 sm:py-24 lg:py-32">
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-7">
              <div className="w-12 h-px bg-gradient-to-r from-[#F3BB27] to-[#EA7A12]" />
              <span className="uppercase tracking-[0.30em] text-[10px] sm:text-xs text-[#D49A2D]">
                ABOUT THE PROJECT
              </span>
            </div>

            <h2
              className="text-[#2A231D] whitespace-pre-line"
              style={{
                fontFamily: "Cormorant Garamond",
                fontWeight: 500,
                fontSize: "clamp(38px,5vw,60px)",
                lineHeight: ".95",
              }}
            >
              {project.aboutTitle || project.title}
            </h2>

            {project.aboutDescription ? (
              <p className="mt-8 max-w-[560px] text-[#6C655F] text-[15px] sm:text-[16px] lg:text-[17px] leading-8">
                {project.aboutDescription}
              </p>
            ) : null}

            {project.aboutFeatures?.length ? (
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {project.aboutFeatures.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D49A2D]" />
                    <span className="text-[#2A231D]">{item}</span>
                  </div>
                ))}
              </div>
            ) : null}

            {(project.statCompleted || project.statArea || project.statDuration) && (
              <div className="mt-14 grid grid-cols-3 gap-6 pt-8 border-t border-[#E5DDD3]">
                {project.statCompleted ? (
                  <div>
                    <p className="uppercase tracking-[0.25em] text-[10px] text-[#B98A2D]">
                      Completed
                    </p>
                    <h3
                      className="mt-2 text-[#2A231D]"
                      style={{ fontFamily: "Cormorant Garamond", fontSize: "34px" }}
                    >
                      {project.statCompleted}
                    </h3>
                  </div>
                ) : null}
                {project.statArea ? (
                  <div>
                    <p className="uppercase tracking-[0.25em] text-[10px] text-[#B98A2D]">
                      Area
                    </p>
                    <h3
                      className="mt-2 text-[#2A231D]"
                      style={{ fontFamily: "Cormorant Garamond", fontSize: "34px" }}
                    >
                      {project.statArea}
                    </h3>
                  </div>
                ) : null}
                {project.statDuration ? (
                  <div>
                    <p className="uppercase tracking-[0.25em] text-[10px] text-[#B98A2D]">
                      Duration
                    </p>
                    <h3
                      className="mt-2 text-[#2A231D]"
                      style={{ fontFamily: "Cormorant Garamond", fontSize: "34px" }}
                    >
                      {project.statDuration}
                    </h3>
                  </div>
                ) : null}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="overflow-hidden rounded-[30px] shadow-[0_25px_70px_rgba(0,0,0,.10)]">
              <img
                src={aboutImage}
                alt={project.title}
                className="w-full h-[360px] sm:h-[500px] md:h-[560px] lg:h-[620px] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectGallerySection({
  project,
  images,
  onOpenGallery,
}: {
  project: DetailProject;
  images: string[];
  onOpenGallery: (index: number) => void;
}) {
  if (!project || !images.length) return null;

  const displayImages = [...images, ...images].slice(0, 3);

  return (
    <section id="gallery" className="bg-[#F5F1EA] py-20 sm:py-24 lg:py-32">
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="flex justify-center items-center gap-4 mb-5">
            <div className="w-12 h-px bg-gradient-to-r from-[#F3BB27] to-[#EA7A12]" />
            <span className="uppercase tracking-[0.32em] text-[10px] sm:text-xs text-[#D49A2D]">
              {project.galleryEyebrow}
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-[#EA7A12] to-[#F3BB27]" />
          </div>

          <h2
            className="text-[#2A231D]"
            style={{
              fontFamily: "Cormorant Garamond",
              fontWeight: 500,
              fontSize: "clamp(38px,5vw,58px)",
              lineHeight: ".95",
            }}
          >
            {project.galleryTitle}
          </h2>

          {project.galleryDescription ? (
            <p className="mt-6 text-[#6C655F] text-[15px] sm:text-[16px] leading-8">
              {project.galleryDescription}
            </p>
          ) : null}
        </motion.div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -6 }}
            onClick={() => onOpenGallery(0)}
            className="overflow-hidden rounded-[28px] cursor-pointer"
          >
            <img
              src={displayImages[0]}
              alt=""
              className="w-full h-[260px] sm:h-[420px] lg:h-[700px] object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>

          <div className="lg:col-span-2 grid gap-6">
            {[displayImages[1], displayImages[2]].map((image, index) => (
              <motion.div
                key={`${image}-${index}`}
                whileHover={{ y: -6 }}
                onClick={() => onOpenGallery(index + 1)}
                className="overflow-hidden rounded-[28px] cursor-pointer"
              >
                <img
                  src={image}
                  alt=""
                  className="w-full h-[260px] sm:h-[300px] lg:h-[340px] object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-14">
          <button
            onClick={() => onOpenGallery(0)}
            className="px-8 py-4 rounded-full border border-[#D49A2D] text-[#D49A2D] hover:bg-[#D49A2D] hover:text-white transition-all duration-300"
          >
            View All Photos
          </button>
        </div>
      </div>
    </section>
  );
}

function GalleryLightbox({
  open,
  images,
  activeImage,
  setActiveImage,
  onClose,
}: {
  open: boolean;
  images: string[];
  activeImage: number;
  setActiveImage: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
}) {
  if (!open || !images.length) return null;

  const prev = () =>
    setActiveImage((activeImage - 1 + images.length) % images.length);
  const next = () => setActiveImage((activeImage + 1) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-[#0B0908]/95 backdrop-blur-md flex flex-col"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 lg:top-8 lg:right-8 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#D49A2D] transition-all duration-300"
      >
        <X size={30} />
      </button>

      <div className="relative flex-1 flex items-center justify-center px-4 sm:px-8 pt-20 pb-4">
        <div className="relative">
          <div className="overflow-hidden rounded-[18px] sm:rounded-[24px] lg:rounded-[30px] shadow-[0_25px_80px_rgba(0,0,0,.45)] max-w-[1400px] w-full">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              src={images[activeImage]}
              className="w-full h-auto max-h-[72vh] sm:max-h-[78vh] lg:max-h-[82vh] object-cover block"
            />
          </div>

          <button
            onClick={prev}
            className="absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#D49A2D] transition-all"
          >
            <ChevronLeft size={28} className="text-white" />
          </button>

          <button
            onClick={next}
            className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#D49A2D] transition-all"
          >
            <ChevronRight size={28} className="text-white" />
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-2 sm:gap-3 overflow-auto px-6 pb-5">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            onClick={() => setActiveImage(index)}
            className={`overflow-hidden rounded-xl border-2 ${
              activeImage === index ? "border-[#D49A2D]" : "border-transparent"
            }`}
          >
            <img
              src={image}
              alt=""
              className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-cover"
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default function ViewProject() {
  const { category: categorySlug, slug } = useParams();
  const [categories, setCategories] = useState<ProjectsPageCategoryItem[]>(
    seedProjectsPageCategories,
  );
  const [items, setItems] = useState<ProjectsPageItem[]>(seedProjectsPageItems);
  const [readyKey, setReadyKey] = useState("");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

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

    const category = categorySlug
      ? findCategoryBySlug(rows, categorySlug)
      : undefined;
    const item =
      category && slug
        ? findProjectBySlug(
            nextItems.length ? nextItems : seedProjectsPageItems,
            category.id,
            slug,
          )
        : undefined;

    if (item) {
      const normalized = withProjectDetailDefaults(item);
      const cardImage = resolveDetailImage(normalized, normalized.slug);
      const heroSlides = resolveProjectImages(normalized.heroSlides, cardImage);
      if (heroSlides[0]) await preloadImage(heroSlides[0]);
    }

    setReadyKey(`${categorySlug || ""}/${slug || ""}`);
  });

  const project = useMemo((): DetailProject | null => {
    if (!categorySlug || !slug) return null;
    const category = findCategoryBySlug(categories, categorySlug);
    if (!category) return null;
    const item = findProjectBySlug(items, category.id, slug);
    if (!item) return null;

    return {
      ...withProjectDetailDefaults(item),
      categorySlug,
      categoryLabel: category.listBreadcrumb || category.title,
    };
  }, [categories, items, categorySlug, slug]);

  const galleryImages = useMemo(() => {
    if (!project) return [] as string[];
    const cardImage = resolveDetailImage(project, project.slug);
    return resolveProjectImages(project.galleryImages, cardImage);
  }, [project]);

  if (!categorySlug || !slug) {
    return (
      <NotFound
        title="Page not found"
        description="This project page doesn’t exist."
      />
    );
  }

  if (!showLoader && readyKey === `${categorySlug}/${slug}` && !project) {
    return (
      <NotFound
        title="Page not found"
        description="This project page doesn’t exist."
      />
    );
  }

  const isReady =
    !showLoader &&
    readyKey === `${categorySlug}/${slug}` &&
    project != null;

  return (
    <>
      {showLoader && <PageLoader fading={fading} />}
      <Navbar activeNav="projects" />

      <div
        className="w-full overflow-x-hidden"
        style={{ fontFamily: "'Parkinsans', sans-serif" }}
      >
        {isReady && project ? (
          <>
            <HeroSection project={project} />
            <AboutProjectSection project={project} />
            <ProjectGallerySection
              project={project}
              images={galleryImages}
              onOpenGallery={(index) => {
                setActiveImage(index);
                setGalleryOpen(true);
              }}
            />
            <GalleryLightbox
              open={galleryOpen}
              images={galleryImages}
              activeImage={activeImage}
              setActiveImage={setActiveImage}
              onClose={() => setGalleryOpen(false)}
            />
          </>
        ) : null}
      </div>

      {isReady && project ? <Footer /> : null}
    </>
  );
}
