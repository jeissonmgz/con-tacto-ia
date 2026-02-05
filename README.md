# ConTacto

**Asistente de Comunicación Estratégica**

ConTacto es una aplicación web diseñada para ayudarte a navegar conversaciones difíciles con inteligencia emocional y estrategia.

## 🎯 Objetivo de la App

Un asistente conversacional con IA que:
- **Recibe un mensaje** que alguien quiere responder.
- **Analiza el contexto**, intención y tono emocional.
- **Devuelve sugerencias** de qué decir y cómo decirlo, optimizadas para el objetivo (convencer, aclarar, negociar, ser empático, etc.).

## ✨ Características Principales

- **Análisis Profundo**: Detecta el tono emocional, mensajes implícitos y riesgos potenciales en los mensajes recibidos.
- **Contexto Personalizable**: Ajusta el análisis según el medio (chat, email), ámbito (trabajo, personal) y relación (jefe, pareja, cliente).
- **Canvas de Respuesta**: Un editor inteligente donde puedes refinar la respuesta sugerida por la IA.
- **Historial Local**: Guarda tus análisis y respuestas de forma segura en tu dispositivo.
- **Notas y Comentarios**: Agrega reflexiones personales a cada análisis para un seguimiento detallado.

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS + Framer Motion
- **IA**: Google Gemini API (Modelo Flash 1.5)
- **Estado**: Zustand (con persistencia local)
- **Analítica**: Google Tag Manager & Microsoft Clarity

## 🚀 Comenzar

### Prerrequisitos

- Node.js 18+
- Una API Key de Google Gemini

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/contacto.git
   cd contacto
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env.local` en la raíz del proyecto y agrega tus claves:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=tu_api_key_de_gemini
   NEXT_PUBLIC_GTM_ID=tu_id_de_gtm (Opcional)
   NEXT_PUBLIC_CLARITY_PROJECT_ID=tu_id_de_clarity (Opcional)
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📊 Guías de Configuración

- [Configuración de Google Tag Manager](./GTM_SETUP.md)
- [Configuración de Microsoft Clarity](./docs/CLARITY_SETUP.md)
- [Configuración de Google Analytics](./docs/GA_SETUP.md)
- [Configuración de Cloudflare Turnstile](./docs/TURNSTILE_SETUP.md)

---

Demo: https://contacto.vercel.app

Hecho con ❤️ para mejorar la comunicación humana.
