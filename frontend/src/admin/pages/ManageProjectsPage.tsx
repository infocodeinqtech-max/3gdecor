import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import AdminCrudPage from "../components/AdminCrudPage";
import ImageUpload from "../components/ImageUpload";
import {
  seedProjectsPage,
  seedProjectsPageCategories,
  type ProjectsPageCategoryItem,
  type ProjectsPageContent,
} from "../data/seedContent";
import {
  getContent,
  getListContent,
  saveListContent,
  setContent,
} from "../utils/contentStorage";
import { mediaUrl } from "../../utils/mediaUrl";
import { MEDIA_MAX_SIZE_MB } from "../utils/mediaUploadRules";
import FeaturedProjectCardsEditor from "../components/FeaturedProjectCardsEditor";
import { toAdminErrorMessage } from "../../utils/publicError";

type Tab = "hero" | "categories" | "sections" | "listing" | "items";

const tabBtn = (active: boolean) =>
  `rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
    active
      ? "bg-[linear-gradient(135deg,rgba(244,178,35,0.14),rgba(234,122,18,0.1))] text-[#8a5a12] border border-[rgba(212,166,75,0.35)]"
      : "border border-transparent text-[#6e655c] hover:bg-[#f0e9df] hover:text-[#332c26]"
  }`;

function CategorySectionsEditor() {
  const [rows, setRows] = useState<ProjectsPageCategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let alive = true;
    getListContent<ProjectsPageCategoryItem>(
      "projects-page-categories",
      seedProjectsPageCategories,
    )
      .then((data) => {
        if (!alive) return;
        const sorted = [...data].sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0),
        );
        setRows(sorted.length ? sorted : seedProjectsPageCategories);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const updateRow = <K extends keyof ProjectsPageCategoryItem>(
    index: number,
    key: K,
    value: ProjectsPageCategoryItem[K],
  ) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)),
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveListContent("projects-page-categories", rows);
      toast.success("Category section content saved.");
    } catch (err) {
      toast.error(toAdminErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-card rounded-2xl p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#2A211C]">
          Category Featured Sections
        </h1>
        <p className="mt-1 text-sm text-[#6e655c]">
          Per-category headings and links for the featured project carousels on
          /projects. Button text is generated automatically as “View All{" "}
          {"{Category Title}"} Projects”.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-[#6e655c]">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-[#6e655c]">
          Add categories first, then configure their featured sections here.
        </p>
      ) : (
        <>
          {rows.map((row, index) => {
            const label = row.title?.trim() || `Category ${index + 1}`;
            return (
              <div
                key={row.id}
                className="space-y-4 border border-[#E8DFD2] rounded-2xl p-5 md:p-6"
              >
                <h2 className="font-semibold text-[#2A211C]">{label}</h2>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#2A211C] mb-2">
                      Category Subtitle ({label})
                    </label>
                    <input
                      value={row.sectionSubtitle || ""}
                      onChange={(e) =>
                        updateRow(index, "sectionSubtitle", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl admin-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2A211C] mb-2">
                      Category Title ({label})
                    </label>
                    <input
                      value={row.sectionTitle || ""}
                      onChange={(e) =>
                        updateRow(index, "sectionTitle", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl admin-input"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#2A211C] mb-2">
                      Category Description ({label})
                    </label>
                    <textarea
                      rows={2}
                      value={row.sectionDescription || ""}
                      onChange={(e) =>
                        updateRow(index, "sectionDescription", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl admin-input resize-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#2A211C] mb-2">
                      {label} Link
                    </label>
                    <input
                      value={row.link || ""}
                      onChange={(e) => updateRow(index, "link", e.target.value)}
                      placeholder="/projects/corporate"
                      className="w-full px-4 py-3 rounded-xl admin-input"
                    />
                  </div>
                </div>
              </div>
            );
          })}

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
  );
}

function CategoryListingEditor() {
  const [rows, setRows] = useState<ProjectsPageCategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let alive = true;
    getListContent<ProjectsPageCategoryItem>(
      "projects-page-categories",
      seedProjectsPageCategories,
    )
      .then((data) => {
        if (!alive) return;
        const sorted = [...data].sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0),
        );
        setRows(sorted.length ? sorted : seedProjectsPageCategories);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const updateRow = <K extends keyof ProjectsPageCategoryItem>(
    index: number,
    key: K,
    value: ProjectsPageCategoryItem[K],
  ) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)),
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveListContent("projects-page-categories", rows);
      toast.success("Category listing pages saved.");
    } catch (err) {
      toast.error(toAdminErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-card rounded-2xl p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#2A211C]">
          Category Listing Pages
        </h1>
        <p className="mt-1 text-sm text-[#6e655c]">
          Hero banner, copy and filters for /projects/{"{slug}"} listing pages.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-[#6e655c]">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-[#6e655c]">
          Add categories first, then configure their listing pages here.
        </p>
      ) : (
        <>
          {rows.map((row, index) => {
            const label = row.title?.trim() || `Category ${index + 1}`;
            const filtersText = Array.isArray(row.listFilters)
              ? row.listFilters.join(", ")
              : "";

            return (
              <div
                key={row.id}
                className="space-y-4 border border-[#E8DFD2] rounded-2xl p-5 md:p-6"
              >
                <h2 className="font-semibold text-[#2A211C]">{label}</h2>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#2A211C] mb-2">
                      URL Slug ({label})
                    </label>
                    <input
                      value={row.slug || ""}
                      onChange={(e) => updateRow(index, "slug", e.target.value)}
                      placeholder="corporate"
                      className="w-full px-4 py-3 rounded-xl admin-input"
                    />
                    <p className="mt-1 text-xs text-[#6e655c]">
                      Page URL: /projects/{row.slug || "slug"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2A211C] mb-2">
                      Breadcrumb ({label})
                    </label>
                    <input
                      value={row.listBreadcrumb || ""}
                      onChange={(e) =>
                        updateRow(index, "listBreadcrumb", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl admin-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2A211C] mb-2">
                      Hero Title ({label})
                    </label>
                    <input
                      value={row.listHeroTitle || ""}
                      onChange={(e) =>
                        updateRow(index, "listHeroTitle", e.target.value)
                      }
                      placeholder="Corporate"
                      className="w-full px-4 py-3 rounded-xl admin-input"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#2A211C] mb-2">
                      Listing Banner ({label})
                    </label>
                    <ImageUpload
                      label=""
                      value={row.listBannerImage || ""}
                      onChange={(v) => updateRow(index, "listBannerImage", v)}
                      maxSizeMb={MEDIA_MAX_SIZE_MB}
                      section="pages/projects"
                      recommendedWidth={1920}
                      recommendedHeight={1080}
                      imageHint="Hero banner for the category listing page."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#2A211C] mb-2">
                      Description ({label})
                    </label>
                    <textarea
                      rows={3}
                      value={row.listDescription || ""}
                      onChange={(e) =>
                        updateRow(index, "listDescription", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl admin-input resize-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#2A211C] mb-2">
                      Filter Tags ({label})
                    </label>
                    <textarea
                      rows={2}
                      value={filtersText}
                      onChange={(e) =>
                        updateRow(
                          index,
                          "listFilters",
                          e.target.value
                            .split(",")
                            .map((part) => part.trim())
                            .filter(Boolean),
                        )
                      }
                      placeholder="All Projects, Offices, Workspaces, Banks"
                      className="w-full px-4 py-3 rounded-xl admin-input resize-none"
                    />
                    <p className="mt-1 text-xs text-[#6e655c]">
                      Comma-separated. Include “All Projects” as the first
                      option.
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

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
  );
}

export default function ManageProjectsPage() {
  const [tab, setTab] = useState<Tab>("hero");
  const [form, setForm] = useState<ProjectsPageContent>(seedProjectsPage);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    let alive = true;
    getContent<ProjectsPageContent>("projects-page", seedProjectsPage)
      .then((data) => {
        if (!alive) return;
        setForm({ ...seedProjectsPage, ...data });
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    let alive = true;
    getListContent<ProjectsPageCategoryItem>(
      "projects-page-categories",
      seedProjectsPageCategories,
    ).then((data) => {
      if (!alive) return;
      const sorted = [...data].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0),
      );
      setCategoryOptions(
        sorted.map((row, index) => ({
          value: String(row.id),
          label: row.title?.trim() || `Category ${index + 1}`,
        })),
      );
    });
    return () => {
      alive = false;
    };
  }, [tab]);

  const updateField = <K extends keyof ProjectsPageContent>(
    key: K,
    value: ProjectsPageContent[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
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

  const itemFields = useMemo(
    () => [
      {
        name: "categoryId",
        label: "Category",
        type: "select" as const,
        options: categoryOptions,
      },
      { name: "title", label: "Title" },
      { name: "location", label: "Location" },
      { name: "filterTag", label: "Filter Tag" },
      { name: "slug", label: "Slug" },
      {
        name: "image",
        label: "Image",
        type: "image" as const,
        uploadSection: "pages/projects",
        recommendedWidth: 1200,
        recommendedHeight: 900,
      },
    ],
    [categoryOptions],
  );

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTab("hero")}
          className={tabBtn(tab === "hero")}
        >
          Hero
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
          onClick={() => setTab("sections")}
          className={tabBtn(tab === "sections")}
        >
          Category Sections
        </button>
        <button
          type="button"
          onClick={() => setTab("listing")}
          className={tabBtn(tab === "listing")}
        >
          Listing Pages
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
                Projects Page Hero
              </h1>
              <p className="mt-1 text-sm text-[#6e655c]">
                Banner and hero copy for /projects. Hero stats are taken from
                the homepage hero settings.
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

                <div className="grid md:grid-cols-2 gap-5 border-t border-[#E8DFD2] pt-6">
                  {(
                    [
                      ["categoriesEyebrow", "Categories Eyebrow"],
                      ["categoriesTitleLine1", "Categories Title Line 1"],
                      ["categoriesTitleLine2", "Categories Title Line 2"],
                      ["categoriesDescription", "Categories Description", true],
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
          description="Domain cards on the Projects page. Add a category here — its featured section fields appear in the Category Sections tab."
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
          ]}
          fields={[
            { name: "title", label: "Title" },
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
            { name: "button", label: "Card Button Text" },
          ]}
        />
      ) : null}

      {tab === "sections" ? <CategorySectionsEditor /> : null}

      {tab === "listing" ? <CategoryListingEditor /> : null}

      {tab === "items" ? (
        <FeaturedProjectCardsEditor
          categoryOptions={categoryOptions}
          cardFields={itemFields}
        />
      ) : null}
    </div>
  );
}
