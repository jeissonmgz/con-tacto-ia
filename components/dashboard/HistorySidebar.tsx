'use client';

import { useStore } from '@/store/useStore';
import { Clock, MessageSquare } from 'lucide-react';
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
                        className={`w-full text-left p-5 rounded-2xl transition-all border ${currentAnalysis?.id === item.id
                                ? 'bg-cream-200 border-sand-500/30 shadow-md shadow-sand-500/10 ring-1 ring-sand-500/10'
                                : 'bg-cream-50/50 border-cream-200 hover:bg-cream-100 hover:border-cream-300'
                            }`}
                    >
                        <div className="flex items-start gap-3 mb-3">
                            <MessageSquare className={`w-4 h-4 mt-1 shrink-0 text-sand-800`} />
                            <p className="text-sm font-semibold text-slate-900 line-clamp-2 leading-relaxed">
                                {item.originalMessage}
                            </p>
                        </div>
                        <div className="flex items-center justify-between pl-7">
                            <p className="text-[10px] text-sand-800 font-bold uppercase tracking-wider">
                                {formatDistanceToNow(item.timestamp, { addSuffix: true, locale: es })}
                            </p>
                            <div className="w-1.5 h-1.5 rounded-full bg-sand-500/50" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
