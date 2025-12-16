import "./globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Issue Tracker",
  description: "Issue & Feedback Tracking System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Page Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* 🌍 GLOBAL FOOTER */}
        <Footer />
      </body>
    </html>
  );
}
