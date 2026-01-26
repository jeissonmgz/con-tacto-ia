import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-cream-100 py-20 px-4">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-sand-800 hover:text-slate-900 mb-12 transition-colors font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Volver al inicio
                </Link>

                <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8">Política de Privacidad</h1>

                <div className="glass p-8 md:p-12 rounded-[2.5rem] space-y-8 text-slate-800 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4 text-slate-900">1. Introducción</h2>
                        <p className="font-medium">
                            En ConTacto, valoramos tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información cuando utilizas nuestro asistente de comunicación.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4 text-slate-900">2. Información que recopilamos</h2>
                        <p className="font-medium mb-4">
                            Recopilamos información para mejorar tu experiencia y la calidad de nuestro servicio:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 font-medium">
                            <li><strong>Datos de Uso:</strong> Información sobre cómo interactúas con la aplicación.</li>
                            <li><strong>Herramientas de Terceros:</strong> Utilizamos Google Tag Manager, Microsoft Clarity y Vercel Analytics para entender el comportamiento del usuario y optimizar la interfaz.</li>
                            <li><strong>Contenido de Mensajes:</strong> Los mensajes que analizas se procesan para generar sugerencias, pero no se asocian permanentemente con tu identidad personal en esta versión.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4 text-slate-900">3. Uso de la Información</h2>
                        <p className="font-medium">
                            Utilizamos los datos recopilados para:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 font-medium mt-4">
                            <li>Proporcionar y mantener nuestro servicio.</li>
                            <li>Mejorar la precisión de nuestros análisis de IA.</li>
                            <li>Detectar, prevenir y abordar problemas técnicos.</li>
                            <li>Analizar tendencias de uso de forma agregada y anónima.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4 text-slate-900">4. Cookies</h2>
                        <p className="font-medium">
                            Utilizamos cookies y tecnologías de seguimiento similares para rastrear la actividad en nuestro servicio y mantener cierta información. Puedes consultar más detalles en nuestra <Link href="/cookies" className="text-sand-800 underline">Política de Cookies</Link>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4 text-slate-900">5. Contacto</h2>
                        <p className="font-medium">
                            Si tienes preguntas sobre esta Política de Privacidad, puedes contactarnos a través de nuestro sitio web.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
