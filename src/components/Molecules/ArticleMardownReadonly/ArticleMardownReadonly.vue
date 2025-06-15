<template>
  <MarkdownText :content-md="props.contentMd" />
</template>

<script setup lang="ts">
import MarkdownText from "@/components/Molecules/MarkdownText/MarkdownText.vue";

const props = defineProps<{
  contentMd: string;
}>();
</script>
