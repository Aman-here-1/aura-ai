import {
  Download,
  FileSpreadsheet,
  Sparkles,
  Upload,
} from "lucide-react";

const actions = [
  {
    title: "Upload CSV",
    icon: Upload,
  },
  {
    title: "Generate Report",
    icon: FileSpreadsheet,
  },
  {
    title: "Ask Aura AI",
    icon: Sparkles,
  },
  {
    title: "Export PDF",
    icon: Download,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 p-6 transition-all duration-200 hover:border-blue-500 hover:bg-blue-50"
            >
              <Icon
                className="mb-3 text-blue-600"
                size={28}
              />

              <span className="text-sm font-medium">
                {action.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}