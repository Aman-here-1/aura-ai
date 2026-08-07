import {
  LayoutDashboard,
  Upload,
  Sparkles,
  FileText,
  MessageSquareText,
  BarChart3,
  FolderKanban,
  UserCircle,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface MenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const menu: MenuItem[] = [
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
    icon: Sparkles,
  },
  {
    title: "AI Chat",
    href: "/chat",
    icon: MessageSquareText,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
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