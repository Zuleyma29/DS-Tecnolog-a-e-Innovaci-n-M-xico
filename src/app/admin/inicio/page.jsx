"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "../components/AdminSidebar";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";

import { List, CheckSquare, ArrowRight, Mail } from "lucide-react";

export default function DashboardAdmin() {
  const [open, setOpen] = useState(true);
  const [cotizaciones, setCotizaciones] = useState([]);
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    const qCotizaciones = query(
      collection(db, "cotizaciones"),
      orderBy("fecha", "desc"),
      limit(5)
    );

    const unsubscribeCotizaciones = onSnapshot(qCotizaciones, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCotizaciones(data);
    });

    const qMensajes = query(
      collection(db, "mensajes"),
      orderBy("fecha", "desc")
    );

    const unsubscribeMensajes = onSnapshot(qMensajes, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMensajes(data);
    });

    return () => {
      unsubscribeCotizaciones();
      unsubscribeMensajes();
    };
  }, []);

  const solicitudesPendientes = cotizaciones.filter(
    (item) =>
      item.estado === "Pendiente" ||
      item.estado === "Nueva" ||
      !item.estado
  ).length;

  const solicitudesAtendidas = cotizaciones.filter(
    (item) =>
      item.estado === "Atendida" ||
      item.estado === "Completada" ||
      item.estado === "Finalizada"
  ).length;

  const mensajesNoLeidos = mensajes.filter(
    (item) =>
      item.estado === "No leído" ||
      item.estado === "Nuevo" ||
      item.leido === false ||
      !item.estado
  ).length;

  const ultimaSolicitudPendiente = cotizaciones.find(
    (item) =>
      item.estado === "Pendiente" ||
      item.estado === "Nueva" ||
      !item.estado
  );

  const ultimaSolicitudAtendida = cotizaciones.find(
    (item) =>
      item.estado === "Atendida" ||
      item.estado === "Completada" ||
      item.estado === "Finalizada"
  );

  const ultimoMensajeNuevo = mensajes.find(
    (item) =>
      item.estado === "No leído" ||
      item.estado === "Nuevo" ||
      item.leido === false ||
      !item.estado
  );

  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin fecha";

    if (fecha?.toDate) {
      return fecha.toDate().toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }

    return "Sin fecha";
  };

  return (
    <div className="min-h-screen flex bg-[#f5f7fb] text-[#12345a]">
      <AdminSidebar open={open} setOpen={setOpen} />

      <main
        className={`min-h-screen w-full px-8 py-8 transition-all duration-300 ${
          open ? "ml-72" : "ml-0"
        }`}
      >
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
              number={solicitudesPendientes}
              text={
                ultimaSolicitudPendiente
                  ? ultimaSolicitudPendiente.servicio ||
                    ultimaSolicitudPendiente.nombreEmpresa ||
                    "Nueva solicitud registrada"
                  : "Sin solicitudes pendientes"
              }
              href="/admin/cotizacion"
            />

            <Card
              icon={<Mail size={34} />}
              title="Mensajes recibidos"
              number={mensajesNoLeidos}
              text={
                ultimoMensajeNuevo
                  ? ultimoMensajeNuevo.asunto ||
                    ultimoMensajeNuevo.mensaje ||
                    ultimoMensajeNuevo.nombre ||
                    "Nuevo mensaje recibido"
                  : "Sin mensajes nuevos"
              }
              href="/admin/mensaje"
            />

            <Card
              icon={<CheckSquare size={34} />}
              title="Solicitudes atendidas"
              number={solicitudesAtendidas}
              text={
                ultimaSolicitudAtendida
                  ? ultimaSolicitudAtendida.servicio ||
                    ultimaSolicitudAtendida.nombreEmpresa ||
                    "Solicitud marcada como atendida"
                  : "Sin solicitudes atendidas"
              }
              href="/admin/cotizacion"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-[#0f2e4f]">
                  Solicitudes recientes
                </h2>

                <p className="text-sm text-gray-500">
                  Últimas solicitudes enviadas por clientes.
                </p>
              </div>

              <Link
                href="/admin/cotizacion"
                className="text-sm bg-[#0f2e4f] text-white px-4 py-2 rounded-xl hover:bg-[#173f73] transition"
              >
                Ver todas
              </Link>
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
                  {cotizaciones.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-12 text-center text-gray-500"
                      >
                        Aún no hay solicitudes registradas.
                      </td>
                    </tr>
                  ) : (
                    cotizaciones.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="py-4 px-4 font-semibold text-[#0f2e4f]">
                          {item.nombreEmpresa || item.nombre || "Sin nombre"}
                        </td>

                        <td className="py-4 px-4 text-gray-600">
                          {item.servicio || "Cotización"}
                        </td>

                        <td className="py-4 px-4 text-gray-600">
                          {formatearFecha(item.fecha)}
                        </td>

                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              item.estado === "Atendida" ||
                              item.estado === "Completada" ||
                              item.estado === "Finalizada"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {item.estado || "Pendiente"}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <Link
                            href="/admin/cotizacion"
                            className="text-[#5577f2] font-semibold hover:underline"
                          >
                            Ver
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Card({ icon, title, number, text, href }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div className="bg-[#eef3ff] text-[#5577f2] p-4 rounded-2xl">
          {icon}
        </div>

        <Link
          href={href}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#0f2e4f] hover:bg-[#eef3ff] transition"
        >
          <ArrowRight size={20} />
        </Link>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-gray-500">{title}</p>

        <h3 className="text-4xl font-extrabold text-[#0f2e4f] mt-2">
          {number}
        </h3>

        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{text}</p>
      </div>
    </div>
  );
}