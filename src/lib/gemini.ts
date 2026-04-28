/// <reference types="vite/client" />
export interface VerificationResultData {
  verdict: 'FACT' | 'SUS' | 'CAP';
  confidenceScore: number;
  explanation: string;
  failurePoints: string[];
  trustScore: number;
  timeline: {
    date: string;
    title: string;
    description: string;
  }[];
  sources: {
    name: string;
    status: string;
    verified: boolean;
  }[];
}

const SYSTEM_PROMPT = `You are an expert sports media authenticity verification AI named SportSnap AI.
Your job is to analyze sports rumors, news, injury updates, transfer claims, and media descriptions to determine if they are real or fake.
Analyze the user's claim and optionally the provided image.

Respond with ONLY a valid JSON object matching this exact structure:
{
  "verdict": "FACT" | "SUS" | "CAP",
  "confidenceScore": <number between 0 and 100>,
  "explanation": "<Short, witty, realistic explanation like 'Bro this clip is from 2022 💀' or 'Official club registry confirms this.'>",
  "failurePoints": [
    "<Short reason 1>",
    "<Short reason 2>",
    "<Short reason 3>",
    "<Short reason 4>"
  ],
  "trustScore": <number between 0 and 100 representing source reliability>,
  "timeline": [
    { "date": "<Date of original event>", "title": "<Original context>", "description": "<What actually happened>" },
    { "date": "<Current date>", "title": "<Current claim>", "description": "<How it is being manipulated or presented>" }
  ],
  "sources": [
    { "name": "<Source 1>", "status": "<What they said>", "verified": true/false },
    { "name": "<Source 2>", "status": "<What they said>", "verified": true/false },
    { "name": "<Source 3>", "status": "<What they said>", "verified": true/false }
  ]
}

Make the response feel like a premium, highly-intelligent sports analyst tool.
If the input is obviously fake (like LeBron doing a backflip slam dunk), give it a CAP with a low trust score.
If it's plausible but unconfirmed, give it SUS.
If it's a known true event, give it FACT.
Do NOT use markdown code blocks in your response. Just the raw JSON string.`;

export async function verifyClaimWithGemini(claim: string, imageBase64?: string): Promise<VerificationResultData> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key is not configured.");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const parts: any[] = [{ text: claim || "Please analyze this image." }];
  
  if (imageBase64) {
    // Extract base64 data without data:image/... prefix
    const base64Data = imageBase64.split(',')[1] || imageBase64;
    const mimeType = imageBase64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || 'image/jpeg';
    parts.push({
      inlineData: {
        data: base64Data,
        mimeType
      }
    });
  }

  const requestBody = {
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    contents: [
      {
        parts
      }
    ],
    generationConfig: {
      temperature: 0.2,
      responseMimeType: "application/json"
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gemini API Error:", errorText);
    throw new Error(`Gemini API returned ${response.status}`);
  }

  const data = await response.json();
  const contentText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!contentText) {
    throw new Error("No response text from Gemini");
  }

  try {
    const result = JSON.parse(contentText);
    return result as VerificationResultData;
  } catch (e) {
    console.error("Failed to parse Gemini JSON response:", contentText);
    throw new Error("Failed to parse verification result");
  }
}
