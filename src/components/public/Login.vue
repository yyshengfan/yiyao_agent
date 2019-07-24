<template>
  <div class="md-layout text-center logncontainer">
    <div class="md-layout-item md-size-80 md-medium-size-50 md-small-size-70 md-xsmall-size-100">
      <login-card header-color="green">
        <h4 slot="title" class="title">登录</h4>

        <!-- 1 用户名 -->
        <md-field class="md-form-group" slot="inputs">
          <md-icon>account_circle</md-icon>
          <label>用户名...</label>
          <md-input v-model="email" type="email" @keyup.enter="login"></md-input>
        </md-field>

        <!-- 3 密码 -->
        <md-field class="md-form-group" slot="inputs">
          <md-icon>lock_outline</md-icon>
          <label>密码...</label>
          <md-input v-model="password" @keyup.enter="login" type="password"></md-input>
        </md-field>
          <md-button slot="footer" class="md-round md-simple md-primary md-large"><router-link to="/重置密码">忘记密码？</router-link></md-button>

          <md-button slot="footer" class="md-round md-success md-sm"  style="margin-left:10%" @click="login()">登录</md-button>
      </login-card>
    </div>
  </div>
</template>
<script>
import { LoginCard } from "@/materials";
import { SlideYDownTransition } from "vue2-transitions";

const md5 = require('md5');

export default {
  components: {
    LoginCard,
    SlideYDownTransition
  },
  data() {
    return {
      // email: 'root@1.com',//管理员
      email: 'yyshengfan@126.com',//管理员
      password: '111111',
      userid: ''
    };
  },
  methods: {
    async login() {
      const data = {
        email: this.email,
        password: this.email.includes('@') ? md5(this.password) : this.password
      }
      const res = await this.$axios.post('users/login',data);
      console.log(res);
      if (~~res.code===0){
        // 存token
        // console.log('获取token=' + res.result.token)
        window.sessionStorage.setItem('token', res.result.token)
        // 存用户id
        window.sessionStorage.setItem('userid', res.result.user.id)
        this.$store.state.userid = sessionStorage.userid
        // 存用户昵称
        window.sessionStorage.setItem('chineseName', res.result.user.chineseName)
        this.$store.state.chineseName = sessionStorage.chineseName
        // 存用户roleId
        window.sessionStorage.setItem('roleId', res.result.user.roleId)
        this.$store.state.roleId = sessionStorage.roleId
        // 存用户email
        window.sessionStorage.setItem('email', this.email)
        this.$store.state.email = sessionStorage.email
        this.$router.push('personalIndex')
      } else {
        this.$method.swal.warning('非管理员无法登陆!')
      }
    },
  },
};
</script>

<style  lang="scss" scoped>
.logncontainer {
  margin: 100px 0;
}
.md-card .md-card-actions {
  border: none;
}
</style>
