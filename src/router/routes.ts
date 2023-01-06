import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: () => import('@view/Home/index.vue') },
];

export default routes;