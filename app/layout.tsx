import type { Metadata } from "next";
import { BrandCursor } from "./BrandCursor";
import "./globals.css";

export const metadata: Metadata = { title: "archives — Small things, better living", description: "A considered collection of tactile objects for everyday rituals.", icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/favicon.svg" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><BrandCursor />{children}</body></html>;
}
