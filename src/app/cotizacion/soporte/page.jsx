"use client";

import Link from "next/link";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../lib/firebase";

export default function SoporteTecnico() {
  const [formData, setFormData] = useState({
    nombreEmpresa: "",
    correo: "",
    telefono: "",
    tipoEquipo: "",
    marcaModelo: "",
    tipoFalla: "",
    fechaProblema: "",
    equipoDetenido: "",
    descripcionProblema: "",
    comentarios: "",
  });

  const [archivoAdjunto, setArchivoAdjunto] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setMensajeError("");
  };

  const handleFileChange = (e) => {
    setArchivoAdjunto(e.target.files[0]);
    setMensajeError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nombreEmpresa.trim() ||
      !formData.correo.trim() ||
      !formData.telefono.trim() ||
      !formData.tipoEquipo ||
      !formData.tipoFalla ||
      !formData.descripcionProblema.trim()
    ) {
      setMensajeError(
        "Por favor completa todos los campos obligatorios antes de enviar la solicitud."
      );
      return;
    }

    try {
      setEnviando(true);
      setMensajeError("");

      let archivoUrl = "";

      if (archivoAdjunto) {
        const archivoRef = ref(
          storage,
          `soporte-archivos/${Date.now()}-${archivoAdjunto.name}`
        );

        await uploadBytes(archivoRef, archivoAdjunto);
        archivoUrl = await getDownloadURL(archivoRef);
      }

      await addDoc(collection(db, "cotizaciones"), {
        categoria: "Soporte",

        nombreEmpresa: formData.nombreEmpresa,
        correo: formData.correo,
        telefono: formData.telefono,

        tipoEquipo: formData.tipoEquipo,
        marcaModelo: formData.marcaModelo,
        tipoFalla: formData.tipoFalla,

        fechaProblema: formData.fechaProblema,
        equipoDetenido: formData.equipoDetenido,

        descripcionProblema: formData.descripcionProblema,
        archivoAdjunto: archivoUrl,
        comentarios: formData.comentarios,

        estado: "Nueva",
        fecha: serverTimestamp(),
      });

      alert("Solicitud enviada correctamente");

      setFormData({
        nombreEmpresa: "",
        correo: "",
        telefono: "",
        tipoEquipo: "",
        marcaModelo: "",
        tipoFalla: "",
        fechaProblema: "",
        equipoDetenido: "",
        descripcionProblema: "",
        comentarios: "",
      });

      setArchivoAdjunto(null);
    } catch (error) {
      console.log(error);
      setMensajeError("Ocurrió un error al enviar la solicitud.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <section className="max-w-6xl mx-auto bg-white border-2 px-10 py-8">
        <div className="flex items-center gap-6 mb-8">
          <img
            src="/img/soporte.png"
            alt="Soporte técnico"
            className="w-24 h-24 object-contain"
          />

          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2e4f]">
              Solicitar diagnóstico técnico
            </h1>

            <p className="text-gray-800 mt-2">
              Déjanos tus datos y cuéntanos sobre el problema que tiene su equipo
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
                Tipo de equipo <span className="text-orange-500">*</span>
              </label>

              <select
                name="tipoEquipo"
                value={formData.tipoEquipo}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
              >
                <option value="">Seleccione una opción</option>
                <option value="impresora">Impresora de etiquetas</option>
                <option value="lector">Lector de código de barras</option>
                <option value="terminal">Terminal de captura de datos</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Marca y modelo
              </label>

              <input
                type="text"
                name="marcaModelo"
                value={formData.marcaModelo}
                onChange={handleChange}
                placeholder="Ej. Zebra ZT410"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Tipo de falla <span className="text-orange-500">*</span>
              </label>

              <select
                name="tipoFalla"
                value={formData.tipoFalla}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
              >
                <option value="">Seleccione una opción</option>
                <option value="no_imprime">No imprime</option>
                <option value="borrosa">Impresión borrosa</option>
                <option value="ribbon">Problema con ribbon</option>
                <option value="etiquetas">Problema con etiquetas</option>
                <option value="conexion">Falla de conexión</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                ¿Desde cuándo presenta el problema?
              </label>

              <input
                type="date"
                name="fechaProblema"
                value={formData.fechaProblema}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                ¿El equipo está detenido?
              </label>

              <div className="flex gap-5 mt-3 text-sm text-gray-700">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="equipoDetenido"
                    value="Si"
                    checked={formData.equipoDetenido === "Si"}
                    onChange={handleChange}
                  />
                  Sí
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="equipoDetenido"
                    value="No"
                    checked={formData.equipoDetenido === "No"}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm text-black font-semibold">
              Descripción del problema <span className="text-orange-500">*</span>
            </label>

            <textarea
              rows={5}
              name="descripcionProblema"
              value={formData.descripcionProblema}
              onChange={handleChange}
              placeholder="Cuéntanos con detalle qué sucede con el equipo"
              className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 resize-none placeholder:text-gray-500 text-gray-900"
            ></textarea>

            <div className="mt-4">
              <label className="text-sm text-black font-semibold block mb-2">
                Adjuntar imagen o video
              </label>

              <label
                htmlFor="archivoAdjunto"
                className="flex flex-col items-center justify-center w-full border-2 border-dashed border-[#6B8FB1] rounded-2xl bg-white hover:bg-blue-50 transition-all duration-300 cursor-pointer px-6 py-10 shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-14 h-14 text-[#0f2e4f] mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16V4m0 0l-4 4m4-4l4 4M4 16.5v1.25A2.25 2.25 0 006.25 20h11.5A2.25 2.25 0 0020 17.75V16.5"
                  />
                </svg>

                <span className="text-[#0f2e4f] font-semibold text-base text-center">
                  Haz clic para subir un archivo
                </span>

                <span className="text-gray-500 text-sm mt-1 text-center">
                  Adjunta una imagen o video del problema
                </span>

                <span className="text-gray-400 text-xs mt-2">
                  PNG, JPG, MP4, MOV
                </span>

                {archivoAdjunto && (
                  <div className="mt-5 bg-blue-100 text-[#0f2e4f] px-4 py-2 rounded-full text-sm font-medium text-center break-all">
                    {archivoAdjunto.name}
                  </div>
                )}
              </label>

              <input
                id="archivoAdjunto"
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <p className="text-xs text-gray-500 mt-2">
                Puedes adjuntar evidencia visual del problema.
              </p>
            </div>
          </div>

          <div>
            <label className="text-sm text-black font-semibold">
              Comentarios adicionales
            </label>

            <input
              type="text"
              name="comentarios"
              value={formData.comentarios}
              onChange={handleChange}
              placeholder="Comentarios adicionales que nos pueden ayudar"
              className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"
            />
          </div>

          {mensajeError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium">
              {mensajeError}
            </div>
          )}

          <div className="flex justify-end gap-7 pt-4">
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
              {enviando ? "Enviando..." : "Enviar solicitud"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}