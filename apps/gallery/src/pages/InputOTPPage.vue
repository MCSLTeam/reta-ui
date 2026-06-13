<script setup lang="ts">
import { RInputOtp, RMessage, RTag } from "reta-ui";
import { ref } from "vue";
import GalleryDocPage from "../components/GalleryDocPage.vue";
import GalleryExample from "../components/GalleryExample.vue";

const token = ref("248196");
const secureToken = ref("");
const inviteCode = ref("RTA9");
const completed = ref("");
</script>

<template>
  <GalleryDocPage>
    <template #effects>
      <GalleryExample :title="$t('gallery.sections.basic')">
        <div class="otp-stack">
          <label>
            <span>Numeric code</span>
            <r-input-otp v-model="token" :length="6" />
          </label>
          <label>
            <span>Masked code</span>
            <r-input-otp v-model="secureToken" :length="6" mask placeholder="-" />
          </label>
          <label>
            <span>Text token</span>
            <r-input-otp v-model="inviteCode" :length="4" :numeric="false" color="success" />
          </label>
        </div>
      </GalleryExample>
    </template>

    <template #demo>
      <GalleryExample :title="$t('gallery.sections.example')">
        <div class="otp-stack">
          <r-input-otp
            v-model="completed"
            :length="6"
            color="primary"
            @complete="completed = $event"
          />
          <r-message color="help" title="Current value">
            <div class="tag-row">
              <r-tag color="primary">{{ completed || "Waiting" }}</r-tag>
              <r-tag color="success">Paste supported</r-tag>
            </div>
          </r-message>
        </div>
      </GalleryExample>
    </template>
  </GalleryDocPage>
</template>

<style scoped lang="scss">
.otp-stack {
  display: grid;
  gap: 14px;
}

label {
  display: grid;
  gap: 8px;
}

label > span {
  color: var(--mcsl-text-color-secondary);
  font-size: var(--mcsl-font-size-sm);
  font-weight: 650;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
