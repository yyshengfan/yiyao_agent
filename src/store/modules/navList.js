const store = {
  namespaced: true,
  state: {
    data: [],
    activeNav:""
  },
  getters: {
    initialize : state => {
      return state.data.length > 0;
    },
    data: state => {
      return state.data;
    },
    activeNav: (state) => {
      return state.activeNav;
    },
    activeNavTabs :  (state, getters) => {
      return getters.tabs(getters.activeNav);
    },
    tabs: (state) => (name) => {
      for(var i=0;i<state.data.length;i++){
        if(name == state.data[i].name){
          return state.data[i].tabs || []
        }
        if(state.data[i].children && state.data[i].children.length>0) {
          for(var j=0;j<state.data[i].children.length;j++){
            if(name == state.data[i].children[j].name){
              return state.data[i].children[j].tabs || []
            }
          }
        }
      }
      return [];
    },
    activeTab: (state, getters) => (name) => {
      var tabs = getters.tabs(name)
      if(tabs.length>0){
        for(var i=0;i<tabs.length;i++){
          if(tabs[i].active){
            return tabs[i].name
          }
        }
        return tabs[0].name;
      }
      else{
        return ""
      }
    }
  },
  mutations: {
    init (state,data) {
      state.data = data;
    },
    matchNav (state,name){
      var matched = [];
      for(var i=0;i<state.data.length;i++) {

        state.data[i].selected = false;
        state.data[i].active = false;

        if(state.data[i].name == name){
          matched.push({type:"topAlone",nav:state.data[i]});
        }
        else{
          if(state.data[i].tabs && state.data[i].tabs.length>0){
            for (var j = 0; j < state.data[i].tabs.length; j++) {

              // state.data[i].tabs[j].active = false;
              if(state.data[i].tabs[j].name == name){
                matched.push({type:"topAlone",nav:state.data[i]});
                matched.push({type:"tab",nav:state.data[i].tabs[j]});
              }
            }
          }

          if(state.data[i].children && state.data[i].children.length>0) {
            for (var j = 0; j < state.data[i].children.length; j++) {

              state.data[i].children[j].active = false;

              if(state.data[i].children[j].name == name) {
                matched.push({type:"top",nav:state.data[i]});
                matched.push({type:"sub",nav:state.data[i].children[j]});
              }
              else{
                if(state.data[i].children[j].tabs && state.data[i].children[j].tabs.length>0) {
                  for (var k = 0; k < state.data[i].children[j].tabs.length; k++) {

                    // state.data[i].children[j].tabs[k].active = false;
                    if(state.data[i].children[j].tabs[k].name == name) {
                      matched.push({type:"top",nav:state.data[i]});
                      matched.push({type:"sub",nav:state.data[i].children[j]});
                      matched.push({type:"tab",nav:state.data[i].children[j].tabs[k]});
                    }
                  }
                }
              }
            }
          }
        }
      }
      if(matched.length>0){
        for (var i = 0; i < matched.length; i++) {
          if(matched[i].type == "top"){
            matched[i].nav.selected = true;
          }
          else{
            matched[i].nav.active = true;
            if(matched[i].type=="topAlone" || matched[i].type=="sub" ){
              if (state.activeNav != matched[i].nav.name){
                state.activeNav = matched[i].nav.name;
              }
              if(matched[i].nav && matched[i].nav.tabs && matched[i].nav.tabs.length>0) {
                for (var j = 0; j < matched[i].nav.tabs.length; j++) {
                  matched[i].nav.tabs[j].active = false;
                }
              }
            }
          }
        }
      }
    }
  },
  actions: {
    init (context,data) {
      context.commit('init',data)
    },
    matchNav (context,data) {
      context.commit('matchNav',data)
    }
  }
}

export default store
