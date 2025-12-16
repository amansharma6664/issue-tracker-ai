"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Invalid email or password");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 relative">
      {/* 🔝 Top button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-sm border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
      </div>

      {/* Left branding */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-black to-gray-800 text-white p-10">
        <h1 className="text-4xl font-bold mb-4">Issue Tracker</h1>
        <p className="text-gray-300 max-w-sm text-center">
          Securely report, manage, and track issues with AI-powered summaries.
        </p>
      </div>

      {/* Login Card */}
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 rounded-2xl shadow-xl border bg-white"
        >
          <h2 className="text-3xl font-semibold mb-2">Welcome back</h2>
          <p className="text-gray-500 mb-6">Login to your account</p>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <div className="mb-4 relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email address"
              required
              className="pl-10 w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="mb-6 relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              required
              className="pl-10 w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-900 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-black hover:underline"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
