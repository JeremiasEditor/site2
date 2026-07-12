"use client";

import { useEffect, useState } from "react";
import { Save, RotateCw, Plus, Trash2, RotateCcw } from "lucide-react";
import type { SiteContent } from "@/lib/content";

/* ---------- helpers ---------- */

// Define um valor em um caminho aninhado, clonando de forma imutável.
function setIn<T>(obj: T, path: (string | number)[], value: unknown): T {
  if (path.length === 0) return value as T;
  const [head, ...rest] = path;
  const clone: Record<string | number, unknown> = Array.isArray(obj)
    ? ([...(obj as unknown[])] as unknown as Record<string | number, unknown>)
    : { ...(obj as Record<string, unknown>) };
  clone[head] = setIn(clone[head], rest, value);
  return clone as unknown as T;
}

/* ---------- campos reutilizáveis ---------- */

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-white/60 mb-1">
        {label}
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm placeholder-slate-500 focus:outline-none focus:border-primary"
      />
    </label>
  );
}

function AreaField({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-white/60 mb-1">
        {label}
      </span>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm placeholder-slate-500 focus:outline-none focus:border-primary"
      />
    </label>
  );
}

function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-red-600"
      />
      {label}
    </label>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
      <summary className="cursor-pointer select-none px-5 py-4 flex items-center justify-between hover:bg-slate-900">
        <div>
          <h2 className="text-base font-bold">{title}</h2>
          {description && (
            <p className="text-xs text-white/40 mt-0.5">{description}</p>
          )}
        </div>
        <span className="text-white/40 text-xs group-open:rotate-180 transition">
          ▼
        </span>
      </summary>
      <div className="px-5 pb-5 pt-1 space-y-4 border-t border-slate-800">
        {children}
      </div>
    </details>
  );
}

function ItemCard({
  title,
  onRemove,
  children,
}: {
  title: string;
  onRemove?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
          {title}
        </span>
        {onRemove && (
          <button
            onClick={onRemove}
            className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded transition"
            title="Remover"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function AddButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 text-sm text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition"
    >
      <Plus size={14} /> {label}
    </button>
  );
}

const ICON_OPTIONS = [
  "youtube",
  "instagram",
  "mail",
  "phone",
  "map-pin",
  "megaphone",
  "image",
  "file-text",
  "target",
  "clapperboard",
  "rocket",
];

function IconSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-white/60 mb-1">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm focus:outline-none focus:border-primary"
      >
        {ICON_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ---------- página ---------- */

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then(setContent)
      .catch(() => setMessage("❌ Erro ao carregar conteúdo"));
  }, []);

  const set = (path: (string | number)[], value: unknown) =>
    setContent((c) => (c ? setIn(c, path, value) : c));

  // Faz upload de uma imagem e guarda a URL no caminho indicado do conteúdo.
  const uploadPhoto = async (file: File, path: (string | number)[]) => {
    if (!file.type.startsWith("image/")) {
      setMessage("❌ Selecione um arquivo de imagem");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setMessage("❌ Imagem muito grande! Máximo 10MB");
      return;
    }
    setUploadingPhoto(true);
    setMessage("");
    try {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: data });
      if (!res.ok) throw new Error("upload failed");
      const json = await res.json();
      set(path, json.url);
      setMessage("✅ Foto enviada! Clique em Salvar para aplicar no site.");
    } catch (error) {
      console.error(error);
      setMessage("❌ Erro ao enviar a foto");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error("save failed");
      setMessage("✅ Alterações salvas com sucesso!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
      setMessage("❌ Erro ao salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (
      !confirm(
        "Restaurar TODOS os textos e links para os valores padrão? Isto substitui o que estiver salvo."
      )
    )
      return;
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const fresh = await res.json();
      setContent(fresh);
      setMessage("✅ Conteúdo restaurado para o padrão.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
      setMessage("❌ Erro ao restaurar.");
    } finally {
      setSaving(false);
    }
  };

  if (!content) {
    return (
      <div className="flex items-center gap-2 text-white/60">
        <RotateCw size={16} className="animate-spin" /> Carregando conteúdo...
      </div>
    );
  }

  const c = content;

  return (
    <div className="max-w-4xl">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Textos & Links</h1>
          <p className="text-white/60 text-sm">
            Edite qualquer texto ou link do site. Clique em Salvar ao terminar.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            disabled={saving}
            className="flex items-center gap-2 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition disabled:opacity-50"
          >
            <RotateCcw size={15} /> Restaurar padrão
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition disabled:opacity-50"
          >
            {saving ? (
              <RotateCw size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            Salvar
          </button>
        </div>
      </div>

      {message && (
        <div className="mb-6 p-3 rounded bg-slate-800/60 border border-slate-700 text-sm sticky top-28 z-10">
          {message}
        </div>
      )}

      <div className="space-y-4">
        {/* NAVBAR */}
        <Section title="Menu de Navegação" description="Links do topo do site">
          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              label="Texto do botão de contato"
              value={c.navbar.ctaLabel}
              onChange={(v) => set(["navbar", "ctaLabel"], v)}
            />
            <Field
              label="Link do botão de contato"
              value={c.navbar.ctaHref}
              onChange={(v) => set(["navbar", "ctaHref"], v)}
            />
          </div>
          <div className="space-y-3">
            {c.navbar.links.map((link, i) => (
              <ItemCard
                key={i}
                title={`Link ${i + 1}`}
                onRemove={() =>
                  set(
                    ["navbar", "links"],
                    c.navbar.links.filter((_, j) => j !== i)
                  )
                }
              >
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field
                    label="Texto"
                    value={link.label}
                    onChange={(v) => set(["navbar", "links", i, "label"], v)}
                  />
                  <Field
                    label="Link (ex: #sobre)"
                    value={link.href}
                    onChange={(v) => set(["navbar", "links", i, "href"], v)}
                  />
                </div>
              </ItemCard>
            ))}
            <AddButton
              label="Adicionar link"
              onClick={() =>
                set(
                  ["navbar", "links"],
                  [...c.navbar.links, { label: "Novo", href: "#" }]
                )
              }
            />
          </div>
        </Section>

        {/* HERO */}
        <Section
          title="Seção Inicial (Hero)"
          description="Primeira tela do site. O vídeo de fundo é alterado na aba 'Vídeo de Fundo'."
        >
          <Field
            label="Selo (badge)"
            value={c.hero.badge}
            onChange={(v) => set(["hero", "badge"], v)}
          />
          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              label="Título (parte normal)"
              value={c.hero.titleLine1}
              onChange={(v) => set(["hero", "titleLine1"], v)}
            />
            <Field
              label="Título (parte destacada em vermelho)"
              value={c.hero.titleHighlight}
              onChange={(v) => set(["hero", "titleHighlight"], v)}
            />
          </div>
          <AreaField
            label="Subtítulo"
            value={c.hero.subtitle}
            onChange={(v) => set(["hero", "subtitle"], v)}
          />
          <div className="grid sm:grid-cols-2 gap-3">
            <ItemCard title="Botão principal">
              <Field
                label="Texto"
                value={c.hero.primaryCta.label}
                onChange={(v) => set(["hero", "primaryCta", "label"], v)}
              />
              <Field
                label="Link"
                value={c.hero.primaryCta.href}
                onChange={(v) => set(["hero", "primaryCta", "href"], v)}
              />
            </ItemCard>
            <ItemCard title="Botão secundário">
              <Field
                label="Texto"
                value={c.hero.secondaryCta.label}
                onChange={(v) => set(["hero", "secondaryCta", "label"], v)}
              />
              <Field
                label="Link"
                value={c.hero.secondaryCta.href}
                onChange={(v) => set(["hero", "secondaryCta", "href"], v)}
              />
            </ItemCard>
          </div>
          <div className="space-y-3">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Estatísticas
            </span>
            {c.hero.stats.map((stat, i) => (
              <ItemCard key={i} title={`Estatística ${i + 1}`}>
                <Field
                  label="Rótulo"
                  value={stat.label}
                  onChange={(v) => set(["hero", "stats", i, "label"], v)}
                />
                <CheckboxField
                  label="Exibir como texto (em vez de número animado)"
                  checked={stat.isText}
                  onChange={(v) => set(["hero", "stats", i, "isText"], v)}
                />
                {stat.isText ? (
                  <Field
                    label="Texto exibido"
                    value={stat.textValue}
                    onChange={(v) => set(["hero", "stats", i, "textValue"], v)}
                  />
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    <Field
                      label="Prefixo"
                      value={stat.prefix}
                      onChange={(v) => set(["hero", "stats", i, "prefix"], v)}
                    />
                    <Field
                      label="Número"
                      value={String(stat.value)}
                      onChange={(v) =>
                        set(
                          ["hero", "stats", i, "value"],
                          Number(v.replace(/\D/g, "")) || 0
                        )
                      }
                    />
                    <Field
                      label="Sufixo"
                      value={stat.suffix}
                      onChange={(v) => set(["hero", "stats", i, "suffix"], v)}
                    />
                  </div>
                )}
              </ItemCard>
            ))}
          </div>
        </Section>

        {/* ABOUT */}
        <Section title="Sobre" description="Seção sobre você">
          {/* Foto do card */}
          <div className="space-y-2">
            <span className="block text-xs font-medium text-white/60">
              Foto do card (aparece no lugar do ícone)
            </span>
            <div className="flex items-center gap-4">
              {c.about.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.about.photoUrl}
                  alt="Foto do card"
                  className="w-24 h-24 object-cover rounded-lg border border-slate-700 flex-shrink-0"
                />
              ) : (
                <div className="w-24 h-24 rounded-lg border border-dashed border-slate-700 flex items-center justify-center text-white/30 text-[11px] text-center flex-shrink-0">
                  Sem foto
                </div>
              )}
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingPhoto}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadPhoto(f, ["about", "photoUrl"]);
                  }}
                  className="text-sm text-white file:mr-2 file:px-3 file:py-1 file:bg-primary file:text-white file:rounded file:border-0 file:cursor-pointer cursor-pointer disabled:opacity-50"
                />
                {uploadingPhoto && (
                  <span className="text-xs text-white/60 flex items-center gap-1">
                    <RotateCw size={12} className="animate-spin" /> Enviando...
                  </span>
                )}
                {c.about.photoUrl && (
                  <button
                    onClick={() => set(["about", "photoUrl"], "")}
                    className="text-xs text-red-400 hover:text-red-300 text-left"
                  >
                    Remover foto
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              label="Rótulo da seção"
              value={c.about.sectionLabel}
              onChange={(v) => set(["about", "sectionLabel"], v)}
            />
            <Field
              label="Subtítulo"
              value={c.about.subtitle}
              onChange={(v) => set(["about", "subtitle"], v)}
            />
            <Field
              label="Título (parte normal)"
              value={c.about.headingLead}
              onChange={(v) => set(["about", "headingLead"], v)}
            />
            <Field
              label="Título (parte destacada)"
              value={c.about.headingHighlight}
              onChange={(v) => set(["about", "headingHighlight"], v)}
            />
            <Field
              label="Nome"
              value={c.about.name}
              onChange={(v) => set(["about", "name"], v)}
            />
            <Field
              label="Cargo / função"
              value={c.about.role}
              onChange={(v) => set(["about", "role"], v)}
            />
          </div>
          <AreaField
            label="Citação (quote)"
            value={c.about.quote}
            onChange={(v) => set(["about", "quote"], v)}
          />
          <AreaField
            label="Bio — parágrafo 1"
            value={c.about.bioParagraph1}
            onChange={(v) => set(["about", "bioParagraph1"], v)}
          />
          <AreaField
            label="Bio — parágrafo 2"
            value={c.about.bioParagraph2}
            onChange={(v) => set(["about", "bioParagraph2"], v)}
          />
          <AreaField
            label="Bio — parágrafo 3"
            value={c.about.bioParagraph3}
            onChange={(v) => set(["about", "bioParagraph3"], v)}
          />
          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              label="Cartão flutuante — valor"
              value={c.about.floatingCardValue}
              onChange={(v) => set(["about", "floatingCardValue"], v)}
            />
            <Field
              label="Cartão flutuante — rótulo"
              value={c.about.floatingCardLabel}
              onChange={(v) => set(["about", "floatingCardLabel"], v)}
            />
            <Field
              label="Botão — texto"
              value={c.about.ctaLabel}
              onChange={(v) => set(["about", "ctaLabel"], v)}
            />
            <Field
              label="Botão — link"
              value={c.about.ctaHref}
              onChange={(v) => set(["about", "ctaHref"], v)}
            />
          </div>
          <div className="space-y-3">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Destaques (bullets)
            </span>
            {c.about.highlights.map((item, i) => (
              <div key={i} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Field
                    label={`Destaque ${i + 1}`}
                    value={item}
                    onChange={(v) => set(["about", "highlights", i], v)}
                  />
                </div>
                <button
                  onClick={() =>
                    set(
                      ["about", "highlights"],
                      c.about.highlights.filter((_, j) => j !== i)
                    )
                  }
                  className="p-2.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <AddButton
              label="Adicionar destaque"
              onClick={() =>
                set(["about", "highlights"], [...c.about.highlights, ""])
              }
            />
          </div>
        </Section>

        {/* PORTFOLIO */}
        <Section title="Portfólio (Destaques)" description="Projetos e canais">
          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              label="Rótulo da seção"
              value={c.portfolio.sectionLabel}
              onChange={(v) => set(["portfolio", "sectionLabel"], v)}
            />
            <Field
              label="Subtítulo"
              value={c.portfolio.subtitle}
              onChange={(v) => set(["portfolio", "subtitle"], v)}
            />
            <Field
              label="Título (parte normal)"
              value={c.portfolio.headingLead}
              onChange={(v) => set(["portfolio", "headingLead"], v)}
            />
            <Field
              label="Título (parte destacada)"
              value={c.portfolio.headingHighlight}
              onChange={(v) => set(["portfolio", "headingHighlight"], v)}
            />
            <Field
              label="Link 'ytjobs' (rodapé da seção)"
              value={c.portfolio.ytjobsHref}
              onChange={(v) => set(["portfolio", "ytjobsHref"], v)}
            />
          </div>

          <div className="space-y-3">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Categorias (chips)
            </span>
            {c.portfolio.categories.map((cat, i) => (
              <div key={i} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Field
                    label={`Categoria ${i + 1}`}
                    value={cat}
                    onChange={(v) => set(["portfolio", "categories", i], v)}
                  />
                </div>
                <button
                  onClick={() =>
                    set(
                      ["portfolio", "categories"],
                      c.portfolio.categories.filter((_, j) => j !== i)
                    )
                  }
                  className="p-2.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <AddButton
              label="Adicionar categoria"
              onClick={() =>
                set(
                  ["portfolio", "categories"],
                  [...c.portfolio.categories, "Nova"]
                )
              }
            />
          </div>

          <div className="space-y-3">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Projetos
            </span>
            {c.portfolio.projects.map((p, i) => (
              <ItemCard
                key={i}
                title={p.client || `Projeto ${i + 1}`}
                onRemove={() =>
                  set(
                    ["portfolio", "projects"],
                    c.portfolio.projects.filter((_, j) => j !== i)
                  )
                }
              >
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field
                    label="Cliente / canal"
                    value={p.client}
                    onChange={(v) =>
                      set(["portfolio", "projects", i, "client"], v)
                    }
                  />
                  <Field
                    label="Tipo"
                    value={p.type}
                    onChange={(v) =>
                      set(["portfolio", "projects", i, "type"], v)
                    }
                  />
                </div>
                <AreaField
                  label="Descrição"
                  value={p.description}
                  onChange={(v) =>
                    set(["portfolio", "projects", i, "description"], v)
                  }
                  rows={2}
                />
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field
                    label="Estatística 1"
                    value={p.stats[0] ?? ""}
                    onChange={(v) =>
                      set(
                        ["portfolio", "projects", i, "stats"],
                        [v, p.stats[1] ?? ""]
                      )
                    }
                  />
                  <Field
                    label="Estatística 2"
                    value={p.stats[1] ?? ""}
                    onChange={(v) =>
                      set(
                        ["portfolio", "projects", i, "stats"],
                        [p.stats[0] ?? "", v]
                      )
                    }
                  />
                  <Field
                    label="Link do YouTube"
                    value={p.youtube}
                    onChange={(v) =>
                      set(["portfolio", "projects", i, "youtube"], v)
                    }
                  />
                  <Field
                    label="Link do Instagram"
                    value={p.instagram}
                    onChange={(v) =>
                      set(["portfolio", "projects", i, "instagram"], v)
                    }
                  />
                  <Field
                    label="Imagem (caminho ou URL)"
                    value={p.image}
                    onChange={(v) =>
                      set(["portfolio", "projects", i, "image"], v)
                    }
                  />
                </div>
              </ItemCard>
            ))}
            <AddButton
              label="Adicionar projeto"
              onClick={() =>
                set(
                  ["portfolio", "projects"],
                  [
                    ...c.portfolio.projects,
                    {
                      client: "Novo cliente",
                      type: "Long-form Content",
                      description: "",
                      stats: ["", ""],
                      youtube: "",
                      instagram: "",
                      image: "",
                    },
                  ]
                )
              }
            />
          </div>
        </Section>

        {/* PORTFOLIO VIDEOS */}
        <Section
          title="Portfólio de Vídeos (cabeçalho)"
          description="Títulos da seção de vídeos enviados"
        >
          <div className="grid sm:grid-cols-3 gap-3">
            <Field
              label="Rótulo da seção"
              value={c.portfolioVideos.sectionLabel}
              onChange={(v) => set(["portfolioVideos", "sectionLabel"], v)}
            />
            <Field
              label="Título (parte normal)"
              value={c.portfolioVideos.headingLead}
              onChange={(v) => set(["portfolioVideos", "headingLead"], v)}
            />
            <Field
              label="Título (parte destacada)"
              value={c.portfolioVideos.headingHighlight}
              onChange={(v) => set(["portfolioVideos", "headingHighlight"], v)}
            />
          </div>
        </Section>

        {/* SERVICES */}
        <Section title="Serviços" description="Categorias, planos e preços">
          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              label="Rótulo da seção"
              value={c.services.sectionLabel}
              onChange={(v) => set(["services", "sectionLabel"], v)}
            />
            <Field
              label="Aviso 'em construção'"
              value={c.services.constructionNotice}
              onChange={(v) => set(["services", "constructionNotice"], v)}
            />
            <Field
              label="Título (parte normal)"
              value={c.services.headingLead}
              onChange={(v) => set(["services", "headingLead"], v)}
            />
            <Field
              label="Título (parte destacada)"
              value={c.services.headingHighlight}
              onChange={(v) => set(["services", "headingHighlight"], v)}
            />
          </div>
          <AreaField
            label="Descrição"
            value={c.services.description}
            onChange={(v) => set(["services", "description"], v)}
          />
          <Field
            label="Link do WhatsApp (usado em todos os botões de serviço)"
            value={c.services.whatsappUrl}
            onChange={(v) => set(["services", "whatsappUrl"], v)}
          />
          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              label="Texto final da seção"
              value={c.services.bottomText}
              onChange={(v) => set(["services", "bottomText"], v)}
            />
            <Field
              label="Texto do botão final"
              value={c.services.bottomCtaLabel}
              onChange={(v) => set(["services", "bottomCtaLabel"], v)}
            />
          </div>

          <div className="space-y-3">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Categorias de serviço
            </span>
            {c.services.categories.map((cat, ci) => (
              <ItemCard
                key={ci}
                title={cat.title || `Categoria ${ci + 1}`}
                onRemove={() =>
                  set(
                    ["services", "categories"],
                    c.services.categories.filter((_, j) => j !== ci)
                  )
                }
              >
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field
                    label="Título"
                    value={cat.title}
                    onChange={(v) =>
                      set(["services", "categories", ci, "title"], v)
                    }
                  />
                  <IconSelect
                    label="Ícone"
                    value={cat.icon}
                    onChange={(v) =>
                      set(["services", "categories", ci, "icon"], v)
                    }
                  />
                </div>
                <Field
                  label="Subtítulo"
                  value={cat.subtitle}
                  onChange={(v) =>
                    set(["services", "categories", ci, "subtitle"], v)
                  }
                />
                <div className="space-y-2 pl-3 border-l-2 border-slate-700">
                  {cat.plans.map((plan, pi) => (
                    <div
                      key={pi}
                      className="bg-slate-900/60 rounded-lg p-3 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-white/40 uppercase">
                          Plano {pi + 1}
                        </span>
                        <button
                          onClick={() =>
                            set(
                              ["services", "categories", ci, "plans"],
                              cat.plans.filter((_, j) => j !== pi)
                            )
                          }
                          className="p-1 text-white/40 hover:text-red-400 rounded transition"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2">
                        <Field
                          label="Nome"
                          value={plan.name}
                          onChange={(v) =>
                            set(
                              ["services", "categories", ci, "plans", pi, "name"],
                              v
                            )
                          }
                        />
                        <Field
                          label="Preço"
                          value={plan.price}
                          onChange={(v) =>
                            set(
                              [
                                "services",
                                "categories",
                                ci,
                                "plans",
                                pi,
                                "price",
                              ],
                              v
                            )
                          }
                        />
                      </div>
                      <AreaField
                        label="Descrição"
                        value={plan.description}
                        rows={2}
                        onChange={(v) =>
                          set(
                            [
                              "services",
                              "categories",
                              ci,
                              "plans",
                              pi,
                              "description",
                            ],
                            v
                          )
                        }
                      />
                      <div className="flex gap-4">
                        <CheckboxField
                          label="Destaque (Mais Popular)"
                          checked={plan.highlight}
                          onChange={(v) =>
                            set(
                              [
                                "services",
                                "categories",
                                ci,
                                "plans",
                                pi,
                                "highlight",
                              ],
                              v
                            )
                          }
                        />
                        <CheckboxField
                          label="Parceria (sem preço)"
                          checked={plan.isPartnership}
                          onChange={(v) =>
                            set(
                              [
                                "services",
                                "categories",
                                ci,
                                "plans",
                                pi,
                                "isPartnership",
                              ],
                              v
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <AddButton
                    label="Adicionar plano"
                    onClick={() =>
                      set(
                        ["services", "categories", ci, "plans"],
                        [
                          ...cat.plans,
                          {
                            name: "Novo plano",
                            description: "",
                            price: "R$ 0,00",
                            highlight: false,
                            isPartnership: false,
                          },
                        ]
                      )
                    }
                  />
                </div>
              </ItemCard>
            ))}
            <AddButton
              label="Adicionar categoria"
              onClick={() =>
                set(
                  ["services", "categories"],
                  [
                    ...c.services.categories,
                    {
                      id: `cat-${Date.now()}`,
                      icon: "megaphone",
                      title: "Nova categoria",
                      subtitle: "",
                      plans: [],
                    },
                  ]
                )
              }
            />
          </div>
        </Section>

        {/* PROCESS */}
        <Section title="Processo" description="Etapas do processo de trabalho">
          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              label="Rótulo da seção"
              value={c.process.sectionLabel}
              onChange={(v) => set(["process", "sectionLabel"], v)}
            />
            <Field
              label="Subtítulo"
              value={c.process.subtitle}
              onChange={(v) => set(["process", "subtitle"], v)}
            />
            <Field
              label="Título (parte normal)"
              value={c.process.headingLead}
              onChange={(v) => set(["process", "headingLead"], v)}
            />
            <Field
              label="Título (parte destacada)"
              value={c.process.headingHighlight}
              onChange={(v) => set(["process", "headingHighlight"], v)}
            />
          </div>
          <div className="space-y-3">
            {c.process.steps.map((step, i) => (
              <ItemCard
                key={i}
                title={step.title || `Etapa ${i + 1}`}
                onRemove={() =>
                  set(
                    ["process", "steps"],
                    c.process.steps.filter((_, j) => j !== i)
                  )
                }
              >
                <div className="grid sm:grid-cols-3 gap-3">
                  <Field
                    label="Número"
                    value={step.step}
                    onChange={(v) => set(["process", "steps", i, "step"], v)}
                  />
                  <Field
                    label="Título"
                    value={step.title}
                    onChange={(v) => set(["process", "steps", i, "title"], v)}
                  />
                  <IconSelect
                    label="Ícone"
                    value={step.icon}
                    onChange={(v) => set(["process", "steps", i, "icon"], v)}
                  />
                </div>
                <AreaField
                  label="Descrição"
                  value={step.description}
                  rows={2}
                  onChange={(v) =>
                    set(["process", "steps", i, "description"], v)
                  }
                />
              </ItemCard>
            ))}
            <AddButton
              label="Adicionar etapa"
              onClick={() =>
                set(
                  ["process", "steps"],
                  [
                    ...c.process.steps,
                    {
                      icon: "rocket",
                      title: "Nova etapa",
                      description: "",
                      step: String(c.process.steps.length + 1).padStart(2, "0"),
                    },
                  ]
                )
              }
            />
          </div>
        </Section>

        {/* CONTACT */}
        <Section title="Contato" description="Informações e links de contato">
          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              label="Rótulo da seção"
              value={c.contact.sectionLabel}
              onChange={(v) => set(["contact", "sectionLabel"], v)}
            />
            <Field
              label="Título (parte normal)"
              value={c.contact.headingLead}
              onChange={(v) => set(["contact", "headingLead"], v)}
            />
            <Field
              label="Título (parte destacada)"
              value={c.contact.headingHighlight}
              onChange={(v) => set(["contact", "headingHighlight"], v)}
            />
            <Field
              label="Texto do botão WhatsApp"
              value={c.contact.whatsappLabel}
              onChange={(v) => set(["contact", "whatsappLabel"], v)}
            />
          </div>
          <Field
            label="Link do botão WhatsApp"
            value={c.contact.whatsappHref}
            onChange={(v) => set(["contact", "whatsappHref"], v)}
          />
          <div className="space-y-3">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Itens de contato
            </span>
            {c.contact.info.map((info, i) => (
              <ItemCard
                key={i}
                title={info.label || `Item ${i + 1}`}
                onRemove={() =>
                  set(
                    ["contact", "info"],
                    c.contact.info.filter((_, j) => j !== i)
                  )
                }
              >
                <div className="grid sm:grid-cols-2 gap-3">
                  <IconSelect
                    label="Ícone"
                    value={info.icon}
                    onChange={(v) => set(["contact", "info", i, "icon"], v)}
                  />
                  <Field
                    label="Rótulo"
                    value={info.label}
                    onChange={(v) => set(["contact", "info", i, "label"], v)}
                  />
                  <Field
                    label="Valor exibido"
                    value={info.value}
                    onChange={(v) => set(["contact", "info", i, "value"], v)}
                  />
                  <Field
                    label="Link (deixe vazio se não houver)"
                    value={info.href}
                    onChange={(v) => set(["contact", "info", i, "href"], v)}
                  />
                </div>
              </ItemCard>
            ))}
            <AddButton
              label="Adicionar item de contato"
              onClick={() =>
                set(
                  ["contact", "info"],
                  [
                    ...c.contact.info,
                    { icon: "mail", label: "Novo", value: "", href: "" },
                  ]
                )
              }
            />
          </div>
        </Section>

        {/* FOOTER */}
        <Section title="Rodapé" description="Direitos autorais e redes sociais">
          <Field
            label="Texto de copyright"
            value={c.footer.copyright}
            onChange={(v) => set(["footer", "copyright"], v)}
          />
          <div className="space-y-3">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Redes sociais
            </span>
            {c.footer.socials.map((s, i) => (
              <ItemCard
                key={i}
                title={s.label || `Rede ${i + 1}`}
                onRemove={() =>
                  set(
                    ["footer", "socials"],
                    c.footer.socials.filter((_, j) => j !== i)
                  )
                }
              >
                <div className="grid sm:grid-cols-3 gap-3">
                  <IconSelect
                    label="Ícone"
                    value={s.icon}
                    onChange={(v) => set(["footer", "socials", i, "icon"], v)}
                  />
                  <Field
                    label="Rótulo"
                    value={s.label}
                    onChange={(v) => set(["footer", "socials", i, "label"], v)}
                  />
                  <Field
                    label="Link"
                    value={s.href}
                    onChange={(v) => set(["footer", "socials", i, "href"], v)}
                  />
                </div>
              </ItemCard>
            ))}
            <AddButton
              label="Adicionar rede social"
              onClick={() =>
                set(
                  ["footer", "socials"],
                  [
                    ...c.footer.socials,
                    { icon: "instagram", href: "", label: "Nova" },
                  ]
                )
              }
            />
          </div>
        </Section>

        {/* WHATSAPP FLOATING */}
        <Section
          title="Botão flutuante do WhatsApp"
          description="Botão verde fixo no canto da tela"
        >
          <Field
            label="Link do WhatsApp"
            value={c.whatsapp.href}
            onChange={(v) => set(["whatsapp", "href"], v)}
          />
        </Section>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition disabled:opacity-50"
        >
          {saving ? (
            <RotateCw size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          Salvar todas as alterações
        </button>
      </div>
    </div>
  );
}
