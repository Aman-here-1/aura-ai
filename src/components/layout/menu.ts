import {
  LayoutDashboard,
  Upload,
  Sparkles,
  FileText,
  Settings,
} from "lucide-react";

export const menu = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Upload",
    href: "/upload",
    icon: Upload,
  },
  {
    title: "Analysis",
    href: "/analysis",
    icon: Sparkles,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];