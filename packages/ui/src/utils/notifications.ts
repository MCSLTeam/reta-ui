import type { MessageProps } from "../components/misc/Message.vue";
import { ref, shallowReactive, type VueElement } from "vue";
import { useLocale } from "./stores.ts";
import { useLocalStorage } from "@vueuse/core";
import { sleep } from "./utils.ts";

type TemplateInfo = {
  props: (notif: RetaNotif) => MessageProps;
  systemNotif: (notif: RetaNotif) => { title: string; body: string };
  template: (notif: RetaNotif) => VueElement[];
};

export type NotificationType = "reta" | "system" | "both";

export type SystemNotifSettings = {
  supported: boolean;
  requestPermission: () => Promise<void>;
  isPermissionGranted: () => "default" | "granted" | "denied";
  send: (title: string, body: string) => Notification | undefined;
};

export type RetaNotifSettings = {
  template?: string;
  duration?: number;
  type?: NotificationType;
  addToHistory?: boolean;
  data: any;
};

export const systemNotificationsEnabled = useLocalStorage(
  "reta-system-notifications-enabled",
  false,
);

let systemNotifSettings: SystemNotifSettings = {
  supported: "Notification" in window,
  async requestPermission() {
    await Notification.requestPermission();
  },
  isPermissionGranted() {
    return Notification.permission;
  },
  send(title: string, body: string) {
    return new Notification(title ?? "", { body: body ?? "" });
  },
};

export function setSystemNotif(notif: SystemNotifSettings) {
  systemNotifSettings = notif;
}

export async function setSystemNotificationsEnabled(enabled: boolean) {
  systemNotificationsEnabled.value = enabled;
  if (enabled) await requestNotifPermission();
}

export class RetaNotif {
  private static idCounter = -1;

  readonly id = ++RetaNotif.idCounter;
  readonly opened = ref(false);
  private systemNotif: Notification | undefined;
  private _closed: boolean = false;

  constructor(readonly settings: RetaNotifSettings) {
    const templateId = settings.template ?? "default";
    if (!templates[templateId]) {
      console.warn(`[Reta UI] Notification template '${templateId}' not found`);
      throw new Error(`Notification template '${templateId}' not found`);
    }
    addNotif(this);
  }

  get element(): VueElement {
    return this.template.template(this)[0]!;
  }

  open() {
    if (this._closed) return;
    this.opened.value = true;
    if (
      systemNotificationsEnabled.value &&
      systemNotifSettings.isPermissionGranted() == "granted" &&
      this.isSystem
    ) {
      const systemNotif = this.template.systemNotif(this);
      if (systemNotif) {
        this.systemNotif = systemNotifSettings.send(
          systemNotif.title,
          systemNotif.body,
        );
      }
    }
    if (this.settings.duration ?? 3000 > 0) {
      setTimeout(() => {
        this.close();
      }, this.settings.duration ?? 3000);
    }
  }

  get isReta() {
    return (
      (this.settings.type ?? "reta") == "reta" || this.settings.type == "both"
    );
  }

  get isSystem() {
    return this.settings.type == "system" || this.settings.type == "both";
  }

  get template() {
    return templates[this.settings.template ?? "default"]!;
  }

  close() {
    if (this._closed) return;
    this._closed = true;
    this.opened.value = false;
    this.systemNotif?.close();
    setTimeout(() => {
      removeNotif(this.id);
    }, 500); // 等待动画
  }
}

const sysNotifWarning = useLocalStorage("sys-notif-warning", true);

export async function requestNotifPermission() {
  if (!systemNotificationsEnabled.value) return;
  const t = useLocale().getI18n().t;
  let shouldShowWarning = false;
  if (!systemNotifSettings.supported) {
    shouldShowWarning = true;
    if (sysNotifWarning.value)
      new RetaNotif({
        template: "do-not-show-again",
        data: {
          title: t("ui.notification.title.warning"),
          message: t("ui.notification.message.not-supported"),
          color: "warning",
          onClick: () => (sysNotifWarning.value = false),
        },
      }).open();
  } else if (systemNotifSettings.isPermissionGranted() == "default") {
    new RetaNotif({
      data: {
        message: t("ui.notification.message.request"),
      },
    }).open();
    await systemNotifSettings.requestPermission();
    await sleep(1000);
    await requestNotifPermission();
  } else if (systemNotifSettings.isPermissionGranted() == "denied") {
    shouldShowWarning = true;
    if (sysNotifWarning.value)
      new RetaNotif({
        template: "do-not-show-again",
        data: {
          title: t("ui.notification.title.warning"),
          message: t("ui.notification.message.not-allowed"),
          color: "warning",
          onClick: () => (sysNotifWarning.value = false),
        },
      }).open();
  }
  if (!shouldShowWarning) sysNotifWarning.value = true;
}

const templates: Record<string, TemplateInfo> = {};

export function addTemplate(
  id: string,
  props: (notif: RetaNotif) => MessageProps,
  systemNotif: (notif: RetaNotif) => { title: string; body: string },
  template: (notif: RetaNotif) => VueElement[],
) {
  templates[id] = {
    props,
    systemNotif,
    template,
  };
}

export function removeTemplate(id: string) {
  delete templates[id];
}

export function getTemplate(id: string) {
  return templates[id];
}

export const notifications = shallowReactive<Record<number, RetaNotif>>({});

export function addNotif(notif: RetaNotif) {
  notifications[notif.id] = notif;
}

export function removeNotif(id: number) {
  delete notifications[id];
}
