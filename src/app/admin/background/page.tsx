"use client";

import { useEffect, useRef, useState } from "react";
import { Film, Upload, RotateCw, Save, RotateCcw } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export default function AdminBackgroundPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((data: SiteContent) => {
        setContent(data);
        setCurrentUrl(data.hero.backgroundVideoUrl);
      })
      .catch(() => setMessage("❌ Erro ao carregar conteúdo"));
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setMessage("❌ Selecione um arquivo de vídeo");
      return;
    }
    if (file.size > 500 * 1024 * 1024) {
      setMessage("❌ Arquivo muito grande! Máximo 500MB");
      return;
    }

    setUploading(true);
    setMessage("");
    try {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: data });
      if (!res.ok) throw new Error("upload failed");
      const json = await res.json();
      setCurrentUrl(json.url);
      setMessage("✅ Vídeo enviado! Clique em Salvar para aplicar no site.");
    } catch (error) {
      console.error(error);
      setMessage("❌ Erro ao enviar o vídeo");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    setMessage("");
    try {
      const updated: SiteContent = {
        ...content,
        hero: { ...content.hero, backgroundVideoUrl: currentUrl },
      };
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("save failed");
      const saved = await res.json();
      setContent(saved);
      setCurrentUrl(saved.hero.backgroundVideoUrl);
      setMessage("✅ Vídeo de fundo salvo com sucesso!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  const resetToDefault = () => {
    setCurrentUrl("/assets/reel.mp4");
    setMessage("Vídeo padrão selecionado. Clique em Salvar para aplicar.");
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Film size={26} className="text-primary" /> Vídeo de Fundo
        </h1>
        <p className="text-white/60">
          Escolha um vídeo do seu computador para usar como fundo da seção
          inicial do site.
        </p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-sm font-medium text-white/70 mb-3">
            Pré-visualização atual
          </h2>
          <div className="aspect-video rounded-lg overflow-hidden bg-black border border-slate-800 flex items-center justify-center">
            {currentUrl ? (
              <video
                key={currentUrl}
                src={currentUrl}
                className="w-full h-full object-cover"
                muted
                loop
                autoPlay
                playsInline
                controls
              />
            ) : (
              <p className="text-white/40 text-sm">Nenhum vídeo selecionado</p>
            )}
          </div>
          <p className="text-xs text-white/40 mt-2 break-all">
            Arquivo: {currentUrl || "—"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Selecionar vídeo do computador (MP4 / WebM · máx. 500MB)
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm focus:outline-none focus:border-primary cursor-pointer file:mr-2 file:px-3 file:py-1 file:bg-primary file:text-white file:rounded file:border-0 file:cursor-pointer disabled:opacity-50"
          />
          {uploading && (
            <p className="text-sm text-white/60 mt-2 flex items-center gap-2">
              <RotateCw size={14} className="animate-spin" /> Enviando vídeo...
            </p>
          )}
        </div>

        {message && (
          <div className="p-3 rounded bg-slate-800/50 border border-slate-700 text-sm">
            {message}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={saving || uploading || !content}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <RotateCw size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            Salvar
          </button>
          <button
            onClick={resetToDefault}
            disabled={saving || uploading}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition disabled:opacity-50"
          >
            <RotateCcw size={15} /> Usar vídeo padrão
          </button>
        </div>
      </div>
    </div>
  );
}
