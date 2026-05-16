"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  ShieldCheck,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import Image from "next/image";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function AdminLogin() {
  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  if (!correo || !password) {
    setError("Por favor ingresa tu correo y contraseña.");
    return;
  }

  try {
    setCargando(true);

    await signInWithEmailAndPassword(
      auth,
      correo.trim(),
      password.trim()
    );

    router.push("/admin/inicio");
  } catch (error) {
    console.log("ERROR FIREBASE:", error.code);
    setError("Correo o contraseña incorrectos.");
  } finally {
    setCargando(false);
  }
};

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
                className="object-contain"
              />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight">
              Administración segura para DS Tecnología e Innovación México
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
              className="object-contain"
            />
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

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <div>
              <label className="text-sm font-semibold text-gray-600">
                Correo electrónico
              </label>

              <div className="relative mt-2">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5577f2]"
                  size={19}
                />

                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="admin@empresa.com"
                  className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm outline-none focus:border-[#5577f2] text-gray-800 placeholder:text-gray-400 transition"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">
                Contraseña
              </label>

              <div className="relative mt-2">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5577f2]"
                  size={19}
                />

                <input
                  type={mostrarPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  className="w-full border border-gray-200 rounded-xl pl-12 pr-12 py-3 text-sm outline-none focus:border-[#5577f2] text-gray-800 placeholder:text-gray-400 transition"
                />

                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#5577f2] transition"
                >
                  {mostrarPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-500">
                <input type="checkbox" className="accent-[#0f2e4f]" />
                Recordarme
              </label>

              <span className="font-semibold text-[#0f2e4f]">
                Acceso interno
              </span>
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-[#0f2e4f] text-white font-bold py-3 rounded-xl text-sm hover:bg-[#173f73] shadow-md hover:shadow-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {cargando ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Verificando...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </button>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="w-full py-3 rounded-xl text-sm font-bold border border-gray-200 bg-white text-[#0f2e4f] hover:bg-[#eef3ff] hover:border-[#5577f2] hover:text-[#173f73] shadow-sm hover:shadow-md transition-all duration-300">
                Cancelar
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