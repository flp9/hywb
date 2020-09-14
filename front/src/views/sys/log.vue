<template>
  <el-container>
    <el-main class="main-container">
      <el-col class="pad-bom-30">
        <ListTable :tableData="tableData" :dataFormat="dataFormat" />
      </el-col>
      <el-pagination
        class="pageBottom"
        @size-change="SizeChange"
        @current-change="CurrentChange"
        :current-page="page.current"
        :page-sizes="page.pageSizes"
        :page-size="page.paseSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </el-main>
  </el-container>
</template>
<script>
import { getSystemLog } from "@/request/sys/unit.js";
import ListTable from "@c/Table/treeTable.vue";
export default {
  components: { ListTable },
  data() {
    return {
      dataFormat: [],
      tableData: [],
      multipleSelection: [],
      page: {
        current: 1,
        pageSizes: [10, 20, 30, 40],
        paseSize: 10,
        total: 0
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    SizeChange(val) {
      this.page.paseSize = val;
      this.getPageLogList();
    },
    CurrentChange(val) {
      this.page.current = val;
      this.getPageLogList();
    },
    NodeClick(data) {},
    SelectionChange(val) {
      this.multipleSelection = val;
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    Edit(index, row) {},
    Delete(index, row) {},
    getPageLogList() {
      let self = this;
      let postData = {
        curPage: self.page.current,
        pagesize: self.page.paseSize
      };
      console.log(postData);
      getSystemLog(postData).then(res => {
        console.log(res, "getSystemLog");
        self.tableData = res.data.data.items;
        self.page.total = res.data.data.total;
        self.page.current = res.data.data.pageNum;
        self.page.paseSize = res.data.data.pageSize;
        self.dataFormat = res.data.data.dataFormat;
      });
    }
  },
  created() {
    this.getPageLogList();
  },
  mounted() {}
};
</script>
<style lang='scss' scoped></style>