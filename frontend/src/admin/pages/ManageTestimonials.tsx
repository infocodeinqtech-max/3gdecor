import SectionEditor from "../components/SectionEditor";
import AdminCrudPage from "../components/AdminCrudPage";
import { seedTestimonialsSection, seedTestimonials } from "../data/seedContent";
import { mediaUrl } from "../../utils/mediaUrl";

export default function ManageTestimonials() {
  return (
    <div className="max-w-6xl space-y-8">
      <SectionEditor
        title="Testimonials Section Header"
        description="Title and intro above the testimonial carousel."
        storageKey="testimonials-section"
        seedData={seedTestimonialsSection}
        wide
        fields={[
          { name: "label", label: "Section Label" },
          { name: "titleLine1", label: "Title Line 1" },
          { name: "titleHighlight", label: "Highlighted Line" },
          { name: "description", label: "Description", type: "textarea", rows: 2 },
        ]}
      />
      <AdminCrudPage
        title="Testimonial Items"
        description="Client quotes shown in the homepage carousel."
        storageKey="testimonials"
        seedData={seedTestimonials}
        columns={[
          {
            key: "image",
            label: "Photo",
            render: (row) =>
              row.image ? (
                <img src={mediaUrl(row.image) || row.image} alt="" className="w-10 h-10 rounded-full object-cover border border-[#E8DFD2]" />
              ) : (
                "—"
              ),
          },
          { key: "author", label: "Name" },
          { key: "role", label: "Role" },
          { key: "rating", label: "Rating" },
        ]}
        fields={[
          { name: "author", label: "Client Name" },
          { name: "role", label: "Role / Location" },
          { name: "quote", label: "Testimonial", type: "textarea", rows: 5 },
          { name: "image", label: "Photo", type: "image", uploadSection: "testimonials", recommendedWidth: 400, recommendedHeight: 400, imageHint: "Square headshot — shown as a round avatar." },
          { name: "rating", label: "Rating", defaultValue: "4.9 out of 5" },
        ]}
      />
    </div>
  );
}
