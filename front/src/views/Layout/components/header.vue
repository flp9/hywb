<template>
  <div>
      <div class="pull-left">
        <i class="font-24 el-icon-s-grid pointer" @click="home"></i>
        文化遗址安全防护一体化智慧平台
      </div>
      <div class="pull-right mar-r-2">
        <i class="el-icon-switch-button pointer" @click="loginOut"></i>
      </div>
      <el-dropdown class="pull-right mar-r-2" @command="routerChange">
        <i class="el-icon-user-solid user-setting pointer"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="setting">系统设置</el-dropdown-item>
          <el-dropdown-item command="user">个人中心</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    routerChange(type) {
      let self = this;
      switch (type) {
        case 'setting':
          self.$router.push('/sys')
          break;
        case 'user':
          self.$message({
            type: 'warning',
            message: '暂未开通',
          })
          break;
        default:
          break;
      }
    },
    home() {
      if(this.$route.path === '/welcome') {
        return;
      }
      this.$router.push('/welcome')
    },
    loginOut() {
      this.$router.push('/')
    },
    changeAside(){
      this.$store.dispatch('Change_status');
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='scss' scoped>
.user-setting {
  font-size: 24px;
  color: white;
  height: 60px;
  line-height: 60px;
}
.font-24 {
  font-size: 24px;
}
</style>