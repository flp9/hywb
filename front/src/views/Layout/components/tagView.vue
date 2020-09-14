<template>
  <div class="tag-block" v-if="aliveList.length">
     <el-tag
        class="tag-style"
        v-for="(item, index) in aliveList"
        :key="index"
        :type="item.title===$route.meta.title ? 'primary' : 'info'"
        closable
        @close="removeAlive(item, index)"
        @click="toAlive(item)"
        effect="dark">
        {{ item.title }}
      </el-tag>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      'aliveList': 'keepAliveList'
    })
  },
  watch: {},
  methods: {
    removeAlive(data,index) {
      let self = this;
      this.$store.dispatch('Remove_alive', data);
    },
    toAlive(data) {
      this.$router.push(data.path)
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='scss' scoped>
.tag-block {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #efefef;
    padding: 10px 0 10px 0 !important;
    margin-top: 0px !important;
}
.tag-style {
    margin-left: 10px;
    cursor: pointer;
}
</style>