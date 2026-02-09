import { z } from 'zod';
import { HorairesSchema } from './horaires.shema';

// const objectIdRegex = /^[a-f\d]{24}$/i;
const phoneMGRegex =/^(?:\+261|0)\s?(20|3[234789])\s?\d{2}\s?\d{3}\s?\d{2}$/;
const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_FILE_SIZE = (1 * 1024 * 1024); // 1MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
function toUndefined(val:any){
  if (val === null || val === undefined || val === '') {
    return undefined;
  }
  return val;
}

export const RegisterBoutiqueSchema = z
  .object({
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
      .max(50,'Mot de passe trop court (50 caractères minimum)'),

    nom: z
      .string()
      .min(2, 'Nom de la boutique trop court')
      .max(100),

    categorieId: z.string()
      .refine(n => n!==null && n!==undefined && n!=="0" && n.trim()!=='' , {
        message: 'categorie invalide',
      }),

    zoneId: z.string()
      .refine(n => n!==null && n!==undefined && n!=="0" && n.trim()!=='' , {
        message: 'zone invalide',
      }),


    horaires: HorairesSchema,

    contactBoutique: z
      .string()
      .regex(phoneMGRegex, 'Numéro de téléphone invalide'),

    contactProprio: z
      .string()
      .regex(phoneMGRegex, 'Numéro de téléphone invalide'),

    description: z.string().nullable().optional(),

    photo: z.preprocess(
      (val)=> {return toUndefined(val)},
      z.instanceof(File)
        .refine(file => ACCEPTED_TYPES.includes(file.type), {
          message: 'Format invalide (jpg/jpeg/png seulement)',
        })
        .refine(file => file.size <= MAX_FILE_SIZE, {
          message: 'Taille maximale de fichier : 1MB',
        })
      .optional()
    ),
  })
  .strict();
