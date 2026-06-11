"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Package, Music, FileAudio, ArrowRight, Sparkles } from "lucide-react";

const products = [
  {
    icon: Package,
    title: "Box do Editor Gringo",
    price: "R$ 39,99",
    color: "from-primary to-orange-500",
    popular: true,
  },
  {
    icon: Music,
    title: "Box de Sounds Premium",
    price: "R$ 29,00",
    color: "from-primary to-rose-500",
    popular: false,
  },
  {
    icon: FileAudio,
    title: "Box de Músicas Não Autorais",
    price: "R$ 9,99",
    color: "from-primary to-red-400",
    popular: false,
  },
];

export default function Courses() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cursos" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,27,27,0.06)_0%,transparent_60%)]" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary/80 font-medium">
            Produtos Digitais
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Do 0 ao{" "}
            <span className="gradient-text-red">Primeiro Cliente</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Aprenda as técnicas profissionais usadas diariamente em projetos
            reconhecidos internacionalmente.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative"
            >
              {product.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <span className="flex items-center gap-1 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                    <Sparkles size={12} />
                    Mais Vendido
                  </span>
                </div>
              )}

              <div
                className={`relative glass rounded-2xl p-8 h-full transition-all duration-500 hover:border-primary/20 hover:bg-white/[0.04] ${
                  product.popular ? "border-primary/20 glow-red" : ""
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                />

                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.color} bg-opacity-10 flex items-center justify-center mb-6`}
                    style={{ background: `linear-gradient(135deg, rgba(255,27,27,0.15), rgba(255,27,27,0.05))` }}
                  >
                    <product.icon className="w-6 h-6 text-primary" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-4">
                    {product.title}
                  </h3>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl font-bold gradient-text-red">
                      {product.price}
                    </span>
                  </div>

                  <div className="h-px bg-white/5 mb-6" />

                  <button className="w-full py-3 rounded-xl bg-white/5 text-white/70 text-sm font-medium hover:bg-primary/20 hover:text-primary transition-all duration-300 group-hover:bg-primary/10">
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <a
            href="#contato"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary/10 text-primary border border-primary/20 rounded-xl font-medium hover:bg-primary hover:text-white transition-all duration-300 group"
          >
            Ver Cursos e Produtos
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
