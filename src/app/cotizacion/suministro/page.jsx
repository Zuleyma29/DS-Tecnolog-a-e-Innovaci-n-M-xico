import Link from "next/link";

export default function ProgramaSuministro() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <section className="max-w-6xl mx-auto bg-white border-2 px-10 py-8">
        
        <div className="flex items-center gap-6 mb-10">
          <img
            src="/img/suministro.png"
            alt="Programa de suministro"
            className="w-24 h-24 object-contain"/>

          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2e4f]">
              Programa de suministro
            </h1>
            <p className="text-gray-800 mt-2">
              Cuéntanos qué productos necesitas y diseñaremos un programa de suministro a tu medida
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
                Producto requerido <span className="text-orange-500">*</span>
              </label>
              <select
                defaultValue=""
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer">
                <option value="" disabled>
                  Seleccione una opción
                </option>
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
                defaultValue=""
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer">
                <option value="" disabled>
                  Seleccione una opción
                </option>
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
                placeholder="Ej. 4 x 6 cm"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"/>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Cantidad estimada (Millares)
              </label>
              <input
                type="text"
                placeholder="Ej. 500"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"/>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Frecuencia de compra <span className="text-orange-500">*</span>
              </label>
              <select
                defaultValue=""
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer">
                <option value="" disabled>
                  Seleccione una opción
                </option>
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
                  <input type="radio" name="entregasProgramadas" />
                  Sí
                </label>

                <label className="flex items-center gap-2">
                  <input type="radio" name="entregasProgramadas" />
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
                placeholder="Ciudad"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"/>
            </div>
          </div>

          <div>
            <label className="text-sm text-black font-semibold">
              Comentarios adicionales
            </label>
            <textarea
              rows={5}
              placeholder="Cuéntanos algo más sobre tus necesidades"
              className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 resize-none placeholder:text-gray-500 text-gray-900"></textarea>
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