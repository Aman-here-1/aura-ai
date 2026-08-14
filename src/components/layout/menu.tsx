import {
  BarChart3,
  Bot,
  ChartNoAxesCombined,
  FileBarChart,
  FolderKanban,
  LayoutDashboard,
  MessageSquare,
  Settings,
  UserCircle,
  Upload,
} from "lucide-react";

export const menu = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Upload Dataset",
    href: "/upload",
    icon: Upload,
  },
  {
    title: "AI Analyst",
    href: "/analysis",
    icon: Bot,
  },
  {
    title: "AI Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileBarChart,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: UserCircle,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];