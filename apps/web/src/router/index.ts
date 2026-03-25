import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, Router } from 'vue-router'

import LoginView from '../views/LoginView.vue'

interface CreateAppRouterOptions {
  ssr?: boolean
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
]

export function createAppRouter(options: CreateAppRouterOptions = {}): Router {
  const isSsr = options.ssr ?? false

  return createRouter({
    history: isSsr ? createMemoryHistory() : createWebHistory(),
    routes,
  })
}
