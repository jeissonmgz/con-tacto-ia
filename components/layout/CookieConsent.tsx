'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('contacto-consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('contacto-consent', 'accepted');
        setIsVisible(false);
        // Trigger a custom event that layout.tsx can listen to
        window.dispatchEvent(new Event('cookie-consent-updated'));
    };

    const handleDecline = () => {
        localStorage.setItem('contacto-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-6 z-50 flex justify-center pointer-events-none"
                >
                    <div className="glass p-6 md:p-8 rounded-[2rem] max-w-4xl w-full shadow-2xl shadow-sand-900/20 pointer-events-auto border border-cream-300">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="bg-cream-200 p-4 rounded-2xl text-sand-800 shrink-0">
                                <Cookie className="w-8 h-8" />
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Tu privacidad es importante</h3>
                                <p className="text-sm text-sand-900 font-medium leading-relaxed">
                                    Utilizamos cookies y herramientas de análisis para entender cómo usas ConTacto y mejorar tu experiencia.
                                    Consulta nuestra <Link href="/privacidad" className="underline hover:text-slate-900">Política de Privacidad</Link> para más detalles.
                                </p>
                            </div>

                            <div className="flex gap-3 shrink-0">
                                <button
                                    onClick={handleDecline}
                                    className="px-6 py-3 rounded-xl text-sm font-bold text-sand-800 hover:bg-cream-200 transition-all"
                                >
                                    Rechazar
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="px-8 py-3 btn-premium rounded-xl text-sm font-bold transition-all"
                                >
                                    Aceptar todo
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
