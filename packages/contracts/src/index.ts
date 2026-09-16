import { z } from 'zod';

export const healthResponseSchema = z.object({
  service: z.literal('envax-api'),
  status: z.literal('ok'),
  version: z.literal('v1')
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;
