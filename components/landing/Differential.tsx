'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { sendGTMEvent } from '@/lib/gtm';

export default function Differential() {
    return (
        <section className="py-24 bg-gradient-to-br from-sand-900 to-sand-950 text-cream-50 overflow-hidden relative">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-serif mb-8 leading-tight !text-white"
                    >
                        No respondemos por ti. <br />
                        <span className="!text-sand-300">Te ayudamos a pensar mejor.</span>
                    </motion.h2>
                    <p className="text-xl text-cream-200/80 mb-12 leading-relaxed font-normal">
                        A diferencia de otros asistentes, ConTacto no busca automatizar tu voz, sino elevarla.
                        Mantenemos tu esencia humana mientras te damos las herramientas estratégicas de la IA.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-block px-10 py-4 rounded-full text-lg font-bold transition-all bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-105 shadow-lg shadow-black/10 text-white"
                        onClick={() => sendGTMEvent({ event: 'cta_click', category: 'Landing', label: 'Differential' })}
                    >
                        Comenzar ahora
                    </Link>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-sand-600 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-teal-900 rounded-full blur-[120px]" />
            </div>
        </section>
    );
}
