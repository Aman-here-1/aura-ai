import * as XLSX from "xlsx";

export async function readExcel(file: File) {
  const buffer = await file.arrayBuffer();

  const workbook = XLSX.read(buffer);

  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

  return {
    headers: rows.length ? Object.keys(rows[0]) : [],
    rows,
  };
}