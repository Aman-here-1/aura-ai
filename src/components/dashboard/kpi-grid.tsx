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

  const cards = [
    {
      title: "Revenue",
      value: formatCurrency(kpis?.total_revenue),
      change: "+18.4%",
      subtitle: "vs last month",
      icon: DollarSign,
      color: "emerald",
    },
    {
      title: "Orders",
      value: (kpis?.total_records ?? 0).toLocaleString(),
      change: "+12.8%",
      subtitle: "vs yesterday",
      icon: ShoppingCart,
      color: "blue",
    },
    {
      title: "Average Order",
      value: formatCurrency(kpis?.average_order_value),
      change: "+6.2%",
      subtitle: "average value",
      icon: Wallet,
      color: "violet",
    },
    {
      title: "Top Region",
      value: kpis?.top_region ?? "--",
      change: "Top Performer",
      subtitle: "highest revenue",
      icon: TrendingUp,
      color: "orange",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-4">
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