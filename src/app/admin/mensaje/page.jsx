"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";

import { Search, Mail, Inbox, Clock, Eye, Trash2 } from "lucide-react";

export default function MensajesAdmin() {
  const [open, setOpen] = useState(true);
  const [mensajes, setMensajes] = useState([]);
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  useEffect(() => {
    const q = query(collection(db, "mensajes"), orderBy("fecha", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const datos = snapshot.docs.map((documento) => ({
        id: documento.id,
        ...documento.data(),
      }));

      setMensajes(datos);

      if (datos.length > 0 && !mensajeSeleccionado) {
        setMensajeSeleccionado(datos[0]);
      }
    });

    return () => unsubscribe();
  }, []);

  const seleccionarMensaje = async (mensaje) => {
    setMensajeSeleccionado(mensaje);

    if (mensaje.estado === "Nuevo") {
      await updateDoc(doc(db, "mensajes", mensaje.id), {
        estado: "Leído",
      });
    }
  };

  const eliminarMensaje = async (id) => {
    const confirmar = confirm("¿Seguro que deseas eliminar este mensaje?");
    if (!confirmar) return;

    await deleteDoc(doc(db, "mensajes", id));
    setMensajeSeleccionado(null);
    alert("Mensaje eliminado");
  };

  const mensajesFiltrados = mensajes.filter((mensaje) => {
    const texto =
      `${mensaje.nombre} ${mensaje.correo} ${mensaje.asunto} ${mensaje.mensaje}`.toLowerCase();

    const coincideBusqueda = texto.includes(busqueda.toLowerCase());
    const estadoMensaje = mensaje.estado || "Nuevo";

    const coincideEstado =
      filtroEstado === "Todos" ||
      (filtroEstado === "Leídos" && estadoMensaje === "Leído") ||
      (filtroEstado === "No leídos" && estadoMensaje === "Nuevo");

    return coincideBusqueda && coincideEstado;
  });

  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin fecha";

    return fecha.toDate().toLocaleString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por nombre, correo o asunto"
                    className="outline-none text-sm w-full text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Estado
                </label>

                <select
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#5577f2] bg-white"
                >
                  <option value="Todos">Todos los mensajes</option>
                  <option value="No leídos">No leídos</option>
                  <option value="Leídos">Leídos</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            <div className="xl:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-[#0f2e4f]">Mensajes</h2>

                  <p className="text-sm text-gray-500">
                    {mensajesFiltrados.length} registrados
                  </p>
                </div>

                <div className="bg-[#eef3ff] text-[#5577f2] p-3 rounded-xl">
                  <Inbox size={22} />
                </div>
              </div>

              {mensajesFiltrados.length === 0 ? (
                <div className="p-10 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-[#eef3ff] text-[#5577f2] flex items-center justify-center mb-4">
                    <Mail size={30} />
                  </div>

                  <h3 className="font-bold text-[#0f2e4f]">
                    Sin mensajes todavía
                  </h3>

                  <p className="text-gray-500 text-sm mt-2">
                    No hay mensajes con este filtro seleccionado.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                  {mensajesFiltrados.map((mensaje) => (
                    <button
                      key={mensaje.id}
                      onClick={() => seleccionarMensaje(mensaje)}
                      className={`w-full text-left p-5 transition ${
                        mensajeSeleccionado?.id === mensaje.id
                          ? "bg-[#eef3ff]"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-bold text-[#0f2e4f]">
                            {mensaje.nombre}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {mensaje.asunto}
                          </p>

                          <p className="text-xs text-gray-400 mt-2">
                            {formatearFecha(mensaje.fecha)}
                          </p>
                        </div>

                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full ${
                            mensaje.estado === "Leído"
                              ? "bg-gray-100 text-gray-500"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {mensaje.estado || "Nuevo"}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-90">
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

                  {mensajeSeleccionado
                    ? formatearFecha(mensajeSeleccionado.fecha)
                    : "Sin actividad"}
                </div>
              </div>

              {!mensajeSeleccionado ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <div className="w-20 h-20 rounded-2xl bg-[#eef3ff] text-[#5577f2] flex items-center justify-center mb-5">
                    <Eye size={36} />
                  </div>

                  <h3 className="text-2xl font-extrabold text-[#0f2e4f]">
                    Selecciona un mensaje
                  </h3>

                  <p className="text-sm text-gray-500 mt-4 max-w-md leading-relaxed">
                    Aquí aparecerá el nombre, correo, asunto y contenido
                    completo del mensaje seleccionado.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <div className="bg-[#f5f7fb] rounded-xl p-4">
                      <p className="text-xs text-gray-500 font-semibold">
                        Nombre
                      </p>

                      <p className="font-bold text-[#0f2e4f] mt-1">
                        {mensajeSeleccionado.nombre}
                      </p>
                    </div>

                    <div className="bg-[#f5f7fb] rounded-xl p-4">
                      <p className="text-xs text-gray-500 font-semibold">
                        Correo
                      </p>

                      <p className="font-bold text-[#0f2e4f] mt-1">
                        {mensajeSeleccionado.correo}
                      </p>
                    </div>

                    <div className="bg-[#f5f7fb] rounded-xl p-4 md:col-span-2">
                      <p className="text-xs text-gray-500 font-semibold">
                        Asunto
                      </p>

                      <p className="font-bold text-[#0f2e4f] mt-1">
                        {mensajeSeleccionado.asunto}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#f5f7fb] rounded-xl p-5 mb-6">
                    <p className="text-xs text-gray-500 font-semibold mb-2">
                      Mensaje
                    </p>

                    <p className="text-gray-700 leading-relaxed">
                      {mensajeSeleccionado.mensaje}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() =>
                        eliminarMensaje(mensajeSeleccionado.id)
                      }
                      className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-3 rounded-xl font-semibold hover:bg-red-100 transition"
                    >
                      <Trash2 size={18} />
                      Eliminar mensaje
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}