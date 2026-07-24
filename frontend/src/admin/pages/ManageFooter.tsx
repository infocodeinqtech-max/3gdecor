import SectionEditor from "../components/SectionEditor";
import { seedFooter } from "../data/seedContent";
import {
  emailKeyupHint,
  isIndianPhone,
  isValidEmail,
  phoneKeyupHint,
  sanitizePhoneInput,
} from "../../utils/validation";

export default function ManageFooter() {
  return (
    <SectionEditor
      title="Footer"
      description="Edit footer contact info, newsletter and copyright text."
      storageKey="footer"
      seedData={seedFooter}
      validateForm={(form) => {
        const email = String(form.email ?? "").trim();
        const phone = String(form.phone ?? "").trim();
        if (!isValidEmail(email)) return "Enter a valid email address";
        if (!isIndianPhone(phone, { allowLandline: true })) {
          return "Phone must be 10-digit mobile or 11-digit landline";
        }
        return null;
      }}
      fields={[
        { name: "tagline", label: "Company Tagline", type: "textarea", rows: 2 },
        { name: "address", label: "Address" },
        { name: "country", label: "Country" },
        {
          name: "phone",
          label: "Phone (mobile 10 / landline 11)",
          sanitize: sanitizePhoneInput,
          maxLength: 11,
          inputMode: "numeric",
          liveHint: (v) => phoneKeyupHint(v, { allowLandline: true }),
          helperText: "Digits only. Mobile: 10 · Landline: 11 (starts with 0).",
        },
        {
          name: "email",
          label: "Email",
          liveHint: emailKeyupHint,
          helperText: "Valid format: name@domain.com",
        },
        { name: "hours", label: "Business Hours" },
        { name: "newsletterTitle", label: "Newsletter Title" },
        { name: "newsletterText", label: "Newsletter Text", type: "textarea", rows: 2 },
        { name: "copyright", label: "Copyright Text" },
      ]}
    />
  );
}
