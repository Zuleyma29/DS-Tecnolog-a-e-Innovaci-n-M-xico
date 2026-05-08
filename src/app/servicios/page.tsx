  import Link from "next/link";

export default function Servicios() {
  return (
    <section className="bg-gray-100 py-16 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0f2e4f]">
          Nuestros servicios especializados
        </h2>

        <p className="text-center text-gray-600 mt-4 mb-12 italic">
          Soluciones diseñadas para optimizar tus procesos industriales y mejorar la eficiencia operativa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          
          <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4 mb-4">
              <img src="/img/soporte.png" className="w-10 h-10" />
              <h3 className="text-lg font-bold text-[#0f2e4f]">
                Soporte Técnico
              </h3>
            </div>

            <p className="text-gray-600 text-sm mb-6">
              Nuestro equipo de expertos ofrece soporte técnico para asegurar el óptimo funcionamiento de sus equipos de impresión de etiquetas.
            </p>

            <div className="flex justify-end">
              <Link href="/cotizacion/soporte"
              className="bg-[#869fb8] text-black px-5 py-2 rounded-full text-sm hover:bg-blue-200 transition">
                Solicitar diagnóstico
              </Link>
            </div> 

          </div>

         
          <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4 mb-4">
              <img src="/img/poliza.png" className="w-10 h-10" />
              <h3 className="text-lg font-bold text-[#0f2e4f]">
                Pólizas de Mantenimiento
              </h3>
            </div>

            <p className="text-gray-600 text-sm mb-6">
              Ofrecemos pólizas de mantenimiento personalizadas para garantizar la continuidad y eficiencia de sus operaciones.
            </p>

            <div className="flex justify-end">
              <Link href="/cotizacion/poliza"
              className="bg-[#869fb8] text-black px-5 py-2 rounded-full text-sm hover:bg-blue-200 transition">
                Solicitar cotización
             </Link>
            </div>
          </div>

          
          <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4 mb-4">
              <img src="/img/suministro.png" className="w-10 h-10" />
              <h3 className="text-lg font-bold text-[#0f2e4f]">
                Programas de Suministro
              </h3>
            </div>

            <p className="text-gray-600 text-sm mb-6">
              Establecemos programas de suministro de acuerdo a los requerimientos específicos de nuestros clientes, asegurando la entrega oportuna.
            </p>

            <div className="flex justify-end">
              <Link href="/cotizacion/suministro"
              className="bg-[#869fb8] text-black px-5 py-2 rounded-full text-sm hover:bg-blue-200 transition">
                Solicitar cotización
              </Link>
            </div>
          </div>

          
          <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4 mb-4">
              <img src="/img/etiquetado.png" className="w-10 h-10" />
              <h3 className="text-lg font-bold text-[#0f2e4f]">
                Soluciones de Etiquetado
              </h3>
            </div>

            <p className="text-gray-600 text-sm mb-6">
              Ofrecemos soluciones de etiquetado personalizadas utilizando materiales comunes y especiales, así como formulaciones de ribbon.
            </p>

              <div className="flex justify-end">
                <Link href="/cotizacion/etiquetado"
                className="bg-[#869fb8] text-black px-5 py-2 rounded-full text-sm hover:bg-blue-200 transition">
                  Solicitar cotización
                </Link>
              </div>
          </div>

        </div>
      </div>
    </section>
  );
}