import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Antdv from 'ant-design-vue';

import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);

app.use(Antdv);
app.use(createPinia());
app.use(router);

app.mount('#app');
