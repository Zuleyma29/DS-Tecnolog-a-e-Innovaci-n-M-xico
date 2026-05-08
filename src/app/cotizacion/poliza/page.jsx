import Link from "next/link";

export default function PolizaMantenimiento() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <section className="max-w-6xl mx-auto bg-white border-2 px-10 py-10">
        
        <div className="flex items-center gap-6 mb-12">
          <img
            src="/img/poliza.png"
            alt="Póliza de mantenimiento"
            className="w-24 h-24 object-contain"
          />

          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2e4f]">
              Solicitar cotizacion de Poliza de Mantenimiento
            </h1>
            <p className="text-gray-800 mt-2">
              Completa la información y te enviamos una propuesta personalizada para tu empresa
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

            <div>
            <label className="text-sm text-black font-semibold">
                Números de equipos <span className="text-orange-500">*</span>
            </label>
            <input
                type="number"
                min="0"
                placeholder="Ej. 5"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"/>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Tipo de equipo <span className="text-orange-500">*</span>
              </label>
              <select
                defaultValue=""
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
              >
                <option value="" disabled>
                  Seleccione una opción
                </option>
                <option value="impresoras">Impresoras de etiquetas</option>
                <option value="lectores">Lectores de código de barras</option>
                <option value="terminales">Terminales de captura de datos</option>
                <option value="mixto">Equipo mixto</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Ubicación de la empresa <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Ciudad o dirección"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 placeholder:text-gray-500 text-gray-900"
              />
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Frecuencia deseada <span className="text-orange-500">*</span>
              </label>
              <select
                defaultValue=""
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
              >
                <option value="" disabled>
                  Seleccione una opción
                </option>
                <option value="mensual">Mensual</option>
                <option value="bimestral">Bimestral</option>
                <option value="trimestral">Trimestral</option>
                <option value="semestral">Semestral</option>
                <option value="anual">Anual</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Tipo de servicio <span className="text-orange-500">*</span>
              </label>
              <select
                defaultValue=""
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
              >
                <option value="" disabled>
                  Seleccione una opción
                </option>
                <option value="preventivo">Preventivo</option>
                <option value="correctivo">Correctivo</option>
                <option value="ambos">Ambos</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Horarios preferido de atención <span className="text-orange-500">*</span>
              </label>
              <select
                defaultValue=""
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-900 shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
              >
                <option value="" disabled>
                  Seleccione una opción
                </option>
                <option value="manana">9:00 AM - 11:00 AM</option>
                <option value="tarde">11:00 AM - 1:00 PM </option>
                <option value="horario_laboral">1:00 PM - 3:00 PM </option>
                <option value="fin_semana"> 3:00 PM - 5:00 PM</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-black font-semibold">
                Comentarios adicionales
              </label>
              <textarea
                rows={4}
                placeholder="Cuéntanos algo más sobre tus necesidades"
                className="w-full mt-1 border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-blue-500 resize-none placeholder:text-gray-500 text-gray-900"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-7 pt-6">
            <Link
              href="/servicios"
              className="bg-[#6B8FB1] text-white font-semibold px-10 py-3 rounded-full shadow-md hover:bg-blue-400 hover:shadow-lg transition duration-300 inline-block">
              Cancelar
            </Link>

            <button
              type="submit"
              className="bg-[#6B8FB1] text-white font-semibold px-10 py-3 rounded-full shadow-md hover:bg-blue-400 hover:shadow-lg transition duration-300 inline-block">
              Solicitar cotización
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}