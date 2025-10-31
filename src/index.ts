import MarkdownText from "./components/Molecules/MarkdownText/MarkdownText.vue";
import Layout from "./components/Organisms/Layout/Layout.vue";
import ListLayout from "./components/Molecules/ListLayout/ListLayout.vue";
import ListNote from "./components/Molecules/ListNote/ListNote.vue";
import ListUsers from "./components/Molecules/ListUsers/ListUsers.vue";
import NoteCard from "./components/Molecules/NoteCard/NoteCard.vue";
import UserCard from "./components/Molecules/UserCard/UserCard.vue";
import { DEFAULT_VUETIFY_CONFIG } from "./lidinAppKitConfig/vuetifyConfig/defaultVuetifyConfig";
import { createLidinAppKit } from "./lidinAppKitConfig/createLidinAppKit.ts";
import { useLanguage } from "./modules/globalAppData/composables/useLanguage.ts";
import { useTheme } from "./modules/globalAppData/composables/useTheme.ts";
import { generateRandomUuid } from "./services/utils/randomId.ts";
import { extractTitleFromMarkdown } from "./services/utils/markdownUtils.ts";

export {
  useLanguage,
  useTheme,
  createLidinAppKit,
  DEFAULT_VUETIFY_CONFIG,
  MarkdownText,
  Layout,
  ListLayout,
  ListNote,
  ListUsers,
  NoteCard,
  UserCard,
  generateRandomUuid,
  extractTitleFromMarkdown,
};
