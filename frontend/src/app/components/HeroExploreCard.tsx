import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface HeroExploreCardProps {
  icon: React.ReactNode;
  title: string;
  //   position: "left" | "right";
  onClick?: () => void;
}

export default function HeroExploreCard({
  icon,
  title,
  //   position,
  onClick,
}: HeroExploreCardProps) {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
        rotate: [0, 0.3, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative"
    >
      <motion.div
        whileHover={{
          y: -10,
          scale: 1.03,
        }}
        transition={{ duration: 0.35 }}
        onClick={onClick}
        className="
          relative
          overflow-hidden
          cursor-pointer

          w-[200px]
          xl:w-[195px]
          2xl:w-[205px]

          h-[355px]
          xl:h-[340px]

          rounded-[34px]
        "
        style={{
          border: "1px solid rgba(216,166,75,.22)",

          background: `
                linear-gradient(
                180deg,
                rgba(255,255,255,.08),
                rgba(25,22,18,.16),
                rgba(18,18,18,.22)
                )

          `,

          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",

          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,.05),
            inset 0 80px 120px rgba(215,166,75,.03),
            0 25px 70px rgba(0,0,0,.30)
          `,
        }}
      >
        {/* Metallic Reflection */}

        <div
          className="absolute left-0 top-0 bottom-0 w-10"
          style={{
            background: `
                linear-gradient(
                90deg,
                rgba(255,255,255,.26),
                rgba(255,255,255,.08),
                transparent
                )
                `,
            filter: "blur(2px)",
          }}
        />

        {/* Warm Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(
                180deg,
                rgba(215,166,75,.03),
                transparent 35%,
               rgba(0,0,0,.05)
              )
            `,
          }}
        />

        {/* Dark Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center,transparent 58%,rgba(0,0,0,.08) 82%,rgba(0,0,0,.12) 100%)",

            //   "radial-gradient(circle at center,transparent 48%,rgba(0,0,0,.18))",
          }}
        />

        <div
          className="
            relative
            z-20
            h-full
            flex
            flex-col
            items-center
            pt-9
          "
        >
          {/* ================= ICON ================= */}

          <div className="relative flex items-center justify-center w-[110px] h-[110px]">
            {/* Outer Glow */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.45, 0.18, 0.45],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
              }}
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(216,166,75,.08), transparent 72%)",

                filter: "blur(2px)",
              }}
            />

            {/* Rotating Ring */}

            {/* ================= STATIC RING ================= */}

            <div
              className="absolute rounded-full"
              style={{
                width: 98,
                height: 98,
                border: "1px solid rgba(216,166,75,.28)",
              }}
            />

            {/* ================= INNER RING ================= */}

            <div
              className="absolute rounded-full"
              style={{
                width: 78,
                height: 78,
                border: "1px solid rgba(216,166,75,.12)",
              }}
            />

            {/* ================= ROTATING ARC ================= */}

            <motion.svg
              width="98"
              height="98"
              viewBox="0 0 98 98"
              animate={{ rotate: 360 }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute"
            >
              <defs>
                <linearGradient id="ringGlow">
                  <stop offset="0%" stopColor="rgba(216,166,75,0)" />
                  <stop offset="35%" stopColor="#FFE08A" />
                  <stop offset="50%" stopColor="#FFD15A" />
                  <stop offset="65%" stopColor="#FFE08A" />
                  <stop offset="100%" stopColor="rgba(216,166,75,0)" />
                </linearGradient>
              </defs>

              <circle
                cx="49"
                cy="49"
                r="44"
                fill="none"
                stroke="url(#ringGlow)"
                strokeWidth="1.5"
                strokeDasharray="55 221"
                strokeLinecap="round"
                style={{
                  filter: "drop-shadow(0 0 2px rgba(255,215,122,.35))",
                }}
              />
            </motion.svg>

            <motion.div
              animate={{
                scale: [1, 1.04, 1],
                opacity: [0.16, 0.03, 0.16],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="absolute inset-0 rounded-full"
              style={{
                border: "1px solid rgba(216,166,75,.18)",
              }}
            />

            {/* Icon Circle */}

            <motion.div
              whileHover={{
                scale: 1.06,
              }}
              className="
              relative
              z-20

              w-[85px]
              h-[85px]

              rounded-full

              flex
              items-center
              justify-center
            "
              style={{
                background: `
radial-gradient(
circle at 35% 30%,
rgba(255,228,160,.18) 0%,
rgba(216,166,75,.10) 55%,
rgba(216,166,75,.02) 100%
)
`,

                border: "1.5px solid rgba(255,220,140,.85)",

                boxShadow: `
0 0 6px rgba(255,215,110,.28),
0 0 14px rgba(255,215,110,.12),
inset 0 0 12px rgba(255,255,255,.04)
`,
              }}
              //   style={{
              //     background:
              //       "radial-gradient(circle at 35% 30%, rgba(255,220,130,.22), rgba(216,166,75,.04))",

              //     border: "1px solid rgba(216,166,75,.65)",

              //     boxShadow: `
              //     0 0 18px rgba(216,166,75,.45),
              //     inset 0 0 18px rgba(255,255,255,.05)
              //   `,
              //   }}
            >
              <div
                style={{
                  color: "#D8A64B",
                }}
              >
                {icon}
              </div>
            </motion.div>

            {/* Ripple */}

            <motion.div
              animate={{
                scale: [1, 1.6],
                opacity: [0.25, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="
              absolute
              w-[72px]
              h-[72px]
              rounded-full
            "
              style={{
                border: "1px solid rgba(216,166,75,.12)",
              }}
            />
          </div>

          {/* ================= TITLE ================= */}

          <h3
            className="mt-6 text-center uppercase text-[#E7B95C]"
            style={{
              fontFamily: "'Parkinsans', sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              lineHeight: "1.5",
              letterSpacing: ".04em",
              whiteSpace: "pre-line",
            }}
          >
            {title}
          </h3>

          <div
            className="mt-4 w-25 h-px"
            style={{
              background:
                "linear-gradient(90deg,transparent,#D8A64B,transparent)",
            }}
          />
          {/* ================= EXPLORE ================= */}

          <motion.div
            className="mt-auto mb-8 flex flex-col items-center"
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            {/* Animated Chevron */}

            <motion.div
              animate={{
                opacity: [0.7, 1, 0.7],
                y: [0, 5, 0],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
              }}
            >
              <ChevronDown
                size={22}
                color="#FFF4C8"
                strokeWidth={2.2}
                style={{
                  filter: "drop-shadow(0 0 4px rgba(255,220,120,.45))",
                }}
              />
            </motion.div>

            <motion.div
              animate={{
                opacity: [0.55, 0.95, 0.55],
                y: [0, 7, 0],
              }}
              transition={{
                duration: 1.4,
                delay: 0.2,
                repeat: Infinity,
              }}
              className="-mt-2"
            >
              <ChevronDown
                size={22}
                color="#FFF4C8"
                strokeWidth={2.2}
                style={{
                  filter: "drop-shadow(0 0 4px rgba(255,220,120,.45))",
                }}
              />
            </motion.div>

            <motion.div
              animate={{
                opacity: [0.4, 0.85, 0.4],
                y: [0, 9, 0],
              }}
              transition={{
                duration: 1.4,
                delay: 0.4,
                repeat: Infinity,
              }}
              className="-mt-3"
            >
              <ChevronDown
                size={26}
                color="#FFF4C8"
                strokeWidth={2.2}
                style={{
                  filter: "drop-shadow(0 0 4px rgba(255,220,120,.45))",
                }}
              />
            </motion.div>

            <motion.p
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="mt-6 text-center"
              style={{
                color: "#FFFFFF",
                fontFamily: "'Parkinsans', sans-serif",
                fontSize: "15px",
                letterSpacing: ".02em",
                fontWeight: 600,
              }}
            >
              Click to Explore
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom Gold Glow */}

        {/* <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(216,166,75,.16), transparent)",
          }}
        /> */}
        <div
          className="absolute bottom-[52px] w-16 h-16 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,215,120,.18), transparent 72%)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
