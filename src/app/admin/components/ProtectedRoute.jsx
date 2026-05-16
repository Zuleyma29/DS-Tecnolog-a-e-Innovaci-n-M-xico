"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [verificando, setVerificando] = useState(true);
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuarioAutenticado(true);
      } else {
        setUsuarioAutenticado(false);
        router.replace("/admin/login");
      }

      setVerificando(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (verificando) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f5f7fb]">
        <div className="flex flex-col items-center gap-3 text-[#0f2e4f]">
          <Loader2 className="animate-spin" size={34} />
          <p className="font-semibold">Verificando acceso...</p>
        </div>
      </main>
    );
  }

  if (!usuarioAutenticado) {
    return null;
  }

  return children;
}