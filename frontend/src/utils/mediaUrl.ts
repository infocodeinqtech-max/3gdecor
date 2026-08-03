import { getMediaBase } from "../api/env";
import { getCmsRevision } from "../content/cmsSync";

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

  const base = `${getMediaBase()}${normalized}`;
  // Bust browser cache when CMS content is updated (same path, new file).
  if (normalized.startsWith("/uploads/")) {
    const rev = getCmsRevision();
    if (rev && rev !== "0") {
      return `${base}${base.includes("?") ? "&" : "?"}v=${encodeURIComponent(rev)}`;
    }
  }
  return base;
}

/** Prefetch an image so UI can swap without a visible static→DB flash. */
export function preloadImage(src: string | undefined | null): Promise<void> {
  const url = (src || "").trim();
  if (!url) return Promise.resolve();
  return new Promise((resolve) => {
    const img = new Image();
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    img.onload = () => {
      if (typeof img.decode === "function") {
        img.decode().then(finish).catch(finish);
      } else {
        finish();
      }
    };
    img.onerror = finish;
    img.src = url;
    if (img.complete) {
      if (typeof img.decode === "function") {
        img.decode().then(finish).catch(finish);
      } else {
        finish();
      }
    }
  });
}
