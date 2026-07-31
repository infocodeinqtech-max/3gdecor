import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";

import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

import { useNavigate } from "react-router-dom";

// function HeroSection({ project }: { project: any }) {
//   const navigate = useNavigate();
//   return (
//     <section
//       className="bg-[#F5F1EA] px-4 lg:px-5 pt-5"
//       style={{ position: "relative" }}
//     >
//       <div
//         className="
//         relative
//         overflow-hidden
//         rounded-[24px]
//         md:rounded-[34px]
//         min-h-[90vh]
//         lg:min-h-[860px]
//         "
//       >
//         {/* Background */}

//         <div className="absolute inset-0">
//           <img
//             src={project.heroImage}
//             alt={project.title}
//             className="w-full h-full object-cover"
//           />

//           {/* Overlay */}

//           <div
//             className="absolute inset-0"
//             style={{
//               background: `
//               radial-gradient(circle at 18% 80%,
//               rgba(8,6,5,.98) 0%,
//               rgba(8,6,5,.92) 25%,
//               rgba(8,6,5,.72) 42%,
//               rgba(8,6,5,.28) 68%,
//               rgba(8,6,5,0) 100%),

//               linear-gradient(
//               90deg,
//               rgba(8,6,5,.92) 0%,
//               rgba(8,6,5,.72) 28%,
//               rgba(8,6,5,.35) 48%,
//               rgba(8,6,5,0) 100%)
//             `,
//             }}
//           />
//         </div>

//         {/* Gold Bar */}

//         <div
//           className="absolute top-0 left-0 right-0 h-[3px] z-20"
//           style={{
//             background: "linear-gradient(90deg,#f3bb27,#ea7a12,#f3bb27)",
//           }}
//         />

//         {/* Back */}

//         <button
//           onClick={() => navigate("/projects")}
//           className="
//           absolute
//           top-10
//           left-10
//           z-30
//           flex
//           items-center
//           gap-3
//           text-white/90
//           hover:text-[#f3bb27]
//           transition
//           "
//         >
//           <ArrowLeft size={18} />

//           <span className="text-sm tracking-wide">Back to Projects</span>
//         </button>

//         {/* Logo */}

//         <img
//           src="/logo-light.png"
//           alt="Logo"
//           className="
//           absolute
//           top-8
//           right-10
//           w-24
//           z-30
//           "
//         />

//         {/* Hero Content */}

//         <div
//           className="
//           relative
//           z-20
//           max-w-7xl
//           mx-auto
//           h-full
//           flex
//           items-center
//           px-8
//           lg:px-16
//           "
//         >
//           <div className="max-w-3xl mt-24">
//             {/* Category */}

//             <motion.p
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7 }}
//               className="
//               uppercase
//               tracking-[0.4em]
//               text-[#D9A441]
//               text-xs
//               mb-8
//               "
//             >
//               {project.category}
//             </motion.p>

//             {/* Title */}

//             <motion.h1
//               initial={{ opacity: 0, y: 60 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.9 }}
//               className="
//               text-white
//               font-light
//               leading-[0.9]
//               tracking-[-0.04em]
//               text-[60px]
//               md:text-[90px]
//               "
//               style={{
//                 fontFamily: "'Cormorant Garamond', serif",
//               }}
//             >
//               {project.title}
//             </motion.h1>

//             {/* Location */}

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4 }}
//               className="
//               flex
//               items-center
//               gap-3
//               mt-10
//               text-[#F5F5F5]
//               "
//             >
//               <MapPin size={18} className="text-[#D9A441]" />

//               <span className="text-lg">{project.location}</span>
//             </motion.div>

//             {/* Gold Line */}

//             <div className="mt-10 w-20 h-[2px] bg-[#D9A441]" />
//           </div>
//         </div>

//         {/* Bottom Counter */}

//         <div
//           className="
//           absolute
//           bottom-10
//           left-1/2
//           -translate-x-1/2
//           z-30
//           flex
//           items-center
//           gap-4
//           text-white
//           "
//         >
//           <span className="text-lg">
//             {String(project.current).padStart(2, "0")}
//           </span>

//           <div className="w-12 h-px bg-white/40" />

//           <span className="text-white/70 text-lg">
//             {String(project.total).padStart(2, "0")}
//           </span>
//         </div>

//         {/* Prev Next */}

//         <div
//           className="
//           absolute
//           bottom-0
//           right-0
//           z-30
//           flex
//           "
//         >
//           <button
//             onClick={onPrevious}
//             className="
//             w-24
//             h-24
//             bg-black/50
//             hover:bg-[#D9A441]
//             transition
//             flex
//             items-center
//             justify-center
//             "
//           >
//             <ArrowLeft color="white" />
//           </button>

//           <button
//             onClick={onNext}
//             className="
//             w-24
//             h-24
//             bg-black/65
//             hover:bg-[#D9A441]
//             transition
//             flex
//             items-center
//             justify-center
//             "
//           >
//             <ArrowRight color="white" />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

export default function ProjectDetail() {
  const navigate = useNavigate();

  const project = {
    title: "Tech Mahindra Headquarters",
    category: "Corporate Interiors",
    location: "Kolkata, India",
    heroImage: "/images/projects/banner.jpg",
    current: 1,
    total: 5,
  };

  return (
    <>
      <Navbar activeNav="projects" />

      <div
        className="w-full overflow-x-hidden"
        style={{ fontFamily: "'Parkinsans', sans-serif" }}
      >
        {/* HERO SECTION */}

        {/* <HeroSection project={project} /> */}

        {/* ABOUT PROJECT */}

        {/* GALLERY */}

        {/* DESIGN */}
      </div>

      <Footer />
    </>
  );
}
