# Guía de Configuración de Microsoft Clarity

Esta guía te ayudará a configurar Microsoft Clarity para obtener mapas de calor y grabaciones de sesión en ConTacto.

## 1. Configuración Inicial

1. Ve a [Microsoft Clarity](https://clarity.microsoft.com/).
2. Inicia sesión y crea un nuevo proyecto.
   - **Nombre**: ConTacto
   - **URL**: La URL de tu sitio (o localhost para pruebas).
3. En la pantalla de instalación, ve a **Settings** > **Overview**.
4. Copia el **Project ID** (es una cadena corta de caracteres alfanuméricos).

## 2. Configuración en la App

1. Abre tu archivo `.env.local`.
2. Agrega la siguiente variable con tu Project ID:
   ```env
   NEXT_PUBLIC_CLARITY_PROJECT_ID=tu_project_id_aqui
   ```

## 3. Verificación

1. Ejecuta la aplicación (`npm run dev`).
2. Navega por la app.
3. Vuelve al dashboard de Clarity.
4. Deberías ver actividad en tiempo real o en unos minutos (a veces tarda hasta 2 horas en aparecer la primera vez).

---

**Nota**: Si no configuras el `NEXT_PUBLIC_CLARITY_PROJECT_ID`, la integración simplemente no se iniciará y no afectará el funcionamiento de la app.
