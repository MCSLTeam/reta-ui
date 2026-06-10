<script setup lang="ts">
import {
  addTemplate,
  RetaNotif,
  removeTemplate,
} from "../../../utils/notifications.ts";
import { onMounted, onUnmounted, type VueElement } from "vue";
import type { MessageProps } from "../../misc/Message.vue";

const props = withDefaults(
  defineProps<{
    id: string;
    props?: (notif: RetaNotif) => MessageProps;
    systemNotif?: (notif: RetaNotif) => { title: string; body: string };
  }>(),
  {
    props: (notif: RetaNotif) => notif.settings.data,
    systemNotif: (notif: RetaNotif) => ({
      title: notif.settings.data.header,
      body: notif.settings.data.message,
    }),
  },
);

const slots = defineSlots<{
  default(props: RetaNotif): VueElement[];
}>();

onMounted(() => {
  addTemplate(props.id, props.props, props.systemNotif, slots.default);
});

onUnmounted(() => {
  removeTemplate(props.id);
});
</script>

<template></template>
