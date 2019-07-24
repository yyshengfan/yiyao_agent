<template>
  <div class="md-layout text-center">
    <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
    <div class="md-layout-item md-size-50 md-small-size-100">
      <lock-card>
        <img class="img" slot="imageProfile" :src="image"/>
        <h4 slot="title" class="title">用户名</h4>
        <md-field slot="content">
          <label>输入解锁密码：123</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
        <md-button href class="md-success md-round" slot="footer" @click="unlock()">解锁</md-button
        >
      </lock-card>
    </div>
  </div>
</template>
<script>
import { LockCard } from "@/materials";
export default {
  components: {
    LockCard
  },
  data() {
    return {
      password: null,
      image: "../../../static/img/faces/avatar.jpg"
    };
  },
  methods: {
    unlock() {
      if(this.password==123) {
        this.$router.push('/')
      }else{
        alert('密码错误')
      }
    }
  }
};
</script>
<style></style>
