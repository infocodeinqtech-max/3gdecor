import { useState } from "react";
import AdminCrudPage from "../components/AdminCrudPage";
import SectionEditor from "../components/SectionEditor";
import {
  seedContactOffices,
  seedContactPage,
  seedSiteContact,
} from "../data/seedContent";
import {
  emailKeyupHint,
  isIndianMobile,
  isIndianPhone,
  isValidEmail,
  phoneKeyupHint,
  sanitizeMobileInput,
  sanitizePhoneInput,
} from "../../utils/validation";

type ContactTab = "sections" | "contact-info" | "offices";

const tabBtn = (active: boolean) =>
  `rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
    active
      ? "bg-[linear-gradient(135deg,rgba(244,178,35,0.14),rgba(234,122,18,0.1))] text-[#8a5a12] border border-[rgba(212,166,75,0.35)]"
      : "border border-transparent text-[#6e655c] hover:bg-[#f0e9df] hover:text-[#332c26]"
  }`;

export default function ManageContactOffices() {
  const [tab, setTab] = useState<ContactTab>("sections");

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTab("sections")}
          className={tabBtn(tab === "sections")}
        >
          Contact Page Sections
        </button>
        <button
          type="button"
          onClick={() => setTab("contact-info")}
          className={tabBtn(tab === "contact-info")}
        >
          Contact Info & WhatsApp
        </button>
        <button
          type="button"
          onClick={() => setTab("offices")}
          className={tabBtn(tab === "offices")}
        >
          Contact Offices
        </button>
      </div>

      {tab === "sections" ? (
        <SectionEditor
          title="Contact Page Sections"
          description="Manage contact page banner and written sections."
          storageKey="contact-page"
          seedData={seedContactPage}
          fields={[
            {
              name: "bannerImage",
              label: "Banner Image",
              type: "image",
              uploadSection: "contact",
              recommendedWidth: 1920,
              recommendedHeight: 1080,
              imageHint: "Full-width contact page hero banner.",
            },
            { name: "heroEyebrow", label: "Hero Eyebrow" },
            { name: "heroTitleLine1", label: "Hero Title Line 1" },
            { name: "heroTitleLine2", label: "Hero Title Line 2" },
            { name: "heroTitleHighlight", label: "Hero Title Highlight" },
            {
              name: "heroDescription",
              label: "Hero Description",
              type: "textarea",
              rows: 3,
            },
            { name: "detailsEyebrow", label: "Details Eyebrow" },
            { name: "detailsTitle", label: "Details Title" },
            { name: "detailsTitleHighlight", label: "Details Title Highlight" },
            {
              name: "detailsDescription",
              label: "Details Description",
              type: "textarea",
              rows: 3,
            },
            { name: "formEyebrow", label: "Form Eyebrow" },
            { name: "formTitle", label: "Form Title" },
            {
              name: "formDescription",
              label: "Form Description",
              type: "textarea",
              rows: 2,
            },
          ]}
          wide
        />
      ) : tab === "contact-info" ? (
        <SectionEditor
          title="Contact Info & WhatsApp"
          description="Shared contact details used in the website footer, plus the WhatsApp number for the homepage floating button."
          storageKey="site-contact"
          seedData={seedSiteContact}
          validateForm={(form) => {
            const email = String(form.email ?? "").trim();
            const phone = String(form.phone ?? "").trim();
            const whatsapp = String(form.whatsappNumber ?? "").trim();
            if (!String(form.address ?? "").trim()) return "Address is required";
            if (!String(form.country ?? "").trim()) return "Country is required";
            if (!isValidEmail(email)) return "Enter a valid email address";
            if (!isIndianPhone(phone, { allowLandline: true })) {
              return "Phone must be 10-digit mobile or 11-digit landline";
            }
            if (!isIndianMobile(whatsapp)) {
              return "WhatsApp number must be exactly 10 digits (starts with 6–9)";
            }
            return null;
          }}
          fields={[
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
            {
              name: "whatsappNumber",
              label: "WhatsApp Number (homepage button)",
              sanitize: sanitizeMobileInput,
              maxLength: 10,
              inputMode: "numeric",
              liveHint: (v) => phoneKeyupHint(v),
              helperText:
                "Exactly 10 digits (starts with 6–9). Used by the floating WhatsApp button.",
            },
          ]}
        />
      ) : (
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
              helperText:
                "Mobile: 10 digits · Landline: 11 digits (start with 0). Digits only.",
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
      )}
    </div>
  );
}
