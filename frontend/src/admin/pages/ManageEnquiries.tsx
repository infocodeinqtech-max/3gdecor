import { useEffect, useMemo, useState } from "react";
import {
  Pencil,
  Trash2,
  Mail,
  RefreshCw,
  Search,
  Download,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  deleteListItem,
  getListContent,
  updateListItem,
} from "../utils/contentStorage";
import { subscribeCmsUpdated } from "../../content/cmsSync";
import AdminPagination, {
  getTotalPages,
  paginateItems,
} from "../components/AdminPagination";
import { downloadEnquiriesExcel } from "../utils/exportEnquiriesExcel";
import { toAdminErrorMessage } from "../../utils/publicError";

type EnquiryRow = {
  id: string | number;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  status?: string;
  date?: string;
};

const STATUS_OPTIONS = ["New", "In Review", "Closed"] as const;
const PAGE_SIZE = 10;

function normalizeStatus(status?: string): string {
  return (status || "New").trim();
}

function rowMatchesDateRange(
  date: string | undefined,
  from: string,
  to: string,
): boolean {
  if (!from && !to) return true;
  if (!date) return false;
  // Expect YYYY-MM-DD; allow partial compare
  const d = date.slice(0, 10);
  if (from && d < from) return false;
  if (to && d > to) return false;
  return true;
}

export default function ManageEnquiries() {
  const [rows, setRows] = useState<EnquiryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<EnquiryRow | null>(null);
  const [status, setStatus] = useState("New");
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterService, setFilterService] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await getListContent<EnquiryRow>("enquiries", []);
      setRows(Array.isArray(data) ? data : []);
      setPage(1);
    } catch (err) {
      toast.error(toAdminErrorMessage(err));
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    return subscribeCmsUpdated(load);
  }, []);

  const serviceOptions = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => {
      const s = (r.service || "").trim();
      if (s) set.add(s);
    });
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [rows]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();

    return rows.filter((row) => {
      if (filterStatus !== "all") {
        if (normalizeStatus(row.status) !== filterStatus) return false;
      }
      if (filterService !== "all") {
        if ((row.service || "").trim() !== filterService) return false;
      }
      if (!rowMatchesDateRange(row.date, dateFrom, dateTo)) return false;

      if (!q) return true;
      const hay = [
        row.name,
        row.email,
        row.phone,
        row.service,
        row.message,
        row.status,
        row.date,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [rows, search, filterStatus, filterService, dateFrom, dateTo]);

  const totalPages = getTotalPages(filteredRows.length, PAGE_SIZE);
  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages, filteredRows.length]);

  useEffect(() => {
    setPage(1);
  }, [search, filterStatus, filterService, dateFrom, dateTo]);

  const pageRows = useMemo(
    () => paginateItems(filteredRows, page, PAGE_SIZE),
    [filteredRows, page],
  );

  const hasActiveFilters =
    search.trim() !== "" ||
    filterStatus !== "all" ||
    filterService !== "all" ||
    dateFrom !== "" ||
    dateTo !== "";

  const clearFilters = () => {
    setSearch("");
    setFilterStatus("all");
    setFilterService("all");
    setDateFrom("");
    setDateTo("");
  };

  const handleDownloadExcel = () => {
    if (filteredRows.length === 0) {
      toast.error("No enquiries match the current filters");
      return;
    }
    const stamp = new Date().toISOString().slice(0, 10);
    downloadEnquiriesExcel(filteredRows, `enquiries-${stamp}.xlsx`);
    toast.success(`Downloaded ${filteredRows.length} enquir${filteredRows.length === 1 ? "y" : "ies"}`);
  };

  const openEdit = (row: EnquiryRow) => {
    setSelected(row);
    setStatus(normalizeStatus(row.status));
  };

  const handleSaveStatus = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const updated = await updateListItem("enquiries", selected.id, { status });
      setRows((prev) =>
        prev.map((r) =>
          r.id === selected.id ? { ...r, ...updated, status } : r,
        ),
      );
      toast.success("Enquiry status updated");
      setSelected(null);
    } catch (err) {
      toast.error(toAdminErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (row: EnquiryRow) => {
    if (!confirm(`Delete enquiry from ${row.name}?`)) return;
    try {
      await deleteListItem("enquiries", row.id);
      setRows((prev) => prev.filter((r) => r.id !== row.id));
      toast.success("Enquiry removed");
    } catch (err) {
      toast.error(toAdminErrorMessage(err));
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold admin-page-title">Enquiries</h1>
          <p className="text-sm admin-card-muted mt-1">
            Contact form submissions from the website.
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E0D5C8] text-sm text-[#332C26] hover:bg-[#FAF7F2]"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Search + filters + Excel */}
      <div className="admin-card rounded-2xl p-4 sm:p-5 mb-5 space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8177]" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone, service, message…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl admin-input text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs mb-1.5 text-[#8A8177] font-medium">
              Date from
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl admin-input text-sm"
            />
          </div>
          <div>
            <label className="block text-xs mb-1.5 text-[#8A8177] font-medium">
              Date to
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl admin-input text-sm"
            />
          </div>
          <div>
            <label className="block text-xs mb-1.5 text-[#8A8177] font-medium">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl admin-input text-sm"
            >
              <option value="all">All statuses</option>
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1.5 text-[#8A8177] font-medium">
              Service
            </label>
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl admin-input text-sm"
            >
              <option value="all">All services</option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <p className="text-xs text-[#8A8177]">
            Showing{" "}
            <span className="font-medium text-[#332C26]">
              {filteredRows.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-[#332C26]">{rows.length}</span>{" "}
            enquiries
            {hasActiveFilters ? " (filtered)" : ""}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#E0D5C8] text-sm text-[#6E655C] hover:bg-[#FAF7F2]"
              >
                <X className="w-4 h-4" />
                Clear filters
              </button>
            )}
            <button
              type="button"
              onClick={handleDownloadExcel}
              disabled={filteredRows.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl admin-btn-gold text-sm font-medium disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              Download Excel
            </button>
          </div>
        </div>
      </div>

      <div className="admin-card rounded-2xl overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm text-[#8A8177]">Loading enquiries…</p>
        ) : rows.length === 0 ? (
          <div className="p-10 text-center">
            <Mail className="w-10 h-10 text-[#C4B8A8] mx-auto mb-3" />
            <p className="text-[#6E655C]">No enquiries yet.</p>
            <p className="text-sm text-[#8A8177] mt-1">
              Submissions from the Contact page will appear here.
            </p>
          </div>
        ) : filteredRows.length === 0 ? (
          <div className="p-10 text-center">
            <Search className="w-10 h-10 text-[#C4B8A8] mx-auto mb-3" />
            <p className="text-[#6E655C]">No matching enquiries</p>
            <p className="text-sm text-[#8A8177] mt-1">
              Try changing search or filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 text-sm text-[#C4973B] hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-[#332C26]">
                <thead>
                  <tr className="border-b admin-table-head">
                    {[
                      "Name",
                      "Email",
                      "Phone",
                      "Service",
                      "Status",
                      "Date",
                      "",
                    ].map((h) => (
                      <th
                        key={h || "actions"}
                        className="text-left px-5 py-3 font-medium uppercase tracking-wider text-xs text-[#8A8177]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((row) => (
                    <tr key={row.id} className="border-b admin-table-row">
                      <td className="px-5 py-4 font-medium">{row.name}</td>
                      <td className="px-5 py-4">{row.email}</td>
                      <td className="px-5 py-4">{row.phone || "—"}</td>
                      <td className="px-5 py-4">{row.service || "—"}</td>
                      <td className="px-5 py-4">
                        <span className="text-[#C4973B]">
                          {normalizeStatus(row.status)}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        {row.date || "—"}
                      </td>
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => openEdit(row)}
                          className="p-2 rounded-lg hover:bg-amber-50 text-[#8a5a12]"
                          aria-label="View"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(row)}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <AdminPagination
              page={page}
              pageSize={PAGE_SIZE}
              totalItems={filteredRows.length}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center admin-modal-overlay p-4">
          <div className="w-full max-w-lg p-8 rounded-2xl admin-card space-y-4">
            <h2 className="text-xl font-semibold text-[#2A211C]">
              Enquiry details
            </h2>
            <div className="space-y-2 text-sm text-[#332C26]">
              <p>
                <span className="text-[#8A8177]">Name:</span> {selected.name}
              </p>
              <p>
                <span className="text-[#8A8177]">Email:</span> {selected.email}
              </p>
              <p>
                <span className="text-[#8A8177]">Phone:</span>{" "}
                {selected.phone || "—"}
              </p>
              <p>
                <span className="text-[#8A8177]">Service:</span>{" "}
                {selected.service || "—"}
              </p>
              <p>
                <span className="text-[#8A8177]">Date:</span>{" "}
                {selected.date || "—"}
              </p>
              <div>
                <p className="text-[#8A8177] mb-1">Message:</p>
                <p className="rounded-xl bg-[#FAF7F2] p-3 leading-relaxed">
                  {selected.message || "—"}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1 text-[#6E655C]">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg admin-input"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#E0D5C8]"
              >
                Close
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={handleSaveStatus}
                className="flex-1 py-2.5 rounded-xl admin-btn-gold disabled:opacity-60"
              >
                {saving ? "Saving…" : "Update status"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
