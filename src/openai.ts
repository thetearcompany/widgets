import OpenAI from 'openai';
import { env } from './config/env';
import { ArtStyle } from './types/styles';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export interface SoulPortraitResponse {
  description: string;
  imagePrompt: string;
}

export async function generateSoulPortrait(userDescription: string): Promise<SoulPortraitResponse> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `Jesteś duchowym przewodnikiem, który potrafi odczytać esencję duszy człowieka.
        Na podstawie opisu osoby, stwórz głęboki, poetycki i metaforyczny opis jej duszy.
        Następnie zaproponuj prompt do DALL-E, który pozwoli stworzyć artystyczny, abstrakcyjny portret tej duszy.
        
        Format odpowiedzi:
        OPIS: [tutaj poetycki opis duszy]
        PROMPT: [tutaj prompt do DALL-E w języku angielskim]`
      },
      {
        role: "user",
        content: userDescription
      }
    ],
    temperature: 0.9,
  });

  const response = completion.choices[0].message.content;
  if (!response) throw new Error('No response from OpenAI');

  const [description, imagePrompt] = response.split('PROMPT:').map(s => s.trim());
  const cleanDescription = description.replace('OPIS:', '').trim();

  return {
    description: cleanDescription,
    imagePrompt: imagePrompt
  };
}

export async function generateSoulImage(imagePrompt: string, style: ArtStyle): Promise<string> {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `Create an artistic, abstract soul portrait: ${imagePrompt}. 
    Style: ${style.prompt}, high quality art, professional composition`,
    size: "1024x1024",
    quality: "standard",
    n: 1,
  });

  if (!response.data[0].url) {
    throw new Error('No image generated');
  }

  return response.data[0].url;
} 