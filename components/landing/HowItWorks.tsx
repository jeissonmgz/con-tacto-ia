'use client';

import { motion } from 'framer-motion';
import { Brain, Heart, PenTool } from 'lucide-react';

const steps = [
    {
        icon: Brain,
        title: "Analiza el mensaje",
        description: "Pega el mensaje que recibiste. Nuestra IA detecta el tono, la intención oculta y el contexto emocional."
    },
    {
        icon: Heart,
        title: "Entiende la emoción",
        description: "Identifica riesgos y oportunidades. Comprende no solo lo que dicen, sino cómo se sienten."
    },
    {
        icon: PenTool,
        title: "Responde con estrategia",
        description: "Recibe sugerencias estructuradas y edítalas en nuestro canvas inteligente para dar la respuesta perfecta."
    }
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-gradient-to-b from-cream-50 to-cream-200 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[-5%] w-[40%] h-[40%] bg-cream-200/30 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-sand-500/10 rounded-full blur-[100px]" />
            </div>
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4">Cómo funciona</h2>
                    <p className="text-slate-700 max-w-xl mx-auto font-medium">Un proceso simple diseñado para situaciones complejas.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className="glass p-10 rounded-[2.5rem] text-center hover:translate-y-[-4px] transition-all duration-300"
                        >
                            <div className="w-20 h-20 bg-cream-200 rounded-3xl flex items-center justify-center mx-auto mb-8 text-sand-800 shadow-inner">
                                <step.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-slate-900">{step.title}</h3>
                            <p className="text-slate-700 leading-relaxed font-normal">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
