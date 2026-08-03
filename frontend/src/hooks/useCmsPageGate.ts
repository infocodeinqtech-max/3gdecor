import { useEffect, useState } from "react";
import { subscribeCmsUpdated } from "../content/cmsSync";
import { getCachedPublicSiteCms } from "../content/publicCms";

type CmsLoader = (force: boolean) => Promise<unknown>;

/** Wait until the next two animation frames (React commit + browser paint). */
function waitForPaint(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

/**
 * Shows the 3G PageLoader until CMS/DB data is applied AND painted under the overlay.
 * Loader only dismisses after replacement — never before.
 */
export function useCmsPageGate(load: CmsLoader, minDurationMs = 900) {
  const hadCache = getCachedPublicSiteCms() !== null;
  const [showLoader, setShowLoader] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let alive = true;
    let fadeTimer: number | undefined;
    let hideTimer: number | undefined;
    const started = performance.now();
    // Soft nav can be shorter, but still wait for data paint before dismiss.
    const minMs = hadCache ? 200 : minDurationMs;
    const fadeMs = 480;

    const dismissAfterDataPainted = async () => {
      // load() already called setState with DB data — wait until it paints under blur
      await waitForPaint();
      // Extra tick so layout/images from CMS can settle before reveal
      await new Promise<void>((r) => {
        window.setTimeout(r, 50);
      });
      if (!alive) return;

      const elapsed = performance.now() - started;
      const wait = Math.max(0, minMs - elapsed);

      fadeTimer = window.setTimeout(() => {
        if (!alive) return;
        setFading(true);
        hideTimer = window.setTimeout(() => {
          if (alive) setShowLoader(false);
        }, fadeMs);
      }, wait);
    };

    load(false)
      .catch(() => undefined)
      .then(() => dismissAfterDataPainted());

    const unsub = subscribeCmsUpdated(() => {
      load(true).catch(() => undefined);
    });

    return () => {
      alive = false;
      unsub();
      if (fadeTimer) window.clearTimeout(fadeTimer);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minDurationMs]);

  return { showLoader, fading };
}
