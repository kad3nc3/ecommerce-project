import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Everyday Goods | Store Template", description: "A simple ecommerce starter template." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
