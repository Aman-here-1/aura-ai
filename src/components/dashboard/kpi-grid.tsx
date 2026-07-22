"use client";

import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Wallet,
} from "lucide-react";

import KpiCard from "./kpi-card";
import { useDatasetStore } from "../../store/dataset-store";

export default function KpiGrid() {
  const { dataset } = useDatasetStore();

  const kpis = dataset?.kpis;

  const formatCurrency = (value?: number) => {
    if (value == null) return "₹0";

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        title="Revenue"
        value={formatCurrency(kpis?.total_revenue)}
        change="Live Data"
        icon={DollarSign}
      />

      <KpiCard
        title="Orders"
        value={(kpis?.total_records ?? 0).toString()}
        change="Live Data"
        icon={ShoppingCart}
      />

      <KpiCard
        title="Average Order"
        value={formatCurrency(kpis?.average_order_value)}
        change="Live Data"
        icon={Wallet}
      />

      <KpiCard
        title="Top Region"
        value={kpis?.top_region ?? "-"}
        change="Live Data"
        icon={TrendingUp}
      />
    </section>
  );
}