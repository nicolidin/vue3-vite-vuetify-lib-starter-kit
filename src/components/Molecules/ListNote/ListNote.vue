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
    tagsFrontId?: string[] // ✅ Sémantique : tagsFrontId sont TOUJOURS des frontId (jamais des _id MongoDB)
  }[]
  availableTags?: {
    frontId: string // ✅ frontId généré côté front (offline first) - utilisé pour le mapping
    _id?: string // _id MongoDB utilisé par le backend (pas utilisé pour le mapping)
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

    // ✅ Mapping UNIQUEMENT par frontId (sémantique explicite)
    // Les tagsFrontId dans les notes sont TOUJOURS des frontId, jamais des _id MongoDB
    // frontId est l'identifiant côté frontend pour l'offline first
    if (note.tagsFrontId && props.availableTags && note.tagsFrontId.length > 0) {
      const tags = note.tagsFrontId
        .map(tagFrontId => {
          // Chercher le tag par son frontId uniquement (pas de recherche par _id MongoDB)
          return props.availableTags?.find(t => String(t.frontId) === String(tagFrontId))
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
