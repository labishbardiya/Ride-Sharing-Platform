import dotenv from "dotenv";
import { z } from "zod";

// Load .env early
dotenv.config();

// In development provide a safe default JWT secret so the app can run without
// requiring the developer to set env vars immediately. This is intentional for
// local development only — production MUST set JWT_SECRET to a secure value.
if (!process.env.JWT_SECRET && process.env.NODE_ENV !== "production") {
  // 32 chars default to satisfy min length
  process.env.JWT_SECRET = "dev-jwt-secret-please-change-123456";
}

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.string().default("4000"),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(16, "JWT_SECRET should be at least 16 characters"),
  EMAIL_DOMAIN: z.string().default("@jklu.edu.in"),
  DATA_RETENTION_MONTHS: z.string().default("6"),
});

export const env = envSchema.parse(process.env);

