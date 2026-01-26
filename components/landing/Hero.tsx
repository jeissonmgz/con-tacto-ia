'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { sendGTMEvent } from '@/lib/gtm';

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
            <div className="container mx-auto px-4 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider uppercase text-sand-900 glass rounded-full">
                        Comunicación Consciente
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-medium text-slate-900 mb-6 tracking-tight leading-[1.1]">
                        Responde con tacto. <br className="hidden md:block" />
                        <span className="text-sand-800 italic">No solo con palabras.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-700 mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
                        ConTacto te ayuda a entender qué hay detrás de un mensaje y cómo responder con claridad emocional y estrategia.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            href="/dashboard"
                            onClick={() => sendGTMEvent({ event: 'cta_click', category: 'Landing', label: 'Hero' })}
                            className="group bg-slate-900 text-cream-50 px-8 py-4 rounded-full text-lg font-medium hover:bg-slate-800 transition-all flex items-center gap-2 shadow-xl shadow-sand-500/20"
                        >
                            Analizar un mensaje
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Abstract Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cream-300/40 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-sand-500/20 rounded-full blur-[120px]" />
            </div>
        </section>
    );
}
