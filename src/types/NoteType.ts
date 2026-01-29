/**
 * Type de base pour une Note
 * Utilisé par les composants de la lib et peut être étendu dans le projet hôte
 */
export type NoteType = {
  id: string;
  contentMd: string;
  tagsId: string[];
  createdAt?: string;
};

/**
 * Type pour la création d'une note (sans id ni dates)
 */
export type NoteCreateInput = {
  title?: string;
  contentMd: string;
  tagsId?: string[];
};

/**
 * Type pour la mise à jour d'une note
 */
export type NoteUpdateInput = {
  id: string;
  contentMd?: string;
  tagsId?: string[];
};
