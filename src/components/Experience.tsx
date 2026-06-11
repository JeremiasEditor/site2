"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Cpu, TrendingUp } from "lucide-react";

const cards = [
  {
    icon: Award,
    title: "Experiência Comprovada",
    text: "Mais de 100 projetos entregues com excelência.",
    accent: "from-primary/20 to-orange-500/10",
  },
  {
    icon: Cpu,
    title: "Técnicas Avançadas",
    text: "Domínio completo do pacote Adobe, DaVinci Resolve e ferramentas de IA variadas.",
    accent: "from-primary/20 to-rose-500/10",
  },
  {
    icon: TrendingUp,
    title: "Resultados Garantidos",
    text: "Experiência ampla em engajamento, retenção e viralização de conteúdo.",
    accent: "from-primary/20 to-red-400/10",
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experiencia" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,27,27,0.04)_0%,transparent_60%)]" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary/80 font-medium">
            Por que me escolher
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Experiência que{" "}
            <span className="gradient-text-red">gera resultados</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Cada projeto é tratado com dedicação, criatividade e foco em
            performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative rounded-2xl overflow-hidden"
            >
              <div className="relative glass rounded-2xl p-8 md:p-10 h-full transition-all duration-500 hover:border-primary/20 hover:bg-white/[0.04]">
                {/* Hover glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <card.icon className="w-6 h-6 text-primary" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-white transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-white/40 leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                    {card.text}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
