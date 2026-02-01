'use client';

import { useStore } from '@/store/useStore';
import { Clock, MessageSquare, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export default function HistorySidebar() {
    const { history, setCurrentAnalysis, currentAnalysis } = useStore();

    if (history.length === 0) {
        return (
            <div className="text-center py-12 text-slate-400">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No hay historial aún.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-sand-900 uppercase tracking-[0.2em] mb-6 ml-1">Historial Reciente</h3>
            <div className="space-y-3">
                {history.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setCurrentAnalysis(item)}
                        className={`w-full text-left p-5 rounded-2xl transition-all border group relative overflow-hidden ${currentAnalysis?.id === item.id
                            ? 'glass border-sand-500/30 shadow-md shadow-sand-500/10'
                            : 'bg-white/30 border-white/40 hover:bg-white/50 hover:border-white/60 hover:shadow-sm'
                            }`}
                    >
                        {currentAnalysis?.id === item.id && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-sand-500 to-sand-600" />
                        )}
                        <div className="flex items-start gap-3 mb-3 relative z-10">
                            {item.type === 'outgoing' ? (
                                <ArrowUpRight className={`w-4 h-4 mt-1 shrink-0 ${currentAnalysis?.id === item.id ? 'text-sand-800' : 'text-sand-600 group-hover:text-sand-800'} transition-colors`} />
                            ) : (
                                <ArrowDownLeft className={`w-4 h-4 mt-1 shrink-0 ${currentAnalysis?.id === item.id ? 'text-sand-800' : 'text-sand-600 group-hover:text-sand-800'} transition-colors`} />
                            )}
                            <p className={`text-sm font-semibold line-clamp-2 leading-relaxed transition-colors ${currentAnalysis?.id === item.id ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'}`}>
                                {item.originalMessage}
                            </p>
                        </div>
                        <div className="flex items-center justify-between pl-7 relative z-10">
                            <p className="text-[10px] text-sand-800 font-bold uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                                {formatDistanceToNow(item.timestamp, { addSuffix: true, locale: es })}
                            </p>
                            {currentAnalysis?.id === item.id && (
                                <div className="w-1.5 h-1.5 rounded-full bg-sand-500 animate-pulse" />
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
