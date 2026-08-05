import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, ArrowUpRight} from "lucide-react";
import Footer from "../app/components/Footer";
import Navbar from "../app/components/Navbar";



import { useNavigate } from "react-router-dom";

import { loadPublicSiteCms } from "../content/publicCms";
import PageLoader from "../app/components/PageLoader";
import { useCmsPageGate } from "../hooks/useCmsPageGate";

/* Load Components */
import HeroSection from "./about/components/HeroSection";
import AboutSection from "./about/components/AboutSection";
import TeamSection from "./about/components/TeamSection";
import PrinciplesSection from "./about/components/PrinciplesSection";


/* ─── Data ─── */

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
  const { showLoader, fading } = useCmsPageGate((force) =>
    loadPublicSiteCms(force),
  );

  return (
    <>
      {showLoader && <PageLoader fading={fading} />}
      <Navbar activeNav="about" />
      <div
        className="w-full overflow-x-hidden"
        style={{ fontFamily: "'Parkinsans', sans-serif" }}
      >
        <HeroSection />
        {!showLoader && (
          <>
            <AboutSection />
            <TeamSection />
            <PrinciplesSection />
            <Footer />
          </>
        )}
      </div>
    </>
  );
}
