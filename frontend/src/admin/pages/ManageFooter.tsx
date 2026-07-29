import SectionEditor from "../components/SectionEditor";
import { seedFooter } from "../data/seedContent";

export default function ManageFooter() {
  return (
    <SectionEditor
      title="Footer"
      description="Edit footer tagline, newsletter and copyright text. Contact details & WhatsApp are managed under Contact → Contact Info & WhatsApp."
      storageKey="footer"
      seedData={seedFooter}
      fields={[
        { name: "tagline", label: "Company Tagline", type: "textarea", rows: 2 },
        { name: "newsletterTitle", label: "Newsletter Title" },
        { name: "newsletterText", label: "Newsletter Text", type: "textarea", rows: 2 },
        { name: "copyright", label: "Copyright Text" },
      ]}
    />
  );
}
