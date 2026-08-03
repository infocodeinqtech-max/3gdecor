import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Home, ArrowLeft } from "lucide-react";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import PageLoader from "../app/components/PageLoader";
import { loadPublicSiteCms } from "../content/publicCms";
import { useCmsPageGate } from "../hooks/useCmsPageGate";

type NotFoundProps = {
  /** Compact layout without public navbar/footer (e.g. admin shell). */
  embed?: boolean;
  title?: string;
  description?: string;
};

export default function NotFound({
  embed = false,
  title = "Page not found",
  description = "The page you are looking for doesn’t exist, was moved, or the link is incorrect.",
}: NotFoundProps) {
  const { showLoader, fading } = useCmsPageGate((force) =>
    embed ? Promise.resolve() : loadPublicSiteCms(force),
  );

  const content = (
    <div className="relative z-[1] max-w-xl mx-auto text-center px-4 py-16 md:py-24">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm font-semibold tracking-[0.2em] uppercase text-[#c48a1a]"
      >
        Error 404
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mt-3 text-3xl md:text-5xl font-bold text-[#2A211C]"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-4 text-[#6E655C] leading-relaxed"
      >
        {description}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <Link
          to={embed ? "/admin" : "/"}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl admin-btn-gold font-medium text-sm"
        >
          <Home className="w-4 h-4" />
          {embed ? "Go to Dashboard" : "Go to Home"}
        </Link>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#E0D5C8] text-sm text-[#332C26] hover:bg-white/70"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back
        </button>
      </motion.div>
    </div>
  );

  if (embed) {
    return (
      <div className="rounded-2xl border border-[#E8DFD2] bg-[#FAF7F2]/80">
        {content}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EE] flex flex-col">
      {showLoader && <PageLoader fading={fading} />}
      <Navbar />
      <main className="flex-1 relative overflow-hidden">
        <div className="absolute top-1/4 -left-24 w-64 h-64 rounded-full bg-[#f3bb27]/15 blur-[90px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-24 w-72 h-72 rounded-full bg-[#ea7a12]/10 blur-[100px] pointer-events-none" />
        {content}
      </main>
      <Footer />
    </div>
  );
}
