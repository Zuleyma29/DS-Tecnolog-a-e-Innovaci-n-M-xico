"use client";

import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

import {
  List,
  CheckSquare,
  ArrowRight,
  Mail,
  Clock,
  BarChart3,
} from "lucide-react";

export default function DashboardAdmin() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-[#f5f7fb] text-[#12345a]">
      <AdminSidebar open={open} setOpen={setOpen} />

      <main className={`min-h-screen px-8 py-8 transition-all duration-300 ${open ? "ml-72" : "ml-0" }`}>
        <section className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-sm font-semibold text-[#5577f2] mb-2">
              Área administrativa
            </p>

            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2e4f]">
              Panel Administrativo
            </h1>

            <p className="text-gray-500 mt-2">
              Bienvenido, aquí puedes revisar las solicitudes de cotización y
              mensajes recibidos desde el sitio web.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card
              icon={<List size={34} />}
              title="Solicitudes nuevas"
              number="0"
              text="Pendientes por revisar"
            />

            <Card
              icon={<Mail size={34} />}
              title="Mensajes recibidos"
              number="0"
              text="No leídos"
            />

            <Card
              icon={<CheckSquare size={34} />}
              title="Solicitudes atendidas"
              number="0"
              text="Este mes"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-[#0f2e4f]">
                    Solicitudes recientes
                  </h2>
                  <p className="text-sm text-gray-500">
                    Últimas solicitudes enviadas por clientes.
                  </p>
                </div>

                <button className="text-sm bg-[#0f2e4f] text-white px-4 py-2 rounded-xl hover:bg-[#173f73] transition">
                  Ver todas
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-[#eef3ff] text-[#0f2e4f]">
                      <th className="py-4 px-4 font-bold rounded-l-xl">
                        Cliente
                      </th>
                      <th className="py-4 px-4 font-bold">Servicio</th>
                      <th className="py-4 px-4 font-bold">Fecha</th>
                      <th className="py-4 px-4 font-bold">Estado</th>
                      <th className="py-4 px-4 font-bold rounded-r-xl">
                        Acción
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td
                        colSpan="5"
                        className="py-12 text-center text-gray-500"
                      >
                        Aún no hay solicitudes registradas.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-[#eef3ff] text-[#5577f2] p-3 rounded-xl">
                  <BarChart3 size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-[#0f2e4f]">
                    Resumen general
                  </h3>
                  <p className="text-sm text-gray-500">Actividad del sistema</p>
                </div>
              </div>

              <div className="space-y-4">
                <InfoItem label="Cotizaciones pendientes" value="0" />
                <InfoItem label="Mensajes sin leer" value="0" />
                <InfoItem label="Total de registros" value="0" />
              </div>

              <div className="mt-8 bg-[#f5f7fb] rounded-xl p-4 flex gap-3">
                <Clock className="text-[#5577f2]" size={22} />

                <p className="text-sm text-gray-600">
                  Cuando conectes la base de datos, aquí se mostrará la
                  actividad real del administrador.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Card({ icon, title, number, text }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div className="bg-[#eef3ff] text-[#5577f2] p-4 rounded-2xl">
          {icon}
        </div>

        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#0f2e4f] hover:bg-[#eef3ff] transition">
          <ArrowRight size={20} />
        </button>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-gray-500">{title}</p>

        <h3 className="text-4xl font-extrabold text-[#0f2e4f] mt-2">
          {number}
        </h3>

        <p className="text-sm text-gray-500 mt-1">{text}</p>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="font-bold text-[#0f2e4f]">{value}</span>
    </div>
  );
}