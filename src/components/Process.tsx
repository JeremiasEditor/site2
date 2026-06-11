"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Target, Clapperboard, Rocket } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Briefing",
    description:
      "Entendemos suas necessidades, referências e objetivos do projeto.",
    step: "01",
  },
  {
    icon: Target,
    title: "Estratégia",
    description:
      "Planejamos o conteúdo com foco em engajamento e retenção máxima.",
    step: "02",
  },
  {
    icon: Clapperboard,
    title: "Edição Cinematográfica",
    description:
      "Aplicamos técnicas profissionais de color grading, motion design e sound design.",
    step: "03",
  },
  {
    icon: Rocket,
    title: "Entrega Otimizada",
    description:
      "Entregamos o projeto finalizado, otimizado para a plataforma escolhida.",
    step: "04",
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="processo" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,27,27,0.04)_0%,transparent_60%)]" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary/80 font-medium">
            Como Funciona
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Processo{" "}
            <span className="gradient-text-red">simplificado</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Do briefing à entrega final, cada etapa é cuidadosamente executada.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group relative"
              >
                <div className="relative glass rounded-2xl p-8 text-center h-full hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-500">
                  {/* Step number */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-dark border border-primary/20 rounded-full text-xs text-primary font-mono">
                      {step.step}
                    </span>
                  </div>

                  {/* Glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                  <div className="relative z-10 pt-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>

                    <h3 className="text-lg font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector dot */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary/40 rounded-full z-20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
