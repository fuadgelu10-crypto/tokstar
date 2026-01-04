
import { GoogleGenAI } from "@google/genai";

// This function simulates a call to the Gemini API to generate a description.
// In a real application, you would make an actual API call here.
export const generateVideoDescription = async (): Promise<string> => {
  // Check if the API key is available in environment variables
  const apiKey = process.env.API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a short, catchy, and viral-style video description for a social media app like TikTok. Include 2-3 relevant hashtags. The description should be under 100 characters.`,
      });
      
      const text = response.text;
      if (text) {
        return text.trim();
      }
    } catch (error) {
      console.error("Gemini API call failed, falling back to mock.", error);
    }
  }

  // Fallback to mock data if API key is not present or if the call fails
  console.log("Using mocked Gemini response for video description.");
  const mockDescriptions = [
    "Living my best life! ✨ #vibes #goodday",
    "Wait for the end... you won't believe it! 🤯 #shocking #viral",
    "Just another day in paradise. ☀️ #travel #vacation",
    "This dance challenge was harder than it looks! 💃 #dance #challenge",
    "My new favorite recipe! So yummy! 😋 #foodie #recipe",
  ];
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDescriptions[Math.floor(Math.random() * mockDescriptions.length)]);
    }, 800);
  });
};
