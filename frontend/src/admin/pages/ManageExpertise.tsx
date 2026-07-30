import SectionEditor from "../components/SectionEditor";
import AdminCrudPage from "../components/AdminCrudPage";
import { seedExpertiseSection, seedExpertise } from "../data/seedContent";
import { mediaUrl } from "../../utils/mediaUrl";

export default function ManageExpertise() {
  return (
    <div className="max-w-6xl space-y-8">
      <SectionEditor
        title="Expertise Section Header"
        description="Title and description above the expertise cards."
        storageKey="expertise-section"
        seedData={seedExpertiseSection}
        wide
        fields={[
          { name: "titleLine1", label: "Title Line 1" },
          { name: "titleLine2", label: "Title Line 2" },
          { name: "description", label: "Description", type: "textarea", rows: 3 },
        ]}
      />
      <AdminCrudPage
        title="Expertise Cards"
        description="Manage feature cards in the expertise section."
        storageKey="expertise"
        seedData={seedExpertise}
        columns={[
          {
            key: "image",
            label: "Image",
            render: (row) =>
              row.image ? (
                <img src={mediaUrl(row.image) || row.image} alt="" className="w-14 h-10 rounded-lg object-cover border border-[#E8DFD2]" />
              ) : (
                "—"
              ),
          },
          { key: "title", label: "Title" },
          { key: "description", label: "Description" },
        ]}
        fields={[
          { name: "title", label: "Title" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "image", label: "Card Image", type: "image", uploadSection: "expertise", recommendedWidth: 800, recommendedHeight: 1200, imageHint: "Portrait card photo for expertise section." },
        ]}
      />
    </div>
  );
}
