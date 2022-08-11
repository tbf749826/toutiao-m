import loginIndex from '@/views/login'

import layoutIndex from '@/views/layout'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 登录页
  {
    path: '/login',
    name: 'login',

    component: loginIndex
  },
  // 首页
  {
    path: '/',
    redirect: '/home',
    component: layoutIndex,
    children: [
      // 首页中默认展示的页面
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      // 我的
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
