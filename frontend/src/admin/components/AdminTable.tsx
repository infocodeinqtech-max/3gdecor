import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Pencil, Trash2 } from "lucide-react";
import AdminPagination, {
  getTotalPages,
  paginateItems,
} from "./AdminPagination";

export interface TableColumn<T> {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface AdminTableProps<T extends { id: number | string }> {
  columns: TableColumn<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  readOnly?: boolean;
  /** Rows per page. Set 0 to disable pagination. Default 10. */
  pageSize?: number;
}

export default function AdminTable<T extends { id: number | string }>({
  columns,
  data,
  onEdit,
  onDelete,
  readOnly = false,
  pageSize = 10,
}: AdminTableProps<T>) {
  const [page, setPage] = useState(1);
  const paginationEnabled = pageSize > 0;

  const totalPages = paginationEnabled
    ? getTotalPages(data.length, pageSize)
    : 1;

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages, data.length]);

  const pageRows = useMemo(() => {
    if (!paginationEnabled) return data;
    return paginateItems(data, page, pageSize);
  }, [data, page, pageSize, paginationEnabled]);

  return (
    <motion.div
      className="rounded-2xl overflow-hidden admin-table-wrap"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-[#332C26]">
          <thead>
            <tr className="border-b admin-table-head">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-6 py-4 font-medium uppercase tracking-wider text-xs"
                >
                  {col.label}
                </th>
              ))}
              {!readOnly && (onEdit || onDelete) && (
                <th className="px-6 py-4 text-right text-[#8A8177] uppercase tracking-wider text-xs">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-12 text-center admin-card-muted"
                >
                  No records yet. Click &quot;Add New&quot; to create one.
                </td>
              </tr>
            ) : (
              pageRows.map((row, i) => (
                <motion.tr
                  key={row.id}
                  className="border-b admin-table-row transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4">
                      {col.render
                        ? col.render(row)
                        : String(
                            (row as Record<string, unknown>)[col.key] ?? "",
                          )}
                    </td>
                  ))}
                  {!readOnly && (onEdit || onDelete) && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {onEdit && (
                          <button
                            type="button"
                            onClick={() => onEdit(row)}
                            className="p-2 rounded-lg hover:bg-amber-50 text-[#8a5a12]"
                            aria-label="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            type="button"
                            onClick={() => onDelete(row)}
                            className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                            aria-label="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {paginationEnabled && data.length > 0 && (
        <AdminPagination
          page={page}
          pageSize={pageSize}
          totalItems={data.length}
          onPageChange={setPage}
        />
      )}
    </motion.div>
  );
}
