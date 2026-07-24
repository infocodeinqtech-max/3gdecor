import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import servicesBanner from "../assets/images/services.png";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import {
  PenTool,
  Building2,
  Sofa,
  Briefcase,
  Sparkles,
  Hammer,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  CheckCircle2,
  Award,
  Users,
  Clock,
  Shield,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { mediaUrl } from "../utils/mediaUrl";

/* ─── Service Data ─── */
const services = [
  {
    id: 1,
    icon: <PenTool className="size-6" />,
    category: "Interior",
    title: "Corporate Interior Design",
    subtitle: "Offices · Lounges · Open Plans",
    description:
      "Bespoke workspace environments designed to elevate productivity and reflect your corporate identity — from executive suites to open-plan floors.",
    image: mediaUrl("/uploads/pages/services/gallery-1.jpg"),
    tag: "Most Popular",
  },
  {
    id: 2,
    icon: <Sparkles className="size-6" />,
    category: "Hospitality",
    title: "Cafeteria & Canteen Design",
    subtitle: "Dining · Food Courts · Pantries",
    description:
      "Vibrant, functional dining spaces that boost employee morale — from compact pantry zones to multi-floor corporate cafeterias with full fit-out.",
    image: mediaUrl("/uploads/pages/services/gallery-2.jpg"),
    tag: null,
  },
  {
    id: 3,
    icon: <Building2 className="size-6" />,
    category: "Architecture",
    title: "Architectural Planning",
    subtitle: "Blueprints · Layouts · Approvals",
    description:
      "End-to-end architectural design services — structural layouts, space planning, regulatory approvals, and coordination with civil teams on site.",
    image: mediaUrl("/uploads/pages/services/gallery-3.jpg"),
    tag: null,
  },
  {
    id: 4,
    icon: <Hammer className="size-6" />,
    category: "Civil",
    title: "Civil & Industrial Builds",
    subtitle: "Warehouses · Factories · Sheds",
    description:
      "Heavy-duty civil construction for industrial clients — warehouses, factory sheds, PEB structures, and large-span buildings built to last.",
    image: mediaUrl("/uploads/pages/services/gallery-4.jpg"),
    tag: "Civil Specialists",
  },
  {
    id: 5,
    icon: <Briefcase className="size-6" />,
    category: "Turnkey",
    title: "Turnkey Project Delivery",
    subtitle: "Concept to Handover · Zero Gaps",
    description:
      "We own the entire project lifecycle — design, procurement, civil, MEP, furniture, and handover — so you never have to manage multiple vendors.",
    image: mediaUrl("/uploads/pages/services/gallery-5.jpg"),
    tag: null,
  },
  {
    id: 6,
    icon: <Sofa className="size-6" />,
    category: "Furniture",
    title: "Custom Furniture & Fit-out",
    subtitle: "Joinery · Modular · FF&E",
    description:
      "Custom-crafted workstations, cabinets, reception counters, and soft furnishings — all specified, sourced, and installed by our in-house team.",
    image: mediaUrl("/uploads/pages/services/gallery-6.jpg"),
    tag: null,
  },
];

const whyUs = [
  {
    icon: <Award className="size-6" />,
    stat: "15+",
    label: "Years of Excellence",
    detail: "Trusted since 2009",
  },
  {
    icon: <CheckCircle2 className="size-6" />,
    stat: "200+",
    label: "Projects Delivered",
    detail: "On time, on budget",
  },
  {
    icon: <Users className="size-6" />,
    stat: "98%",
    label: "Client Retention",
    detail: "Repeat & referral business",
  },
  {
    icon: <Clock className="size-6" />,
    stat: "100%",
    label: "Turnkey Capability",
    detail: "Single-vendor solution",
  },
];

const marqueeItems = [
  "Conference Rooms",
  "Corporate Cafeterias",
  "Open Office Fit-out",
  "Factory Sheds",
  "Warehouse Builds",
  "Turnkey Projects",
  "Custom Joinery",
  "PEB Structures",
];

/* ─── Animated Counter ─── */
function AnimCounter({ target }: { target: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [val, setVal] = useState("0");
  const num = parseInt(target.replace(/\D/g, ""));
  const sfx = target.replace(/[0-9]/g, "");

  if (isInView && val === "0") {
    const t0 = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - t0) / 1600, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * num) + sfx);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  return <span ref={ref}>{val}</span>;
}

/* ─── Marquee ─── */
function Marquee() {
  return (
    <div
      className="overflow-hidden py-4 border-y border-[#f3bb27]/15"
      style={{ background: "#1a1714" }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        className="flex whitespace-nowrap"
      >
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-8">
            <span
              className="text-[#F5F1EA]/30 text-[11px] uppercase tracking-[0.28em]"
              style={{ fontFamily: "'Parkinsans', sans-serif" }}
            >
              {item}
            </span>
            <span className="text-[#f3bb27]/50 text-base">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Hero — reference layout: full-bleed image + left text + bottom strip ─── */
function Hero() {
  const navigate = useNavigate();
  return (
    <section
      className="bg-[#F5F1EA] px-4 lg:px-5"
      style={{
        position: "relative",
        // overflow: "hidden",
        // background: "#0e0c0a",
        // height: "760px",
      }}
    >
      <div className="relative overflow-hidden rounded-[20px] md:rounded-[32px] min-h-[480px] h-[min(760px,78svh)] md:h-[640px] lg:h-[760px] w-full ">
        {/* ── Full-bleed background image ── */}
        <div className="absolute inset-0 z-0">
          <img
            src={servicesBanner}
            alt="3G Decorative Group reception"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: "brightness(1.45) contrast(1.08) saturate(1.1)",
            }}
          />
          {/* Left-heavy dark overlay — text readable, image glows through on right  -- Dark Gradient */}
          <div
            className="absolute inset-0"
            style={{
              // background:
              //   "linear-gradient(100deg, rgba(10,8,6,0.97) 0%, rgba(10,8,6,0.92) 30%, rgba(10,8,6,0.70) 55%, rgba(10,8,6,0.30) 75%, rgba(10,8,6,0.15) 100%)",
              background: `
                linear-gradient(
                100deg,
                rgba(10,8,6,0.97) 0%,
                rgba(10,8,6,0.92) 30%,
                rgba(8,6,5,.35) 40%,
                rgba(10,8,6,0.70) 55%,
                rgba(255,255,255,.08) 75%,
                rgba(255,255,255,.20) 90%,
                rgba(255,255,255,.28) 100%
               
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
              Services
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
              Our Services
            </span>
          </motion.div>

          {/* Main heading — matches reference: Design. Build. Deliver Excellence. */}
          <div className="max-w-2xl mb-7">
            {[
              { text: "Design. Build.", gold: false },
              { text: "Deliver ", gold: false },
            ].map(({ text }, i) => (
              <div
                key={i}
                style={{ overflow: "hidden", paddingBottom: "10px" }}
              >
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
                  {/* Excellence inline on second line */}
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
          </div>

          {/* Body copy */}
          <motion.p
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
          </motion.p>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
          >
            <motion.button
              whileHover={{
                borderColor: "rgba(243,187,39,0.9)",
                color: "#f3bb27",
                y: -2,
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-3.5 text-[#F5F1EA] text-[12px] uppercase tracking-[0.12em] border transition-colors duration-300"
              style={{
                borderRadius: "100px",
                border: "1px solid rgba(243,187,39,0.45)",
                background: "rgba(10,8,6,0.45)",
                backdropFilter: "blur(8px)",
                fontFamily: "'Parkinsans', sans-serif",
                fontWeight: 500,
              }}
            >
              Explore Our Services <ArrowRight className="size-3.5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Service Card ─── */
function ServiceCard({
  svc,
  index,
}: {
  svc: (typeof services)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 55, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative overflow-hidden cursor-pointer group h-[360px] sm:h-[400px] md:h-[420px]"
      style={{ borderRadius: "22px" }}
      onClick={() => setHovered((v) => !v)}
    >
      {/* Background image with zoom */}
      <motion.img
        src={svc.image}
        alt={svc.title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: hovered ? 1.09 : 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Default dark overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: hovered
            ? "linear-gradient(180deg,rgba(26,23,20,0.28) 0%,rgba(26,23,20,0.72) 40%,rgba(26,23,20,0.97) 100%)"
            : "linear-gradient(180deg,rgba(26,23,20,0.15) 0%,rgba(26,23,20,0.55) 55%,rgba(26,23,20,0.88) 100%)",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Gold shimmer on hover — left edge */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        animate={{ opacity: hovered ? 1 : 0, scaleY: hovered ? 1 : 0 }}
        initial={{ scaleY: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "linear-gradient(180deg, transparent, #f3bb27, #ea7a12, transparent)",
          transformOrigin: "top",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-5 md:p-7">
        {/* Top row: icon + tag */}
        <div className="flex items-start justify-between">
          {/* Icon pill */}
          <motion.div
            animate={{ scale: hovered ? 1.08 : 1, rotate: hovered ? 5 : 0 }}
            transition={{ duration: 0.4 }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-[#1a1714]"
            style={{
              background: "linear-gradient(135deg,#f3bb27,#ea7a12)",
              boxShadow: hovered
                ? "0 8px 28px rgba(243,187,39,0.45)"
                : "0 4px 14px rgba(243,187,39,0.2)",
            }}
          >
            {svc.icon}
          </motion.div>

          {/* Tag badge */}
          {svc.tag && (
            <span
              className="px-3 py-1 text-[10px] uppercase tracking-widest text-[#f3bb27] border border-[#f3bb27]/40 backdrop-blur-sm"
              style={{
                borderRadius: "100px",
                background: "rgba(26,23,20,0.55)",
                fontFamily: "'Mona Sans', sans-serif",
              }}
            >
              {svc.tag}
            </span>
          )}
        </div>

        {/* Bottom: category, title, description, CTA */}
        <div>
          {/* Category */}
          <motion.span
            animate={{ opacity: hovered ? 0.6 : 0.45 }}
            className="text-[#f3bb27] text-[10px] uppercase tracking-[0.28em] mb-2 block"
            style={{ fontFamily: "'Mona Sans', sans-serif" }}
          >
            {svc.category}
          </motion.span>

          {/* Title */}
          <motion.h3
            className="text-[#F5F1EA] mb-1"
            style={{
              fontFamily: "'Parkinsans', sans-serif",
              fontSize: "22px",
              fontWeight: 500,
              lineHeight: 1.15,
            }}
            animate={{ y: hovered ? -4 : 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {svc.title}
          </motion.h3>

          {/* Subtitle */}
          <motion.p
            className="text-[#8a8078] text-[12px] mb-4"
            style={{ fontFamily: "'Mona Sans', sans-serif" }}
            animate={{ opacity: hovered ? 0 : 0.8, y: hovered ? -6 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {svc.subtitle}
          </motion.p>

          {/* Description — always on mobile; hover-reveal on desktop */}
          <p
            className={`text-[#b0a8a0] mb-5 transition-opacity duration-300 ${
              hovered ? "opacity-100 max-h-40" : "opacity-100 md:opacity-0 max-h-40 md:max-h-0 md:overflow-hidden"
            }`}
            style={{
              fontFamily: "'Mona Sans', sans-serif",
              fontSize: "13.5px",
              lineHeight: 1.75,
            }}
          >
            {svc.description}
          </p>

          {/* CTA — always on mobile; hover on desktop */}
          <div
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-[#1a1714] text-[12px] font-semibold uppercase tracking-wider transition-opacity duration-300 ${
              hovered ? "opacity-100" : "opacity-100 md:opacity-0"
            }`}
            style={{
              borderRadius: "100px",
              background: "linear-gradient(135deg,#f3bb27,#ea7a12)",
              fontFamily: "'Mona Sans', sans-serif",
            }}
          >
            Explore Service <ArrowUpRight className="size-3.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Services Grid Section ─── */
function ServicesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 md:py-24 lg:py-36"
      style={{ background: "#F5F1EA" }}
    >
      {/* Watermark */}
      <div
        className="absolute right-[-4%] top-1/2 -translate-y-1/2 pointer-events-none select-none text-[#332C26]/[0.025] hidden md:block"
        style={{
          fontFamily: "'Parkinsans', sans-serif",
          fontSize: "280px",
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        SVC
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 md:mb-16 gap-4 lg:gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55 }}
              className="flex items-center gap-4 mb-7"
            >
              <div className="w-10 h-px bg-gradient-to-r from-[#f3bb27] to-[#ea7a12]" />
              <span
                className="text-[#ea7a12] text-[11px] uppercase tracking-[0.3em]"
                style={{ fontFamily: "'Mona Sans', sans-serif" }}
              >
                What We Offer
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 26 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[#332C26]"
              style={{
                fontFamily: "'Parkinsans', sans-serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 400,
                lineHeight: "108%",
                letterSpacing: "-0.02em",
              }}
            >
              Services{" "}
              <span className="bg-gradient-to-r from-[#f3bb27] to-[#ea7a12] bg-clip-text text-transparent">
                Crafted
              </span>{" "}
              For You
            </motion.h2>
          </div>
        </div>

        {/* 3 × 2 Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((svc, i) => (
            <ServiceCard key={svc.id} svc={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why Choose Us — light ivory background ─── */
function WhyUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const features = [
    "Single-vendor accountability from concept to handover",
    "In-house civil, interior, and furniture teams",
    "ISO-compliant project management processes",
    "Transparent costing with no hidden extras",
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 md:py-24 lg:py-36"
      style={{ background: "#F5F1EA" }}
    >
      {/* Decorative large watermark — hide on mobile */}
      <div
        className="absolute right-[-3%] top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block"
        style={{
          fontFamily: "'Parkinsans', sans-serif",
          fontSize: "260px",
          fontWeight: 700,
          lineHeight: 1,
          color: "rgba(51,44,38,0.028)",
        }}
      >
        3G
      </div>

      {/* Subtle gold radial top-left */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(243,187,39,0.10) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* ── Section header ── */}
        <div className="text-center mb-10 md:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="flex items-center justify-center gap-4 mb-7"
          >
            <div className="w-8 h-px bg-gradient-to-r from-[#f3bb27] to-[#ea7a12]" />
            <span
              className="text-[#ea7a12] text-[11px] uppercase tracking-[0.3em]"
              style={{ fontFamily: "'Parkinsans', sans-serif" }}
            >
              The 3G Advantage
            </span>
            <div className="w-8 h-px bg-gradient-to-l from-[#f3bb27] to-[#ea7a12]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.9,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-[#332C26]"
            style={{
              fontFamily: "'Parkinsans', sans-serif",
              fontSize: "clamp(30px, 4vw, 50px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            Why Choose{" "}
            <span className="bg-gradient-to-r from-[#f3bb27] to-[#ea7a12] bg-clip-text text-transparent">
              3G Decorative Group?
            </span>
          </motion.h2>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: stat cards 2×2 */}
          <div className="grid grid-cols-2 gap-5">
            {whyUs.map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.12 + i * 0.13,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 60px rgba(51,44,38,0.12)",
                  transition: { duration: 0.38 },
                }}
                className="relative p-4 md:p-7 bg-white border border-[#332C26]/8 hover:border-[#f3bb27]/50 transition-colors duration-400 group overflow-hidden"
                style={{
                  borderRadius: "18px",
                  boxShadow: "0 4px 24px rgba(51,44,38,0.07)",
                }}
              >
                {/* Hover gold shimmer top */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.45 }}
                  style={{
                    background: "linear-gradient(90deg,#f3bb27,#ea7a12)",
                  }}
                />

                {/* Ghost number watermark */}
                <div
                  className="absolute bottom-2 right-3 text-[#332C26]/[0.04] select-none pointer-events-none"
                  style={{
                    fontFamily: "'Parkinsans', sans-serif",
                    fontSize: "80px",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  0{i + 1}
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.12 }}
                  transition={{ duration: 0.35 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5"
                  style={{
                    background: "linear-gradient(135deg,#f3bb27,#ea7a12)",
                    boxShadow: "0 6px 20px rgba(243,187,39,0.30)",
                  }}
                >
                  {w.icon}
                </motion.div>

                {/* Stat counter */}
                <div
                  className="bg-gradient-to-r from-[#f3bb27] to-[#ea7a12] bg-clip-text text-transparent mb-1"
                  style={{
                    fontFamily: "'Parkinsans', sans-serif",
                    fontSize: "clamp(28px, 5vw, 44px)",
                    fontWeight: 500,
                    lineHeight: 1,
                  }}
                >
                  <AnimCounter target={w.stat} />
                </div>

                <div
                  className="text-[#332C26] mb-1"
                  style={{
                    fontFamily: "'Parkinsans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  {w.label}
                </div>
                <div
                  className="text-[#8a8078] text-[12px]"
                  style={{ fontFamily: "'Parkinsans', sans-serif" }}
                >
                  {w.detail}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: commitment copy + checklist + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-px bg-gradient-to-r from-[#f3bb27] to-[#ea7a12]" />
              <span
                className="text-[#ea7a12] text-[11px] uppercase tracking-[0.3em]"
                style={{ fontFamily: "'Parkinsans', sans-serif" }}
              >
                Our Commitment
              </span>
            </div>

            <h3
              className="text-[#332C26] mb-5"
              style={{
                fontFamily: "'Parkinsans', sans-serif",
                fontSize: "clamp(24px, 2.8vw, 36px)",
                fontWeight: 400,
                lineHeight: "115%",
                letterSpacing: "-0.01em",
              }}
            >
              One Partner.
              <br />
              Every Stage.{" "}
              <span className="bg-gradient-to-r from-[#f3bb27] to-[#ea7a12] bg-clip-text text-transparent">
                Zero Gaps.
              </span>
            </h3>

            <p
              className="text-[#6B625C] mb-10"
              style={{
                fontFamily: "'Parkinsans', sans-serif",
                fontSize: "14.5px",
                lineHeight: 1.85,
              }}
            >
              We built 3G Deco to eliminate the fragmentation that kills most
              fit-out projects. One team, one contract, one point of
              accountability — from the first sketch to the final handover.
            </p>

            {/* Feature checklist */}
            <div className="space-y-4 mb-10">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.65,
                    delay: 0.38 + i * 0.11,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-start gap-4 group cursor-default"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ duration: 0.3 }}
                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: "linear-gradient(135deg,#f3bb27,#ea7a12)",
                      boxShadow: "0 3px 10px rgba(243,187,39,0.30)",
                    }}
                  >
                    <CheckCircle2 className="size-3 text-white" />
                  </motion.div>
                  <span
                    className="text-[#6B625C] group-hover:text-[#332C26] transition-colors duration-300"
                    style={{
                      fontFamily: "'Parkinsans', sans-serif",
                      fontSize: "14.5px",
                      lineHeight: 1.7,
                    }}
                  >
                    {f}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA — dark on light bg */}
            <motion.button
              whileHover={{
                scale: 1.04,
                y: -3,
                boxShadow: "0 16px 48px rgba(243,187,39,0.35)",
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-9 py-4 text-white font-semibold cursor-pointer"
              style={{
                borderRadius: "100px",
                fontSize: "13.5px",
                letterSpacing: "0.05em",
                fontFamily: "'Parkinsans', sans-serif",
                background: "linear-gradient(135deg,#332C26,#1e1a17)",
                boxShadow: "0 8px 32px rgba(51,44,38,0.22)",
              }}
            >
              Book a Consultation <ArrowRight className="size-4" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Process — cinematic dark cards ─── */
function ProcessStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      n: "01",
      icon: <Users className="size-7" />,
      label: "Discovery",
      tagline: "We Listen First",
      desc: "Site visit, brief deep-dive, stakeholder alignment. We map out your requirements, constraints, and vision before a single line is drawn.",
      img: mediaUrl("/uploads/pages/services/process-1.jpg"),
      accent: "#f3bb27",
    },
    {
      n: "02",
      icon: <PenTool className="size-7" />,
      label: "Concept Design",
      tagline: "Vision on Paper",
      desc: "Mood boards, space plans, 3D visualisations and material palettes — refined through collaborative review until every detail is right.",
      img: mediaUrl("/uploads/pages/services/process-2.jpg"),
      accent: "#ea7a12",
    },
    {
      n: "03",
      icon: <Hammer className="size-7" />,
      label: "Execution",
      tagline: "Built to Spec",
      desc: "Civil works, MEP coordination, furniture installation — our in-house teams execute every stage with precision and zero subcontractor gaps.",
      img: mediaUrl("/uploads/pages/services/process-3.jpg"),
      accent: "#f3bb27",
    },
    {
      n: "04",
      icon: <Award className="size-7" />,
      label: "Handover",
      tagline: "Zero Defects",
      desc: "Thorough QA walkthrough, snag resolution, as-built documentation, and post-handover support. We don't leave until you're completely satisfied.",
      img: mediaUrl("/uploads/pages/services/process-4.jpg"),
      accent: "#ea7a12",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 md:py-24 lg:py-36"
      style={{ background: "#131009" }}
    >
      {/* Top ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse,rgba(243,187,39,0.06) 0%,transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 md:mb-16 lg:mb-20 gap-4 lg:gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-10 h-px bg-gradient-to-r from-[#f3bb27] to-[#ea7a12]" />
              <span
                className="text-[#ea7a12] text-[11px] uppercase tracking-[0.3em]"
                style={{ fontFamily: "'Parkinsans', sans-serif" }}
              >
                How We Work
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.95,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[#F5F1EA]"
              style={{
                fontFamily: "'Parkinsans', sans-serif",
                fontSize: "clamp(30px, 4vw, 50px)",
                fontWeight: 400,
                lineHeight: "105%",
                letterSpacing: "-0.02em",
              }}
            >
              From Brief to{" "}
              <span className="bg-gradient-to-r from-[#f3bb27] to-[#ea7a12] bg-clip-text text-transparent">
                Handover
              </span>
            </motion.h2>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.12 + i * 0.13,
                ease: [0.22, 1, 0.36, 1],
              }}
              onHoverStart={() => setActiveStep(i)}
              onHoverEnd={() => setActiveStep(null)}
              className="relative overflow-hidden cursor-pointer"
              style={{ borderRadius: "18px", minHeight: "320px" }}
            >
              {/* Background image — dim by default, vivid on hover */}
              <motion.div
                className="absolute inset-0 z-0"
                animate={{ opacity: activeStep === i ? 1 : 0.35 }}
                transition={{ duration: 0.55 }}
              >
                <img
                  src={s.img}
                  alt={s.label}
                  className="w-full h-full object-cover"
                  style={{
                    filter: "brightness(1.35) contrast(1.1) saturate(1.15)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      activeStep === i
                        ? "linear-gradient(180deg,rgba(14,12,10,0.35) 0%,rgba(14,12,10,0.88) 100%)"
                        : "linear-gradient(180deg,rgba(14,12,10,0.60) 0%,rgba(14,12,10,0.95) 100%)",
                  }}
                />
              </motion.div>

              {/* Gold top border — always visible, brightens on hover */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] z-20"
                animate={{ opacity: activeStep === i ? 1 : 0.35 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: `linear-gradient(90deg,${s.accent},${i % 2 === 0 ? "#ea7a12" : "#f3bb27"})`,
                }}
              />

              {/* Corner glow on hover */}
              <motion.div
                className="absolute top-0 left-0 w-32 h-32 pointer-events-none z-0"
                animate={{ opacity: activeStep === i ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: `radial-gradient(circle at top left,${s.accent}30 0%,transparent 70%)`,
                }}
              />

              {/* Content */}
              <div
                className="relative z-10 p-5 md:p-7 h-full flex flex-col justify-between"
                style={{ minHeight: "320px" }}
              >
                {/* Top: number + icon */}
                <div className="flex items-start justify-between mb-6">
                  {/* Step number — always visible */}
                  <motion.span
                    animate={{
                      color:
                        activeStep === i ? s.accent : "rgba(255,255,255,0.22)",
                    }}
                    transition={{ duration: 0.4 }}
                    style={{
                      fontFamily: "'Parkinsans', sans-serif",
                      fontSize: "clamp(48px, 7vw, 72px)",
                      fontWeight: 700,
                      lineHeight: 1,
                      display: "block",
                    }}
                  >
                    {s.n}
                  </motion.span>

                  {/* Icon — gold ring always, filled on hover */}
                  <div className="relative w-14 h-14 shrink-0">
                    <motion.div
                      animate={{ opacity: activeStep === i ? 0 : 1 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0 rounded-2xl border border-[#f3bb27]/30"
                      style={{ background: "rgba(243,187,39,0.10)" }}
                    />
                    <motion.div
                      animate={{ opacity: activeStep === i ? 1 : 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg,${s.accent},${i % 2 === 0 ? "#ea7a12" : "#f3bb27"})`,
                      }}
                    />
                    <motion.div
                      animate={{
                        color: activeStep === i ? "#0e0c0a" : s.accent,
                        scale: activeStep === i ? 1.1 : 1,
                        rotate: activeStep === i ? 8 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                      className="relative z-10 w-full h-full rounded-2xl flex items-center justify-center"
                    >
                      {s.icon}
                    </motion.div>
                  </div>
                </div>

                {/* Bottom: accent line, label, tagline, desc */}
                <div>
                  {/* Gold accent line — always visible */}
                  <motion.div
                    className="w-8 h-[2px] mb-4"
                    animate={{
                      opacity: activeStep === i ? 1 : 0.5,
                      backgroundColor: activeStep === i ? s.accent : "#f3bb27",
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  <h3
                    className="text-[#F5F1EA] mb-2"
                    style={{
                      fontFamily: "'Parkinsans', sans-serif",
                      fontSize: "22px",
                      fontWeight: 500,
                    }}
                  >
                    {s.label}
                  </h3>

                  {/* Tagline — always visible */}
                  <motion.p
                    animate={{
                      color:
                        activeStep === i ? s.accent : "rgba(255,255,255,0.55)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-[11px] uppercase tracking-[0.25em] mb-4"
                    style={{ fontFamily: "'Parkinsans', sans-serif" }}
                  >
                    {s.tagline}
                  </motion.p>

                  {/* Description — always visible, brightens on hover */}
                  <motion.p
                    animate={{ opacity: activeStep === i ? 1 : 0.55 }}
                    transition={{ duration: 0.35 }}
                    className="text-[#b8b0a8] text-[13px] leading-relaxed"
                    style={{ fontFamily: "'Parkinsans', sans-serif" }}
                  >
                    {s.desc}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connecting dotted line below cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="hidden lg:flex items-center justify-between mt-6 px-16"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex-1 mx-4 h-px"
              style={{
                background:
                  "linear-gradient(90deg,rgba(243,187,39,0.3),rgba(234,122,18,0.15),rgba(243,187,39,0.3))",
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Root ─── */
export default function Services() {
  return (
    <>
      <Navbar activeNav="services" />

      <div
        className="w-full overflow-x-hidden"
        style={{ fontFamily: "'Parkinsans', sans-serif" }}
      >
        <Hero />
        {/* <Marquee /> */}
        <ServicesGrid />
        <ProcessStrip />
        <WhyUs />
        <Footer />
      </div>
    </>
  );
}
