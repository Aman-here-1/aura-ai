export interface UploadResponse {
  rows: number;
  columns: number;
  headers: string[];

  intelligence: Record<string, any>;

  kpis: Record<string, any>;

  recommended_charts: any[];

  preview: Record<string, any>[];
}