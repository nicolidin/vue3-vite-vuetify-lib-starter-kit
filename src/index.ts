import MarkdownText from "./components/Molecules/MarkdownText/MarkdownText.vue";
import Layout from "./components/Organisms/Layout/Layout.vue";
import { DEFAULT_VUETIFY_CONFIG } from "./lidinAppKitConfig/vuetifyConfig/defaultVuetifyConfig";
import { createLidinAppKit } from "./lidinAppKitConfig/createLidinAppKit.ts";
import { useLanguage } from "./modules/globalAppData/composables/useLanguage.ts";
import { useTheme } from "./modules/globalAppData/composables/useTheme.ts";
import { generateRandomUuid } from "./services/utils/randomId.ts";

export {
  useLanguage,
  useTheme,
  createLidinAppKit,
  DEFAULT_VUETIFY_CONFIG,
  MarkdownText,
  Layout,
  generateRandomUuid,
};
