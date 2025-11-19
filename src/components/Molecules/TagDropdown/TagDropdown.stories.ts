import { ref } from "vue";
import TagDropdown from "./TagDropdown.vue";

export default {
  title: "Molecules/TagDropdown",
  component: TagDropdown,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Composant dropdown spécialisé pour la sélection de tags. Affiche les tags avec leurs couleurs et permet la sélection multiple.",
      },
    },
  },
};

const Template = (args: any) => ({
  components: { TagDropdown },
  setup() {
    const selectedTagIds = ref(args.modelValue || []);
    return { args, selectedTagIds };
  },
  template: `
    <v-app>
      <v-main>
        <div style="max-width: 400px; margin: 2rem auto; padding: 2rem;">
          <TagDropdown 
            v-model="selectedTagIds"
            v-bind="args"
          />
          <div style="margin-top: 2rem; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
            <strong>Tags sélectionnés :</strong>
            <pre>{{ JSON.stringify(selectedTagIds, null, 2) }}</pre>
          </div>
        </div>
      </v-main>
    </v-app>
  `,
});

export const Default: any = Template.bind({});
Default.args = {
  modelValue: [],
  tags: [
    { id: "1", title: "Important", color: "#FF6B6B" },
    { id: "2", title: "Work", color: "#4ECDC4" },
    { id: "3", title: "Personal", color: "#45B7D1" },
    { id: "4", title: "Shopping", color: "#FFA07A" },
    { id: "5", title: "Ideas", color: "#98D8C8" },
  ],
};

export const WithPreselectedTags: any = Template.bind({});
WithPreselectedTags.args = {
  modelValue: ["1", "3"],
  tags: [
    { id: "1", title: "Important", color: "#FF6B6B" },
    { id: "2", title: "Work", color: "#4ECDC4" },
    { id: "3", title: "Personal", color: "#45B7D1" },
    { id: "4", title: "Shopping", color: "#FFA07A" },
  ],
};

export const SingleSelection: any = Template.bind({});
SingleSelection.args = {
  modelValue: null,
  multiple: false,
  chips: false,
  tags: [
    { id: "1", title: "Important", color: "#FF6B6B" },
    { id: "2", title: "Work", color: "#4ECDC4" },
    { id: "3", title: "Personal", color: "#45B7D1" },
  ],
};

