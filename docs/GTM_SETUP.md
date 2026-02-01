# Guía de Configuración de Google Tag Manager (GTM)

Esta guía te ayudará a configurar GTM para rastrear los eventos de la aplicación ConTacto en Google Analytics 4 (GA4).

## 1. Configuración Inicial

1. Ve a [Google Tag Manager](https://tagmanager.google.com/).
2. Crea una cuenta nueva (o usa una existente).
3. Crea un contenedor para **Web**.
4. Copia el ID del contenedor (formato `GTM-XXXXXXX`).
5. Pega este ID en tu archivo `.env.local`:
   ```env
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   ```

## 2. Configuración de Variables

En GTM, ve a **Variables** > **Variables definidas por el usuario** > **Nueva**:
1. **Nombre**: `DLV - Category`
   - **Tipo**: Variable de capa de datos
   - **Nombre de la variable de capa de datos**: `category`
2. **Nombre**: `DLV - Label`
   - **Tipo**: Variable de capa de datos
   - **Nombre de la variable de capa de datos**: `label`
3. **Nombre**: `DLV - Medium`
   - **Tipo**: Variable de capa de datos
   - **Nombre de la variable de capa de datos**: `medium`

## 3. Configuración de Activadores (Triggers)

Crea un activador para cada evento personalizado:

### Evento: Analizar Mensaje
- **Nombre**: `Event - Analyze Message`
- **Tipo**: Evento personalizado
- **Nombre del evento**: `analyze_message`

### Evento: Copiar Respuesta
- **Nombre**: `Event - Copy Response`
- **Tipo**: Evento personalizado
- **Nombre del evento**: `copy_response`

### Evento: Click en CTA
- **Nombre**: `Event - CTA Click`
- **Tipo**: Evento personalizado
- **Nombre del evento**: `cta_click`

### Evento: Agregar Comentario
- **Nombre**: `Event - Add Comment`
- **Tipo**: Evento personalizado
- **Nombre del evento**: `add_comment`

### Evento: Consentimiento de Cookies
- **Nombre**: `Event - Cookie Consent`
- **Tipo**: Evento personalizado
- **Nombre del evento**: `cookie_consent`

### Evento: Cambio de Contexto
- **Nombre**: `Event - Context Change`
- **Tipo**: Evento personalizado
- **Nombre del evento**: `context_change`

## 4. Configuración de Etiquetas (Tags)

Para enviar estos datos a GA4:

1. Asegúrate de tener una etiqueta de **Google Analytics: Configuración de GA4** con tu ID de medición.
2. Crea una nueva etiqueta para los eventos:
   - **Tipo**: Google Analytics: Evento de GA4
   - **Etiqueta de configuración**: Selecciona tu etiqueta de config de GA4.
   - **Nombre del evento**: `{{Event}}` (esto usará el nombre del evento de GTM, ej: `analyze_message`).
   - **Parámetros del evento**:
     - `event_category`: `{{DLV - Category}}`
     - `event_label`: `{{DLV - Label}}`
     - `medium`: `{{DLV - Medium}}`
   - **Activación**: Selecciona todos los activadores creados en el paso 3.

## 5. Publicación

1. Haz clic en **Vista previa** para probar que los eventos se disparan al usar la app.
2. Si todo funciona, haz clic en **Enviar** y **Publicar**.

---

**Nota**: Si no configuras el `NEXT_PUBLIC_GTM_ID`, la aplicación seguirá funcionando normalmente, pero no se enviarán eventos.
