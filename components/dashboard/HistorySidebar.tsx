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
        <div className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Historial Reciente</h3>
            <div className="space-y-2">
                {history.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setCurrentAnalysis(item)}
                        className={`w-full text-left p-4 rounded-xl transition-all border ${currentAnalysis?.id === item.id
                                ? 'bg-white border-indigo-200 shadow-sm ring-1 ring-indigo-100'
                                : 'bg-slate-50 border-transparent hover:bg-white hover:border-slate-200'
                            }`}
                    >
                        <div className="flex items-start gap-3 mb-2">
                            <MessageSquare className={`w-4 h-4 mt-1 ${currentAnalysis?.id === item.id ? 'text-indigo-500' : 'text-slate-400'}`} />
                            <p className="text-sm font-medium text-slate-900 line-clamp-2">
                                {item.originalMessage}
                            </p>
                        </div>
                        <p className="text-xs text-slate-500 pl-7">
                            {formatDistanceToNow(item.timestamp, { addSuffix: true, locale: es })}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
}
