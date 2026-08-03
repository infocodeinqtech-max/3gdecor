import { useEffect, useState } from "react";
import {
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Clock,
  ChevronRight,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/3GDecoLogo-2.png";
import { getContent, getListContent } from "../../admin/utils/contentStorage";
import {
  seedFooter,
  seedSiteContact,
  seedContactOffices,
  type ContactOfficeItem,
} from "../../admin/data/seedContent";
import { mediaUrl } from "../../utils/mediaUrl";
import { officeMapSrc } from "../../utils/validation";
import { subscribeCmsUpdated } from "../../content/cmsSync";
import {
  getCachedPublicSiteCms,
  loadPublicSiteCms,
  type PublicSiteCms,
} from "../../content/publicCms";

function footerFromSite(site: PublicSiteCms | null) {
  if (!site) return seedFooter;
  const branding =
    site.footer && typeof site.footer === "object"
      ? (site.footer as Partial<typeof seedFooter>)
      : {};
  const contact =
    site.siteContact && typeof site.siteContact === "object"
      ? (site.siteContact as Partial<typeof seedSiteContact>)
      : {};
  if (!site.footer && !site.siteContact) return seedFooter;
  return {
    ...seedFooter,
    ...branding,
    address: contact.address ?? seedFooter.address,
    country: contact.country ?? seedFooter.country,
    phone: contact.phone ?? seedFooter.phone,
    email: contact.email ?? seedFooter.email,
    hours: contact.hours ?? seedFooter.hours,
  };
}

function officesFromSite(site: PublicSiteCms | null): ContactOfficeItem[] {
  const rows = (site?.contactOffices as ContactOfficeItem[] | undefined) ?? [];
  return rows.length ? rows : seedContactOffices;
}

export default function Footer() {
  const cached = getCachedPublicSiteCms();
  const [footer, setFooter] = useState(() => footerFromSite(cached));
  const [offices, setOffices] = useState<ContactOfficeItem[]>(() =>
    officesFromSite(cached),
  );
  const [activeOfficeId, setActiveOfficeId] = useState<number | string>(
    () => officesFromSite(cached)[0]?.id ?? 1,
  );

  useEffect(() => {
    const reload = (force: boolean) => {
      loadPublicSiteCms(force)
        .then(async (site) => {
          const branding =
            site.footer && typeof site.footer === "object"
              ? (site.footer as Partial<typeof seedFooter>)
              : {};
          const contact =
            site.siteContact && typeof site.siteContact === "object"
              ? (site.siteContact as Partial<typeof seedSiteContact>)
              : {};
          if (site.footer || site.siteContact) {
            setFooter({
              ...seedFooter,
              ...branding,
              address: contact.address ?? seedFooter.address,
              country: contact.country ?? seedFooter.country,
              phone: contact.phone ?? seedFooter.phone,
              email: contact.email ?? seedFooter.email,
              hours: contact.hours ?? seedFooter.hours,
            });
          } else {
            const [brand, contactData] = await Promise.all([
              getContent("footer", seedFooter),
              getContent("site-contact", seedSiteContact),
            ]);
            setFooter({
              ...seedFooter,
              ...brand,
              address: contactData.address,
              country: contactData.country,
              phone: contactData.phone,
              email: contactData.email,
              hours: contactData.hours,
            });
          }

          const fromSite =
            (site.contactOffices as ContactOfficeItem[] | undefined) ?? [];
          if (fromSite.length) {
            setOffices(fromSite);
            setActiveOfficeId((current) =>
              fromSite.some((o) => o.id === current)
                ? current
                : fromSite[0].id,
            );
          } else {
            const fallback = await getListContent<ContactOfficeItem>(
              "contact-offices",
              seedContactOffices,
            );
            const next = fallback.length ? fallback : seedContactOffices;
            setOffices(next);
            setActiveOfficeId((current) =>
              next.some((o) => o.id === current) ? current : next[0].id,
            );
          }
        })
        .catch(() => undefined);
    };
    reload(false);
    return subscribeCmsUpdated(() => reload(true));
  }, []);

  const activeOffice =
    offices.find((o) => o.id === activeOfficeId) ?? offices[0];

  const footerBg = mediaUrl("/uploads/footer/footer-bg.jpg");

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[#2A211C] text-[#F5F1EA] pt-14 md:pt-16"
    >
      {/* Luxury background */}
      <div className="absolute inset-0 opacity-10">
        <img
          src={footerBg}
          className="w-full h-full object-cover"
          alt=""
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#2A211C]/90 to-[#17110D]" />

      <div
        // className="relative z-10 max-w-7xl mx-auto px-8"
        className="relative z-10 max-w-[92rem] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12"
      >
        {/* Top Footer */}
        {/* <div
          // className="
          // grid
          // grid-cols-1
          // sm:grid-cols-2
          // xl:grid-cols-4
          // gap-10
          // lg:gap-16
          // pb-20
          // border-b
          // border-[#D4A24C]/20
          // "
          className="
            lg:col-span-3
            flex
            flex-col
            items-center
            lg:items-start
            text-center
            lg:text-left
          "
        > */}
        <div
          //         className="
          //   grid
          //   grid-cols-1
          //   lg:grid-cols-12

          //   gap-y-12
          //   gap-x-10
          //   lg:gap-x-16

          //   items-start

          //   pb-20
          //   border-b
          //   border-[#D4A24C]/20
          // "
          className="
  grid
    grid-cols-1
    lg:grid-cols-12
    gap-6 lg:gap-8
    items-start
   pb-10
  border-b
  border-[#D4A24C]/20"
        >
          {/* Logo */}
          <div
            // className="lg:col-span-3"
            //   className="
            //     xl:col-span-3

            //     flex
            //     flex-col

            //     items-center
            //     md:items-start

            //     text-center
            //     md:text-left

            //     w-full
            // "
            className="
xl:col-span-3
lg:col-span-3
w-full
flex
flex-col
items-center
lg:items-start
text-center
lg:text-left
"
          >
            <motion.img
              src={logo}
              alt="3G Decorative Group"
              // className="w-44 lg:w-52 mb-8"
              animate={{
                filter: [
                  "drop-shadow(0 0 0px #D4A24C)",
                  "drop-shadow(0 0 12px #D4A24C)",
                  "drop-shadow(0 0 0px #D4A24C)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              // className="
              //   w-36
              //   sm:w-40
              //   md:w-44
              //   xl:w-52

              //   mb-8

              //   mx-auto
              //   md:mx-0
              //   "
              className="
                w-28
                sm:w-32
                md:w-36
                xl:w-40
                mb-4
                mx-auto
                md:mx-0
                "
            />

            <p
              // className="text-[#D7D0C7] leading-8 text-sm"
              className="
text-[#D7D0C7]
leading-6
text-sm

max-w-sm

mx-auto
md:mx-0

text-center
md:text-left
"
              style={{
                fontFamily: "'Parkinsans',sans-serif",
              }}
            >
              {footer.tagline}
            </p>

            <div
              className="flex justify-center lg:justify-start gap-3 mt-5
            "
            >
              {[Instagram, Facebook, Linkedin].map((Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -6,
                    scale: 1.12,
                    boxShadow: "0 0 20px rgba(212,162,76,.35)",
                  }}
                  className="
                  size-12
                  rounded-full
                  border
                  border-[#D4A24C]
                  flex
                  items-center
                  justify-center
                  cursor-pointer
                  hover:bg-[#D4A24C]
                  hover:text-black
                  transition-all
                  "
                >
                  <Icon size={18} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Links */}

          {/* <div>
            <h3
              className="
              text-[#D4A24C]
              mb-8
              tracking-[0.2em]
              "
            >
              QUICK LINKS
            </h3>

            {[
              "Home",
              "About Us",
              "Services",
              "Projects",
              "Our Process",
              "Testimonials",
            ].map((item) => (
              <motion.div
                key={item}
                whileHover={{ x: 8 }}
                className="
                group
                flex
                justify-between
                items-center
                mb-5
                cursor-pointer
                border-b
                border-[#D4A24C]/10
                pb-3
                "
                style={{
                  fontFamily: "'Parkinsans',sans-serif",
                  fontSize: "15px",
                }}
              >
                <span
                  className="
                group-hover:text-[#D4A24C]
                transition-all
                "
                >
                  {item}
                </span>

                <ChevronRight
                  size={16}
                  className="
                text-[#D4A24C]
                group-hover:translate-x-1
                transition-all
                "
                />
              </motion.div>
            ))}
          </div> */}

          {/* Services */}

          {/* <div>
            <h3
              className="
            text-[#D4A24C]
            mb-8
            tracking-[0.2em]
            "
            >
              SERVICES
            </h3>

            {[
              "Interior Design",
              "Architecture",
              "Space Planning",
              "Furniture Design",
              "Luxury Living",
            ].map((item) => (
              <motion.div
                key={item}
                whileHover={{ x: 8 }}
                className="
                group
                flex
                justify-between
                items-center
                mb-5
                border-b
                border-[#D4A24C]/10
                pb-3
                cursor-pointer
                "
                style={{
                  fontFamily: "'Parkinsans',sans-serif",
                  fontSize: "15px",
                }}
              >
                <span
                  className="
                    group-hover:text-[#D4A24C]
                    transition-all
                    "
                >
                  {item}
                </span>

                <ChevronRight
                  size={16}
                  className="
            text-[#D4A24C]
            group-hover:translate-x-1
            transition-all
            "
                />
              </motion.div>
            ))}
          </div> */}

          {/* Find Us — location labels + map + details */}
          <div className="lg:col-span-9 w-full flex flex-col gap-3">
            <h3 className="text-[#D4A24C] tracking-[0.2em] text-center md:text-left text-sm mb-0">
              FIND US
            </h3>

            {/* Location labels */}
            <div
              className="grid gap-1.5 sm:gap-2"
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
                    onMouseEnter={() => setActiveOfficeId(office.id)}
                    aria-pressed={isActive}
                    className={`relative flex flex-row sm:flex-col items-center justify-center gap-2 sm:gap-1 rounded-lg px-2 py-2 text-center transition-all duration-300 border ${
                      isActive
                        ? "border-[#D4A24C]/55 bg-gradient-to-b from-[#D4A24C]/25 to-[#D4A24C]/08 shadow-[0_6px_16px_rgba(212,162,76,0.2)]"
                        : "border-[#D4A24C]/20 bg-white/[0.04] hover:border-[#D4A24C]/45 hover:bg-[#D4A24C]/10"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                        isActive
                          ? "shadow-[0_3px_10px_rgba(212,162,76,0.28)]"
                          : ""
                      }`}
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg,#f3bb27,#ea7a12)"
                          : "rgba(212, 162, 76, 0.16)",
                      }}
                    >
                      <MapPin
                        className={`w-3 h-3 ${
                          isActive ? "text-[#2A211C]" : "text-[#D4A24C]"
                        }`}
                      />
                    </span>
                    <span
                      className={`text-[11px] sm:text-xs leading-tight ${
                        isActive ? "text-[#F5F1EA]" : "text-[#B7ADA0]"
                      }`}
                      style={{ fontWeight: isActive ? 600 : 500 }}
                    >
                      {office.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {activeOffice ? (
                <motion.div
                  key={activeOffice.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-[#D4A24C]/20
                    bg-white/[0.03]
                    p-4
                    sm:p-5
                    lg:p-5
                  "
                >
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-stretch">
                    {/* Contact details — left (old footer style) */}
                    <div
                      className="lg:col-span-2 flex flex-col justify-center gap-5 lg:gap-6"
                      style={{
                        fontFamily: "'Parkinsans', sans-serif",
                        fontSize: "15px",
                      }}
                    >
                      <p className="text-[11px] uppercase tracking-[0.28em] text-[#D4A24C]">
                        Contact
                      </p>

                      {(
                        [
                          {
                            Icon: MapPin,
                            title: activeOffice.address,
                          },
                          {
                            Icon: Phone,
                            title: activeOffice.phone,
                            href: `tel:${activeOffice.phone.replace(/\s/g, "")}`,
                          },
                          {
                            Icon: Mail,
                            title: activeOffice.email,
                            href: `mailto:${activeOffice.email}`,
                          },
                          ...(activeOffice.hours?.trim()
                            ? [
                                {
                                  Icon: Clock,
                                  title: activeOffice.hours,
                                },
                              ]
                            : []),
                        ] as {
                          Icon: typeof MapPin;
                          title: string;
                          href?: string;
                        }[]
                      ).map(({ Icon, title, href }, index) => (
                        <motion.div
                          key={`${activeOffice.id}-${index}`}
                          whileHover={{ x: 8 }}
                          className="group flex items-center gap-4 sm:gap-5 cursor-pointer"
                        >
                          <motion.div
                            whileHover={{
                              scale: 1.08,
                              boxShadow: "0 0 18px rgba(212,162,76,.35)",
                            }}
                            className="
                              w-12 h-12
                              sm:w-14 sm:h-14
                              min-w-[48px] sm:min-w-[56px]
                              rounded-full
                              border
                              border-[#D4A24C]/40
                              flex
                              items-center
                              justify-center
                              text-[#D4A24C]
                              transition-all
                              duration-500
                            "
                          >
                            <Icon size={18} />
                          </motion.div>

                          <div className="min-w-0">
                            {href ? (
                              <a
                                href={href}
                                className="
                                  text-[#F5F1EA]
                                  group-hover:text-[#D4A24C]
                                  transition-all
                                  break-words
                                  leading-relaxed
                                "
                              >
                                {title}
                              </a>
                            ) : (
                              <p
                                className="
                                  text-[#F5F1EA]
                                  group-hover:text-[#D4A24C]
                                  transition-all
                                  break-words
                                  leading-relaxed
                                "
                              >
                                {title}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Map — right */}
                    <div className="lg:col-span-3 overflow-hidden rounded-2xl border border-[#D4A24C]/15 min-h-[220px] lg:min-h-full relative self-stretch">
                      <iframe
                        title={`${activeOffice.heading} map`}
                        src={officeMapSrc(
                          activeOffice.mapEmbed,
                          activeOffice.address,
                        )}
                        className="absolute inset-0 w-full h-full border-0"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <p className="text-sm text-[#B7ADA0]">
                  No office locations available.
                </p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Newsletter */}

        <div
          className="
            mt-10
            border
            border-[#D4A24C]/20
            rounded-[22px]
            bg-gradient-to-r
            from-[#2A1E16]/90
            to-[#32241B]/70
            backdrop-blur-md
            px-6
            sm:px-8
            py-6
            "
        >
          <div
            className="
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            gap-6
            "
          >
            {/* LEFT */}

            <div
              className="
                flex
                flex-col
                sm:flex-row
                items-center
                text-center
                sm:text-left
                gap-6
                flex-1
                "
            >
              <div
                className="
                  w-14
                  h-14
                  rounded-full
                  border
                  border-dashed
                  border-[#D4A24C]/35
                  flex
                  items-center
                  justify-center
                  text-[#D4A24C]
                  "
              >
                <Mail size={34} />
              </div>

              <div
                className="
                hidden
                lg:block
                w-[1px]
                h-20
                bg-[#D4A24C]/20
                "
              />

              <div>
                <h3
                  className="
                  text-[#E8DED0]
                  tracking-[0.08em]
                  mb-3
                  text-3xl
                  sm:text-4xl
                  lg:text-[42px]"
                  style={{
                    fontFamily: "'Parkinsans',sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {footer.newsletterTitle}
                </h3>

                <p
                  className="
            text-[#B9ADA0]
            max-w-md
            leading-8
            "
                  style={{
                    fontFamily: "'Parkinsans',sans-serif",
                  }}
                >
                  {footer.newsletterText}
                </p>
              </div>
            </div>

            {/* RIGHT */}

            <div
              className="
            flex-1
            "
            >
              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  w-full
                  max-w-[620px]
                  mx-auto
                  border
                  border-[#D4A24C]/20
                  rounded-2xl
                  overflow-hidden
                "
              >
                <input
                  placeholder="Email address"
                  className="flex-1
                    w-full
                    h-12
                    sm:h-14
                    px-5 sm:px-6
                    bg-transparent
                    outline-none
                    text-[#F5F1EA]
                    placeholder:text-[#8A8177]
                    text-base
                    sm:text-[16px]
                  "
                  style={{
                    fontFamily: "'Parkinsans',sans-serif",
                  }}
                />

                <motion.button
                  whileHover={{
                    background: "#E3B75D",
                  }}
                  className="
                    w-full
                    sm:w-[150px]
                    h-12
                    sm:h-14
                    shrink-0
                    bg-gradient-to-r
                    from-[#C89A44]
                    to-[#DDAF56]
                    text-black
                    text-[12px]
                    sm:text-[14px]
                    tracking-[0.08em]
                    font-semibold
                    flex
                    items-center
                    justify-center
                    "
                  style={{
                    fontFamily: "'Parkinsans',sans-serif",
                  }}
                >
                  SUBSCRIBE →
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div
          className="
            mt-8
            pt-6
            border-t
            border-[#D4A24C]/20
            relative
            "
        >
          {/* Center ornament */}

          <div
            className="
              absolute
              left-1/2
              -top-[13px]
              -translate-x-1/2
              bg-[#1F1713]
              px-5
              text-[#D4A24C]
              text-[14px]
              "
          >
            ✧
          </div>

          <div
            className="
              flex
              flex-col
              lg:flex-row
              justify-between
              items-center
              text-center
              lg:text-left
              gap-6
              "
            style={{
              paddingBottom: "15px",
              fontFamily: "'Parkinsans',sans-serif",
              fontSize: "13px",
            }}
          >
            <p className="tracking-[0.03em]">
              {footer.copyright}
            </p>
            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              className="
                flex
                items-center
                gap-2
                "
            >
              <span>Designed & Developed By</span>

              <a
                href="https://codeinq.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4A24C] font-medium hover:text-[#E3B75D] transition-colors cursor-pointer"
              >
                CodeInQ
              </a>
            </motion.div>

            <div
              className="
              flex
              flex-wrap
              justify-center
              lg:justify-end
              items-center
              gap-4
              "
            >
              <Link
                to="/admin/login"
                className="
                hover:text-[#D4A24C]
                cursor-pointer
                transition-all"
              >
                Admin Login
              </Link>

              <span className="text-[#5A4B40]">|</span>

              <Link
                to="/privacy-policy"
                className="
                hover:text-[#D4A24C]
                cursor-pointer
                transition-all"
              >
                Privacy Policy
              </Link>

              {/* </span> */}

              <span
                className="
                text-[#5A4B40]
                "
              >
                |
              </span>

              <span
                className="
                hover:text-[#D4A24C]
                cursor-pointer
                transition-all
                "
              >
                Terms & Conditions
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
