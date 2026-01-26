import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google';
import Clarity from "@/components/Clarity";
import StructuredData from "@/components/SEO/StructuredData";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://contacto.app'),
  title: "ConTacto | Asistente de Comunicación",
  description: "Analiza mensajes y responde con tacto, claridad y estrategia.",
  keywords: ["comunicación", "asistente IA", "tacto", "inteligencia emocional", "mensajería", "estrategia"],
  authors: [{ name: "ConTacto Team" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "ConTacto | Asistente de Comunicación",
    description: "Analiza mensajes y responde con tacto, claridad y estrategia.",
    url: "/",
    siteName: "ConTacto",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ConTacto - Asistente de Comunicación con Tacto",
        type: "image/png",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ConTacto | Asistente de Comunicación",
    description: "Analiza mensajes y responde con tacto, claridad y estrategia.",
    images: ["/og-image.png"],
    creator: "@contacto_app", // Placeholder
  },
  alternates: {
    canonical: "/",
  },
};

import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased font-sans bg-slate-50 text-slate-900`}
      >
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
        <Clarity />
        <StructuredData />
        {children}
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
