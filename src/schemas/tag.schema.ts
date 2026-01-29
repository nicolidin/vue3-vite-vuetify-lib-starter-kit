import { z } from 'zod';

/**
 * Schéma commun pour Tag (base réutilisable)
 */
export const TagCommonSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Titre requis'),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Couleur doit être au format hex (#RRGGBB)'),
});

/**
 * Schéma pour la création d'un tag
 * - Pas d'id (généré côté serveur)
 */
export const TagCreateSchema = TagCommonSchema.omit({ id: true });

/**
 * Schéma pour la mise à jour d'un tag
 * - id requis
 * - Tous les autres champs optionnels (partial update)
 */
export const TagUpdateSchema = TagCommonSchema.partial().extend({
  id: z.string(),
});

/**
 * Inférence de types depuis les schémas
 */
export type TagCommon = z.infer<typeof TagCommonSchema>;
export type TagCreate = z.infer<typeof TagCreateSchema>;
export type TagUpdate = z.infer<typeof TagUpdateSchema>;
