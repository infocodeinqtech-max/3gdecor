import { Shield, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import logo from "../assets/images/3GDecoLogo-2.png";
import privacyLock from "../assets/images/lock.png";
import privacyBanner from "../assets/images/privacypolicybanner.jpg";
import privacy2img from "../assets/images/privacy2img.jpg";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import PageLoader from "../app/components/PageLoader";
import { loadPublicSiteCms } from "../content/publicCms";
import { useCmsPageGate } from "../hooks/useCmsPageGate";

export default function PrivacyPolicy() {
  const [openIndex, setOpenIndex] = useState(0);
  const { showLoader, fading } = useCmsPageGate((force) =>
    loadPublicSiteCms(force),
  );

  const accordionItems = [
    {
      title: "How We Use Information",
      content:
        "We use your information to respond to inquiries and provide our services efficiently.",
    },
    {
      title: "Data Security",
      content:
        "Your information is protected using modern security practices and safeguards.",
    },
    {
      title: "Cookies Policy",
      content:
        "Cookies help improve browsing experience and website performance.",
    },
    {
      title: "Third Party Sharing",
      content:
        "We never sell personal information and only share when necessary.",
    },
    {
      title: "Your Rights",
      content:
        "You may request access, modification, or deletion of your information.",
    },
    {
      title: "Contact Us",
      content: "Feel free to contact us regarding any privacy concerns.",
    },
  ];

  return (
    <>
      {showLoader && <PageLoader fading={fading} />}
      <div className="bg-[#F5F1EA] overflow-x-hidden">
        <Navbar />

        {/* HERO SECTION */}

        <section className="relative overflow-hidden mx-4 lg:mx-5 mt-[72px] lg:mt-[80px] rounded-[20px] md:rounded-[32px] min-h-[520px] sm:min-h-[640px] lg:min-h-[720px]">
          {/* Background */}
          <img
            src={privacyBanner}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Main Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Left Dark Gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(24,15,10,.95) 0%, rgba(24,15,10,.88) 25%, rgba(24,15,10,.45) 60%, rgba(24,15,10,.15) 100%)",
            }}
          />

          {/* Top Band */}
          <div
            className="
                  absolute
                  top-[90px]
                  top-[70px]
                  sm:top-[80px]
                  md:top-[95px]
                  lg:top-[125px]
                  left-0
                  lg:left-[200px]
                  h-[18px]
                  w-[90%]
                  lg:w-[720px]
                "
            style={{
              background: "rgba(0,0,0,.18)",
              backdropFilter: "blur(12px)",
            }}
          />

          <div
            className="
              relative
              z-30
              max-w-[1280px]
              mx-auto
              px-6
              min-h-[560px]
              sm:min-h-[620px]
              md:min-h-[680px]
              lg:min-h-[720px]
              flex
              flex-col
              lg:flex-row
              justify-start
              lg:justify-center
              items-center
              pt-30
              sm:pt-24            
              lg:pt-0
              gap-12
              lg:gap-24
            "
          >
            {/* LEFT CONTENT */}

            <div
              className="
                  order-2
                  lg:order-2
                  flex flex-col
                  items-center lg:items-start
                  text-center lg:text-left
                  max-w-[720px]                
                 
                  "
            >
              {/* Label */}
              <div
                className="
                    flex
                    items-center
                    justify-center
                    lg:justify-start
                    gap-3
                    mb-8
                  "
              >
                <div className="w-2 h-2 rounded-full bg-[#D89A2D]" />

                <span
                  className="uppercase text-[#D89A2D]"
                  style={{
                    fontFamily: "Parkinsans",
                    letterSpacing: ".38em",
                    fontSize: "14px",
                  }}
                >
                  Privacy Policy
                </span>
              </div>

              {/* Heading */}
              <h1
                className="
                    text-white
                    leading-[1.08]

                    text-[44px]
                    sm:text-[58px]
                    md:text-[70px]
                    lg:text-[82px]
                  "
                style={{
                  fontFamily: "Parkinsans",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                }}
              >
                Your Privacy
                <br />
                Matters to Us
              </h1>

              {/* Description */}
              <p
                className="
                    text-[#F0ECE6]
                    mt-10

                    text-[16px]
                    lg:text-[18px]

                    leading-9

                    max-w-[560px]
                    mx-auto
                    lg:mx-0
                  "
                style={{
                  fontFamily: "Parkinsans",
                }}
              >
                We are committed to protecting your personal information and
                your right to privacy.
              </p>
            </div>

            {/* RIGHT SHIELD */}

            <motion.div
              className="
                relative
                overflow-visible

                flex
                items-center
                justify-center

                mt-8
                sm:mt-10
                md:mt-12
                lg:mt-0

                w-[140px]
                h-[140px]

                sm:w-[180px]
                sm:h-[180px]

                md:w-[220px]
                md:h-[220px]

                lg:w-[250px]
                lg:h-[250px]

                lg:-translate-x-44
                xl:-translate-x-52
              "
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* BIG INNER GOLD GLOW */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(212,162,76,.55) 0%, rgba(212,162,76,.25) 40%, transparent 75%)",
                  filter: "blur(80px)",
                  animation: "pulseGlow 4s ease-in-out infinite",
                }}
              />

              {/* OUTER CIRCLE */}
              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border border-[#D89A2D]/40

                  w-[220px]
                  h-[220px]

                  sm:w-[280px]
                  sm:h-[280px]

                  lg:w-[380px]
                  lg:h-[380px]
                  "
              />

              <motion.div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border border-[#D89A2D]/20
                  w-[180px]
                  h-[180px]

                  sm:w-[240px]
                  sm:h-[240px]

                  lg:w-[320px]
                  lg:h-[320px]
                "
              />

              <motion.div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border border-[#D89A2D]/15
                  w-[160px]
                  h-[160px]

                  sm:w-[210px]
                  sm:h-[210px]

                  lg:w-[290px]
                  lg:h-[290px]
                "
              />

              <div
                className="
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2

                w-full
                h-full
              "
              >
                {/* SHIELD SVG */}
                <svg
                  viewBox="0 0 250 260"
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    z-20
                  "
                >
                  <defs>
                    <filter
                      id="shieldGlow"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feGaussianBlur stdDeviation="15" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    <radialGradient id="innerGlow">
                      <stop offset="0%" stopColor="#D89A2D" stopOpacity=".65" />
                      <stop
                        offset="50%"
                        stopColor="#D89A2D"
                        stopOpacity=".25"
                      />
                      <stop offset="100%" stopColor="#D89A2D" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* INNER GLOW */}
                  <ellipse
                    cx="125"
                    cy="130"
                    rx="95"
                    ry="105"
                    fill="url(#innerGlow)"
                  />

                  {/* GOLD SHIELD GLOW */}
                  <path
                    d="
                    M125 20
                    C160 45 195 55 215 60
                    V120
                    C215 185 175 225 125 245
                    C75 225 35 185 35 120
                    V60
                    C55 55 90 45 125 20
                  "
                    stroke="#D89A2D"
                    strokeWidth="15"
                    opacity=".45"
                    fill="none"
                    filter="url(#shieldGlow)"
                  />

                  {/* WHITE SHIELD */}
                  <path
                    d="
                    M125 20
                    C160 45 195 55 215 60
                    V120
                    C215 185 175 225 125 245
                    C75 225 35 185 35 120
                    V60
                    C55 55 90 45 125 20
                  "
                    stroke="white"
                    strokeWidth="5"
                    fill="none"
                  />
                </svg>

                {/* LOCK IMAGE */}
                <img
                  src={privacyLock}
                  alt=""
                  className="
                  absolute
                  left-1/2
                  top-1/2
                  -z-30
                  w-[88%]
                  sm:w-[95%]
                  lg:w-full
                  "
                  style={{
                    transform: "translate(-50%, -50%)",
                    filter: "drop-shadow(0 0 20px rgba(255,255,255,.35))",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {!showLoader && (
          <>
        {/* Main Section Layout + Left Card + Content Area */}

        <section className="bg-[#F8F5F0] py-20">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8">
            <div
              className="grid
              grid-cols-1
              lg:grid-cols-[280px_1fr]
              gap-10
              lg:gap-14"
            >
              {/* LEFT CARD */}
              <div>
                <div
                  className="
                  bg-white
                  rounded-[24px]
                  shadow-[0_10px_40px_rgba(0,0,0,.08)]
                  overflow-hidden"
                >
                  {accordionItems.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setOpenIndex(index)}
                      className={`
                      flex items-center justify-between
                      px-7 py-5
                      border-b border-[#ECE6DD]
                      cursor-pointer
                      transition-all
                      hover:bg-[#FCFAF7]

                      ${
                        openIndex === index ? "text-[#D89A2D] bg-[#FCFAF7]" : ""
                      }
                    `}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="
                          w-8 h-8
                          rounded-full
                          bg-[#F8F5F0]
                          flex items-center justify-center"
                        >
                          <span className="text-sm">✓</span>
                        </div>

                        <span
                          className="font-medium text-[15px]"
                          style={{
                            fontFamily: "Parkinsans",
                          }}
                        >
                          {item.title}
                        </span>
                      </div>

                      <span
                        className={`transition duration-300 ${
                          openIndex === index ? "rotate-90 text-[#D89A2D]" : ""
                        }`}
                      >
                        ›
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT CONTENT */}
              <div>
                <div
                  className="
                  grid
                  grid-cols-1
                  xl:grid-cols-[1fr_400px]
                  gap-10
                  items-center"
                >
                  {/* TEXT */}
                  <div>
                    <h2
                      className="
                      text-[34px]
                      md:text-[42px]
                      xl:text-[52px]
                      mb-6"
                      style={{
                        fontFamily: "Parkinsans",
                        fontWeight: 500,
                      }}
                    >
                      Information We Collect
                    </h2>

                    <p
                      className="text-[#666]"
                      style={{
                        fontFamily: "Parkinsans",
                      }}
                    >
                      We collect information you provide directly to us when
                      you:
                    </p>

                    <div className="mt-10 space-y-7">
                      <div className="flex gap-4 items-center">
                        <span className="text-[#D89A2D] text-xl">✓</span>
                        <span>Fill out forms on our website</span>
                      </div>

                      <div className="flex gap-4 items-center">
                        <span className="text-[#D89A2D] text-xl">✓</span>
                        <span>Request a consultation or quote</span>
                      </div>

                      <div className="flex gap-4 items-center">
                        <span className="text-[#D89A2D] text-xl">✓</span>
                        <span>Subscribe to our newsletter</span>
                      </div>

                      <div className="flex gap-4 items-center">
                        <span className="text-[#D89A2D] text-xl">✓</span>
                        <span>Communicate with our team</span>
                      </div>
                    </div>
                  </div>

                  {/* IMAGE */}
                  <div>
                    <div
                      className="
                  overflow-hidden
                  rounded-[30px]
                  shadow-[0_15px_50px_rgba(0,0,0,.1)]"
                    >
                      <img
                        src={privacy2img}
                        className="
                      w-full
                      h-[260px]
                      md:h-[320px]
                      xl:h-[400px]
                      object-cover
                      rounded-[30px]
                      "
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                {/* Accordion Section */}

                <div className="mt-12 space-y-4">
                  {accordionItems.map((item, index) => (
                    <div
                      key={index}
                      className="
                  bg-white
                  rounded-[20px]
                  border border-[#ECE6DD]
                  overflow-hidden
                  shadow-sm
                  "
                    >
                      {/* Header */}
                      <button
                        onClick={() =>
                          setOpenIndex(openIndex === index ? -1 : index)
                        }
                        className="
                    w-full
                    px-6 md:px-8
                    py-5
                    flex
                    items-center
                    justify-between
                    hover:bg-[#FCFAF7]
                    transition-all
                    "
                      >
                        <div className="flex items-center gap-5">
                          <div
                            className="
                        w-10 h-10
                        rounded-full
                        border border-[#DDD]
                        flex items-center justify-center
                        "
                          >
                            ✓
                          </div>

                          <span
                            className="text-[16px] md:text-[17px]"
                            style={{
                              fontFamily: "Parkinsans",
                              fontWeight: 500,
                            }}
                          >
                            {item.title}
                          </span>
                        </div>

                        <svg
                          className={`transition duration-300 ${
                            openIndex === index ? "rotate-180" : ""
                          }`}
                          width="20"
                          height="20"
                          fill="none"
                          stroke="#555"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>

                      {/* Content */}
                      <div
                        className={`
                      overflow-hidden
                      transition-all
                      duration-300
                      ${
                        openIndex === index
                          ? "max-h-[300px] px-8 pb-6"
                          : "max-h-0"
                      }
                    `}
                      >
                        <p
                          className="text-[#666] leading-8"
                          style={{
                            fontFamily: "Parkinsans",
                          }}
                        >
                          {item.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}

        <Footer />
          </>
        )}
      </div>
    </>
  );
}
