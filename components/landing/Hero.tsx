'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { sendGTMEvent } from '@/lib/gtm';

import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative overflow-hidden py-16">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 text-center lg:text-left"
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider uppercase text-sand-900 glass rounded-full">
                            Comunicación Consciente
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif font-medium text-slate-900 mb-6 tracking-tight leading-[1.1]">
                            Responde con tacto. <br className="hidden md:block" />
                            <span className="text-sand-800 italic">No solo con palabras.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-700 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                            ConTacto te ayuda a entender qué hay detrás de un mensaje y cómo responder con claridad emocional y estrategia.
                        </p>
                        <div className="flex justify-center lg:justify-start gap-4">
                            <Link
                                href="/dashboard"
                                className="btn-premium px-10 py-4 rounded-full text-lg font-bold transition-all flex items-center gap-2"
                                onClick={() => sendGTMEvent({ event: 'cta_click', category: 'Landing', label: 'Hero' })}
                            >
                                <h2 className='text-cream-50'>Analizar mensaje</h2>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="flex-1 relative"
                    >
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 2, 0]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative z-10"
                        >
                            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-sand-900/20 border-8 border-white/50 glass p-2">
                                <Image
                                    src="/chat.png"
                                    alt="Ilustración 3D de comunicación consciente"
                                    width={600}
                                    height={600}
                                    className="rounded-[2.5rem] w-full h-auto"
                                    priority
                                />
                            </div>
                        </motion.div>

                        {/* Floating 3D Elements */}
                        <motion.div
                            animate={{ y: [0, 30, 0], x: [0, 10, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 w-32 h-32 bg-cream-300/40 rounded-full blur-2xl -z-10"
                        />
                        <motion.div
                            animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-10 -left-10 w-40 h-40 bg-sand-500/20 rounded-full blur-3xl -z-10"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Abstract Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cream-300/40 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-sand-500/20 rounded-full blur-[120px]" />
            </div>
        </section>
    );
}
