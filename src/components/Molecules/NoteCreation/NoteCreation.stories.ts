import { ref } from "vue";
import NoteCreation from "./NoteCreation.vue";

export default {
  title: "Molecules/NoteCreation",
  component: NoteCreation,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Composant de création de note simple, émet un objet note lors de la création.",
      },
    },
  },
};

const Template = (args) => ({
  components: { NoteCreation },
  setup() {
    const lastNote = ref(null);
    const onCreate = (note) => {
      lastNote.value = note;
    };
    return { args, lastNote, onCreate };
  },
  template: `
    <div style="max-width: 420px; margin: 2rem auto;">
      <NoteCreation v-bind="args" @create="onCreate" />
      <div v-if="lastNote" style="margin-top: 2rem; background: #f5f5f5; padding: 1rem; border-radius: 8px;">
        <strong>Note émise :</strong>
        <pre>{{ lastNote }}</pre>
      </div>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {};
