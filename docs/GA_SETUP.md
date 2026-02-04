# Guía de Configuración de Google Analytics (GA4)

Esta guía te ayudará a configurar Google Analytics 4 (GA4) en la aplicación ConTacto.

## 1. Configuración Inicial

1. Ve a [Google Analytics](https://analytics.google.com/).
2. Crea una cuenta nueva o utiliza una existente.
3. Crea una propiedad GA4.
4. En el flujo de datos web, copia el **ID de medición** (formato `G-XXXXXXXXXX`).
5. Pega este ID en tu archivo `.env.local` (o `.env`):
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

## 2. Verificación

1. Ejecuta la aplicación en modo desarrollo.
2. Abre la consola del navegador y verifica que no haya errores relacionados con Google Analytics.
3. Puedes usar la extensión "Google Analytics Debugger" para Chrome para verificar que los eventos se están enviando.

---

**Nota**: Si no configuras el `NEXT_PUBLIC_GA_ID`, el componente `GoogleAnalytics` no se inicializará y no se realizará ningún rastreo.
