'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Differential() {
    return (
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-serif mb-8 leading-tight"
                    >
                        No respondemos por ti. <br />
                        <span className="text-indigo-300">Te ayudamos a pensar mejor.</span>
                    </motion.h2>
                    <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                        A diferencia de otros asistentes, ConTacto no busca automatizar tu voz, sino elevarla.
                        Mantenemos tu esencia humana mientras te damos las herramientas estratégicas de la IA.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-block bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-slate-100 transition-colors"
                    >
                        Comenzar ahora
                    </Link>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-500 rounded-full blur-[100px]" />
            </div>
        </section>
    );
}
