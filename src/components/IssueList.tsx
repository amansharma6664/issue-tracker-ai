"use client";

import { useEffect, useState } from "react";

 type Issue = {
  _id: string;
  title: string;
  description: string;
};

export default function IssueList() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchIssues = async () => {
    const res = await fetch("/api/issues", { credentials: "include" });
    const data = await res.json();
    setIssues(data);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const startEdit = (issue: Issue) => {
    setEditingId(issue._id);
    setTitle(issue.title);
    setDescription(issue.description);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
  };

  const saveEdit = async (id: string) => {
    const res = await fetch(`/api/issues/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (!res.ok) return alert("Update failed");

    cancelEdit();
    fetchIssues();
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    const res = await fetch(`/api/issues/${deleteId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) return alert("Delete failed");

    setDeleteId(null);
    fetchIssues();
  };

  return (
    <div className="mt-6 space-y-4">
      {issues.length === 0 && (
        <p className="text-gray-500">No issues yet</p>
      )}

      {issues.map((issue) => (
        <div
          key={issue._id}
          className="border rounded-xl p-4 shadow-sm bg-white"
        >
          {editingId === issue._id ? (
            <>
              <input
                className="w-full border rounded-lg p-2 mb-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                className="w-full border rounded-lg p-2 mb-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="flex gap-2">
                <button
                  onClick={() => saveEdit(issue._id)}
                  className="px-4 py-1.5 rounded-lg bg-black text-white"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-4 py-1.5 rounded-lg bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="font-semibold text-lg">{issue.title}</h3>
              <p className="text-gray-600 text-sm mt-1">
                {issue.description}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => startEdit(issue)}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteId(issue._id)}
                  className="text-sm font-medium text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-xl font-semibold mb-2">Delete Issue</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this issue? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

