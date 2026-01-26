import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'ConTacto | Asistente de Comunicación',
        short_name: 'ConTacto',
        description: 'Analiza mensajes y responde con tacto, claridad y estrategia.',
        start_url: '/',
        display: 'standalone',
        background_color: '#f8fafc',
        theme_color: '#0f172a',
        icons: [
            {
                src: '/icon.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    };
}
