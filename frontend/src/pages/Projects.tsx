import { motion } from "framer-motion";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Briefcase, Building2, Award } from "lucide-react";
import projectBanner from "../assets/images/project-banner.png"; // your image
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

function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="px-4 lg:px-5 py-4 bg-[#F5F1EA]">
      <div className="relative overflow-hidden rounded-b-[34px] rounded-t-none min-h-[760px]">
        {/* Background Image */}

        <motion.img
          src={projectBanner}
          alt="Projects"
          className="absolute inset-0 w-full h-full object-cover object-right"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 10,
            ease: "easeOut",
          }}
          style={{
            filter: "brightness(1.08) contrast(1.08) saturate(1.08)",
          }}
        />

        {/* Luxury Overlay */}

        <div
          className="absolute inset-0"
          style={{
            background: `
                linear-gradient(
                90deg,
                rgba(10,9,8,.92) 0%,
                rgba(10,9,8,.82) 18%,
                rgba(18,15,12,.72) 36%,
                rgba(25,20,15,.48) 55%,
                rgba(30,25,18,.20) 75%,
                rgba(255,255,255,.03) 100%
                )
                `,
          }}
        />

        {/* Warm Gold Glow */}

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute -left-36 top-44 w-[550px] h-[550px] rounded-full blur-[100px]"
          style={{
            background: `
                radial-gradient(
                ellipse at 18% 40%,
                rgba(244,178,35,.30),
                rgba(244,178,35,.12) 35%,
                transparent 68%
                )
                `,
          }}
        />

        {/* Top Gold Line */}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute top-0 left-0 right-0 h-[3px] origin-left"
          style={{
            background: "linear-gradient(90deg,#f4b223,#ea7a12,#f4b223)",
          }}
        />

        {/* Content */}

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-14 pt-36">
          {/* Breadcrumb */}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <a
              href="./"
              className="text-[#F5F1EA]/35 hover:text-[#f3bb27] text-[11px] uppercase tracking-[0.25em] transition-colors"
              style={{ fontFamily: "'Parkinsans', sans-serif" }}
            >
              Home
            </a>

            <ChevronRight className="w-3 h-3 text-[#f4b223]" />

            <span
              className="uppercase tracking-[0.25em] text-[11px] text-[#f4b223]"
              style={{
                fontFamily: "Parkinsans",
              }}
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

          {/* Heading */}

          <motion.h1
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="leading-none mt-10"
            style={{ fontFamily: "Cormorant Garamond" }}
          >
            <span
              className="block text-white"
              style={{
                fontSize: "clamp(52px,4.5vw,68px)",
              }}
            >
              Our
            </span>

            <span
              className="block -mt-2 text-transparent bg-clip-text"
              style={{
                fontSize: "clamp(82px,8vw,118px)",
                backgroundImage: "linear-gradient(90deg,#f4b223,#ea7a12)",
              }}
            >
              Projects
            </span>
          </motion.h1>
          {/* Description */}

          <motion.p
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.7,
            }}
            className="max-w-xl mt-8 text-[#F1ECE5]"
            style={{
              fontFamily: "Parkinsans",
              fontSize: "17px",
              lineHeight: 1.9,
            }}
          >
            Explore a curated collection of premium corporate interiors and
            civil infrastructure projects that reflect our passion for
            craftsmanship, precision, and timeless architectural excellence.
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
        </div>

        {/* Bottom Fade */}

        <div
          className="absolute bottom-0 left-0 right-0 h-44"
          style={{
            background: "linear-gradient(to top,rgba(0,0,0,.35),transparent)",
          }}
        />
      </div>
    </section>
  );
}

export default function Projects() {
  return (
    <>
      <Navbar activeNav="projects" />

      <main className="pt-[72px] bg-[#F5F1EA]">
        {/* Hero Section */}
        <HeroSection />

        {/* Category Section */}

        {/* Corporate Projects */}

        {/* Civil Projects */}

        {/* CTA */}
      </main>

      <Footer />
    </>
  );
}
