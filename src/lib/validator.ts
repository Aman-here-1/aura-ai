import { ValidationResult } from '../types/dataset';

export function validateDataset(
  rows: Record<string, unknown>[]
): ValidationResult {
  if (!rows.length) {
    return {
      totalRows: 0,
      totalColumns: 0,
      missingValues: 0,
      duplicateRows: 0,
      emptyColumns: [],
      numericColumns: [],
      dateColumns: [],
      suggestedMeasures: [],
      suggestedDimensions: [],
      healthScore: 0,
    };
  }

  const headers = Object.keys(rows[0]);

  let missingValues = 0;

  const numericColumns: string[] = [];
  const dateColumns: string[] = [];
  const emptyColumns: string[] = [];

  headers.forEach((header) => {
    const values = rows.map((r) => r[header]);

    const empty = values.filter(
      (v) => v === "" || v == null
    ).length;

    missingValues += empty;

    if (empty === rows.length) {
      emptyColumns.push(header);
    }

    const numericCount = values.filter(
      (v) => typeof v === "number"
    ).length;

    if (numericCount > rows.length * 0.7) {
      numericColumns.push(header);
    }

    const dateCount = values.filter((v) => {
      if (typeof v !== "string") return false;
      return !Number.isNaN(Date.parse(v));
    }).length;

    if (dateCount > rows.length * 0.7) {
      dateColumns.push(header);
    }
  });

  const duplicateRows =
    rows.length -
    new Set(rows.map((r) => JSON.stringify(r))).size;

  const suggestedMeasures = numericColumns.filter((c) =>
    /(sales|revenue|profit|amount|price|cost|order|quantity)/i.test(c)
  );

  const suggestedDimensions = headers.filter((c) =>
    /(city|state|country|category|product|region|customer)/i.test(c)
  );

  let healthScore = 100;

  healthScore -= Math.min(missingValues * 0.1, 25);
  healthScore -= Math.min(duplicateRows * 2, 15);
  healthScore -= emptyColumns.length * 5;

  return {
    totalRows: rows.length,
    totalColumns: headers.length,
    missingValues,
    duplicateRows,
    emptyColumns,
    numericColumns,
    dateColumns,
    suggestedMeasures,
    suggestedDimensions,
    healthScore: Math.max(Math.round(healthScore), 0),
  };
}