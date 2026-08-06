/* ─── Team ─── */

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { mediaUrl } from "../../../utils/mediaUrl";
import { loadPublicCmsList } from "../../../content/publicCms";
import type { FounderMember } from "../../../admin/data/seedContent";


// const teamMembers = [
//   {
//     name: "Priya Sharma",
//     role: "Founder & Creative Director",
//     quote: '"Every space tells a story."',
//     image: mediaUrl("/uploads/pages/about/team-1.jpg"),
//   },
//   {
//     name: "Arjun Mehta",
//     role: "Principal Architect",
//     quote: '"Structure is silent poetry."',
//     image: mediaUrl("/uploads/pages/about/team-2.jpg"),
//   },
//   {
//     name: "Rahul Nair",
//     role: "Senior Interior Designer",
//     quote: '"Details make perfection."',
//     image: mediaUrl("/uploads/pages/about/team-3.jpg"),
//   },
//   {
//     name: "Kavya Reddy",
//     role: "Project Lead & Stylist",
//     quote: '"Function shapes the soul."',
//     image: mediaUrl("/uploads/pages/about/team-4.jpg"),
//   },
// ];

type TeamSectionProps = {
  teamMembers: FounderMember[];
};

export default function TeamSection({ teamMembers }: TeamSectionProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  console.log("teamMembers:", teamMembers);

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
                        {m.short_description}
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
                {m.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}