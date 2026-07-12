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
        <Portfolio />
        <PortfolioVideos />
      </main>
      <Footer />
      <WhatsAppButton />
    </ContentProvider>
  );
}
