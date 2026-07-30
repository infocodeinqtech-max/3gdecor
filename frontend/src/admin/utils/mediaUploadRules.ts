/**
 * Shared media upload rules — keep in sync with backend MediaUploadRules.php
 */

export const MEDIA_MAX_SIZE_MB = 2;
export const MEDIA_MAX_SIZE_BYTES = MEDIA_MAX_SIZE_MB * 1024 * 1024;

export const MEDIA_ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const MEDIA_ALLOWED_EXTENSIONS = [
  "jpeg",
  "jpg",
  "png",
  "webp",
  "gif",
] as const;

/** For <input accept="..."> */
export const MEDIA_ACCEPT =
  "image/jpeg,image/jpg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif";

export function getFileExtension(name: string): string {
  const parts = name.split(".");
  if (parts.length < 2) return "";
  return parts.pop()!.toLowerCase();
}

/** Returns error message, or null if valid. */
export function validateImageFile(
  file: File,
  maxSizeMb: number = MEDIA_MAX_SIZE_MB,
): string | null {
  const maxBytes = maxSizeMb * 1024 * 1024;
  const mime = (file.type || "").toLowerCase();
  const ext = getFileExtension(file.name);

  if (!file) return "Please select an image file.";

  if (
    !MEDIA_ALLOWED_MIME_TYPES.includes(
      mime as (typeof MEDIA_ALLOWED_MIME_TYPES)[number],
    )
  ) {
    return "Image must be jpeg, jpg, png, webp, or gif.";
  }

  if (
    ext &&
    !MEDIA_ALLOWED_EXTENSIONS.includes(
      ext as (typeof MEDIA_ALLOWED_EXTENSIONS)[number],
    )
  ) {
    return "Image must be jpeg, jpg, png, webp, or gif.";
  }

  if (file.size > maxBytes) {
    return `Image must be under ${maxSizeMb}MB.`;
  }

  return null;
}

/** Validate cropped/upload blob before sending to API. */
export function validateImageBlob(
  blob: Blob,
  maxSizeMb: number = MEDIA_MAX_SIZE_MB,
): string | null {
  const maxBytes = maxSizeMb * 1024 * 1024;
  const mime = (blob.type || "").toLowerCase();

  if (
    mime &&
    !MEDIA_ALLOWED_MIME_TYPES.includes(
      mime as (typeof MEDIA_ALLOWED_MIME_TYPES)[number],
    )
  ) {
    return "Image must be jpeg, jpg, png, webp, or gif.";
  }

  if (blob.size > maxBytes) {
    return `Image must be under ${maxSizeMb}MB after crop. Try a smaller crop or lower resolution.`;
  }

  return null;
}
