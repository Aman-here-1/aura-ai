import { ReactNode } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({
  children,
}: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-slate-50">

      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">

        <Navbar />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1700px] px-6 py-6 lg:px-8">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}