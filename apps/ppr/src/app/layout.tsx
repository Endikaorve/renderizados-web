import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PPR - Partial Prerendering con Next.js",
  description: "Demostración de Partial Prerendering con Next.js App Router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
