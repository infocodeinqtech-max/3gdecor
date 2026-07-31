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
  viewAllLink: string;
}
export default function FeaturedProjects(props: Props) {
  console.log(props);

  const { title, subtitle, description, button, projects, viewAllLink } = props;

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
    <section className="py-16 sm:py-20 lg:py-24 xl:py-28 bg-[#F5F1EA]">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[380px_minmax(0,1fr)]
            xl:grid-cols-[420px_minmax(0,1fr)]
            gap-12
            items-start
            "
        >
          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-sm lg:max-w-none"
          >
            <p className="uppercase tracking-[.25em] text-[#D49A2D] text-sm font-semibold">
              {subtitle}
            </p>
            <h2
              className="
                mt-5
                text-[#2A231D]
                whitespace-pre-line
              "
              style={{
                fontFamily: "Cormorant Garamond",
                fontSize: "clamp(42px, 3.5vw, 54px)",
                lineHeight: 0.95,
                fontWeight: 400,
              }}
            >
              Featured{"\n"}Projects
            </h2>

            <p
              className="
                mt-5
                max-w-full
                sm:max-w-[26rem]
                lg:max-w-[22rem]
                xl:max-w-[24rem]
                text-[#6F6862]
                "
              style={{
                fontFamily: "Parkinsans",
                lineHeight: 1.9,
              }}
            >
              {description}
            </p>

            <button
              onClick={() => {
                navigate(viewAllLink);
              }}
              className="
                mt-8
                inline-flex
                items-center
                gap-3
                rounded-xl
                bg-[#D49A2D]
                hover:bg-[#C98F22]
                text-white
                px-6
                sm:px-8
                py-3.5
                transition-all
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
                lg:-top-20
                lg:mb-0
                z-30
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
                shadow-md
                inline-flex
                items-center
                justify-center
                text-[#2A231D]
                hover:bg-[#D49A2D]
                hover:text-white
                transition-all
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
                  shadow-md
                  inline-flex
                  items-center
                  justify-center
                  text-[#2A231D]
                  hover:bg-[#D49A2D]
                  hover:text-white
                  transition-all
                  "
              >
                <ChevronRight className="mx-auto" />
              </button>
            </div>

            <div className="overflow-hidden relative z-0" ref={emblaRef}>
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
                    {/* <motion.div
                      whileHover={{
                        boxShadow: "0 18px 40px rgba(0,0,0,.12)",
                      }}
                      transition={{ duration: 0.35 }}
                      className="group cursor-pointer"
                    > */}
                    <div className="cursor-pointer">
                      <div
                        className="
                          group
                          relative
                          overflow-hidden
                          rounded-[20px]
                          w-full
                          isolate
                          bg-[#F5F1EA]
                        "
                      >
                        <img
                          src={project.image}
                          className="
                            w-full
                            aspect-[4/3]
                            object-cover
                            transition-transform
                            duration-700
                            ease-out
                            group-hover:scale-105
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
                        transition-all
                        hover:gap-4
                      "
                      >
                        View Project
                        <ArrowRight size={17} />
                      </button>
                    </div>
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
