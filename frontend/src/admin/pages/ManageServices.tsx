import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "../components/ImageUpload";
import SectionEditor from "../components/SectionEditor";
import { getListContent, saveListContent } from "../utils/contentStorage";
import {
  seedServicesSection,
  seedServices,
  type ServiceItem,
} from "../data/seedContent";

const inputClass = "w-full px-4 py-2.5 rounded-xl admin-input";
const cardClass = "admin-card rounded-2xl p-5 space-y-3";

export default function ManageServices() {
  const [services, setServices] = useState<ServiceItem[]>(seedServices);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const rows = await getListContent("services", seedServices);
      setServices(mergeServices(rows));
      setLoading(false);
    })();
  }, []);

  const updateService = (
    index: number,
    field: keyof ServiceItem,
    value: string,
  ) => {
    setServices((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const addService = () => {
    setServices((prev) => [
      ...prev,
      {
        id: Date.now(),
        category: "New Category",
        title: "New Service",
        description: "Service description",
        backgroundImage: "",
      },
    ]);
  };

  const removeService = (index: number) => {
    if (services.length <= 1) {
      toast.error("At least one service is required");
      return;
    }
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveListContent("services", services);
      toast.success("Services saved to database");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-[#8A8177]">Loading services...</p>;

  return (
    <div className="max-w-6xl space-y-8">
      <SectionEditor
        title="Services Section Header"
        description="Title shown above the service cards."
        storageKey="services-section"
        seedData={seedServicesSection}
        wide
        fields={[
          { name: "label", label: "Section Label" },
          { name: "title", label: "Title" },
        ]}
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold admin-page-title">Service Categories</h2>
            <p className="text-sm admin-card-muted mt-1">
              Homepage shows the first 3 cards. Each category has a hover background image.
            </p>
          </div>
          <button
            type="button"
            onClick={addService}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E0D5C8] text-sm font-medium hover:bg-[#FAF7F2]"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {services.map((service, index) => (
            <motion.section
              key={service.id}
              className={cardClass}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[#2A211C]">
                  Category {index + 1}
                  {index < 3 && (
                    <span className="ml-2 text-xs font-normal text-[#8a5a12]">
                      (shown on homepage)
                    </span>
                  )}
                </h3>
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                  aria-label="Remove service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <ImageUpload
                label="Category Background Image"
                value={service.backgroundImage}
                onChange={(v) => updateService(index, "backgroundImage", v)}
                maxSizeMb={8}
                hint="This image shows as the section background when hovering the card."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-2 text-[#6E655C] font-medium">
                    Category Label
                  </label>
                  <input
                    className={inputClass}
                    value={service.category}
                    onChange={(e) => updateService(index, "category", e.target.value)}
                    placeholder="Design"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-[#6E655C] font-medium">
                    Service Title
                  </label>
                  <input
                    className={inputClass}
                    value={service.title}
                    onChange={(e) => updateService(index, "title", e.target.value)}
                    placeholder="Interior Design"
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
                  value={service.description}
                  onChange={(e) => updateService(index, "description", e.target.value)}
                />
              </div>
            </motion.section>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="admin-note rounded-xl p-4 text-sm flex-1">
            Upload one background image per category. Save to update the homepage services section.
          </div>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl admin-btn-gold font-medium disabled:opacity-60 shrink-0"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Services"}
          </button>
        </div>
      </form>
    </div>
  );
}

function mergeServices(stored: ServiceItem[]): ServiceItem[] {
  const merged = seedServices.map((seedItem, index) => {
    const storedItem =
      stored.find((item) => item.id === seedItem.id) ?? stored[index];
    if (!storedItem) return seedItem;

    return {
      ...seedItem,
      ...storedItem,
      backgroundImage:
        storedItem.backgroundImage?.trim() || seedItem.backgroundImage,
    };
  });

  const extras = stored.filter(
    (item) => !merged.some((mergedItem) => mergedItem.id === item.id),
  );

  return [...merged, ...extras];
}
