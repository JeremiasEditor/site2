import { getContent } from "@/lib/content.server";
import { ContentProvider } from "@/context/ContentContext";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import PortfolioVideos from "@/components/PortfolioVideos";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const dynamic = "force-dynamic";

export default function Home() {
  const content = getContent();

  return (
    <ContentProvider content={content}>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <PortfolioVideos />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </ContentProvider>
  );
}
