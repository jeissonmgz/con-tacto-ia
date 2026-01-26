'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { sendGTMEvent } from '@/lib/gtm';

interface InputSectionProps {
    onSubmit: (data: { message: string; context: any }) => void;
    isLoading: boolean;
}

export default function InputSection({ onSubmit, isLoading }: InputSectionProps) {
    const [message, setMessage] = useState('');
    const [context, setContext] = useState({
        medium: 'chat',
        scope: 'work',
        relation: 'peer'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        sendGTMEvent({
            event: 'analyze_message',
            category: 'Analysis',
            label: context.scope,
            medium: context.medium
        });

        onSubmit({ message, context });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 rounded-[2.5rem]"
        >
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-800 mb-2 ml-1">
                        Mensaje a analizar
                    </label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Pega aquí el mensaje que recibiste..."
                        className="w-full h-40 p-5 rounded-2xl border border-cream-300 focus:border-sand-500 focus:ring-2 focus:ring-sand-500/20 transition-all resize-none text-slate-900 placeholder:text-slate-500 bg-cream-50/50 backdrop-blur-sm font-medium"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div>
                        <label className="block text-[10px] font-bold text-sand-900 mb-1.5 uppercase tracking-widest ml-1">Medio</label>
                        <select
                            value={context.medium}
                            onChange={(e) => setContext({ ...context, medium: e.target.value })}
                            className="w-full p-3 rounded-xl border border-cream-300 text-sm focus:border-sand-500 focus:ring-2 focus:ring-sand-500/20 bg-cream-50/50 backdrop-blur-sm text-slate-900 appearance-none cursor-pointer font-semibold"
                        >
                            <option value="chat">Chat / Mensajería</option>
                            <option value="email">Email</option>
                            <option value="social">Redes Sociales</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-sand-900 mb-1.5 uppercase tracking-widest ml-1">Ámbito</label>
                        <select
                            value={context.scope}
                            onChange={(e) => setContext({ ...context, scope: e.target.value })}
                            className="w-full p-3 rounded-xl border border-cream-300 text-sm focus:border-sand-500 focus:ring-2 focus:ring-sand-500/20 bg-cream-50/50 backdrop-blur-sm text-slate-900 appearance-none cursor-pointer font-semibold"
                        >
                            <option value="work">Trabajo / Profesional</option>
                            <option value="personal">Personal / Amigos</option>
                            <option value="family">Familia</option>
                            <option value="dating">Citas / Pareja</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-sand-900 mb-1.5 uppercase tracking-widest ml-1">Relación</label>
                        <select
                            value={context.relation}
                            onChange={(e) => setContext({ ...context, relation: e.target.value })}
                            className="w-full p-3 rounded-xl border border-cream-300 text-sm focus:border-sand-500 focus:ring-2 focus:ring-sand-500/20 bg-cream-50/50 backdrop-blur-sm text-slate-900 appearance-none cursor-pointer font-semibold"
                        >
                            <option value="peer">Par / Colega</option>
                            <option value="superior">Superior / Jefe</option>
                            <option value="subordinate">Subordinado</option>
                            <option value="client">Cliente</option>
                            <option value="provider">Proveedor</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn-premium py-5 rounded-2xl text-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Analizando...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Analizar Mensaje
                            </>
                        )}
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
