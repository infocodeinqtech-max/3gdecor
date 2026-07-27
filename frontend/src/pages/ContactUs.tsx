import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import Footer from "../app/components/Footer";
import Navbar from "../app/components/Navbar";
import contactBanner from "../assets/images/contact_4.png";
import { apiRequest } from "../api/client";
import { notifyCmsUpdated, subscribeCmsUpdated } from "../content/cmsSync";
import { WHATSAPP_NUMBER } from "../config/whatsapp";
import {
  seedContactOffices,
  type ContactOfficeItem,
} from "../admin/data/seedContent";
import { getListContent } from "../admin/utils/contentStorage";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  ArrowRight,
  Building2,
  Hammer,
  Sofa,
  Briefcase,
} from "lucide-react";
import { toast } from "sonner";
import {
  emailKeyupHint,
  isIndianPhone,
  isValidEmail,
  officeMapSrc,
  phoneKeyupHint,
  sanitizeMobileInput,
} from "../utils/validation";

const fieldVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

type ContactOffice = ContactOfficeItem;

const company = {
  name: "3G Decorative Group",
  whatsapp: WHATSAPP_NUMBER,
};

const inquiryOptions = [
  {
    value: "corporate-interior",
    label: "Corporate Interior",
    description: "Offices, lounges & workspace fit-outs",
    icon: Building2,
  },
  {
    value: "civil-structures",
    label: "Civil Structures",
    description: "Warehouses, sheds & industrial builds",
    icon: Hammer,
  },
  // {
  //   value: "domestic-interior",
  //   label: "Domestic Interior",
  //   description: "Residential & bespoke home design",
  //   icon: Sofa,
  // },
  // {
  //   value: "turnkey",
  //   label: "Turnkey Project",
  //   description: "End-to-end design & construction",
  //   icon: Briefcase,
  // },
] as const;

type InquiryValue = (typeof inquiryOptions)[number]["value"];

const inputClass = `
w-full
px-5
py-4

rounded-2xl

bg-white/5

border
border-[#D7A24B]/20

text-white
placeholder:text-white/50

transition-all
duration-300

focus:border-[#D7A24B]
focus:ring-4
focus:ring-[#D7A24B]/10
focus:outline-none
`;
// "contact-field w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300";

function FormField({
  index,
  children,
  className = "",
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      custom={index}
      variants={fieldVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ContactHero() {
  return (
    <section className="bg-[#F5F1EA] px-4 lg:px-5 overflow-x-hidden">
      <div className="relative overflow-hidden rounded-[20px] md:rounded-[32px] w-full max-w-full min-h-[480px] h-[min(760px,78svh)] md:h-[640px] lg:h-[760px]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={contactBanner}
            alt="Contact 3G Decorative Group — premium reception desk"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              /* Crop a bit more from top; show more of the desk/table below */
              objectPosition: "55% 34%",
              filter: "brightness(1.42) contrast(1.07) saturate(1.09)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(
                  100deg,
                  rgba(10,8,6,0.95) 0%,
                  rgba(10,8,6,0.82) 26%,
                  rgba(10,8,6,0.38) 42%,
                  rgba(10,8,6,0.12) 56%,
                  rgba(255,255,255,0.06) 78%,
                  rgba(255,255,255,0.14) 100%
                )
              `,
            }}
          />
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 right-0 h-[3px] origin-left z-30"
          style={{
            background: "linear-gradient(90deg,#f3bb27,#ea7a12,#f3bb27)",
          }}
        />

        <motion.div
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle,rgba(243,187,39,0.06) 0%,transparent 65%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div
          className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-16"
          style={{
            paddingTop: "clamp(88px, 14vw, 160px)",
            paddingBottom: "clamp(40px, 8vw, 80px)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex items-center gap-3 mb-8"
          >
            <Link
              to="/"
              className="text-[#F5F1EA]/35 hover:text-[#f3bb27] text-[11px] uppercase tracking-[0.25em] transition-colors"
              style={{ fontFamily: "'Parkinsans', sans-serif" }}
            >
              Home
            </Link>
            <ChevronRight className="size-3 text-[#f3bb27]/30" />
            <span
              className="text-[#f3bb27] text-[11px] uppercase tracking-[0.25em]"
              style={{ fontFamily: "'Parkinsans', sans-serif" }}
            >
              Contact
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-10 h-px bg-gradient-to-r from-[#f3bb27] to-[#ea7a12]" />
            <span
              className="text-[#f3bb27] text-[11px] uppercase tracking-[0.32em]"
              style={{ fontFamily: "'Parkinsans', sans-serif" }}
            >
              Get In Touch
            </span>
          </motion.div>

          <div className="max-w-2xl mb-7">
            {["Let's Build", "Something"].map((text, i) => (
              <div
                key={text}
                style={{ overflow: "hidden", paddingBottom: "10px" }}
              >
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.48 + i * 0.14,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-[#F5F1EA]"
                  style={{
                    display: "block",
                    fontFamily: "'Parkinsans', sans-serif",
                    fontSize: "clamp(36px, 7vw, 80px)",
                    fontWeight: 400,
                    lineHeight: "100%",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {text}
                  {i === 1 && (
                    <span
                      style={{
                        fontStyle: "italic",
                        background: "linear-gradient(90deg,#f3bb27,#ea7a12)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {" "}
                      Remarkable.
                    </span>
                  )}
                </motion.span>
              </div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.82 }}
            className="text-[#8a8078] max-w-lg"
            style={{
              fontFamily: "'Parkinsans', sans-serif",
              fontSize: "15.5px",
              lineHeight: 1.82,
            }}
          >
            Share your vision for corporate interiors, civil structures, or
            turnkey projects — our team responds within 24 hours.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: "corporate-interior" as InquiryValue,
    message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [offices, setOffices] = useState<ContactOffice[]>(seedContactOffices);
  const [activeOfficeId, setActiveOfficeId] = useState<number | string>(
    seedContactOffices[0]?.id ?? 1,
  );
  const [phoneHint, setPhoneHint] = useState<string | null>(null);
  const [emailHint, setEmailHint] = useState<string | null>(null);

  useEffect(() => {
    const load = () => {
      getListContent<ContactOffice>("contact-offices", seedContactOffices).then(
        (rows) => {
          const next = rows.length ? rows : seedContactOffices;
          setOffices(next);
          setActiveOfficeId((current) =>
            next.some((o) => o.id === current) ? current : next[0].id,
          );
        },
      );
    };
    load();
    return subscribeCmsUpdated(load);
  }, []);

  const selectedInquiry = inquiryOptions.find((o) => o.value === form.inquiry);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const inquiryLabel = selectedInquiry?.label ?? form.inquiry;
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      service: inquiryLabel,
      message: form.message.trim(),
    };

    if (!payload.name || !payload.message) {
      toast.error("Please fill in name and message");
      return;
    }
    if (!isValidEmail(payload.email)) {
      toast.error("Please enter a valid email address");
      setEmailHint("Enter a valid email (name@domain.com)");
      return;
    }
    if (!isIndianPhone(payload.phone)) {
      toast.error("Please enter a valid 10-digit Indian mobile number");
      setPhoneHint("Mobile must be 10 digits starting with 6–9");
      return;
    }

    setSubmitting(true);
    try {
      await apiRequest("/enquiries", {
        method: "POST",
        auth: false,
        body: {
          name: payload.name,
          email: payload.email,
          phone: payload.phone || null,
          service: payload.service,
          message: payload.message,
        },
      });

      notifyCmsUpdated("enquiry:create");
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        inquiry: "corporate-interior",
        message: "",
      });
      setPhoneHint(null);
      setEmailHint(null);
      toast.success("Inquiry submitted — our team will contact you soon.");

      const waBody = encodeURIComponent(
        `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nRegarding: ${payload.service}\n\n${payload.message}`,
      );
      window.open(`https://wa.me/${company.whatsapp}?text=${waBody}`, "_blank");
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to send enquiry",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // className="w-full overflow-x-hidden bg-[#F5F1EA]"
    <div className="w-full overflow-x-hidden bg-[#F7F3EE]">
      <Navbar activeNav="contact" />
      <div
        className="w-full overflow-x-hidden"
        style={{ fontFamily: "'Parkinsans', sans-serif" }}
      >
        <ContactHero />

        <section
          id="contact"
          className="relative overflow-hidden py-16 md:py-24"
        >
          <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-[#f3bb27]/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 -right-32 w-72 h-72 rounded-full bg-[#ea7a12]/10 blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[1]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14 md:mb-16"
            >
              <div className="flex items-center justify-center gap-4 mb-5">
                <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#f3bb27]" />
                <span className="text-[#ea7a12] text-[11px] uppercase tracking-[0.32em]">
                  Reach Us
                </span>
                <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#f3bb27]" />
              </div>
              <h2
                className="text-[#332C26] mb-4"
                style={{
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                }}
              >
                Company Details &{" "}
                <span className="bg-gradient-to-r from-[#f3bb27] to-[#ea7a12] bg-clip-text text-transparent">
                  Inquiry Form
                </span>
              </h2>
              <p className="text-[#6B625C] max-w-xl mx-auto text-[15px] leading-relaxed">
                Find our studios on the map or send us a message — tell us what
                your project is regarding and we&apos;ll guide you from there.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
              {/* Left — Company details */}
              <motion.div
                className="flex flex-col gap-4 order-2 lg:order-1 h-full min-h-0"
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
              >
                <div
                  className="grid gap-2 sm:gap-2.5 shrink-0"
                  style={{
                    gridTemplateColumns: `repeat(${Math.min(Math.max(offices.length, 1), 3)}, minmax(0, 1fr))`,
                  }}
                >
                  {offices.map((office) => {
                    const isActive = activeOfficeId === office.id;
                    return (
                      <button
                        key={office.id}
                        type="button"
                        onClick={() => setActiveOfficeId(office.id)}
                        aria-pressed={isActive}
                        className={`relative flex flex-col items-center justify-center gap-1.5 rounded-xl px-1.5 py-3 sm:py-3.5 text-center transition-all duration-300 border ${
                          isActive
                            ? "border-[#ea7a12]/50 bg-gradient-to-b from-[#f3bb27]/25 to-[#ea7a12]/10 shadow-[0_8px_22px_rgba(234,122,18,0.22)] scale-[1.02]"
                            : "border-[#f3bb27]/20 bg-white/60 hover:border-[#f3bb27]/45 hover:bg-[#f3bb27]/08"
                        }`}
                      >
                        <span
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isActive
                              ? "shadow-[0_4px_12px_rgba(234,122,18,0.28)]"
                              : ""
                          }`}
                          style={{
                            background: isActive
                              ? "linear-gradient(135deg,#f3bb27,#ea7a12)"
                              : "rgba(243, 187, 39, 0.18)",
                          }}
                        >
                          <MapPin
                            className={`w-3.5 h-3.5 ${
                              isActive ? "text-[#332C26]" : "text-[#ea7a12]"
                            }`}
                          />
                        </span>
                        <span
                          className={`text-[11px] sm:text-xs leading-tight ${
                            isActive ? "text-[#332C26]" : "text-[#6B625C]"
                          }`}
                          style={{ fontWeight: isActive ? 600 : 500 }}
                        >
                          {office.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-col flex-1 min-h-0">
                  <AnimatePresence mode="wait">
                    {(() => {
                      const office =
                        offices.find((o) => o.id === activeOfficeId) ??
                        offices[0];
                      if (!office) {
                        return (
                          <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="rounded-2xl border border-[#f3bb27]/25 bg-white/70 p-6 text-sm text-[#6B625C]"
                          >
                            No office locations yet. Add them from the admin
                            dashboard.
                          </motion.div>
                        );
                      }
                      return (
                        <motion.div
                          key={office.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="flex flex-col gap-3.5 flex-1 min-h-0 h-full"
                        >
                          <motion.div
                            // className="contact-details-card relative overflow-hidden rounded-2xl p-5 md:p-6 space-y-3.5 border border-[#f3bb27]/25 bg-white/70 backdrop-blur-sm shadow-[0_16px_48px_rgba(51,44,38,0.08)] shrink-0"
                            className="
                              relative
                              overflow-hidden
                              rounded-[28px]
                              p-5
                              md:p-6

                              bg-gradient-to-b
                              from-white
                              to-[#FAF5EE]

                              border
                              border-[#D7A24B]/20

                              shadow-[0_20px_60px_rgba(51,44,38,.08)]
                              "
                            whileHover={{
                              borderColor: "rgba(243, 187, 39, 0.5)",
                            }}
                          >
                            <motion.div
                              className="absolute -top-14 -right-14 w-32 h-32 rounded-full bg-[#f3bb27]/15 blur-3xl pointer-events-none"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.4, 0.65, 0.4],
                              }}
                              transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />

                            <div className="relative z-[1]">
                              <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#ea7a12] mb-1.5">
                                {company.name}
                              </p>
                              <h3
                                // className="text-[#332C26] text-[18px] md:text-[20px] "
                                style={{ fontWeight: 400 }}
                              >
                                {office.studioTitle}
                              </h3>
                              <div className="mt-4 mb-7 flex items-center">
                                <div className="w-14 h-[2px] rounded-full bg-[#D7A24B]" />
                              </div>
                            </div>

                            {(
                              [
                                {
                                  Icon: MapPin,
                                  label: "Address",
                                  text: office.address,
                                },
                                {
                                  Icon: Phone,
                                  label: "Phone",
                                  text: office.phone,
                                  href: `tel:${office.phone.replace(/\s/g, "")}`,
                                },
                                {
                                  Icon: Mail,
                                  label: "Email",
                                  text: office.email,
                                  href: `mailto:${office.email}`,
                                },
                                ...(office.hours?.trim()
                                  ? [
                                      {
                                        Icon: Clock,
                                        label: "Working Hours",
                                        text: office.hours,
                                      },
                                    ]
                                  : []),
                              ] as {
                                Icon: typeof MapPin;
                                label: string;
                                text: string;
                                href?: string;
                              }[]
                            ).map(({ Icon, label, text, href }, i) => (
                              <motion.div
                                key={label}
                                className="flex items-start gap-3 relative z-[1] rounded-xl p-2 -mx-0.5"
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: i * 0.06 + 0.05,
                                  duration: 0.35,
                                }}
                                whileHover={{
                                  x: 4,
                                  backgroundColor: "rgba(243, 187, 39, 0.06)",
                                }}
                              >
                                <div
                                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 shadow-[0_6px_16px_rgba(234,122,18,0.18)]"
                                  style={{
                                    background:
                                      "linear-gradient(135deg,#f3bb27,#ea7a12)",
                                  }}
                                >
                                  <Icon className="w-3.5 h-3.5 text-[#332C26]" />
                                </div>
                                <div className="pt-0.5 min-w-0">
                                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#ea7a12] mb-0.5">
                                    {label}
                                  </p>
                                  {href ? (
                                    <a
                                      href={href}
                                      className="text-[13px] text-[#332C26] hover:text-[#ea7a12] transition-colors leading-relaxed break-words"
                                    >
                                      {text}
                                    </a>
                                  ) : (
                                    <p className="text-[13px] text-[#6B625C] leading-relaxed">
                                      {text}
                                    </p>
                                  )}
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>

                          <div className="rounded-2xl overflow-hidden relative flex-1 min-h-[280px] sm:min-h-[340px] border border-[#f3bb27]/25 shadow-[0_12px_32px_rgba(51,44,38,0.1)]">
                            <iframe
                              title={`${office.heading} map`}
                              src={officeMapSrc(
                                office.mapEmbed,
                                office.address,
                              )}
                              className="absolute inset-0 w-full h-full border-0"
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                            />
                          </div>
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Right — Contact form */}
              <motion.div
                // className="contact-form-shell order-1 lg:order-2 h-full flex flex-col"
                className="
                order-1
                lg:order-2
                h-full
                flex
                flex-col
                rounded-[32px]
                overflow-hidden
                shadow-[0_30px_80px_rgba(0,0,0,.18)]
                border
                border-[#D7A24B]/20
                "
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1 }}
              >
                <form
                  onSubmit={handleSubmit}
                  // className="contact-form-inner contact-form-shine p-5 sm:p-8 md:p-10 space-y-5 overflow-hidden h-full"
                  className="
                    relative
                    overflow-hidden
                    rounded-[32px]
                    p-5
                    sm:p-8
                    md:p-10

                    bg-[#171311]

                    before:absolute
                    before:inset-0
                    before:bg-[radial-gradient(circle_at_top_right,rgba(243,187,39,.12),transparent_40%)]

                    after:absolute
                    after:inset-0
                    after:bg-[radial-gradient(circle_at_bottom_left,rgba(243,187,39,.08),transparent_40%)]
                    "
                >
                  <motion.div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#f3bb27]/20 blur-2xl pointer-events-none"
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.35, 0.55, 0.35],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-12 -left-8 w-28 h-28 rounded-full bg-[#ea7a12]/20 blur-2xl pointer-events-none"
                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="relative z-[1] space-y-5">
                    <FormField index={0}>
                      <p className="text-[14px] font-semibold uppercase tracking-[0.22em] text-[#ea7a12] mb-4">
                        Send an Inquiry
                      </p>
                      <h3
                        className="text-white text-xl mb-1"
                        style={{ fontWeight: 400 }}
                      >
                        Tell us about your project
                      </h3>
                      <p className="text-white/60 mb-5">
                        Fields marked with your details help us respond faster.
                      </p>
                    </FormField>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField index={1}>
                        <label className="block text-[10px] uppercase tracking-[0.18em] text-white/70 mb-2">
                          Your Name
                        </label>
                        <input
                          required
                          placeholder="Full name"
                          value={form.name}
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused(null)}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          className={inputClass}
                        />
                        {focused === "name" && (
                          <motion.span
                            layoutId="field-glow"
                            className="block h-0.5 mt-1 rounded-full"
                            style={{
                              background:
                                "linear-gradient(90deg,#f3bb27,#ea7a12)",
                            }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                          />
                        )}
                      </FormField>
                      <FormField index={2}>
                        <label className="block text-[10px] uppercase tracking-[0.18em] text-white/70 mb-2">
                          Email Address
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="you@company.com"
                          value={form.email}
                          onFocus={() => setFocused("email")}
                          onBlur={() => setFocused(null)}
                          onChange={(e) => {
                            const email = e.target.value;
                            setForm({ ...form, email });
                            setEmailHint(emailKeyupHint(email));
                          }}
                          onKeyUp={(e) =>
                            setEmailHint(
                              emailKeyupHint(
                                (e.target as HTMLInputElement).value,
                              ),
                            )
                          }
                          className={inputClass}
                        />
                        <p
                          className={`mt-1.5 text-[11px] ${
                            emailHint ? "text-red-600" : "text-[#8A8177]"
                          }`}
                        >
                          {emailHint ||
                            "Use a valid email like name@domain.com"}
                        </p>
                        {focused === "email" && (
                          <motion.span
                            className="block h-0.5 mt-1 rounded-full"
                            style={{
                              background:
                                "linear-gradient(90deg,#f3bb27,#ea7a12)",
                            }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                          />
                        )}
                      </FormField>
                    </div>

                    <FormField index={3}>
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-white/70 mb-2">
                        Mobile Number
                      </label>
                      <input
                        required
                        type="tel"
                        inputMode="numeric"
                        pattern="[6-9][0-9]{9}"
                        autoComplete="tel"
                        maxLength={10}
                        placeholder="8167028450"
                        value={form.phone}
                        onFocus={() => setFocused("phone")}
                        onBlur={() => setFocused(null)}
                        onChange={(e) => {
                          const phone = sanitizeMobileInput(e.target.value);
                          setForm({ ...form, phone });
                          setPhoneHint(phoneKeyupHint(phone));
                        }}
                        onKeyUp={(e) =>
                          setPhoneHint(
                            phoneKeyupHint(
                              (e.target as HTMLInputElement).value,
                            ),
                          )
                        }
                        className={inputClass}
                      />
                      <p
                        className={`mt-1.5 text-[11px] ${
                          phoneHint ? "text-red-600" : "text-[#8A8177]"
                        }`}
                      >
                        {phoneHint ||
                          "Exactly 10 digits (starts with 6–9). No letters."}
                      </p>
                      {focused === "phone" && (
                        <motion.span
                          className="block h-0.5 mt-1 rounded-full"
                          style={{
                            background:
                              "linear-gradient(90deg,#f3bb27,#ea7a12)",
                          }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                        />
                      )}
                    </FormField>

                    <FormField index={4}>
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-white/70 mb-3">
                        Regarding Your Enquiry
                      </label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {inquiryOptions.map((option, i) => {
                          const Icon = option.icon;
                          const selected = form.inquiry === option.value;
                          return (
                            <motion.button
                              key={option.value}
                              type="button"
                              onClick={() =>
                                setForm({ ...form, inquiry: option.value })
                              }
                              initial={{ opacity: 0, y: 12 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.35 + i * 0.07 }}
                              whileHover={{ y: -3, scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer"
                              style={{
                                // borderColor: selected
                                //   ? "rgba(243,187,39,0.85)"
                                //   : "rgba(180,120,30,0.25)",
                                borderColor: selected
                                  ? "rgba(243,187,39,.85)"
                                  : "rgba(255,255,255,.08)",
                                // background: selected
                                //   ? "linear-gradient(135deg,rgba(243,187,39,0.12),rgba(234,122,18,0.08))"
                                //   : "rgba(255,255,255,0.85)",
                                background: selected
                                  ? "linear-gradient(135deg,rgba(243,187,39,.15),rgba(234,122,18,.08))"
                                  : "rgba(255,255,255,.04)",
                                boxShadow: selected
                                  ? "0 8px 24px rgba(234,122,18,0.15)"
                                  : "none",
                              }}
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                                  style={{
                                    background: selected
                                      ? "linear-gradient(135deg,#f3bb27,#ea7a12)"
                                      : "rgba(243,187,39,0.15)",
                                  }}
                                >
                                  <Icon
                                    className="size-4"
                                    style={{
                                      color: selected ? "#332C26" : "#ea7a12",
                                    }}
                                  />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-white/70">
                                    {option.label}
                                  </p>
                                  <p className="text-[11px] text-white/70 mt-0.5 leading-snug">
                                    {option.description}
                                  </p>
                                </div>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </FormField>

                    <FormField index={5}>
                      <label className="block text-[10px] uppercase tracking-[0.18em] text-white/70 mb-2">
                        Project Details
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell us about your space, timeline, and requirements..."
                        value={form.message}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        className={`${inputClass} resize-none`}
                      />
                      {focused === "message" && (
                        <motion.span
                          className="block h-0.5 mt-1 rounded-full"
                          style={{
                            background:
                              "linear-gradient(90deg,#f3bb27,#ea7a12)",
                          }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                        />
                      )}
                    </FormField>

                    <FormField index={6}>
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={{
                          scale: 1.02,
                          y: -2,
                          boxShadow: "0 16px 48px rgba(243,187,39,0.35)",
                        }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 text-[#332C26] font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                        style={{
                          borderRadius: "100px",
                          fontSize: "13.5px",
                          letterSpacing: "0.06em",
                          fontFamily: "'Parkinsans', sans-serif",
                          // background:
                          //   "linear-gradient(135deg,#332C26 0%,#1e1a17 50%,#332C26 100%)",
                          background: "linear-gradient(135deg,#F3BB27,#EA7A12)",
                          backgroundSize: "200% 100%",
                          boxShadow: "0 8px 32px rgba(51,44,38,0.22)",
                        }}
                        animate={
                          submitted
                            ? { backgroundPosition: "100% 0" }
                            : { backgroundPosition: "0% 0" }
                        }
                      >
                        {submitting
                          ? "Sending…"
                          : submitted
                            ? "Inquiry sent!"
                            : "Send Inquiry"}
                        <ArrowRight className="size-4" />
                      </motion.button>
                    </FormField>
                  </div>
                </form>
              </motion.div>
              {/* Right — Contact form Ends*/}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
