"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Inicio", path: "/" },
    { name: "Nosotros", path: "/nosotros" },
    { name: "Servicios", path: "/servicios" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <nav className="bg-white border-b border-blue-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <img
          src="/img/LogoDS.jpg"
          alt="Data Solutions"
          className="w-52 h-auto object-contain"
        />

        <ul className="flex gap-10 text-lg font-medium text-gray-800">
          {links.map((link) => {
            const isActive =
              link.path === "/"
                ? pathname === "/"
                : pathname.startsWith(link.path);

            return (
              <li key={link.path} className="relative group">
                <Link
                  href={link.path}
                  className={`transition duration-300 ${
                    isActive
                      ? "text-blue-700 font-semibold"
                      : "hover:text-blue-700"
                  }`}
                >
                  {link.name}
                </Link>

                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-blue-700 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </li>
            );
          })}
        </ul>

      </div>
    </nav>
  );
}