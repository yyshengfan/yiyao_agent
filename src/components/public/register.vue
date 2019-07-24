<template>
  <div class="md-layout logncontainer">
    <div class="md-layout-item md-size-70 md-small-size-90 mx-auto">
      <simple-wizard>
        <template slot="header">
          <h3 class="">注册</h3>
          <h5 class="category">请输入注册信息.</h5>
        </template>

        <wizard-tab :before-change="() => save()">
          <template slot="label">账户信息</template>
          <div class="md-layout" style="margin-top:20px">

            <!-- 0.类型 -->
            <div class="md-layout-item md-size-50 md-medium-size-100" >
              <md-field :class="[
                  { 'md-valid': !errors.has('type') && touched.type },
                  { 'md-form-group': true },
                  { 'md-error': errors.has('type') }
                ]">
                <md-icon>account_circle</md-icon>
                <label>登录方式...</label>
                <md-select style="margin-left:12px" v-model="model.type">
                  <md-option value="1">邮箱</md-option>
                  <md-option value="2">手机</md-option>
                </md-select>
                <!-- <md-radio v-model="model.type" value="1">邮箱</md-radio>
                <md-radio v-model="model.type" value="2">手机</md-radio> -->
              </md-field>
            </div>

            <!-- 1.邮箱 -->
            <div class="md-layout-item md-size-50 md-medium-size-100" v-show="model.type=='1'">
              <md-field
                :class="[
                  { 'md-valid': !errors.has('email') && touched.email },
                  { 'md-form-group': true },
                  { 'md-error': errors.has('email') }
                ]"
              >
                <md-icon>email</md-icon>
                <label>Email...</label>
                <md-input class="input-white"
                  v-model="model.email"
                  data-vv-name="email"
                  type="text"
                  name="email"
                  required
                  v-validate="modelValidations.email"
                >
                </md-input>
              </md-field>
            </div>

            <!-- 2.手机 -->
            <div class="md-layout-item md-size-50 md-medium-size-100" v-show="model.type=='2'">
              <md-field
                :class="[
                  { 'md-valid': !errors.has('telephone') && touched.telephone },
                  { 'md-form-group': true },
                  { 'md-error': errors.has('telephone') }
                ]"
              >
                <md-icon>phone_android</md-icon>
                <label>手机号...</label>
                <md-input class="input-white"
                  v-model="model.telephone"
                  data-vv-name="telephone"
                  type="text"
                  name="telephone"
                  required
                  v-validate="modelValidations.telephone"
                >
                </md-input>
              </md-field>
            </div>

            <!-- 3.密码 -->
            <div class="md-layout-item md-size-50 md-medium-size-100">
              <md-field
                :class="[
                  { 'md-valid': !errors.has('password') && touched.password },
                  { 'md-form-group': true },
                  { 'md-error': errors.has('password') }
                ]"
              >
                <md-icon>lock_outline</md-icon>
                <label>密码...</label>
                <md-input class="input-white"
                  v-model="model.password"
                  data-vv-name="password"
                  type="password"
                  ref="password"
                  required
                  v-validate="modelValidations.password"
                >
                </md-input>
              </md-field>
            </div>

            <!-- 4.确认密码 -->
            <div class="md-layout-item md-size-50 md-medium-size-100">
              <md-field
                :class="[
                  { 'md-valid': !errors.has('confirmPassword') && touched.confirmPassword },
                  { 'md-form-group': true },
                  { 'md-error': errors.has('confirmPassword') }
                ]"
              >
                <md-icon>lock_outline</md-icon>
                <label>确认密码...</label>
                <md-input class="input-white"
                  v-model="model.confirmPassword"
                  data-vv-name="confirmPassword"
                  data-vv-as="password"
                  type="password"
                  required
                  v-validate="modelValidations.confirmPassword"
                >
                </md-input>
              </md-field>
            </div>

            <!-- 5.中文名 -->
            <div class="md-layout-item md-size-50 md-medium-size-100">
              <md-field
                :class="[
                  { 'md-valid': !errors.has('nick_name') && touched.nick_name },
                  { 'md-form-group': true },
                  { 'md-error': errors.has('nick_name') }
                ]"
              >
                <md-icon>perm_contact_calendar</md-icon>
                <label>中文名（昵称）...</label>
                <md-input class="input-white"
                  v-model="model.nick_name"
                  data-vv-name="nick_name"
                  type="text"
                  name="nick_name"
                  required
                  v-validate="modelValidations.nick_name"
                >
                </md-input>
              </md-field>
            </div>       

            <!-- 6.代理标识符 -->
            <div class="md-layout-item md-size-50 md-medium-size-100">
              <md-field
                :class="[
                  { 'md-valid': !errors.has('user_code') && touched.user_code },
                  { 'md-form-group': true },
                  { 'md-error': errors.has('user_code') }
                ]"
              >
                <md-icon>supervised_user_circle</md-icon>
                <label>推荐码...</label>
                <md-input class="input-white"
                  v-model="model.user_code"
                  data-vv-name="user_code"
                  type="text"
                  name="user_code"
                  required
                  v-validate="modelValidations.user_code"
                >
                </md-input>
              </md-field>
            </div>   

            <!-- 7.图形验证码 -->
            <div class="md-layout-item md-size-30 md-medium-size-100">
              <md-field
                :class="[
                  { 'md-valid': !errors.has('captcha') && touched.captcha },
                  { 'md-form-group': true },
                  { 'md-error': errors.has('captcha') }
                ]"
              >
                <md-icon>insert_photo</md-icon>
                <label>图形验证码...</label>
                <md-input class="input-white" style="width:300px"
                  v-model="model.captcha"
                  data-vv-name="captcha"
                  type="text"
                  name="captcha"
                  required
                  v-validate="modelValidations.captcha"
                >
                </md-input>

              </md-field>
            </div>            
            <div class="md-layout-item md-size-20 md-medium-size-100">
              <p @click="getsvgcode" id="encode" class="code-svg"></p>
            </div>
            <!-- 8.验证码 -->
            <div class="md-layout-item md-size-50 md-medium-size-100">
              <md-field
                :class="[
                  { 'md-valid': !errors.has('code') && touched.code },
                  { 'md-form-group': true },
                  { 'md-error': errors.has('code') }
                ]"
              >
                <md-icon>vpn_key</md-icon>
                <label>验证码...</label>
                <md-input class="input-white"
                  v-model="model.code"
                  data-vv-name="code"
                  type="text"
                  name="code"
                  required
                  v-validate="modelValidations.code"
                >
                </md-input>
                <span @click="getcode" :class="codeMsg==='获取验证码'? 'code-font':'code-font-gray'">{{codeMsg}}</span>
              </md-field>
            </div>            
          </div>
        </wizard-tab>
      </simple-wizard>
    </div>
  </div>
</template>
<script>
import swal from "sweetalert2";
import { SimpleWizard, WizardTab } from "@/materials";
import { clearInterval } from 'timers';
const md5 = require('md5');

export default {
  components: {
    SimpleWizard,
    WizardTab
  },
  data() {
    return {
      codeMsg:'获取验证码',
      codeNum:5,
      wizardModel: {},
      model: {
        type:'1',
        email: '',
        telephone: '',
        password: '',
        confirmPassword: '',
        nick_name: '',
        user_code: '',
        code: '',
      },
      touched: {
        email: false,
        telephone: false,
        password: false,
        confirmPassword: false,
        nick_name: false,
        user_code: false,
        code: false,
      },
      modelValidations: {
        email: {
          required: true,
          email: true
        },
        telephone: {
          required: true,
          min: 11
        },
        password: {
          required: true,
          min: 6
        },
        confirmPassword: {
          required: true,
          confirmed: "password"
        },
        nick_name: {
          required: true,
          min: 2
        },
        user_code: {
          required: false,
          min: 2
        },
        captcha: {
          required: true,
          min: 2
        },
        code: {
          required: true,
          min: 2
        },
      }
    };
  },
  mounted(){
    this.getsvgcode();
  },
  methods: {
    // 填写完成发送注册
    async save() {
      // 发送注册请求

      if(!this.$method.isPass(this.model,'type,password,nick_name,code')) return
      const data = {...this.model};

      data.user_name = data.type === '1'? data.email : data.telephone; 
      await this.$axios.post('user_register', data)
    },
    async getsvgcode(){
      const res = await this.$axios.get('captcha', {params:{width:100,height:40}})
      document.getElementById("encode").innerHTML = res
    },
    async getcode(){
      // 判断图形验证码
      if(!this.model.captcha){
        return this.$method.swal.err('请填写图形验证码')
      }
      const data = {...this.model};
      data.user_name = data.type === '1'? data.email : data.telephone; 
      const res = await this.$axios.post('verificationcode', data)

      if(res.error !== 0){
        return;
      }
      const timer = setInterval(() => {
        if(this.codeNum===0){
          this.codeMsg = '获取验证码';
          this.codeNum = 10
          window.clearInterval(timer)
          return;
        }
        this.codeMsg = '重新发送('+this.codeNum+'s)';
        this.codeNum--;
      }, 1000);
    }
  }
};
</script>
<style>

</style>

