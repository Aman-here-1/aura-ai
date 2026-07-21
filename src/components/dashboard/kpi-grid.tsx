import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Wallet,
} from "lucide-react";

import KpiCard from "./kpi-card";

export default function KpiGrid() {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        title="Revenue"
        value="₹12.8L"
        change="+18.2%"
        icon={DollarSign}
      />

      <KpiCard
        title="Orders"
        value="1,248"
        change="+11.4%"
        icon={ShoppingCart}
      />

      <KpiCard
        title="Profit"
        value="₹3.6L"
        change="+8.9%"
        icon={Wallet}
      />

      <KpiCard
        title="Growth"
        value="31%"
        change="+4.1%"
        icon={TrendingUp}
      />
    </section>
  );
}