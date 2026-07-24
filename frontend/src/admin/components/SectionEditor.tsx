import { useState, useEffect, type HTMLAttributes } from "react";
import { motion } from "motion/react";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { getContent, setContent } from "../utils/contentStorage";
import ImageUpload from "./ImageUpload";

export interface SectionField {
  name: string;
  label: string;
  type?: "text" | "textarea" | "image";
  rows?: number;
  maxLength?: number;
  sanitize?: (value: string) => string;
  liveHint?: (value: string) => string | null;
  helperText?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
}

interface SectionEditorProps<T extends Record<string, unknown>> {
  title: string;
  description?: string;
  storageKey: string;
  seedData: T;
  fields: SectionField[];
  wide?: boolean;
  /** Return an error message to block save, or null if ok. */
  validateForm?: (form: T) => string | null;
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: SectionField;
  value: string;
  onChange: (value: string) => void;
}) {
  const [hint, setHint] = useState<string | null>(null);

  const apply = (raw: string) => {
    const next = field.sanitize ? field.sanitize(raw) : raw;
    onChange(next);
    if (field.liveHint) setHint(field.liveHint(next));
  };

  if (field.type === "textarea") {
    return (
      <textarea
        rows={field.rows || 4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl admin-input resize-none"
      />
    );
  }

  if (field.type === "image") {
    return (
      <ImageUpload
        label=""
        value={value}
        onChange={onChange}
        maxSizeMb={8}
      />
    );
  }

  return (
    <>
      <input
        type="text"
        value={value}
        maxLength={field.maxLength}
        inputMode={field.inputMode}
        onChange={(e) => apply(e.target.value)}
        onKeyUp={(e) => {
          if (field.liveHint) {
            setHint(field.liveHint((e.target as HTMLInputElement).value));
          }
        }}
        className="w-full px-4 py-3 rounded-xl admin-input"
      />
      {(hint || field.helperText) && (
        <p
          className={`mt-1 text-xs ${hint ? "text-red-600" : "text-[#8A8177]"}`}
        >
          {hint || field.helperText}
        </p>
      )}
    </>
  );
}

export default function SectionEditor<T extends Record<string, unknown>>({
  title,
  description,
  storageKey,
  seedData,
  fields,
  wide = false,
  validateForm,
}: SectionEditorProps<T>) {
  const [form, setForm] = useState<T>(seedData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getContent(storageKey, seedData);
      setForm(data);
      setLoading(false);
    })();
  }, [storageKey, seedData]);

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm?.(form);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    setSaving(true);
    try {
      await setContent(storageKey, form);
      toast.success("Section saved to database");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-[#8A8177]">Loading section...</p>;
  }

  return (
    <div className={wide ? "max-w-6xl" : "max-w-3xl"}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold admin-page-title">{title}</h1>
        {description && (
          <p className="text-sm admin-card-muted mt-1">{description}</p>
        )}
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="admin-card rounded-2xl p-8 space-y-5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm mb-2 text-[#6E655C] font-medium">
              {field.label}
            </label>
            <FieldInput
              field={field}
              value={String(form[field.name] ?? "")}
              onChange={(v) => handleChange(field.name, v)}
            />
          </div>
        ))}

        <div className="admin-note rounded-xl p-4 text-sm">
          Changes are saved to the MySQL database and update the live website.
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl admin-btn-gold font-medium disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Section"}
        </button>
      </motion.form>
    </div>
  );
}
