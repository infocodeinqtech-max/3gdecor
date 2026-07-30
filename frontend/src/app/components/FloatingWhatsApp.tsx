import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { whatsappChatUrl, WHATSAPP_NUMBER } from "../../config/whatsapp";
import { loadPublicSiteCms } from "../../content/publicCms";
import { subscribeCmsUpdated } from "../../content/cmsSync";
import { seedSiteContact } from "../../admin/data/seedContent";

function WhatsAppGlyph({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M16.004 3C9.38 3 4 8.382 4 15.005c0 2.643.862 5.09 2.324 7.083L4.67 28.33l6.45-1.69A11.95 11.95 0 0 0 16.004 27C22.628 27 28 21.618 28 15.005 28 8.382 22.628 3 16.004 3zm0 21.86a9.84 9.84 0 0 1-5.01-1.375l-.36-.214-3.83 1.004 1.02-3.734-.234-.383A9.84 9.84 0 0 1 6.16 15.005c0-5.43 4.416-9.846 9.844-9.846 5.43 0 9.846 4.416 9.846 9.846 0 5.428-4.416 9.855-9.846 9.855zm5.4-7.38c-.296-.148-1.75-.864-2.022-.963-.272-.1-.47-.148-.67.148-.198.296-.77.963-.944 1.16-.174.198-.348.223-.644.074-.296-.148-1.25-.46-2.38-1.47-.88-.785-1.474-1.754-1.648-2.05-.173-.296-.018-.456.13-.603.134-.133.296-.348.444-.522.148-.174.198-.297.297-.495.1-.198.05-.371-.025-.52-.074-.148-.67-1.614-.918-2.21-.242-.58-.488-.5-.67-.51l-.57-.01c-.198 0-.52.074-.792.371-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.877 1.214 3.075.148.198 2.096 3.2 5.08 4.486.71.306 1.264.49 1.696.626.712.225 1.36.193 1.872.117.571-.086 1.75-.716 2-.1.406.248.406 1.11.445z" />
    </svg>
  );
}

export default function FloatingWhatsApp() {
  const [number, setNumber] = useState(
    seedSiteContact.whatsappNumber || WHATSAPP_NUMBER,
  );

  useEffect(() => {
    const reload = () => {
      loadPublicSiteCms(true)
        .then((site) => {
          const contact = site.siteContact as { whatsappNumber?: string } | null;
          const fromCms = contact?.whatsappNumber?.trim();
          if (fromCms) setNumber(fromCms);
        })
        .catch(() => undefined);
    };
    reload();
    return subscribeCmsUpdated(reload);
  }, []);

  const href = whatsappChatUrl(
    "Hi 3G Decorative Group — I’d like to discuss a project.",
    number,
  );

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[60] flex items-center justify-center w-14 h-14 rounded-full text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)]"
      style={{ background: "#25D366" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
      <WhatsAppGlyph className="relative w-7 h-7" />
    </motion.a>
  );
}
