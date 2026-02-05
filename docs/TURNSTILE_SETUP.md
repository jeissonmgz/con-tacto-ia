# Guía de Configuración de Cloudflare Turnstile

Esta guía explica cómo configurar Cloudflare Turnstile para proteger los formularios de la aplicación ConTacto contra bots de manera invisible.

## 1. Configuración en Cloudflare

1. Inicia sesión en el [Panel de Cloudflare](https://dash.cloudflare.com/).
2. Ve a **Turnstile** en el menú lateral.
3. Haz clic en **Add Site**.
4. Configura el sitio:
   - **Site Name**: ConTacto
   - **Domain**: Agrega `localhost` para desarrollo y tu dominio de producción.
   - **Widget Type**: Selecciona **Invisible** para una experiencia de usuario fluida.
5. Haz clic en **Create**.
6. Copia la **Site Key** y la **Secret Key**.

## 2. Variables de Entorno

Agrega las llaves a tu archivo `.env` o `.env.local`:

```env
# Clave pública para el widget del lado del cliente
NEXT_PUBLIC_TURNSTILE_SITE_KEY=tu_site_key_aqui

# Clave secreta para la validación del lado del servidor (Server Actions)
TURNSTILE_SECRET_KEY=tu_secret_key_aqui
```

## 3. Funcionamiento

- **Frontend**: El componente `Turnstile` en `InputSection.tsx` utiliza la `NEXT_PUBLIC_TURNSTILE_SITE_KEY` para generar un token de verificación al momento de enviar el formulario.
- **Backend**: La Server Action `analyzeMessage` en `actions.ts` recibe el token y utiliza la `TURNSTILE_SECRET_KEY` para validar la autenticidad de la petición con la API de Cloudflare.

---

**Nota**: Si no se configura `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, la aplicación mostrará un aviso de "Turnstile no configurado" en modo desarrollo y el componente de seguridad no se renderizará.
