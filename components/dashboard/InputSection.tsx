'use client';

import { useState } from 'react';
import { Send, Loader2, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { sendGTMEvent } from '@/lib/gtm';
import CustomSelect from './CustomSelect';

interface InputSectionProps {
    onSubmit: (data: { message: string; context: any; type: 'incoming' | 'outgoing' }) => void;
    isLoading: boolean;
}

export default function InputSection({ onSubmit, isLoading }: InputSectionProps) {
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'incoming' | 'outgoing'>('incoming');
    const [context, setContext] = useState({
        medium: 'chat',
        scope: 'work',
        relation: 'peer'
    });

    const handleContextChange = (field: string, value: string) => {
        setContext(prev => ({ ...prev, [field]: value }));
        sendGTMEvent({
            event: 'context_change',
            category: 'Context',
            label: field,
            value: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        sendGTMEvent({
            event: 'analyze_message',
            category: 'Analysis',
            label: context.scope,
            medium: context.medium,
            type: type
        });

        onSubmit({ message, context, type });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 rounded-[2.5rem]"
        >
            <form onSubmit={handleSubmit}>
                <div className="flex bg-cream-100 rounded-xl p-1 mb-8 w-fit mx-auto md:mx-0 border border-cream-300">
                    <button
                        type="button"
                        onClick={() => setType('incoming')}
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${type === 'incoming'
                            ? 'bg-white text-sand-900 shadow-sm'
                            : 'text-sand-600 hover:text-sand-800'
                            }`}
                    >
                        <ArrowDownLeft className="w-4 h-4" />
                        Mensaje Recibido
                    </button>
                    <button
                        type="button"
                        onClick={() => setType('outgoing')}
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${type === 'outgoing'
                            ? 'bg-white text-sand-900 shadow-sm'
                            : 'text-sand-600 hover:text-sand-800'
                            }`}
                    >
                        <ArrowUpRight className="w-4 h-4" />
                        Mensaje a Enviar
                    </button>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-800 mb-2 ml-1">
                        {type === 'incoming' ? 'Mensaje recibido' : 'Tu respuesta (Borrador)'}
                    </label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={type === 'incoming' ? "Pega aquí el mensaje que recibiste..." : "Escribe aquí lo que quieres decir..."}
                        className="w-full h-40 p-5 rounded-2xl border border-cream-300 focus:border-sand-500 focus:ring-2 focus:ring-sand-500/20 transition-all resize-none text-slate-900 placeholder:text-slate-500 bg-cream-50/50 backdrop-blur-sm font-medium"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div>
                        <CustomSelect
                            label="Medio"
                            value={context.medium}
                            onChange={(val) => handleContextChange('medium', val)}
                            options={[
                                { value: 'chat', label: 'Chat / Mensajería' },
                                { value: 'email', label: 'Email' },
                                { value: 'social', label: 'Redes Sociales' }
                            ]}
                        />
                    </div>
                    <div>
                        <CustomSelect
                            label="Ámbito"
                            value={context.scope}
                            onChange={(val) => handleContextChange('scope', val)}
                            options={[
                                { value: 'work', label: 'Trabajo / Profesional' },
                                { value: 'personal', label: 'Personal / Amigos' },
                                { value: 'family', label: 'Familia' },
                                { value: 'dating', label: 'Citas / Pareja' }
                            ]}
                        />
                    </div>
                    <div>
                        <CustomSelect
                            label="Relación"
                            value={context.relation}
                            onChange={(val) => handleContextChange('relation', val)}
                            options={[
                                { value: 'peer', label: 'Par / Colega' },
                                { value: 'superior', label: 'Superior / Jefe' },
                                { value: 'subordinate', label: 'Subordinado' },
                                { value: 'client', label: 'Cliente' },
                                { value: 'provider', label: 'Proveedor' }
                            ]}
                        />
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
