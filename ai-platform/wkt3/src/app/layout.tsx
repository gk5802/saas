import type { Metadata } from "next";
import "./globals.css";
import "./globals.css";
import "/styles/themes.css";


export const metadata: Metadata = {
  title: "WKT3 - Global Trading & Gaming",
  description: "AI powered trading and multi-game fantasy platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="theme-theme4 dark">
      <body className="bg-white text-black dark:bg-black dark:text-white transition-all">
        <header className="p-4 bg-[var(--primary-color)] text-white text-xl font-bold">
          Wkt3 Global Platform
        </header>
        <main className="min-h-screen p-4">{children}</main>
        <footer className="p-4 text-center text-sm opacity-70">
          &copy; {new Date().getFullYear()} Wkt3.com
        </footer>
      </body>
    </html>
  );
}
