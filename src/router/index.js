import Vue from 'vue'
import Router from 'vue-router'
import AuthLayout from '@/components/public/AuthLayout'
import Login from '@/components/public/Login'
import Register from '@/components/public/register'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'

import neo from './neo'
import stax from './stax'
import mily from './mily'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'authLayout',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: Login
        },
        {
          path: '/register',
          name: 'register',
          component: Register
        }
      ]
    },
    {
      // 第一级路径下页面
      path: '/main',
      name: 'main',
      component: DashboardLayout,
      children: [...neo.routes, ...stax.routes, ...mily.routes]
    }
  ]
})
