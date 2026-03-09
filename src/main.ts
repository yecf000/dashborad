/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { createPinia } from "pinia";
import { registerPlugins } from '@/plugins'

import {commonfuctions} from '@/utils/commonfuctions'
// Components
import App from './App.vue'
// Composables
import { createApp } from 'vue'

const app = createApp(App)

app.config.globalProperties.$fuc = commonfuctions;
registerPlugins(app)

// app.mount('#app')

const pinia = createPinia();


app.use(pinia).mount("#app");
