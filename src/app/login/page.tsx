"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
} from "lucide-react";

import { login } from "../../services/auth";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await login(form);

      router.push("/");
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ??
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6">

      {/* Background Blur */}

      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/30 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-600/30 blur-[140px]" />

      {/* Card */}

      <div className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-10 shadow-2xl backdrop-blur-2xl">

        {/* Logo */}

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
            Welcome back 👋
          </p>

          <p className="mt-2 text-sm text-blue-200">
            Login to your AI Business Analyst Workspace
          </p>

        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Email */}

          <div>

            <label className="mb-3 block text-sm font-semibold text-white">
              Email Address
            </label>

            <div className="relative">

              <Mail
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-200"
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
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/10 pl-14 pr-5 text-white placeholder:text-blue-200 outline-none transition focus:border-blue-400 focus:bg-white/15"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="mb-3 block text-sm font-semibold text-white">
              Password
            </label>

            <div className="relative">

              <Lock
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-200"
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
                placeholder="••••••••"
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/10 pl-14 pr-14 text-white placeholder:text-blue-200 outline-none transition focus:border-blue-400 focus:bg-white/15"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* Remember */}

          <div className="flex items-center justify-between text-sm">

            <label className="flex items-center gap-2 text-blue-100">

              <input
                type="checkbox"
                className="rounded"
              />

              Remember Me

            </label>

            <button
              type="button"
              className="font-medium text-blue-300 hover:text-white"
            >
              Forgot Password?
            </button>

          </div>

          {/* Login */}

          <button
            type="submit"
            disabled={loading}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-lg font-semibold text-white shadow-xl transition hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? (
              <Loader2
                size={22}
                className="animate-spin"
              />
            ) : (
              "Login to Aura AI"
            )}
          </button>

        </form>

        <div className="mt-8 text-center text-sm text-blue-100">

          Don't have an account?{" "}

          <Link
            href="/signup"
            className="font-semibold text-white hover:text-blue-200"
          >
            Create Account
          </Link>

        </div>

      </div>

    </main>
  );
}