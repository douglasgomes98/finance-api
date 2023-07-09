import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("3333"),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
});

const ENV = envSchema.parse(process.env);

export { ENV };
