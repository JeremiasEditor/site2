"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clapperboard, Quote, CheckCircle2 } from "lucide-react";
import { useContent } from "@/context/ContentContext";

export default function About() {
  const { about } = useContent();
  const highlights = about.highlights;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="relative py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,27,27,0.06)_0%,transparent_60%)]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px]" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary/80 font-medium">
            {about.sectionLabel}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            {about.headingLead}{" "}
            <span className="gradient-text-red">{about.headingHighlight}</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">{about.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — identity card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Profile card */}
            <div className="relative glass rounded-3xl p-8 md:p-10 overflow-hidden">
              {/* Glow accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-red-400 to-transparent rounded-t-3xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl" />

              <div className="relative z-10">
                {/* Avatar placeholder */}
                <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                  <Clapperboard size={32} className="text-primary" />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {about.name}
                </h3>
                <p className="text-primary text-sm font-medium tracking-wide mb-6">
                  {about.role}
                </p>

                <div className="h-px bg-white/5 mb-6" />

                {/* Quote */}
                <div className="relative">
                  <Quote
                    size={20}
                    className="text-primary/40 mb-3 rotate-180"
                  />
                  <p className="text-white/60 text-sm leading-relaxed italic">
                    {about.quote}
                  </p>
                </div>

                {/* Brand tag */}
                <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <Clapperboard size={14} className="text-primary" />
                  <span className="text-primary text-xs font-medium tracking-wider uppercase">
                    Jeremias &amp; co.
                  </span>
                </div>
              </div>
            </div>

            {/* Floating accent card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 glass rounded-2xl p-4 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">
                    {about.floatingCardValue}
                  </p>
                  <p className="text-white/40 text-xs">
                    {about.floatingCardLabel}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — bio text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="space-y-6"
          >
            <p className="text-white/80 text-lg leading-relaxed">
              {about.bioParagraph1}
            </p>

            <p className="text-white/60 leading-relaxed">
              {about.bioParagraph2}
            </p>

            <p className="text-white/60 leading-relaxed">
              {about.bioParagraph3}
            </p>

            {/* Highlights */}
            <div className="space-y-3 pt-2">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={16}
                    className="text-primary mt-0.5 flex-shrink-0"
                  />
                  <span className="text-white/60 text-sm leading-relaxed">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="pt-4"
            >
              <a
                href={about.ctaHref}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:shadow-[0_0_30px_rgba(255,27,27,0.3)] hover:scale-105 transition-all duration-300"
              >
                {about.ctaLabel}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
