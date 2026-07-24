import { motion } from "motion/react";
import { Pencil, Trash2 } from "lucide-react";

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
}

export default function AdminTable<T extends { id: number | string }>({
  columns,
  data,
  onEdit,
  onDelete,
  readOnly = false,
}: AdminTableProps<T>) {
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
              data.map((row, i) => (
                <motion.tr
                  key={row.id}
                  className="border-b admin-table-row transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4">
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[col.key] ?? "")}
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
    </motion.div>
  );
}
