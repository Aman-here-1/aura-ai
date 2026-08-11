"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  User,
  Mail,
  Lock,
  Building2,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
} from "lucide-react";

import { signup } from "../../services/auth";

export default function SignupPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    company: "",
  });

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await signup(form);

      router.push("/login");
    } catch (err: any) {
      console.log("Signup Error:", err?.response?.data);

      const detail = err?.response?.data?.detail;

      let message = "Unable to create account.";

      if (typeof detail === "string") {
        message = detail;
      } else if (Array.isArray(detail)) {
        message = detail
          .map((item: any) => item.msg)
          .join(", ");
      } else if (
        detail &&
        typeof detail === "object"
      ) {
        message =
          detail.msg ??
          JSON.stringify(detail);
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 py-10">

      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/30 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-600/30 blur-[140px]" />

      <div className="relative w-full max-w-xl rounded-[32px] border border-white/10 bg-white/10 p-10 shadow-2xl backdrop-blur-2xl">

        <div className="mb-10 text-center">

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl">
            <Sparkles
              size={36}
              className="text-white"
            />
          </div>

          <h1 className="text-5xl font-bold text-white">
            Aura AI
          </h1>

          <p className="mt-3 text-lg text-blue-100">
            Create your workspace 🚀
          </p>

          <p className="mt-2 text-sm text-blue-200">
            AI Business Analyst Platform
          </p>

        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-red-200">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Full Name */}

          <div>

            <label className="mb-2 block font-medium text-white">
              Full Name
            </label>

            <div className="relative">

              <User
                className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-200"
                size={20}
              />

              <input
                type="text"
                required
                value={form.full_name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    full_name: e.target.value,
                  })
                }
                placeholder="Aman Chouhan"
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/10 pl-14 pr-5 text-white placeholder:text-blue-200 outline-none focus:border-blue-400"
              />

            </div>

          </div>

          {/* Email */}

          <div>

            <label className="mb-2 block font-medium text-white">
              Email
            </label>

            <div className="relative">

              <Mail
                className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-200"
                size={20}
              />

              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                placeholder="you@example.com"
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/10 pl-14 pr-5 text-white placeholder:text-blue-200 outline-none focus:border-blue-400"
              />

            </div>

          </div>

          {/* Company */}

          <div>

            <label className="mb-2 block font-medium text-white">
              Company
            </label>

            <div className="relative">

              <Building2
                className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-200"
                size={20}
              />

              <input
                type="text"
                value={form.company}
                onChange={(e) =>
                  setForm({
                    ...form,
                    company: e.target.value,
                  })
                }
                placeholder="Aura AI"
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/10 pl-14 pr-5 text-white placeholder:text-blue-200 outline-none focus:border-blue-400"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="mb-2 block font-medium text-white">
              Password
            </label>

            <div className="relative">

              <Lock
                className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-200"
                size={20}
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                required
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                placeholder="Minimum 8 characters"
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/10 pl-14 pr-14 text-white placeholder:text-blue-200 outline-none focus:border-blue-400"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-200"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-lg font-semibold text-white shadow-xl transition hover:scale-[1.02] disabled:opacity-70"
          >
            {loading ? (
              <Loader2
                className="animate-spin"
                size={22}
              />
            ) : (
              "Create Workspace"
            )}
          </button>

        </form>

        <div className="mt-8 text-center text-blue-100">

          Already have an account?{" "}

          <Link
            href="/login"
            className="font-semibold text-white hover:text-blue-200"
          >
            Login
          </Link>

        </div>

      </div>

    </main>
  );
}