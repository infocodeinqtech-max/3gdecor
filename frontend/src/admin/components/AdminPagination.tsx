import { ChevronLeft, ChevronRight } from "lucide-react";

export type AdminPaginationProps = {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  /** Optional class on the outer wrapper */
  className?: string;
};

export function getTotalPages(totalItems: number, pageSize: number): number {
  return Math.max(1, Math.ceil(Math.max(0, totalItems) / Math.max(1, pageSize)));
}

export function paginateItems<T>(
  items: T[],
  page: number,
  pageSize: number,
): T[] {
  const start = (Math.max(1, page) - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

/** Build a compact page list: 1 … 4 5 6 … 20 */
function pageWindow(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>();
  pages.add(1);
  pages.add(total);
  for (let p = current - 1; p <= current + 1; p += 1) {
    if (p >= 1 && p <= total) pages.add(p);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const out: (number | "ellipsis")[] = [];
  for (let i = 0; i < sorted.length; i += 1) {
    const n = sorted[i];
    if (i > 0 && n - sorted[i - 1] > 1) out.push("ellipsis");
    out.push(n);
  }
  return out;
}

export default function AdminPagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
  className = "",
}: AdminPaginationProps) {
  const totalPages = getTotalPages(totalItems, pageSize);

  if (totalItems <= pageSize) return null;

  const safePage = Math.min(Math.max(1, page), totalPages);
  const from = (safePage - 1) * pageSize + 1;
  const to = Math.min(safePage * pageSize, totalItems);
  const window = pageWindow(safePage, totalPages);

  return (
    <div
      className={`admin-pagination mt-4 mx-2 mb-2 rounded-xl border border-[#E8DFD2] bg-[#F3EEE6] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ${className}`}
    >
      <p className="text-center text-xs sm:text-sm text-[#8A8177] mb-3">
        Showing{" "}
        <span className="font-medium text-[#332C26]">
          {from}–{to}
        </span>{" "}
        of <span className="font-medium text-[#332C26]">{totalItems}</span>
      </p>

      <nav
        className="flex items-center justify-center gap-1.5 flex-wrap"
        aria-label="Pagination"
      >
        <button
          type="button"
          disabled={safePage <= 1}
          onClick={() => onPageChange(safePage - 1)}
          className="admin-pagination-btn"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {window.map((item, idx) =>
          item === "ellipsis" ? (
            <span
              key={`e-${idx}`}
              className="px-1.5 text-[#8A8177] text-sm select-none"
            >
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              aria-current={item === safePage ? "page" : undefined}
              className={
                item === safePage
                  ? "admin-pagination-btn admin-pagination-btn--active"
                  : "admin-pagination-btn"
              }
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          disabled={safePage >= totalPages}
          onClick={() => onPageChange(safePage + 1)}
          className="admin-pagination-btn"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
}
