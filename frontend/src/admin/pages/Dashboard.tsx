import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DashboardCards, { type DashboardCard } from "../components/DashboardCards";
import { useAuth } from "../../context/AuthContext";
import {
  ASSIGNABLE_MENUS,
  SUPERADMIN_MENUS,
  type MenuId,
} from "../data/permissions";
import { apiRequest } from "../../api/client";
import { getListContent } from "../utils/contentStorage";
import { subscribeCmsUpdated } from "../../content/cmsSync";

type DashCounts = Record<string, number>;

function getOverviewValue(menuId: MenuId, counts: DashCounts): string {
  switch (menuId) {
    case "navigation":
      return String(counts.navigation ?? 0);
    case "hero":
    case "about":
    case "footer":
      return "1";
    case "expertise":
      return String(counts.expertise ?? 0);
    case "projects":
      return String(counts.projects ?? 0);
    case "services":
      return String(counts.services ?? 0);
    case "process":
      return String(counts.process ?? 0);
    case "testimonials":
      return String(counts.testimonials ?? 0);
    case "contact-offices":
      return String(counts.contact_offices ?? 0);
    case "enquiries":
      return String(counts.new_enquiries ?? 0);
    case "users":
      return String(counts.users ?? 0);
    default:
      return "—";
  }
}

export default function Dashboard() {
  const { hasPermission, isSuperAdmin } = useAuth();
  const [counts, setCounts] = useState<DashCounts>({});
  const [recentEnquiries, setRecentEnquiries] = useState<
    { id: string; name: string; email: string; service?: string; status?: string }[]
  >([]);

  useEffect(() => {
    const reload = () => {
      apiRequest<{ data: DashCounts }>("/dashboard")
        .then((res) => setCounts(res.data || {}))
        .catch(() => undefined);

      getListContent("enquiries", [])
        .then((rows) =>
          setRecentEnquiries(rows.slice(0, 4) as typeof recentEnquiries),
        )
        .catch(() => undefined);
    };
    reload();
    return subscribeCmsUpdated(reload);
  }, []);

  const permittedMenus = useMemo(() => {
    const items = ASSIGNABLE_MENUS.filter(
      (m) => m.id === "dashboard" || hasPermission(m.id),
    );
    if (isSuperAdmin) {
      return [...items, ...SUPERADMIN_MENUS];
    }
    return items;
  }, [hasPermission, isSuperAdmin]);

  const cards: DashboardCard[] = permittedMenus
    .filter((m) => m.id !== "dashboard")
    .map((m) => ({
      icon: m.icon,
      label: m.label,
      value: getOverviewValue(m.id, counts),
      path: m.path,
      trend:
        m.id === "enquiries"
          ? "New"
          : m.id === "users"
            ? "Active"
            : "Manage",
    }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold admin-page-title">Dashboard</h1>
        <p className="text-sm admin-card-muted mt-1">
          Welcome to the admin dashboard. Here you can manage your website content, view recent enquiries, and monitor key metrics.
        </p>
      </div>

      <DashboardCards cards={cards} />

      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#2A211C]">Recent Enquiries</h2>
          {hasPermission("enquiries") && (
            <Link to="/admin/enquiries" className="text-sm text-[#C4973B]">
              View all
            </Link>
          )}
        </div>
        <div className="admin-card rounded-2xl overflow-hidden">
          {recentEnquiries.length === 0 ? (
            <p className="p-6 text-sm text-[#8A8177]">No enquiries yet.</p>
          ) : (
            <ul className="divide-y divide-[#EDE4D8]">
              {recentEnquiries.map((e) => (
                <li key={e.id} className="px-6 py-4 flex justify-between gap-4">
                  <div>
                    <p className="font-medium text-[#2A211C]">{e.name}</p>
                    <p className="text-sm text-[#8A8177]">
                      {e.email} · {e.service || "General"}
                    </p>
                  </div>
                  <span className="text-xs text-[#C4973B] shrink-0">
                    {e.status || "New"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
