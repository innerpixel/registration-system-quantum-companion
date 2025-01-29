import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create and configure the app
const app = createApp(App);

// Use plugins
app.use(ElementPlus);
app.use(router);
app.use(store);

// Initialize auth state
store.dispatch('auth/checkAuth');

// Mount the app
app.mount('#app');
