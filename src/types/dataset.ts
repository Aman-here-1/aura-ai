export interface ValidationResult {
  totalRows: number;
  totalColumns: number;
  missingValues: number;
  duplicateRows: number;
  emptyColumns: string[];
  numericColumns: string[];
  dateColumns: string[];
  suggestedMeasures: string[];
  suggestedDimensions: string[];
  healthScore: number;
}