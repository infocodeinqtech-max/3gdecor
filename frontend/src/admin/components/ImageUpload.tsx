import { useCallback, useEffect, useRef, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import "react-easy-crop/react-easy-crop.css";
import { Crop, Upload, X, ImageIcon, Check } from "lucide-react";
import { toast } from "sonner";
import { uploadMediaFile } from "../../api/client";
import { mediaUrl } from "../../utils/mediaUrl";
import {
  formatAspectLabel,
  getCroppedBlob,
} from "../utils/imageCrop";
import {
  MEDIA_ACCEPT,
  MEDIA_MAX_SIZE_MB,
  validateImageBlob,
  validateImageFile,
} from "../utils/mediaUploadRules";
import { toAdminErrorMessage } from "../../utils/publicError";

export interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  hint?: string;
  maxSizeMb?: number;
  /**
   * Upload folder under public/uploads/{section}/
   * e.g. "projects", "about", "hero", "contact"
   */
  section: string;
  /** Recommended display / output width in px (shown in note + crop target). */
  recommendedWidth?: number;
  /** Recommended display / output height in px (shown in note + crop target). */
  recommendedHeight?: number;
  /**
   * Lock crop aspect ratio. Defaults to recommendedWidth/recommendedHeight when both set.
   * Pass `null` for free-form crop.
   */
  aspect?: number | null;
}

function sizeNote(
  width?: number,
  height?: number,
): string | null {
  if (!width || !height) return null;
  const ratio = formatAspectLabel(width, height);
  return `Recommended display size: ${width} × ${height} px (ratio ${ratio}). Crop to this size before upload for a sharp fit on the live site.`;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Image",
  hint,
  maxSizeMb = MEDIA_MAX_SIZE_MB,
  section,
  recommendedWidth,
  recommendedHeight,
  aspect,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewSrc = value ? mediaUrl(value) || value : "";

  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [applying, setApplying] = useState(false);
  const [freeAspect, setFreeAspect] = useState(false);

  const lockedAspect =
    aspect === null
      ? undefined
      : aspect ??
        (recommendedWidth && recommendedHeight
          ? recommendedWidth / recommendedHeight
          : undefined);

  const activeAspect = freeAspect ? undefined : lockedAspect;
  const note = sizeNote(recommendedWidth, recommendedHeight);
  const folderHint = `Saved to /uploads/${section}/… · Max size ${maxSizeMb}MB`;

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const closeCrop = () => {
    setCropSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setApplying(false);
    setFreeAspect(false);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const error = validateImageFile(file, maxSizeMb);
    if (error) {
      toast.error(error);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCropSrc(reader.result as string);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setFreeAspect(false);
    };
    reader.onerror = () => toast.error("Failed to read image");
    reader.readAsDataURL(file);
  };

  const applyCrop = async () => {
    if (!cropSrc || !croppedAreaPixels) {
      toast.error("Adjust the crop area first");
      return;
    }
    if (!section?.trim()) {
      toast.error("Upload section is missing");
      return;
    }
    setApplying(true);
    try {
      const blob = await getCroppedBlob(cropSrc, croppedAreaPixels, {
        mimeType: "image/jpeg",
        quality: 0.92,
        maxOutputWidth: Math.max(recommendedWidth ?? 0, 2400),
      });

      const blobError = validateImageBlob(blob, maxSizeMb);
      if (blobError) {
        toast.error(blobError);
        setApplying(false);
        return;
      }

      const path = await uploadMediaFile(section, blob, "image.jpg");
      onChange(path);
      closeCrop();
      toast.success(
        `Uploaded ${path} (${Math.round(croppedAreaPixels.width)} × ${Math.round(croppedAreaPixels.height)} px)`,
      );
    } catch (err) {
      toast.error(toAdminErrorMessage(err));
      setApplying(false);
    }
  };

  useEffect(() => {
    if (!cropSrc) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") closeCrop();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cropSrc]);

  const cropW = croppedAreaPixels ? Math.round(croppedAreaPixels.width) : 0;
  const cropH = croppedAreaPixels ? Math.round(croppedAreaPixels.height) : 0;
  const pathPreview =
    value && !value.startsWith("data:") ? value : null;

  return (
    <div>
      {label ? (
        <label className="block text-sm mb-2 text-[#6E655C]">{label}</label>
      ) : null}

      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-[#E8DFD2] bg-[#FAF7F2] mb-3">
          <img
            src={previewSrc}
            alt="Preview"
            className="w-full h-44 object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-[#6E655C] hover:text-red-600 shadow-sm"
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center h-32 rounded-xl border-2 border-dashed border-[#E0D5C8] bg-[#FAF7F2] mb-3">
          <ImageIcon className="w-8 h-8 text-[#C4B8A8]" />
        </div>
      )}

      {pathPreview && (
        <p className="mb-2 text-xs text-[#8A8177] break-all font-mono">
          {pathPreview}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={MEDIA_ACCEPT}
        className="hidden"
        onChange={handleFile}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E0D5C8] text-sm text-[#332C26] hover:bg-[#FAF7F2] transition-colors w-full justify-center"
      >
        <Upload className="w-4 h-4" />
        {value ? "Change Image" : "Upload & Crop Image"}
      </button>

      <div className="mt-2 rounded-lg border border-[#E8DFD2] bg-[#FAF7F2] px-3 py-2 space-y-1">
        <p className="text-xs text-[#6E655C] leading-relaxed">
          <span className="font-semibold text-[#8a5a12]">Note: </span>
          {folderHint}. Allowed: jpeg, jpg, png, webp, gif.
          {note ? ` ${note}` : ""}
        </p>
        {hint && <p className="text-xs text-[#B0A69A] leading-relaxed">{hint}</p>}
      </div>

      {cropSrc && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 p-4">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#E8DFD2]">
              <div className="flex items-center gap-2 text-[#2A211C]">
                <Crop className="w-4 h-4 text-[#c48a1a]" />
                <h3 className="font-semibold text-sm sm:text-base">
                  Crop & upload
                  {recommendedWidth && recommendedHeight
                    ? ` · target ${recommendedWidth}×${recommendedHeight}`
                    : ""}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeCrop}
                className="p-1.5 rounded-lg text-[#6E655C] hover:bg-[#FAF7F2]"
                aria-label="Close crop"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative h-[min(52vh,420px)] bg-[#1a1612]">
              <Cropper
                image={cropSrc}
                crop={crop}
                zoom={zoom}
                aspect={activeAspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                showGrid
              />
            </div>

            <div className="px-5 py-4 space-y-4 border-t border-[#E8DFD2] bg-[#FAF7F2]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="rounded-xl border border-[#E0D5C8] bg-white px-3 py-2 text-sm text-[#2A211C]">
                  Crop size:{" "}
                  <span className="font-semibold tabular-nums">
                    {cropW} × {cropH} px
                  </span>
                  <span className="text-[#8A8177] ml-2 text-xs">
                    → /uploads/{section}/
                  </span>
                </div>
                {lockedAspect != null && (
                  <label className="inline-flex items-center gap-2 text-xs text-[#6E655C] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={freeAspect}
                      onChange={(e) => setFreeAspect(e.target.checked)}
                      className="rounded border-[#D4C8B8]"
                    />
                    Free crop (unlock ratio)
                  </label>
                )}
              </div>

              <div>
                <label className="block text-xs text-[#6E655C] mb-1.5">
                  Zoom
                </label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-[#c48a1a]"
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                <button
                  type="button"
                  onClick={closeCrop}
                  className="px-4 py-2.5 rounded-xl border border-[#E0D5C8] text-sm text-[#6E655C] hover:bg-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={applying || !croppedAreaPixels}
                  onClick={applyCrop}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl admin-btn-gold text-sm font-medium disabled:opacity-60"
                >
                  <Check className="w-4 h-4" />
                  {applying ? "Uploading…" : "Upload cropped image"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
