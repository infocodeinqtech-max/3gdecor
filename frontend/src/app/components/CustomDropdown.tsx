import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

type CustomDropdownProps = {
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

export default function CustomDropdown({
  value,
  options,
  onChange,
}: CustomDropdownProps) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-[180px] flex-shrink-0">
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          w-full
          h-12
          rounded-[16px]
          border
          border-[#E7D7C4]
          bg-white
          px-5
          flex
          items-center
          justify-between
          shadow-sm
          transition-all
          duration-300
          hover:border-[#D89A2B]
        "
      >
        <span
          className="text-[15px] text-[#2D241D]"
          style={{ fontFamily: "Parkinsans" }}
        >
          {value}
        </span>

        <ChevronDown
          size={18}
          className={`
            transition-transform
            duration-300
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.98,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
                absolute
                top-full
                left-0
                mt-2
                w-full
                z-[999]
                overflow-hidden
                rounded-[18px]
                border
                border-[#E7D7C4]
                bg-white
                shadow-[0_20px_60px_rgba(0,0,0,0.12)]
            "
          >
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`
                  w-full
                  px-5
                  py-3
                  flex
                  items-center
                  justify-between
                  transition-all
                  text-left

                  ${
                    value === option
                      ? "bg-[#F8F2E8] text-[#D89A2B]"
                      : "hover:bg-[#FAF6F1] text-[#2D241D]"
                  }
                `}
              >
                <span
                  style={{
                    fontFamily: "Parkinsans",
                  }}
                >
                  {option}
                </span>

                {value === option && <Check size={16} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
