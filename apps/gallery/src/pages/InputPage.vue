<script setup lang="ts">
import { InputNumber, InputText, Panel, Textarea } from "@mcsl/ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";

const name = ref("Future Paper EU-1");
const smallName = ref("Small input");
const mediumName = ref("Medium input");
const largeName = ref("Large input");
const password = ref("correct-horse-battery-staple");
const note = ref("A quiet resize interaction matters when the user is editing long server notes.");
const command = ref("java -Xms2G -Xmx4G -jar server.jar nogui");
const port = ref(25565);
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>Inputs</h2></template>
        <div class="input-layout">
          <label class="input-field">
            <span>Instance</span>
            <InputText v-model="name" clearable placeholder="Instance name" />
          </label>
          <label class="input-field">
            <span>Password</span>
            <InputText v-model="password" password placeholder="Password" />
          </label>
          <label class="input-field">
            <span>Port</span>
            <InputNumber v-model="port" :min="1" :max="65535" />
          </label>
          <label class="input-field input-field--wide">
            <span>Notes</span>
            <Textarea v-model="note" placeholder="Server notes" />
          </label>
        </div>
      </Panel>

      <Panel class="doc-section" shadow="hover">
        <template #header><h2>Sizes</h2></template>
        <div class="sizes-layout">
          <label class="input-field">
            <span>Small</span>
            <InputText v-model="smallName" size="small" clearable />
          </label>
          <label class="input-field">
            <span>Medium</span>
            <InputText v-model="mediumName" size="medium" clearable />
          </label>
          <label class="input-field">
            <span>Large</span>
            <InputText v-model="largeName" size="large" clearable />
          </label>
        </div>
      </Panel>
    </template>

    <template #demo>
      <Panel class="doc-section" shadow="hover">
        <template #header><h2>Resize Control</h2></template>
        <div class="resize-layout">
          <label class="input-field">
            <span>Resize X</span>
            <InputText v-model="name" resize-x clearable />
          </label>
          <label class="input-field">
            <span>Resize Y</span>
            <Textarea v-model="command" resize-y />
          </label>
          <label class="input-field">
            <span>Resize X + Y</span>
            <Textarea v-model="note" resize-x resize-y />
          </label>
          <label class="input-field">
            <span>Locked</span>
            <Textarea v-model="note" />
          </label>
        </div>
      </Panel>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.input-layout,
.resize-layout,
.sizes-layout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  align-items: start;
}

.resize-layout {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.sizes-layout {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: end;
}

.input-field {
  display: grid;
  min-width: 0;
  gap: 8px;
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-sm);
  font-weight: 600;
}

.input-field > span {
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
}

.input-field--wide {
  grid-column: 1 / -1;
}

@media (max-width: 960px) {
  .resize-layout {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sizes-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .input-layout,
  .resize-layout,
  .sizes-layout {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
