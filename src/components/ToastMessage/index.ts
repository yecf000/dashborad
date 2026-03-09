import { createApp } from "vue";
import ToastMessage from "./ToastMessage.vue";
import vuetify from "@/plugins/vuetify";

const toastMessage = (options: {}) => {
  const rootNode = document.createElement("div");
  document.body.appendChild(rootNode);
  const app = createApp(ToastMessage, {
    ...options,
    hide() {
      app.unmount();
      document.body.removeChild(rootNode);
    },
  });
  app.use(vuetify);
  return app.mount(rootNode);
};

toastMessage.install = (app: any) => {
  app.config.globalProperties.$toastMessage = (options: any) =>
    toastMessage(options).show();
};
toastMessage.show = (options: any) => toastMessage(options).show();

export default toastMessage;
