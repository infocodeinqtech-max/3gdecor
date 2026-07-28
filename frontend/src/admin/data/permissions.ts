import {
  LayoutDashboard,
  Menu,
  Sparkles,
  Info,
  Lightbulb,
  FolderKanban,
  Wrench,
  GitBranch,
  MessageSquare,
  LayoutTemplate,
  Mail,
  Users,
  MapPin,
  type LucideIcon,
} from "lucide-react";

export const ROLES = {
  SUPERADMIN: "superadmin",
  ADMIN: "admin",
} as const;

export type MenuId =
  | "dashboard"
  | "navigation"
  | "hero"
  | "about"
  | "expertise"
  | "projects"
  | "services"
  | "process"
  | "testimonials"
  | "footer"
  | "contact-offices"
  | "enquiries"
  | "users"
  | "profile";

export interface AdminMenuItem {
  id: MenuId;
  path: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

export interface AdminMenuGroup {
  id: "home-page-section";
  label: string;
  items: AdminMenuItem[];
}

export const ASSIGNABLE_MENUS: AdminMenuItem[] = [
  { id: "dashboard", path: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { id: "navigation", path: "/admin/navigation", label: "Navigation Menu", icon: Menu },
  { id: "hero", path: "/admin/hero", label: "Hero Section", icon: Sparkles },
  { id: "about", path: "/admin/about", label: "About Section", icon: Info },
  { id: "expertise", path: "/admin/expertise", label: "Expertise", icon: Lightbulb },
  { id: "projects", path: "/admin/projects", label: "Projects", icon: FolderKanban },
  { id: "services", path: "/admin/services", label: "Services", icon: Wrench },
  { id: "process", path: "/admin/process", label: "Our Process", icon: GitBranch },
  { id: "testimonials", path: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { id: "footer", path: "/admin/footer", label: "Footer", icon: LayoutTemplate },
  { id: "contact-offices", path: "/admin/contact-offices", label: "Contact Offices", icon: MapPin },
  { id: "enquiries", path: "/admin/enquiries", label: "Enquiries", icon: Mail },
];

export const SUPERADMIN_MENUS: AdminMenuItem[] = [
  { id: "users", path: "/admin/users", label: "Admin Users", icon: Users },
];

export const HOME_PAGE_SECTION_MENU_IDS: MenuId[] = [
  "navigation",
  "hero",
  "about",
  "expertise",
  "projects",
  "services",
  "process",
  "testimonials",
];

export const HOME_PAGE_SECTION_GROUP: AdminMenuGroup = {
  id: "home-page-section",
  label: "Home Page Section",
  items: ASSIGNABLE_MENUS.filter((menu) =>
    HOME_PAGE_SECTION_MENU_IDS.includes(menu.id),
  ),
};

export const STANDALONE_ASSIGNABLE_MENUS: AdminMenuItem[] = ASSIGNABLE_MENUS.filter(
  (menu) => !HOME_PAGE_SECTION_MENU_IDS.includes(menu.id),
);

export function getMenuIdFromPath(pathname: string): MenuId | null {
  if (!pathname.startsWith("/admin")) return null;
  const segment = pathname.replace(/^\/admin\/?/, "").split("/")[0];
  if (!segment) return "dashboard";
  if (segment === "profile") return "profile";
  return segment as MenuId;
}

export function getDefaultPermissions(): MenuId[] {
  return ASSIGNABLE_MENUS.map((m) => m.id);
}
