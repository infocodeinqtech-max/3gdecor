import { getContent, getListContent } from "../admin/utils/contentStorage";
import {
  seedAbout,
  seedExpertiseSection,
  seedExpertise,
  seedProjectsSection,
  seedProjects,
  seedServicesSection,
  seedServices,
  seedProcessSection,
  seedProcess,
  seedTestimonialsSection,
  seedTestimonials,
} from "../admin/data/seedContent";
import { mediaUrl } from "../utils/mediaUrl";
import { loadPublicSiteCms } from "./publicCms";

import about1 from "../assets/images/about1.jpg";
import about2 from "../assets/images/about2.jpg";
import about3 from "../assets/images/about3.jpg";
import about4 from "../assets/images/about4.jpg";
import badge3G from "../assets/images/3g-badge.png";

/** Resolve DB/media paths; keep Vite-bundled assets and data URLs untouched. */
export function resolveImage(
  stored: string | undefined,
  fallback: string,
): string {
  const value = (stored?.trim() || fallback || "").trim();
  if (!value) return fallback || "";
  if (value.startsWith("data:") || value.startsWith("blob:")) return value;
  // Bundled Vite assets often look like /3gdeco/tmp_2/assets/...
  if (value.includes("/assets/") && !value.includes("/uploads/")) return value;
  if (value.includes("uploads/") || value.startsWith("/uploads/")) {
    return mediaUrl(value);
  }
  return value;
}

const BROKEN_PROJECT_IMAGE_IDS = ["1699239116624"];

function resolveProjectImage(
  stored: string | undefined,
  fallback: string,
): string {
  const value = stored?.trim();
  if (!value) return resolveImage(undefined, fallback);
  if (BROKEN_PROJECT_IMAGE_IDS.some((id) => value.includes(id))) {
    return resolveImage(undefined, fallback);
  }
  return resolveImage(value, fallback);
}

/** Local about defaults with real asset URLs (empty CMS strings resolve here). */
export function getDefaultAboutData() {
  return {
    ...seedAbout,
    images: [
      mediaUrl("/uploads/about/about-1.jpg") || about1,
      mediaUrl("/uploads/about/about-2.jpg") || about2,
      mediaUrl("/uploads/about/about-3.jpg") || about3,
      mediaUrl("/uploads/about/about-4.jpg") || about4,
    ],
    badgeImage: mediaUrl("/uploads/about/badge.jpg") || badge3G,
  };
}

export async function getAboutData() {
  const stored = await getContent("about", seedAbout);
  const about = {
    ...seedAbout,
    ...stored,
    images: stored.images ?? seedAbout.images,
  };
  const defaults = [about1, about2, about3, about4];
  const images = (about.images?.length ? about.images : defaults).map(
    (img, i) => resolveImage(img, defaults[i] ?? defaults[0]),
  );

  return {
    ...about,
    images,
    badgeImage: resolveImage(about.badgeImage, badge3G),
  };
}

export async function getExpertiseSection() {
  return getContent("expertise-section", seedExpertiseSection);
}

export async function getExpertiseItems() {
  const rows = await getListContent("expertise", seedExpertise);
  return rows.map((item, index) => ({
    ...item,
    image: resolveImage(item.image, seedExpertise[index]?.image || ""),
  }));
}

export async function getProjectsSection() {
  return getContent("projects-section", seedProjectsSection);
}

export async function getProjectsItems() {
  const stored = await getListContent("projects", seedProjects);

  const merged = seedProjects.map((seedItem, index) => {
    const storedItem =
      stored.find((item) => item.id === seedItem.id) ?? stored[index];
    if (!storedItem) return seedItem;

    return {
      ...seedItem,
      ...storedItem,
      image: resolveProjectImage(storedItem.image, seedItem.image),
    };
  });

  const extras = stored.filter(
    (item) => !merged.some((mergedItem) => mergedItem.id === item.id),
  );

  return [...merged, ...extras].sort(
    (a, b) => Number(!!b.featured) - Number(!!a.featured),
  );
}

export async function getServicesSection() {
  return getContent("services-section", seedServicesSection);
}

export async function getServicesItems() {
  const stored = await getListContent("services", seedServices);

  const merged = seedServices.map((seedItem, index) => {
    const storedItem =
      stored.find((item) => item.id === seedItem.id) ?? stored[index];
    if (!storedItem) return seedItem;

    return {
      ...seedItem,
      ...storedItem,
      backgroundImage: resolveImage(
        storedItem.backgroundImage,
        seedItem.backgroundImage,
      ),
    };
  });

  const extras = stored.filter(
    (item) => !merged.some((mergedItem) => mergedItem.id === item.id),
  );

  return [...merged, ...extras].map((item) => ({
    ...item,
    backgroundImage: resolveImage(item.backgroundImage, item.backgroundImage),
  }));
}

export async function getProcessSection() {
  return getContent("process-section", seedProcessSection);
}

export async function getProcessItems() {
  return getListContent("process", seedProcess);
}

export async function getTestimonialsSection() {
  return getContent("testimonials-section", seedTestimonialsSection);
}

export async function getTestimonialsItems() {
  const rows = await getListContent("testimonials", seedTestimonials);
  return rows.map((item, index) => ({
    ...item,
    image: resolveImage(item.image, seedTestimonials[index]?.image || ""),
  }));
}

function mergeAboutFromSite(stored: Record<string, unknown> | null | undefined) {
  const about = {
    ...seedAbout,
    ...(stored ?? {}),
    images: (stored?.images as string[] | undefined) ?? seedAbout.images,
  };
  const defaults = [about1, about2, about3, about4];
  const images = (about.images?.length ? about.images : defaults).map(
    (img, i) => resolveImage(img, defaults[i] ?? defaults[0]),
  );

  return {
    ...about,
    images,
    badgeImage: resolveImage(
      typeof about.badgeImage === "string" ? about.badgeImage : undefined,
      badge3G,
    ),
  };
}

function mergeProjectsFromSite(stored: Array<Record<string, unknown>>) {
  const merged = seedProjects.map((seedItem, index) => {
    const storedItem =
      (stored.find((item) => item.id === seedItem.id) as typeof seedItem | undefined) ??
      (stored[index] as typeof seedItem | undefined);
    if (!storedItem) return seedItem;

    return {
      ...seedItem,
      ...storedItem,
      image: resolveProjectImage(
        typeof storedItem.image === "string" ? storedItem.image : undefined,
        seedItem.image,
      ),
    };
  });

  const extras = stored.filter(
    (item) => !merged.some((mergedItem) => mergedItem.id === item.id),
  ) as typeof seedProjects;

  return [...merged, ...extras].sort(
    (a, b) => Number(!!b.featured) - Number(!!a.featured),
  );
}

function mergeServicesFromSite(stored: Array<Record<string, unknown>>) {
  const merged = seedServices.map((seedItem, index) => {
    const storedItem =
      (stored.find((item) => item.id === seedItem.id) as typeof seedItem | undefined) ??
      (stored[index] as typeof seedItem | undefined);
    if (!storedItem) return seedItem;

    return {
      ...seedItem,
      ...storedItem,
      backgroundImage: resolveImage(
        typeof storedItem.backgroundImage === "string"
          ? storedItem.backgroundImage
          : undefined,
        seedItem.backgroundImage,
      ),
    };
  });

  const extras = stored.filter(
    (item) => !merged.some((mergedItem) => mergedItem.id === item.id),
  ) as typeof seedServices;

  return [...merged, ...extras].map((item) => ({
    ...item,
    backgroundImage: resolveImage(item.backgroundImage, item.backgroundImage),
  }));
}

/** Load all homepage CMS blocks once (single /cms-public/site request). */
export async function loadHomepageCms(force = false) {
  const site = await loadPublicSiteCms(force);

  const about = mergeAboutFromSite(site.about ?? undefined);
  const expertiseSection = {
    ...seedExpertiseSection,
    ...(site.expertiseSection ?? {}),
  };
  const expertiseItems = (
    (site.expertise as Array<Record<string, unknown>> | undefined) ?? []
  ).map((item, index) => ({
    ...item,
    image: resolveImage(
      typeof item.image === "string" ? item.image : undefined,
      seedExpertise[index]?.image || "",
    ),
  }));
  const projectsSection = {
    ...seedProjectsSection,
    ...(site.projectsSection ?? {}),
  };
  const projectsItems = mergeProjectsFromSite(
    (site.projects as Array<Record<string, unknown>> | undefined) ?? [],
  );
  const servicesSection = {
    ...seedServicesSection,
    ...(site.servicesSection ?? {}),
  };
  const servicesItems = mergeServicesFromSite(
    (site.services as Array<Record<string, unknown>> | undefined) ?? [],
  );
  const processSection = {
    ...seedProcessSection,
    ...(site.processSection ?? {}),
  };
  const processItems =
    (site.process as typeof seedProcess | undefined)?.length
      ? (site.process as typeof seedProcess)
      : seedProcess;
  const testimonialsSection = {
    ...seedTestimonialsSection,
    ...(site.testimonialsSection ?? {}),
  };
  const testimonialsItems = (
    (site.testimonials as Array<Record<string, unknown>> | undefined) ?? []
  ).map((item, index) => ({
    ...item,
    image: resolveImage(
      typeof item.image === "string" ? item.image : undefined,
      seedTestimonials[index]?.image || "",
    ),
  }));

  // Fallback to legacy multi-request path if the bundled endpoint is empty.
  if (!site.about && !site.expertise?.length && !site.services?.length) {
    const [
      aboutFb,
      expertiseSectionFb,
      expertiseItemsFb,
      projectsSectionFb,
      projectsItemsFb,
      servicesSectionFb,
      servicesItemsFb,
      processSectionFb,
      processItemsFb,
      testimonialsSectionFb,
      testimonialsItemsFb,
    ] = await Promise.all([
      getAboutData(),
      getExpertiseSection(),
      getExpertiseItems(),
      getProjectsSection(),
      getProjectsItems(),
      getServicesSection(),
      getServicesItems(),
      getProcessSection(),
      getProcessItems(),
      getTestimonialsSection(),
      getTestimonialsItems(),
    ]);

    return {
      about: aboutFb,
      expertiseSection: expertiseSectionFb,
      expertiseItems: expertiseItemsFb,
      projectsSection: projectsSectionFb,
      projectsItems: projectsItemsFb,
      servicesSection: servicesSectionFb,
      servicesItems: servicesItemsFb,
      processSection: processSectionFb,
      processItems: processItemsFb,
      testimonialsSection: testimonialsSectionFb,
      testimonialsItems: testimonialsItemsFb,
    };
  }

  return {
    about,
    expertiseSection,
    expertiseItems:
      expertiseItems.length > 0
        ? expertiseItems
        : await getExpertiseItems(),
    projectsSection,
    projectsItems:
      projectsItems.length > 0 ? projectsItems : await getProjectsItems(),
    servicesSection,
    servicesItems:
      servicesItems.length > 0 ? servicesItems : await getServicesItems(),
    processSection,
    processItems,
    testimonialsSection,
    testimonialsItems:
      testimonialsItems.length > 0
        ? testimonialsItems
        : await getTestimonialsItems(),
  };
}
