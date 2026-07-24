import { getMediaBase } from "../api/env";

/** Build absolute media URL for paths stored in DB (/uploads/...). */
export function mediaUrl(path: string | undefined | null): string {
  if (!path) return "";
  const value = path.trim();
  if (!value) return "";
  if (value.startsWith("data:") || value.startsWith("blob:")) return value;
  if (/^https?:\/\//i.test(value)) return value;

  const normalized = value.startsWith("/")
    ? value
    : value.startsWith("uploads/")
      ? `/${value}`
      : `/${value}`;

  return `${getMediaBase()}${normalized}`;
}
