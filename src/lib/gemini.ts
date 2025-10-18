export async function callGeminiAI(prompt: string, temperature: number = 0.8): Promise<any> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY is not set');
  
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: temperature, // Higher temperature for more creative responses
          maxOutputTokens: 1024, // Increased for more detailed suggestions
          topP: 0.9, // Add top_p for better response quality
          topK: 40, // Add top_k for response diversity
        },
      }),
    });
  
    if (!response.ok) {
      const error = await response.text();
      throw new Error('Gemini API error: ' + error);
    }
  
    const data = await response.json();
    return data;
  } 