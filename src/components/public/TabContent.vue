<template>
  <div>
    <el-card v-show="tabs.length>1" class="box-card">
      <div class="app-tabs" v-for="tab in tabs" :key="tab.name" @click="tabSelect(tab.name)">
        <div style="width:100%;height:100%" :class="{'active':tab.active}">{{tab.text}}</div>
      </div>
    </el-card>

    <div style="clear: both;"></div>

    <router-view :key="$parent.$children[1].activeClick"></router-view>

    <!--<keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>-->
  </div>

</template>
<script>

  export default {
    data() {
      return {
        name:"",
      };
    },
    computed : {
      tabs () {
        return this.$store.getters['navList/activeNavTabs'];
      },
      activeTab(){
        let tabs = this.tabs.filter(tab => tab.active);
        if(tabs.length>0){
          return tabs[0].name
        }
        else{
          return ""
        }
      }
    },
    mounted() {
      this.$log("TabContent mounted",this)
    },
    watch:{
      
    },
    methods: {
      tabSelect(tabName) {
        if(this.activeTab!= tabName){
          this.$router.push({name: tabName})
        }
      }
    }
  }
</script>
