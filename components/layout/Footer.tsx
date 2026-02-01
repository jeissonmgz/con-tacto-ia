import React from 'react';
import Link from 'next/link';
import { sendGTMEvent } from '@/lib/gtm';

export default function Footer() {
    return (
        <footer className="bg-cream-200/50 py-12 border-t border-cream-300 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 w-full">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <Link
                            href="/"
                            className="font-serif text-2xl font-bold text-slate-900 mb-2 block"
                            onClick={() => sendGTMEvent({ event: 'cta_click', category: 'Footer', label: 'Home' })}
                        >
                            ConTacto
                        </Link>
                        <p className="text-sand-800 text-sm font-medium">
                            © {new Date().getFullYear()} ConTacto. Todos los derechos reservados.
                        </p>
                    </div>

                    <nav className="flex flex-wrap justify-center gap-6 md:gap-10">
                        <Link
                            href="/privacidad"
                            className="text-sand-900 hover:text-slate-900 text-sm font-bold transition-colors"
                            onClick={() => sendGTMEvent({ event: 'cta_click', category: 'Footer', label: 'Privacidad' })}
                        >
                            Privacidad
                        </Link>
                        <Link
                            href="/terminos"
                            className="text-sand-900 hover:text-slate-900 text-sm font-bold transition-colors"
                            onClick={() => sendGTMEvent({ event: 'cta_click', category: 'Footer', label: 'Términos' })}
                        >
                            Términos
                        </Link>
                        <Link
                            href="/cookies"
                            className="text-sand-900 hover:text-slate-900 text-sm font-bold transition-colors"
                            onClick={() => sendGTMEvent({ event: 'cta_click', category: 'Footer', label: 'Cookies' })}
                        >
                            Cookies
                        </Link>
                    </nav>
                </div>

                <div className="mt-8 pt-8 border-t border-cream-300/50 text-center">
                    <p className="text-sand-800 text-xs font-medium max-w-2xl mx-auto">
                        Utilizamos herramientas de análisis para mejorar tu experiencia. Al continuar navegando, aceptas nuestra política de privacidad y el uso de cookies.
                    </p>
                </div>
            </div>
        </footer>
    );
}
