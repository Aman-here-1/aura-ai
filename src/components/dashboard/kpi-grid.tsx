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
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  };

  const cards = [
    {
      title: "Revenue",
      value: formatCurrency(kpis?.total_revenue),
      change: dataset ? "Live Data" : "--",
      subtitle: "Total Revenue",
      icon: DollarSign,
      color: "emerald" as const,
    },
    {
      title: "Orders",
      value: (kpis?.total_records ?? 0).toLocaleString(),
      change: dataset ? "Live Data" : "--",
      subtitle: "Total Orders",
      icon: ShoppingCart,
      color: "blue" as const,
    },
    {
      title: "Avg Order",
      value: formatCurrency(kpis?.average_order_value),
      change: dataset ? "Live Data" : "--",
      subtitle: "Average Value",
      icon: Wallet,
      color: "violet" as const,
    },
    {
      title: "Top Region",
      value: kpis?.top_region ?? "--",
      change: dataset ? "Detected" : "--",
      subtitle: "Highest Sales",
      icon: TrendingUp,
      color: "orange" as const,
    },
  ];

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <KpiCard
          key={card.title}
          title={card.title}
          value={card.value}
          change={card.change}
          subtitle={card.subtitle}
          icon={card.icon}
          color={card.color}
        />
      ))}
    </section>
  );
}