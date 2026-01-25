'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" }
});

export async function analyzeMessage(message: string, context: any) {
    if (!apiKey) {
        throw new Error("API Key not configured");
    }

    const prompt = `
    Actúa como un experto en comunicación estratégica y psicología emocional.
    Analiza el siguiente mensaje recibido y genera una respuesta táctica.
    
    Contexto:
    - Medio: ${context.medium}
    - Ámbito: ${context.scope}
    - Relación: ${context.relation}
    
    Mensaje recibido:
    "${message}"
    
    Devuelve un JSON con esta estructura exacta:
    {
      "emotionalTone": "Descripción breve del tono emocional del mensaje recibido",
      "implicitMessage": "Lo que realmente quiere decir (subtexto)",
      "risks": ["Riesgo 1", "Riesgo 2"],
      "clarifyingQuestions": ["Pregunta 1", "Pregunta 2"],
      "suggestedResponse": "Borrador de respuesta sugerida, profesional y empática"
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
