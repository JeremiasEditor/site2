import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SecretKeystroke from "@/components/SecretKeystroke";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Jeremias — Editor de Vídeo Profissional | Edição Cinematográfica",
  description:
    "Transformando vídeos comuns em experiências cinematográficas. Edição profissional para YouTube, Instagram, Reels, documentários e conteúdo de alta retenção.",
  keywords: [
    "editor de vídeo",
    "edição profissional",
    "edição cinematográfica",
    "YouTube editor",
    "Jeremias editor",
    "video editing",
  ],
  authors: [{ name: "Jeremias" }],
  openGraph: {
    title: "Jeremias — Editor de Vídeo Profissional",
    description:
      "Edição cinematográfica profissional. +100 projetos entregues.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeremias — Editor de Vídeo Profissional",
    description:
      "Edição cinematográfica profissional. +100 projetos entregues.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark text-white font-sans`}
      >
        <SecretKeystroke />
        {children}
      </body>
    </html>
  );
}
