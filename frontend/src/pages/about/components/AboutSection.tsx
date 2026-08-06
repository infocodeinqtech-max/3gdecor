import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

import type { AboutContent } from "../../../admin/data/seedContent";
type HeroSectionProps = {
  content: AboutContent;
};


import about1 from "../../../assets/images/about1.jpg";
import about2 from "../../../assets/images/about2.jpg";
import about3 from "../../../assets/images/about3.jpg";
import about4 from "../../../assets/images/about4.jpg";
import badge3G from "../../../assets/images/3g-badge.png";
import { Award, Building2, Users } from "lucide-react";
const aboutImages = [about1, about2, about3, about4];
const stats = [
  {
    number: "200+",
    label: "Projects Delivered",
    icon: <Building2 className="size-4" />,
  },
  {
    number: "15+",
    label: "Years Experience",
    icon: <Award className="size-4" />,
  },
  {
    number: "98%",
    label: "Client Retention",
    icon: <Users className="size-4" />,
  },
];

/* ─── Animated Counter ─── */
function AnimatedNumber({ target }: { target: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  const numeric = parseInt(target.replace(/\D/g, ""));
  const suffix = target.replace(/[0-9]/g, "");

  if (isInView && display === "0") {
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / 1800, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(e * numeric) + suffix);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  return <span ref={ref}>{display}</span>;
}


/* ─── About + Stats (single combined section) ─── */
export default function AboutSection({ content }: { content: AboutContent }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.18 });
  const cards = [
    {
      img: aboutImages[0],
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
      img: aboutImages[1],
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
      img: aboutImages[2],
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
      img: aboutImages[3],
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

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#F5F1EA" }}
    >
      {/* Watermark */}
      <div
        className="absolute right-[-2%] top-1/2 -translate-y-1/2 pointer-events-none select-none text-[#332C26]/[0.025]"
        style={{
          fontFamily: "'Parkinsans', sans-serif",
          fontSize: "260px",
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        3G
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          {/* Left: text + stats */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-px bg-gradient-to-r from-[#f3bb27] to-[#ea7a12]" />
              <span
                className="text-[#ea7a12] text-[11px] uppercase tracking-[0.3em]"
                style={{ fontFamily: "'Parkinsans', sans-serif" }}
              >
                Who We Are
              </span>
            </div>
            <h2
              className="text-[#332C26] mb-7"
              style={{
                fontFamily: "'Parkinsans', sans-serif",
                fontSize: "clamp(32px, 4vw, 50px)",
                fontWeight: 400,
                lineHeight: "108%",
                letterSpacing: "-0.02em",
              }}
            >
              Corporate Precision.
              <br />
              <span className="bg-gradient-to-r from-[#f3bb27] to-[#ea7a12] bg-clip-text text-transparent">
                Civil Strength.
              </span>
            </h2>
            <p
              className="text-[#6B625C] mb-5 leading-relaxed"
              style={{ fontSize: "15.5px", lineHeight: 1.85 }}
            >
              3G Decorative Group is a full-service interior and civil
              contracting firm specialising in corporate environments —
              conference rooms, cafeterias, open offices — and large-scale civil
              builds including warehouses, factory sheds, and industrial
              facilities.
            </p>
            <p
              className="text-[#6B625C] mb-12 leading-relaxed"
              style={{ fontSize: "15.5px", lineHeight: 1.85 }}
            >
              We manage every stage in-house: concept design, material sourcing,
              civil execution, and final fit-out. Our clients trust us because
              we deliver on time, within budget, and without compromise.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-5 pt-8 border-t border-[#332C26]/10">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.45 + i * 0.14 }}
                >
                  <div className="text-[#f3bb27] mb-2">{s.icon}</div>
                  <div
                    className="bg-gradient-to-r from-[#f3bb27] to-[#ea7a12] bg-clip-text text-transparent"
                    style={{
                      fontFamily: "'Parkinsans', sans-serif",
                      fontSize: "clamp(28px, 8vw, 42px)",
                      fontWeight: 500,
                      lineHeight: 1,
                    }}
                  >
                    <AnimatedNumber target={s.number} />
                  </div>
                  <div
                    className="text-[#6B625C] text-[11px] uppercase tracking-widest mt-1.5"
                    style={{ fontFamily: "'Parkinsans', sans-serif" }}
                  >
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
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
                  src={badge3G}
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
      </div>
    </section>
  );
}