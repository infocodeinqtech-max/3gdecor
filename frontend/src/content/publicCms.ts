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
  heroFeatures?: unknown[];
};

let sitePromise: Promise<PublicSiteCms> | null = null;
let cachedSite: PublicSiteCms | null = null;

/** Last successfully resolved public CMS payload (sync read for initial UI). */
export function getCachedPublicSiteCms(): PublicSiteCms | null {
  return cachedSite;
}

/** Single shared fetch for public site CMS (nav/hero/footer/homepage/contact). */
export function loadPublicSiteCms(force = false): Promise<PublicSiteCms> {
  if (force) sitePromise = null;
  if (!sitePromise) {
    sitePromise = apiRequest<{ success: boolean; data: PublicSiteCms }>(
      "/cms-public/site",
      { auth: false },
    )
      .then((res) => {
        cachedSite = res.data ?? {};
        return cachedSite;
      })
      .catch(() => {
        sitePromise = null;
        return {} as PublicSiteCms;
      });
  }
  return sitePromise;
}

export function clearPublicSiteCmsCache(): void {
  sitePromise = null;
  cachedSite = null;
}


/** Load a list of public CMS content for a given resource. */

const listPromises = new Map<string, Promise<unknown[]>>();
const listCache = new Map<string, unknown[]>();
const listPromise = new Map<string, Promise<unknown[]>>();

export async function loadPublicCmsList<T>(resource: string,force = false,): Promise<T[]> {
  if (force) {
    listCache.delete(resource);
    listPromise.delete(resource);
  }

  const cached = listCache.get(resource);
  if (cached) {
    return cached as T[];
  }

  const pending = listPromise.get(resource);
  if (pending) {
    return pending as Promise<T[]>;
  }

  const promise = apiRequest<{ success: boolean; data: T[] }>(
    `/cms-public/list/${resource}`,
    { auth: false },
  )
    .then((res) => {
      const data = res.data ?? [];
      listCache.set(resource, data);
      listPromise.delete(resource);
      return data;
    })
    .catch(() => {
      listPromise.delete(resource);
      return [];
    });

  listPromise.set(resource, promise as Promise<unknown[]>);

  return promise;
}

export function clearPublicCmsListCache(resource?: string) {
  if (resource) {
    listPromises.delete(resource);
    return;
  }

  listPromises.clear();
}