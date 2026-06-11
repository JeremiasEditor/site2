"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("🔒 Senha incorreta");
      }
    } catch (err) {
      setError("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black flex items-center justify-center px-4">
      {/* Grid de fundo */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,27,27,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,27,27,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-10" />

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/20 rounded-full blur-3xl opacity-20" />

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-lg p-8 shadow-2xl">
          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 border border-red-500/50 rounded-lg mb-4">
              <Lock className="text-red-500" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Área Restrita</h1>
            <p className="text-white/60 text-sm">
              Autenticação necessária para acessar o painel
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Campo de Senha */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Senha de Admin
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite a senha..."
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition pr-10"
                  disabled={loading}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-white/60 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Mensagem de Erro */}
            {error && (
              <div className="p-3 rounded bg-red-500/20 border border-red-500/50 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded font-medium hover:from-red-700 hover:to-red-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Autenticando...
                </>
              ) : (
                <>
                  <Lock size={18} />
                  Acessar Painel
                </>
              )}
            </button>
          </form>

          {/* Dica */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <p className="text-white/40 text-xs text-center">
              💡 Dica: Procure pela senha em variáveis de ambiente<br/>
              <code className="text-red-400 text-xs">ADMIN_PASSWORD</code>
            </p>
          </div>
        </div>

        {/* Rodapé */}
        <div className="text-center mt-6">
          <p className="text-white/40 text-sm">
            Acesso restrito apenas para administradores
          </p>
        </div>
      </div>
    </div>
  );
}
