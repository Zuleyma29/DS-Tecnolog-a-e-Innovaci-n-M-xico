import Link from "next/link";
import { Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="justify-self-start w-full text-left">
          <h2 className="text-xl font-bold mb-4">Data Solutions</h2>
          <p className="text-sm leading-relaxed text-gray-300">
            Ofrecemos soluciones en etiquetado industrial y captura de datos,
            enfocadas en optimizar procesos mediante tecnología eficiente y de
            alta calidad.
          </p>
        </div>

        <div className="justify-self-center text-center">
          <h3 className="font-semibold mb-4">Enlaces</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            
            <li>
              <Link href="/nosotros" className="hover:text-white transition">
                Nosotros
              </Link>
            </li>

            <li>
              <Link href="/servicios" className="hover:text-white transition">
                Servicios
              </Link>
            </li>

            <li>
              <Link href="/contacto" className="hover:text-white transition">
                Contacto
              </Link>
            </li>

          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Contacto</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>📍Av. Juárez No. 413, Col. Centro C.P. 90300, Apizaco, Tlaxcala</li>
            <li>📞 +52 241 4172012 / +52 241 417 16 47</li>
            <li>✉️ ventas@dstecnologia.com.mx / jorge.cervantes@prodigy.net.mx</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-slate-700 py-4 px-6">
        <div className="max-w-7xl mx-auto relative flex items-center justify-center text-sm text-gray-400">
          <p className="text-center">© 2026 DS Tecnología e Innovación México. Todos los derechos reservados.</p>

          <Link
            href="/admin"
            className="absolute right-0 flex items-center gap-2 hover:text-white transition">
            <Lock size={16} />
            <span>Acceso interno</span>
          </Link>
         </div>
      </div>

    </footer>
  );
}