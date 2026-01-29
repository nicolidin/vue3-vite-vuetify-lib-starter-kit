/**
 * Type de base pour un Tag
 * Utilisé par les composants de la lib et peut être étendu dans le projet hôte
 */
export type TagType = {
  id: string;
  title: string;
  color: string;
};

/**
 * Type pour la création d'un tag (sans id)
 */
export type TagCreateInput = {
  title: string;
  color: string;
};

/**
 * Type pour la mise à jour d'un tag
 */
export type TagUpdateInput = {
  id: string;
  title?: string;
  color?: string;
};
