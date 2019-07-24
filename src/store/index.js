import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import navList from './modules/navList.js'
import balanceFilters from './modules/balanceFilters.js'

const store = new Vuex.Store({
  state: {
    auth:"",
    count: 0,
    isMobile: (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)),
    size:localStorage.getItem("UISize") || "medium",
    status:[
      {key:0,value:"禁用"},
      {key:1,value:"正常"}
    ]
  },
  getters:{
    statusKV : (state) => {
      var obj = {};
      for(var i=0;i<state.status.length;i++){
        obj[state.status[i].key] = state.status[i].value
      }
      return obj;
    }
  },
  mutations: {
    increment(state, n) {
      n = n || 1;
      state.count += n;
    },
    changeSize(state, size) {
      state.size = size;
    },
    setAuth(state, auth) {
      state.auth = auth;
    },
  },
  actions: {
    increment(context, n) {
      context.commit('increment', n)
    },
    changeSize(context, size) {
      context.commit('changeSize', size)
    },
    setAuth(context, auth) {
      context.commit('setAuth', auth)
    },
  },
  modules: {
    navList: navList,
    balanceFilters:balanceFilters
  }
});

export default store


