import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";

import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, MapPin, ChevronRight } from "lucide-react";

import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { useNavigate, useParams } from "react-router-dom";
import techMahindraBanner from "../assets/images/tech-mahindra-office.jpeg";
import techMahindraBanner2 from "../assets/images/tech-mahindra-banner.png";

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
      className="bg-[#F5F1EA] px-4 lg:px-5"
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
          style={{
            background: "linear-gradient(90deg,#f3bb27,#ea7a12,#f3bb27)",
          }}
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

export default function ProjectDetail() {
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

        {/* <HeroSection project={project} /> */}

        {/* ABOUT PROJECT */}

        {/* GALLERY */}

        {/* DESIGN */}
      </div>

      <Footer />
    </>
  );
}
