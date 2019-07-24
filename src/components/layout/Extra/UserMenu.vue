<template>
  <div>
    <!-- 用户相关 -->
    <div class="user">
      <div class="photo">
        <md-icon class="sidebarIcon">person</md-icon>
      </div>
      <div class="user-info">
        <a
          data-toggle="collapse"
          :aria-expanded="!homepage"
          @click.stop="toggleMenu('homepage')"
          @click.capture="clicked"
        >
          <span>控制面板</span>
        </a>
      </div>
    </div>

    <!-- 用户相关 -->
    <div class="user">
      <div class="photo">
        <md-icon class="sidebarIcon">person</md-icon>
      </div>
      <div class="user-info">
        <a
          data-toggle="collapse"
          :aria-expanded="!user"
          @click.stop="toggleMenu('user')"
          @click.capture="clicked"
        >
          <span>我的账户<b class="caret"></b></span>
        </a>
        <collapse-transition>
          <div v-show="!user">
            <ul class="nav">
              <slot>
                <li>
                  <router-link :to="'/user'" :class="$route.name=='user'? 'mdui-menu-item':''">
                    <md-icon class="sidebarsecondicon">keyboard_arrow_right</md-icon>
                    <span class="sidebar-normal">账户信息</span>
                  </router-link>
                </li>
              </slot>
            </ul>
            <ul class="nav">
              <slot>
                <li>
                  <router-link :to="'/user'" :class="$route.name=='user'? 'mdui-menu-item':''">
                    <md-icon class="sidebarsecondicon">keyboard_arrow_right</md-icon>
                    <span class="sidebar-normal">个人资料</span>
                  </router-link>
                </li>
              </slot>
            </ul>
          </div>
        </collapse-transition>
      </div>
    </div>

    <!-- 资金相关 -->
    <div class="user">
      <div class="photo">
        <md-icon class="sidebarIcon">person</md-icon>
      </div>
      <div class="user-info">
        <a
          data-toggle="collapse"
          :aria-expanded="!money"
          @click.stop="toggleMenu('money')"
          @click.capture="clicked"
        >
          <span>资金管理<b class="caret"></b></span>
        </a>
        <collapse-transition>
          <div v-show="!money">
            <ul class="nav">
              <slot>
                <li>
                  <router-link :to="'/inmoneyForm'" :class="$route.name=='inmoneyForm'? 'mdui-menu-item':''">
                    <md-icon class="sidebarsecondicon">keyboard_arrow_right</md-icon>
                    <span class="sidebar-normal">入金</span>
                  </router-link>
                </li>
              </slot>
            </ul>
            <ul class="nav">
              <slot>
                <li>
                  <router-link :to="'/outmoney'" :class="$route.name=='outmoney'? 'mdui-menu-item':''">
                    <md-icon class="sidebarsecondicon">keyboard_arrow_right</md-icon>
                    <span class="sidebar-normal">出金</span>
                  </router-link>
                </li>
              </slot>
            </ul>
            <ul class="nav">
              <slot>
                <li>
                  <router-link :to="'/transhfer'" :class="$route.name=='transhfer'? 'mdui-menu-item':''">
                    <md-icon class="sidebarsecondicon">keyboard_arrow_right</md-icon>
                    <span class="sidebar-normal">转账</span>
                  </router-link>
                </li>
              </slot>
            </ul>
            <ul class="nav">
              <slot>
                <li>
                  <router-link :to="'/inmoney'" :class="$route.name=='inmoney'? 'mdui-menu-item':''">
                    <md-icon class="sidebarsecondicon">keyboard_arrow_right</md-icon>
                    <span class="sidebar-normal">入金历史</span>
                  </router-link>
                </li>
              </slot>
            </ul>
            <ul class="nav">
              <slot>
                <li>
                  <router-link :to="'/outmoneylist'" :class="$route.name=='outmoneylist'? 'mdui-menu-item':''">
                    <md-icon class="sidebarsecondicon">keyboard_arrow_right</md-icon>
                    <span class="sidebar-normal">出金历史</span>
                  </router-link>
                </li>
              </slot>
            </ul>
            <ul class="nav">
              <slot>
                <li>
                  <router-link :to="'/transferlist'" :class="$route.name=='transferlist'? 'mdui-menu-item':''">
                    <md-icon class="sidebarsecondicon">keyboard_arrow_right</md-icon>
                    <span class="sidebar-normal">转账历史</span>
                  </router-link>
                </li>
              </slot>
            </ul>
          </div>
        </collapse-transition>
      </div>
    </div>

    <!-- 交易相关 -->
    <div class="user">
      <div class="photo">
        <md-icon class="sidebarIcon">person</md-icon>
      </div>
      <div class="user-info">
        <a
          data-toggle="collapse"
          :aria-expanded="!trade"
          @click.stop="toggleMenu('trade')"
          @click.capture="clicked"
        >
          <span>我的交易<b class="caret"></b></span>
        </a>
        <collapse-transition>
          <div v-show="!trade">
            <ul class="nav">
              <slot>
                <li>
                  <router-link :to="'/trade'" :class="$route.name=='trade'? 'mdui-menu-item':''">
                    <md-icon class="sidebarsecondicon">keyboard_arrow_right</md-icon>
                    <span class="sidebar-normal">交易报表</span>
                  </router-link>
                </li>
              </slot>
            </ul>
            <ul class="nav">
              <slot>
                <li>
                  <router-link :to="'/trade'" :class="$route.name=='trade'? 'mdui-menu-item':''">
                    <md-icon class="sidebarsecondicon">keyboard_arrow_right</md-icon>
                    <span class="sidebar-normal">在途订单</span>
                  </router-link>
                </li>
                <li>
                  <router-link :to="'/trade'" :class="$route.name=='trade'? 'mdui-menu-item':''">
                    <md-icon class="sidebarsecondicon">keyboard_arrow_right</md-icon>
                    <span class="sidebar-normal">限价订单</span>
                  </router-link>
                </li>
                <li>
                  <router-link :to="'/trade'" :class="$route.name=='trade'? 'mdui-menu-item':''">
                    <md-icon class="sidebarsecondicon">keyboard_arrow_right</md-icon>
                    <span class="sidebar-normal">来往资金</span>
                  </router-link>
                </li>
              </slot>
            </ul>
          </div>
        </collapse-transition>
      </div>
    </div>

    <!-- 消息相关 -->
    <div class="user">
      <div class="photo">
        <md-icon class="sidebarIcon">person</md-icon>
      </div>
      <div class="user-info">
        <a
          data-toggle="collapse"
          :aria-expanded="!message"
          @click.stop="toggleMenu('message')"
          @click.capture="clicked"
        >
          <span>通知消息<b class="caret"></b></span>
        </a>
        <collapse-transition>
          <div v-show="!message">
            <ul class="nav">
              <slot>
                <li>
                  <router-link :to="'/message'" :class="$route.name=='message'? 'mdui-menu-item':''">
                    <md-icon class="sidebarsecondicon">keyboard_arrow_right</md-icon>
                    <span class="sidebar-normal">下载MT4</span>
                  </router-link>
                </li>
              </slot>
            </ul>
            <ul class="nav">
              <slot>
                <li>
                  <router-link :to="'/message'" :class="$route.name=='message'? 'mdui-menu-item':''">
                    <md-icon class="sidebarsecondicon">keyboard_arrow_right</md-icon>
                    <span class="sidebar-normal">客服咨询</span>
                  </router-link>
                </li>
              </slot>
            </ul>
          </div>
        </collapse-transition>
      </div>
    </div>
    

  </div>

</template>
<script>
import { CollapseTransition } from "vue2-transitions";

export default {
  components: {
    CollapseTransition
  },
  props: {
    title: {
      type: String,
      default: "用户名"
    },
    rtlTitle: {
      type: String,
      default: "تانيا أندرو"
    },
    avatar: {
      type: String,
      default: "../../static/logos/meuntop.jpg"
    }
  },
  data() {
    return {
      user: true,
      money: true,
      trade: true,
      message: true,
      homepage:true,
      inmoney:true,
    };
  },
  methods: {
    clicked: function(e) {
      e.preventDefault();
    },
    toggleMenu: function(name) {
      this[name] = !this[name];
      // this.isClosed = !this.isClosed;
    }
  }
};
</script>
<style>
.collapsed {
  transition: opacity 1s;
}
.firstmeun{
  width: 34px;
  height: 34px;
  /* overflow: hidden; */
  float: left;
  z-index: 5;
  margin-right: 13px;
  /* border-radius: 50%; */
  margin-left: 23px;
}
.sidebarIcon{
  margin-top:5px
}
.sidebarsecondicon{
  margin-left:20px !important;
  margin-top: -2px !important;
}
.sidebar .nav i, .off-canvas-sidebar .nav i{
  margin-right: 0px !important;
}
.mdui-menu-item{
  background-color: rgb(76, 175, 80);
  /* opacity: 0.6; */
}

/* .sidebar-normal::before {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 20px;
  right: 0px;
  height: 2px;
  background-color: #E0FFFF;
  transform-origin: bottom right;
  transform: scaleX(0);
  transition: transform 0.8s ease;
} */

/* .sidebar-normal:hover::before {
  transform-origin: bottom left;
  transform: scaleX(1);
}  */

</style>
