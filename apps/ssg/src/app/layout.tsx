import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SSG - Static Site Generation con Next.js",
  description: "Demostración de Static Site Generation con Next.js App Router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">
              Demo: Static Site Generation (SSG)
            </h1>
            <p className="text-sm mt-1">
              Generación Estática con Next.js App Router - Las páginas se
              generan durante el build
            </p>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
