/** Crop helpers for admin image upload. */

export type Area = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (e) => reject(e));
    image.crossOrigin = "anonymous";
    image.src = url;
  });
}

/** Draw the cropped region to a canvas and return a JPEG/PNG data URL. */
export async function getCroppedDataUrl(
  imageSrc: string,
  pixelCrop: Area,
  options?: { mimeType?: string; quality?: number; maxOutputWidth?: number },
): Promise<string> {
  const blob = await getCroppedBlob(imageSrc, pixelCrop, options);
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read cropped image"));
    reader.readAsDataURL(blob);
  });
}

/** Crop and return a Blob suitable for multipart upload. */
export async function getCroppedBlob(
  imageSrc: string,
  pixelCrop: Area,
  options?: { mimeType?: string; quality?: number; maxOutputWidth?: number },
): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  let outW = Math.max(1, Math.round(pixelCrop.width));
  let outH = Math.max(1, Math.round(pixelCrop.height));
  const maxW = options?.maxOutputWidth ?? 2400;
  if (outW > maxW) {
    const scale = maxW / outW;
    outW = Math.round(outW * scale);
    outH = Math.round(outH * scale);
  }

  canvas.width = outW;
  canvas.height = outH;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outW,
    outH,
  );

  const mime = options?.mimeType ?? "image/jpeg";
  const quality = options?.quality ?? 0.92;

  return await new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to encode cropped image"));
          return;
        }
        resolve(blob);
      },
      mime,
      quality,
    );
  });
}

export function formatAspectLabel(width: number, height: number): string {
  const g = gcd(Math.round(width), Math.round(height));
  if (!g) return `${width}×${height}`;
  const a = Math.round(width) / g;
  const b = Math.round(height) / g;
  if (a <= 32 && b <= 32) return `${a}:${b}`;
  return `${width}×${height}`;
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}
