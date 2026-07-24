/**
 * Auto local / live base URLs from the browser hostname.
 * - localhost / 127.0.0.1  → http://127.0.0.1:8000
 * - anything else (Hostinger) → https://current-domain/backend/public
 *
 * Optional override via .env (only if you really need to force a URL):
 *   VITE_API_URL=...
 *   VITE_MEDIA_URL=...
 */

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);

const LOCAL_ORIGIN = "http://127.0.0.1:8000";
const LIVE_BACKEND_PATH = "/backend/public";

function isLocalHostname(hostname: string): boolean {
  return LOCAL_HOSTS.has(hostname);
}

function liveOrigin(): string {
  if (typeof window !== "undefined" && window.location?.origin) {
    return `${window.location.origin}${LIVE_BACKEND_PATH}`;
  }
  return `https://3gdecor-dev.codeinq.com${LIVE_BACKEND_PATH}`;
}

function resolvedOrigin(): string {
  if (typeof window !== "undefined") {
    return isLocalHostname(window.location.hostname)
      ? LOCAL_ORIGIN
      : liveOrigin();
  }
  // Non-browser (tests / SSR): prefer Vite mode
  return import.meta.env.DEV ? LOCAL_ORIGIN : liveOrigin();
}

/** e.g. http://127.0.0.1:8000/api  or  https://domain/backend/public/api */
export function getApiBase(): string {
  const forced = (import.meta.env.VITE_API_URL as string | undefined)?.trim();
  if (forced) return forced.replace(/\/$/, "");
  return `${resolvedOrigin()}/api`;
}

/** e.g. http://127.0.0.1:8000  or  https://domain/backend/public */
export function getMediaBase(): string {
  const forced = (import.meta.env.VITE_MEDIA_URL as string | undefined)?.trim();
  if (forced) return forced.replace(/\/$/, "");
  return resolvedOrigin();
}

export function isLocalRuntime(): boolean {
  if (typeof window !== "undefined") {
    return isLocalHostname(window.location.hostname);
  }
  return Boolean(import.meta.env.DEV);
}
