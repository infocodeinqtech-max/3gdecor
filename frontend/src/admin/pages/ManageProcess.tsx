import SectionEditor from "../components/SectionEditor";
import AdminCrudPage from "../components/AdminCrudPage";
import { seedProcessSection, seedProcess } from "../data/seedContent";

export default function ManageProcess() {
  return (
    <div className="max-w-6xl space-y-8">
      <SectionEditor
        title="Process Section Header"
        description="Title and intro for the How We Work timeline."
        storageKey="process-section"
        seedData={seedProcessSection}
        wide
        fields={[
          { name: "label", label: "Section Label" },
          { name: "title", label: "Title" },
          { name: "description", label: "Description", type: "textarea", rows: 2 },
        ]}
      />
      <AdminCrudPage
        title="Process Steps"
        description="Manage timeline steps shown on the homepage."
        storageKey="process"
        seedData={seedProcess}
        columns={[
          { key: "step", label: "Step" },
          { key: "title", label: "Title" },
          { key: "description", label: "Description" },
        ]}
        fields={[
          { name: "step", label: "Step Number", placeholder: "01" },
          { name: "title", label: "Step Title" },
          { name: "description", label: "Description", type: "textarea" },
        ]}
      />
    </div>
  );
}
