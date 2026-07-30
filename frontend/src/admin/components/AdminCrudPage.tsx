import { useState, useEffect, type HTMLAttributes } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import AdminTable, { type TableColumn } from "./AdminTable";
import ImageUpload from "./ImageUpload";
import {
  createListItem,
  deleteListItem,
  getListContent,
  updateListItem,
} from "../utils/contentStorage";
import { MEDIA_MAX_SIZE_MB } from "../utils/mediaUploadRules";
import { toAdminErrorMessage } from "../../utils/publicError";

export interface CrudField {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "select" | "image" | "checkbox";
  required?: boolean;
  rows?: number;
  placeholder?: string;
  defaultValue?: string | boolean;
  options?: { value: string; label: string }[];
  maxLength?: number;
  sanitize?: (value: string) => string;
  /** Live hint under the field (keyup/change). */
  liveHint?: (value: string) => string | null;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  pattern?: string;
  helperText?: string;
  /** Image recommend size / crop target */
  recommendedWidth?: number;
  recommendedHeight?: number;
  aspect?: number | null;
  imageHint?: string;
  /** public/uploads/{section}/ folder */
  uploadSection?: string;
}

interface AdminCrudPageProps<T extends { id: number | string }> {
  title: string;
  description?: string;
  storageKey: string;
  columns: TableColumn<T>[];
  fields: CrudField[];
  seedData: T[];
  readOnly?: boolean;
  /** When false, hide "Add New" even if fields exist (e.g. enquiries). */
  allowCreate?: boolean;
  /** Return an error message to block save, or null if ok. */
  validateForm?: (form: Record<string, unknown>) => string | null;
  /** Rows per page for the listing table. Default 10. */
  pageSize?: number;
}

function FormField({
  field,
  value,
  onChange,
}: {
  field: CrudField;
  value: unknown;
  onChange: (name: string, value: unknown) => void;
}) {
  const [hint, setHint] = useState<string | null>(null);

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
        aspect={field.aspect}
        hint={field.imageHint ?? field.helperText}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <div>
        <label className="block text-sm mb-1 text-[#6E655C]">{field.label}</label>
        <textarea
          required={field.required !== false}
          rows={field.rows || 4}
          value={(value as string) || ""}
          onChange={(e) => onChange(field.name, e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg admin-input resize-none"
        />
      </div>
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

  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(field.name, e.target.checked)}
          className="rounded accent-amber-500 w-4 h-4"
        />
        <span className="text-sm text-[#332C26]">{field.label}</span>
      </label>
    );
  }

  const applyValue = (raw: string) => {
    const next = field.sanitize ? field.sanitize(raw) : raw;
    onChange(field.name, next);
    if (field.liveHint) setHint(field.liveHint(next));
  };

  return (
    <div>
      <label className="block text-sm mb-1 text-[#6E655C]">{field.label}</label>
      <input
        type={field.type || "text"}
        required={field.required !== false}
        value={(value as string) || ""}
        maxLength={field.maxLength}
        inputMode={field.inputMode}
        pattern={field.pattern}
        onChange={(e) => applyValue(e.target.value)}
        onKeyUp={(e) => {
          if (field.liveHint) {
            setHint(field.liveHint((e.target as HTMLInputElement).value));
          }
        }}
        className="w-full px-4 py-2.5 rounded-lg admin-input"
        placeholder={field.placeholder}
      />
      {(hint || field.helperText) && (
        <p
          className={`mt-1 text-xs ${hint ? "text-red-600" : "text-[#8A8177]"}`}
        >
          {hint || field.helperText}
        </p>
      )}
    </div>
  );
}

export default function AdminCrudPage<T extends { id: number | string }>({
  title,
  description,
  storageKey,
  columns,
  fields,
  seedData,
  readOnly = false,
  allowCreate = true,
  validateForm,
  pageSize = 10,
}: AdminCrudPageProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [editing, setEditing] = useState<number | string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      // Never treat seedData as live DB rows (avoids fake ids → duplicate inserts).
      const rows = await getListContent(storageKey, []);
      setData(rows);
    } catch (err) {
      toast.error(toAdminErrorMessage(err));
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const emptyForm = () =>
    fields.reduce(
      (acc, f) => ({
        ...acc,
        [f.name]: f.defaultValue ?? (f.type === "checkbox" ? false : ""),
      }),
      {} as Record<string, unknown>,
    );

  const openCreate = () => {
    setForm(emptyForm());
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (row: T) => {
    setForm({ ...row } as Record<string, unknown>);
    setEditing(row.id);
    setModalOpen(true);
  };

  const handleFieldChange = (name: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validateForm?.(form);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        const updated = await updateListItem(storageKey, editing, form);
        setData((prev) =>
          prev.map((d) => (d.id === editing ? ({ ...d, ...updated } as T) : d)),
        );
        toast.success("Updated successfully");
      } else {
        const created = await createListItem(storageKey, form);
        setData((prev) => [...prev, created as T]);
        toast.success("Created successfully");
      }
      setModalOpen(false);
    } catch (err) {
      toast.error(toAdminErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (row: T) => {
    if (!confirm("Delete this item?")) return;
    try {
      await deleteListItem(storageKey, row.id);
      setData((prev) => prev.filter((d) => d.id !== row.id));
      toast.success("Deleted");
    } catch (err) {
      toast.error(toAdminErrorMessage(err));
    }
  };

  if (loading) {
    return <p className="text-[#8A8177]">Loading {title}...</p>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold admin-page-title">{title}</h1>
          {description && (
            <p className="text-sm admin-card-muted mt-1">{description}</p>
          )}
        </div>
        {!readOnly && allowCreate && fields.length > 0 && (
          <motion.button
            type="button"
            onClick={openCreate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl admin-btn-gold font-medium"
            whileHover={{ scale: 1.03 }}
          >
            <Plus className="w-4 h-4" /> Add New
          </motion.button>
        )}
      </div>

      <AdminTable
        columns={columns}
        data={data}
        onEdit={readOnly || fields.length === 0 ? undefined : openEdit}
        onDelete={readOnly ? undefined : handleDelete}
        readOnly={readOnly}
        pageSize={pageSize}
      />

      <AnimatePresence>
        {modalOpen && (
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
                  {editing ? "Edit" : "Create"} {title}
                </h2>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="text-[#8A8177]"
                >
                  <X />
                </button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                {fields.map((f) => (
                  <FormField
                    key={f.name}
                    field={f}
                    value={form[f.name]}
                    onChange={handleFieldChange}
                  />
                ))}
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3 rounded-xl admin-btn-gold font-medium disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
