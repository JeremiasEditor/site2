"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  Users,
  Eye,
  Flame,
  Target,
  Star,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
} from "lucide-react";

function YoutubeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const projects = [
  {
    client: "Carlos Santana",
    type: "Long-form Content",
    description: "Canal de Roblox com alcance massivo e engajamento consistente.",
    stats: ["3,4 milhões de inscritos", "319.748.548 visualizações"],
    youtube: "https://www.youtube.com/@IamCarlosSantana/videos",
    instagram: "",
    image: "/assets/carlos-santana.jpg",
    color: "from-red-500/20 to-orange-500/10",
    accentColor: "border-red-500/30",
  },
  {
    client: "Viaja Britto",
    type: "Long-form Content",
    description: "Canal de viagens para YouTube com crescimento acelerado.",
    stats: ["48.6K inscritos", "15.904.413 visualizações"],
    youtube: "https://www.youtube.com/@Viajabrito/videos",
    instagram: "",
    image: "/assets/viaja-britto.jpg",
    color: "from-primary/20 to-rose-500/10",
    accentColor: "border-primary/30",
  },
  {
    client: "O Meu Perfil Geek",
    type: "Long-form Content",
    description: "Canal focado em anime e cultura geek com comunidade engajada.",
    stats: ["11.3K inscritos", "1.618.621 visualizações"],
    youtube: "https://www.youtube.com/@omeuperfilgeek",
    instagram: "",
    image: "/assets/perfil-geek.jpg",
    color: "from-primary/20 to-pink-500/10",
    accentColor: "border-pink-500/30",
  },
];

const categories = [
  { icon: Flame, label: "Reels Virais" },
  { icon: Target, label: "Anúncios/Criativos" },
  { icon: Star, label: "Long-form" },
];

export default function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setActiveIndex((i) => (i + 1) % projects.length);

  const project = projects[activeIndex];

  return (
    <section id="portfolio" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,27,27,0.05)_0%,transparent_60%)]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary/80 font-medium">
            Destaques
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Projetos que geraram{" "}
            <span className="gradient-text-red">resultados reais</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            projetos que geraram resultados reais para os meus clientes
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((cat, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/50 hover:text-primary hover:border-primary/20 transition-all duration-300 cursor-default"
            >
              <cat.icon size={14} />
              {cat.label}
            </div>
          ))}
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative"
        >
          {/* Main carousel card */}
          <div className="relative overflow-hidden rounded-3xl glass border border-white/[0.06]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative"
              >
                {/* Gradient accent */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60`}
                />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                <div className="relative z-10 p-8 md:p-14">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
                    {/* Profile image */}
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-28 h-28 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-primary/10 border-2 ${project.accentColor} shadow-lg`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.image}
                          alt={project.client}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-primary/40"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>`;
                            }
                          }}
                        />
                      </div>
                      {/* Featured badge */}
                      <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                        <Star size={16} className="text-white fill-white" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold border border-primary/20">
                          ★ Destaque
                        </span>
                        <span className="text-xs text-white/40 tracking-wider uppercase">
                          {project.type}
                        </span>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        {project.client}
                      </h3>

                      <p className="text-white/50 mb-6 text-base">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-4 mb-6">
                        {project.stats.map((stat, j) => (
                          <div
                            key={j}
                            className="flex items-center gap-2 glass px-4 py-2 rounded-xl"
                          >
                            {j === 0 ? (
                              <Users size={14} className="text-primary" />
                            ) : (
                              <Eye size={14} className="text-primary" />
                            )}
                            <span className="text-white/80 text-sm font-medium">
                              {stat}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Social icons — prominent */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/30 uppercase tracking-wider mr-1">
                          Acessar:
                        </span>
                        {project.youtube && (
                          <a
                            href={project.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600/15 hover:bg-red-600/30 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 transition-all duration-300 font-medium text-sm"
                          >
                            <YoutubeIcon size={18} />
                            YouTube
                          </a>
                        )}
                        {project.instagram && (
                          <a
                            href={project.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-600/15 hover:bg-pink-600/30 border border-pink-500/20 hover:border-pink-500/40 text-pink-400 hover:text-pink-300 transition-all duration-300 font-medium text-sm"
                          >
                            <InstagramIcon size={18} />
                            Instagram
                          </a>
                        )}
                        {/* Brand icon */}
                        <div className="ml-auto flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                          <Clapperboard size={14} className="text-primary/60" />
                          <span className="text-white/30 text-xs">
                            Jeremias &amp; co.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Prev / Next */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-xl glass hover:border-primary/30 hover:bg-primary/10 flex items-center justify-center text-white/60 hover:text-primary transition-all duration-300"
                aria-label="Projeto anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-xl glass hover:border-primary/30 hover:bg-primary/10 flex items-center justify-center text-white/60 hover:text-primary transition-all duration-300"
                aria-label="Próximo projeto"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIndex
                      ? "w-8 h-2 bg-primary"
                      : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Ir para projeto ${i + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <span className="text-white/30 text-sm font-mono">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          {/* Thumbnail strip */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {projects.map((p, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative rounded-xl overflow-hidden glass p-4 text-left transition-all duration-300 ${
                  i === activeIndex
                    ? "border-primary/40 bg-primary/5"
                    : "hover:border-white/10 hover:bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 ${
                      i === activeIndex ? "bg-primary/20" : ""
                    }`}
                  >
                    <Star
                      size={14}
                      className={
                        i === activeIndex
                          ? "text-primary fill-primary"
                          : "text-white/30"
                      }
                    />
                  </div>
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-semibold truncate ${
                        i === activeIndex ? "text-white" : "text-white/50"
                      }`}
                    >
                      {p.client}
                    </p>
                    <p className="text-xs text-white/30 truncate">{p.type}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* YT Jobs link — hidden in footer area, very small */}
        <div className="text-center mt-16">
          <a
            href="https://www.ytjobs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-white/15 hover:text-white/30 transition-colors duration-300"
          >
            ytjobs
          </a>
        </div>
      </div>
    </section>
  );
}