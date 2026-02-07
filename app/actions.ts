'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" }
});

export async function analyzeMessage(
    message: string,
    context: any,
    type: 'incoming' | 'outgoing' = 'incoming',
    security?: { honeypot?: string; token?: string }
) {
    // 1. Honeypot Check
    if (security?.honeypot && security.honeypot.trim() !== '') {
        // Return a generic/fake response to fool the bot
        return {
            emotionalTone: "Neutral",
            implicitMessage: "Mensaje procesado correctamente.",
            risks: [],
            clarifyingQuestions: [],
            suggestedResponse: "Gracias por tu mensaje."
        };
    }

    // 2. Cloudflare Turnstile Check
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && security?.token) {
        const formData = new FormData();
        formData.append('secret', turnstileSecret);
        formData.append('response', security.token);

        try {
            const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
                method: 'POST',
                body: formData,
            });
            const outcome = await result.json();
            if (!outcome.success) {
                throw new Error("Verificación de seguridad fallida");
            }
        } catch (e) {
            console.error("Turnstile validation error:", e);
            throw new Error("Error en la verificación de seguridad");
        }
    }

    if (!apiKey) {
        throw new Error("API Key not configured");
    }

    const isIncoming = type === 'incoming';

    let promptContext = "";
    if (context.medium || context.scope || context.relation) {
        promptContext = `
    Contexto:
    ${context.medium ? `- Medio: ${context.medium}` : ''}
    ${context.scope ? `- Ámbito: ${context.scope}` : ''}
    ${context.relation ? `- Relación: ${context.relation}` : ''}
        `;
    } else {
        promptContext = `
    Contexto:
    - No especificado (asumir contexto general)
        `;
    }

    const prompt = `
    Actúa como un experto en comunicación estratégica y psicología emocional.
    Analiza el siguiente mensaje ${isIncoming ? 'recibido' : 'que el usuario desea enviar'} y genera una ${isIncoming ? 'respuesta táctica' : 'evaluación de impacto y sugerencias de mejora'}.
    ${promptContext}
    
    Mensaje ${isIncoming ? 'recibido' : 'a enviar (borrador)'}:
    "${message}"
    
    Devuelve un JSON con esta estructura exacta:
    {
      "emotionalTone": "Descripción breve del tono emocional del mensaje",
      "implicitMessage": "${isIncoming ? 'Lo que realmente quiere decir (subtexto)' : 'Cómo podría ser percibido por el receptor'}",
      "risks": ["Riesgo 1", "Riesgo 2"],
      "clarifyingQuestions": ["Pregunta 1", "Pregunta 2"],
      "suggestedResponse": "${isIncoming ? 'Borrador de respuesta sugerida, profesional y empática' : 'Versión mejorada del mensaje para maximizar claridad y empatía'}"
    }
    
    La respuesta debe ser en español, profesional, y adecuada al contexto.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return JSON.parse(text);
    } catch (error) {
        console.error("Error analyzing message:", error);
        throw new Error("Failed to analyze message");
    }
}

export async function refineResponse(
    originalMessage: string,
    currentResponse: string,
    context: any,
    instruction: string,
    history: string[] = [] // Optional: previous comments/iterations
) {
    if (!apiKey) {
        throw new Error("API Key not configured");
    }

    let promptContext = "";
    if (context.medium || context.scope || context.relation) {
        promptContext = `
    Contexto original:
    ${context.medium ? `- Medio: ${context.medium}` : ''}
    ${context.scope ? `- Ámbito: ${context.scope}` : ''}
    ${context.relation ? `- Relación: ${context.relation}` : ''}
        `;
    }

    const prompt = `
    Actúa como un experto en comunicación estratégica.
    
    TAREA: Refinar una respuesta sugerida basándose en una instrucción específica del usuario.
    
    ${promptContext}
    
    Mensaje Original (al que se responde):
    "${originalMessage}"
    
    Respuesta sugerida actual:
    "${currentResponse}"
    
    Historial de cambios solicitados:
    ${history.length > 0 ? history.map(h => `- ${h}`).join('\n') : "Ninguno."}
    
    INSTRUCCIÓN DE REFINAMIENTO (Lo que el usuario quiere cambiar):
    "${instruction}"
    
    Genera una nueva versión de la respuesta que cumpla con la instrucción.
    
    Devuelve un JSON con esta estructura exacta:
    {
      "emotionalTone": "Nuevo tono emocional (si cambió)",
      "implicitMessage": "Nuevo mensaje implícito (si cambió)",
      "risks": ["Nuevos riesgos o advertencias (si aplican)"],
      "clarifyingQuestions": ["Nuevas preguntas si la instrucción es ambigua (o vacío)"],
      "suggestedResponse": "La nueva versión refinada de la respuesta"
    }
    
    La respuesta debe ser en español.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return JSON.parse(text);
    } catch (error) {
        console.error("Error refining message:", error);
        throw new Error("Failed to refine message");
    }
}
