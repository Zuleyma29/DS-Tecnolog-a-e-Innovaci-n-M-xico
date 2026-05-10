"use client";

import Link from "next/link";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../lib/firebase";

export default function SolucionEtiquetado() {
  const [formData, setFormData] = useState({
    nombreEmpresa: "",
    correo: "",
    telefono: "",
    producto: "",
    industria: "",
    material: "",
    medidas: "",
    cantidad: "",
    tipoImpresion: "",
    cuentaDiseno: "",
    requiereRibbon: "",
    requiereImpresora: "",
    comentarios: "",
  });

  const [archivoDiseno, setArchivoDiseno] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setMensajeError("");

    if (name === "cuentaDiseno" && value === "No") {
      setArchivoDiseno(null);
    }
  };

  const handleFileChange = (e) => {
    setArchivoDiseno(e.target.files[0]);
    setMensajeError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nombreEmpresa.trim() ||
      !formData.correo.trim() ||
      !formData.telefono.trim() ||
      !formData.producto.trim() ||
      !formData.industria ||
      !formData.material ||
      !formData.medidas.trim() ||
      !formData.cantidad ||
      !formData.tipoImpresion
    ) {
      setMensajeError(
        "Por favor completa todos los campos obligatorios antes de enviar la solicitud."
      );
      return;
    }

    if (Number(formData.cantidad) <= 0) {
      setMensajeError("La cantidad requerida debe ser mayor a 0.");
      return;
    }

    try {
      setEnviando(true);
      setMensajeError("");

      let urlDiseno = "";

      if (formData.cuentaDiseno === "Si" && archivoDiseno) {
        const archivoRef = ref(
          storage,
          `disenos-etiquetas/${Date.now()}-${archivoDiseno.name}`
        );

        await uploadBytes(archivoRef, archivoDiseno);
        urlDiseno = await getDownloadURL(archivoRef);
      }

      await addDoc(collection(db, "cotizaciones"), {
        tipoServicio: "Etiquetado",

        nombreEmpresa: formData.nombreEmpresa,
        correo: formData.correo,
        telefono: formData.telefono,

        producto: formData.producto,
        industria: formData.industria,

        material: formData.material,
        medidas: formData.medidas,
        cantidad: formData.cantidad,

        tipoImpresion: formData.tipoImpresion,
        cuentaDiseno: formData.cuentaDiseno,
        disenoEtiquetaUrl: urlDiseno,

        requiereRibbon: formData.requiereRibbon,
        requiereImpresora: formData.requiereImpresora,

        comentarios: formData.comentarios,

        estado: "Nueva",
        fecha: serverTimestamp(),
      });

      alert("Solicitud enviada correctamente");

      setFormData({
        nombreEmpresa: "",
        correo: "",
        telefono: "",
        producto: "",
        industria: "",
        material: "",
        medidas: "",
        cantidad: "",
        tipoImpresion: "",
        cuentaDiseno: "",
        requiereRibbon: "",
        requiereImpresora: "",
        comentarios: "",
      });

      setArchivoDiseno(null);
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
            src="/img/etiquetado.png"
            alt="Solución de etiquetado"
            className="w-24 h-24 object-contain"
          />

          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2e4f]">
              Cotizar solución de etiquetado
            </h1>

            <p className="text-gray-800 mt-2">
              Proporciónanos los detalles de tu proyecto y te enviamos una
              cotización personalizada
            </p>
          </div>
        </div>

        <div className="border-t border-gray-300 mb-6"></div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-extrabold italic text-blue-800">
            Datos generales
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3">
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
          </div>

          <h2 className="text-lg font-extrabold italic text-blue-800 pt-1">
            Sobre el producto
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <label className="text-sm text-black font-semibold">
                ¿Qué producto vas a etiquetar?{" "}
                <span className="text-orange-500">*</span>
              </label>

              <input
                type="text"
                name="producto"
                value={formData.producto}
                onChange={handleChange}
                placeholder="Describe el producto"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Industria <span className="text-orange-500">*</span>
              </label>

              <select
                name="industria"
                value={formData.industria}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
              >
                <option value="">Seleccione una opción</option>
                <option value="alimentos">Alimentos</option>
                <option value="quimica">Química</option>
                <option value="agroquimica">Agroquímica</option>
                <option value="metalmecanica">Metalmecánica</option>
                <option value="papel">Papel</option>
                <option value="otra">Otra</option>
              </select>
            </div>
          </div>

          <h2 className="text-lg font-extrabold italic text-blue-800 pt-1">
            Sobre la etiqueta
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3">
            <div>
              <label className="text-sm text-black font-semibold">
                Material <span className="text-orange-500">*</span>
              </label>

              <select
                name="material"
                value={formData.material}
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
                Medidas ancho y alto <span className="text-orange-500">*</span>
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
                Cantidad requerida <span className="text-orange-500">*</span>
              </label>

              <input
                type="number"
                min="1"
                step="1"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                placeholder="Ej. 10000"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"
              />
            </div>
          </div>

          <h2 className="text-lg font-extrabold italic text-blue-800 pt-1">
            Sobre impresión
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3 items-start">
            <div>
              <label className="text-sm text-black font-semibold">
                Tipo de impresión <span className="text-orange-500">*</span>
              </label>

              <select
                name="tipoImpresion"
                value={formData.tipoImpresion}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
              >
                <option value="">Seleccione una opción</option>
                <option value="termica_directa">Térmica directa</option>
                <option value="transferencia_termica">
                  Transferencia térmica
                </option>
                <option value="inyeccion_tinta">Inyección de tinta</option>
                <option value="otra">Otra</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                ¿Ya cuenta con algún diseño?
              </label>

              <div className="flex gap-5 mt-3 text-sm text-gray-700">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="cuentaDiseno"
                    value="Si"
                    checked={formData.cuentaDiseno === "Si"}
                    onChange={handleChange}
                  />
                  Sí
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="cuentaDiseno"
                    value="No"
                    checked={formData.cuentaDiseno === "No"}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>

              {formData.cuentaDiseno === "Si" && (
                <div className="mt-4">
                  <label className="text-sm text-black font-semibold block mb-2">
                    Subir diseño de etiqueta
                  </label>

                  <label
                    htmlFor="archivoDiseno"
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
                      Haz clic para subir el diseño
                    </span>

                    <span className="text-gray-500 text-sm mt-1 text-center">
                      Adjunta una imagen del diseño de la etiqueta
                    </span>

                    <span className="text-gray-400 text-xs mt-2">
                      PNG, JPG o JPEG
                    </span>

                    {archivoDiseno && (
                      <div className="mt-5 bg-blue-100 text-[#0f2e4f] px-4 py-2 rounded-full text-sm font-medium text-center break-all max-w-full">
                        {archivoDiseno.name}
                      </div>
                    )}
                  </label>

                  <input
                    id="archivoDiseno"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <p className="text-xs text-gray-500 mt-2">
                    Este archivo ayudará a revisar medidas, colores y
                    distribución del diseño.
                  </p>
                </div>
              )}
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
                placeholder="Información adicional que nos puede ayudar"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                ¿Requiere ribbon?
              </label>

              <div className="flex gap-5 mt-3 text-sm text-gray-700">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="requiereRibbon"
                    value="Si"
                    checked={formData.requiereRibbon === "Si"}
                    onChange={handleChange}
                  />
                  Sí
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="requiereRibbon"
                    value="No"
                    checked={formData.requiereRibbon === "No"}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                ¿Requiere impresora?
              </label>

              <div className="flex gap-5 mt-3 text-sm text-gray-700">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="requiereImpresora"
                    value="Si"
                    checked={formData.requiereImpresora === "Si"}
                    onChange={handleChange}
                  />
                  Sí
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="requiereImpresora"
                    value="No"
                    checked={formData.requiereImpresora === "No"}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          {mensajeError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium">
              {mensajeError}
            </div>
          )}

          <div className="flex justify-end gap-7 pt-5">
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