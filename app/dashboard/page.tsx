'use client';

import { useState } from 'react';
import { useStore, AnalysisResult } from '@/store/useStore';
import InputSection from '@/components/dashboard/InputSection';
import ResponseCanvas from '@/components/dashboard/ResponseCanvas';
import HistorySidebar from '@/components/dashboard/HistorySidebar';
import { analyzeMessage } from '@/app/actions';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
    const { currentAnalysis, setCurrentAnalysis, addToHistory, updateHistoryItem } = useStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleAnalyze = async (data: { message: string; context: any; type: 'incoming' | 'outgoing' }) => {
        setIsLoading(true);
        try {
            const result = await analyzeMessage(data.message, data.context, data.type);

            const newAnalysis: AnalysisResult = {
                id: crypto.randomUUID(),
                originalMessage: data.message,
                type: data.type,
                context: data.context,
                analysis: result,
                userEditedResponse: result.suggestedResponse,
                comments: [],
                timestamp: Date.now()
            };

            addToHistory(newAnalysis);
            setCurrentAnalysis(newAnalysis);
        } catch (error) {
            console.error(error);
            alert("Error al analizar el mensaje. Verifica tu API Key.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = (updated: AnalysisResult) => {
        setCurrentAnalysis(updated);
        updateHistoryItem(updated.id, updated);
    };

    return (
        <div className="min-h-screen bg-cream-100 flex flex-col md:flex-row selection:bg-sand-500/30">
            {/* Mobile Header */}
            <div className="md:hidden bg-cream-50/80 backdrop-blur-md p-4 border-b border-cream-200 flex justify-between items-center sticky top-0 z-30">
                <Link href="/" className="font-serif text-xl font-bold text-slate-900">ConTacto</Link>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-cream-200 rounded-lg">
                    {isSidebarOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-cream-50/90 backdrop-blur-xl border-r border-cream-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="p-6 h-full flex flex-col">
                    <div className="mb-8 hidden md:block">
                        <Link href="/" className="font-serif text-2xl font-bold text-slate-900">ConTacto</Link>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <HistorySidebar />
                    </div>

                    <div className="pt-6 border-t border-cream-200 mt-4">
                        <button
                            onClick={() => {
                                setCurrentAnalysis(null);
                                setIsSidebarOpen(false);
                            }}
                            className="w-full py-3 px-4 btn-premium rounded-2xl font-medium hover:bg-slate-800 transition-all shadow-lg shadow-sand-500/20 transition-all"
                        >
                            Nuevo Análisis
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    {!currentAnalysis ? (
                        <div className="max-w-2xl mx-auto pt-10 md:pt-20">
                            <h1 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4 text-center">
                                Analiza un nuevo mensaje
                            </h1>
                            <p className="text-slate-500 text-center mb-10 font-light">
                                Pega el mensaje, danos contexto y deja que la IA te ayude a responder con tacto.
                            </p>
                            <InputSection onSubmit={handleAnalyze} isLoading={isLoading} />
                        </div>
                    ) : (
                        <div className="space-y-8 pb-20">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-serif text-slate-900">Resultado del Análisis</h2>
                                <button
                                    onClick={() => setCurrentAnalysis(null)}
                                    className="text-sm text-sand-600 hover:text-slate-900 md:hidden font-medium"
                                >
                                    Volver
                                </button>
                            </div>
                            <ResponseCanvas data={currentAnalysis} onUpdate={handleUpdate} />
                        </div>
                    )}
                </div>
            </main>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}
