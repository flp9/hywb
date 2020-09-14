<template>
  <div class="aside-block">
    <div class="aside-container">
      <el-menu
        class="aside-menu"
        background-color="#2b312c"
        :default-active="defaultActive"
        text-color="#fff"
        router
        active-text-color="#ffd04b">
        <div v-for="(menu, index) in menuList" :key="index">
          <el-submenu :index="menu.path" v-if="menu.children">
            <template slot="title">
              <i :class="menu.icon"></i>
              <span>{{menu.permissionName}}</span>
            </template>
            <el-menu-item-group v-for="(item, item_ids) in menu.children" :key="item_ids">
              <el-menu-item :index="item.path">{{item.permissionName}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-else :index="menu.path">
            <i :class="menu.icon"></i>
            {{menu.permissionName}}
          </el-menu-item>
        </div>
      </el-menu>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  components: {},
  data() {
    return {
      menuList: []
    };
  },
  computed: {
    defaultActive() {
      return this.$route.path
    },
    sysMenuList() {
      return this.$store.getters.sidebar.sysMenuList;
    },
    userMenuList() {
      return this.$store.getters.sidebar.userMenuList;
    },
  },
  watch: {
    $route(to,from){
      this.selectMenu();
    }
  },
  methods: {
    selectMenu() {
      let self = this;
      if(self.$route.meta.type==='sys'){
        self.menuList = JSON.parse(localStorage.getItem('sysMenuList'));
      }else if(self.$route.meta.type==='user'){
        self.menuList = JSON.parse(localStorage.getItem('userMenuList'));
      }
    }
  },
  created() {
    this.selectMenu();
  },
  mounted() {
    this.selectMenu();
  }
};
</script>
<style lang='scss' scoped>
.aside-container {
  padding-top: 60px;
}
.aside-menu {
  width: 200px;
  text-align: left;
  border-right: none;
}
</style>