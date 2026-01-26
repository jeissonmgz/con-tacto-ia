'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, RefreshCw, Save } from 'lucide-react';
import { AnalysisResult } from '@/store/useStore';
import { sendGTMEvent } from '@/lib/gtm';

interface ResponseCanvasProps {
    data: AnalysisResult;
    onUpdate: (data: AnalysisResult) => void;
}

export default function ResponseCanvas({ data, onUpdate }: ResponseCanvasProps) {
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
            {/* Analysis Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-orange-50/50 backdrop-blur-sm p-6 rounded-3xl border border-orange-200 shadow-sm">
                    <h3 className="text-[10px] font-bold text-orange-900 mb-3 uppercase tracking-widest">Tono Emocional</h3>
                    <p className="text-orange-950 font-semibold leading-relaxed">{data.analysis.emotionalTone}</p>
                </div>
                <div className="bg-blue-50/50 backdrop-blur-sm p-6 rounded-3xl border border-blue-200 shadow-sm">
                    <h3 className="text-[10px] font-bold text-blue-900 mb-3 uppercase tracking-widest">Mensaje Implícito</h3>
                    <p className="text-blue-950 font-semibold leading-relaxed">{data.analysis.implicitMessage}</p>
                </div>
            </div>

            {/* Risks */}
            {data.analysis.risks.length > 0 && (
                <div className="bg-red-50/50 backdrop-blur-sm p-6 rounded-3xl border border-red-200 shadow-sm">
                    <h3 className="text-[10px] font-bold text-red-900 mb-3 uppercase tracking-widest">Riesgos Detectados</h3>
                    <ul className="space-y-2">
                        {data.analysis.risks.map((risk, i) => (
                            <li key={i} className="text-red-950 flex items-start gap-2 text-sm font-medium">
                                <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 shrink-0" />
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
            {data.analysis.clarifyingQuestions.length > 0 && (
                <div className="bg-sand-500/10 backdrop-blur-sm p-8 rounded-[2.5rem] border border-sand-500/30">
                    <h3 className="font-serif text-xl font-bold text-slate-900 mb-6">Preguntas para aclarar</h3>
                    <p className="text-slate-800 mb-6 text-sm font-semibold">Antes de responder, considera si necesitas preguntar esto:</p>
                    <ul className="space-y-4">
                        {data.analysis.clarifyingQuestions.map((q, i) => (
                            <li key={i} className="flex gap-4 items-start text-slate-900">
                                <span className="bg-sand-900 text-cream-50 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">{i + 1}</span>
                                <p className="font-medium leading-relaxed">{q}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Comments Section */}
            <div className="glass p-8 rounded-[2.5rem]">
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-6">Notas y Comentarios</h3>
                <div className="space-y-4 mb-6">
                    {data.comments.map((comment, i) => (
                        <div key={i} className="bg-cream-50/50 p-4 rounded-2xl border border-cream-200 text-sm text-slate-900 shadow-sm font-medium">
                            {comment}
                        </div>
                    ))}
                    {data.comments.length === 0 && (
                        <p className="text-slate-500 text-sm italic font-medium">No hay notas aún.</p>
                    )}
                </div>
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Agregar una nota personal..."
                        className="flex-1 p-4 rounded-2xl border border-cream-200 focus:border-sand-500 focus:ring-2 focus:ring-sand-500/20 text-sm bg-cream-50/30 transition-all text-slate-900 placeholder:text-slate-500 font-medium"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const val = e.currentTarget.value.trim();
                                if (val) {
                                    onUpdate({ ...data, comments: [...data.comments, val] });
                                    sendGTMEvent({
                                        event: 'add_comment',
                                        category: 'Engagement',
                                        label: data.id
                                    });
                                    e.currentTarget.value = '';
                                }
                            }
                        }}
                    />
                    <button
                        onClick={() => {
                            const input = document.querySelector('input[placeholder="Agregar una nota personal..."]') as HTMLInputElement;
                            if (input && input.value.trim()) {
                                onUpdate({ ...data, comments: [...data.comments, input.value.trim()] });
                                sendGTMEvent({
                                    event: 'add_comment',
                                    category: 'Engagement',
                                    label: data.id
                                });
                                input.value = '';
                            }
                        }}
                        className="btn-premium px-6 py-2 rounded-2xl text-sm font-bold transition-all"
                    >
                        Agregar
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
