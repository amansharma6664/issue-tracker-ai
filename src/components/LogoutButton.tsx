"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={logout}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium
        border rounded-lg text-gray-700 bg-white
        hover:bg-gray-100 hover:text-black
        transition disabled:opacity-60"
    >
      <LogOut size={16} />
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
