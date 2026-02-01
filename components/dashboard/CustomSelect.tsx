'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    label: string;
    value: string;
    options: Option[];
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function CustomSelect({ label, value, options, onChange, placeholder }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (newValue: string) => {
        onChange(newValue);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={containerRef}>
            <label className="block text-[10px] font-bold text-sand-900 mb-1.5 uppercase tracking-widest ml-1">
                {label}
            </label>

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-sm transition-all duration-200 ${isOpen
                    ? 'border-sand-500 bg-white ring-4 ring-sand-500/10'
                    : 'border-cream-300 bg-cream-50/50 hover:bg-white hover:border-sand-400'
                    }`}
            >
                <span className={`font-semibold ${selectedOption ? 'text-slate-900' : 'text-slate-500'}`}>
                    {selectedOption ? selectedOption.label : placeholder || 'Seleccionar...'}
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-sand-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute z-50 w-full mt-2 bg-white/30 backdrop-blur-xl border border-cream-200 rounded-xl shadow-xl shadow-sand-900/10 overflow-hidden"
                    >
                        <div className="max-h-60 overflow-y-auto custom-scrollbar p-1.5">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleSelect(option.value)}
                                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between transition-colors ${value === option.value
                                        ? 'bg-sand-100/50 text-sand-900'
                                        : 'text-slate-600 hover:bg-cream-100 hover:text-slate-900'
                                        }`}
                                >
                                    {option.label}
                                    {value === option.value && (
                                        <Check className="w-3.5 h-3.5 text-sand-600" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
