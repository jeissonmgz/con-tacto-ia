import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google';
import Clarity from "@/components/Clarity";
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
  title: "ConTacto | Asistente de Comunicación",
  description: "Analiza mensajes y responde con tacto, claridad y estrategia.",
  openGraph: {
    title: "ConTacto | Asistente de Comunicación",
    description: "Analiza mensajes y responde con tacto, claridad y estrategia.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "ConTacto",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ConTacto Preview",
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
      <Clarity />
      <body
        className={`${inter.variable} ${playfair.variable} antialiased font-sans bg-slate-50 text-slate-900`}
      >
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
