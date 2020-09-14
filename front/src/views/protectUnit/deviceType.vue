<template>
  <ListTable :tableData="tableData" :dataFormat="dataFormat" @Edit="Edit" @Delete="Delete" />
</template>
<script>
import ListTable from "@c/Table/treeTable.vue";
import initData from "@i/jsondata/sys/unitData.js";
export default {
  components: { ListTable },
  data() {
    return {
      tableData: [],
      dataFormat: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    Delete(data) {
      console.log(data);
    },
    Edit(data) {
      console.log(data);
    },
    initData() {
      this.tableData = initData.data;
      this.dataFormat = initData.dataFormat;
    }
  },
  created() {
    this.initData();
  },
  mounted() {}
};
</script>
<style lang='scss' scoped></style>