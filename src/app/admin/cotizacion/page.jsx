"use client";

import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

import {
  Search,
  Download,
  FileText,
  Inbox,
  Clock,
  Eye,
} from "lucide-react";

export default function CotizacionesAdmin() {
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
              Cotizaciones
            </h1>

            <p className="text-gray-500 mt-2">
              Revisa todas las solicitudes de cotización enviadas por los
              clientes desde el sitio web.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <CardResumen
              icon={<FileText size={26} />}
              title="Solicitudes totales"
              value="0"
              text="Registradas"
            />

            <CardResumen
              icon={<Clock size={26} />}
              title="Pendientes"
              value="0"
              text="Por revisar"
            />

            <CardResumen
              icon={<Inbox size={26} />}
              title="Atendidas"
              value="0"
              text="Finalizadas"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-600">
                  Buscar cotización
                </label>

                <div className="mt-2 flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#5577f2] transition">
                  <Search size={18} className="text-[#5577f2]" />

                  <input
                    type="text"
                    placeholder="Buscar por empresa, cliente o servicio"
                    className="outline-none text-sm w-full text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Estado
                </label>

                <select className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#5577f2]">
                  <option>Todos</option>
                  <option>Pendiente</option>
                  <option>Revisado</option>
                  <option>Atendido</option>
                </select>
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-[#0f2e4f] text-white rounded-xl px-5 py-3 text-sm font-semibold hover:bg-[#173f73] transition">
                <Download size={18} />
                Exportar
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#0f2e4f]">
                  Solicitudes de cotización
                </h2>

                <p className="text-sm text-gray-500">
                  Lista de solicitudes recibidas por los clientes.
                </p>
              </div>

              <div className="hidden md:flex bg-[#eef3ff] text-[#5577f2] p-3 rounded-xl">
                <FileText size={22} />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-[#eef3ff] text-[#0f2e4f]">
                    <th className="px-6 py-4 font-bold">N.º</th>
                    <th className="px-6 py-4 font-bold">Cliente</th>
                    <th className="px-6 py-4 font-bold">Servicio</th>
                    <th className="px-6 py-4 font-bold">Fecha</th>
                    <th className="px-6 py-4 font-bold">Estado</th>
                    <th className="px-6 py-4 font-bold">Acción</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-20 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl bg-[#eef3ff] text-[#5577f2] flex items-center justify-center mb-4">
                          <Eye size={30} />
                        </div>

                        <h3 className="font-bold text-[#0f2e4f]">
                          No hay cotizaciones todavía
                        </h3>

                        <p className="text-sm text-gray-500 mt-2">
                          Cuando un cliente envíe una solicitud, aparecerá en
                          esta tabla.
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-100 text-sm text-gray-500">
              <p>Mostrando 0 resultados</p>

              <select className="border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-[#5577f2]">
                <option>10 por página</option>
                <option>20 por página</option>
                <option>50 por página</option>
              </select>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function CardResumen({ icon, title, value, text }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div className="bg-[#eef3ff] text-[#5577f2] p-4 rounded-2xl">
          {icon}
        </div>

        <span className="text-xs font-semibold bg-[#f5f7fb] text-gray-500 px-3 py-1 rounded-full">
          {text}
        </span>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-gray-500">{title}</p>

        <h3 className="text-4xl font-extrabold text-[#0f2e4f] mt-2">
          {value}
        </h3>
      </div>
    </div>
  );
}