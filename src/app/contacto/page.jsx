import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Contacto() {
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

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full bg-gray-100 rounded-xl px-4 py-4 outline-none text-gray-700 focus:ring-2 focus:ring-blue-300"/>

                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="w-full bg-gray-100 rounded-xl px-4 py-4 outline-none text-gray-700 focus:ring-2 focus:ring-blue-300"/>
              </div>

              <input
                type="text"
                placeholder="Asunto"
                className="w-full bg-gray-100 rounded-xl px-4 py-4 outline-none text-gray-700 focus:ring-2 focus:ring-blue-300"/>

              <textarea
                placeholder="Escribe tu mensaje"
                rows="6"
                className="w-full bg-gray-100 rounded-xl px-4 py-4 outline-none text-gray-700 resize-none focus:ring-2 focus:ring-blue-300"></textarea>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-[#6B8FB1] text-white font-semibold px-10 py-3 rounded-full shadow-md hover:bg-blue-400 hover:shadow-lg transition duration-300 inline-block">
                  Enviar
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
                    ventas@dstecnologia.com.mx  <br />
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
                    (241) 417 20 12  <br />
                    (241) 417 16 47
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-10 border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-500">
                Horario de atención
              </p>
              <p className="font-semibold text-gray-800">
                Lunes a viernes de 9:00 a.m. a 6:00 p.m.
              </p>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}