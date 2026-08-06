import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";

import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  ChevronRight,
  X,
  ChevronLeft,
} from "lucide-react";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { useNavigate, useParams } from "react-router-dom";
import techMahindraBanner from "../assets/images/tech-mahindra-office.jpeg";
import techMahindraBanner2 from "../assets/images/tech-mahindra-banner.png";
import creativeBanner from "../assets/images/creative-studio-workspace.jpeg";
import diningArea from "../assets/images/executive-dining-space.jpeg";

const heroSlides = [
  {
    image: techMahindraBanner,
    title: "Tech Mahindra Headquarters",
    location: "Kolkata, India",
  },
  {
    image: techMahindraBanner2,
    title: "Tech Mahindra Office",
    location: "Kolkata, India",
  },
];

function HeroSection({
  project,
}: {
  project: {
    title: string;
    category: string;
    location: string;
    heroImage: string;
    current: number;
    total: number;
  };
}) {
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });
  useEffect(() => {
    const timer = setInterval(() => {
      emblaApi?.scrollNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [emblaApi]);

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
        {/* Background */}
        <div className="absolute inset-0 z-0 overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {heroSlides.map((slide, index) => (
              <div key={index} className="relative flex-[0_0_100%] h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  style={{
                    filter: "brightness(.92) contrast(1.05) saturate(1.08)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Luxury Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(
                  90deg,
                  rgba(0,0,0,.82) 0%,
                  rgba(0,0,0,.75) 18%,
                  rgba(0,0,0,.58) 34%,
                  rgba(0,0,0,.28) 48%,
                  rgba(0,0,0,.08) 60%,
                  rgba(0,0,0,0) 72%
                ),

                linear-gradient(
                  180deg,
                  rgba(0,0,0,.25) 0%,
                  rgba(0,0,0,.08) 18%,
                  rgba(0,0,0,0) 42%,
                  rgba(0,0,0,.12) 100%
                )
              `,
            }}
          />
        </div>

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,185,70,.08), transparent 45%)",
            mixBlendMode: "soft-light",
          }}
        />

        {/* Gold Top Line */}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute top-0 left-0 right-0 h-[3px] origin-left z-30"
          // style={{
          //   background: "linear-gradient(90deg,#f3bb27,#ea7a12,#f3bb27)",
          // }}
        />

        {/* Ambient Gold Glow */}

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="absolute left-0 bottom-0 w-[650px] h-[650px] rounded-full z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle,rgba(243,187,39,.03),transparent 70%)",
            filter: "blur(90px)",
          }}
        />

        {/* Back Button */}

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          onClick={() => navigate("/projects")}
          className="
            absolute
            top-10
            left-10
            z-30
            flex
            items-center
            gap-3
            text-[#F5F1EA]
            hover:text-[#f3bb27]
            transition
          "
        >
          <ArrowLeft size={18} />

          <span
            className="
            uppercase
            tracking-[.25em]
            text-[11px]
          "
          >
            Back to Projects
          </span>
        </motion.button>

        {/* Main Content */}

        <div
          className="
            relative
            z-20
            max-w-[1600px]
            mx-auto

            px-5
            sm:px-8
            lg:px-14
            xl:px-16

            pt-28
            sm:pt-32
            md:pt-36
            lg:pt-40

            pb-24
            sm:pb-28
            lg:pb-32

            flex
            flex-col
            justify-end
            h-full
            "
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            height: "100%",
          }}
        >
          {/* Breadcrumb */}

          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="
            hidden
            md:flex
            flex-wrap
            items-center
            gap-2
            mb-8
          "
          >
            <button
              onClick={() => navigate("/")}
              className="
              text-[#F5F1EA]/55
              hover:text-[#F3BB27]
              text-[11px]
              uppercase
              tracking-[0.22em]
              transition-colors
            "
              style={{ fontFamily: "Parkinsans" }}
            >
              Home
            </button>

            <ChevronRight className="w-3 h-3 text-[#F3BB27]/35" />

            <button
              onClick={() => navigate("/projects")}
              className="
                text-[#F5F1EA]/55
                hover:text-[#F3BB27]
                text-[11px]
                uppercase
                tracking-[0.22em]
                transition-colors
              "
              style={{ fontFamily: "Parkinsans" }}
            >
              Projects
            </button>

            <ChevronRight className="w-3 h-3 text-[#F3BB27]/35" />

            <button
              onClick={() =>
                navigate(
                  `/projects/${project.category.toLowerCase().replace(/\s+/g, "-")}`,
                )
              }
              className="
              text-[#F3BB27]
              hover:text-[#F8C24A]
              text-[11px]
              uppercase
              tracking-[0.22em]
              transition-colors
            "
              style={{ fontFamily: "Parkinsans" }}
            >
              {project.category}
            </button>

            <ChevronRight className="w-3 h-3 text-[#F3BB27]/35" />

            <span
              className="
                text-[#F5F1EA]/85
                text-[11px]
                uppercase
                tracking-[0.22em]
              "
              style={{ fontFamily: "Parkinsans" }}
            >
              {project.title}
            </span>
          </motion.div>

          {/* Title */}

          <motion.h1
            initial={{
              y: 60,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.45,
            }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              letterSpacing: "-0.03em",
            }}
            className="max-w-4xl text-[#F5F1EA] text-[44px]
              sm:text-[56px]
              md:text-[64px]
              lg:text-[70px]
              leading-[0.95]"
          >
            {project.title}
          </motion.h1>

          {/* Location */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.75,
            }}
            className="flex items-center gap-3 mt-10"
          >
            <MapPin size={18} className="text-[#f3bb27]" />

            <span className="text-[#E9E5DF] text-sm sm:text-base lg:text-lg">
              {project.location}
            </span>
          </motion.div>
          {/* Premium Bottom Line */}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="
            mt-6
            text-white/85

            text-[15px]
            sm:text-[16px]
            lg:text-[18px]

            leading-7
            lg:leading-8

            max-w-[320px]
            sm:max-w-[420px]
            md:max-w-[480px]
            lg:max-w-[520px]
          "
          >
            A future-ready workspace crafted to inspire collaboration,
            creativity, and productivity while reflecting the brand's innovative
            spirit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-4 mt-10"
          >
            <div className="w-10 h-[1px] bg-[#D8A042]" />

            <span className="uppercase text-[11px] tracking-[.28em] text-[#f3bb27]">
              Completed Project
            </span>
          </motion.div>
        </div>

        {/* Navigation */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.05 }}
          className="
            absolute
            bottom-8
            right-8
            z-30
            flex
            gap-4
          "
        >
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="
              w-16
              h-16
              rounded-full
              border
              border-white/15
              bg-white/10
              backdrop-blur-xl
              flex
              items-center
              justify-center
              hover:bg-[#f3bb27]
              hover:border-[#f3bb27]
              transition-all
              duration-300
            "
          >
            <ArrowLeft size={18} className="text-white" />
          </button>

          <button
            onClick={() => emblaApi?.scrollNext()}
            className="
              w-16
              h-16
              rounded-full
              border
              border-white/15
              bg-white/10
              backdrop-blur-xl
              flex
              items-center
              justify-center
              hover:bg-[#f3bb27]
              hover:border-[#f3bb27]
              transition-all
              duration-300
            "
          >
            <ArrowRight size={18} className="text-white" />
          </button>
        </motion.div>

        {/* Decorative Border */}

        <div
          className="absolute inset-0 rounded-[32px] pointer-events-none"
          style={{
            border: "1px solid rgba(255,255,255,.06)",
          }}
        />
      </div>
    </section>
  );
}

function AboutProjectSection() {
  return (
    <section className="bg-[#F5F1EA] py-20 sm:py-24 lg:py-32">
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Heading Label */}

            <div className="flex items-center gap-4 mb-7">
              <div className="w-12 h-px bg-gradient-to-r from-[#F3BB27] to-[#EA7A12]" />

              <span
                className="
                  uppercase
                  tracking-[0.30em]
                  text-[10px]
                  sm:text-xs
                  text-[#D49A2D]
                "
                style={{
                  fontFamily: "Parkinsans",
                }}
              >
                ABOUT THE PROJECT
              </span>
            </div>

            {/* Title */}

            <h2
              className="text-[#2A231D]"
              style={{
                fontFamily: "Cormorant Garamond",
                fontWeight: 500,
                fontSize: "clamp(38px,5vw,60px)",
                lineHeight: ".95",
              }}
            >
              Tech Mahindra
              <br />
              Headquarters
            </h2>

            {/* Description */}

            <p
              className="
                mt-8
                max-w-[560px]

                text-[#6C655F]

                text-[15px]
                sm:text-[16px]
                lg:text-[17px]

                leading-8
              "
              style={{
                fontFamily: "Parkinsans",
              }}
            >
              Designed as a future-ready workplace, the Tech Mahindra
              Headquarters seamlessly blends modern aesthetics with
              functionality. Every workspace has been thoughtfully planned to
              encourage collaboration, innovation and employee wellbeing while
              maintaining a timeless corporate identity.
            </p>

            {/* Feature List */}

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                "Premium Corporate Workspace",
                "Collaborative Open Office",
                "Sustainable Interior Design",
                "Luxury Material Palette",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D49A2D]" />

                  <span
                    className="text-[#2A231D]"
                    style={{
                      fontFamily: "Parkinsans",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Statistics */}

            <div
              className="
                mt-14

                grid

                grid-cols-3

                gap-6

                pt-8

                border-t

                border-[#E5DDD3]
              "
            >
              <div>
                <p
                  className="
                    uppercase
                    tracking-[0.25em]
                    text-[10px]
                    text-[#B98A2D]
                  "
                  style={{
                    fontFamily: "Parkinsans",
                  }}
                >
                  Completed
                </p>

                <h3
                  className="mt-2 text-[#2A231D]"
                  style={{
                    fontFamily: "Cormorant Garamond",
                    fontSize: "34px",
                  }}
                >
                  2025
                </h3>
              </div>

              <div>
                <p
                  className="
                    uppercase
                    tracking-[0.25em]
                    text-[10px]
                    text-[#B98A2D]
                  "
                  style={{
                    fontFamily: "Parkinsans",
                  }}
                >
                  Area
                </p>

                <h3
                  className="mt-2 text-[#2A231D]"
                  style={{
                    fontFamily: "Cormorant Garamond",
                    fontSize: "34px",
                  }}
                >
                  12.5K
                </h3>
              </div>

              <div>
                <p
                  className="
                    uppercase
                    tracking-[0.25em]
                    text-[10px]
                    text-[#B98A2D]
                  "
                  style={{
                    fontFamily: "Parkinsans",
                  }}
                >
                  Duration
                </p>

                <h3
                  className="mt-2 text-[#2A231D]"
                  style={{
                    fontFamily: "Cormorant Garamond",
                    fontSize: "34px",
                  }}
                >
                  8 Mo
                </h3>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="
                overflow-hidden

                rounded-[30px]

                shadow-[0_25px_70px_rgba(0,0,0,.10)]
              "
            >
              <img
                src={creativeBanner}
                alt="Project"
                className="
                  w-full

                  h-[360px]
                  sm:h-[500px]
                  md:h-[560px]
                  lg:h-[620px]

                  object-cover

                  transition-transform
                  duration-700

                  hover:scale-105
                "
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectGallerySection({
  images,
  onOpenGallery,
}: {
  images: string[];
  onOpenGallery: (index: number) => void;
}) {
  return (
    <section id="gallery" className="bg-[#F5F1EA] py-20 sm:py-24 lg:py-32">
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 xl:px-20">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="flex justify-center items-center gap-4 mb-5">
            <div className="w-12 h-px bg-gradient-to-r from-[#F3BB27] to-[#EA7A12]" />

            <span
              className="
                uppercase
                tracking-[0.32em]
                text-[10px]
                sm:text-xs
                text-[#D49A2D]
              "
              style={{
                fontFamily: "Parkinsans",
              }}
            >
              Project Gallery
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
            A Visual Journey
          </h2>

          <p
            className="
              mt-6
              text-[#6C655F]
              text-[15px]
              sm:text-[16px]
              leading-8
            "
            style={{
              fontFamily: "Parkinsans",
            }}
          >
            Every corner reflects our dedication to timeless design,
            functionality and refined craftsmanship.
          </p>
        </motion.div>

        {/* Gallery */}

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left */}

          <motion.div
            whileHover={{ y: -6 }}
            onClick={() => onOpenGallery(0)}
            className="
              overflow-hidden
              rounded-[28px]
              cursor-pointer
            "
          >
            <img
              src={images[0]}
              className="
                w-full
                h-[260px]
                sm:h-[420px]
                lg:h-[700px]
                object-cover
                transition-transform
                duration-700
                hover:scale-105
              "
            />
          </motion.div>

          {/* Right */}

          <div className="lg:col-span-2 grid gap-6">
            <motion.div
              whileHover={{ y: -6 }}
              className="overflow-hidden rounded-[28px]"
            >
              <img
                src={images[1]}
                className="
                  w-full
                  h-[260px]
                  sm:h-[300px]
                  lg:h-[340px]
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-105
                "
              />
            </motion.div>

            <motion.div
              whileHover={{ y: -6 }}
              className="overflow-hidden rounded-[28px]"
            >
              <img
                src={images[2]}
                className="
                  w-full
                  h-[260px]
                  sm:h-[300px]
                  lg:h-[340px]
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-105
                "
              />
            </motion.div>
          </div>
        </div>

        {/* Button */}

        <div className="flex justify-center mt-14">
          <button
            onClick={() => onOpenGallery(0)}
            className="
              px-8
              py-4

              rounded-full

              border
              border-[#D49A2D]

              text-[#D49A2D]

              hover:bg-[#D49A2D]
              hover:text-white

              transition-all
              duration-300
            "
            style={{
              fontFamily: "Parkinsans",
            }}
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
  if (!open) return null;

  const prev = () =>
    setActiveImage((activeImage - 1 + images.length) % images.length);

  const next = () => setActiveImage((activeImage + 1) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        fixed
        inset-0
        z-[9999]

        bg-[#0B0908]/95 backdrop-blur-md

        flex
        flex-col
      "
    >
      {/* Close */}

      <button
        onClick={onClose}
        className="
          absolute
          top-6
          right-6
          lg:top-8
          lg:right-8

          z-50

          w-12
          h-12

          rounded-full

          bg-white/10
          backdrop-blur-md

          border
          border-white/10

          flex
          items-center
          justify-center

          text-white

          hover:bg-[#D49A2D]
          transition-all
          duration-300
        "
      >
        <X size={30} />
      </button>

      {/* Image */}

      <div className="relative flex-1 flex items-center justify-center px-4 sm:px-8 pt-20 pb-4">
        <div className="relative">
          <div
            className="
            overflow-hidden

            rounded-[18px]
            sm:rounded-[24px]
            lg:rounded-[30px]

            shadow-[0_25px_80px_rgba(0,0,0,.45)]

            max-w-[1400px]
            w-full
          "
          >
            <motion.img
              key={activeImage}
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.35,
              }}
              src={images[activeImage]}
              className="
              w-full

              h-auto
              max-h-[72vh]
              sm:max-h-[78vh]
              lg:max-h-[82vh]

              object-cover
              block
            "
            />
          </div>

          {/* Previous */}

          <button
            onClick={prev}
            className="
        absolute
        left-4
        sm:left-6
        lg:left-8

        top-1/2
        -translate-y-1/2

        w-12 h-12
        sm:w-14 sm:h-14

        rounded-full

        bg-white/10
        backdrop-blur-md
        border border-white/10

        flex items-center justify-center

        hover:bg-[#D49A2D]
        transition-all
      "
          >
            <ChevronLeft size={28} className="text-white" />
          </button>

          {/* Next */}

          <button
            onClick={next}
            className="
        absolute
        right-4
        sm:right-6
        lg:right-8

        top-1/2
        -translate-y-1/2

        w-12 h-12
        sm:w-14 sm:h-14

        rounded-full

        bg-white/10
        backdrop-blur-md
        border border-white/10

        flex items-center justify-center

        hover:bg-[#D49A2D]
        transition-all
    "
          >
            <ChevronRight size={28} className="text-white" />
          </button>
        </div>
      </div>
      {/* Thumbnails */}

      <div
        className="
          flex

          justify-center

          gap-2 sm:gap-3

          overflow-auto

          px-6

          pb-5
        "
      >
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`
              overflow-hidden

              rounded-xl

              border-2

              ${
                activeImage === index
                  ? "border-[#D49A2D]"
                  : "border-transparent"
              }
            `}
          >
            <img
              src={image}
              className="                
                w-14 h-14
                sm:w-16 sm:h-16
                lg:w-20 lg:h-20
                object-cover
              "
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default function ProjectDetail() {
  const galleryImages = [
    techMahindraBanner,
    techMahindraBanner2,
    diningArea,
    creativeBanner,
    creativeBanner,
    creativeBanner,
  ];

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const navigate = useNavigate();
  const { category, slug } = useParams();

  const project = {
    title: "Tech Mahindra Headquarters",
    category: "Corporate Interiors",
    location: "Kolkata, India",
    heroImage: techMahindraBanner,
    current: 1,
    total: 5,
  };

  return (
    <>
      <Navbar activeNav="projects" />

      <div
        className="w-full overflow-x-hidden"
        style={{ fontFamily: "'Parkinsans', sans-serif" }}
      >
        {/* HERO SECTION */}
        <HeroSection project={project} />

        {/* ABOUT PROJECT */}
        <AboutProjectSection />

        {/* GALLERY */}
        <ProjectGallerySection
          images={galleryImages}
          onOpenGallery={(index) => {
            setActiveImage(index);
            setGalleryOpen(true);
          }}
        />

        {/* DESIGN */}
        <GalleryLightbox
          open={galleryOpen}
          images={galleryImages}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
          onClose={() => setGalleryOpen(false)}
        />
      </div>

      <Footer />
    </>
  );
}
