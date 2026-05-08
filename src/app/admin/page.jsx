import { Mail, Lock, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function AdminLogin() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-6 py-10">
      <section className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        
        <div className="hidden lg:flex bg-[#0f2e4f] text-white p-12 flex-col justify-between">
          <div>
            <div className="bg-white rounded-2xl p-5 w-fit mb-10">
              <Image
                src="/img/LogoDS.jpg"
                alt="Data Solutions"
                width={250}
                height={100}
                className="object-contain"/>
            </div>

            <h2 className="text-3xl font-extrabold leading-tight">
              Administración segura para DS Tecnología e Innovacion México
            </h2>

            <p className="text-blue-100 mt-5 leading-relaxed">
              Accede al panel interno para revisar mensajes, solicitudes de
              cotización y actividad recibida desde el sitio web.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-5 border border-white/10 mt-5">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck size={24} />
              <span className="font-bold">Acceso restringido</span>
            </div>

            <p className="text-sm text-blue-100">
              Esta sección es únicamente para personal autorizado de la empresa.
            </p>
          </div>
        </div>

        <div className="px-8 md:px-12 py-12">
          <div className="lg:hidden flex justify-center mb-8">
            <Image
              src="/img/LogoDS.jpg"
              alt="Data Solutions"
              width={260}
              height={100}
              className="object-contain"/>
          </div>

          <div className="mb-8">
            <p className="text-sm font-semibold text-[#5577f2] mb-2">
              Panel Administrativo
            </p>

            <h1 className="text-3xl font-extrabold text-[#0f2e4f]">
              Iniciar sesión
            </h1>

            <p className="text-gray-500 mt-3 text-sm">
              Ingresa tus credenciales para acceder al área administrativa.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Correo electrónico
              </label>

              <div className="relative mt-2">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5577f2]"
                  size={19}/>

                <input
                  type="email"
                  placeholder="admin@empresa.com"
                  className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm outline-none focus:border-[#5577f2] text-gray-800 placeholder:text-gray-400 transition"/>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">
                Contraseña
              </label>

              <div className="relative mt-2">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5577f2]"
                  size={19}/>

                <input
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm outline-none focus:border-[#5577f2] text-gray-800 placeholder:text-gray-400 transition"/>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-500">
                <input type="checkbox" className="accent-[#0f2e4f]" />
                Recordarme
              </label>

              <a
                href="#"
                className="font-semibold text-[#0f2e4f] hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0f2e4f] text-white font-bold py-3 rounded-xl text-sm hover:bg-[#173f73] shadow-md hover:shadow-lg transition">
              Iniciar sesión
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-8">
            © 2026 DS Tecnología e Innovación México
          </p>
        </div>
      </section>
    </main>
  );
}