"use client";

import Link from "next/link";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function PolizaMantenimiento() {
  const [formData, setFormData] = useState({
    nombreEmpresa: "",
    correo: "",
    telefono: "",
    numeroEquipos: "",
    tipoEquipo: "",
    ubicacion: "",
    frecuencia: "",
    tipoServicio: "",
    horario: "",
    comentarios: "",
  });

  const [enviando, setEnviando] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const [modalExito, setModalExito] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setMensajeError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nombreEmpresa.trim() ||
      !formData.correo.trim() ||
      !formData.telefono.trim() ||
      !formData.numeroEquipos ||
      !formData.tipoEquipo ||
      !formData.ubicacion.trim() ||
      !formData.frecuencia ||
      !formData.tipoServicio ||
      !formData.horario
    ) {
      setMensajeError(
        "Por favor completa todos los campos obligatorios antes de enviar la solicitud."
      );
      return;
    }

    if (Number(formData.numeroEquipos) <= 0) {
      setMensajeError("El número de equipos debe ser mayor a 0.");
      return;
    }

    try {
      setEnviando(true);
      setMensajeError("");

      await addDoc(collection(db, "cotizaciones"), {
        categoria: "Poliza",

        nombreEmpresa: formData.nombreEmpresa,
        correo: formData.correo,
        telefono: formData.telefono,

        numeroEquipos: formData.numeroEquipos,
        tipoEquipo: formData.tipoEquipo,
        ubicacion: formData.ubicacion,

        frecuencia: formData.frecuencia,
        tipoServicio: formData.tipoServicio,
        horario: formData.horario,

        comentarios: formData.comentarios,

        estado: "Nueva",
        fecha: serverTimestamp(),
      });

      setModalExito(true);

      setFormData({
        nombreEmpresa: "",
        correo: "",
        telefono: "",
        numeroEquipos: "",
        tipoEquipo: "",
        ubicacion: "",
        frecuencia: "",
        tipoServicio: "",
        horario: "",
        comentarios: "",
      });
    } catch (error) {
      console.log(error);
      setMensajeError("Ocurrió un error al enviar la solicitud.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <section className="max-w-6xl mx-auto bg-white border-2 px-10 py-10">
        <div className="flex items-center gap-6 mb-12">
          <img
            src="/img/poliza.png"
            alt="Póliza de mantenimiento"
            className="w-24 h-24 object-contain"
          />

          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2e4f]">
              Solicitar cotización de Póliza de Mantenimiento
            </h1>

            <p className="text-gray-800 mt-2">
              Completa la información y te enviamos una propuesta personalizada para tu empresa
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <label className="text-sm text-black font-semibold">
                Nombre / Empresa <span className="text-orange-500">*</span>
              </label>

              <input
                type="text"
                name="nombreEmpresa"
                value={formData.nombreEmpresa}
                onChange={handleChange}
                placeholder="Escribe tu nombre o empresa"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Correo electrónico <span className="text-orange-500">*</span>
              </label>

              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                placeholder="ejemplo@gmail.com"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Teléfono <span className="text-orange-500">*</span>
              </label>

              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="(241) 215 23 25"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Número de equipos <span className="text-orange-500">*</span>
              </label>

              <input
                type="number"
                min="1"
                step="1"
                name="numeroEquipos"
                value={formData.numeroEquipos}
                onChange={handleChange}
                placeholder="Ej. 5"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Tipo de equipo <span className="text-orange-500">*</span>
              </label>

              <select
                name="tipoEquipo"
                value={formData.tipoEquipo}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
              >
                <option value="">Seleccione una opción</option>
                <option value="impresoras">Impresoras de etiquetas</option>
                <option value="lectores">Lectores de código de barras</option>
                <option value="terminales">Terminales de captura de datos</option>
                <option value="mixto">Equipo mixto</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Ubicación de la empresa <span className="text-orange-500">*</span>
              </label>

              <input
                type="text"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                placeholder="Ciudad o dirección"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Frecuencia deseada <span className="text-orange-500">*</span>
              </label>

              <select
                name="frecuencia"
                value={formData.frecuencia}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
              >
                <option value="">Seleccione una opción</option>
                <option value="mensual">Mensual</option>
                <option value="bimestral">Bimestral</option>
                <option value="trimestral">Trimestral</option>
                <option value="semestral">Semestral</option>
                <option value="anual">Anual</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Tipo de servicio <span className="text-orange-500">*</span>
              </label>

              <select
                name="tipoServicio"
                value={formData.tipoServicio}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
              >
                <option value="">Seleccione una opción</option>
                <option value="preventivo">Preventivo</option>
                <option value="correctivo">Correctivo</option>
                <option value="ambos">Ambos</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Horario preferido de atención <span className="text-orange-500">*</span>
              </label>

              <select
                name="horario"
                value={formData.horario}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
              >
                <option value="">Seleccione una opción</option>
                <option value="manana">9:00 AM - 11:00 AM</option>
                <option value="tarde">11:00 AM - 1:00 PM</option>
                <option value="horario_laboral">1:00 PM - 3:00 PM</option>
                <option value="fin_semana">3:00 PM - 5:00 PM</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Comentarios adicionales
              </label>

              <textarea
                rows={4}
                name="comentarios"
                value={formData.comentarios}
                onChange={handleChange}
                placeholder="Cuéntanos algo más sobre tus necesidades"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 resize-none placeholder:text-gray-500 text-gray-900"
              ></textarea>
            </div>
          </div>

          {mensajeError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium">
              {mensajeError}
            </div>
          )}

          <div className="flex justify-end gap-7 pt-6">
            <Link
              href="/servicios"
              className="bg-[#6B8FB1] text-white font-semibold px-10 py-3 rounded-full shadow-md hover:bg-blue-400 hover:shadow-lg transition duration-300 inline-block"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={enviando}
              className="bg-[#6B8FB1] text-white font-semibold px-10 py-3 rounded-full shadow-md hover:bg-blue-400 hover:shadow-lg transition duration-300 inline-block disabled:opacity-60"
            >
              {enviando ? "Enviando..." : "Solicitar cotización"}
            </button>
          </div>
        </form>
      </section>
      {modalExito && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-[#0f2e4f]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="mb-3 text-2xl font-extrabold text-[#0f2e4f]">
        Solicitud enviada
      </h2>

      <p className="mb-7 text-sm leading-relaxed text-gray-600">
        Tu solicitud de cotización fue enviada correctamente. Nuestro equipo
        revisará la información y se pondrá en contacto contigo.
      </p>

      <button
        type="button"
        onClick={() => setModalExito(false)}
        className="w-full rounded-full bg-[#0f2e4f] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#173f73]"
      >
        Aceptar
      </button>
    </div>
  </div>
)}
    </main>
  );
}