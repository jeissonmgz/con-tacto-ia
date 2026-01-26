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
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl md:text-7xl font-serif font-medium text-slate-900 mb-6 tracking-tight">
                        Responde con tacto. <br className="hidden md:block" />
                        <span className="text-slate-500 italic">No solo con palabras.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        ConTacto te ayuda a entender qué hay detrás de un mensaje y cómo responder con claridad emocional y estrategia.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            href="/dashboard"
                            onClick={() => sendGTMEvent({ event: 'cta_click', category: 'Landing', label: 'Hero' })}
                            className="group bg-slate-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-slate-800 transition-all flex items-center gap-2"
                        >
                            Analizar un mensaje
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Abstract Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-3xl" />
            </div>
        </section>
    );
}
