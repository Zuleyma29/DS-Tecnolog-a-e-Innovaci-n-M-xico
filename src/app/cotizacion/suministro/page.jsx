"use client";

import Link from "next/link";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function ProgramaSuministro() {
  const [formData, setFormData] = useState({
    nombreEmpresa: "",
    correo: "",
    telefono: "",
    producto: "",
    tipoEtiqueta: "",
    medidas: "",
    cantidad: "",
    frecuenciaCompra: "",
    entregasProgramadas: "",
    ubicacionEntrega: "",
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
      !formData.producto ||
      !formData.frecuenciaCompra
    ) {
      setMensajeError(
        "Por favor completa todos los campos obligatorios antes de enviar la solicitud."
      );
      return;
    }

    try {
      setEnviando(true);
      setMensajeError("");

      await addDoc(collection(db, "cotizaciones"), {
        categoria: "Suministro",

        nombreEmpresa: formData.nombreEmpresa,
        correo: formData.correo,
        telefono: formData.telefono,

        producto: formData.producto,
        tipoEtiqueta: formData.tipoEtiqueta,

        medidas: formData.medidas,
        cantidad: formData.cantidad,

        frecuenciaCompra: formData.frecuenciaCompra,
        entregasProgramadas: formData.entregasProgramadas,

        ubicacionEntrega: formData.ubicacionEntrega,
        comentarios: formData.comentarios,

        estado: "Nueva",
        fecha: serverTimestamp(),
      });

      setModalExito(true);

      setFormData({
        nombreEmpresa: "",
        correo: "",
        telefono: "",
        producto: "",
        tipoEtiqueta: "",
        medidas: "",
        cantidad: "",
        frecuenciaCompra: "",
        entregasProgramadas: "",
        ubicacionEntrega: "",
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
      <section className="max-w-6xl mx-auto bg-white border-2 px-10 py-8">
        <div className="flex items-center gap-6 mb-10">
          <img
            src="/img/suministro.png"
            alt="Programa de suministro"
            className="w-24 h-24 object-contain"
          />

          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2e4f]">
              Programa de suministro
            </h1>

            <p className="text-gray-800 mt-2">
              Cuéntanos qué productos necesitas y diseñaremos un programa de
              suministro a tu medida
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
                Producto requerido <span className="text-orange-500">*</span>
              </label>

              <select
                name="producto"
                value={formData.producto}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
              >
                <option value="">Seleccione una opción</option>
                <option value="etiquetas">Etiquetas en rollo</option>
                <option value="ribbon">Ribbon</option>
                <option value="cartuchos">Cartuchos de tinta</option>
                <option value="impresoras">Impresoras de etiquetas</option>
                <option value="lectores">Lectores de código de barras</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2">
            <div>
              <label className="text-sm text-black font-semibold">
                Tipo de etiqueta
              </label>

              <select
                name="tipoEtiqueta"
                value={formData.tipoEtiqueta}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
              >
                <option value="">Seleccione una opción</option>
                <option value="papel">Papel</option>
                <option value="poliester">Poliéster</option>
                <option value="polipropileno">Polipropileno</option>
                <option value="biodegradable">Biodegradable</option>
                <option value="especial">Material especial</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Medidas
              </label>

              <input
                type="text"
                name="medidas"
                value={formData.medidas}
                onChange={handleChange}
                placeholder="Ej. 4 x 6 cm"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Cantidad estimada (Millares)
              </label>

              <input
                type="text"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                placeholder="Ej. 500"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Frecuencia de compra <span className="text-orange-500">*</span>
              </label>

              <select
                name="frecuenciaCompra"
                value={formData.frecuenciaCompra}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
              >
                <option value="">Seleccione una opción</option>
                <option value="semanal">Semanal</option>
                <option value="quincenal">Quincenal</option>
                <option value="mensual">Mensual</option>
                <option value="bimestral">Bimestral</option>
                <option value="ocasional">Ocasional</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                ¿Requiere entregas programadas?
              </label>

              <div className="flex gap-6 mt-3 text-sm text-gray-700">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="entregasProgramadas"
                    value="Si"
                    checked={formData.entregasProgramadas === "Si"}
                    onChange={handleChange}
                  />
                  Sí
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="entregasProgramadas"
                    value="No"
                    checked={formData.entregasProgramadas === "No"}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Ubicación de entrega
              </label>

              <input
                type="text"
                name="ubicacionEntrega"
                value={formData.ubicacionEntrega}
                onChange={handleChange}
                placeholder="Ciudad"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-black font-semibold">
              Comentarios adicionales
            </label>

            <textarea
              rows={5}
              name="comentarios"
              value={formData.comentarios}
              onChange={handleChange}
              placeholder="Cuéntanos algo más sobre tus necesidades"
              className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 resize-none placeholder:text-gray-500 text-gray-900"
            ></textarea>
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