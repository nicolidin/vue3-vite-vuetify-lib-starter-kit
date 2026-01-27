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

const props = defineProps<{
  notes: {
    id: string | number
    contentMd: string
    createdAt: string
    tags?: string[] | { title: string; color: string }[]
  }[]
}>()
</script>
