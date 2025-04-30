import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SSR - Server-Side Rendering con Streaming",
  description: "Demo de Server-Side Rendering con Streaming usando Next.js",
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
