/* ─── Principles ─── */

import { Heart, Lightbulb, Target } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Principle } from "../../../admin/data/seedContent";
import { iconRegistry } from "../../../admin/data/iconOptions";


// const principles = [
//   {
//     icon: <Lightbulb className="size-5" />,
//     title: "Vision-Led Design",
//     description:
//       "We begin with listening — understanding your operations, brand, and people before a single line is drawn.",
//   },
//   {
//     icon: <Heart className="size-5" />,
//     title: "Built to Last",
//     description:
//       "From heavy-duty civil builds to refined corporate fit-outs, we specify materials that endure real-world use.",
//   },
//   {
//     icon: <Target className="size-5" />,
//     title: "On Time. On Budget.",
//     description:
//       "Turnkey project management from concept to handover, with zero surprises at delivery.",
//   },
// ];

type PrincipleProps = {
  principles: Principle[];
};

export default function PrinciplesSection({ principles }: PrincipleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.18 });

  console.log("principles", principles);

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
                {(() => {
                  const Icon = iconRegistry[p.icon];
                  return Icon ? <Icon className="size-5" /> : null;
                })()}
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