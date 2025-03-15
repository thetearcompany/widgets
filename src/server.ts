import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { generateSoulPortrait, generateSoulImage } from './openai';
import { artStyles } from './types/styles';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  try {
    const { description, style } = req.body;
    const selectedStyle = artStyles.find(s => s.id === style) || artStyles[0];
    
    const soulPortrait = await generateSoulPortrait(description);
    const imageUrl = await generateSoulImage(soulPortrait.imagePrompt, selectedStyle);

    res.json({
      description: soulPortrait.description,
      imageUrl,
      style: selectedStyle
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/.well-known/ai-plugin.json', (_, res) => {
  res.json({
    schema_version: "v1",
    name_for_human: "Soul Portrait",
    name_for_model: "soul_portrait",
    description_for_human: "Create beautiful AI-generated portraits of your soul using GPT-4 and DALL-E 3.",
    description_for_model: "This plugin allows users to generate artistic soul portraits. It uses GPT-4 to create poetic descriptions and DALL-E 3 to visualize them in different artistic styles.",
    auth: { type: "none" },
    api: {
      type: "openapi",
      url: `https://api.soulportrait.ai/openapi.yaml`
    },
    logo_url: "https://api.soulportrait.ai/logo.png",
    contact_email: "contact@soulportrait.ai",
    legal_info_url: "https://api.soulportrait.ai/legal"
  });
});

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
}); 