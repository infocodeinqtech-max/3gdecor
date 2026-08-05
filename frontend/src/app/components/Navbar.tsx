import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/images/3GDecoLogo-2.png";
import { getListContent } from "../../admin/utils/contentStorage";
import { seedNavigation } from "../../admin/data/seedContent";
import { subscribeCmsUpdated } from "../../content/cmsSync";
import {
  getCachedPublicSiteCms,
  loadPublicSiteCms,
  type PublicSiteCms,
} from "../../content/publicCms";

interface NavbarProps {
  activeNav?: string;
}

type NavItem = {
  id: number | string;
  label: string;
  link: string;
  order?: number;
  visible?: boolean;
};

function navKeyFromLink(link: string): string {
  const path = link.split("#")[0] || "/";
  if (path === "/" && link.includes("features")) return "features";
  // if (path === "/" && link.includes("projects")) return "projects";
  if (path === "/" || path === "") return "home";
  if (path.includes("about")) return "about";
  if (path.includes("services")) return "services";
  if (path.includes("contact")) return "contact";
  if (link.includes("features")) return "features";
  if (path.includes("projects")) return "projects";
  return path.replace(/^\//, "") || "home";
}

function navFromSite(site: PublicSiteCms | null): NavItem[] {
  const rows = (site?.navigation as NavItem[] | undefined) ?? [];
  if (!rows.length) return seedNavigation;
  const visible = rows
    .filter((r) => r.visible !== false)
    .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
  return visible.length ? visible : seedNavigation;
}

export default function Navbar({ activeNav }: NavbarProps) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>(() =>
    navFromSite(getCachedPublicSiteCms()),
  );

  useEffect(() => {
    const reload = (force: boolean) => {
      loadPublicSiteCms(force)
        .then((site) => {
          const rows = (site.navigation as NavItem[] | undefined) ?? [];
          if (rows.length) {
            const visible = rows
              .filter((r) => r.visible !== false)
              .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
            if (visible.length) {
              setNavItems(visible);
              return;
            }
          }
          return getListContent("navigation", seedNavigation).then((fallback) => {
            const visible = fallback
              .filter((r) => r.visible !== false)
              .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
            if (visible.length) setNavItems(visible);
          });
        })
        .catch(() => undefined);
    };
    reload(false);
    return subscribeCmsUpdated(() => reload(true));
  }, []);

  const menu = navItems.map((item) => ({
    id: navKeyFromLink(item.link),
    label: item.label,
    link: item.link,
  }));

  const resolvedActive =
    activeNav ??
    (location.pathname === "/about"
      ? "about"
      : location.pathname === "/services"
        ? "services"
        : location.pathname === "/projects"
          ? "projects"
          : location.pathname === "/contact"
            ? "contact"
            : "home");

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 z-50 w-screen bg-[#F5F1EA]"
        style={{ height: "72px" }}
      >
        <div className="max-w-[1720px] mx-auto h-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-full gap-3">
            <div className="flex items-center min-w-0 shrink-0">
              <Link to="/" className="block" onClick={() => setOpen(false)}>
                <img
                  src={logo}
                  alt="3G Decorative Group"
                  className="w-auto object-contain h-14 sm:h-16 lg:h-[72px]"
                />
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-8 xl:gap-16">
              {menu.map((item) => (
                <Link
                  key={`${item.id}-${item.link}`}
                  to={item.link}
                  className={`relative uppercase transition-all duration-500 ${
                    resolvedActive === item.id
                      ? "text-[#ea7a12]"
                      : "text-[#332C26] hover:text-[#ea7a12]"
                  }`}
                  style={{
                    fontFamily: "'Parkinsans', sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Link
                to="/contact"
                className="hidden sm:inline-flex px-5 md:px-8 lg:px-10 py-2.5 md:py-3.5 rounded-full text-white text-sm md:text-base"
                style={{
                  background: "linear-gradient(135deg,#f4b223 0%,#ea7a12 100%)",
                  fontFamily: "'Parkinsans', sans-serif",
                }}
              >
                Book Consultation
              </Link>

              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#332C26]/15 text-[#332C26]"
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <button
              type="button"
              aria-label="Close menu overlay"
              className="absolute inset-0 bg-[#332C26]/45 backdrop-blur-[2px]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="absolute top-0 right-0 h-full w-[min(100%,360px)] bg-[#F5F1EA] shadow-2xl pt-[88px] px-6 pb-8 flex flex-col"
            >
              <nav className="flex flex-col gap-1">
                {menu.map((item) => (
                  <Link
                    key={`m-${item.id}-${item.link}`}
                    to={item.link}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-4 py-3.5 uppercase tracking-[0.14em] text-sm font-semibold transition-colors ${
                      resolvedActive === item.id
                        ? "text-[#ea7a12] bg-[#ea7a12]/10"
                        : "text-[#332C26] hover:bg-[#332C26]/5"
                    }`}
                    style={{ fontFamily: "'Parkinsans', sans-serif" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-auto inline-flex items-center justify-center rounded-full px-6 py-3.5 text-white text-sm font-semibold"
                style={{
                  background: "linear-gradient(135deg,#f4b223 0%,#ea7a12 100%)",
                  fontFamily: "'Parkinsans', sans-serif",
                }}
              >
                Book Consultation
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
