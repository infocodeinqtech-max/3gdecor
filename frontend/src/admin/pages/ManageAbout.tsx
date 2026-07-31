import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "../components/ImageUpload";
import {
  getContent,
  setContent,
  getListContent,
  saveListContent,
} from "../utils/contentStorage";
import {
  seedAbout,
  type HeroFeature,
} from "../data/seedContent";

const inputClass = "w-full px-4 py-2.5 rounded-xl admin-input";
const cardClass = "admin-card rounded-2xl p-5 space-y-3 h-full";

export default function ManageAbout() {
  const [form, setForm] = useState(seedAbout);
  const [features, setFeatures] = useState<HeroFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const about = await getContent("about", seedAbout);
      const heroFeatures = await getListContent<HeroFeature>(
        "about-page-hero-features",
        [],
      );
      setForm(about);
      setFeatures(heroFeatures);

      setLoading(false);
    })();
  }, []);

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateImage = (index: number, value: string) => {
    setForm((prev) => {
      const images = [...(prev.images || seedAbout.images)];
      images[index] = value;
      return { ...prev, images };
    });
  };

  const updateFeature = (
  index: number,
  field: keyof HeroFeature,
  value: string | number | boolean,
) => {
  setFeatures((prev) =>
    prev.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    ),
  );
};

const addFeature = () => {
  setFeatures((prev) => [
    ...prev,
    {
      id: Date.now(),
      icon: "",
      title: "",
      description: "",
      sort_order: prev.length + 1,
      active: true,
    },
  ]);
};

const removeFeature = (index: number) => {
  setFeatures((prev) => prev.filter((_, i) => i !== index));
};

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      await Promise.all([
        setContent("about", form),
        saveListContent(
          "about-page-hero-features",
          features,
        ),
      ]);

      toast.success("About section saved successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-[#8A8177]">Loading about...</p>;

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold admin-page-title">About Section</h1>
        <p className="text-sm admin-card-muted mt-1">
          Edit homepage about text, collage images and center badge.
        </p>
      </div>

      <motion.form onSubmit={handleSubmit} className="space-y-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <section className={cardClass}>
            <h2 className="font-semibold text-[#2A211C]">Text Content</h2>
            <label className="block text-sm mb-2 text-[#6E655C] font-medium">Section Label</label>
            <input className={inputClass} value={form.label} onChange={(e) => update("label", e.target.value)} />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-2 text-[#6E655C] font-medium">Title Line 1</label>
                <input className={inputClass} value={form.titleLine1} onChange={(e) => update("titleLine1", e.target.value)} />
              </div>
              <div>
                <label className="block text-sm mb-2 text-[#6E655C] font-medium">Title Line 2</label>
                <input className={inputClass} value={form.titleLine2} onChange={(e) => update("titleLine2", e.target.value)} />
              </div>
            </div>
            <label className="block text-sm mb-2 text-[#6E655C] font-medium">Highlighted Word</label>
            <input className={inputClass} value={form.titleHighlight} onChange={(e) => update("titleHighlight", e.target.value)} />
            <label className="block text-sm mb-2 text-[#6E655C] font-medium">Paragraph 1</label>
            <textarea rows={3} className={`${inputClass} resize-none`} value={form.paragraph1} onChange={(e) => update("paragraph1", e.target.value)} />
            <label className="block text-sm mb-2 text-[#6E655C] font-medium">Paragraph 2</label>
            <textarea rows={3} className={`${inputClass} resize-none`} value={form.paragraph2} onChange={(e) => update("paragraph2", e.target.value)} />
          </section>

          <section className={cardClass}>
            <h2 className="font-semibold text-[#2A211C]">Center Badge</h2>
            <ImageUpload
              label="3G Badge Image"
              value={form.badgeImage || ""}
              onChange={(v) => update("badgeImage", v)}
              maxSizeMb={2}
              section="about"
              recommendedWidth={400}
              recommendedHeight={400}
              hint="Floating center badge. Empty = default badge. Prefer transparent PNG."
            />
          </section>
        </div>

        <section className="admin-card rounded-2xl p-5 space-y-4">
          <h2 className="font-semibold text-[#2A211C]">Collage Images (4 photos)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((index) => {
              const landscape = index === 0 || index === 3;
              return (
              <ImageUpload
                key={index}
                label={`Image ${index + 1}`}
                value={form.images?.[index] || ""}
                onChange={(v) => updateImage(index, v)}
                maxSizeMb={2}
                section="about"
                recommendedWidth={landscape ? 900 : 800}
                recommendedHeight={landscape ? 700 : 800}
                hint="Empty = default photo"
              />
            );
            })}
          </div>
        </section>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="admin-note rounded-xl p-4 text-sm flex-1">
            Changes are stored locally for now. When the backend is connected, this
            form will save to the database.
          </div>
          <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl admin-btn-gold font-medium disabled:opacity-60 shrink-0">
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save About Section"}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
