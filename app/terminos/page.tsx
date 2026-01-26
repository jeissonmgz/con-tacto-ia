import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfUse() {
    return (
        <div className="min-h-screen bg-cream-100 py-20 px-4">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-sand-800 hover:text-slate-900 mb-12 transition-colors font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Volver al inicio
                </Link>

                <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8">Condiciones de Uso</h1>

                <div className="glass p-8 md:p-12 rounded-[2.5rem] space-y-8 text-slate-800 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4 text-slate-900">1. Aceptación de los Términos</h2>
                        <p className="font-medium">
                            Al acceder y utilizar ConTacto, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, no podrás utilizar el servicio.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4 text-slate-900">2. Uso del Servicio</h2>
                        <p className="font-medium">
                            ConTacto es una herramienta de asistencia basada en IA. El usuario es el único responsable del uso final de las sugerencias proporcionadas y de las consecuencias de sus comunicaciones.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4 text-slate-900">3. Propiedad Intelectual</h2>
                        <p className="font-medium">
                            El servicio y su contenido original, características y funcionalidad son y seguirán siendo propiedad exclusiva de ConTacto y sus licenciantes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4 text-slate-900">4. Limitación de Responsabilidad</h2>
                        <p className="font-medium">
                            En ningún caso ConTacto será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo, sin limitación, pérdida de beneficios, datos, uso, fondo de comercio u otras pérdidas intangibles, resultantes de tu acceso o uso del servicio.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4 text-slate-900">5. Modificaciones</h2>
                        <p className="font-medium">
                            Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos Términos en cualquier momento.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
