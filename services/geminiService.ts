import { GoogleGenAI } from "@google/genai";
import { DegenAnalysis, Platform } from "../types";

// Initialize Gemini Client
// Vercel/Vite requires variables to start with VITE_ and be accessed via import.meta.env
// We handle both process.env (for local/testing) and import.meta.env (for production build)
// Added check for 'process' to prevent browser crashes
const apiKey = (import.meta as any).env?.VITE_API_KEY || (typeof process !== "undefined" ? process.env?.API_KEY : undefined);

if (!apiKey) {
  console.warn("API Key is missing. Make sure to set VITE_API_KEY in your environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const analyzeProfile = async (username: string, platform: Platform): Promise<DegenAnalysis> => {
  const modelId = "gemini-2.5-flash";

  const prompt = `
    TASK: Generate a SAVAGE, HILARIOUS, MEME-HEAVY trading card profile for a crypto user: "${username}".
    
    INSTRUCTIONS:
    1. Archetype: Assign them a funny RPG-style class (e.g. "Professional Bagholder", "Jeet Survivor", "Rug Pull Connoisseur", "Liquidity Provider", "Chart Staring Specialist").
    2. Score: Random "Degen Score" (0-100). High = reckless/chad, Low = normie/scared.
    3. Description: A short, brutal roast or praise using deep crypto twitter slang (WAGMI, NGMI, cope, seethe, down bad, down only, chad). Max 2 sentences.
    4. Pros/Cons: Funny attributes.
    
    OUTPUT FORMAT (JSON ONLY):
    {
      "score": number,
      "rank": "string (The RPG Class Title)",
      "description": "string",
      "pros": ["string (e.g. 'Diamond Hands')", "string"],
      "cons": ["string (e.g. 'Buys Tops')", "string"],
      "suggestedMemecoin": "string (Ticker like WIF, POPCAT, MOG)"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        temperature: 1.3, // Maximum creativity/chaos
      },
    });

    let text = response.text || "{}";
    
    // Safety check for refusal
    if (text.trim().toLowerCase().startsWith("i am sorry")) {
      throw new Error("AI refused to generate a card.");
    }

    // Robust JSON extraction
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    
    if (jsonStart === -1 || jsonEnd === -1) {
       throw new Error("AI returned invalid data format.");
    }

    const jsonString = text.substring(jsonStart, jsonEnd + 1);
    const data = JSON.parse(jsonString) as DegenAnalysis;

    return { ...data };

  } catch (error: any) {
    console.error("Gemini Analysis Failed:", error);
    throw new Error("Failed to generate card data. Try again.");
  }
};