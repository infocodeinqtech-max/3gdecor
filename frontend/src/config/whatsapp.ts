/** Temporary site WhatsApp (India). Update when permanent number is ready. */
export const WHATSAPP_NUMBER = "918167028450";
export const WHATSAPP_DISPLAY = "+91 81670 28450";

export function whatsappChatUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message?.trim()) return base;
  return `${base}?text=${encodeURIComponent(message.trim())}`;
}
