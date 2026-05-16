"use client";

import Link from "next/link";
import {
  Home,
  Mail,
  ClipboardList,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../../lib/firebase";

export default function AdminSidebar({ open, setOpen }) {
  const pathname = usePathname();

  const router = useRouter();

const handleLogout = async () => {
  await signOut(auth);
  router.push("/admin/login");
};


  const menuItems = [
    {
      name: "Inicio",
      href: "/admin/inicio",
      icon: Home,
    },
    {
      name: "Mensajes",
      href: "/admin/mensaje",
      icon: Mail,
    },
    {
      name: "Cotizaciones",
      href: "/admin/cotizacion",
      icon: ClipboardList,
    },
  ];

  return (
    <>
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 text-red-600 font-bold hover:text-red-700 transition">
          <LogOut size={22} />
            Cerrar sesión
        </button>

      <aside
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-sm z-40 transition-all duration-300 ${open ? "w-72" : "w-0 overflow-hidden" }`}>
        <div className="flex flex-col h-full">
          <div className="px-8 py-8 border-b border-gray-100 mt-12">
            <img
              src="/img/LogoDS.jpg"
              alt="Data Solutions"
              className="w-48 h-auto mx-auto object-contain"/>
          </div>

          <div className="px-8 mt-8">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Panel Administrativo
            </p>
          </div>

          <nav className="mt-6 px-5 space-y-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                    active
                      ? "bg-[#173f73] text-white shadow-md"
                      : "text-[#173f73] hover:bg-gray-100" }`} >
                  <Icon size={22} strokeWidth={2.4} />

                  <span
                    className={`text-[15px] ${
                      active ? "font-bold" : "font-semibold"}`} >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto p-6">
            <Link
              href="/admin"
              className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-2xl text-[#173f73] font-bold hover:bg-red-50 hover:text-red-600 transition">
              <LogOut size={20} />
              <span>Cerrar sesión</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}