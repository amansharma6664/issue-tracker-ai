"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Failed to create account");
      return;
    }

    // ✅ REGISTER → LOGIN
    router.push("/login");
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
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
          Create your account and start managing issues with AI-powered
          insights.
        </p>
      </div>

      {/* Register Card */}
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 rounded-2xl shadow-xl border"
        >
          <h2 className="text-3xl font-semibold mb-2">Create your account</h2>
          <p className="text-gray-500 mb-6">
            Get started in just a few seconds
          </p>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <div className="mb-4 relative">
            <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Full name"
              required
              className="pl-10 w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

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
              placeholder="Create password"
              required
              className="pl-10 w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-900 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-black hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
