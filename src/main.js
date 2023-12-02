import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// STYLES
import '@assets/sass/grid.scss';
import '@assets/sass/utils.scss';
import '@assets/sass/spacing.scss';
import '@assets/sass/theme.scss';
import '@assets/sass/scrollbars.scss';

// FONT-AWESOME
import '@assets/font-awesome/css/all.min.css';

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
