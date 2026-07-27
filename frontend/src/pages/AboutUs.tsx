import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "motion/react";
import {
  Award,
  Users,
  Building,
  Building2,
  Lightbulb,
  Heart,
  Target,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import Footer from "../app/components/Footer";
import Navbar from "../app/components/Navbar";
import aboutUsBanner from "../assets/images/aboutus.png";
import badge3G from "../assets/images/3g-badge.png";
import about1 from "../assets/images/about1.jpg";
import about2 from "../assets/images/about2.jpg";
import about3 from "../assets/images/about3.jpg";
import about4 from "../assets/images/about4.jpg";

import { useNavigate } from "react-router-dom";
import { mediaUrl } from "../utils/mediaUrl";

const aboutImages = [about1, about2, about3, about4];

/* ─── Data ─── */
const teamMembers = [
  {
    name: "Priya Sharma",
    role: "Founder & Creative Director",
    quote: '"Every space tells a story."',
    image: mediaUrl("/uploads/pages/about/team-1.jpg"),
  },
  {
    name: "Arjun Mehta",
    role: "Principal Architect",
    quote: '"Structure is silent poetry."',
    image: mediaUrl("/uploads/pages/about/team-2.jpg"),
  },
  {
    name: "Rahul Nair",
    role: "Senior Interior Designer",
    quote: '"Details make perfection."',
    image: mediaUrl("/uploads/pages/about/team-3.jpg"),
  },
  {
    name: "Kavya Reddy",
    role: "Project Lead & Stylist",
    quote: '"Function shapes the soul."',
    image: mediaUrl("/uploads/pages/about/team-4.jpg"),
  },
];

const principles = [
  {
    icon: <Lightbulb className="size-5" />,
    title: "Vision-Led Design",
    description:
      "We begin with listening — understanding your operations, brand, and people before a single line is drawn.",
  },
  {
    icon: <Heart className="size-5" />,
    title: "Built to Last",
    description:
      "From heavy-duty civil builds to refined corporate fit-outs, we specify materials that endure real-world use.",
  },
  {
    icon: <Target className="size-5" />,
    title: "On Time. On Budget.",
    description:
      "Turnkey project management from concept to handover, with zero surprises at delivery.",
  },
];

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

/* ─── Marquee Strip ─── */
function MarqueeStrip() {
  const items = [
    "Corporate Interiors",
    "Conference Rooms",
    "Cafeteria Design",
    "Warehouse Fit-outs",
    "Factory Sheds",
    "Civil Construction",
  ];
  return (
    <div
      className="overflow-hidden py-4 border-y border-[#f3bb27]/15"
      style={{ background: "#1a1714" }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        className="flex whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-8">
            <span
              className="text-[#F5F1EA]/35 text-[11px] uppercase tracking-[0.28em]"
              style={{ fontFamily: "'Parkinsans', sans-serif" }}
            >
              {item}
            </span>
            <span className="text-[#f3bb27]/60">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function HeroSection() {
  const navigate = useNavigate();
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
          min-h-[70svh]
          h-auto
          lg:min-h-[760px]
          "
      >
        {/* ── Full-bleed background image ── */}
        <div className="absolute inset-0 z-0">
          <img
            src={aboutUsBanner}
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
          style={{
            background: "linear-gradient(90deg,#f3bb27,#ea7a12,#f3bb27)",
          }}
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
            {/* <button
              onClick={() => navigate("/")}
              className="text-[#F5F1EA]/35 hover:text-[#f3bb27] text-[11px] uppercase tracking-[0.25em] transition-colors"
              style={{ fontFamily: "'Parkinsans', sans-serif" }}
            >
              Home
            </button> */}
            <ChevronRight className="size-3 text-[#f3bb27]/30" />
            <span
              className="text-[#f3bb27] text-[11px] uppercase tracking-[0.25em]"
              style={{ fontFamily: "'Parkinsans', sans-serif" }}
            >
              About Us
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
              About Us
            </span>
          </motion.div>

          {/* Main heading — matches reference: Design. Build. Deliver Excellence. */}
          {/* <div className="max-w-2xl mb-7">
            {[
              { text: "Design. Build.", gold: false },
              { text: "Deliver ", gold: false },
            ].map(({ text }, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.48 + i * 0.14,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-[#F5F1EA]"
                  style={{
                    display: "block",
                    fontFamily: "'Parkinsans', sans-serif",
                    fontSize: "clamp(44px, 6.5vw, 80px)",
                    fontWeight: 400,
                    lineHeight: "100%",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {text}
                  {i === 1 && (
                    <span
                      style={{
                        fontStyle: "italic",
                        background: "linear-gradient(90deg,#f3bb27,#ea7a12)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Excellence.
                    </span>
                  )}
                </motion.span>
              </div>
            ))}
          </div> */}

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
                <span className="text-[#F5F1EA]">About </span>

                <span
                  style={{
                    background: "linear-gradient(90deg,#f3bb27,#ea7a12)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Us
                </span>
              </motion.h1>
            </div>
          </div>

          {/* Body copy */}
          {/* <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.82 }}
            className="text-[#8a8078] max-w-lg mb-10"
            style={{
              fontFamily: "'Parkinsans', sans-serif",
              fontSize: "15.5px",
              lineHeight: 1.82,
            }}
          >
            At 3G Deco, we offer end-to-end design and construction solutions
            that combine creativity, functionality, and precision to create
            spaces that truly inspire.
          </motion.p> */}

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
            We are a multidisciplinary team of interior designers and space
            planners delivering premium corporate interiors and thoughtfully
            designed civil spaces that inspire productivity, enhance
            functionality, and reflect your brand identity.
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

          {/* Bottom Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="mt-16 flex flex-wrap items-start gap-10 lg:gap-14"
          >
            {/* Corporate Interiors */}
            <div className="flex items-center gap-5">
              {/* Circle Icon */}
              <div
                className="w-24 h-24 rounded-full border border-[#6d5630] flex items-center justify-center shrink-0"
                style={{
                  background:
                    "radial-gradient(circle, rgba(243,187,39,.08), rgba(255,255,255,.02))",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(243,187,39,.35)",
                }}
              >
                <Building2
                  className="w-10 h-10 text-[#d8a94c]"
                  strokeWidth={1.4}
                />
              </div>

              {/* Text */}
              <div className="max-w-[220px]">
                <h4
                  className="uppercase text-[#d8a94c] mb-3"
                  style={{
                    fontFamily: "'Parkinsans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    letterSpacing: ".12em",
                  }}
                >
                  Corporate Interiors
                </h4>

                <p
                  className="text-[#E2DDD6]"
                  style={{
                    fontFamily: "'Parkinsans', sans-serif",
                    fontSize: "14px",
                    lineHeight: "1.7",
                  }}
                >
                  Thoughtful design that enhances productivity, collaboration
                  and well-being.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-28 bg-[#d8a94c]/35" />

            {/* Civil Spaces */}
            <div className="flex items-center gap-5">
              <div
                className="w-24 h-24 rounded-full border border-[#6d5630] flex items-center justify-center shrink-0"
                style={{
                  background:
                    "radial-gradient(circle, rgba(243,187,39,.08), rgba(255,255,255,.02))",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(243,187,39,.35)",
                }}
              >
                <Building
                  className="w-10 h-10 text-[#d8a94c]"
                  strokeWidth={1.4}
                />
              </div>

              <div className="max-w-[220px]">
                <h4
                  className="uppercase text-[#d8a94c] mb-3"
                  style={{
                    fontFamily: "'Parkinsans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    letterSpacing: ".12em",
                  }}
                >
                  Civil Spaces
                </h4>

                <p
                  className="text-[#E2DDD6]"
                  style={{
                    fontFamily: "'Parkinsans', sans-serif",
                    fontSize: "14px",
                    lineHeight: "1.7",
                  }}
                >
                  Well-planned layouts and efficient spaces built for long-term
                  performance.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── About + Stats (single combined section) ─── */
function AboutSection() {
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

/* ─── Team ─── */
function TeamSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ background: "#1e1a17" }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(243,187,39,0.055) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-5">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-7"
            >
              <div className="w-10 h-px bg-gradient-to-r from-[#f3bb27] to-[#ea7a12]" />
              <span
                className="text-[#ea7a12] text-[11px] uppercase tracking-[0.3em]"
                style={{ fontFamily: "'Parkinsans', sans-serif" }}
              >
                The People
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[#F5F1EA]"
              style={{
                fontFamily: "'Parkinsans', sans-serif",
                fontSize: "clamp(32px, 4.5vw, 56px)",
                fontWeight: 400,
                lineHeight: "100%",
                letterSpacing: "-0.02em",
              }}
            >
              The Minds Behind
              <br />
              <span className="bg-gradient-to-r from-[#f3bb27] to-[#ea7a12] bg-clip-text text-transparent">
                3G Decorative Group
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#5e5650] max-w-xs lg:text-right"
            style={{
              fontFamily: "'Parkinsans', sans-serif",
              fontSize: "14.5px",
              lineHeight: 1.7,
            }}
          >
            Architects, designers, and site engineers who understand both the
            boardroom and the build yard.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {teamMembers.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 44 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.85,
                delay: 0.18 + i * 0.11,
                ease: [0.22, 1, 0.36, 1],
              }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              className="group cursor-pointer"
            >
              <div
                className="relative overflow-hidden mb-4"
                style={{ borderRadius: "16px", aspectRatio: "3/4" }}
              >
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1a17] via-[#1e1a17]/15 to-transparent" />

                <AnimatePresence>
                  {hovered === i && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0 flex items-center justify-center p-5"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(243,187,39,0.12) 0%, rgba(26,23,20,0.90) 100%)",
                      }}
                    >
                      <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 6, opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                        className="text-[#F5F1EA] text-center italic"
                        style={{
                          fontFamily: "'Parkinsans', sans-serif",
                          fontSize: "16px",
                          fontWeight: 300,
                          lineHeight: 1.5,
                        }}
                      >
                        {m.quote}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  className="absolute top-3 left-3 px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#1e1a17]"
                  style={{
                    borderRadius: "100px",
                    background: "linear-gradient(135deg, #f3bb27, #ea7a12)",
                    fontFamily: "'Parkinsans', sans-serif",
                  }}
                >
                  0{i + 1}
                </div>
              </div>

              <h3
                className="text-[#F5F1EA] mb-0.5 group-hover:text-[#f3bb27] transition-colors duration-300"
                style={{
                  fontFamily: "'Parkinsans', sans-serif",
                  fontSize: "17px",
                  fontWeight: 500,
                }}
              >
                {m.name}
              </h3>
              <p
                className="text-[#5e5650] text-[11px] uppercase tracking-wider"
                style={{ fontFamily: "'Parkinsans', sans-serif" }}
              >
                {m.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Principles ─── */
function PrinciplesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.18 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ background: "#F5F1EA" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-7"
          >
            <div className="w-8 h-px bg-gradient-to-r from-[#f3bb27] to-[#ea7a12]" />
            <span
              className="text-[#ea7a12] text-[11px] uppercase tracking-[0.3em]"
              style={{ fontFamily: "'Parkinsans', sans-serif" }}
            >
              Our Philosophy
            </span>
            <div className="w-8 h-px bg-gradient-to-l from-[#f3bb27] to-[#ea7a12]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.85,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-[#332C26]"
            style={{
              fontFamily: "'Parkinsans', sans-serif",
              fontSize: "clamp(28px, 3.5vw, 46px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            Principles That{" "}
            <span className="bg-gradient-to-r from-[#f3bb27] to-[#ea7a12] bg-clip-text text-transparent">
              Guide Our Work
            </span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.85,
                delay: 0.18 + i * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -7,
                transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
              }}
              className="relative group p-9 bg-white border border-[#332C26]/7 hover:border-[#f3bb27]/35 transition-colors duration-500"
              style={{
                borderRadius: "24px",
                boxShadow: "0 4px 32px rgba(51,44,38,0.055)",
              }}
            >
              <div
                className="absolute top-8 right-8 text-[#332C26]/[0.055] select-none pointer-events-none"
                style={{
                  fontFamily: "'Parkinsans', sans-serif",
                  fontSize: "72px",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                0{i + 1}
              </div>

              <motion.div
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{ duration: 0.35 }}
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-7"
                style={{
                  background: "linear-gradient(135deg, #f3bb27, #ea7a12)",
                }}
              >
                {p.icon}
              </motion.div>

              <div className="w-8 h-[2px] bg-gradient-to-r from-[#f3bb27] to-[#ea7a12] mb-5" />
              <h3
                className="text-[#332C26] mb-3"
                style={{
                  fontFamily: "'Parkinsans', sans-serif",
                  fontSize: "22px",
                  fontWeight: 500,
                }}
              >
                {p.title}
              </h3>
              <p
                className="text-[#6B625C]"
                style={{
                  fontFamily: "'Parkinsans', sans-serif",
                  fontSize: "14.5px",
                  lineHeight: 1.82,
                }}
              >
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTASection() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24"
      style={{
        background:
          "linear-gradient(135deg, #2E2723 0%, #1e1a17 60%, #2E2723 100%)",
      }}
    >
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(243,187,39,0.07) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="relative max-w-2xl mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-8 h-px bg-gradient-to-r from-[#f3bb27] to-[#ea7a12]" />
          <span
            className="text-[#ea7a12] text-[11px] uppercase tracking-[0.3em]"
            style={{ fontFamily: "'Parkinsans', sans-serif" }}
          >
            Let's Collaborate
          </span>
          <div className="w-8 h-px bg-gradient-to-l from-[#f3bb27] to-[#ea7a12]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#F5F1EA] mb-5"
          style={{
            fontFamily: "'Parkinsans', sans-serif",
            fontSize: "clamp(32px, 4.5vw, 56px)",
            fontWeight: 400,
            lineHeight: "100%",
            letterSpacing: "-0.02em",
          }}
        >
          Ready to Build
          <br />
          <span className="bg-gradient-to-r from-[#f3bb27] to-[#ea7a12] bg-clip-text text-transparent">
            Something Great?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.28 }}
          className="text-[#7a716a] mb-10"
          style={{
            fontFamily: "'Parkinsans', sans-serif",
            fontSize: "15.5px",
            lineHeight: 1.78,
          }}
        >
          Whether it's a corporate cafeteria, a conference suite, or a 50,000 sq
          ft warehouse — our team is ready to deliver.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/contact")}
            className="inline-flex items-center gap-3 px-9 py-4 text-[#1e1a17] font-medium"
            style={{
              fontFamily: "'Parkinsans', sans-serif",
              borderRadius: "100px",
              fontSize: "14px",
              letterSpacing: "0.04em",
              background: "linear-gradient(135deg, #f3bb27, #ea7a12)",
              boxShadow: "0 8px 36px rgba(243,187,39,0.28)",
            }}
          >
            Book a Consultation <ArrowRight className="size-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/#projects")}
            className="inline-flex items-center gap-3 px-9 py-4 text-[#F5F1EA] border border-[#F5F1EA]/18 hover:border-[#f3bb27]/45 transition-colors"
            style={{
              fontFamily: "'Parkinsans', sans-serif",
              borderRadius: "100px",
              fontSize: "14px",
              letterSpacing: "0.04em",
            }}
          >
            View Our Projects <ArrowUpRight className="size-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Root ─── */
export default function AboutUs() {
  return (
    <>
      <Navbar activeNav="about" />
      <div
        className="w-full overflow-x-hidden"
        style={{ fontFamily: "'Parkinsans', sans-serif" }}
      >
        <HeroSection />
        {/* <MarqueeStrip /> */}
        <AboutSection />
        <TeamSection />
        <PrinciplesSection />
        {/* <CTASection onNavigate={onNavigate} /> */}
        <Footer />
      </div>
    </>
  );
}
