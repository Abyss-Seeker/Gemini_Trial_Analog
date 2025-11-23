import { GoogleGenAI, Type } from "@google/genai";
import { HorrorTheme, GeneratedLore } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateArtifactLore = async (theme: HorrorTheme, artifactTitle: string): Promise<GeneratedLore> => {
  const modelId = "gemini-2.5-flash"; // Fast model for UI responsiveness

  const systemInstruction = `You are a corrupted archival database system. 
  Your task is to generate unsettling, analog-horror style log entries for visual anomalies.
  
  Tone guidelines:
  - If Theme is NUCLEAR: Cold, bureaucratic, mentioning radiation, mutation, and inevitable doom.
  - If Theme is CASSETTE: Retro-futuristic, mentioning data corruption, sentient AI, magnetic interference, and "The System".
  - If Theme is PUNK: Aggressive, chaotic, handwritten style, rebellion against control, psychological distortion.
  
  Keep descriptions brief (under 40 words) but deeply unsettling.
  `;

  const prompt = `Analyze artifact titled "${artifactTitle}" within the context of the ${theme} aesthetic. 
  Return a JSON object with 'description' (the visual anomaly log) and 'containmentProtocol' (how to handle it).`;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            containmentProtocol: { type: Type.STRING }
          },
          required: ["description", "containmentProtocol"]
        }
      }
    });

    const text = response.text;
    if (!text) {
        throw new Error("No data returned");
    }
    return JSON.parse(text) as GeneratedLore;

  } catch (error) {
    console.error("Lore generation failed:", error);
    return {
      description: "DATA CORRUPTION. UNABLE TO RETRIEVE ARCHIVE. SIGNAL LOST.",
      containmentProtocol: "IMMEDIATE TERMINATION"
    };
  }
};
