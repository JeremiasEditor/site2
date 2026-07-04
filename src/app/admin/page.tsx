"use client";

import Link from "next/link";
import { FileText, Film, Video, ArrowRight } from "lucide-react";

const cards = [
  {
    href: "/admin/content",
    icon: FileText,
    title: "Textos & Links",
    description:
      "Edite todos os textos do site (títulos, descrições, planos) e todos os links (redes sociais, WhatsApp, portfólio, navegação).",
  },
  {
    href: "/admin/background",
    icon: Film,
    title: "Vídeo de Fundo",
    description:
      "Selecione um vídeo do seu computador para usar como fundo da seção inicial (Hero) do site.",
  },
  {
    href: "/admin/videos",
    icon: Video,
    title: "Vídeos do Portfólio",
    description:
      "Faça upload e gerencie os vídeos exibidos na seção de portfólio da página inicial.",
  },
];

export default function AdminHome() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Painel de Administração</h1>
        <p className="text-white/60">
          Gerencie o conteúdo do site sem tocar no código. Escolha uma opção
          abaixo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-primary/50 hover:bg-slate-900 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                <Icon size={22} className="text-primary" />
              </div>
              <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
                {card.title}
              </h2>
              <p className="text-sm text-white/50 mb-4">{card.description}</p>
              <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                Abrir <ArrowRight size={14} />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
