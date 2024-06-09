import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('1d'),
  PRIVATE_KEY: z.string(),
  PUBLIC_KEY: z.string(),
});

export type Env = z.infer<typeof envSchema>;
