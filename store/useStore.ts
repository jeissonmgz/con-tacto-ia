import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AnalysisResult {
    id: string;
    type?: 'incoming' | 'outgoing';
    originalMessage: string;
    context: {
        medium?: string;
        scope?: string;
        relation?: string;
    };
    analysis: {
        emotionalTone: string;
        implicitMessage: string;
        risks: string[];
        clarifyingQuestions: string[];
        suggestedResponse: string;
    };
    userEditedResponse: string;
    comments: string[];
    timestamp: number;
}

interface AppState {
    history: AnalysisResult[];
    addToHistory: (item: AnalysisResult) => void;
    updateHistoryItem: (id: string, updates: Partial<AnalysisResult>) => void;
    currentAnalysis: AnalysisResult | null;
    setCurrentAnalysis: (item: AnalysisResult | null) => void;
}

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            history: [],
            addToHistory: (item) => set((state) => ({ history: [item, ...state.history] })),
            updateHistoryItem: (id, updates) => set((state) => ({
                history: state.history.map((item) => item.id === id ? { ...item, ...updates } : item)
            })),
            currentAnalysis: null,
            setCurrentAnalysis: (item) => set({ currentAnalysis: item }),
        }),
        {
            name: 'contacto-storage',
        }
    )
);
