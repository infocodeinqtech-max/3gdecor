
import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {Building, Building2,  ChevronRight } from "lucide-react";

import aboutUsBanner from "../../../assets/images/aboutus.png";
import { mediaUrl } from "../../../utils/mediaUrl";
import type { AboutContent, HeroFeature } from "../../../admin/data/seedContent";

type AboutHeroSectionProps = {
  content: AboutContent;
  heroFeatures: HeroFeature[];
};

export default function AboutHeroSection({ content, heroFeatures }: AboutHeroSectionProps) {
  const navigate = useNavigate();

  const firstFeature = heroFeatures[0];
  const secondFeature = heroFeatures[1];

  const iconMap = {
    Building,
    Building2,
  };

  const FirstIcon = firstFeature
    ? iconMap[firstFeature.icon as keyof typeof iconMap] ?? Building
    : Building;

  const SecondIcon = secondFeature
    ? iconMap[secondFeature.icon as keyof typeof iconMap] ?? Building
    : Building;

  return (
    <section
      className="bg-[#F5F1EA] px-4 pt-[72px] lg:px-5 lg:pt-[80px]"
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
            // background: "linear-gradient(90deg,#f3bb27,#ea7a12,#f3bb27)",
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
            {content.paragraph1}
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
            {content.paragraph2}
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
                <FirstIcon
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
                  {firstFeature?.title}
                </h4>

                <p
                  className="text-[#E2DDD6]"
                  style={{
                    fontFamily: "'Parkinsans', sans-serif",
                    fontSize: "14px",
                    lineHeight: "1.7",
                  }}
                >
                  {firstFeature?.description}
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
                <SecondIcon
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
                  {secondFeature?.title}
                </h4>

                <p
                  className="text-[#E2DDD6]"
                  style={{
                    fontFamily: "'Parkinsans', sans-serif",
                    fontSize: "14px",
                    lineHeight: "1.7",
                  }}
                >
                  {secondFeature?.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}