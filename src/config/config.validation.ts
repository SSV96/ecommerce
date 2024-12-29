import * as z from 'zod';

export const ConfigValidationSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string(),

  MONGO_URI: z.string(),
  MONGO_DB_NAME: z.string(),

  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),

  // JWT_COOKIE_EXPIRES_IN: z.string(),
  // EMAIL_HOST: z.string(),
  // EMAIL_PORT: z.string(),
  // EMAIL_USERNAME: z.string(),
  // EMAIL_PASSWORD: z.string(),
  // EMAIL_FROM: z.string(),
  // CLOUDINARY_CLOUD_NAME: z.string(),
  // CLOUDINARY_API_KEY: z.string(),
  // CLOUDINARY_API_SECRET: z.string(),
});
