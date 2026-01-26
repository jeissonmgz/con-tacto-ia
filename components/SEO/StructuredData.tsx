import Script from 'next/script';

export default function StructuredData() {
    const softwareAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "ConTacto",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "description": "Asistente de impacto conversacional que analiza mensajes y ayuda a las personas a responder con tacto, claridad emocional y estrategia comunicativa.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "featureList": [
            "Análisis emocional",
            "Detección de mensaje implícito",
            "Identificación de riesgos",
            "Sugerencias de respuesta editables",
            "Historial de conversaciones"
        ]
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "ConTacto",
        "url": process.env.NEXT_PUBLIC_APP_URL || "https://contacto.app",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${process.env.NEXT_PUBLIC_APP_URL || "https://contacto.app"}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <>
            <Script
                id="ld-json-software"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
            />
            <Script
                id="ld-json-website"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
        </>
    );
}
