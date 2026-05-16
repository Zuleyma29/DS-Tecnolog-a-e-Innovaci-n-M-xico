"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

import ProtectedRoute from "../components/ProtectedRoute";

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

import {
  Search,
  FileText,
  Inbox,
  Clock,
  Eye,
  Trash2,
  X,
  ExternalLink,
  Paperclip,
} from "lucide-react";

export default function CotizacionesAdmin() {
  const [open, setOpen] = useState(true);
  const [cotizaciones, setCotizaciones] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todas");
  const [filtroServicio, setFiltroServicio] = useState("Todos");
  const [cotizacionSeleccionada, setCotizacionSeleccionada] = useState(null);

  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalExito, setModalExito] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "cotizaciones"), orderBy("fecha", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const datos = snapshot.docs.map((documento) => ({
        id: documento.id,
        ...documento.data(),
      }));

      setCotizaciones(datos);
    });

    return () => unsubscribe();
  }, []);

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

  const obtenerServicio = (cotizacion) => {
    return cotizacion.categoria || cotizacion.tipoServicio || "Sin servicio";
  };

  const cotizacionesFiltradas = cotizaciones.filter((cotizacion) => {
    const servicio = obtenerServicio(cotizacion);

    const texto = `
      ${cotizacion.nombreEmpresa || ""}
      ${cotizacion.correo || ""}
      ${cotizacion.telefono || ""}
      ${servicio}
      ${cotizacion.producto || ""}
      ${cotizacion.comentarios || ""}
    `.toLowerCase();

    const coincideBusqueda = texto.includes(busqueda.toLowerCase());

    const coincideEstado =
      filtroEstado === "Todas" || cotizacion.estado === filtroEstado;

    const coincideServicio =
      filtroServicio === "Todos" || servicio === filtroServicio;

    return coincideBusqueda && coincideEstado && coincideServicio;
  });

  const cambiarEstado = async (id, nuevoEstado) => {
    await updateDoc(doc(db, "cotizaciones", id), {
      estado: nuevoEstado,
    });
  };

  const eliminarCotizacion = async () => {
    if (!cotizacionSeleccionada) return;

    try {
      setEliminando(true);

      await deleteDoc(doc(db, "cotizaciones", cotizacionSeleccionada.id));

      setModalEliminar(false);
      setCotizacionSeleccionada(null);
      setModalExito(true);

      setTimeout(() => {
        setModalExito(false);
      }, 2500);
    } catch (error) {
      console.error("Error al eliminar la cotización:", error);
    } finally {
      setEliminando(false);
    }
  };

  const getColorEstado = (estado) => {
    if (estado === "Finalizada") {
      return "bg-green-100 text-green-700";
    }

    if (estado === "En proceso") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-blue-100 text-blue-700";
  };

  return (
    <ProtectedRoute>
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
              value={cotizaciones.length}
              text="Registradas"
            />

            <CardResumen
              icon={<Clock size={26} />}
              title="Pendientes"
              value={cotizaciones.filter((c) => c.estado === "Nueva").length}
              text="Por revisar"
            />

            <CardResumen
              icon={<Inbox size={26} />}
              title="Finalizadas"
              value={
                cotizaciones.filter((c) => c.estado === "Finalizada").length
              }
              text="Atendidas"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Buscar cotización
                </label>

                <div className="mt-2 flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#5577f2] transition">
                  <Search size={18} className="text-[#5577f2]" />

                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por empresa o cliente"
                    className="outline-none text-sm w-full text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Servicio
                </label>

                <select
                  value={filtroServicio}
                  onChange={(e) => setFiltroServicio(e.target.value)}
                  className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#5577f2] bg-white"
                >
                  <option value="Todos">Todos</option>
                  <option value="Etiquetado">Etiquetado</option>
                  <option value="Poliza">Póliza</option>
                  <option value="Soporte Técnico">Soporte Técnico</option>
                  <option value="Suministro">Suministro</option>
                </select>
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
                  <option value="Todas">Todas</option>
                  <option value="Nueva">Nueva</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Finalizada">Finalizada</option>
                </select>
              </div>
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
                  {cotizacionesFiltradas.length === 0 ? (
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
                  ) : (
                    cotizacionesFiltradas.map((cotizacion, index) => (
                      <tr
                        key={cotizacion.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 font-semibold">
                          {index + 1}
                        </td>

                        <td className="px-6 py-4">
                          <p className="font-bold text-[#0f2e4f]">
                            {cotizacion.nombreEmpresa || "Sin nombre"}
                          </p>

                          <p className="text-xs text-gray-500">
                            {cotizacion.correo || "Sin correo"}
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          {obtenerServicio(cotizacion)}
                        </td>

                        <td className="px-6 py-4 text-gray-500">
                          {formatearFecha(cotizacion.fecha)}
                        </td>

                        <td className="px-6 py-4">
                          <select
                            value={cotizacion.estado || "Nueva"}
                            onChange={(e) =>
                              cambiarEstado(cotizacion.id, e.target.value)
                            }
                            className={`rounded-full px-3 py-2 text-xs font-bold outline-none ${getColorEstado(
                              cotizacion.estado || "Nueva"
                            )}`}
                          >
                            <option value="Nueva">Nueva</option>
                            <option value="En proceso">En proceso</option>
                            <option value="Finalizada">Finalizada</option>
                          </select>
                        </td>

                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              setCotizacionSeleccionada(cotizacion)
                            }
                            className="bg-[#eef3ff] text-[#5577f2] px-4 py-2 rounded-xl font-semibold hover:bg-blue-100 transition"
                          >
                            Ver detalle
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-100 text-sm text-gray-500">
              <p>Mostrando {cotizacionesFiltradas.length} resultados</p>
            </div>
          </div>
        </section>
      </main>

      {cotizacionSeleccionada && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-gray-100 pb-5 mb-6">
              <div>
                <h2 className="text-2xl font-extrabold text-[#0f2e4f]">
                  Detalle de cotización
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {obtenerServicio(cotizacionSeleccionada)} ·{" "}
                  {formatearFecha(cotizacionSeleccionada.fecha)}
                </p>
              </div>

              <button
                onClick={() => setCotizacionSeleccionada(null)}
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-xl transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-8">
              <SeccionDetalle titulo="Información general">
                <InputDetalle
                  label="Nombre / Empresa"
                  value={cotizacionSeleccionada.nombreEmpresa}
                />

                <InputDetalle
                  label="Correo electrónico"
                  value={cotizacionSeleccionada.correo}
                />

                <InputDetalle
                  label="Teléfono"
                  value={cotizacionSeleccionada.telefono}
                />

                <InputDetalle
                  label="Servicio solicitado"
                  value={obtenerServicio(cotizacionSeleccionada)}
                />

                <InputDetalle
                  label="Estado"
                  value={cotizacionSeleccionada.estado || "Nueva"}
                />

                <InputDetalle
                  label="Fecha de solicitud"
                  value={formatearFecha(cotizacionSeleccionada.fecha)}
                />
              </SeccionDetalle>

              {obtenerServicio(cotizacionSeleccionada) ===
                "Soporte Técnico" && (
                <SeccionDetalle titulo="Diagnóstico técnico">
                  <InputDetalle
                    label="Tipo de equipo"
                    value={cotizacionSeleccionada.tipoEquipo}
                  />

                  <InputDetalle
                    label="Marca y modelo"
                    value={cotizacionSeleccionada.marcaModelo}
                  />

                  <InputDetalle
                    label="Tipo de falla"
                    value={cotizacionSeleccionada.tipoFalla}
                  />

                  <InputDetalle
                    label="Fecha del problema"
                    value={cotizacionSeleccionada.fechaProblema}
                  />

                  <InputDetalle
                    label="¿Equipo detenido?"
                    value={cotizacionSeleccionada.equipoDetenido}
                  />

                  <TextareaDetalle
                    label="Descripción del problema"
                    value={cotizacionSeleccionada.descripcionProblema}
                  />

                  <TextareaDetalle
                    label="Comentarios adicionales"
                    value={cotizacionSeleccionada.comentarios}
                  />

                  <ArchivoDetalle
                    label="Imagen o video del problema"
                    url={cotizacionSeleccionada.archivoAdjunto}
                  />
                </SeccionDetalle>
              )}

              {obtenerServicio(cotizacionSeleccionada) === "Etiquetado" && (
                <SeccionDetalle titulo="Solución de etiquetado">
                  <InputDetalle
                    label="Producto a etiquetar"
                    value={cotizacionSeleccionada.producto}
                  />

                  <InputDetalle
                    label="Industria"
                    value={cotizacionSeleccionada.industria}
                  />

                  <InputDetalle
                    label="Material"
                    value={cotizacionSeleccionada.material}
                  />

                  <InputDetalle
                    label="Medidas"
                    value={cotizacionSeleccionada.medidas}
                  />

                  <InputDetalle
                    label="Cantidad requerida"
                    value={cotizacionSeleccionada.cantidad}
                  />

                  <InputDetalle
                    label="Tipo de impresión"
                    value={cotizacionSeleccionada.tipoImpresion}
                  />

                  <InputDetalle
                    label="¿Cuenta con diseño?"
                    value={cotizacionSeleccionada.cuentaDiseno}
                  />

                  <ArchivoDetalle
                    label="Diseño de etiqueta"
                    url={cotizacionSeleccionada.disenoEtiquetaUrl}
                  />

                  <InputDetalle
                    label="¿Requiere ribbon?"
                    value={cotizacionSeleccionada.requiereRibbon}
                  />

                  <InputDetalle
                    label="¿Requiere impresora?"
                    value={cotizacionSeleccionada.requiereImpresora}
                  />

                  <TextareaDetalle
                    label="Comentarios adicionales"
                    value={cotizacionSeleccionada.comentarios}
                  />
                </SeccionDetalle>
              )}

              {obtenerServicio(cotizacionSeleccionada) === "Poliza" && (
                <SeccionDetalle titulo="Póliza de mantenimiento">
                  <InputDetalle
                    label="Número de equipos"
                    value={cotizacionSeleccionada.numeroEquipos}
                  />

                  <InputDetalle
                    label="Tipo de equipo"
                    value={cotizacionSeleccionada.tipoEquipo}
                  />

                  <InputDetalle
                    label="Ubicación de la empresa"
                    value={cotizacionSeleccionada.ubicacion}
                  />

                  <InputDetalle
                    label="Frecuencia deseada"
                    value={cotizacionSeleccionada.frecuencia}
                  />

                  <InputDetalle
                    label="Tipo de servicio"
                    value={cotizacionSeleccionada.tipoServicio}
                  />

                  <InputDetalle
                    label="Horario preferido de atención"
                    value={cotizacionSeleccionada.horario}
                  />

                  <TextareaDetalle
                    label="Comentarios adicionales"
                    value={cotizacionSeleccionada.comentarios}
                  />
                </SeccionDetalle>
              )}

              {obtenerServicio(cotizacionSeleccionada) === "Suministro" && (
                <SeccionDetalle titulo="Programa de suministro">
                  <InputDetalle
                    label="Producto requerido"
                    value={cotizacionSeleccionada.producto}
                  />

                  <InputDetalle
                    label="Tipo de etiqueta"
                    value={cotizacionSeleccionada.tipoEtiqueta}
                  />

                  <InputDetalle
                    label="Medidas"
                    value={cotizacionSeleccionada.medidas}
                  />

                  <InputDetalle
                    label="Cantidad estimada"
                    value={cotizacionSeleccionada.cantidad}
                  />

                  <InputDetalle
                    label="Frecuencia de compra"
                    value={cotizacionSeleccionada.frecuenciaCompra}
                  />

                  <InputDetalle
                    label="¿Requiere entregas programadas?"
                    value={cotizacionSeleccionada.entregasProgramadas}
                  />

                  <InputDetalle
                    label="Ubicación de entrega"
                    value={cotizacionSeleccionada.ubicacionEntrega}
                  />

                  <TextareaDetalle
                    label="Comentarios adicionales"
                    value={cotizacionSeleccionada.comentarios}
                  />
                </SeccionDetalle>
              )}
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setModalEliminar(true)}
                className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-3 rounded-xl font-semibold hover:bg-red-100 transition"
              >
                <Trash2 size={18} />
                Eliminar
              </button>

              <button
                onClick={() => setCotizacionSeleccionada(null)}
                className="bg-[#0f2e4f] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#173f73] transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {modalEliminar && (
        <div className="fixed inset-0 bg-black/40 z-60 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-7 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-5">
              <Trash2 size={30} />
            </div>

            <h3 className="text-2xl font-extrabold text-[#0f2e4f]">
              Eliminar cotización
            </h3>

            <p className="text-gray-500 mt-3 leading-relaxed">
              Esta acción eliminará permanentemente la solicitud de cotización.
              ¿Deseas continuar?
            </p>

            <div className="flex gap-3 mt-7">
              <button
                onClick={() => setModalEliminar(false)}
                disabled={eliminando}
                className="w-full bg-gray-100 text-gray-700 px-5 py-3 rounded-xl font-semibold hover:bg-gray-200 transition disabled:opacity-60"
              >
                Cancelar
              </button>

              <button
                onClick={eliminarCotizacion}
                disabled={eliminando}
                className="w-full bg-red-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-red-700 transition disabled:opacity-60"
              >
                {eliminando ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {modalExito && (
        <div className="fixed top-6 right-6 z-70 bg-white border border-green-100 shadow-xl rounded-2xl px-6 py-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
            ✓
          </div>

          <div>
            <h4 className="font-extrabold text-[#0f2e4f]">
              Cotización eliminada
            </h4>
            <p className="text-sm text-gray-500">
              La solicitud se eliminó correctamente.
            </p>
          </div>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}

function SeccionDetalle({ titulo, children }) {
  return (
    <div>
      <h3 className="text-lg font-extrabold text-[#0f2e4f] mb-4">
        {titulo}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function InputDetalle({ label, value }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700">{label}</label>

      <input
        type="text"
        value={value || ""}
        readOnly
        className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-700 outline-none"
      />
    </div>
  );
}

function TextareaDetalle({ label, value }) {
  return (
    <div className="md:col-span-2">
      <label className="text-sm font-semibold text-gray-700">{label}</label>

      <textarea
        value={value || ""}
        readOnly
        rows={5}
        className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-700 resize-none outline-none"
      />
    </div>
  );
}

function ArchivoDetalle({ label, url }) {
  if (!url) {
    return (
      <div className="md:col-span-2">
        <label className="text-sm font-semibold text-gray-700">
          {label}
        </label>

        <div className="mt-2 border border-gray-200 rounded-2xl px-4 py-4 bg-gray-50 text-gray-500 text-sm">
          Sin archivo adjunto
        </div>
      </div>
    );
  }

  const esVideo =
    url.includes(".mp4") ||
    url.includes(".mov") ||
    url.includes("/video/upload");

  return (
    <div className="md:col-span-2">
      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="mt-3 border border-gray-200 rounded-2xl overflow-hidden bg-gray-50">
        {esVideo ? (
          <video
            controls
            className="w-full max-h-112.5 object-cover bg-black"
          >
            <source src={url} />
            Tu navegador no soporta videos.
          </video>
        ) : (
          <img
            src={url}
            alt="Archivo adjunto"
            className="w-full max-h-125 object-contain bg-white"
          />
        )}
      </div>
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