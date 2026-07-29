import { apiRequest } from "../api/client";

export type PublicSiteCms = {
  navigation?: unknown[];
  hero?: Record<string, unknown> | null;
  footer?: Record<string, unknown> | null;
  siteContact?: Record<string, unknown> | null;
  about?: Record<string, unknown> | null;
  contactPage?: Record<string, unknown> | null;
  contactOffices?: unknown[];
  expertiseSection?: Record<string, unknown> | null;
  expertise?: unknown[];
  projectsSection?: Record<string, unknown> | null;
  projects?: unknown[];
  servicesSection?: Record<string, unknown> | null;
  services?: unknown[];
  processSection?: Record<string, unknown> | null;
  process?: unknown[];
  testimonialsSection?: Record<string, unknown> | null;
  testimonials?: unknown[];
};

let sitePromise: Promise<PublicSiteCms> | null = null;

/** Single shared fetch for public site CMS (nav/hero/footer/homepage/contact). */
export function loadPublicSiteCms(force = false): Promise<PublicSiteCms> {
  if (force) sitePromise = null;
  if (!sitePromise) {
    sitePromise = apiRequest<{ success: boolean; data: PublicSiteCms }>(
      "/cms-public/site",
      { auth: false },
    )
      .then((res) => res.data ?? {})
      .catch(() => {
        sitePromise = null;
        return {} as PublicSiteCms;
      });
  }
  return sitePromise;
}

export function clearPublicSiteCmsCache(): void {
  sitePromise = null;
}
