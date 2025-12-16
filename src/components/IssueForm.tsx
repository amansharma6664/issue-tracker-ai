"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function IssueForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const submitIssue = async () => {
    if (!title || !description) {
      alert("Title and description required");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Issue not created");
      return;
    }

    setTitle("");
    setDescription("");
    window.location.reload();
  };

  return (
    <div className="bg-gray-50 border rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <PlusCircle size={20} className="text-gray-700" />
        <h2 className="text-lg font-semibold text-gray-800">
          Create New Issue
        </h2>
      </div>

      <div className="space-y-3">
        <input
          className="w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Issue title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border rounded-lg p-2.5 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Describe the issue in detail"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end">
          <button
            onClick={submitIssue}
            disabled={loading}
            className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg hover:bg-gray-900 transition disabled:opacity-60"
          >
            <PlusCircle size={18} />
            {loading ? "Adding..." : "Add Issue"}
          </button>
        </div>
      </div>
    </div>
  );
}
