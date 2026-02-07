'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, RefreshCw, Save } from 'lucide-react';
import { AnalysisResult } from '@/store/useStore';
import { sendGTMEvent } from '@/lib/gtm';

interface ResponseCanvasProps {
    data: AnalysisResult;
    onUpdate: (data: AnalysisResult) => void;
    onRefine: (instruction: string) => Promise<void>;
    isRefining: boolean;
}

export default function ResponseCanvas({ data, onUpdate, onRefine, isRefining }: ResponseCanvasProps) {
    const [editedResponse, setEditedResponse] = useState(data.userEditedResponse || data.analysis.suggestedResponse);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setEditedResponse(data.userEditedResponse || data.analysis.suggestedResponse);
    }, [data.id]);

    const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setEditedResponse(newValue);
        onUpdate({ ...data, userEditedResponse: newValue });
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(editedResponse);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        sendGTMEvent({
            event: 'copy_response',
            category: 'Engagement',
            label: data.id
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            {/* Original Message Card */}
            <div className="glass p-6 rounded-3xl border border-sand-500/20 shadow-sm">
                <h3 className="text-[10px] font-bold text-sand-800 mb-3 uppercase tracking-widest">Mensaje Original</h3>
                <p className="text-slate-700 italic text-lg font-serif">"{data.originalMessage}"</p>
            </div>

            {/* Analysis Cards */}
            {/* Analysis Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass p-6 rounded-3xl border border-sand-500/30 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-sand-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                    <h3 className="text-[10px] font-bold text-sand-800 mb-3 uppercase tracking-widest relative z-10">Tono Emocional</h3>
                    <p className="text-slate-900 font-semibold leading-relaxed relative z-10">{data.analysis.emotionalTone}</p>
                </div>
                <div className="glass p-6 rounded-3xl border border-sand-500/30 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-sand-600/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                    <h3 className="text-[10px] font-bold text-sand-800 mb-3 uppercase tracking-widest relative z-10">Mensaje Implícito</h3>
                    <p className="text-slate-900 font-semibold leading-relaxed relative z-10">{data.analysis.implicitMessage}</p>
                </div>
            </div>

            {/* Risks */}
            {/* Risks */}
            {data.analysis.risks.length > 0 && (
                <div className="glass p-6 rounded-3xl border border-red-200/50 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl -mr-10 -mt-10" />
                    <h3 className="text-[10px] font-bold text-teal-800 mb-3 uppercase tracking-widest relative z-10">Riesgos Detectados</h3>
                    <ul className="space-y-2 relative z-10">
                        {data.analysis.risks.map((risk, i) => (
                            <li key={i} className="text-slate-900 flex items-start gap-2 text-sm font-medium">
                                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-1.5 shrink-0" />
                                {risk}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Editor Canvas */}
            <div className="glass rounded-[2.5rem] overflow-hidden shadow-xl shadow-sand-500/10">
                <div className="bg-cream-50/50 px-8 py-5 border-b border-cream-200 flex justify-between items-center">
                    <h3 className="font-serif text-xl font-bold text-slate-900">Respuesta Sugerida</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={copyToClipboard}
                            className="p-3 bg-cream-100 hover:bg-cream-200 rounded-xl transition-all text-sand-800 hover:text-slate-900 shadow-sm flex items-center gap-2 relative overflow-hidden min-w-[120px] justify-center"
                            title="Copiar al portapapeles"
                        >
                            <AnimatePresence mode="wait">
                                {copied ? (
                                    <motion.div
                                        key="check"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        className="flex items-center gap-2 text-green-700"
                                    >
                                        <Check className="w-5 h-5" />
                                        <span className="text-sm font-bold">¡Copiado!</span>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="copy"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        className="flex items-center gap-2"
                                    >
                                        <Copy className="w-5 h-5" />
                                        <span className="text-sm font-bold">Copiar</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
                <div className="p-8">
                    <textarea
                        value={editedResponse}
                        onChange={handleResponseChange}
                        className="w-full min-h-[350px] p-6 rounded-2xl border border-cream-200 focus:border-sand-500 focus:ring-2 focus:ring-sand-500/20 transition-all resize-y text-slate-900 font-sans font-medium leading-relaxed text-lg bg-cream-50/30"
                    />
                </div>
            </div>

            {/* Clarifying Questions */}
            {/* Clarifying Questions */}
            {data.analysis.clarifyingQuestions.length > 0 && (
                <div className="glass p-8 rounded-[2.5rem] border border-sand-500/20 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-sand-500/5 to-transparent pointer-events-none" />
                    <h3 className="font-serif text-xl font-bold text-slate-900 mb-6 relative z-10">Preguntas para aclarar</h3>
                    <p className="text-sand-800 mb-6 text-sm font-semibold relative z-10">Antes de responder, considera si necesitas preguntar esto:</p>
                    <ul className="space-y-4 relative z-10">
                        {data.analysis.clarifyingQuestions.map((q, i) => (
                            <li key={i} className="flex gap-4 items-start text-slate-900">
                                <span className="bg-sand-800 text-cream-50 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">{i + 1}</span>
                                <p className="font-medium leading-relaxed">{q}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Refinement Section */}
            <div className="glass p-8 rounded-[2.5rem]">
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-6">Refinar Respuesta</h3>

                {/* History of changes */}
                {data.comments.length > 0 && (
                    <div className="space-y-4 mb-6">
                        <h4 className="text-xs font-bold text-sand-600 uppercase tracking-wider mb-2">Historial de cambios</h4>
                        {data.comments.map((comment, i) => (
                            <div key={i} className="bg-cream-50/50 p-3 rounded-xl border border-cream-200 text-sm text-slate-600 italic">
                                "{comment}"
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Ej: Hazlo más formal, agrega que estaré fuera..."
                        disabled={isRefining}
                        className="flex-1 p-4 rounded-2xl border border-cream-200 focus:border-sand-500 focus:ring-2 focus:ring-sand-500/20 text-sm bg-cream-50/30 transition-all text-slate-900 placeholder:text-slate-500 font-medium disabled:opacity-50"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !isRefining) {
                                const val = e.currentTarget.value.trim();
                                if (val) {
                                    onRefine(val);
                                    e.currentTarget.value = '';
                                }
                            }
                        }}
                    />
                    <button
                        onClick={() => {
                            const input = document.querySelector('input[placeholder="Ej: Hazlo más formal, agrega que estaré fuera..."]') as HTMLInputElement;
                            if (input && input.value.trim() && !isRefining) {
                                onRefine(input.value.trim());
                                input.value = '';
                            }
                        }}
                        disabled={isRefining}
                        className="btn-premium px-6 py-2 rounded-2xl text-sm font-bold transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        {isRefining ? (
                            <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                Refinando...
                            </>
                        ) : (
                            'Refinar'
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
