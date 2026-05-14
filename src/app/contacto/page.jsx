"use client";

import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    asunto: "",
    mensaje: "",
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
      !formData.nombre.trim() ||
      !formData.correo.trim() ||
      !formData.asunto.trim() ||
      !formData.mensaje.trim()
    ) {
      setMensajeError("Por favor completa todos los campos antes de enviar el mensaje.");
      return;
    }

    try {
      setEnviando(true);
      setMensajeError("");

      await addDoc(collection(db, "mensajes"), {
        nombre: formData.nombre,
        correo: formData.correo,
        asunto: formData.asunto,
        mensaje: formData.mensaje,
        estado: "Nuevo",
        fecha: serverTimestamp(),
      });

      setModalExito(true);

      setFormData({
        nombre: "",
        correo: "",
        asunto: "",
        mensaje: "",
      });
    } catch (error) {
      console.log(error);
      setMensajeError("Ocurrió un error al enviar el mensaje. Inténtalo nuevamente.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen">
      <section className="w-full h-80">
        <iframe
          src="https://www.google.com/maps?q=Av.%20Juarez%20No.%20413,%20Centro,%20Apizaco,%20Tlaxcala&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0f2e4f] mb-4">
              Contáctenos
            </h1>

            <p className="text-gray-500 mb-8">
              Déjanos tu consulta y nos pondremos en contacto contigo lo antes posible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Nombre completo"
                  className="w-full bg-gray-100 rounded-xl px-4 py-4 outline-none text-gray-700 focus:ring-2 focus:ring-blue-300"
                />

                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="Correo electrónico"
                  className="w-full bg-gray-100 rounded-xl px-4 py-4 outline-none text-gray-700 focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <input
                type="text"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                placeholder="Asunto"
                className="w-full bg-gray-100 rounded-xl px-4 py-4 outline-none text-gray-700 focus:ring-2 focus:ring-blue-300"
              />

              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Escribe tu mensaje"
                rows="6"
                className="w-full bg-gray-100 rounded-xl px-4 py-4 outline-none text-gray-700 resize-none focus:ring-2 focus:ring-blue-300"
              ></textarea>

              {mensajeError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium">
                  {mensajeError}
                </div>
              )}

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={enviando}
                  className="bg-[#6B8FB1] text-white font-semibold px-10 py-3 rounded-full shadow-md hover:bg-blue-400 hover:shadow-lg transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {enviando ? "Enviando..." : "Enviar"}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white text-gray-800 rounded-2xl shadow-lg p-8 lg:mt-12 border border-gray-100 max-w-xl mx-auto">
            <p className="text-xl md:text-2xl font-bold text-[#0f2e4f] mb-4">
              Información de contacto
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <MapPin size={20} />
                </div>

                <div>
                  <h3 className="font-semibold">Dirección</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Av. Juárez No. 413, Col. Centro <br />
                    C.P. 90300, Apizaco, Tlaxcala
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Mail size={20} />
                </div>

                <div>
                  <h3 className="font-semibold">Correo</h3>
                  <p className="text-gray-600 text-sm">
                    ventas@dstecnologia.com.mx <br />
                    jorge.cervantes@prodigy.net.mx
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Phone size={20} />
                </div>

                <div>
                  <h3 className="font-semibold">Teléfono</h3>
                  <p className="text-gray-600 text-sm">
                    (241) 417 20 12 <br />
                    (241) 417 16 47
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-500">Horario de atención</p>
              <p className="font-semibold text-gray-800">
                Lunes a viernes de 9:00 a.m. a 6:00 p.m.
              </p>
            </div>
          </div>
        </div>
      </section>

      {modalExito && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-extrabold text-[#0f2e4f] mb-3">
              Mensaje enviado
            </h2>

            <p className="text-gray-600 leading-relaxed mb-8">
              Tu mensaje fue enviado correctamente. Nuestro equipo revisará tu
              solicitud y se pondrá en contacto contigo lo antes posible.
            </p>

            <button
              type="button"
              onClick={() => setModalExito(false)}
              className="w-full bg-[#0f2e4f] text-white py-3 rounded-full font-semibold shadow-md hover:bg-[#173f73] transition duration-300"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}