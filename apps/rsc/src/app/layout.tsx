import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RSC - React Server Components",
  description: "Demo de React Server Components usando Next.js App Router",
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
