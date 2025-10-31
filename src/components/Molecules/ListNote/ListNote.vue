<template>
  <ListLayout>
    <NoteCard
        v-for="note in notes"
        :key="note.id"
        :note="note"
    />
  </ListLayout>
</template>

<script setup lang="ts">
import ListLayout from '../ListLayout/ListLayout.vue'
import NoteCard from '../NoteCard/NoteCard.vue'

defineProps<{
  notes: {
    id: string | number
    contentMd: string
    createdAt: string
    status?: 'active' | 'completed'
    priority?: 'high' | 'medium' | 'low'
    tags?: string[]
  }[]
}>()
</script>
