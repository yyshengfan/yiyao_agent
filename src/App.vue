<template>
  <router-view></router-view>
</template>

<script>
import Layout from '@/components/public/Layout'; 
export default {
  // name: 'App',
  // components:{
  //   'app-layout': Layout
  // },
  // data:()=>{
  //   return {

  //   }
  // },
  // computed: {
  //   logged(){
  //     return true;
  //     // return this.$store.state.auth !== '';
  //   },
  //   isLogin(){
  //     return this.formatRouteName(this.$route.name);
  //   },
  // },
  // methods:{
  //   formatRouteName(val){
  //     switch(val){
  //       case 'login':
  //         return true
  //       case 'register':
  //         return true
  //       case 'index':
  //         return true
  //       default:
  //         return false
  //     }
  //   }
  // }
}
</script>

<style>
</style>
