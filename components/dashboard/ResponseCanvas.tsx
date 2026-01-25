'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, RefreshCw, Save } from 'lucide-react';
import { AnalysisResult } from '@/store/useStore';

interface ResponseCanvasProps {
    data: AnalysisResult;
    onUpdate: (data: AnalysisResult) => void;
}

export default function ResponseCanvas({ data, onUpdate }: ResponseCanvasProps) {
    const [editedResponse, setEditedResponse] = useState(data.userEditedResponse || data.analysis.suggestedResponse);

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
        // Could add toast here
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Analysis Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                    <h3 className="text-sm font-semibold text-amber-900 mb-2 uppercase tracking-wide">Tono Emocional</h3>
                    <p className="text-amber-800">{data.analysis.emotionalTone}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="text-sm font-semibold text-blue-900 mb-2 uppercase tracking-wide">Mensaje Implícito</h3>
                    <p className="text-blue-800">{data.analysis.implicitMessage}</p>
                </div>
            </div>

            {/* Risks */}
            {data.analysis.risks.length > 0 && (
                <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                    <h3 className="text-sm font-semibold text-red-900 mb-2 uppercase tracking-wide">Riesgos Detectados</h3>
                    <ul className="list-disc list-inside text-red-800 space-y-1">
                        {data.analysis.risks.map((risk, i) => (
                            <li key={i}>{risk}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Editor Canvas */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="font-serif text-lg font-medium text-slate-900">Respuesta Sugerida</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={copyToClipboard}
                            className="p-2 hover:bg-white rounded-lg transition-colors text-slate-600 hover:text-indigo-600"
                            title="Copiar al portapapeles"
                        >
                            <Copy className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    <textarea
                        value={editedResponse}
                        onChange={handleResponseChange}
                        className="w-full min-h-[300px] p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-y text-slate-900 font-sans leading-relaxed text-lg"
                    />
                </div>
            </div>

            {/* Clarifying Questions */}
            {data.analysis.clarifyingQuestions.length > 0 && (
                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                    <h3 className="font-serif text-lg font-medium text-indigo-900 mb-4">Preguntas para aclarar</h3>
                    <p className="text-indigo-800 mb-4 text-sm">Antes de responder, considera si necesitas preguntar esto:</p>
                    <ul className="space-y-2">
                        {data.analysis.clarifyingQuestions.map((q, i) => (
                            <li key={i} className="flex gap-3 items-start text-indigo-900">
                                <span className="bg-indigo-200 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
                                {q}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Comments Section */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="font-serif text-lg font-medium text-slate-900 mb-4">Notas y Comentarios</h3>
                <div className="space-y-4 mb-4">
                    {data.comments.map((comment, i) => (
                        <div key={i} className="bg-white p-3 rounded-lg border border-slate-200 text-sm text-slate-700">
                            {comment}
                        </div>
                    ))}
                    {data.comments.length === 0 && (
                        <p className="text-slate-400 text-sm italic">No hay notas aún.</p>
                    )}
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Agregar una nota personal..."
                        className="flex-1 p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const val = e.currentTarget.value.trim();
                                if (val) {
                                    onUpdate({ ...data, comments: [...data.comments, val] });
                                    e.currentTarget.value = '';
                                }
                            }
                        }}
                    />
                    <button className="bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-300 transition-colors">
                        Agregar
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
