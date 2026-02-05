'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-dashboard-gradient flex items-center justify-center p-6 selection:bg-sand-500/30">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-12 md:p-16 rounded-[2.5rem] max-w-xl w-full text-center shadow-2xl relative overflow-hidden"
            >
                {/* Decorative background element */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-sand-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sand-900/10 rounded-full blur-3xl" />

                <div className="relative z-10">
                    <motion.div
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-red-50 text-red-500 mb-8 border border-red-100 shadow-sm"
                    >
                        <AlertCircle className="w-12 h-12" />
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl font-serif font-bold text-slate-900 mb-4 tracking-tight">
                        404
                    </h1>

                    <h2 className="text-2xl md:text-3xl font-serif text-slate-800 mb-6">
                        Página no encontrada
                    </h2>

                    <p className="text-slate-500 mb-12 font-light text-lg leading-relaxed max-w-sm mx-auto">
                        Parece que te has perdido en la comunicación.
                        El mensaje que buscas no existe o ha sido movido.
                    </p>

                    <Link
                        href="/"
                        className="btn-premium inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-bold shadow-lg shadow-sand-900/10 group transition-all"
                    >
                        <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                        Volver al Inicio
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
