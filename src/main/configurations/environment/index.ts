import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
  TZ: z.string().default('UTC'),
  PASSWORD_SALT: z.number().default(12),
});

const ENV = envSchema.parse(process.env);

export { ENV };
