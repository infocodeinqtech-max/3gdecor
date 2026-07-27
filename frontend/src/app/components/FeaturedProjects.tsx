import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

interface Project {
  id: number;
  title: string;
  location: string;
  image: string;
  slug: string;
}

interface Props {
  title: string;
  subtitle: string;
  description: string;
  button: string;
  projects: Project[];
}

export default function FeaturedProjects({
  title,
  subtitle,
  description,
  button,
  projects,
}: Props) {
  const navigate = useNavigate();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
    containScroll: "trimSnaps",
    skipSnaps: false,
  });

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);

  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-24 bg-[#F5F1EA]">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-10 items-start">
          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[320px] xl:w-[360px] shrink-0"
          >
            <p className="uppercase tracking-[.25em] text-[#D49A2D] text-xs font-semibold">
              {subtitle}
            </p>

            <h2
              className="mt-5 text-[#2A231D]"
              style={{
                fontFamily: "Cormorant Garamond",
                fontSize: "clamp(48px,4vw,62px)",
                lineHeight: 1.05,
                fontWeight: 500,
              }}
            >
              {title}
            </h2>

            <p
              className="mt-5 max-w-[320px] text-[#6F6862]"
              style={{
                fontFamily: "Parkinsans",
                lineHeight: 1.9,
              }}
            >
              {description}
            </p>

            <button
              onClick={() => navigate("/projects/corporate")}
              className="
              mt-10
              bg-[#D49A2D]
              hover:bg-[#c48d28]
              text-white
              rounded-xl
              px-7
              py-4
              flex
              items-center
              gap-3
              transition
              "
            >
              {button}

              <ArrowRight size={18} />
            </button>
          </motion.div>

          {/* Right */}

          <div className="flex-1 w-full relative">
            {/* arrows */}

            <div
              className="
                flex
                justify-end
                gap-3
                mb-6
                lg:absolute
                lg:right-0
                lg:-top-16
                lg:mb-0
              "
            >
              <button
                onClick={prev}
                className="
                w-11
                h-11
                rounded-full
                bg-white
                border
                border-[#E5D9C8]
                shadow-sm
                flex
                items-center
                justify-center
                hover:bg-[#D49A2D]
                hover:text-white
                transition
                "
              >
                <ChevronLeft className="mx-auto" />
              </button>

              <button
                onClick={next}
                className="
                  w-11
                  h-11
                  rounded-full
                  bg-white
                  border
                  border-[#E5D9C8]
                  shadow-sm
                  flex
                  items-center
                  justify-center
                  hover:bg-[#D49A2D]
                  hover:text-white
                  transition
                  "
              >
                <ChevronRight className="mx-auto" />
              </button>
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex sm:-mx-3">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="                      
                    min-w-0
                    flex-[0_0_100%]
                    sm:flex-[0_0_50%]
                    lg:flex-[0_0_33.333%]
                    xl:flex-[0_0_25%]
                    2xl:flex-[0_0_25%]
                    px-0
                    sm:px-3"
                  >
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.35 }}
                      className="group cursor-pointer"
                    >
                      <div className="rounded-[20px] overflow-hidden w-full">
                        <motion.img
                          src={project.image}
                          whileHover={{ scale: 1.06 }}
                          transition={{ duration: 0.5 }}
                          className="
                          w-full
                          h-[220px]
                          sm:h-[240px]
                          xl:h-[270px]
                          object-cover
                        "
                        />
                      </div>

                      <h3
                        className="mt-5 text-[#2A231D] leading-tight"
                        style={{
                          fontFamily: "Cormorant Garamond",
                          fontSize: "clamp(28px,5vw,30px)",
                        }}
                      >
                        {project.title}
                      </h3>

                      <div className="flex items-center gap-2 mt-3 text-[#8A8179]">
                        <MapPin size={15} className="text-[#D49A2D]" />

                        <span
                          style={{
                            fontFamily: "Parkinsans",
                          }}
                        >
                          {project.location}
                        </span>
                      </div>

                      <button
                        className="
                        mt-5
                        flex
                        items-center
                        gap-2
                        text-[#D49A2D]
                        font-medium
                        group-hover:gap-4
                        transition-all
                        "
                      >
                        View Project
                        <ArrowRight size={17} />
                      </button>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
