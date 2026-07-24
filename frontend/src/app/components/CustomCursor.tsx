import { useEffect, useState, useMemo } from "react";
import { motion } from "motion/react";
import { useLocation } from "react-router-dom";

function parseRgb(
  color: string,
): { r: number; g: number; b: number; a: number } | null {
  const match = color.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/,
  );
  if (!match) return null;
  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
    a: match[4] !== undefined ? Number(match[4]) : 1,
  };
}

function getLuminance(r: number, g: number, b: number): number {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function isDarkSurface(x: number, y: number): boolean {
  const elements = document.elementsFromPoint(x, y);

  for (const el of elements) {
    if (el.closest(".custom-cursor")) continue;

    const htmlEl = el as HTMLElement;

    if (htmlEl.closest("#home")) return true;

    const themed = htmlEl.closest("[data-cursor-theme]") as HTMLElement | null;
    if (themed) {
      return themed.dataset.cursorTheme === "dark";
    }

    if (htmlEl.tagName === "IMG") {
      const cls = htmlEl.className?.toString() || "";
      if (cls.includes("object-cover")) return true;
    }

    const cls = htmlEl.className?.toString() || "";
    if (
      /from-black|via-black|to-black|from-\[#332|from-\[#2|from-\[#1a|bg-black\/|bg-\[#2|bg-\[#332|bg-\[#1a/i.test(
        cls,
      )
    ) {
      return true;
    }

    let node: HTMLElement | null = htmlEl;
    while (node && node !== document.documentElement) {
      const nodeCls = node.className?.toString() || "";
      if (
        /from-black|via-black|bg-black\/|bg-\[#2|bg-\[#332|bg-\[#1a/i.test(
          nodeCls,
        )
      ) {
        return true;
      }

      const { backgroundColor } = getComputedStyle(node);
      const parsed = parseRgb(backgroundColor);

      if (parsed && parsed.a > 0.12) {
        return getLuminance(parsed.r, parsed.g, parsed.b) < 0.42;
      }

      node = node.parentElement;
    }
  }

  return false;
}

const ARROW_PATH =
  "M6.5 4.5L6.5 24.8L11.4 19.6L15.2 27.4L18.1 25.9L14.1 17.8L22.4 17.2L6.5 4.5Z";
const ARROW_SHINE = "M8.2 7.2L8.2 20.5L11 17.4L8.2 7.2Z";

/** Interaction cursor — arrow pointer only */
export default function CustomCursor() {
  const location = useLocation();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [visible, setVisible] = useState(false);

  const isAdmin = location.pathname.startsWith("/admin");

  const colors = useMemo(() => {
    if (onDark) {
      return {
        arrowFill: hovering ? "#FFE08A" : "#F4B223",
        arrowFillEnd: hovering ? "#F4B223" : "#EA7A12",
        arrowShine: "#FFF8F0",
        arrowStroke: "#FFF3DC",
      };
    }

    return {
      arrowFill: hovering ? "#4A3A2E" : "#2A211C",
      arrowFillEnd: hovering ? "#2A211C" : "#5C4A38",
      arrowShine: hovering ? "#EA7A12" : "#C4973B",
      arrowStroke: hovering ? "#EA7A12" : "#C4973B",
    };
  }, [onDark, hovering]);

  const arrowSize = hovering ? 38 : 34;
  const arrowTipX = (6.5 / 32) * arrowSize;
  const arrowTipY = (4.5 / 32) * arrowSize;

  useEffect(() => {
    if (isAdmin) return;
    if (window.matchMedia("(max-width: 768px)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      setOnDark(isDarkSurface(e.clientX, e.clientY));

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        'a, button, [role="button"], input, select, textarea, label, [data-cursor-hover]',
      );
      setHovering(!!interactive);
    };

    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", hide);
    window.addEventListener("mouseenter", show);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", hide);
      window.removeEventListener("mouseenter", show);
    };
  }, [isAdmin]);

  if (isAdmin) return null;
  if (typeof window !== "undefined") {
    if (window.matchMedia("(max-width: 768px)").matches) return null;
    if (window.matchMedia("(pointer: coarse)").matches) return null;
  }

  const gradientId = onDark ? "cursor-grad-light" : "cursor-grad-dark";

  return (
    <motion.div
      className="custom-cursor-arrow fixed top-0 left-0 z-[10000] pointer-events-none hidden md:block"
      animate={{
        x: pos.x,
        y: pos.y,
        opacity: visible ? 1 : 0,
        scale: hovering ? 1.06 : 1,
      }}
      transition={{
        x: { type: "spring", stiffness: 900, damping: 42, mass: 0.35 },
        y: { type: "spring", stiffness: 900, damping: 42, mass: 0.35 },
        scale: { type: "spring", stiffness: 400, damping: 26 },
        opacity: { duration: 0.15 },
      }}
    >
      <svg
        width={arrowSize}
        height={arrowSize}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
        style={{ left: -arrowTipX, top: -arrowTipY }}
        aria-hidden
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.arrowFill} />
            <stop offset="100%" stopColor={colors.arrowFillEnd} />
          </linearGradient>
        </defs>
        <path
          d={ARROW_PATH}
          fill={`url(#${gradientId})`}
          stroke={colors.arrowStroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d={ARROW_SHINE} fill={colors.arrowShine} opacity="0.75" />
      </svg>
    </motion.div>
  );
}
