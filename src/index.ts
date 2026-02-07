import Dropdown from "./components/Atoms/Dropdown/Dropdown.vue";
import Tag from "./components/Atoms/Tag/Tag.vue";
import MarkdownText from "./components/Molecules/MarkdownText/MarkdownText.vue";
import Layout from "./components/Organisms/Layout/Layout.vue";
import HeaderLayout from "./components/Molecules/HeaderLayout/HeaderLayout.vue";
import ListLayout from "./components/Molecules/ListLayout/ListLayout.vue";
import ListLayoutDestructured from "./components/Molecules/ListLayoutDestructured/ListLayoutDestructured.vue";
import TodoList from "./components/TodoListEasyExercice/TodoList.vue";
import TodoListVModel from "./components/TodoListEasyExercice/TodoListVModel.vue";
import ListNote from "./components/Molecules/ListNote/ListNote.vue";
import ListUsers from "./components/Molecules/ListUsers/ListUsers.vue";
import NoteCard from "./components/Molecules/NoteCard/NoteCard.vue";
import NewNoteCard from "./components/Molecules/NoteCard/NewNoteCard.vue";

import NoteCreation from "./components/Molecules/NoteCreation/NoteCreation.vue";
import NoteEditor from "./components/Molecules/NoteEditor/NoteEditor.vue";
import SidebarTags from "./components/Molecules/SidebarTags/SidebarTags.vue";
import TagDropdown from "./components/Molecules/TagDropdown/TagDropdown.vue";
import UserCard from "./components/Molecules/UserCard/UserCard.vue";
import LoginForm from "./components/Molecules/LoginForm/LoginForm.vue";
import RegisterForm from "./components/Molecules/RegisterForm/RegisterForm.vue";
import { DEFAULT_VUETIFY_CONFIG } from "./lidinAppKitConfig/vuetifyConfig/defaultVuetifyConfig";
import { createLidinAppKit } from "./lidinAppKitConfig/createLidinAppKit.ts";
import { useLanguage } from "./modules/globalAppData/composables/useLanguage.ts";
import { useTheme } from "./modules/globalAppData/composables/useTheme.ts";
import { useValidation } from "./composables/useValidation/useValidation.ts";
import { generateRandomUuid } from "./services/utils/randomId.ts";
import { extractTitleFromMarkdown } from "./services/utils/markdownUtils.ts";

// Schémas Zod (validation formulaires ; la lib n'exporte plus les types domaine NoteType/TagType)
export {
  NoteCreateSchema,
  NoteUpdateSchema,
  type NoteCreate,
  type NoteUpdate,
} from "./schemas/note.schema";
export {
  TagCreateSchema,
  TagUpdateSchema,
  type TagCreate,
  type TagUpdate,
} from "./schemas/tag.schema";

export {
  useLanguage,
  useTheme,
  useValidation,
  createLidinAppKit,
  DEFAULT_VUETIFY_CONFIG,
  Dropdown,
  Tag,
  MarkdownText,
  Layout,
  HeaderLayout,
  ListLayout,
  ListLayoutDestructured,
  ListNote,
  ListUsers,
  NoteCard,
  NewNoteCard,
  NoteCreation,
  NoteEditor,
  SidebarTags,
  TagDropdown,
  UserCard,
  LoginForm,
  RegisterForm,
  TodoList,
  TodoListVModel,
  generateRandomUuid,
  extractTitleFromMarkdown,
};
