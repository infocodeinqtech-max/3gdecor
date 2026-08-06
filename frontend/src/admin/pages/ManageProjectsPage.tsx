import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminCrudPage from "../components/AdminCrudPage";
import ImageUpload from "../components/ImageUpload";
import {
  seedProjectsPage,
  seedProjectsPageCategories,
  seedProjectsPageItems,
  type ProjectsPageContent,
  type ProjectsPageStat,
} from "../data/seedContent";
import { getContent, setContent } from "../utils/contentStorage";
import { mediaUrl } from "../../utils/mediaUrl";
import { MEDIA_MAX_SIZE_MB } from "../utils/mediaUploadRules";
import { toAdminErrorMessage } from "../../utils/publicError";

type Tab = "hero" | "categories" | "items";

const tabBtn = (active: boolean) =>
  `rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
    active
      ? "bg-[linear-gradient(135deg,rgba(244,178,35,0.14),rgba(234,122,18,0.1))] text-[#8a5a12] border border-[rgba(212,166,75,0.35)]"
      : "border border-transparent text-[#6e655c] hover:bg-[#f0e9df] hover:text-[#332c26]"
  }`;

export default function ManageProjectsPage() {
  const [tab, setTab] = useState<Tab>("hero");
  const [form, setForm] = useState<ProjectsPageContent>(seedProjectsPage);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let alive = true;
    getContent<ProjectsPageContent>("projects-page", seedProjectsPage)
      .then((data) => {
        if (!alive) return;
        setForm({
          ...seedProjectsPage,
          ...data,
          stats:
            Array.isArray(data.stats) && data.stats.length
              ? data.stats
              : seedProjectsPage.stats,
        });
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const updateField = <K extends keyof ProjectsPageContent>(
    key: K,
    value: ProjectsPageContent[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateStat = (
    index: number,
    field: keyof ProjectsPageStat,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      stats: prev.stats.map((stat, i) =>
        i === index ? { ...stat, [field]: value } : stat,
      ),
    }));
  };

  const addStat = () => {
    setForm((prev) => ({
      ...prev,
      stats: [
        ...prev.stats,
        { id: Date.now(), number: "0+", title: "New Stat", icon: "Briefcase" },
      ],
    }));
  };

  const removeStat = (index: number) => {
    setForm((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setContent("projects-page", form);
      toast.success("Projects page content saved.");
    } catch (err) {
      toast.error(toAdminErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTab("hero")}
          className={tabBtn(tab === "hero")}
        >
          Hero & Sections
        </button>
        <button
          type="button"
          onClick={() => setTab("categories")}
          className={tabBtn(tab === "categories")}
        >
          Categories
        </button>
        <button
          type="button"
          onClick={() => setTab("items")}
          className={tabBtn(tab === "items")}
        >
          Featured Project Cards
        </button>
      </div>

      {tab === "hero" ? (
        <div className="space-y-8">
          <div className="admin-card rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-[#2A211C]">
                Projects Page Hero & Sections
              </h1>
              <p className="mt-1 text-sm text-[#6e655c]">
                Manage banner, hero copy, stats, category headings and featured
                section text for /projects.
              </p>
            </div>

            {loading ? (
              <p className="text-sm text-[#6e655c]">Loading…</p>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#2A211C] mb-2">
                      Banner Image
                    </label>
                    <ImageUpload
                      label=""
                      value={form.bannerImage}
                      onChange={(v) => updateField("bannerImage", v)}
                      maxSizeMb={MEDIA_MAX_SIZE_MB}
                      section="pages/projects"
                      recommendedWidth={1920}
                      recommendedHeight={1080}
                      imageHint="Full-width projects page hero banner."
                    />
                  </div>
                  {(
                    [
                      ["heroEyebrow", "Hero Eyebrow"],
                      ["heroTitlePrefix", "Hero Title Prefix"],
                      ["heroTitleHighlight", "Hero Title Highlight"],
                    ] as const
                  ).map(([name, label]) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-[#2A211C] mb-2">
                        {label}
                      </label>
                      <input
                        value={form[name]}
                        onChange={(e) => updateField(name, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl admin-input"
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#2A211C] mb-2">
                      Hero Description 1
                    </label>
                    <textarea
                      rows={3}
                      value={form.heroDescription1}
                      onChange={(e) =>
                        updateField("heroDescription1", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl admin-input resize-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#2A211C] mb-2">
                      Hero Description 2
                    </label>
                    <textarea
                      rows={3}
                      value={form.heroDescription2}
                      onChange={(e) =>
                        updateField("heroDescription2", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl admin-input resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-4 border-t border-[#E8DFD2] pt-6">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-semibold text-[#2A211C]">Hero Stats</h2>
                    <button
                      type="button"
                      onClick={addStat}
                      className="rounded-xl px-3 py-2 text-sm border border-[#D4A24C]/35 text-[#8a5a12]"
                    >
                      Add Stat
                    </button>
                  </div>
                  {form.stats.map((stat, index) => (
                    <div
                      key={stat.id}
                      className="grid sm:grid-cols-[1fr_1.4fr_1fr_auto] gap-3 items-center"
                    >
                      <input
                        value={stat.number}
                        onChange={(e) =>
                          updateStat(index, "number", e.target.value)
                        }
                        placeholder="250+"
                        className="px-4 py-3 rounded-xl admin-input"
                      />
                      <input
                        value={stat.title}
                        onChange={(e) =>
                          updateStat(index, "title", e.target.value)
                        }
                        placeholder="Projects Delivered"
                        className="px-4 py-3 rounded-xl admin-input"
                      />
                      <input
                        value={stat.icon || ""}
                        onChange={(e) =>
                          updateStat(index, "icon", e.target.value)
                        }
                        placeholder="Briefcase"
                        className="px-4 py-3 rounded-xl admin-input"
                      />
                      <button
                        type="button"
                        onClick={() => removeStat(index)}
                        className="text-sm text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-5 border-t border-[#E8DFD2] pt-6">
                  {(
                    [
                      ["categoriesEyebrow", "Categories Eyebrow"],
                      ["categoriesTitleLine1", "Categories Title Line 1"],
                      ["categoriesTitleLine2", "Categories Title Line 2"],
                      ["categoriesDescription", "Categories Description", true],
                      ["corporateSubtitle", "Corporate Subtitle"],
                      ["corporateTitle", "Corporate Title"],
                      ["corporateDescription", "Corporate Description", true],
                      ["corporateButton", "Corporate Button"],
                      ["corporateLink", "Corporate Link"],
                      ["civilSubtitle", "Civil Subtitle"],
                      ["civilTitle", "Civil Title"],
                      ["civilDescription", "Civil Description", true],
                      ["civilButton", "Civil Button"],
                      ["civilLink", "Civil Link"],
                    ] as const
                  ).map(([name, label, isTextarea]) => (
                    <div
                      key={name}
                      className={isTextarea ? "md:col-span-2" : undefined}
                    >
                      <label className="block text-sm font-medium text-[#2A211C] mb-2">
                        {label}
                      </label>
                      {isTextarea ? (
                        <textarea
                          rows={2}
                          value={form[name]}
                          onChange={(e) => updateField(name, e.target.value)}
                          className="w-full px-4 py-3 rounded-xl admin-input resize-none"
                        />
                      ) : (
                        <input
                          value={form[name]}
                          onChange={(e) => updateField(name, e.target.value)}
                          className="w-full px-4 py-3 rounded-xl admin-input"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => void handleSave()}
                    className="rounded-full px-6 py-3 text-sm font-semibold text-[#332C26] disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg,#F3BB27,#EA7A12)",
                    }}
                  >
                    {saving ? "Saving…" : "Save Changes"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}

      {tab === "categories" ? (
        <AdminCrudPage
          title="Project Categories"
          description="Two domain cards on the Projects page (Corporate / Civil)."
          storageKey="projects-page-categories"
          seedData={seedProjectsPageCategories}
          columns={[
            {
              key: "image",
              label: "Image",
              render: (row) =>
                row.image ? (
                  <img
                    src={mediaUrl(row.image) || row.image}
                    alt=""
                    className="w-14 h-10 rounded-lg object-cover border border-[#E8DFD2]"
                  />
                ) : (
                  "—"
                ),
            },
            { key: "title", label: "Title" },
            { key: "link", label: "Link" },
          ]}
          fields={[
            { name: "title", label: "Title" },
            { name: "subtitle", label: "Subtitle", type: "textarea", rows: 2 },
            {
              name: "image",
              label: "Image",
              type: "image",
              uploadSection: "pages/projects",
              recommendedWidth: 1200,
              recommendedHeight: 900,
            },
            {
              name: "icon",
              label: "Icon",
              type: "select",
              options: [
                { value: "Building2", label: "Building2" },
                { value: "Landmark", label: "Landmark" },
                { value: "Building", label: "Building" },
                { value: "Briefcase", label: "Briefcase" },
              ],
            },
            {
              name: "tags",
              label: "Tags (comma separated)",
              type: "textarea",
              rows: 2,
            },
            { name: "button", label: "Button Text" },
            { name: "link", label: "Link" },
          ]}
        />
      ) : null}

      {tab === "items" ? (
        <AdminCrudPage
          title="Featured Project Cards"
          description="Cards shown in Corporate / Civil carousels on /projects."
          storageKey="projects-page-items"
          seedData={seedProjectsPageItems}
          columns={[
            {
              key: "image",
              label: "Image",
              render: (row) =>
                row.image ? (
                  <img
                    src={mediaUrl(row.image) || row.image}
                    alt=""
                    className="w-14 h-10 rounded-lg object-cover border border-[#E8DFD2]"
                  />
                ) : (
                  "—"
                ),
            },
            { key: "title", label: "Title" },
            { key: "domain", label: "Domain" },
            { key: "location", label: "Location" },
          ]}
          fields={[
            {
              name: "domain",
              label: "Domain",
              type: "select",
              options: [
                { value: "corporate", label: "Corporate" },
                { value: "civil", label: "Civil" },
              ],
            },
            { name: "title", label: "Title" },
            { name: "location", label: "Location" },
            { name: "slug", label: "Slug" },
            {
              name: "image",
              label: "Image",
              type: "image",
              uploadSection: "pages/projects",
              recommendedWidth: 1200,
              recommendedHeight: 900,
            },
          ]}
        />
      ) : null}
    </div>
  );
}
