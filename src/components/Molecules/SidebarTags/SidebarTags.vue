<template>
  <v-navigation-drawer
    :model-value="modelValue"
    :permanent="permanent"
    :temporary="temporary"
    :width="width"
    class="sidebar-tags"
  >
    <template v-if="title">
      <div class="sidebar-tags__title">
        {{ title }}
      </div>
    </template>
    
    <v-list class="sidebar-tags__list">
      <v-list-item
        v-for="tag in allTagsWithDefault"
        :key="tag.libelleName"
        @click="handleTagClick(tag)"
        :class="[
          'sidebar-tags__item',
          { 'sidebar-tags__item--selected': tag.isSelected }
        ]"
      >
        <template v-slot:prepend>
          <v-icon
            v-if="tag.isSelected"
            size="small"
            color="primary"
            class="sidebar-tags__item-icon"
          >
            mdi-check-circle
          </v-icon>
          <v-icon
            v-else
            size="small"
            color="grey-lighten-1"
            class="sidebar-tags__item-icon"
          >
            mdi-label-outline
          </v-icon>
        </template>
        
        <v-list-item-title class="sidebar-tags__item-label">
          {{ tag.libelleName }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from "vue";

const ALL_NOTES_TAG = "All Notes";

const props = defineProps<{
  tags: {
    libelleName: string;
    isSelected: boolean;
  }[];
  title?: string;
  modelValue?: boolean;
  permanent?: boolean;
  temporary?: boolean;
  width?: number | string;
}>();

const emit = defineEmits<{
  (e: "tag-click", tag: { libelleName: string; isSelected: boolean }): void;
  (e: "update:modelValue", value: boolean): void;
}>();

// Filtrer "All Notes" de la liste des tags passés en props pour éviter les doublons
const filteredTags = computed(() => 
  props.tags.filter(tag => tag.libelleName !== ALL_NOTES_TAG)
);

// "All Notes" est sélectionné uniquement si aucun tag n'est sélectionné
const isAllNotesSelected = computed(() => {
  return !filteredTags.value.some(tag => tag.isSelected);
});

// Computed property qui ajoute "All Notes" au début de la liste
const allTagsWithDefault = computed(() => {
  const allNotesTag = {
    libelleName: ALL_NOTES_TAG,
    isSelected: isAllNotesSelected.value,
  };
  
  return [allNotesTag, ...filteredTags.value];
});

function handleTagClick(tag: { libelleName: string; isSelected: boolean }) {
  // Si "All Notes" est cliqué, on désélectionne tous les autres tags
  if (tag.libelleName === ALL_NOTES_TAG) {
    // Émettre un événement pour chaque tag sélectionné pour les désélectionner
    filteredTags.value
      .filter(t => t.isSelected)
      .forEach(t => emit("tag-click", { ...t, isSelected: false }));
  } else {
    // Si un tag normal est cliqué, émettre l'événement normalement
    emit("tag-click", tag);
  }
}
</script>

<style scoped lang="scss">
.sidebar-tags {
  &__title {
    padding: $spacing-16 $spacing-16 $spacing-8 $spacing-16;
    font-size: 0.875rem;
    font-weight: 500;
    color: #5f6368;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    @include typo-heading-06();
  }

  &__list {
    padding: 0;
  }

  &__item {
    &--selected {
      background-color: rgba(25, 103, 210, 0.08) !important;
      
      .sidebar-tags__item-label {
        color: rgb(var(--v-theme-primary));
        font-weight: 500;
      }
    }

    &-icon {
      margin-right: $spacing-8;
    }

    &-label {
      @include typo-body;
    }
  }
}
</style>

