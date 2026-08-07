import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FileText, Plus, X } from "lucide-react";
import { toast } from "sonner";
import AdminTable, { type TableColumn } from "./AdminTable";
import ImageUpload from "./ImageUpload";
import ProjectDetailForm, { hasProjectDetailContent } from "./ProjectDetailForm";
import {
  seedProjectsPageCategories,
  seedProjectsPageItems,
  type ProjectsPageCategoryItem,
  type ProjectsPageItem,
} from "../data/seedContent";
import {
  createListItem,
  deleteListItem,
  getListContent,
  updateListItem,
} from "../utils/contentStorage";
import { mediaUrl } from "../../utils/mediaUrl";
import { MEDIA_MAX_SIZE_MB } from "../utils/mediaUploadRules";
import { toAdminErrorMessage } from "../../utils/publicError";
import type { CrudField } from "./AdminCrudPage";

type CardForm = Record<string, unknown>;

function FormField({
  field,
  value,
  onChange,
}: {
  field: CrudField;
  value: unknown;
  onChange: (name: string, value: unknown) => void;
}) {
  if (field.type === "image") {
    return (
      <ImageUpload
        label={field.label}
        value={(value as string) || ""}
        onChange={(v) => onChange(field.name, v)}
        maxSizeMb={MEDIA_MAX_SIZE_MB}
        section={field.uploadSection || "misc"}
        recommendedWidth={field.recommendedWidth}
        recommendedHeight={field.recommendedHeight}
        hint={field.imageHint ?? field.helperText}
      />
    );
  }

  if (field.type === "select") {
    return (
      <div>
        <label className="block text-sm mb-1 text-[#6E655C]">{field.label}</label>
        <select
          required={field.required !== false}
          value={(value as string) || ""}
          onChange={(e) => onChange(field.name, e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg admin-input"
        >
          <option value="">Select...</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm mb-1 text-[#6E655C]">{field.label}</label>
      <input
        type="text"
        required={field.required !== false}
        value={(value as string) || ""}
        onChange={(e) => onChange(field.name, e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg admin-input"
      />
    </div>
  );
}

export default function FeaturedProjectCardsEditor({
  categoryOptions,
  cardFields,
}: {
  categoryOptions: { value: string; label: string }[];
  cardFields: CrudField[];
}) {
  const [categories, setCategories] = useState<ProjectsPageCategoryItem[]>([]);
  const [data, setData] = useState<ProjectsPageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [cardForm, setCardForm] = useState<CardForm>({});
  const [detailForm, setDetailForm] = useState<ProjectsPageItem | null>(null);
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [categoryRows, itemRows] = await Promise.all([
        getListContent<ProjectsPageCategoryItem>(
          "projects-page-categories",
          seedProjectsPageCategories,
        ),
        getListContent<ProjectsPageItem>("projects-page-items", []),
      ]);
      setCategories(categoryRows);
      setData(itemRows);
    } catch (err) {
      toast.error(toAdminErrorMessage(err));
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const emptyCardForm = () =>
    cardFields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field.defaultValue ?? "",
      }),
      {} as CardForm,
    );

  const openCreate = () => {
    setCardForm(emptyCardForm());
    setEditingId(null);
    setCardModalOpen(true);
  };

  const openEditCard = (row: ProjectsPageItem) => {
    setCardForm({ ...row });
    setEditingId(row.id);
    setCardModalOpen(true);
  };

  const openEditDetail = (row: ProjectsPageItem) => {
    setDetailForm({ ...row });
    setDetailModalOpen(true);
  };

  const handleCardFieldChange = (name: string, value: unknown) => {
    setCardForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailChange = <K extends keyof ProjectsPageItem>(
    key: K,
    value: ProjectsPageItem[K],
  ) => {
    setDetailForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleSaveCard = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        const updated = await updateListItem(
          "projects-page-items",
          editingId,
          cardForm,
        );
        setData((prev) =>
          prev.map((row) =>
            row.id === editingId ? ({ ...row, ...updated } as ProjectsPageItem) : row,
          ),
        );
        toast.success("Project card updated.");
      } else {
        const created = await createListItem("projects-page-items", cardForm);
        setData((prev) => [...prev, created as ProjectsPageItem]);
        toast.success("Project card created.");
      }
      setCardModalOpen(false);
    } catch (err) {
      toast.error(toAdminErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDetail = async () => {
    if (!detailForm) return;
    setSaving(true);
    try {
      const { id, ...fullItem } = detailForm;
      const updated = await updateListItem(
        "projects-page-items",
        id,
        {
          ...fullItem,
          heroSlides: (detailForm.heroSlides || []).filter(Boolean),
          galleryImages: (detailForm.galleryImages || []).filter(Boolean),
        } as Record<string, unknown>,
      );
      setData((prev) =>
        prev.map((row) =>
          row.id === detailForm.id
            ? ({ ...row, ...(updated as ProjectsPageItem) } as ProjectsPageItem)
            : row,
        ),
      );
      toast.success("Project details saved.");
      setDetailModalOpen(false);
    } catch (err) {
      toast.error(toAdminErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (row: ProjectsPageItem) => {
    if (!confirm("Delete this project card and its detail page content?")) return;
    try {
      await deleteListItem("projects-page-items", row.id);
      setData((prev) => prev.filter((item) => item.id !== row.id));
      toast.success("Deleted");
    } catch (err) {
      toast.error(toAdminErrorMessage(err));
    }
  };

  const columns = useMemo<TableColumn<ProjectsPageItem>[]>(
    () => [
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
      {
        key: "categoryId",
        label: "Category",
        render: (row) => {
          const match = categoryOptions.find(
            (opt) => opt.value === String(row.categoryId),
          );
          return match?.label || row.categoryId || "—";
        },
      },
      { key: "location", label: "Location" },
      { key: "filterTag", label: "Filter" },
      {
        key: "projectDetail",
        label: "Project Detail",
        render: (row) => {
          const configured = hasProjectDetailContent(row);
          return (
            <button
              type="button"
              onClick={() => openEditDetail(row)}
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm border transition-colors ${
                configured
                  ? "border-[#D4A24C]/35 text-[#8a5a12] bg-[linear-gradient(135deg,rgba(244,178,35,0.08),rgba(234,122,18,0.05))]"
                  : "border-[#E8DFD2] text-[#6e655c] hover:bg-[#f0e9df]"
              }`}
            >
              <FileText className="w-4 h-4" />
              {configured ? "Edit Detail" : "Add Detail"}
            </button>
          );
        },
      },
    ],
    [categoryOptions],
  );

  if (loading) {
    return <p className="text-[#8A8177]">Loading Featured Project Cards...</p>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold admin-page-title">
            Featured Project Cards
          </h1>
          <p className="text-sm admin-card-muted mt-1">
            Card fields for featured carousels and listing grids. Use Project
            Detail to manage the full detail page content and images for each
            project.
          </p>
        </div>
        <motion.button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl admin-btn-gold font-medium"
          whileHover={{ scale: 1.03 }}
        >
          <Plus className="w-4 h-4" /> Add New
        </motion.button>
      </div>

      <AdminTable
        columns={columns}
        data={data}
        onEdit={openEditCard}
        onDelete={handleDelete}
        pageSize={10}
      />

      <AnimatePresence>
        {cardModalOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center admin-modal-overlay p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-lg p-8 rounded-2xl admin-card my-8 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#2A211C]">
                  {editingId ? "Edit" : "Create"} Project Card
                </h2>
                <button
                  type="button"
                  onClick={() => setCardModalOpen(false)}
                  className="text-[#8A8177]"
                >
                  <X />
                </button>
              </div>
              <form onSubmit={handleSaveCard} className="space-y-4">
                {cardFields.map((field) => (
                  <FormField
                    key={field.name}
                    field={field}
                    value={cardForm[field.name]}
                    onChange={handleCardFieldChange}
                  />
                ))}
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3 rounded-xl admin-btn-gold font-medium disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Card"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {detailModalOpen && detailForm ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center admin-modal-overlay p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-3xl p-8 rounded-2xl admin-card my-8 max-h-[92vh] overflow-y-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex justify-between items-start gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-[#2A211C]">
                    Project Detail — {detailForm.title || "Untitled"}
                  </h2>
                  <p className="mt-1 text-sm text-[#6e655c]">
                    Detail page content for /projects/{"{category}"}/{detailForm.slug || "{slug}"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setDetailModalOpen(false)}
                  className="text-[#8A8177]"
                >
                  <X />
                </button>
              </div>

              <ProjectDetailForm
                item={detailForm}
                categories={categories.length ? categories : seedProjectsPageCategories}
                onChange={handleDetailChange}
              />

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-[#E8DFD2]">
                <button
                  type="button"
                  onClick={() => setDetailModalOpen(false)}
                  className="rounded-xl px-5 py-2.5 text-sm border border-[#E8DFD2] text-[#6e655c]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => void handleSaveDetail()}
                  className="rounded-xl px-6 py-2.5 text-sm font-semibold text-[#332C26] disabled:opacity-60 admin-btn-gold"
                >
                  {saving ? "Saving..." : "Save Detail"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
