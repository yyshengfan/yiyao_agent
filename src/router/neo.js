import personalIndex from '@/components/public/personalIndex'

// 系统设置相关

import inmoney from '@/components/money/inmoney.vue'
import inmoneyForm from '@/components/money/inmoneyForm.vue'

export default {
  routes: [
    {
      path: '/personalIndex',
      name: 'personalIndex',
      component: personalIndex
    },
    {
      path: '/inmoney',
      name: 'inmoney',
      component: inmoney
    },
    {
      path: '/inmoneyForm',
      name: 'inmoneyForm',
      component: inmoneyForm
    }

  ]
}
