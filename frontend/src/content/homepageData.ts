import {
  getContent,
  getListContent,
} from "../admin/utils/contentStorage";
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

import about1 from "../assets/images/about1.jpg";
import about2 from "../assets/images/about2.jpg";
import about3 from "../assets/images/about3.jpg";
import about4 from "../assets/images/about4.jpg";
import badge3G from "../assets/images/3g-badge.png";

/** Resolve DB/media paths; keep Vite-bundled assets and data URLs untouched. */
export function resolveImage(stored: string | undefined, fallback: string): string {
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

function resolveProjectImage(stored: string | undefined, fallback: string): string {
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

/** Load all homepage CMS blocks once */
export async function loadHomepageCms() {
  const [
    about,
    expertiseSection,
    expertiseItems,
    projectsSection,
    projectsItems,
    servicesSection,
    servicesItems,
    processSection,
    processItems,
    testimonialsSection,
    testimonialsItems,
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
    about,
    expertiseSection,
    expertiseItems,
    projectsSection,
    projectsItems,
    servicesSection,
    servicesItems,
    processSection,
    processItems,
    testimonialsSection,
    testimonialsItems,
  };
}
