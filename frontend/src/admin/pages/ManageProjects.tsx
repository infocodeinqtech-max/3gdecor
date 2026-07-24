import SectionEditor from "../components/SectionEditor";
import AdminCrudPage from "../components/AdminCrudPage";
import { seedProjectsSection, seedProjects } from "../data/seedContent";

export default function ManageProjects() {
  return (
    <div className="max-w-6xl space-y-8">
      <SectionEditor
        title="Projects Section Header"
        description="Portfolio section title and intro text on the homepage."
        storageKey="projects-section"
        seedData={seedProjectsSection}
        wide
        fields={[
          { name: "label", label: "Section Label" },
          { name: "title", label: "Title" },
          { name: "description", label: "Description", type: "textarea", rows: 2 },
          { name: "ctaText", label: "Bottom Button Text" },
        ]}
      />
      <AdminCrudPage
        title="Project Cards"
        description="First featured project shows as the large card. Up to 5 projects display on homepage."
        storageKey="projects"
        seedData={seedProjects}
        columns={[
          {
            key: "image",
            label: "Image",
            render: (row) =>
              row.image ? (
                <img src={row.image} alt="" className="w-14 h-10 rounded-lg object-cover border border-[#E8DFD2]" />
              ) : (
                "—"
              ),
          },
          { key: "title", label: "Title" },
          { key: "category", label: "Category" },
          {
            key: "featured",
            label: "Featured",
            render: (row) => (row.featured ? "Yes" : "No"),
          },
        ]}
        fields={[
          { name: "title", label: "Project Title" },
          {
            name: "category",
            label: "Category",
            type: "select",
            options: [
              { value: "Residential", label: "Residential" },
              { value: "Commercial", label: "Commercial" },
            ],
          },
          { name: "image", label: "Project Image", type: "image" },
          { name: "featured", label: "Featured (large card)", type: "checkbox" },
        ]}
      />
    </div>
  );
}
