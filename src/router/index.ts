import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainPage from '@pages/MainPage.vue'
import LoginPage from '@pages/LoginPage.vue'
import { useAuth } from '@store/auth.store.ts'
import StatisticsPage from '@pages/StatisticsPage.vue'
import TasksPage from '@pages/TasksPage.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'Index',
    component: MainPage,
    path: '/',
    meta: {
      isRequiredLogin: true,
      isNeedNavigation: true,
    },
  },
  {
    name: 'Statistics',
    component: StatisticsPage,
    path: '/statistics',
    meta: {
      isRequiredLogin: true,
      isNeedNavigation: true,
    },
  },
  {
    name: 'Tasks',
    component: TasksPage,
    path: '/tasks',
    meta: {
      isRequiredLogin: true,
      isNeedNavigation: true,
    },
  },
  {
    name: 'Login',
    component: LoginPage,
    path: '/login',
    meta: {
      isRequiredLogin: false,
      isNeedNavigation: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})
router.beforeEach((to, _, next) => {
  if (!to.meta.isRequiredLogin) {
    return next()
  }

  if (useAuth().accessToken?.length) {
    return next()
  }

  next('/login')
})
export default router
