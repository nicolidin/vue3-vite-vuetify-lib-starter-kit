import Dropdown from "./components/Atoms/Dropdown/Dropdown.vue";
import Tag from "./components/Atoms/Tag/Tag.vue";
import MarkdownText from "./components/Molecules/MarkdownText/MarkdownText.vue";
import Layout from "./components/Organisms/Layout/Layout.vue";
import ListLayout from "./components/Molecules/ListLayout/ListLayout.vue";
import TodoList from "./components/TodoListEasyExercice/TodoList.vue";
import TodoListVModel from "./components/TodoListEasyExercice/TodoListVModel.vue";
import ListNote from "./components/Molecules/ListNote/ListNote.vue";
import ListUsers from "./components/Molecules/ListUsers/ListUsers.vue";
import NoteCard from "./components/Molecules/NoteCard/NoteCard.vue";
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

// Types
export type {
  NoteType,
  NoteCreateInput,
  NoteUpdateInput,
} from "./types/NoteType";
export type {
  TagType,
  TagCreateInput,
  TagUpdateInput,
} from "./types/TagType";

// Schémas Zod
export {
  NoteCommonSchema,
  NoteCreateSchema,
  NoteUpdateSchema,
  type NoteCommon,
  type NoteCreate,
  type NoteUpdate,
} from "./schemas/note.schema";
export {
  TagCommonSchema,
  TagCreateSchema,
  TagUpdateSchema,
  type TagCommon,
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
  ListLayout,
  ListNote,
  ListUsers,
  NoteCard,
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
