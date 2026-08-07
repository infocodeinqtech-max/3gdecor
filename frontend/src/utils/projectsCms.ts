import {
  seedProjectsPageItems,
  type ProjectsPageCategoryItem,
  type ProjectsPageItem,
} from "../admin/data/seedContent";
import { mediaUrl } from "./mediaUrl";

export function resolveCategorySlug(
  category: ProjectsPageCategoryItem,
): string {
  if (category.slug?.trim()) return category.slug.trim();
  const match = category.link?.match(/\/projects\/([^/]+)/);
  return match?.[1] || "";
}

export function findCategoryBySlug(
  categories: ProjectsPageCategoryItem[],
  slug: string,
): ProjectsPageCategoryItem | undefined {
  return categories.find((cat) => resolveCategorySlug(cat) === slug);
}

export function findProjectBySlug(
  items: ProjectsPageItem[],
  categoryId: number | string,
  slug: string,
): ProjectsPageItem | undefined {
  return items.find(
    (item) =>
      String(item.categoryId) === String(categoryId) &&
      item.slug === slug &&
      item.active !== false,
  );
}

export function resolveProjectCardImage(
  item?: ProjectsPageItem | null,
): string {
  if (!item) return "";
  const fromDb = item.image?.trim() ? mediaUrl(item.image) : "";
  return fromDb || "";
}

export function resolveProjectImages(
  paths: string[] | undefined,
  fallback: string,
): string[] {
  const resolved = (paths || [])
    .map((path) => (path?.trim() ? mediaUrl(path) || path : ""))
    .filter(Boolean);
  if (resolved.length) return resolved;
  return fallback ? [fallback] : [];
}

export function projectDetailPath(
  categorySlug: string,
  itemSlug: string,
): string {
  return `/projects/${categorySlug}/${itemSlug}`;
}

export function withProjectDetailDefaults(
  item?: ProjectsPageItem | null,
): ProjectsPageItem {
  const fallback = seedProjectsPageItems[0];
  if (!item) return fallback;

  const seed =
    seedProjectsPageItems.find((row) => row.slug === item.slug) || fallback;

  return {
    ...seed,
    ...item,
    heroSlides: item.heroSlides?.length
      ? item.heroSlides
      : item.image
        ? [item.image]
        : seed.heroSlides?.length
          ? seed.heroSlides
          : [],
    aboutTitle: item.aboutTitle || item.title || seed.title,
    aboutDescription: item.aboutDescription || seed.aboutDescription || "",
    aboutFeatures: item.aboutFeatures?.length
      ? item.aboutFeatures
      : seed.aboutFeatures || [],
    galleryImages: item.galleryImages?.length
      ? item.galleryImages
      : item.image
        ? [item.image]
        : seed.galleryImages?.length
          ? seed.galleryImages
          : [],
    statusLabel: item.statusLabel || seed.statusLabel || "Completed Project",
    galleryEyebrow: item.galleryEyebrow || seed.galleryEyebrow || "Project Gallery",
    galleryTitle: item.galleryTitle || seed.galleryTitle || "A Visual Journey",
    galleryDescription:
      item.galleryDescription || seed.galleryDescription || "",
    heroTagline: item.heroTagline || seed.heroTagline || "",
  };
}
