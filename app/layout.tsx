import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = { title: "luma/store — Small things, better living", description: "A considered collection of tactile objects for everyday rituals." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" /></body></html>;
}
