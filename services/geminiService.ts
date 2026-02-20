
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, UserInput } from "../types";

export const analyzeResume = async (input: UserInput): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Analyze the following resume text against the target job role.
    
    Resume Text:
    ${input.resumeText}
    
    Target Job Role:
    ${input.jobRole}
    
    Rules:
    - Be professional and clear.
    - Use simple, direct language.
    - Do not add false information or hallucinations.
    - Ensure exactly 5 improvement suggestions are provided.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: {
            type: Type.STRING,
            description: "2-3 line summary of the candidate's profile in relation to the role.",
          },
          keySkills: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of key skills identified from the resume.",
          },
          missingSkills: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of missing or weak skills required for the target role.",
          },
          improvementSuggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Exactly 5 resume improvement suggestions.",
          },
          improvementRoadmap: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Short-term skill improvement roadmap steps.",
          },
        },
        required: ["summary", "keySkills", "missingSkills", "improvementSuggestions", "improvementRoadmap"],
      },
    },
  });

  const resultStr = response.text.trim();
  try {
    return JSON.parse(resultStr) as AnalysisResult;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("The AI provided an invalid response format. Please try again.");
  }
};
