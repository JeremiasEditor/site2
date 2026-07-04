"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Play, MessageCircle, Clapperboard } from "lucide-react";
import Particles from "./Particles";
import { useContent } from "@/context/ContentContext";

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  isText = false,
  textValue = "",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  isText?: boolean;
  textValue?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || isText) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, isText]);

  if (isText) {
    return <span ref={ref}>{textValue}</span>;
  }

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const { hero } = useContent();
  const stats = hero.stats;
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [hero.backgroundVideoUrl]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Video background */}
      <div className="absolute inset-0 bg-dark" />
      <video
        ref={videoRef}
        key={hero.backgroundVideoUrl}
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        src={hero.backgroundVideoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Texture overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: "url('/assets/texture.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,27,27,0.10)_0%,transparent_70%)]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <Particles />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-32 pb-20">
        {/* Brand badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs md:text-sm text-white/70 tracking-widest uppercase font-medium">
            <Clapperboard size={14} className="text-primary" />
            {hero.badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8"
        >
          {hero.titleLine1}{" "}
          <span className="gradient-text-red text-glow-red">
            {hero.titleHighlight}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="text-base md:text-lg text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <a
            href={hero.primaryCta.href}
            className="group relative px-8 py-4 bg-primary text-white font-medium rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,27,27,0.3)] hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play size={18} />
              {hero.primaryCta.label}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href={hero.secondaryCta.href}
            className="group px-8 py-4 glass text-white/80 font-medium rounded-xl hover:text-white hover:border-primary/30 transition-all duration-300 flex items-center gap-2"
          >
            <MessageCircle size={18} />
            {hero.secondaryCta.label}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                <AnimatedCounter
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  isText={stat.isText}
                  textValue={stat.textValue}
                />
              </div>
              <div className="text-sm text-white/40">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
    </section>
  );
}
