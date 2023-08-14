import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import VueTheMask from 'vue-the-mask';
import dayjs from 'dayjs';
import 'element-plus/dist/index.css';
import { setupPinia } from './stores';
import App from './App.vue';
import router from './app/router';
import '@/assets/styles/main.scss';
import 'v-calendar/style.css';

export const app = createApp(App);

app.use(createPinia());
app.use(router);

dayjs().format();
app.use(setupPinia());
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
app.use(VueTheMask);
app.use(ElementPlus);
app.use(setupCalendar, {});
app.component('VCalendar', Calendar);
app.component('VDatePicker', DatePicker);
app.mount('#app');

router.beforeEach((to, from, next) => {
  const { requiresAuth } = to.meta;
  const { redirectIfLoggedIn } = to.meta;
  const isAuthenticated = !!localStorage.getItem('token');
  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (redirectIfLoggedIn && isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

createApp(App)
  .use(router);
