'use client';

import React, { useState, useEffect } from 'react';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import Clarity from "@/components/Clarity";

export default function TrackingScripts() {
    const [hasConsent, setHasConsent] = useState(false);

    useEffect(() => {
        const checkConsent = () => {
            const consent = localStorage.getItem('contacto-consent');
            setHasConsent(consent === 'accepted');
        };

        checkConsent();

        // Listen for the custom event from CookieConsent component
        window.addEventListener('cookie-consent-updated', checkConsent);
        return () => window.removeEventListener('cookie-consent-updated', checkConsent);
    }, []);

    if (!hasConsent) return null;

    return (
        <>
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
            <Clarity />
        </>
    );
}
