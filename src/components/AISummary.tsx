"use client";

import { useState } from "react";

export default function AISummary() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateSummary = async () => {
    if (!text.trim()) {
      setError("Please enter some text to summarize");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const res = await fetch("/api/ai/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok || !data.summary) {
        throw new Error("AI failed");
      }

      setSummary(data.summary);
    } catch (err) {
      setError("AI service temporarily unavailable");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setText("");
    setSummary("");
    setError("");
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">AI Issue Summary</h2>

        {(text || summary) && (
          <button
            onClick={clearAll}
            className="text-sm text-gray-500 hover:text-black underline"
          >
            Clear
          </button>
        )}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste issue description here..."
        className="w-full border rounded-lg p-3 min-h-[120px] focus:ring-2 focus:ring-purple-600 outline-none"
      />

      {error && (
        <p className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </p>
      )}

      <button
        onClick={generateSummary}
        disabled={loading}
        className="mt-4 w-full bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700 transition disabled:opacity-60"
      >
        {loading ? "Generating..." : "Generate AI Summary"}
      </button>

      {summary && (
        <div className="mt-5 bg-gray-50 border rounded-lg p-4">
          <h3 className="font-medium mb-1">Summary</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            {summary}
          </p>
        </div>
      )}
    </div>
  );
}
