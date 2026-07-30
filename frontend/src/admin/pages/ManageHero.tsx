import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "../components/ImageUpload";
import { setContent, getHeroContent } from "../utils/contentStorage";
import { seedHero, type HeroContent, type HeroStat } from "../data/seedContent";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm mb-2 text-[#6E655C] font-medium">{label}</label>
      {children}
    </div>
  );
}

const inputClass = "w-full px-4 py-2.5 rounded-xl admin-input";
const cardClass = "admin-card rounded-2xl p-5 space-y-3 h-full";

export default function ManageHero() {
  const [form, setForm] = useState<HeroContent>(seedHero);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getHeroContent(seedHero);
      setForm(data);
      setLoading(false);
    })();
  }, []);

  const update = <K extends keyof HeroContent>(key: K, value: HeroContent[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateStat = (index: number, field: keyof HeroStat, value: string) => {
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
        { id: Date.now(), number: "0+", label: "New Stat" },
      ],
    }));
  };

  const removeStat = (index: number) => {
    setForm((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setContent("hero", form);
      toast.success("Hero section saved to database");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-[#8A8177]">Loading hero...</p>;

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold admin-page-title">Hero Section</h1>
        <p className="text-sm admin-card-muted mt-1">
          Edit homepage hero content — headline, cards, buttons and stats.
        </p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          <section className={cardClass}>
            <h2 className="font-semibold text-[#2A211C]">Center Content</h2>
            <Field label="Tagline">
              <input
                className={inputClass}
                value={form.tagline}
                onChange={(e) => update("tagline", e.target.value)}
              />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Headline Line 1">
                <input
                  className={inputClass}
                  value={form.headlineLine1}
                  onChange={(e) => update("headlineLine1", e.target.value)}
                />
              </Field>
              <Field label="Headline Line 2">
                <input
                  className={inputClass}
                  value={form.headlineLine2}
                  onChange={(e) => update("headlineLine2", e.target.value)}
                />
              </Field>
            </div>
            <Field label="Script Text">
              <input
                className={inputClass}
                value={form.scriptText}
                onChange={(e) => update("scriptText", e.target.value)}
              />
            </Field>
            <Field label="Description">
              <textarea
                rows={3}
                className={`${inputClass} resize-none`}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
              />
            </Field>
          </section>

          <section className={cardClass}>
            <h2 className="font-semibold text-[#2A211C]">Background Image</h2>
            <ImageUpload
              label="Hero Background"
              value={form.backgroundImage}
              onChange={(v) => update("backgroundImage", v)}
              maxSizeMb={2}
              section="hero"
              recommendedWidth={1920}
              recommendedHeight={1080}
              hint="Wide full-bleed hero banner. Empty = default hero image."
            />
          </section>

          <section className={cardClass}>
            <h2 className="font-semibold text-[#2A211C]">Side Glass Cards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Left Card">
                <textarea
                  rows={2}
                  className={`${inputClass} resize-none`}
                  value={form.leftCardTitle}
                  onChange={(e) => update("leftCardTitle", e.target.value)}
                  placeholder={"Corporate\nInteriors"}
                />
              </Field>
              <Field label="Right Card">
                <textarea
                  rows={2}
                  className={`${inputClass} resize-none`}
                  value={form.rightCardTitle}
                  onChange={(e) => update("rightCardTitle", e.target.value)}
                  placeholder={"Civil\nStructures"}
                />
              </Field>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="font-semibold text-[#2A211C]">Mobile CTA Buttons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Corporate Text">
                <input
                  className={inputClass}
                  value={form.ctaCorporateText}
                  onChange={(e) => update("ctaCorporateText", e.target.value)}
                />
              </Field>
              <Field label="Corporate Link">
                <input
                  className={inputClass}
                  value={form.ctaCorporateLink}
                  onChange={(e) => update("ctaCorporateLink", e.target.value)}
                />
              </Field>
              <Field label="Civil Text">
                <input
                  className={inputClass}
                  value={form.ctaCivilText}
                  onChange={(e) => update("ctaCivilText", e.target.value)}
                />
              </Field>
              <Field label="Civil Link">
                <input
                  className={inputClass}
                  value={form.ctaCivilLink}
                  onChange={(e) => update("ctaCivilLink", e.target.value)}
                />
              </Field>
            </div>
          </section>
        </div>

        <section className="admin-card rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[#2A211C]">Floating Stats</h2>
            <button
              type="button"
              onClick={addStat}
              className="inline-flex items-center gap-1 text-sm text-[#8a5a12] hover:text-[#6E4E10]"
            >
              <Plus className="w-4 h-4" />
              Add Stat
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {form.stats.map((stat, index) => (
              <div
                key={stat.id}
                className="p-3 rounded-xl border border-[#E8DFD2] bg-[#FAF7F2]/50 space-y-2"
              >
                <input
                  className={inputClass}
                  value={stat.number}
                  onChange={(e) => updateStat(index, "number", e.target.value)}
                  placeholder="250+"
                />
                <input
                  className={inputClass}
                  value={stat.label}
                  onChange={(e) => updateStat(index, "label", e.target.value)}
                  placeholder="Projects Delivered"
                />
                <button
                  type="button"
                  onClick={() => removeStat(index)}
                  className="w-full py-2 rounded-lg border border-red-200 text-red-500 text-sm hover:bg-red-50 flex items-center justify-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="admin-note rounded-xl p-4 text-sm flex-1">
            Changes are stored locally for now. When the backend is connected, this
            form will save to the database.
          </div>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl admin-btn-gold font-medium disabled:opacity-60 shrink-0"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Hero Section"}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
