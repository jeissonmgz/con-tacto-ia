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
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
        >
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Mensaje a analizar
                    </label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Pega aquí el mensaje que recibiste..."
                        className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none text-slate-900 placeholder:text-slate-400"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Medio</label>
                        <select
                            value={context.medium}
                            onChange={(e) => setContext({ ...context, medium: e.target.value })}
                            className="w-full p-2.5 rounded-lg border border-slate-200 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-slate-50 text-slate-900"
                        >
                            <option value="chat">Chat / Mensajería</option>
                            <option value="email">Email</option>
                            <option value="social">Redes Sociales</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Ámbito</label>
                        <select
                            value={context.scope}
                            onChange={(e) => setContext({ ...context, scope: e.target.value })}
                            className="w-full p-2.5 rounded-lg border border-slate-200 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-slate-50 text-slate-900"
                        >
                            <option value="work">Trabajo / Profesional</option>
                            <option value="personal">Personal / Amigos</option>
                            <option value="family">Familia</option>
                            <option value="dating">Citas / Pareja</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Relación</label>
                        <select
                            value={context.relation}
                            onChange={(e) => setContext({ ...context, relation: e.target.value })}
                            className="w-full p-2.5 rounded-lg border border-slate-200 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-slate-50 text-slate-900"
                        >
                            <option value="peer">Par / Colega</option>
                            <option value="superior">Superior / Jefe</option>
                            <option value="subordinate">Subordinado</option>
                            <option value="client">Cliente</option>
                            <option value="provider">Proveedor</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading || !message.trim()}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
