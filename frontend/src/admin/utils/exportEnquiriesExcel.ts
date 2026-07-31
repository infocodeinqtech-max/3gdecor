import * as XLSX from "xlsx";

export type EnquiryExportRow = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  status?: string;
  date?: string;
};

export function downloadEnquiriesExcel(
  rows: EnquiryExportRow[],
  filename = "enquiries.xlsx",
): void {
  const sheetRows = rows.map((r, index) => ({
    "#": index + 1,
    Name: r.name || "",
    Email: r.email || "",
    Phone: r.phone || "",
    Service: r.service || "",
    Status: r.status || "New",
    Date: r.date || "",
    Message: r.message || "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(sheetRows);
  worksheet["!cols"] = [
    { wch: 5 },
    { wch: 22 },
    { wch: 28 },
    { wch: 14 },
    { wch: 22 },
    { wch: 12 },
    { wch: 12 },
    { wch: 50 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");
  XLSX.writeFile(workbook, filename);
}
