<template>
  <el-row>
    <el-col class="bor-bottom-1 text-left wel-head" :span="12" :offset="6">网站导航</el-col>
    <el-col :span="12" :offset="6">
      <el-col :span="8" v-for="(item, index) in navigationList" :key="index">
            <div class="img-label pointer" @click="toPath(item.path)" :style="'background-image:url('+ item.url +')'">
                <i :class="item.icon"></i>{{item.title}}
            </div>
      </el-col>
    </el-col>
  </el-row>
</template>
<script>
export default {
  components: {},
  data() {
    return {
        navigationList:[
            {
                path: '/monitoring/map',
                url: '',
                icon: 'el-icon-view',
                title: '地图监控',
            },
            {
                path: '/monitoring/device',
                url: '',
                icon: 'el-icon-view',
                title: '设备监控',
            },
            {
                path: '/alarm/info',
                url: '',
                icon: 'el-icon-view',
                title: '报警信息',
            },
            {
                path: '/alarm/type',
                url: '',
                icon: 'el-icon-view',
                title: '报警类型',
            },
            {
                path: '/history',
                url: '',
                icon: 'el-icon-view',
                title: '历史数据2',
            },
            {
                path: '/doc',
                url: '',
                icon: 'el-icon-view',
                title: '文档管理',
            },
        ],
    }
  },
  computed: {},
  watch: {},
  methods: {
      toPath(path) {
          if(path){
              this.$router.push(path)
          }
      }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='scss' scoped>
.bor-bottom-1 {
  border-bottom: #dcdfe6 solid 1px;
  padding: 1rem;
}
.img-label {
    height: 150px;
    width: 150px;
    line-height: 150px;
    text-align: center;
    background-size: 100% 100%;
    margin: 1rem auto;
    background-color: #ededed;
    border-radius: 50% 50% 50% 50%;
    // color: #FFFFFF;
}
.wel-head {
    font-size: 24px;
    color: #b5afa8;
}
</style>