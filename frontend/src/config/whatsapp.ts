/** Default India WhatsApp (fallback when CMS has no number yet). */
export const WHATSAPP_NUMBER = "918167028450";
export const WHATSAPP_DISPLAY = "+91 81670 28450";

/** Normalize 10-digit Indian mobile → wa.me number with country code 91. */
export function toWhatsAppE164(raw: string | undefined | null): string {
  const digits = String(raw ?? "").replace(/\D+/g, "");
  if (!digits) return WHATSAPP_NUMBER;
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  if (digits.length === 11 && digits.startsWith("0")) {
    return `91${digits.slice(1)}`;
  }
  return digits.startsWith("91") ? digits : `91${digits}`;
}

export function whatsappChatUrl(
  message?: string,
  phone?: string | null,
): string {
  const base = `https://wa.me/${toWhatsAppE164(phone)}`;
  if (!message?.trim()) return base;
  return `${base}?text=${encodeURIComponent(message.trim())}`;
}
