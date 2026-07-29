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
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/3GDecoLogo-2.png";
import { getContent } from "../../admin/utils/contentStorage";
import { seedFooter, seedSiteContact } from "../../admin/data/seedContent";
import { mediaUrl } from "../../utils/mediaUrl";
import { subscribeCmsUpdated } from "../../content/cmsSync";
import { loadPublicSiteCms } from "../../content/publicCms";

export default function Footer() {
  const [footer, setFooter] = useState(seedFooter);

  useEffect(() => {
    const reload = () => {
      loadPublicSiteCms()
        .then((site) => {
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
            return;
          }
          return Promise.all([
            getContent("footer", seedFooter),
            getContent("site-contact", seedSiteContact),
          ]).then(([brand, contactData]) => {
            setFooter({
              ...seedFooter,
              ...brand,
              address: contactData.address,
              country: contactData.country,
              phone: contactData.phone,
              email: contactData.email,
              hours: contactData.hours,
            });
          });
        })
        .catch(() => undefined);
    };
    reload();
    return subscribeCmsUpdated(reload);
  }, []);

  const contactItems = [
    {
      icon: MapPin,
      title: footer.address,
      sub: footer.country,
    },
    {
      icon: Phone,
      title: footer.phone,
    },
    {
      icon: Mail,
      title: footer.email,
    },
    {
      icon: Clock,
      title: footer.hours,
    },
  ];

  const footerBg = mediaUrl("/uploads/footer/footer-bg.jpg");

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[#2A211C] text-[#F5F1EA] pt-28"
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
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8"
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
    gap-10
    items-start
   pb-20
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
                w-36
                sm:w-40
                md:w-44
                xl:w-52
                mb-8
                mx-auto
                md:mx-0
                "
            />

            <p
              // className="text-[#D7D0C7] leading-8 text-sm"
              className="
text-[#D7D0C7]
leading-8
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
              className="flex justify-center lg:justify-start gap-4 mt-8
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

          {/* Google Map */}

          <div
            // className="lg:col-span-6"
            //             className="
            // xl:col-span-6
            // lg:col-span-6
            // w-full
            // "
            className="lg:col-span-6 flex flex-col"
          >
            <h3
              // className="text-[#D4A24C] mb-8 text-center lg:text-left tracking-[0.2em] mt-6"
              className="
                text-[#D4A24C]
                mb-8
                tracking-[0.2em]
                text-center
                md:text-left
                "
            >
              FIND US
            </h3>

            <motion.div
              whileHover={{ scale: 1.01 }}
              //   className="
              //   overflow-hidden
              //   rounded-3xl
              //   border
              //   border-[#D4A24C]/20
              //   shadow-xl
              //   h-[260px]
              //   w-full
              // "
              //               className="
              // overflow-hidden

              // rounded-[26px]

              // border
              // border-[#D4A24C]/20

              // shadow-xl

              // w-full

              // mx-auto

              // h-[240px]
              // sm:h-[280px]
              // md:h-[320px]
              // lg:h-[360px]
              // xl:h-[400px]
              // "
              className="
    overflow-hidden
    rounded-[24px]
    border
    border-[#D4A24C]/20

    aspect-[16/9]

    w-full
    max-h-[280px]
  "
            >
              <iframe
                title="3G Decorative Group Location"
                src="https://www.google.com/maps?q=Kolkata,West+Bengal&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0 }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>

          {/* Contact */}

          <div
            // className="lg:col-span-3"
            className="
xl:col-span-3
lg:col-span-3
w-full
"
          >
            <h3
              //   className="
              // text-[#D4A24C]
              // mb-8
              // mt-6
              // tracking-[0.2em]
              // "
              className="
text-[#D4A24C]

mb-8

tracking-[0.2em]

text-center
md:text-left
"
            >
              CONTACT
            </h3>

            <div
              // className="space-y-6"
              className="
space-y-6

w-full
"
              style={{
                fontFamily: "'Parkinsans',sans-serif",
                fontSize: "15px",
              }}
            >
              {contactItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={index}
                    whileHover={{
                      x: 10,
                    }}
                    className="
                    group
                    flex
                    items-center
                    gap-5
                    cursor-pointer
                    "
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 18px rgba(212,162,76,.35)",
                      }}
                      className="
                        w-14
                        h-14
                        min-w-[56px]
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
                      <Icon size={20} />
                    </motion.div>

                    <div className="min-w-0">
                      <p
                        className="
                        text-[#F5F1EA]
                        group-hover:text-[#D4A24C]
                        transition-all
                        break-words
                        "
                      >
                        {item.title}
                      </p>

                      {item.sub && (
                        <p
                          className="
                          text-sm
                          text-[#B7ADA0]
                          "
                        >
                          {item.sub}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Newsletter */}

        <div
          className="
            mt-20
            border
            border-[#D4A24C]/20
            rounded-[28px]
            bg-gradient-to-r
            from-[#2A1E16]/90
            to-[#32241B]/70
            backdrop-blur-md
            px-10
            py-10
            "
        >
          <div
            className="
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            gap-10
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
                  w-20
                  h-20
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
                    h-14
                    sm:h-[72px]
                    px-5 sm:px-6
                    bg-transparent
                    outline-none
                    text-[#F5F1EA]
                    placeholder:text-[#8A8177]
                    text-base
                    sm:text-[17px]
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
                    sm:w-[170px]
                    h-14
                    sm:h-[72px]
                    shrink-0
                    bg-gradient-to-r
                    from-[#C89A44]
                    to-[#DDAF56]
                    text-black
                    text-[12px]
                    sm:text-[15px]
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
            mt-10
            pt-8
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
