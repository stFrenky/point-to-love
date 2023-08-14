import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/TLLogIn.vue'),
      meta: { redirectIfLoggenIn: true },
    },
    {
      path: '/buy',
      name: 'Buy',
      component: () => import('@/pages/TLBuy.vue'),
      // meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/pages/TLProfile.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/package-services',
      name: 'packageServices',
      component: () => import('@/pages/TLPackageServices.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/',
      name: 'packageServices',
      component: () => import('@/pages/TLPackageServices.vue'),
    },
    {
      path: '/my-packages',
      name: 'myPackages',
      component: () => import('@/pages/TLMyPackages.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/chat-specialist',
      name: 'chatSpecialist',
      component: () => import('@/pages/TLChatSpecialist.vue'),
      meta: { requiresAuth: true },
    },
  ],
});

export default router;
