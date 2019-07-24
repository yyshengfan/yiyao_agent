<template>
  <div>
    <!-- <app-head></app-head> -->
    <div class="app-body" v-if="navStatus==1" @click="toggleShow()">
      <app-side></app-side>
      <app-content class="main"></app-content>
      <!--<router-view class="main"></router-view>-->
    </div>
    <div v-else style="text-align: center; position:absolute;top:50%;left:0;margin-top:-140px;width: 100%;">
      <div v-if="navStatus==0">
        <img src="//cdn.baifm.cn/icons/spinner.png" class="fa-pulse" style="width: 5rem">
        <p style="font-size:1.1rem;color:#409EFF;">正在加载...</p>
      </div>
      <div v-else-if="navStatus == 2">
        <img src="//cdn.baifm.cn/icons/exclamation.png" style="width: 5rem">
        <p style="font-size:1.1rem">加载失败,请刷新页面重试</p>
      </div>
    </div>
  </div>

</template>

<script>
  // import AppHead from '@/components/public/Head'
  import AppSide from '@/components/public/Sidebar'
  import TabContent from '@/components/public/TabContent'

  import navList from '@/data/navList'
  export default {
    name: 'app',
    components: {
      // 'app-head': AppHead,
      'app-side': AppSide,
      'app-content': TabContent
    },
    data:function () {
      return {
        checked:false,
        navStatus:0,
      }
    },
    computed: {},
    watch: {
      $route() {
        this.matchRoute()
      },
      navStatus(){
        this.$log("navStatus", this.navStatus)
        if(this.navStatus==1){
          this.matchRoute();
        }
      }
    },
    mounted () {
      // this.$log("Layout mounted", this)
      // this.$log("App route", this.$route)
      this.getNavList()
    },
    methods: {
      toggleShow() {
        this.$children[0].isOpen=false
        // document.getElementById("dropOpen").classList.remove('open');
      },
      matchRoute() {
        if (this.$route.matched[0]) {
          this.$store.dispatch('navList/matchNav', this.$route.matched[0].name);
        }
      },
      toTree: function (data, parentId) {
        parentId = parentId || 0;
        var tree = [];
        var temp;
        for (var i = 0; i < data.length; i++) {
          if (data[i].parentId == parentId) {
            var obj = data[i];
            obj.active = false;
            temp = this.toTree(data, data[i].id);
            if (temp.length > 0) {
              obj.selected = false;
              obj.children = temp;
            }
            tree.push(obj);
          }
        }
        return tree;
      },
      getNavList: function (callback) {

      this.$store.dispatch('navList/init',navList)

      // this.$http['get']('/homepage', {params: {}})
      //   .then((response) => {
      //     var data = this.sortMeun(response.data.data)
      //     var navList = this.toTree(data)
      //     this.$store.dispatch('navList/init',navList)
      //     this.navStatus = 1;
      //   })
      //   .catch((response) => {
      //     this.$router.push({name:'index'})
      //     this.navStatus = 2;
      //   })
      },
      sortMeun(data){
        for(var i = 0 ; i < data.length-1 ; i ++){
          for(var j = 0 ; j < data.length - i - 1;j ++){
            if(data[j].sort > data[j+1].sort){
              var temp = data[j]
              data[j] = data[j+1]
              data[j+1] = temp
            }
          }
        }
        return data
      }
    }
  }
</script>
<style>

</style>
