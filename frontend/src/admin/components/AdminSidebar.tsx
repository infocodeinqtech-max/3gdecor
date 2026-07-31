import { useState, useMemo } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { LogOut, Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  ASSIGNABLE_MENUS,
  HOME_PAGE_SECTION_GROUP,
  STANDALONE_ASSIGNABLE_MENUS,
  SUPERADMIN_MENUS,
} from "../data/permissions";
import logo from "../../assets/images/3GDecoLogo-2.png";

export default function AdminSidebar() {
  const { logout, hasPermission, isSuperAdmin } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [homeSectionOpen, setHomeSectionOpen] = useState(true);

  const links = useMemo(() => {
    const items = ASSIGNABLE_MENUS.filter((m) => hasPermission(m.id));
    if (isSuperAdmin) return [...items, ...SUPERADMIN_MENUS];
    return items;
  }, [hasPermission, isSuperAdmin]);

  const standaloneLinks = useMemo(() => {
    const base = links.filter((item) =>
      STANDALONE_ASSIGNABLE_MENUS.some((m) => m.id === item.id),
    );
    // Super Admin: Admin Users after Enquiries / other standalone items
    const users = isSuperAdmin
      ? SUPERADMIN_MENUS.filter((m) => links.some((l) => l.id === m.id))
      : [];
    return [...base, ...users];
  }, [links, isSuperAdmin]);

  const homeSectionLinks = useMemo(
    () => links.filter((item) => HOME_PAGE_SECTION_GROUP.items.some((m) => m.id === item.id)),
    [links],
  );

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const NavContent = () => (
    <>
      <div className="px-4 pt-6 pb-5 border-b border-[#E8DFD2] flex flex-col items-center">
        <Link to="/" className="w-full flex items-center justify-center min-h-[5rem]">
          <img
            src={logo}
            alt="3G Decorative Group"
            className="h-20 w-auto max-w-[200px] object-contain"
          />
        </Link>
        <p className="text-center text-xs admin-sidebar-title mt-3 uppercase font-medium">
          Admin Panel
        </p>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {standaloneLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all admin-nav-link ${
                  isActive ? "admin-nav-link--active font-medium" : ""
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          );
        })}

        {homeSectionLinks.length > 0 && (
          <div className="mt-2 rounded-xl border border-[#E8DFD2] bg-[#FAF7F2]/60">
            <button
              type="button"
              onClick={() => setHomeSectionOpen((prev) => !prev)}
              className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-[#3A3028] hover:bg-[#F5EFE6] rounded-xl transition-colors"
            >
              <span>{HOME_PAGE_SECTION_GROUP.label}</span>
              <ChevronDown
                className={`w-4 h-4 text-[#8A8177] transition-transform ${
                  homeSectionOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {homeSectionOpen && (
              <div className="px-2 pb-2 space-y-1">
                {homeSectionLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      end={item.end}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `ml-2 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all admin-nav-link ${
                          isActive ? "admin-nav-link--active font-medium" : ""
                        }`
                      }
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </nav>
      <div className="p-4 border-t border-[#E8DFD2]">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg admin-mobile-menu-btn"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>

      <motion.aside
        className="hidden lg:flex w-64 min-h-screen admin-sidebar border-r flex-col fixed left-0 top-0 z-40"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <NavContent />
      </motion.aside>

      {open && (
        <motion.aside
          className="lg:hidden fixed inset-y-0 left-0 w-64 admin-sidebar z-40 flex flex-col border-r"
          initial={{ x: -300 }}
          animate={{ x: 0 }}
        >
          <NavContent />
        </motion.aside>
      )}
    </>
  );
}
