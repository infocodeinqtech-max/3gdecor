import { clearPublicSiteCmsCache } from "./publicCms";

const STORAGE_KEY = "3gdeco-cms-revision";
const EVENT_NAME = "3gdeco:cms-updated";
const CHANNEL_NAME = "3gdeco-cms";

type Listener = () => void;

let revision = "0";

try {
  revision = localStorage.getItem(STORAGE_KEY) || "0";
} catch {
  /* ignore */
}

function writeRevision(value: string): void {
  revision = value;
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* ignore quota / private mode */
  }
}

/** Current CMS revision — used to bust browser cache on media URLs. */
export function getCmsRevision(): string {
  return revision;
}

/** Call after any successful CMS write so public pages can re-fetch. */
export function notifyCmsUpdated(reason = "save"): void {
  // Clear in-memory site payload BEFORE listeners run (must be sync).
  clearPublicSiteCmsCache();

  const next = String(Date.now());
  writeRevision(next);

  window.dispatchEvent(
    new CustomEvent(EVENT_NAME, { detail: { reason, revision: next } }),
  );

  try {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.postMessage({ type: "cms-updated", reason, revision: next });
    channel.close();
  } catch {
    /* BroadcastChannel unsupported */
  }
}

/**
 * Subscribe to CMS updates (same tab + other tabs).
 * Returns an unsubscribe function.
 */
export function subscribeCmsUpdated(listener: Listener): () => void {
  const onCustom = () => listener();
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      if (e.newValue) revision = e.newValue;
      clearPublicSiteCmsCache();
      listener();
    }
  };

  window.addEventListener(EVENT_NAME, onCustom);
  window.addEventListener("storage", onStorage);

  let channel: BroadcastChannel | null = null;
  try {
    channel = new BroadcastChannel(CHANNEL_NAME);
    channel.onmessage = (event) => {
      if (event?.data?.type === "cms-updated") {
        if (event.data.revision) revision = String(event.data.revision);
        clearPublicSiteCmsCache();
        listener();
      }
    };
  } catch {
    channel = null;
  }

  return () => {
    window.removeEventListener(EVENT_NAME, onCustom);
    window.removeEventListener("storage", onStorage);
    channel?.close();
  };
}
