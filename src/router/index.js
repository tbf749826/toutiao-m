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
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 可以再props中快速的获取到articleId
    // 方法二通过this.$route.params.articleId获取id，但是不足的地方是，组件和路由直接的耦合度太高，如果复用必须传递一个articleId
    props: true
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    component: () => import('@/views/UserProfile'),
    // 可以再props中快速的获取到articleId
    // 方法二通过this.$route.params.articleId获取id，但是不足的地方是，组件和路由直接的耦合度太高，如果复用必须传递一个articleId
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
