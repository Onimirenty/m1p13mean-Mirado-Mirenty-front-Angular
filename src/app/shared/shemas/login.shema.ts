import { z } from 'zod';
export const LoginSchema = z.object({
  username: z.string()
    .refine(value=> value.trim()!=="",{message:"veuillez saisir le nom d'utilisateur"} ),

  password: z.string()
    .refine(value=> value.trim()!=="",{message:"veuillez saisir le mot de passe"} )
});
