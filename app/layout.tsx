import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WAKE — A Story in Digital Fragments",
  description:
    "A frontend interactive experience turning a dataset of digital-life fragments (music, searches, places, notes, purchases) into a connected, discoverable story.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-[#090514] text-neutral-100 selection:bg-violet-500/40 selection:text-white">
        {children}
      </body>
    </html>
  );
}
