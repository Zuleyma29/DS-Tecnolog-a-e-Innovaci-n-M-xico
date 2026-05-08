import Link from "next/link";

export default function SolucionEtiquetado() {
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
              Proporciónanos los detalles de tu proyecto y te enviamos una cotización personalizada
            </p>
          </div>
        </div>

        <div className="border-t border-gray-300 mb-6"></div>

        <form className="space-y-4">
          
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
                placeholder="Escribe tu nombre o empresa"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Correo electronico <span className="text-orange-500">*</span>
              </label>
              <input
                type="email"
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
                ¿Qué producto vas a etiquetar? <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Describe el producto"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Industria <span className="text-orange-500">*</span>
              </label>
              <select
                defaultValue=""
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
              >
                <option value="" disabled>
                  Seleccione una opción
                </option>
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
                defaultValue=""
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
              >
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
                Medidas (ancho y alto) <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
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
                min="0"
                step="1"
                placeholder="Ej. 10000"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"
              />
            </div>
          </div>

          <h2 className="text-lg font-extrabold italic text-blue-800 pt-1">
            Sobre impresión
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3 items-end">
            <div>
              <label className="text-sm text-black font-semibold">
                Tipo de impresión <span className="text-orange-500">*</span>
              </label>
              <select
                defaultValue=""
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
              >
                <option value="" disabled>
                  Seleccione una opción
                </option>
                <option value="termica_directa">Térmica directa</option>
                <option value="transferencia_termica">Transferencia térmica</option>
                <option value="inyeccion_tinta">Inyección de tinta</option>
                <option value="otra">Otra</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                ¿Ya cuenta con algun diseño? <span className="text-orange-500">*</span>
              </label>

              <div className="flex gap-5 mt-3 text-sm text-gray-700">
                <label className="flex items-center gap-2">
                  <input type="radio" name="cuentaDiseno" />
                  Sí
                </label>

                <label className="flex items-center gap-2">
                  <input type="radio" name="cuentaDiseno" />
                  No
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Adjuntar diseño (opcional)
              </label>

              <input type="file" id="diseno" className="hidden" />

              <label
                htmlFor="diseno"
                className="block w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-100 transition">
                Subir Archivo
              </label>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                ¿Requiere ribbon? <span className="text-orange-500">*</span>
              </label>

              <div className="flex gap-5 mt-3 text-sm text-gray-700">
                <label className="flex items-center gap-2">
                  <input type="radio" name="requiereRibbon" />
                  Sí
                </label>

                <label className="flex items-center gap-2">
                  <input type="radio" name="requiereRibbon" />
                  No
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                ¿Requiere impresora? <span className="text-orange-500">*</span>
              </label>

              <div className="flex gap-5 mt-3 text-sm text-gray-700">
                <label className="flex items-center gap-2">
                  <input type="radio" name="requiereImpresora" />
                  Sí
                </label>

                <label className="flex items-center gap-2">
                  <input type="radio" name="requiereImpresora" />
                  No
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Comentarios adicionales
              </label>
              <input
                type="text"
                placeholder="Información adicional que nos puede ayudar"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"
              />
            </div>
          </div>

          <div className="flex justify-end gap-7 pt-5">

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