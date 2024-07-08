import { openai } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  //const { messages } = await req.json();
  const prompt = ""

  try {
    const result = await streamText({
      model: openai('gpt-4-turbo'),
      prompt: prompt,
    });
  
    return result.toAIStreamResponse();
  } catch (error) {
    console.log("An unexpected error occured",error)
    throw error
  }
}

