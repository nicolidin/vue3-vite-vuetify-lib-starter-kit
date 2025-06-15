<template>
  <Layout>
    <ArticlePreview id="dqqd" content="yeh" size="tall" :is-dragging="false" />
    <NoteCreation />
    <button @click="addArticle">add </button>
    <MozaicArticles :articles="articles" />
    <button @click="addNewElement">add new element</button>
    <ListReactive />
    <!--    <Form/>-->
<!--    <FormZod />-->
  </Layout>
</template>

<script setup lang="ts">
import ArticlePreview from "@/components/Molecules/ArticlePreview/ArticlePreview.vue";
import { ref } from "vue";
import MozaicArticles from "@/components/Molecules/Mozaic/MozaicArticles/MozaicArticles.vue";
import Layout from "@/components/Organisms/Layout/Layout.vue";
import FormZod from "./FormZod.vue";
import NoteCreation from "@/components/Molecules/NoteCreation/NoteCreation.vue";
import {generateRandomUuid} from "@/services/utils/randomId";
import {ListReactive} from "@";

const elements = ref([]);

function addNewElement() {
  elements.value.push({id: generateRandomUuid(), text: "yaoou"})
}

const articles = ref([
  {
    documentId: "1",
    slug: "article-1",
    contentMd: "# Article 1\nThis is some sample markdown content.",
    size: "small",
  },
  {
    documentId: "2",
    slug: "article-2",
    contentMd: "## Article 2\nAnother markdown example.",
    size: "large",
  },
  {
    documentId: "3",
    slug: "article-3",
    contentMd: "## Article 3\nAnother markdown example.",
    size: "medium",
  },
  {
    documentId: "4",
    slug: "article-4",
    contentMd: "## Article 4\nAnother markdown example.",
    size: "medium",
  },
  {
    documentId: "5",
    slug: "article-5",
    contentMd: "## Article 5\nAnother markdown example.",
    size: "medium",
  },
  {
    documentId: "6",
    slug: "article-6",
    contentMd: "## Article 6\nAnother markdown example.",
    size: "medium",
  },
]);

function addArticle() {
 articles.value.push({documentId: generateRandomUuid(), contentMd: "fudqhql"})

}
</script>
