import { Bell } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 border-b bg-white px-8 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">
          Dashboard
        </h2>
        <p className="text-sm text-slate-500">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-5">
        <Bell className="cursor-pointer" size={20} />

        <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          A
        </div>
      </div>
    </header>
  );
}