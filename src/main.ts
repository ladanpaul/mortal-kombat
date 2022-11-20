import { createApp } from 'vue';
import App from './App.vue';
import { router } from './plugins/router';
import store from './store';
import './style.scss';

const app = createApp(App);

app.provide('store', store);
app.use(router);
app.mount('#app');
