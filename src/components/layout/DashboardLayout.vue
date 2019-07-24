<template>
  <div
    class="wrapper"
    :class="[
      { 'nav-open': $sidebar.showSidebar },
      { rtl: $route.meta.rtlActive }
    ]"
  >
    <notifications></notifications>
    <side-bar
      :active-color="sidebarBackground"
      :background-image="sidebarBackgroundImage"
      :data-background-color="sidebarBackgroundColor"
    >
      <user-menu></user-menu>
      <!-- <mobile-menu></mobile-menu> -->
      <template slot="links">
        <!-- 个人首页 -->
        <!-- <sidebar-item v-else :link="{ name: '个人首页', icon: 'account_box', path: '/dashboard' }"></sidebar-item> -->
        <!-- 团队首页 -->
        <!-- <sidebar-item else :link="{ name: '团队首页', icon: 'dashboard', path: '/dashboard2' }"></sidebar-item> -->

        <!-- 菜单列表 -->
        <sidebar-item
          v-for="item in mainMenuList"
          v-bind:key="item.permissionId"
          :link="{ name:item.text, icon: item.icon, path: '/'+item.text }"
        >
          <sidebar-item
            v-for="menu in item.childMenu"
            v-bind:key="menu.permissionId"
            :link="{ name: menu.text, path: '/'+item.text+'/'+menu.text }"
          >
            <sidebar-item
              v-for="menu2 in menu.child2Menu"
              v-bind:key="menu2.permissionId"
              :link="{ name: menu2.text, path: '/'+item.text+'/'+menu.text+'/'+menu2.text }"
            ></sidebar-item>
          </sidebar-item>
        </sidebar-item>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar class="top-navbar"></top-navbar>

      <!-- UI控制按钮 -->
      <!-- <fixed-plugin
        :color.sync="sidebarBackground"
        :colorBg.sync="sidebarBackgroundColor"
        :sidebarMini.sync="sidebarMini"
        :sidebarImg.sync="sidebarImg"
        :image.sync="sidebarBackgroundImage"
      ></fixed-plugin>-->

      <div class="content-margin-top" :class="{ content: !$route.meta.hideContent }" @click="toggleSidebar">
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </zoom-center-transition>
      </div>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import MobileMenu from "./Extra/MobileMenu.vue";
import FixedPlugin from "./FixedPlugin.vue";
import UserMenu from "./Extra/UserMenu.vue";
import { ZoomCenterTransition } from "vue2-transitions";

export default {
  components: {
    TopNavbar,
    ContentFooter,
    MobileMenu,
    FixedPlugin,
    UserMenu,
    ZoomCenterTransition
  },
  data() {
    return {
      sidebarBackgroundColor: "black",
      sidebarBackground: "green",
      sidebarBackgroundImage: "../../static/backgroud/sidebar.jpg",
      sidebarMini: true,
      sidebarImg: true,
      mainMenuList: []
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    },
    // 获取当前用户权限
    async getUserPermissions() {
      let request_data = {
        url: "permission/getUserPermissions",
        method: "GET",
        data: { ...this.loginform }
      };
      let that = this;
      const res = await this.$axios.get(request_data.url, {
        data: request_data.data
      });

      const permission = res.data.result.permissions;
      const mainMenu = permission.filter(menu => menu.type == 1);
      mainMenu.map(menu => {
        const childMenu = permission.filter(
          x => x.parentId == menu.permissionId && x.type == 2
        );
        menu.childMenu = childMenu;
        childMenu.map(menu2 => {
          const child2Menu = permission.filter(
            x => x.parentId == menu2.permissionId && x.type == 3
          );
          menu2.child2Menu = child2Menu;
          return menu;
        });
        return menu;
      });
      that.mainMenuList = mainMenu;
    }
  },
  mounted() {
    let docClasses = document.body.classList;
    let isWindows = navigator.platform.startsWith("Win");
    if (isWindows) {
      // if we are on windows OS we activate the perfectScrollbar function
      initScrollbar("sidebar");
      initScrollbar("sidebar-wrapper");
      initScrollbar("main-panel");
      docClasses.add("perfect-scrollbar-on");
    } else {
      docClasses.add("perfect-scrollbar-off");
    }
    // 获取当前用户权限
    // this.getUserPermissions();
    // 登录查询
    // if (!this.$store.state.userid) {
    //   this.$router.push('/login')
    // }
  },
  watch: {
    sidebarMini() {
      this.minimizeSidebar();
    }
  }
};
</script>
<style>
/* $scaleSize: 0.95; */
/* @keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
} */
.main-panel .zoomIn {
  animation-name: zoomIn95;
}
/* @keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
} */
.main-panel .zoomOut {
  animation-name: zoomOut95;
}

.content-margin-top{
  margin-top: 48px
}
</style>
