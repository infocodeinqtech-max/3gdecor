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
  type FounderMember,
  type Principle,
} from "../data/seedContent";

import { ICON_OPTIONS } from "../data/iconOptions";

const inputClass = "w-full px-4 py-2.5 rounded-xl admin-input";
const cardClass = "admin-card rounded-2xl p-5 space-y-3 h-full";

export default function ManageAbout() {
  const [form, setForm] = useState(seedAbout);
  const [features, setFeatures] = useState<HeroFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [founders, setFounders] = useState<FounderMember[]>([]);
  const [principles, setPrinciples] = useState<Principle[]>([]);

  useEffect(() => {
    (async () => {
      const about = await getContent("about", seedAbout);
      const heroFeatures = await getListContent<HeroFeature>(
        "about-page-hero-features",
        [],
      );
      const founderMembers = await getListContent<FounderMember>(
        "about-page-founder-members",
        [],
      );
      const principlesList = await getListContent<Principle>(
        "about-page-principles",
        [],
      );

      setForm(about);
      setFeatures(heroFeatures);
      setFounders(founderMembers);
      setPrinciples(principlesList);

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

const updateFounder = (
  index:number,
  field: keyof FounderMember,
  value: string | number | boolean,
) => {
  setFounders((prev) =>
    prev.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    ),
  );
};

const addFounder = () => {
  setFounders((prev) => [
    ...prev,
    {
      id: Date.now(),
      image:"",
      name: "",
      title: "",
      short_description: "",
      sort_order: prev.length + 1,
      active: true,
    },
  ]);
};

const removeFounder = (index: number) => {
  setFounders((prev) => prev.filter((_, i) => i !== index));
};

const updatePrinciple = <K extends keyof Principle>(
  index: number,
  field: K,
  value: Principle[K]
  ) => {
    setPrinciples((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const addPrinciple = () => {

    setPrinciples([
      ...principles,
      {
        id: Date.now(),
        icon: "",
        title: "",
        description: "",
        sort_order: principles.length + 1,
        active: true,
      },
    ]);
  };

  const removePrinciple = (index: number) => {
    setPrinciples((prev) => prev.filter((_, i) => i !== index));
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      await Promise.all([
        setContent("about", form),
        saveListContent("about-page-hero-features",features),
        saveListContent("about-page-founder-members", founders),
        saveListContent("about-page-principles", principles),
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

        <section className="admin-card rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-[#2A211C]">
            Hero Features
          </h2>

          <button
            type="button"
            onClick={addFeature}
            className="inline-flex items-center gap-2 text-[#8a5a12] hover:text-[#6E4E10]"
          >
            <Plus className="w-4 h-4" />
            Add Feature
          </button>
        </div>

        <div className="space-y-4">

          {features.map((feature, index) => (

            <div
              key={feature.id}
              className="rounded-xl border border-[#E8DFD2] bg-[#FAF7F2]/40 p-5 space-y-4"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm mb-2 text-[#6E655C] font-medium">
                    Icon
                  </label>

                  <input
                    className={inputClass}
                    value={feature.icon}
                    onChange={(e) =>
                      updateFeature(index, "icon", e.target.value)
                    }
                    placeholder="e.g. Building2"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-[#6E655C] font-medium">
                    Title
                  </label>

                  <input
                    className={inputClass}
                    value={feature.title}
                    onChange={(e) =>
                      updateFeature(index, "title", e.target.value)
                    }
                    placeholder="Feature title"
                  />
                </div>

              </div>

              <div>
                <label className="block text-sm mb-2 text-[#6E655C] font-medium">
                  Description
                </label>

                <textarea
                  rows={3}
                  className={`${inputClass} resize-none`}
                  value={feature.description}
                  onChange={(e) =>
                    updateFeature(index, "description", e.target.value)
                  }
                  placeholder="Feature description..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm mb-2 text-[#6E655C] font-medium">
                    Sort Order
                  </label>

                  <input
                    type="number"
                    className={inputClass}
                    value={feature.sort_order}
                    onChange={(e) =>
                      updateFeature(
                        index,
                        "sort_order",
                        Number(e.target.value),
                      )
                    }
                  />
                </div>

                <div className="flex items-end">
                  <label className="inline-flex items-center gap-2 text-sm text-[#6E655C] font-medium">
                    <input
                      type="checkbox"
                      checked={feature.active}
                      onChange={(e) =>
                        updateFeature(
                          index,
                          "active",
                          e.target.checked,
                        )
                      }
                    />
                    Active
                  </label>
                </div>

              </div>

              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="w-full py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Remove Feature
              </button>

            </div>

          ))}

        </div>
        </section>

        <section className="admin-card rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-[#2A211C]">
            Founder Members
          </h2>

          <button
            type="button"
            onClick={addFounder}
            className="inline-flex items-center gap-2 text-[#8a5a12] hover:text-[#6E4E10]"
          >
            <Plus className="w-4 h-4" />
            Add Member
          </button>
        </div>

        <div className="space-y-4">

          {founders.map((founder, index) => (

            <div
              key={founder.id}
              className="rounded-xl border border-[#E8DFD2] bg-[#FAF7F2]/40 p-5 space-y-4"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <ImageUpload
                  label="Member Photo"
                  value={founder.image || ""}
                  onChange={(v) => updateFounder(index, "image", v)}
                  maxSizeMb={2}
                  section="about"
                  recommendedWidth={500}
                  recommendedHeight={600}
                  hint="Founder member photo."
                />

                <div>
                  <label className="block text-sm mb-2 text-[#6E655C] font-medium">
                    Name
                  </label>

                  <input
                    className={inputClass}
                    value={founder.name}
                    onChange={(e) =>
                      updateFounder(index, "name", e.target.value)
                    }
                    placeholder="Member name"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm mb-2 text-[#6E655C] font-medium">
                    Title
                  </label>

                  <input
                    className={inputClass}
                    value={founder.title}
                    onChange={(e) =>
                      updateFounder(index, "title", e.target.value)
                    }
                    placeholder="Founder & CEO"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-[#6E655C] font-medium">
                    Short Description
                  </label>

                  <input
                    className={inputClass}
                    value={founder.short_description}
                    onChange={(e) =>
                      updateFounder(
                        index,
                        "short_description",
                        e.target.value,
                      )
                    }
                    placeholder="One line description"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm mb-2 text-[#6E655C] font-medium">
                    Sort Order
                  </label>

                  <input
                    type="number"
                    className={inputClass}
                    value={founder.sort_order}
                    onChange={(e) =>
                      updateFounder(
                        index,
                        "sort_order",
                        Number(e.target.value),
                      )
                    }
                  />
                </div>

                <div className="flex items-end">
                  <label className="inline-flex items-center gap-2 text-sm text-[#6E655C] font-medium">
                    <input
                      type="checkbox"
                      checked={founder.active}
                      onChange={(e) =>
                        updateFounder(
                          index,
                          "active",
                          e.target.checked,
                        )
                      }
                    />
                    Active
                  </label>
                </div>

              </div>

              <button
                type="button"
                onClick={() => removeFounder(index)}
                className="w-full py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Remove Member
              </button>

            </div>

          ))}
          </div>
        </section>

        <section className="admin-card rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[#2A211C]">
              Principles
            </h2>

            <button
              type="button"
              onClick={addPrinciple}
              className="inline-flex items-center gap-2 text-[#8a5a12] hover:text-[#6E4E10]">
              <Plus className="w-4 h-4" />
              Add Principle
            </button>
          </div>

          <div className="space-y-4">

            {principles.map((principle, index) => (

              <div
                key={principle.id}
                className="rounded-xl border border-[#E8DFD2] bg-[#FAF7F2]/40 p-5 space-y-4"
              >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Icon */}
                  <div>
                    <label className="block text-sm mb-2 text-[#6E655C] font-medium">
                      Icon
                    </label>

                    <select
                      className={inputClass}
                      value={principle.icon}
                      onChange={(e) =>
                        updatePrinciple(index, "icon", e.target.value)
                      }
                    >
                      <option value="">Select an icon</option>

                      {ICON_OPTIONS.map((icon) => (
                        <option key={icon.value} value={icon.value}>
                          {icon.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm mb-2 text-[#6E655C] font-medium">
                      Title
                    </label>

                    <input
                      className={inputClass}
                      value={principle.title}
                      onChange={(e) =>
                        updatePrinciple(index, "title", e.target.value)
                      }
                      placeholder="Principle title"
                    />
                  </div>

                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm mb-2 text-[#6E655C] font-medium">
                    Description
                  </label>

                  <textarea
                    rows={3}
                    className={`${inputClass} resize-none`}
                    value={principle.description}
                    onChange={(e) =>
                      updatePrinciple(
                        index,
                        "description",
                        e.target.value,
                      )
                    }
                    placeholder="Principle description..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Sort Order */}
                  <div>
                    <label className="block text-sm mb-2 text-[#6E655C] font-medium">
                      Sort Order
                    </label>

                    <input
                      type="number"
                      className={inputClass}
                      value={principle.sort_order}
                      onChange={(e) =>
                        updatePrinciple(
                          index,
                          "sort_order",
                          Number(e.target.value),
                        )
                      }
                    />
                  </div>

                  {/* Active */}
                  <div className="flex items-end">
                    <label className="inline-flex items-center gap-2 text-sm text-[#6E655C] font-medium">
                      <input
                        type="checkbox"
                        checked={principle.active}
                        onChange={(e) =>
                          updatePrinciple(
                            index,
                            "active",
                            e.target.checked,
                          )
                        }
                      />
                      Active
                    </label>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => removePrinciple(index)}
                  className="w-full py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove Principle
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
          <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl admin-btn-gold font-medium disabled:opacity-60 shrink-0">
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save About Section"}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
