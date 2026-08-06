import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Factory,
  Award,
  Users,
  Briefcase,
} from "lucide-react";

import heroImage from "../../assets/images/hero.png";
import HeroExploreCard from "../components/HeroExploreCard";
import { getHeroContent } from "../../admin/utils/contentStorage";
import { seedHero, type HeroContent } from "../../admin/data/seedContent";
import { mediaUrl } from "../../utils/mediaUrl";
import { subscribeCmsUpdated } from "../../content/cmsSync";
import {
  getCachedPublicSiteCms,
  loadPublicSiteCms,
  type PublicSiteCms,
} from "../../content/publicCms";

const STAT_ICONS = [Briefcase, Award, Users] as const;

function resolveHeroBg(value: string | undefined): string {
  const trimmed = value?.trim();
  if (!trimmed) return heroImage;
  if (trimmed.startsWith("/uploads/")) return mediaUrl(trimmed) || heroImage;
  return trimmed;
}

function heroFromSite(site: PublicSiteCms | null): HeroContent {
  if (site?.hero && typeof site.hero === "object") {
    return { ...seedHero, ...(site.hero as HeroContent) };
  }
  return seedHero;
}

export default function HeroSection() {
  const [hero, setHero] = useState<HeroContent>(() =>
    heroFromSite(getCachedPublicSiteCms()),
  );

  useEffect(() => {
    const reload = (force: boolean) => {
      loadPublicSiteCms(force)
        .then((site) => {
          if (site.hero && typeof site.hero === "object") {
            setHero({ ...seedHero, ...(site.hero as HeroContent) });
            return;
          }
          return getHeroContent(seedHero).then(setHero);
        })
        .catch(() => undefined);
    };
    reload(false);
    return subscribeCmsUpdated(() => reload(true));
  }, []);

  const bgImage = resolveHeroBg(hero.backgroundImage);

  return (
    <section
      id="home"
      data-cursor-theme="dark"
      className="relative bg-[#F6F2EC] px-4 pt-[72px] pb-32 sm:pb-28 lg:px-5 lg:pt-[80px] lg:pb-24"
    >
      <div
        className="
          relative
          overflow-visible
          h-[620px]
          sm:h-[700px]
          md:h-[780px]
          lg:h-[760px]
          xl:h-[790px]
          w-full
          "
      >
        {/* HERO IMAGE  */}
        {/* <img
          src={heroImage}
          alt="Hero"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            object-[62%_center]
            md:object-center
            rounded-[32px]
           "
        /> */}

        <img
          src={bgImage}
          alt="Hero"
          data-cursor-theme="dark"
          className="
          absolute
          inset-0
          w-full
          h-full

          object-cover
          object-[62%_center]
          md:object-center

          rounded-[20px]
          md:rounded-[32px]
          "
          style={{
            filter: "contrast(1.15) saturate(1.05) brightness(.94)",
          }}
        />

        {/* Overlay 1 */}
        <div
          className="absolute inset-0 rounded-[20px] md:rounded-[32px] pointer-events-none"
          style={{
            background: `
              linear-gradient(
                90deg,
                rgba(55,35,18,.22) 0%,
                rgba(0,0,0,.04) 20%,
                rgba(0,0,0,.20) 50%,
                rgba(0,0,0,.04) 80%,
                rgba(55,35,18,.22) 100%
              )
            `,
            mixBlendMode: "multiply",
          }}
        />
        {/* Overlay 2 */}
        {/* <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(
                90deg,

                rgba(255,255,255,.10) 0%,

                rgba(255,255,255,.05) 10%,

                rgba(0,0,0,0) 22%,

                rgba(0,0,0,.22) 38%,

                rgba(0,0,0,.42) 50%,

                rgba(0,0,0,.22) 62%,

                rgba(0,0,0,0) 78%,

                rgba(255,255,255,.05) 92%,

                rgba(255,255,255,.10) 100%
              )
            `,
          }}
        /> */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(
                90deg,
                rgba(0,0,0,.04) 0%,
                rgba(0,0,0,.08) 18%,
                rgba(0,0,0,.16) 50%,
                rgba(0,0,0,.08) 82%,
                rgba(0,0,0,.04) 100%
              )
            `,
          }}
        />
        {/* Center Vertical Overlay  {/* Overlay 3 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(
                90deg,

                rgba(255,255,255,.06) 0%,

                rgba(255,255,255,.02) 18%,

                rgba(0,0,0,0) 28%,

                rgba(0,0,0,.14) 40%,

                rgba(0,0,0,.26) 50%,

                rgba(0,0,0,.14) 60%,

                rgba(0,0,0,0) 72%,

                rgba(255,255,255,.02) 82%,

                rgba(255,255,255,.06) 100%
              )
            `,
          }}
        />
        {/* Radial Gold OverLAy 4*/}
        {/* <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
                radial-gradient(
                    ellipse at center,
                    rgba(243,187,39,.12) 0%,
                    rgba(243,187,39,.05) 28%,
                    transparent 60%
                )
                `,
          }}
        /> */}
        <div
          className="absolute inset-0 rounded-[20px] md:rounded-[32px] pointer-events-none"
          style={{
            background: `
              radial-gradient(
                ellipse at center,
                transparent 45%,
                rgba(0,0,0,.08) 72%,
                rgba(0,0,0,.22) 100%
              )
            `,
          }}
        />
        {/* ================= HERO CONTENT && RIGHT & Left GLASS CARD LAYOUT  */}
        {/* Left Light */}
        <div
          className="
          hidden
          lg:block
          absolute
          top-0
          bottom-0
          left-0
          w-[34%]
          pointer-events-none
        "
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,.07), transparent)",
          }}
        />

        {/* Right Light */}
        <div
          className="
          hidden
          lg:block
          absolute
          top-0
          bottom-0
          right-0
          w-[26%]
          pointer-events-none
        "
          style={{
            background:
              "linear-gradient(-90deg, rgba(255,255,255,.08), transparent)",
          }}
        />
        {/* ============RIGHT & Left GLASS CARD============ */}
        <div
          className="
            absolute
            inset-0
            z-20
            hidden
            lg:flex
            items-center
            justify-center
            pointer-events-none
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              w-full
              max-w-[1520px]
              px-10
              xl:px-14
              2xl:px-16
            "
          >
            <div className="pointer-events-auto">
              <HeroExploreCard
                title={hero.leftCardTitle}
                icon={<Building2 size={44} strokeWidth={1.5} />}
              />
            </div>

            <div className="pointer-events-auto">
              <HeroExploreCard
                title={hero.rightCardTitle}
                icon={<Factory size={44} strokeWidth={1.5} />}
              />
            </div>
          </div>
        </div>

        {/* ================= CENTER CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          // className="
          //   absolute
          //   inset-0
          //   z-20
          //   flex
          //   items-center
          //   justify-center
          //   px-6
          //   "
          className="
            absolute
            inset-0
            z-40
            flex
            items-center
            justify-center
            pt-4
            pb-36
            sm:pt-0
            sm:pb-36
            md:pb-24
            lg:pb-0
            px-5
            sm:px-6
            lg:px-[220px]
            xl:px-[240px]
            2xl:px-[260px]
            "
        >
          <div
            className="max-w-[340px]
            sm:max-w-[520px]
            lg:max-w-[650px] text-center w-full"
          >
            {/* Small Heading */}

            <div
              className="
                uppercase
                tracking-[0.28em]
                sm:tracking-[10px]
                text-[#D8A64B]
                mb-3
                sm:mb-6
                "
              style={{
                fontFamily: "'Parkinsans', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              {hero.tagline}
            </div>

            {/* Main Heading */}

            <h1
              className="
                leading-[1.05]
                text-white
                "
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: "clamp(28px,6.8vw,68px)",
              }}
            >
              {hero.headlineLine1}
              <br />
              {hero.headlineLine2}
            </h1>

            {/* Script */}

            <div
              className="
                mt-1
                sm:mt-2
                "
              style={{
                fontFamily: '"Great Vibes", cursive',
                color: "#D8A64B",
                fontSize: "clamp(30px,7.5vw,70px)",
                lineHeight: 1,
              }}
            >
              {hero.scriptText}
            </div>

            {/* Description */}

            <p
              className="
                mt-3
                sm:mt-6
                mx-auto
                max-w-[470px]
                leading-5
                sm:leading-8
                lg:leading-9
                text-[#F3F3F3]
                "
              style={{
                fontFamily: "'Parkinsans', sans-serif",
                fontSize: "clamp(12px,3.4vw,16px)",
                fontWeight: 300,
              }}
            >
              {hero.description}
            </p>

            {/* ================= CTA BUTTONS ================= */}

            <div
              className="
                 mt-4
                 sm:mt-8
                 mb-0
                 sm:mb-16
                 lg:mb-0

                flex
                flex-col
                sm:flex-row
                lg:flex-row

                items-center
                justify-center

                gap-2.5
                sm:gap-4
                lg:gap-5

                lg:hidden
                "
            >
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={hero.ctaCorporateLink}
                className="
                    group
                    relative
                    overflow-hidden
                    rounded-full
                    px-6
                    sm:px-8
                    py-3.5
                    sm:py-4
                    w-full
                    max-w-[310px]
                    sm:max-w-[285px]
                    flex
                    items-center
                    justify-center
                    gap-2
                    shrink-0
                    "
                style={{
                  background: "linear-gradient(90deg,#EA8C18 0%,#F3BE4C 100%)",
                  boxShadow: "0 18px 45px rgba(234,140,24,.35)",
                }}
              >
                <div
                  className="
                    absolute
                    left-[-40%]
                    top-0
                    h-full
                    w-[40%]
                    bg-white/20
                    skew-x-[-25deg]
                    group-hover:left-[140%]
                    transition-all
                    duration-700
                    "
                />

                <Building2 size={18} color="#fff" className="flex-shrink-0" />

                <span
                  className="text-white whitespace-nowrap"
                  style={{
                    fontFamily: "'Parkinsans', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(13px,3.5vw,15px)",
                  }}
                >
                  {hero.leftCardTitle}
                </span>

                <ArrowRight
                  size={18}
                  color="#fff"
                  className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={hero.ctaCivilLink}
                className="
                    group
                    relative
                    overflow-hidden
                    rounded-full
                    px-6
                    sm:px-8
                    py-3.5
                    sm:py-4
                    w-full
                    max-w-[310px]
                    sm:max-w-[285px]
                    flex
                    items-center
                    justify-center
                    gap-2
                    shrink-0
                    "
                style={{
                  background: "linear-gradient(90deg,#EA8C18 0%,#F3BE4C 100%)",
                  boxShadow: "0 18px 45px rgba(234,140,24,.35)",
                }}
              >
                <div
                  className="
                    absolute
                    left-[-40%]
                    top-0
                    h-full
                    w-[40%]
                    bg-white/20
                    skew-x-[-25deg]
                    group-hover:left-[140%]
                    transition-all
                    duration-700
                    "
                />

                <Factory size={18} color="#fff" className="flex-shrink-0" />

                <span
                  className="text-white whitespace-nowrap"
                  style={{
                    fontFamily: "'Parkinsans', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(13px,3.5vw,15px)",
                  }}
                >
                  {hero.rightCardTitle}
                </span>

                <ArrowRight
                  size={18}
                  color="#fff"
                  className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* ================= Floating Stats ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: 1,
            y: [0, -8, -5, -8, 0],
          }}
          transition={{
            opacity: {
              duration: 1,
              ease: "easeOut",
            },
            y: {
              duration: 9,
              repeat: Infinity,
              repeatType: "mirror",
              ease: [0.45, 0, 0.55, 1],
            },
          }}
          className="
            absolute
            left-1/2
            -translate-x-1/2
            -bottom-20
            sm:-bottom-16
            md:bottom-[-40px]
            lg:bottom-[-55px]
            z-20
           
            flex
            justify-center
            w-[94%]
            sm:w-[92%]
            md:w-[88%]
            lg:w-[82%]
            xl:w-[900px]
            2xl:w-[980px]
                "
        >
          <div
            className="
                flex
                flex-col

                sm:flex-row

                items-center
                justify-center

                rounded-[40px]

                w-full

                px-5
                sm:px-6
                md:px-8
                lg:px-10

                py-4
                md:py-5
                "
            style={{
              // background: "rgba(20,18,17,.90)",
              // border: "1px solid rgba(255,255,255,.05)",
              // backdropFilter: "blur(1px)",
              // WebkitBackdropFilter: "blur(1px)",
              // boxShadow: "0 18px 50px rgba(0,0,0,.28)",
              background: `
                linear-gradient(
                180deg,
                rgba(32,26,22,.92) 0%,
                rgba(22,20,18,.96) 55%,
                rgba(15,14,13,.98) 100%
                )
                `,

              border: "1px solid rgba(255,255,255,.07)",

              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",

              boxShadow: `
                0 18px 60px rgba(0,0,0,.28),
                0 0 35px rgba(0,0,0,.08),
                inset 0 1px 0 rgba(255,255,255,.04)
                `,
            }}
          >
            {hero.stats.map((stat, index) => {
              const Icon = STAT_ICONS[index % STAT_ICONS.length];
              return (
                <div
                  key={stat.id}
                  // className="flex items-center flex-1 justify-center"
                  className="
                  flex
                  items-center
                  justify-center
                  w-full
                  sm:flex-1
                  "
                >
                  {index !== 0 && (
                    <div
                      className="
                        hidden
                        sm:block

                        mx-4
                        lg:mx-8

                        h-12
                        lg:h-14

                        w-px
                      "
                      style={{
                        background: "rgba(255,255,255,.08)",
                      }}
                    />
                  )}

                  <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
                    <div
                      className="
                    w-10 h-10
                    sm:w-12 sm:h-12
                    lg:w-14 lg:h-14
                    rounded-full
                    flex
                    items-center
                    justify-center
                    "
                      style={{
                        background: "rgba(216,166,75,.12)",
                        border: "1px solid rgba(216,166,75,.25)",
                      }}
                    >
                      <Icon size={24} color="#D8A64B" />
                    </div>

                    <div>
                      <h3
                        className="text-[#D8A64B]"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "clamp(26px,4vw,46px)",
                          lineHeight: 1,
                        }}
                      >
                        {stat.number}
                      </h3>

                      <p
                        className="text-white/75 mt-1"
                        style={{
                          fontFamily: "'Parkinsans', sans-serif",
                          fontSize: "clamp(10px,1.4vw,14px)",
                        }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
        {/* ================= Floating Stats End================= */}
      </div>
    </section>
  );
}
