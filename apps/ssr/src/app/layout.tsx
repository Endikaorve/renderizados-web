import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SSR - Server Side Rendering",
  description: "Demo de Server Side Rendering usando Next.js App Router",
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
