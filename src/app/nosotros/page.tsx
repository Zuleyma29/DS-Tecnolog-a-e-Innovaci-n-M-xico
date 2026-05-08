export default function Nosotros() {
  return (
    <section className="bg-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Nosotros
        </h2>

        <div className="w-40 h-1 bg-blue-600 mx-auto mt-3 mb-8"></div>

        <p className="max-w-4xl mx-auto text-gray-700 text-lg leading-relaxed mb-12">
          Somos una empresa tlaxcalteca legalmente constituida desde 2009,
          respaldada por la trayectoria de más de 20 años de nuestro director
          en el sector de Tecnologías de Información. En DS Tecnología e
          Innovación México, combinamos experiencia y solidez para ofrecer
          soluciones digitales de alto impacto.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white border border-blue-700 rounded-lg overflow-hidden shadow-sm">
            <div className="h-40 flex items-center justify-center border-b border-blue-700">
              <img
                src="/img/mision.png"
                alt="Misión"
                className="w-24 h-24 object-contain"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-center mb-4 text-gray-900">Misión</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Somos una empresa en el área de Tecnologías de Información con
                el fin de mejorar la productividad de las empresas e
                instituciones, alcanzando la satisfacción y recomendación de
                clientes.
              </p>
            </div>
          </div>

          <div className="bg-white border border-blue-700 rounded-lg overflow-hidden shadow-sm">
            <div className="h-40 flex items-center justify-center border-b border-blue-700">
              <img
                src="/img/vision.png"
                alt="Visión"
                className="w-24 h-24 object-contain"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-center mb-4 text-gray-900">Visión</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Ser una empresa referente en la región en Tecnologías de
                Información.
              </p>
            </div>
          </div>

          <div className="bg-white border border-blue-700 rounded-lg overflow-hidden shadow-sm">
            <div className="h-40 flex items-center justify-center border-b border-blue-700">
              <img
                src="/img/objetivos.png"
                alt="Objetivos"
                className="w-24 h-24 object-contain"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-center mb-4 text-gray-900">Objetivos</h3>
              <ul className="text-gray-700 text-sm list-disc list-inside space-y-2">
                <li>Lograr la satisfacción y lealtad del cliente.</li>
                <li>Impulsar la rentabilidad y el crecimiento sostenido.</li>
                <li>Fomentar la eficiencia operativa y la innovación constante.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}