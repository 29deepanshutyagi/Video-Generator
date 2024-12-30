import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateCompletion(prompt, setProcessing) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // Ensure this key is correctly loaded
  console.log(apiKey); // Log the API key to check if it's correctly loaded

  // Set the processing state if required (you can call setProcessing(true) here)
  try {
    // Initialize GoogleGenerativeAI with the API key
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
          ],
        }],
      }),
    });

    const parsedResponse = await response.json();
    console.log("API Response: ", parsedResponse); // Log the full API response for debugging

    // Check if the response contains valid candidates
    if (parsedResponse && parsedResponse.candidates && parsedResponse.candidates.length > 0) {
      // Extract and return the generated content
      return parsedResponse;
    } else {
      throw new Error("No candidates found in API response");
    }
  } catch (error) {
    console.error("Error generating content:", error);
    throw error; // Re-throw the error after logging it
  }
}
