const STORAGE_KEY = "3gdeco-cms-revision";
const EVENT_NAME = "3gdeco:cms-updated";
const CHANNEL_NAME = "3gdeco-cms";

type Listener = () => void;

function writeRevision(value: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* ignore quota / private mode */
  }
}

/** Call after any successful CMS write so public pages can re-fetch. */
export function notifyCmsUpdated(reason = "save"): void {
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
 * Subscribe to CMS updates (same tab + other tabs + window focus).
 * Returns an unsubscribe function.
 */
export function subscribeCmsUpdated(listener: Listener): () => void {
  const onCustom = () => listener();
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) listener();
  };
  const onFocus = () => listener();
  const onVisible = () => {
    if (document.visibilityState === "visible") listener();
  };

  window.addEventListener(EVENT_NAME, onCustom);
  window.addEventListener("storage", onStorage);
  window.addEventListener("focus", onFocus);
  document.addEventListener("visibilitychange", onVisible);

  let channel: BroadcastChannel | null = null;
  try {
    channel = new BroadcastChannel(CHANNEL_NAME);
    channel.onmessage = (event) => {
      if (event?.data?.type === "cms-updated") listener();
    };
  } catch {
    channel = null;
  }

  return () => {
    window.removeEventListener(EVENT_NAME, onCustom);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("focus", onFocus);
    document.removeEventListener("visibilitychange", onVisible);
    channel?.close();
  };
}
