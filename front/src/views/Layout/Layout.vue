<template>
<el-container>head-block
  <el-header class=""><Header /></el-header>
  <el-container class="container-box">
    <el-aside v-show="asideStatus" class="aside-block"><Aside /></el-aside>
    <el-container>
      <TagView class="tagView-box" />
      <el-main class="main-container"><Container style="height: 100%;box-sizing: border-box"/></el-main>
      <el-footer class="footer-box"><Footer /></el-footer>
    </el-container>
  </el-container>
</el-container>
</template>
<script>
import Container from "./components/container";
import Header from "./components/header";
import Footer from "./components/footer";
import Aside from "./components/aside";
import TagView from "./components/tagView";
export default {
  components: {
    Container,
    Header,
    Footer,
    Aside,
    TagView
  },
  data() {
    return {
    };
  },
  computed: {
    asideStatus() {
      // return this.$store.getter
      return this.$store.getters.sidebar.status;
    }
  },
  watch: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang='scss' scoped>
.head-block {
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 24px;
  color: #FFFFFF;
  background-color: #4B94DF;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
}
.container-box {
  position: absolute;
  width: 100%;
  top: 60px;
  left: 0;
  bottom: 0;
}
.aside-block {
  width: 200px !important;
  height: 100%;
  background-color: #2b312c;
}
.tagView-box {
  margin-top: 13px;
  border-bottom: 1px solid #bbafaf;
}
</style>
