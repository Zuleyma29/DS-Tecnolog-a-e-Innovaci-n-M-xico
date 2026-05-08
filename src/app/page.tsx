import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-linear-to-br from-gray-100 to-gray-100">
      
      <section className="max-w-7xl mx-auto px-8 py-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800 mb-8">
            Impulsa tu industria con <br />
            etiquetas de{" "}
            <span className="text-blue-700">
              rollo de máxima calidad y precisión
            </span>
          </h1>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
            En DS Tecnología e Innovación México, fabricamos soluciones de
            etiquetado industrial duraderas y eficientes para optimizar tus
            procesos operativos. Contáctanos y cotiza hoy mismo.
          </p>

          <div className="flex justify-start md:justify-end mt-6">
            <Link
              href="/servicios"
              className="bg-[#6B8FB1] text-white font-semibold px-10 py-3 rounded-full shadow-md hover:bg-blue-400 hover:shadow-lg transition duration-300 inline-block">
              Servicios
            </Link>
            

          </div>

        </div>

        <div className="flex justify-center">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <Image
              src="/img/etiquetas-index.jpg"
              alt="Etiquetas industriales"
              width={560}
              height={380}
              className="object-cover"/>
          </div>
        </div>
      </section>
    </main>
  );
}