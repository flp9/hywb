<template>
  <div>
    <el-col class="topBar text-left">
      <el-button type="primary" size="small" @click="Edit('添加保护单位')">添加保护单位</el-button>
      <el-input size="small" placeholder="所属机构" v-model="affiliate" clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-select size="small" clearable v-model="selProUnit" placeholder="请选择保护单位">
        <el-option
          v-for="item in proUnitList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col>
      <ListTable :tableData="tableData" :dataFormat="dataFormat" @Edit="Edit" @Delete="Delete" />
    </el-col>
    <el-col>
      <el-pagination
      @size-change="SizeChange"
      @current-change="CurrentChange"
      class="pageBottom"
      :current-page="page.current"
      :page-sizes="page.pageSizes"
      :page-size="page.paseSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    ></el-pagination>
    </el-col>
    <!-- 编辑弹窗 -->
    <el-drawer
      custom-class="drawerStyle"
      :title="formFlag.title"
      :visible.sync="formFlag.status"
      direction="rtl"
      width="70%"
      append-to-body
    >
      <el-form
        class="drawerForm"
        label-position="left"
        label-width="100px"
        ref="editForm"
        :model="editForm"
      >
        <el-form-item label="保护单位名称">
          <el-input v-model="editForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="所属机构">
          <el-input v-model="editForm.unitName" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="保护单位描述">
          <el-input v-model="editForm.description" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="保护单位地址" v-if="formFlag.title==='新建用户'">
          <el-input v-model="editForm.address" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formFlag.title,editForm)">提交</el-button>
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import ListTable from "@c/Table/treeTable.vue";
import initData from "@i/jsondata/protect/unitInfo.js";
export default {
  components: { ListTable },
  data() {
    return {
      unitList: [],
      defaultProps: {
        children: "children",
        label: "unitName"
      },
      editForm: {},
      formFlag: {
        title: "编辑人员",
        status: false
      },
      tableData: [],
      dataFormat: [],
      multipleSelection: [],
      affiliate: '',
      selProUnit:'',
      proUnitList: [],
      page: {
        current: 1,
        pageSizes: [10, 20, 30, 40],
        pageSize: 10,
        total: 0,
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    SizeChange(val) {
      console.log(`每页数量为 ${val} 条`);
      // this.getUserListForPage();
    },
    CurrentChange(val) {
      console.log(`当前页数为 ${val} 页`);
      // this.getUserListForPage();
    },
    submitForm(title, form) {
      let self = this;
      if (title === "新建人员") {
        addUser(form).then(res => {
          if (res.data.resultCode === 200) {
            self.$message({
              type: "success",
              message: "添加成功!"
            });
          }
        });
      } else if (title === "更新人员") {
        updateUser(form).then(res => {
          if (res.data.resultCode === 200) {
            self.$message({
              type: "success",
              message: "更新成功!"
            });
          }
        });
      }
      this.getUserListForPage();
      self.formFlag.status = false;
    },
    resetForm() {},
    NodeClick(data) {
      let self = this;
      self.getUserListForPage();
    },
    SelectionChange(val) {
      this.multipleSelection = val;
    },
    Edit(title, row) {
      console.log(title, row);
      let self = this;
      self.formFlag.title = title;
      if (title === "新建人员") {
        self.editForm = {
          name: "",
          unitName: "",
          description: "",
          address: "",
          rePwd: "",
          isEnabled: false
        };
      } else if (title === "更新人员") {
        self.editForm = {
          id: row.id,
          name: row.name,
          unitName: row.unitName,
          description: row.description,
          isEnabled: row.isEnabled
        };
      }
      self.formFlag.status = true;
    },
    Delete(index, row) {
      let self = this;
      self
        .$confirm("此操作将永久删除该人员, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          self.$message({
            type: "info",
            message: "假装删除"
          });
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    initData() {
      this.tableData = initData.data;
      this.dataFormat = initData.dataFormat;
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "warning-row";
      } else {
        return "success-row";
      }
    }
  },
  created() {
    this.initData();
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
.left-tree {
  height: 100vh;
  overflow: hidden;
  background-color: #e7e7e7;
}
.tree-header {
  padding: 10px;
  font-size: 18px;
  background-color: #e7e7e7;
}
.topBar {
  height: 45px;
  line-height: 45px;
  padding-left: 5px;
  border-bottom: 1px solid #dbdbdb;
  .el-input {
    width: 180px;
    margin-left: 10px;
  }
  .el-select {
    width: 180px;
    margin-left: 10px;
  }
}
</style>