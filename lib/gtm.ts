'use client';

import { sendGTMEvent as sendNextGTMEvent } from '@next/third-parties/google';

type GTMEvent = {
    event: string;
    [key: string]: any;
};

/**
 * Safely sends an event to Google Tag Manager.
 * If GTM is not initialized or ID is missing, it logs a warning in development but doesn't crash.
 */
export const sendGTMEvent = (data: GTMEvent) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('[GTM Event]:', data);
    }

    try {
        // @next/third-parties handles the window.dataLayer check internally
        sendNextGTMEvent(data);
    } catch (error) {
        console.warn('Failed to send GTM event:', error);
    }
};
