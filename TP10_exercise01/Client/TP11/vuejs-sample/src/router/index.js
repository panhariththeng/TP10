import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import authApi from '@/providers/apis/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
  ]
});

router.beforeEach(async (to, from, next) => {
  const me = await authApi.getMe();
  const isAuthenticated = !!me
  if (to.name.includes('home') && !isAuthenticated) next({ name: 'login' })
  else next()
})


export default router
