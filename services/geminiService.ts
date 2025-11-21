import { GoogleGenAI, Type } from "@google/genai";
import { Lead, AIAnalysisResult } from "../types";

// Initialize the Gemini API client
// Note: In a real production app, calls should likely be proxied through a backend
// to keep the API key secure. For this demo, we use the environment variable directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeLead = async (lead: Partial<Lead> | string): Promise<AIAnalysisResult> => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      Act as a specialized Machine Learning Predictive Analytics Engine for B2B sales.
      Your task is to analyze the provided lead data and predict outcomes based on historical conversion patterns for similar industries.

      Analysis Parameters:
      1. **Conversion Probability (0-100%)**: Calculate the likelihood of this deal closing based on industry fit, company size, and signal strength. Use logistic regression logic.
      2. **Follow-up Priority**: Assign 'High', 'Medium', or 'Low' based on the conversion probability and estimated deal value.
      3. **Lead Quality Score**: A general health metric (0-100).
      4. **Strategic Analysis**: Provide a summary, key strengths (features increasing probability), and weaknesses (risk factors reducing probability).

      Input Data:
      ${typeof lead === 'string' ? lead : JSON.stringify(lead)}

      Return strict JSON matching the schema.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: "General quality score" },
            conversionProbability: { type: Type.INTEGER, description: "Predictive probability of closing" },
            followUpPriority: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
            summary: { type: Type.STRING },
            strengths: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            weaknesses: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            recommendation: { type: Type.STRING }
          },
          required: ["score", "conversionProbability", "followUpPriority", "summary", "strengths", "weaknesses", "recommendation"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AIAnalysisResult;
    }
    throw new Error("No text returned from model");

  } catch (error) {
    console.error("Error analyzing lead:", error);
    // Fallback mock response in case of API failure or missing key
    return {
      score: 50,
      conversionProbability: 45,
      followUpPriority: "Medium",
      summary: "Could not analyze lead deeply due to connection issue.",
      strengths: ["Unknown"],
      weaknesses: ["Unknown"],
      recommendation: "Review manually."
    };
  }
};

export const chatWithAssistant = async (message: string, history: {role: string, parts: {text: string}[]}[] = []) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      history: history,
      config: {
        systemInstruction: "You are the Solutions4U AI Assistant. You help manage B2B leads, suggest outreach strategies, and draft emails. You are professional, concise, and helpful."
      }
    });
    
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Chat error:", error);
    return "I'm having trouble connecting to the Lead Engine core. Please try again later.";
  }
};