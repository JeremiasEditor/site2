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
  title: "Jeremias & co. — Studio de Edição de Vídeo | Máquinas de Retenção",
  description:
    "Transformando vídeos comuns em máquinas de retenção. Edição profissional para YouTube, Instagram, Reels, criativos e conteúdo de alta retenção. 150+ projetos entregues.",
  keywords: [
    "editor de vídeo",
    "edição profissional",
    "edição cinematográfica",
    "YouTube editor",
    "Jeremias editor",
    "Jeremias & co",
    "studio de edição",
    "retenção de vídeo",
    "video editing",
    "criativos",
  ],
  authors: [{ name: "Jeremias Bruno" }],
  openGraph: {
    title: "Jeremias & co. — Studio de Edição de Vídeo",
    description:
      "Transformando vídeos comuns em máquinas de retenção. 150+ projetos entregues.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeremias & co. — Studio de Edição de Vídeo",
    description:
      "Transformando vídeos comuns em máquinas de retenção. 150+ projetos entregues.",
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
