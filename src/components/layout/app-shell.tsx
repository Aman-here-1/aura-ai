import { ReactNode } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

interface Props {
  children: ReactNode;
}

export default function AppShell({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}