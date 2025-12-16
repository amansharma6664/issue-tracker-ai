"use client";

import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 py-6 px-4 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
    
    {/* Left: Name */}
      <p className="text-gray-700 dark:text-gray-300 font-medium">
        © 2025 Aman Kumar Sharma
      </p>

      {/* Right: Social Links */}
      <div className="flex items-center gap-4">
        <Link
          href="https://github.com/amansharma6664"
          target="_blank"
          className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
        >
          <Github size={18} />
          GitHub
        </Link>

        <Link
          href="https://www.linkedin.com/in/aman-kumar-sharma-876250212/"
          target="_blank"
          className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
        >
          <Linkedin size={18} />
          LinkedIn
        </Link>
      </div>
    </footer>
  );
}
