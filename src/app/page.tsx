"use client";

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

export default function Home() {
  return (
    <>
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
    </>
  );
}
