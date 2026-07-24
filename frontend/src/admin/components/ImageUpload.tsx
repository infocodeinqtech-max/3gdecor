import { useRef } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { mediaUrl } from "../../utils/mediaUrl";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  hint?: string;
  maxSizeMb?: number;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Image",
  hint = "Prefer paths under /uploads/{section}/ for easy fetch & edit",
  maxSizeMb = 5,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewSrc = value ? mediaUrl(value) || value : "";

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > maxSizeMb * 1024 * 1024) {
      toast.error(`Image must be under ${maxSizeMb}MB`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.onerror = () => toast.error("Failed to read image");
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div>
      <label className="block text-sm mb-2 text-[#6E655C]">{label}</label>

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

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E0D5C8] text-sm text-[#332C26] hover:bg-[#FAF7F2] transition-colors w-full justify-center"
      >
        <Upload className="w-4 h-4" />
        {value ? "Change Image" : "Upload Image"}
      </button>
      {hint && <p className="text-xs text-[#B0A69A] mt-2">{hint}</p>}
    </div>
  );
}
