"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Detecta si estamos en admin
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="es">
      <body>

        {/* Mostrar Navbar solo si NO es admin */}
        {!isAdmin && <Navbar />}

        <main>{children}</main>

        {/* Mostrar Footer solo si NO es admin */}
        {!isAdmin && <Footer />}

      </body>
    </html>
  );
}