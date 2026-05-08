"use client";

import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

import {
  Search,
  Mail,
  Inbox,
  Clock,
  Eye,
} from "lucide-react";

export default function MensajesAdmin() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#0f2e4f]">
      <AdminSidebar open={open} setOpen={setOpen} />

      <main
        className={`min-h-screen px-8 py-8 transition-all duration-300 ${
          open ? "ml-72" : "ml-0"
        }`}
      >
        <section className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-sm font-semibold text-[#5577f2] mb-2">
              Área administrativa
            </p>

            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2e4f]">
              Mensajes
            </h1>

            <p className="text-gray-500 mt-2">
              Revisa los mensajes enviados por los clientes desde el formulario
              de contacto.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-600">
                  Buscar mensaje
                </label>

                <div className="mt-2 flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#5577f2] transition">
                  <Search size={18} className="text-[#5577f2]" />

                  <input
                    type="text"
                    placeholder="Buscar por empresa, nombre o correo"
                    className="outline-none text-sm w-full text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Estado
                </label>

                <select className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#5577f2]">
                  <option>Todos los mensajes</option>
                  <option>Leídos</option>
                  <option>No leídos</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Ordenar por
                </label>

                <select className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#5577f2]">
                  <option>Más reciente</option>
                  <option>Más antiguo</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            <div className="xl:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-[#0f2e4f]">Mensajes</h2>
                  <p className="text-sm text-gray-500">0 registrados</p>
                </div>

                <div className="bg-[#eef3ff] text-[#5577f2] p-3 rounded-xl">
                  <Inbox size={22} />
                </div>
              </div>

              <div className="p-10 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-[#eef3ff] text-[#5577f2] flex items-center justify-center mb-4">
                  <Mail size={30} />
                </div>

                <h3 className="font-bold text-[#0f2e4f]">
                  Sin mensajes todavía
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  Cuando un cliente envíe el formulario de contacto, aparecerá
                  en esta lista.
                </p>
              </div>
            </div>

            <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[360px]">
              <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-8">
                <div>
                  <h2 className="text-xl font-bold text-[#0f2e4f]">
                    Detalle del mensaje
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Selecciona un mensaje para revisar su información completa.
                  </p>
                </div>

                <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                  <Clock size={18} />
                  Sin actividad
                </div>
              </div>

              <div className="flex flex-col items-center justify-center text-center py-16">
                <div className="w-20 h-20 rounded-2xl bg-[#eef3ff] text-[#5577f2] flex items-center justify-center mb-5">
                  <Eye size={36} />
                </div>

                <h3 className="text-2xl font-extrabold text-[#0f2e4f]">
                  Selecciona un mensaje
                </h3>

                <p className="text-sm text-gray-500 mt-4 max-w-md leading-relaxed">
                  Cuando conectes la base de datos, aquí aparecerá el nombre,
                  correo, empresa, asunto y contenido completo del mensaje
                  seleccionado por el administrador.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}