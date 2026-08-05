import { apiRequest } from "../../api/client";
import { notifyCmsUpdated } from "../../content/cmsSync";

/** Frontend storage keys that are list resources */
const LIST_KEYS = new Set([
  "navigation",
  "expertise",
  "projects",
  "services",
  "process",
  "testimonials",
  "contact-offices",
  "about-page-hero-features",
  "about-page-founder-members",
  "about-page-principles",
]);

/** Singleton resources */
const SINGLETON_KEYS = new Set([
  "hero",
  "about",
  "footer",
  "site-contact",
  "contact-page",
]);

/** Section header keys */
const SECTION_KEYS = new Set([
  "expertise-section",
  "projects-section",
  "services-section",
  "process-section",
  "testimonials-section",
]);

type IdItem = { id: number | string };

function cloneFallback<T>(fallback: T): T {
  return JSON.parse(JSON.stringify(fallback)) as T;
}

/** Load a CMS list from API (falls back to seed on error) */
export async function getListContent<T extends IdItem>(
  key: string,
  fallback: T[],
): Promise<T[]> {
  try {
    if (key === "enquiries") {
      const res = await apiRequest<{ data: T[] }>("/enquiries");
      // Never fall back to seed demo rows for live admin inbox
      return Array.isArray(res.data) ? res.data : [];
    }
    if (!LIST_KEYS.has(key)) return cloneFallback(fallback);
    const res = await apiRequest<{ data: T[] }>(`/cms-lists/${key}`, {
      auth: false,
    });
    // Prefer live DB result (already active-only); don't replace empty with seed
    return Array.isArray(res.data) ? res.data : cloneFallback(fallback);
  } catch {
    if (key === "enquiries") return [];
    return cloneFallback(fallback);
  }
}

/** Upsert a full list: update existing ids, create new, soft-delete removed. */
export async function saveListContent<T extends IdItem>(
  key: string,
  data: T[],
): Promise<T[]> {
  if (key === "enquiries") {
    return [];
  }

  const current = await getListContent<T>(key, []);
  const currentIds = new Set(current.map((r) => String(r.id)));

  // Soft-delete removed rows only
  for (const row of current) {
    if (!data.some((d) => String(d.id) === String(row.id))) {
      await deleteListItem(key, row.id);
    }
  }

  const saved: T[] = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const payload = {
      ...(item as Record<string, unknown>),
      // sort_order: i + 1,
    };

    if (currentIds.has(String(item.id)) && Number(item.id) > 0) {
      console.log("Current IDs:", [...currentIds]);
console.log("Item ID:", item.id);
console.log("Matched:", currentIds.has(String(item.id)));

      const updated = await updateListItem(key, item.id, payload);
      saved.push(updated as T);
    } else {
      const { id: _omit, ...rest } = payload;
      const created = await createListItem(key, rest);
      saved.push(created as T);
    }
  }

  notifyCmsUpdated(`sync:${key}`);
  return saved;
}

export async function createListItem(
  key: string,
  item: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const res = await apiRequest<{ data: Record<string, unknown> }>(
    `/cms-lists/${key}`,
    { method: "POST", body: item },
  );
  notifyCmsUpdated(`create:${key}`);
  return res.data;
}

export async function updateListItem(
  key: string,
  id: number | string,
  item: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  if (key === "enquiries") {
    const res = await apiRequest<{ data: Record<string, unknown> }>(
      `/enquiries/${id}`,
      { method: "PATCH", body: { status: item.status } },
    );
    notifyCmsUpdated("enquiry:update");
    return res.data;
  }
  const res = await apiRequest<{ data: Record<string, unknown> }>(
    `/cms-lists/${key}/${id}`,
    { method: "PUT", body: item },
  );
  notifyCmsUpdated(`update:${key}`);
  return res.data;
}

export async function deleteListItem(
  key: string,
  id: number | string,
): Promise<void> {
  if (key === "enquiries") {
    await apiRequest(`/enquiries/${id}`, { method: "DELETE" });
    notifyCmsUpdated("enquiry:delete");
    return;
  }
  await apiRequest(`/cms-lists/${key}/${id}`, { method: "DELETE" });
  notifyCmsUpdated(`delete:${key}`);
}

export async function getContent<T>(key: string, fallback: T): Promise<T> {
  try {
    if (SINGLETON_KEYS.has(key)) {
      const res = await apiRequest<{ data: T | null }>(
        `/cms-singletons/${key}`,
        { auth: false },
      );
      return res.data
        ? { ...cloneFallback(fallback), ...res.data }
        : cloneFallback(fallback);
    }
    if (SECTION_KEYS.has(key)) {
      const res = await apiRequest<{ data: T | null }>(
        `/cms-sections/${key}`,
        { auth: false },
      );
      return res.data
        ? { ...cloneFallback(fallback), ...res.data }
        : cloneFallback(fallback);
    }
    return cloneFallback(fallback);
  } catch {
    return cloneFallback(fallback);
  }
}

export async function setContent<T>(key: string, data: T): Promise<void> {
  if (SINGLETON_KEYS.has(key)) {
    await apiRequest(`/cms-singletons/${key}`, {
      method: "PUT",
      body: { data },
    });
    notifyCmsUpdated(`singleton:${key}`);
    return;
  }
  if (SECTION_KEYS.has(key)) {
    await apiRequest(`/cms-sections/${key}`, {
      method: "PUT",
      body: { data },
    });
    notifyCmsUpdated(`section:${key}`);
  }
}

export async function getHeroContent<
  T extends { tagline?: string; stats?: unknown[] },
>(fallback: T): Promise<T> {
  const data = await getContent("hero", fallback);
  if (!data?.tagline) return cloneFallback(fallback);
  return {
    ...cloneFallback(fallback),
    ...data,
    stats:
      Array.isArray(data.stats) && data.stats.length
        ? data.stats
        : fallback.stats,
  };
}
