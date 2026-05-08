import Link from "next/link";

export default function SoporteTecnico() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <section className="max-w-6xl mx-auto bg-white border-2 px-10 py-8">
        
        <div className="flex items-center gap-6 mb-8">
          <img
            src="/img/soporte.png"
            alt="Soporte técnico"
            className="w-24 h-24 object-contain"/>

          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2e4f]">
              Solicitar diagnóstico técnico
            </h1>
            <p className="text-gray-800 mt-2">
              Déjanos tus datos y cuéntanos sobre el problema que tiene su equipo
            </p>
          </div>
        </div>

        <form className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            
            <div>
              <label className="text-sm text-black font-semibold">
                Nombre / Empresa <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Escribe tu nombre o empresa"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"/>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Correo electronico <span className="text-orange-500">*</span>
              </label>
              <input
                type="email"
                placeholder="ejemplo@gmail.com"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"/>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Teléfono <span className="text-orange-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="(241) 215 23 25"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"/>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Tipo de equipo <span className="text-orange-500">*</span>
              </label>

              <select
                defaultValue=""
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer">
                <option value="" disabled>
                  Seleccione una opción
                </option>
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
                placeholder="Ej. Zebra ZT410"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"/>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Tipo de falla <span className="text-orange-500">*</span>
              </label>

              <select
                defaultValue=""
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer">
                <option value="" disabled>
                  Seleccione una opción
                </option>
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
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 text-gray-900"/>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                ¿El equipo está detenido?
              </label>

              <div className="flex gap-5 mt-3 text-sm text-gray-700">
                <label className="flex items-center gap-2">
                  <input type="radio" name="equipoDetenido" />
                  Sí
                </label>

                <label className="flex items-center gap-2">
                  <input type="radio" name="equipoDetenido" />
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
              placeholder="Cuéntanos con detalle que sucede con el equipo"
              className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 resize-none placeholder:text-gray-500 text-gray-900"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 items-center">
            <label className="text-sm text-black font-semibold">
              Adjuntar imagen o video
            </label>

            <div>
              <input type="file" id="archivo" className="hidden" />

              <label
                htmlFor="archivo"
                className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded cursor-pointer hover:bg-gray-300 transition text-sm">
                Seleccionar archivo
              </label>
            </div>
          </div>

          <div>
            <label className="text-sm text-black font-semibold">
              Comentarios adicionales
            </label>
            <input
              type="text"
              placeholder="Comentarios adicionales que nos pueden ayudar"
              className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"/>
          </div>

      
          <div className="flex justify-end gap-7 pt-4">
            <Link
              href="/servicios"
              className="bg-[#6B8FB1] text-white font-semibold px-10 py-3 rounded-full shadow-md hover:bg-blue-400 hover:shadow-lg transition duration-300 inline-block">
              Cancelar
            </Link>


            <button
              type="submit"
              className="bg-[#6B8FB1] text-white font-semibold px-10 py-3 rounded-full shadow-md hover:bg-blue-400 hover:shadow-lg transition duration-300 inline-block">
              Enviar solicitud
            </button>

          </div>

        </form>
      </section>
    </main>
  );
}