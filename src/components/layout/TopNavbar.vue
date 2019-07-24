<template>
  <div class="top-fixed">
    <md-toolbar
      style="position:fixed:max-width:100%"
      md-elevation="0"
      class="md-transparent top-bar md-fixed-top"
      :class="{
        'md-toolbar-absolute md-white md-fixed-top': $route.meta.navbarAbsolute
      }">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <!-- <h3 class="md-title">{{ $config.ROUTERINFO[$route.name] }}</h3> -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/personalIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: item.route }" v-for="(item,key) in $config.MEUNLIST[$route.name]" :key="key">{{item.label}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="md-toolbar-section-end">
          <md-button
            class="md-just-icon md-round md-simple md-toolbar-toggle"
            :class="{ toggled: $sidebar.showSidebar }"
            @click="toggleSidebar"
          >
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </md-button>

          <div class="md-collapse">
            <!-- 搜索... -->
            <div>
              <!-- <md-autocomplete v-model="selectedCountry" :md-options="countries">
                <label>Country</label>
              </md-autocomplete>
              <md-autocomplete class="search" v-model="selectedEmployee" :md-options="employees">
                <label v-if="$route.meta.rtlActive">بحث...</label>
                <label v-else>搜索...</label>
              </md-autocomplete> -->
              <md-field>
                <label for="routename">快速导航</label>
                <md-select v-model="routename">
                  <md-option v-for="(val,key) in routeInfo" :value="key" :key="val">{{val}}</md-option>
                </md-select>
              </md-field>
            </div>

            <md-list>
              <!-- 1.主页按钮 -->
              <!-- <md-list-item href="#/">
                <i class="material-icons">dashboard</i>
                <p class="hidden-lg hidden-md">Dashboard</p>
              </md-list-item>
              <li class="md-list-item">
                <a href="#" class="md-list-item-router md-list-item-container md-button-clean dropdown">
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <i class="material-icons">dashboard</i>
                      <md-button
                        slot="title"
                        class="md-primary md-sm md-round md-simple"
                        data-toggle="dropdown"
                      >
                        <i class="material-icons">arrow_drop_down</i>切换
                      </md-button>
                      <ul class="dropdown-menu dropdown-menu-right">
                        <li><a href="#/">个人首页</a></li>
                        <li><a href="#/团队首页">团队首页</a></li>
                        <li><a href="#/lock">锁屏</a></li>
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li>-->

              <!-- 2.用户名 -->
              <li class="md-list-item">
                <a
                  href="#"
                  class="md-list-item-router md-list-item-container md-button-clean dropdown"
                >
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button
                        slot="title"
                        class="md-success md-sm md-round"
                        data-toggle="dropdown"
                      >
                        昵称:{{this.$store.state.chineseName}}
                        <p class="hidden-lg hidden-md">Notifications</p>
                      </md-button>
                      <ul class="dropdown-menu dropdown-menu-right">
                        <li>
                          <router-link :to="'/修改密码/'+ this.$store.state.userid">修改密码</router-link>
                        </li>
                        <li>
                          <router-link :to="'/查看用户/'+ this.$store.state.userid">个人信息</router-link>
                        </li>
                        <li>
                          <router-link :to="'/修改用户/'+ this.$store.state.userid">修改信息</router-link>
                        </li>
                        <li>
                          <a href="#">我的银行卡</a>
                        </li>
                        <li>
                          <a href="#">留言列表</a>
                        </li>
                        <li>
                          <a href="#/login">注销</a>
                        </li>
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li>

              <!-- 3.中英切换 -->
              <!-- <li class="md-list-item">
                <a
                  href="#"
                  class="md-list-item-router md-list-item-container md-button-clean dropdown"
                >
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button slot="title" class="md-info md-sm md-round" data-toggle="dropdown">
                        中文
                        <p class="hidden-lg hidden-md">Notifications</p>
                      </md-button>
                      <ul class="dropdown-menu dropdown-menu-right">
                        <li>
                          <a href="#">中文</a>
                        </li>
                        <li>
                          <a href="#">English</a>
                        </li>
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li> -->

              <!-- 4.用户头像 -->
              <md-list-item href="#/pages/user">
                <i class="material-icons">person</i>
                <p class="hidden-lg hidden-md">Profile</p>
              </md-list-item>
            </md-list>
          </div>
        </div>
      </div>
    </md-toolbar>
  </div>
</template>

<script>
import { DropDown } from "vue2-transitions";
export default {
  data() {
    return {
      routeInfo: this.$config.ROUTERINFO,
      routename: null
    };
  },
  watch:{
    routename: function(val){
      if(this.routeInfo[val]){
         this.$router.push({name:val})
      }
    }
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    },

    // 1.获取用户信息
    // getusersinfo() {
    //   console.log("获取用户信息",this.$route.params.id)
    //   let request_data = {
    //     url: "users/info",
    //     method: "GET",
    //     data: { login:1 },
    //   };
    //   let that = this;
    //   request(request_data).then(res => {
    //     console.log(res.data.result,'获取用户信息成功')
    //     this.mainlist = res.data.result.user
    //     console.log(this.mainlist)
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // },
  }
  // created() {
  //   this.getusersinfo()
  // }
};
</script>

<style lang="scss" >
.md-title {
  font-weight: bolder !important;
}
.changedashboard {
  width: 50px !important;
}
.md-toolbar .md-collapse {
  justify-content: center;
  width:100%;
}
.md-toolbar.md-transparent.top-bar{
  background-color: #E6E6E6 !important;
  position: fixed !important;
}
.top-fixed{
  // position: fixed !important;
}

</style>