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
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4">Para cada momento crítico</h2>
                    <p className="text-slate-600 max-w-xl mx-auto">ConTacto se adapta a tus necesidades profesionales y personales.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {cases.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100"
                        >
                            <div className="w-12 h-12 bg-indigo-50 text-indigo-900 rounded-xl flex items-center justify-center mb-6">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-slate-900">{item.title}</h3>
                            <p className="text-slate-600">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
