<template>
  <ListLayout>
    <NoteCard
        v-for="note in notesWithTags"
        :key="note.id"
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
    id: string | number
    contentMd: string
    createdAt: string
    tags?: string[] | { title: string; color: string }[]
    tagsId?: string[] // ✅ Sémantique : tagsId sont TOUJOURS des id (jamais des _id MongoDB)
  }[]
  availableTags?: {
    id: string // ✅ id généré côté front (offline first) - utilisé pour le mapping
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

    // ✅ Mapping UNIQUEMENT par id (sémantique explicite)
    // Les tagsId dans les notes sont TOUJOURS des id, jamais des _id MongoDB
    // id est l'identifiant côté frontend pour l'offline first
    if (note.tagsId && props.availableTags && note.tagsId.length > 0) {
      const tags = note.tagsId
        .map(tagId => {
          // Chercher le tag par son id uniquement (pas de recherche par _id MongoDB)
          return props.availableTags?.find(t => String(t.id) === String(tagId))
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
