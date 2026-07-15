import type { Metadata } from "next";
import { getContent } from "@/lib/content.server";
import { ContentProvider } from "@/context/ContentContext";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import PortfolioVideos from "@/components/PortfolioVideos";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfólio — Jeremias & co.",
  description:
    "Projetos e vídeos editados por Jeremias & co. — cases reais de retenção e engajamento.",
};

export default async function PortfolioPage() {
  const content = await getContent();

  return (
    <ContentProvider content={content}>
      <Navbar />
      {/* pt-24 evita que o conteúdo fique escondido atrás do menu fixo */}
      <main className="pt-24">
        {content.portfolio.channelHref && (
          <div className="max-w-7xl mx-auto px-6 pt-8 flex justify-center">
            <a
              href={content.portfolio.channelHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.35)]"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.09 0 12 0 12s0 3.91.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.91 24 12 24 12s0-3.91-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
              </svg>
              {content.portfolio.channelLabel}
            </a>
          </div>
        )}
        <Portfolio />
        <PortfolioVideos />
      </main>
      <Footer />
      <WhatsAppButton />
    </ContentProvider>
  );
}
