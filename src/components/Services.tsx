"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Construction,
  MessageCircle,
  Megaphone,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Crown,
  Handshake,
} from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/5562994914290?text=Olá! Gostaria de saber mais sobre os serviços da Jeremias %26 co.";

type Plan = {
  name: string;
  icon: React.ElementType;
  description: string;
  price: string;
  highlight?: boolean;
  isPartnership?: boolean;
};

type ServiceCategory = {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  plans: Plan[];
};

function YoutubeIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
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
      className={className}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function InstagramIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
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
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
const serviceCategories: ServiceCategory[] = [
  {
    id: "youtube",
    icon: YoutubeIcon,
    title: "Produção para YouTube",
    subtitle: "Vídeos long-form otimizados para retenção e crescimento de canal",
    plans: [
      {
        name: "Silver",
        icon: Sparkles,
        description:
          "Vídeos até 10 min · máx. 20 min de bruto · Edição simples · Pacote mensal",
        price: "A partir de R$ 100,00",
        highlight: false,
      },
      {
        name: "Gold",
        icon: Crown,
        description:
          "Vídeos até 20 min · máx. 30 min de bruto · Edição avançada · Pacote mensal · Consultoria inclusa",
        price: "A partir de R$ 200,00",
        highlight: true,
      },
      {
        name: "Parceria",
        icon: Handshake,
        description: "Condições especiais para parcerias de longo prazo. Entre em contato para discutir.",
        price: "A definir",
        isPartnership: true,
      },
    ],
  },
  {
    id: "instagram",
    icon: InstagramIcon,
    title: "Produção para Instagram / TikTok",
    subtitle: "Shorts e Reels de alta retenção para crescimento nas redes sociais",
    plans: [
      {
        name: "Silver",
        icon: Sparkles,
        description:
          "5 a 20 vídeos de até 1 min · máx. 2 min de bruto · Edição simples",
        price: "A partir de R$ 150,00",
        highlight: false,
      },
      {
        name: "Gold",
        icon: Crown,
        description:
          "10 a 30 vídeos de até 2 min · máx. 5 min de bruto · Edição avançada",
        price: "A partir de R$ 500,00",
        highlight: true,
      },
      {
        name: "Parceria",
        icon: Handshake,
        description: "Condições especiais para parcerias de longo prazo. Entre em contato para discutir.",
        price: "A definir",
        isPartnership: true,
      },
    ],
  },
  {
    id: "criativos",
    icon: Megaphone,
    title: "Produção de Criativos",
    subtitle: "Anúncios e criativos de alta conversão para campanhas de tráfego pago",
    plans: [
      {
        name: "Silver",
        icon: Sparkles,
        description:
          "5 a 20 criativos de até 1 min · máx. 2 min de bruto · Edição simples",
        price: "A partir de R$ 200,00",
        highlight: false,
      },
      {
        name: "Gold",
        icon: Crown,
        description:
          "10 a 30 criativos de até 1 min · máx. 5 min de bruto · Edição avançada",
        price: "A partir de R$ 600,00",
        highlight: true,
      },
      {
        name: "Parceria",
        icon: Handshake,
        description: "Condições especiais para parcerias de longo prazo. Entre em contato para discutir.",
        price: "A definir",
        isPartnership: true,
      },
    ],
  },
  {
    id: "thumbnail",
    icon: ImageIcon,
    title: "Criação de Thumbnail",
    subtitle: "Thumbnails profissionais que aumentam o CTR do seu canal",
    plans: [
      {
        name: "Silver",
        icon: Sparkles,
        description: "4 thumbnails profissionais",
        price: "R$ 89,00",
        highlight: false,
      },
      {
        name: "Gold",
        icon: Crown,
        description: "8 thumbnails profissionais",
        price: "R$ 169,00",
        highlight: true,
      },
      {
        name: "Ruby",
        icon: Crown,
        description: "12 thumbnails profissionais",
        price: "R$ 219,00",
        highlight: false,
      },
    ],
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`relative group rounded-2xl overflow-hidden transition-all duration-500 ${
        plan.highlight
          ? "glass border-primary/25 glow-red"
          : "glass hover:border-white/10"
      }`}
    >
      {plan.highlight && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      )}
      {plan.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="flex items-center gap-1 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full shadow-lg shadow-primary/30">
            <Sparkles size={10} />
            Mais Popular
          </span>
        </div>
      )}

      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          plan.highlight
            ? "from-primary/10 to-transparent"
            : "from-white/[0.02] to-transparent"
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="relative z-10 p-6 md:p-8 pt-8">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              plan.highlight ? "bg-primary/20" : "bg-white/5"
            }`}
          >
            <plan.icon
              size={18}
              className={plan.highlight ? "text-primary" : "text-white/40"}
            />
          </div>
          <h4
            className={`text-lg font-bold ${
              plan.highlight ? "text-white" : "text-white/80"
            }`}
          >
            {plan.name}
          </h4>
        </div>

        <p className="text-white/50 text-sm leading-relaxed mb-6">
          {plan.description}
        </p>

        <div className="h-px bg-white/5 mb-6" />

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-white/30 mb-1">Investimento</p>
            <p
              className={`text-xl font-bold ${
                plan.isPartnership
                  ? "text-white/40"
                  : plan.highlight
                  ? "gradient-text-red"
                  : "text-white"
              }`}
            >
              {plan.price}
            </p>
          </div>

          {!plan.isPartnership && (
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex-shrink-0 ${
                plan.highlight
                  ? "bg-primary text-white hover:shadow-[0_0_20px_rgba(255,27,27,0.4)] hover:scale-105"
                  : "bg-white/5 text-white/60 hover:bg-primary/20 hover:text-primary border border-white/5 hover:border-primary/20"
              }`}
            >
              <MessageCircle size={14} />
              Contratar
            </a>
          )}
          {plan.isPartnership && (
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60 border border-white/5 transition-all duration-300 flex-shrink-0"
            >
              <MessageCircle size={14} />
              Conversar
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ServiceSection({ category }: { category: ServiceCategory }) {
  const [open, setOpen] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      {/* Section header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 glass rounded-2xl p-6 hover:border-primary/20 hover:bg-white/[0.03] transition-all duration-300 text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <category.icon size={22} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white">
              {category.title}
            </h3>
            <p className="text-white/40 text-sm mt-0.5">{category.subtitle}</p>
          </div>
        </div>
        <div className="flex-shrink-0 text-white/40">
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {/* Plans grid */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`grid gap-4 mt-4 ${
            category.plans.length === 4
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {category.plans.map((plan, i) => (
            <PlanCard key={i} plan={plan} />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicos" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,27,27,0.06)_0%,transparent_60%)]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[180px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary/80 font-medium">
            Produtos &amp; Serviços
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Dê vida às suas{" "}
            <span className="gradient-text-red">idéias aqui</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto leading-relaxed">
            Seus criativos, criação de conteúdo, criação de site — talvez.
            Aprenda as técnicas profissionais usadas diariamente em projetos
            reconhecidos internacionalmente.
          </p>

          {/* Under construction notice */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full glass border-yellow-500/20 text-yellow-400/70 text-sm"
          >
            <Construction size={16} className="text-yellow-400/70" />
            Alguns serviços em construção — preços e detalhes sujeitos a
            alteração
          </motion.div>
        </motion.div>

        {/* Service categories */}
        <div>
          {serviceCategories.map((category) => (
            <ServiceSection key={category.id} category={category} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-white/40 mb-6 text-sm">
            Não encontrou o que procura? Entre em contato para um orçamento
            personalizado.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500/10 text-green-400 border border-green-500/20 rounded-xl font-medium hover:bg-green-500 hover:text-white transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Solicitar Orçamento no WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
