import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import ImageUpload from "./ImageUpload";
import {
  type ProjectsPageCategoryItem,
  type ProjectsPageItem,
} from "../data/seedContent";
import { MEDIA_MAX_SIZE_MB } from "../utils/mediaUploadRules";
import { projectDetailPath, resolveCategorySlug } from "../../utils/projectsCms";

function CollapsibleSection({
  title,
  description,
  defaultOpen = false,
  children,
}: {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-[#E8DFD2] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left bg-[#FAF7F2] hover:bg-[#F5F1EA] transition-colors"
      >
        <span>
          <span className="block text-sm font-semibold text-[#2A211C]">{title}</span>
          {description ? (
            <span className="block mt-0.5 text-xs text-[#6e655c]">{description}</span>
          ) : null}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#8a5a12] shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open ? (
        <div className="p-4 md:p-5 border-t border-[#E8DFD2] bg-white">
          <div className="grid md:grid-cols-2 gap-5">{children}</div>
        </div>
      ) : null}
    </div>
  );
}

function ImageListEditor({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
}) {
  const rows = values.length ? values : [""];

  return (
    <div className="space-y-3 md:col-span-2">
      <div className="flex items-center justify-between gap-3">
        <label className="block text-sm font-medium text-[#2A211C]">{label}</label>
        <button
          type="button"
          onClick={() => onChange([...rows, ""])}
          className="rounded-xl px-3 py-2 text-sm border border-[#D4A24C]/35 text-[#8a5a12]"
        >
          Add Image
        </button>
      </div>
      {rows.map((value, index) => (
        <div key={index} className="grid md:grid-cols-[1fr_auto] gap-3 items-start">
          <ImageUpload
            label=""
            value={value}
            onChange={(next) =>
              onChange(rows.map((row, i) => (i === index ? next : row)))
            }
            maxSizeMb={MEDIA_MAX_SIZE_MB}
            section="pages/projects"
            recommendedWidth={1600}
            recommendedHeight={1000}
          />
          {rows.length > 1 ? (
            <button
              type="button"
              onClick={() => onChange(rows.filter((_, i) => i !== index))}
              className="text-sm text-red-600 mt-2"
            >
              Remove
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function hasProjectDetailContent(item: ProjectsPageItem): boolean {
  return Boolean(
    item.heroTagline?.trim() ||
      item.aboutDescription?.trim() ||
      (item.heroSlides?.length ?? 0) > 0 ||
      (item.galleryImages?.length ?? 0) > 0,
  );
}

export default function ProjectDetailForm({
  item,
  categories,
  onChange,
}: {
  item: ProjectsPageItem;
  categories: ProjectsPageCategoryItem[];
  onChange: <K extends keyof ProjectsPageItem>(
    key: K,
    value: ProjectsPageItem[K],
  ) => void;
}) {
  const category = categories.find(
    (cat) => String(cat.id) === String(item.categoryId),
  );
  const categorySlug = category ? resolveCategorySlug(category) : "";
  const detailUrl =
    categorySlug && item.slug
      ? projectDetailPath(categorySlug, item.slug)
      : "/projects/{category}/{slug}";

  return (
    <div className="space-y-4">
      <p className="text-xs text-[#6e655c]">
        {category?.title || "Category"} · Public URL: {detailUrl}
      </p>

      <CollapsibleSection
        title="Hero Banner"
        description="Top banner tagline, status and slider images"
        defaultOpen
      >
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#2A211C] mb-2">
            Hero Tagline
          </label>
          <textarea
            rows={2}
            value={item.heroTagline || ""}
            onChange={(e) => onChange("heroTagline", e.target.value)}
            className="w-full px-4 py-3 rounded-xl admin-input resize-none"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#2A211C] mb-2">
            Status Label
          </label>
          <input
            value={item.statusLabel || ""}
            onChange={(e) => onChange("statusLabel", e.target.value)}
            placeholder="Completed Project"
            className="w-full px-4 py-3 rounded-xl admin-input"
          />
        </div>
        <ImageListEditor
          label="Hero Slides"
          values={item.heroSlides || []}
          onChange={(values) => onChange("heroSlides", values)}
        />
      </CollapsibleSection>

      <CollapsibleSection
        title="About the Project"
        description="About section title, copy, features and image"
      >
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#2A211C] mb-2">
            About Title
          </label>
          <input
            value={item.aboutTitle || ""}
            onChange={(e) => onChange("aboutTitle", e.target.value)}
            className="w-full px-4 py-3 rounded-xl admin-input"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#2A211C] mb-2">
            About Description
          </label>
          <textarea
            rows={3}
            value={item.aboutDescription || ""}
            onChange={(e) => onChange("aboutDescription", e.target.value)}
            className="w-full px-4 py-3 rounded-xl admin-input resize-none"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#2A211C] mb-2">
            About Features (one per line)
          </label>
          <textarea
            rows={4}
            value={(item.aboutFeatures || []).join("\n")}
            onChange={(e) =>
              onChange(
                "aboutFeatures",
                e.target.value
                  .split("\n")
                  .map((line) => line.trim())
                  .filter(Boolean),
              )
            }
            className="w-full px-4 py-3 rounded-xl admin-input resize-none"
          />
        </div>
        <div className="md:col-span-2">
          <ImageUpload
            label="About Image"
            value={item.aboutImage || ""}
            onChange={(v) => onChange("aboutImage", v)}
            maxSizeMb={MEDIA_MAX_SIZE_MB}
            section="pages/projects"
            recommendedWidth={1200}
            recommendedHeight={900}
          />
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        title="Project Stats"
        description="Completed year, area and duration"
      >
        <div>
          <label className="block text-sm font-medium text-[#2A211C] mb-2">
            Completed
          </label>
          <input
            value={item.statCompleted || ""}
            onChange={(e) => onChange("statCompleted", e.target.value)}
            className="w-full px-4 py-3 rounded-xl admin-input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2A211C] mb-2">
            Area
          </label>
          <input
            value={item.statArea || ""}
            onChange={(e) => onChange("statArea", e.target.value)}
            className="w-full px-4 py-3 rounded-xl admin-input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2A211C] mb-2">
            Duration
          </label>
          <input
            value={item.statDuration || ""}
            onChange={(e) => onChange("statDuration", e.target.value)}
            className="w-full px-4 py-3 rounded-xl admin-input"
          />
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        title="Gallery"
        description="Gallery heading, description and images"
      >
        <div>
          <label className="block text-sm font-medium text-[#2A211C] mb-2">
            Gallery Eyebrow
          </label>
          <input
            value={item.galleryEyebrow || ""}
            onChange={(e) => onChange("galleryEyebrow", e.target.value)}
            className="w-full px-4 py-3 rounded-xl admin-input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2A211C] mb-2">
            Gallery Title
          </label>
          <input
            value={item.galleryTitle || ""}
            onChange={(e) => onChange("galleryTitle", e.target.value)}
            className="w-full px-4 py-3 rounded-xl admin-input"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#2A211C] mb-2">
            Gallery Description
          </label>
          <textarea
            rows={2}
            value={item.galleryDescription || ""}
            onChange={(e) => onChange("galleryDescription", e.target.value)}
            className="w-full px-4 py-3 rounded-xl admin-input resize-none"
          />
        </div>
        <ImageListEditor
          label="Gallery Images"
          values={item.galleryImages || []}
          onChange={(values) => onChange("galleryImages", values)}
        />
      </CollapsibleSection>
    </div>
  );
}
