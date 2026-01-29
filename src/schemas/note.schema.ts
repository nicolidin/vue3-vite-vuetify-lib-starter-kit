import { z } from 'zod';

/**
 * Schéma commun pour Note (base réutilisable)
 */
export const NoteCommonSchema = z.object({
  id: z.string().optional(),
  contentMd: z.string().min(1, 'Contenu requis'),
  tagIds: z.array(z.string()).optional(),
  createdAt: z.string().datetime().optional(),
});

/**
 * Schéma pour la création d'une note
 * - Pas d'id (généré côté serveur)
 * - Pas de createdAt (généré côté serveur)
 * - title optionnel (peut être extrait du contentMd)
 */
export const NoteCreateSchema = NoteCommonSchema.omit({ id: true, createdAt: true }).extend({
  title: z.string().optional(),
});

/**
 * Schéma pour la mise à jour d'une note
 * - id requis
 * - Tous les autres champs optionnels (partial update)
 */
export const NoteUpdateSchema = NoteCommonSchema.partial().extend({
  id: z.string(),
});

/**
 * Inférence de types depuis les schémas
 */
export type NoteCommon = z.infer<typeof NoteCommonSchema>;
export type NoteCreate = z.infer<typeof NoteCreateSchema>;
export type NoteUpdate = z.infer<typeof NoteUpdateSchema>;
