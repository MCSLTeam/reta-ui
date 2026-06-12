<script setup lang="ts">
import { RButton, RMessage } from "reta-ui";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="message-grid">
          <r-message title="Instance ready" color="success" closeable>
            Paper EU-1 is online and accepting console commands.
          </r-message>
          <r-message title="Version drift" color="warning" closeable>
            Three plugins were built against an older server API.
          </r-message>
          <r-message title="Daemon rejected request" color="danger" closeable>
            The selected instance is locked by another operation.
          </r-message>
          <r-message title="Queue updated" color="help" closeable>
            Backup jobs will run after the current upload finishes.
          </r-message>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="message-grid">
          <r-message title="Borderless surface" color="primary">
            Status messages use a quiet tinted background and keep the icon aligned to the text rhythm.
          </r-message>
          <r-message title="Outlined surface" color="danger" variant="outlined">
            Use the outlined variant when the message sits on a dense or similarly tinted surface.
          </r-message>
          <r-message color="surface" icon="fas fa-terminal" variant="soft">
            Console output paused while the daemon reconnects.
            <template #buttons="{ close }">
              <r-button size="small" type="text" @click="close">Dismiss</r-button>
              <r-button size="small" type="primary" color="primary">Reconnect</r-button>
            </template>
          </r-message>
          <r-message color="help" icon="fas fa-circle-info" variant="text">
            Inline messages keep the same spacing model without drawing a container.
          </r-message>
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.message-grid {
  display: grid;
  gap: 12px;
}
</style>
