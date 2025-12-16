import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">
        Issue & Feedback Tracker
      </h1>

      <p className="mb-6 text-gray-600">
        Report, track, and manage student issues securely
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-6 py-2 bg-black text-white rounded"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="px-6 py-2 border border-black rounded"
        >
          Register
        </Link>
      </div>
    </main>
  );
}
