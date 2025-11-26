<template>
  <ListLayout>
    <NoteCard
        v-for="note in notesWithTags"
        :key="note.frontId"
        :note="note"
    />
  </ListLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ListLayout from '../ListLayout/ListLayout.vue'
import NoteCard from '../NoteCard/NoteCard.vue'

const props = defineProps<{
  notes: {
    frontId: string | number
    contentMd: string
    createdAt: string
    tags?: string[] | { title: string; color: string }[]
    tagIds?: string[]
  }[]
  availableTags?: {
    frontId: string
    title: string
    color: string
  }[]
}>()

const notesWithTags = computed(() => {
  return props.notes.map(note => {
    // Si la note a déjà des tags, on les garde
    if (note.tags) {
      return note
    }
    
    // Si la note a des tagIds et qu'on a availableTags, on les convertit
    if (note.tagIds && props.availableTags && note.tagIds.length > 0) {
      const tags = note.tagIds
        .map(tagId => {
          // Convertir tagId en string pour la comparaison
          const tagIdStr = String(tagId);
          return props.availableTags?.find(t => String(t.frontId) === tagIdStr);
        })
        .filter(Boolean)
        .map(tag => ({ title: tag!.title, color: tag!.color }))
      
      return { ...note, tags }
    }
    
    // Sinon, on retourne la note sans tags
    return { ...note, tags: [] }
  })
})
</script>
