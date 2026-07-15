/**
 * Tipos que descrevem TODO o conteúdo editável do site
 * (textos, links e o vídeo de fundo). Tudo isso pode ser
 * alterado pelo painel de administração em /admin.
 *
 * Este arquivo é isomórfico (pode ser importado no cliente e no
 * servidor). A leitura/escrita em disco fica em content.server.ts.
 */

export interface LinkItem {
  label: string;
  href: string;
}

export interface HeroStat {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  isText: boolean;
  textValue: string;
}

export interface HeroContent {
  backgroundVideoUrl: string;
  badge: string;
  titleLine1: string;
  titleHighlight: string;
  subtitle: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  stats: HeroStat[];
}

export interface AboutContent {
  sectionLabel: string;
  headingLead: string;
  headingHighlight: string;
  subtitle: string;
  photoUrl: string;
  name: string;
  role: string;
  quote: string;
  bioParagraph1: string;
  bioParagraph2: string;
  bioParagraph3: string;
  highlights: string[];
  floatingCardValue: string;
  floatingCardLabel: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface PortfolioProject {
  client: string;
  type: string;
  description: string;
  stats: string[];
  youtube: string;
  instagram: string;
  image: string;
}

export interface PortfolioContent {
  sectionLabel: string;
  headingLead: string;
  headingHighlight: string;
  subtitle: string;
  categories: string[];
  projects: PortfolioProject[];
  ytjobsHref: string;
  channelHref: string;
  channelLabel: string;
}

export interface PortfolioVideosContent {
  sectionLabel: string;
  headingLead: string;
  headingHighlight: string;
}

export interface ServicePlan {
  name: string;
  description: string;
  price: string;
  highlight: boolean;
  isPartnership: boolean;
}

export interface ServiceCategoryContent {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  plans: ServicePlan[];
}

export interface ServicesContent {
  sectionLabel: string;
  headingLead: string;
  headingHighlight: string;
  description: string;
  constructionNotice: string;
  whatsappUrl: string;
  bottomText: string;
  bottomCtaLabel: string;
  categories: ServiceCategoryContent[];
}

export interface ProcessStep {
  icon: string;
  title: string;
  description: string;
  step: string;
}

export interface ProcessContent {
  sectionLabel: string;
  headingLead: string;
  headingHighlight: string;
  subtitle: string;
  steps: ProcessStep[];
}

export interface ContactInfoItem {
  icon: string;
  label: string;
  value: string;
  href: string;
}

export interface ContactContent {
  sectionLabel: string;
  headingLead: string;
  headingHighlight: string;
  info: ContactInfoItem[];
  whatsappHref: string;
  whatsappLabel: string;
}

export interface FooterSocial {
  icon: string;
  href: string;
  label: string;
}

export interface FooterContent {
  copyright: string;
  socials: FooterSocial[];
}

export interface SiteContent {
  navbar: {
    links: LinkItem[];
    ctaLabel: string;
    ctaHref: string;
  };
  hero: HeroContent;
  about: AboutContent;
  portfolio: PortfolioContent;
  portfolioVideos: PortfolioVideosContent;
  services: ServicesContent;
  process: ProcessContent;
  contact: ContactContent;
  footer: FooterContent;
  whatsapp: {
    href: string;
  };
}

const WHATSAPP_URL =
  "https://wa.me/5562994914290?text=Olá! Gostaria de saber mais sobre os serviços da Jeremias %26 co.";

export const defaultContent: SiteContent = {
  navbar: {
    links: [
      { label: "Início", href: "#hero" },
      { label: "Sobre", href: "#sobre" },
      { label: "Portfólio", href: "#portfolio" },
      { label: "Serviços", href: "#servicos" },
      { label: "Processo", href: "#processo" },
      { label: "Contato", href: "#contato" },
    ],
    ctaLabel: "Contato",
    ctaHref: "#contato",
  },
  hero: {
    backgroundVideoUrl: "/assets/reel.mp4",
    badge: "Jeremias & co. — Studio de Edição",
    titleLine1: "Transformando vídeos comuns em",
    titleHighlight: "máquinas de retenção.",
    subtitle:
      "Edição profissional para YouTube, Instagram, Reels, vídeos virais, documentários e conteúdo de alta retenção.",
    primaryCta: { label: "Ver Portfólio", href: "#portfolio" },
    secondaryCta: { label: "Entrar em Contato", href: "#contato" },
    stats: [
      { value: 150, prefix: "", suffix: "+", label: "Projetos Entregues", isText: false, textValue: "" },
      { value: 0, prefix: "", suffix: "", label: "Visualizações Geradas", isText: true, textValue: "+1m views" },
      { value: 300, prefix: "+", suffix: "%", label: "Aumento Médio de Engajamento", isText: false, textValue: "" },
    ],
  },
  about: {
    sectionLabel: "Quem está por trás",
    headingLead: "Fundador &",
    headingHighlight: "Editor de Vídeo",
    subtitle:
      "Jeremias & co. — studio de edição focado em retenção e engajamento real.",
    photoUrl: "",
    name: "Jeremias Bruno",
    role: "Fundador e Editor de vídeo na Jeremias & co.",
    quote:
      "Minha abordagem é simples: trato todo projeto como o vídeo mais importante do mundo. Independente do tamanho do seu anúncio ou do seu canal, você vai receber a mesma obsessão pelo detalhe e compromisso de verdade com o seu resultado.",
    bioParagraph1:
      "Olá, eu sou Jeremias Bruno, Fundador e Editor de vídeo na Jeremias & co.",
    bioParagraph2:
      "Eu transformo a retenção e engajamento dos meus clientes, crio vídeos que verdadeiramente vendem e já trabalhei com numerosos criadores de conteúdo.",
    bioParagraph3:
      "Com verdadeira experiência na área, tenho vários cases de sucesso, criando visuais impressionantes — mas principalmente sou especializado em ajudar criadores a recuperar o fôlego do canal.",
    highlights: [
      "Trato todo projeto como o vídeo mais importante do mundo.",
      "Especializado em recuperar o fôlego de canais.",
      "Vários cases de sucesso com criadores de conteúdo.",
      "Obsessão pelo detalhe e compromisso com o seu resultado.",
    ],
    floatingCardValue: "150+",
    floatingCardLabel: "Projetos entregues",
    ctaLabel: "Vamos trabalhar juntos",
    ctaHref: "#contato",
  },
  portfolio: {
    sectionLabel: "Destaques",
    headingLead: "Projetos que geraram",
    headingHighlight: "resultados reais",
    subtitle: "projetos que geraram resultados reais para os meus clientes",
    categories: ["Reels Virais", "Anúncios/Criativos", "Long-form"],
    projects: [
      {
        client: "Carlos Santana",
        type: "Long-form Content",
        description:
          "Canal de Roblox com alcance massivo e engajamento consistente.",
        stats: ["3,4 milhões de inscritos", "319.748.548 visualizações"],
        youtube: "https://www.youtube.com/@IamCarlosSantana/videos",
        instagram: "",
        image: "/assets/carlos-santana.jpg",
      },
      {
        client: "Viaja Britto",
        type: "Long-form Content",
        description: "Canal de viagens para YouTube com crescimento acelerado.",
        stats: ["48.6K inscritos", "15.904.413 visualizações"],
        youtube: "https://www.youtube.com/@Viajabrito/videos",
        instagram: "",
        image: "/assets/viaja-britto.jpg",
      },
      {
        client: "O Meu Perfil Geek",
        type: "Long-form Content",
        description:
          "Canal focado em anime e cultura geek com comunidade engajada.",
        stats: ["11.3K inscritos", "1.618.621 visualizações"],
        youtube: "https://www.youtube.com/@omeuperfilgeek",
        instagram: "",
        image: "/assets/perfil-geek.jpg",
      },
    ],
    ytjobsHref: "https://www.ytjobs.com/",
    channelHref: "https://ytjobs.co/talent/vitrine/431900",
    channelLabel: "Ver canal no YouTube",
  },
  portfolioVideos: {
    sectionLabel: "Vídeos em Destaque",
    headingLead: "Portfólio de",
    headingHighlight: "Vídeos",
  },
  services: {
    sectionLabel: "Produtos & Serviços",
    headingLead: "Dê vida às suas",
    headingHighlight: "idéias aqui",
    description:
      "Seus criativos, criação de conteúdo, criação de site — talvez. Aprenda as técnicas profissionais usadas diariamente em projetos reconhecidos internacionalmente.",
    constructionNotice:
      "Alguns serviços em construção — preços e detalhes sujeitos a alteração",
    whatsappUrl: WHATSAPP_URL,
    bottomText:
      "Não encontrou o que procura? Entre em contato para um orçamento personalizado.",
    bottomCtaLabel: "Solicitar Orçamento no WhatsApp",
    categories: [
      {
        id: "youtube",
        icon: "youtube",
        title: "Produção para YouTube",
        subtitle:
          "Vídeos long-form otimizados para retenção e crescimento de canal",
        plans: [
          {
            name: "Silver",
            description:
              "Vídeos até 10 min · máx. 20 min de bruto · Edição simples · Pacote mensal",
            price: "A partir de R$ 100,00",
            highlight: false,
            isPartnership: false,
          },
          {
            name: "Gold",
            description:
              "Vídeos até 20 min · máx. 30 min de bruto · Edição avançada · Pacote mensal · Consultoria inclusa",
            price: "A partir de R$ 200,00",
            highlight: true,
            isPartnership: false,
          },
          {
            name: "Parceria",
            description:
              "Condições especiais para parcerias de longo prazo. Entre em contato para discutir.",
            price: "A definir",
            highlight: false,
            isPartnership: true,
          },
        ],
      },
      {
        id: "instagram",
        icon: "instagram",
        title: "Produção para Instagram / TikTok",
        subtitle:
          "Shorts e Reels de alta retenção para crescimento nas redes sociais",
        plans: [
          {
            name: "Silver",
            description:
              "5 a 20 vídeos de até 1 min · máx. 2 min de bruto · Edição simples",
            price: "A partir de R$ 150,00",
            highlight: false,
            isPartnership: false,
          },
          {
            name: "Gold",
            description:
              "10 a 30 vídeos de até 2 min · máx. 5 min de bruto · Edição avançada",
            price: "A partir de R$ 500,00",
            highlight: true,
            isPartnership: false,
          },
          {
            name: "Parceria",
            description:
              "Condições especiais para parcerias de longo prazo. Entre em contato para discutir.",
            price: "A definir",
            highlight: false,
            isPartnership: true,
          },
        ],
      },
      {
        id: "criativos",
        icon: "megaphone",
        title: "Produção de Criativos",
        subtitle:
          "Anúncios e criativos de alta conversão para campanhas de tráfego pago",
        plans: [
          {
            name: "Silver",
            description:
              "5 a 20 criativos de até 1 min · máx. 2 min de bruto · Edição simples",
            price: "A partir de R$ 200,00",
            highlight: false,
            isPartnership: false,
          },
          {
            name: "Gold",
            description:
              "10 a 30 criativos de até 1 min · máx. 5 min de bruto · Edição avançada",
            price: "A partir de R$ 600,00",
            highlight: true,
            isPartnership: false,
          },
          {
            name: "Parceria",
            description:
              "Condições especiais para parcerias de longo prazo. Entre em contato para discutir.",
            price: "A definir",
            highlight: false,
            isPartnership: true,
          },
        ],
      },
      {
        id: "thumbnail",
        icon: "image",
        title: "Criação de Thumbnail",
        subtitle: "Thumbnails profissionais que aumentam o CTR do seu canal",
        plans: [
          {
            name: "Silver",
            description: "4 thumbnails profissionais",
            price: "R$ 89,00",
            highlight: false,
            isPartnership: false,
          },
          {
            name: "Gold",
            description: "8 thumbnails profissionais",
            price: "R$ 169,00",
            highlight: true,
            isPartnership: false,
          },
          {
            name: "Ruby",
            description: "12 thumbnails profissionais",
            price: "R$ 219,00",
            highlight: false,
            isPartnership: false,
          },
        ],
      },
    ],
  },
  process: {
    sectionLabel: "Como Funciona",
    headingLead: "Processo",
    headingHighlight: "simplificado",
    subtitle:
      "Do briefing à entrega final, cada etapa é cuidadosamente executada.",
    steps: [
      {
        icon: "file-text",
        title: "Briefing",
        description:
          "Entendemos suas necessidades, referências e objetivos do projeto.",
        step: "01",
      },
      {
        icon: "target",
        title: "Estratégia",
        description:
          "Planejamos o conteúdo com foco em engajamento e retenção máxima.",
        step: "02",
      },
      {
        icon: "clapperboard",
        title: "Edição Cinematográfica",
        description:
          "Aplicamos técnicas profissionais de color grading, motion design e sound design.",
        step: "03",
      },
      {
        icon: "rocket",
        title: "Entrega Otimizada",
        description:
          "Entregamos o projeto finalizado, otimizado para a plataforma escolhida.",
        step: "04",
      },
    ],
  },
  contact: {
    sectionLabel: "Vamos Conversar",
    headingLead: "Tem um projeto em mente?",
    headingHighlight: "Vamos conversar.",
    info: [
      {
        icon: "mail",
        label: "Email",
        value: "editorjeremias@gmail.com",
        href: "mailto:editorjeremias@gmail.com",
      },
      {
        icon: "phone",
        label: "Telefone",
        value: "+55 62 99491-4290",
        href: "https://wa.me/5562994914290",
      },
      {
        icon: "map-pin",
        label: "Localização",
        value: "Goiás, Brasil",
        href: "",
      },
    ],
    whatsappHref:
      "https://wa.me/5562994914290?text=Olá! Gostaria de saber mais sobre seus serviços de edição.",
    whatsappLabel: "Chamar no WhatsApp",
  },
  footer: {
    copyright: "© 2026 — Todos os direitos reservados.",
    socials: [
      { icon: "instagram", href: "https://www.instagram.com/", label: "Instagram" },
      { icon: "youtube", href: "https://www.youtube.com/", label: "YouTube" },
      { icon: "mail", href: "mailto:editorjeremias@gmail.com", label: "Email" },
    ],
  },
  whatsapp: {
    href: "https://wa.me/5562994914290?text=Olá! Gostaria de saber mais sobre seus serviços de edição.",
  },
};

/** Faz merge profundo do conteúdo salvo por cima dos valores padrão. */
export function deepMerge<T>(base: T, override: unknown): T {
  if (Array.isArray(base)) {
    return (Array.isArray(override) ? override : base) as T;
  }
  if (base && typeof base === "object") {
    const result: Record<string, unknown> = {
      ...(base as Record<string, unknown>),
    };
    if (override && typeof override === "object") {
      for (const key of Object.keys(base as Record<string, unknown>)) {
        const o = (override as Record<string, unknown>)[key];
        if (o !== undefined) {
          result[key] = deepMerge((base as Record<string, unknown>)[key], o);
        }
      }
    }
    return result as T;
  }
  return (override === undefined ? base : (override as T)) as T;
}
