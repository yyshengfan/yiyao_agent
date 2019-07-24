<template>
  <div class="sidebar admiSidebar">
    <nav class="sidebar-nav">
      <ul class="nav">
        <template v-for="(nav,index) in navList">
          <li
            class="nav-item"
            style="user-select: none;"
            :class="{'nav-dropdown':nav.children && nav.children.length>0,'open':nav.selected,'active':nav.active}"
          >
            <a
              class="nav-link"
              :class="{'nav-dropdown-toggle':nav.children && nav.children.length>0}"
              @click="navHandler(nav,index)"
            >
              <!-- <i class="fa fa-line-chart"></i> -->
              <i class="fa" :class="nav.icon"></i>
              {{nav.text}}
              <!--<img :src="nav.icon" style="margin-right: 14px;">{{nav.text}}-->
            </a>
            <ul v-if="nav.children && nav.children.length>0" class="nav-dropdown-items">
              <template v-for="(i,index) in nav.children">
                <li class="nav-item closeSide" :class="{'active':i.active}">
                  <a class="nav-link" @click="subNavHandler(i)">
                    <img :src="i.icon" style="margin-right: 14px;margin-left: 20px">
                    {{i.text}}
                    <!--i class="fa" :class="i.icon"></i>{{i.text}}-->
                  </a>
                </li>
              </template>
            </ul>
          </li>
        </template>
      </ul>
    </nav>
    <button class="sidebar-minimizer brand-minimizer" type="button" @click="onlyCoin"></button>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  computed: {
    navList() {
      return this.$store.getters["navList/data"];
    }
  },
  data() {
    return {
      activeClick: 0
    };
  },
  mounted() {
    if (this.$store.state.isMobile) {
      document.body.classList.toggle("sidebar-hidden");
    }
    // this.subNavHandler('1',this.$route.name)
    // this.$router.push({name: this.$store.getters['navList/activeTab'](this.$route.name)})
  },
  watch: {},
  methods: {
    //点击侧边栏仅展示图标方法
    onlyCoin() {
      document.body.classList.toggle("brand-minimized");
      document.body.classList.toggle("sidebar-minimized");
    },
    //点击关闭侧边栏
    closeSide() {
      document.body.classList.toggle("sidebar-hidden");
    },
    //点击子菜单
    subNavHandler(nav, name) {
      var routeName = nav == "1" ? name : nav.name;
      if (this.$store.state.isMobile) {
        this.closeSide();
      }
      if (this.$store.getters["navList/activeTab"](routeName)) {
        this.$router.push({
          name: this.$store.getters["navList/activeTab"](routeName)
        });
      } else {
        if (this.$store.getters["navList/activeNav"] != routeName) {
          this.$router.push({
            name:
              this.$store.getters["navList/activeTab"](routeName) || routeName
          });
        } else {
          this.$router.push({ name: nav.name });
          this.activeClick++;
        }
      }
    },
    // Dropdown Menu    侧边栏展开下拉
    navHandler(nav, m) {
      if (nav.children && nav.children.length > 0) {
        this.navList.forEach(function(cc, index) {
          if (index != m) {
            cc.selected = false;
          } else {
            cc.selected = !cc.selected;
          }
        });
      } else {
        if (this.$store.state.isMobile) {
          this.closeSide();
        }
        this.$router.push({
          name: this.$store.getters["navList/activeTab"](nav.name) || nav.name
        });
      }
    }
  }
};
</script>
<style>
</style>
