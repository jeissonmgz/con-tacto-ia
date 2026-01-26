'use client';

import { motion } from 'framer-motion';
import { Briefcase, MessageCircle, ShieldAlert } from 'lucide-react';

const cases = [
    {
        icon: Briefcase,
        title: "Liderazgo y Trabajo",
        description: "Gestiona conflictos de equipo, da feedback constructivo y negocia plazos sin dañar relaciones."
    },
    {
        icon: ShieldAlert,
        title: "Conversaciones Difíciles",
        description: "Aborda temas sensibles con empatía y firmeza. Encuentra las palabras justas cuando más importan."
    },
    {
        icon: MessageCircle,
        title: "Negociación y Acuerdos",
        description: "Defiende tus puntos de vista manteniendo la diplomacia. Convierte discusiones en diálogos productivos."
    }
];

export default function UseCases() {
    return (
        <section className="py-24 bg-gradient-to-b from-cream-100 to-cream-50 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] bg-sand-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] bg-cream-200/40 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4">Para cada momento crítico</h2>
                    <p className="text-slate-700 max-w-xl mx-auto font-medium">ConTacto se adapta a tus necesidades profesionales y personales.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {cases.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="glass p-8 rounded-[2rem] hover:shadow-xl hover:shadow-sand-500/10 transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 bg-cream-100 text-sand-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                                <item.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-slate-900">{item.title}</h3>
                            <p className="text-slate-700 font-normal leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
