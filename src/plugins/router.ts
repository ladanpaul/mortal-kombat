import * as VueRouter from 'vue-router';

const routes: VueRouter.RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../App.vue').then((m) => m.default),
    redirect: { name: 'SelectPlayer' },
    children: [
      {
        path: '',
        name: 'SelectPlayer',
        component: () =>
          import('../views/SelectPlayer.vue').then((m) => m.default),
      },
      {
        path: 'fight',
        name: 'fight',
        component: () => import('../views/Fight.vue').then((m) => m.default),
      },
    ],
  },
];

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});
