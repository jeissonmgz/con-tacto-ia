'use client';

import { useState } from 'react';
import { Send, Loader2, ArrowDownLeft, ArrowUpRight, CircleX, ChevronDown, ChevronUp, Settings2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendGTMEvent } from '@/lib/gtm';
import CustomSelect from './CustomSelect';
import Turnstile from "react-turnstile";

interface InputSectionProps {
    onSubmit: (data: { message: string; context: any; type: 'incoming' | 'outgoing'; security: { honeypot: string; token?: string } }) => void;
    isLoading: boolean;
}

export default function InputSection({ onSubmit, isLoading }: InputSectionProps) {
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'incoming' | 'outgoing'>('incoming');
    const [showContext, setShowContext] = useState(false);
    const [context, setContext] = useState({
        medium: '',
        scope: '',
        relation: ''
    });
    const [turnstileInfo, setTurnstileInfo] = useState<{
        status: "success" | "error" | "expired" | "required";
        token: string;
        error: string | null
    }>({
        status: "required",
        token: "",
        error: null
    });

    const [honeypot, setHoneypot] = useState('');

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

        onSubmit({
            message,
            context: showContext ? context : { medium: '', scope: '', relation: '' },
            type,
            security: {
                honeypot,
                token: turnstileInfo.token
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 rounded-[2.5rem]"
        >
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'none' }} aria-hidden="true">
                    <label htmlFor="contexto" aria-hidden="true">Contexto</label>
                    <input
                        type="text"
                        name="contexto"
                        id="contexto"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                    />
                </div>

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


                <div className="mb-6">
                    <button
                        type="button"
                        onClick={() => setShowContext(!showContext)}
                        className="flex items-center gap-2 text-sm font-bold text-sand-600 hover:text-sand-800 transition-colors"
                    >
                        <Settings2 className="w-4 h-4" />
                        {showContext ? 'Ocultar contexto (Opcional)' : 'Agregar contexto (Opcional)'}
                        {showContext ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <AnimatePresence>
                        {showContext && (
                            <motion.div
                                initial={{ height: 0, opacity: 0, marginTop: 0, overflow: 'hidden' }}
                                animate={{
                                    height: 'auto',
                                    opacity: 1,
                                    marginTop: 24,
                                    transitionEnd: { overflow: 'visible' }
                                }}
                                exit={{ height: 0, opacity: 0, marginTop: 0, overflow: 'hidden' }}
                                style={{ overflow: 'hidden' }} // Fallback
                                onAnimationComplete={() => {
                                    // Force overflow visible after animation
                                    const el = document.getElementById('context-container');
                                    if (el) el.style.overflow = 'visible';
                                }}
                                id="context-container"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <CustomSelect
                                            label="Medio"
                                            value={context.medium}
                                            onChange={(val) => handleContextChange('medium', val)}
                                            options={[
                                                { value: 'chat', label: 'Chat / Mensajería' },
                                                { value: 'email', label: 'Email' },
                                                { value: 'social', label: 'Redes Sociales' },
                                                { value: 'voice', label: 'Voz' }
                                            ]}
                                            placeholder="Seleccionar..."
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
                                            placeholder="Seleccionar..."
                                        />
                                    </div>
                                    <div>
                                        <CustomSelect
                                            label="Mi rol es"
                                            value={context.relation}
                                            onChange={(val) => handleContextChange('relation', val)}
                                            options={[
                                                { value: 'peer', label: 'Par / Colega' },
                                                { value: 'superior', label: 'Superior / Jefe' },
                                                { value: 'subordinate', label: 'Subordinado' },
                                                { value: 'client', label: 'Cliente' },
                                                { value: 'provider', label: 'Proveedor' }
                                            ]}
                                            placeholder="Seleccionar..."
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
                    <div className="glass-error px-4 py-2 rounded-md text-xs text-center font-bold mb-6 flex items-center gap-2">
                        <CircleX className="w-4 h-4" />
                        Turnstile no configurado
                    </div>
                )}
                {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
                    <Turnstile
                        sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY! as string}
                        retry="auto"
                        refreshExpired="auto"
                        theme="light"
                        onError={() => {
                            setTurnstileInfo({
                                status: "error",
                                token: "",
                                error: "La verificación de seguridad falló. Por favor, intenta de nuevo."
                            });
                        }}
                        onExpire={() => {
                            setTurnstileInfo({
                                status: "expired",
                                token: "",
                                error: "La verificación de seguridad expiró. Por favor, verifica de nuevo."
                            });
                        }}
                        onLoad={() => {
                            setTurnstileInfo({
                                status: "required",
                                token: "",
                                error: null
                            });
                        }}
                        onVerify={(token) => {
                            setTurnstileInfo({
                                status: "success",
                                token: token,
                                error: null
                            });
                        }}
                        size="invisible"
                    />
                )}

                {turnstileInfo.error && (
                    <div
                        className="glass-error px-4 py-2 rounded-md text-xs text-center font-bold mb-6 flex items-center gap-2"
                        aria-live="polite">
                        <CircleX className="w-4 h-4" />
                        {turnstileInfo.error}
                    </div>
                )}

                <div className="flex justify-center flex-col items-center gap-4">
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
        </motion.div >
    );
}
