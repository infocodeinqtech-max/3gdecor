import AdminCrudPage from "../components/AdminCrudPage";
import { seedContactOffices } from "../data/seedContent";
import {
  emailKeyupHint,
  isIndianPhone,
  isValidEmail,
  phoneKeyupHint,
  sanitizePhoneInput,
} from "../../utils/validation";

export default function ManageContactOffices() {
  return (
    <div className="max-w-6xl space-y-8">
      <AdminCrudPage
        title="Contact Offices"
        description="Manage location-wise studio details shown on the Contact page — label, address, phone, email, hours and map embed for each office."
        storageKey="contact-offices"
        seedData={seedContactOffices}
        validateForm={(form) => {
          const email = String(form.email ?? "").trim();
          const phone = String(form.phone ?? "").trim();
          if (!isValidEmail(email)) {
            return "Enter a valid email address";
          }
          if (!isIndianPhone(phone, { allowLandline: true })) {
            return "Phone must be 10-digit mobile (6–9…) or 11-digit landline (0…)";
          }
          return null;
        }}
        columns={[
          { key: "label", label: "Location" },
          { key: "phone", label: "Phone" },
          { key: "email", label: "Email" },
          {
            key: "address",
            label: "Address",
            render: (row) => (
              <span className="line-clamp-2 max-w-xs text-sm">
                {(row as { address?: string }).address || "—"}
              </span>
            ),
          },
        ]}
        fields={[
          {
            name: "label",
            label: "Tab Label",
            placeholder: "e.g. Kolkata",
          },
          {
            name: "heading",
            label: "Heading",
            placeholder: "e.g. Kolkata Address",
          },
          {
            name: "studioTitle",
            label: "Studio Title",
            placeholder: "e.g. Visit Our Kolkata Studio",
          },
          {
            name: "address",
            label: "Full Address",
            type: "textarea",
            rows: 3,
          },
          {
            name: "phone",
            label: "Phone (mobile or landline)",
            placeholder: "8167028450 or 03340001234",
            maxLength: 11,
            inputMode: "numeric",
            sanitize: sanitizePhoneInput,
            liveHint: (v) => phoneKeyupHint(v, { allowLandline: true }),
            helperText: "Mobile: 10 digits · Landline: 11 digits (start with 0). Digits only.",
          },
          {
            name: "email",
            label: "Email",
            liveHint: emailKeyupHint,
            helperText: "Valid format: name@domain.com",
          },
          {
            name: "hours",
            label: "Working Hours (optional)",
            placeholder: "Mon – Sat, 9:00 AM – 7:00 PM",
            required: false,
          },
          {
            name: "mapEmbed",
            label: "Google Maps Embed URL (optional)",
            type: "textarea",
            rows: 3,
            placeholder:
              "Leave blank to auto-generate a map from the address",
            required: false,
          },
        ]}
      />
    </div>
  );
}
