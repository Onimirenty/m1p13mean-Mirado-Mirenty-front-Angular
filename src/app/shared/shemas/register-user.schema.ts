import { z } from 'zod';

const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const RegisterUserSchema = z
  .object({
    nom: z
      .string()
      .min(3, 'Nom trop court')
      .max(100),

    genre: z.preprocess(
      (val) =>{ return Number(val) },
      z
      .number()
      .refine(val => [1,0, -1].includes(val), {
        message: 'Genre invalide',
      }),
    ),
    // 1: Homme, 0: Femme, -1: Non précisé
    dateNaissance: z
      .string()
      .refine(
        val => !Number.isNaN(Date.parse(val)),
        { message: 'Date de naissance invalide' }
      )
      .refine(
        val => new Date(val) <= new Date(),
        { message: 'La date ne peut pas être dans le futur' }
      ),

    email: z
      .string()
      .toLowerCase()
      .refine(
        (val) => emailRegex.test(val),
        { message: 'Email invalide' }
      ),

    password: z
      .string()
      .min(6, 'Mot de passe trop court (6 caractères minimum)')
      .max(50,'Mot de passe trop long (50 caractères minimum)'),
  })
  .strict();
