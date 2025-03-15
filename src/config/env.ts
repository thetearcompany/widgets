import { z } from 'zod';
import dotenv from 'dotenv';

// Załaduj zmienne środowiskowe
dotenv.config();

// Schemat walidacji
const envSchema = z.object({
  OPENAI_API_KEY: z.string({
    required_error: "OPENAI_API_KEY jest wymagany",
    invalid_type_error: "OPENAI_API_KEY musi być stringiem",
  }).min(1, "OPENAI_API_KEY nie może być pusty"),
  PORT: z.string().default("3000"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

// Walidacja i parsowanie zmiennych środowiskowych
const envParse = () => {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Nieprawidłowa konfiguracja zmiennych środowiskowych:");
    console.error(parsed.error.format());
    process.exit(1);
  }

  return parsed.data;
};

// Eksportuj zmienne środowiskowe
export const env = envParse(); 