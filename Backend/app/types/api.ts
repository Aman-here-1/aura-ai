export interface KPI {
    title: string;
    value: number | string;
    description: string;
}

export interface RecommendedChart {
    chart: string;
    x_axis: string;
    y_axis: string;
}

export interface DatasetResponse {
    rows: number;
    columns: number;
    headers: string[];

    intelligence: {
        dataset_type: string;
        confidence: number;
    };

    kpis: KPI[];

    recommended_charts: RecommendedChart[];

    preview: Record<string, any>[];
}