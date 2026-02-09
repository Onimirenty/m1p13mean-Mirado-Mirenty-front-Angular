import { z } from 'zod';

export const HorairesSchema = z.object({
  jours: z
    .string()
    .min(3, 'Les jours sont requis')
    .max(20),

  heures: z
    .string()
    .regex(
      /^([01]\d|2[0-3])h[0-5]\d-([01]\d|2[0-3])h[0-5]\d$/,
      'Format attendu : 08h00 - 18h00'
    ),
});
