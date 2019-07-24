// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import lodash from 'lodash'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

// 引入css
import './assets/css/style.css'

// 引入element-ui
// import {
//   Table,
//   Loading,
//   TableColumn,
//   DatePicker,
//   Breadcrumb,
//   BreadcrumbItem,
//   Card,
//   Tree,
//   Rate,
//   Switch
// } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入 material
import DashboardPlugin from './material-dashboard'

// 图表
import Chartist from 'chartist'
import Highcharts from 'highcharts'

// 绑定公共参数和方法
import { method } from './common/method'
import { config } from './common/config'

// axios配置
import axios from './common/axios'

// 图片预览
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
// Vue.use(Table)
// Vue.use(Loading)
// Vue.use(TableColumn)
// Vue.use(DatePicker)
// Vue.use(Breadcrumb)
// Vue.use(BreadcrumbItem)
// Vue.use(Card)
// Vue.use(Tree)
// Vue.use(Rate)
// Vue.use(Switch)
Vue.use(Viewer, {
  defaultOptions: {
    inline: false,
    button: true,
    navbar: false,
    title: false,
    toolbar: false,
    tooltip: true,
    movable: false,
    zoomable: true,
    rotatable: false,
    scalable: false,
    transition: true,
    fullscreen: false,
    keyboard: false,
    url: 'data-source'
  }
})

Vue.$Highcharts = Vue.prototype.$Higcharts = Highcharts
Vue.$config = Vue.prototype.$config = config
Vue.$method = Vue.prototype.$method = method
Vue.$axios = Vue.prototype.$axios = axios
// Vue._ = Vue.prototype._ = lodash

Vue.use(DashboardPlugin)

Vue.config.productionTip = false
// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get () {
    return this.$root.Chartist
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  data: {
    Chartist: Chartist
  },
  components: { App },
  template: '<App/>'
})
