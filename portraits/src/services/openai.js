"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSoulPortrait = generateSoulPortrait;
exports.generateSoulImage = generateSoulImage;
const openai_1 = __importDefault(require("openai"));
if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY environment variable');
}
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
async function generateSoulPortrait(userDescription) {
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
    if (!response)
        throw new Error('No response from OpenAI');
    const [description, imagePrompt] = response.split('PROMPT:').map(s => s.trim());
    const cleanDescription = description.replace('OPIS:', '').trim();
    return {
        description: cleanDescription,
        imagePrompt: imagePrompt
    };
}
async function generateSoulImage(imagePrompt, style) {
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
