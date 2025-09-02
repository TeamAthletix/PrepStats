import Papa from "papaparse";

export function parseSchoolsCSV(csvString: string) {
  const result = Papa.parse(csvString, { header: true });
  return result.data as Array<Record<string, string>>;
}