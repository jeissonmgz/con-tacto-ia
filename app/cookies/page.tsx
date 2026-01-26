import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CookiePolicy() {
    return (
        <div className="min-h-screen bg-cream-100 py-20 px-4">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-sand-800 hover:text-slate-900 mb-12 transition-colors font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Volver al inicio
                </Link>

                <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8">Política de Cookies</h1>

                <div className="glass p-8 md:p-12 rounded-[2.5rem] space-y-8 text-slate-800 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4 text-slate-900">1. ¿Qué son las cookies?</h2>
                        <p className="font-medium">
                            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Ayudan a que el sitio funcione correctamente y proporcionan información a los propietarios del sitio.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4 text-slate-900">2. Cookies que utilizamos</h2>
                        <div className="space-y-4 font-medium">
                            <p>Utilizamos los siguientes tipos de cookies:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Cookies Esenciales:</strong> Necesarias para el funcionamiento básico del sitio.</li>
                                <li><strong>Cookies de Analítica:</strong> Proporcionadas por Google Analytics, Microsoft Clarity y Vercel para entender cómo se usa el sitio y mejorar la experiencia del usuario.</li>
                                <li><strong>Cookies de Preferencias:</strong> Permiten recordar tus ajustes y preferencias.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4 text-slate-900">3. Control de Cookies</h2>
                        <p className="font-medium">
                            Puedes controlar y/o eliminar las cookies según desees a través de la configuración de tu navegador. Sin embargo, si lo haces, es posible que tengas que ajustar manualmente algunas preferencias cada vez que visites un sitio y que algunos servicios y funcionalidades no funcionen.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4 text-slate-900">4. Herramientas de Análisis</h2>
                        <p className="font-medium">
                            Este sitio utiliza herramientas como Microsoft Clarity para capturar cómo interactúas con nuestro sitio web a través de métricas de comportamiento, mapas de calor y reproducción de sesiones para mejorar nuestros productos y servicios. Los datos de uso del sitio se capturan utilizando cookies propias y de terceros y otras tecnologías de seguimiento.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
