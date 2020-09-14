<template>
  <el-container style="height: 100%">
    <el-aside class="text-left" style="width:250px;height: 100%">
      <header class="tree-header">
        <i class="el-icon-setting"></i> 组织机构
      </header>
      <el-tree
        class="left-tree"
        node-key="id"
        :data="unitList"
        :highlight-current="true"
        :props="defaultProps"
        @node-click="NodeClick"
      ></el-tree>
    </el-aside>
    <el-main class="main-container" style="width: 100%">
        <el-col class="topBar text-left">
          <el-button type="primary" size="small" @click="Edit('新建人员')">新建人员</el-button>
          <el-button type="danger" size="small">批量删除</el-button>
        </el-col>
        <el-col>
          <ListTable :tableData="tableData" :dataFormat="dataFormat"
                  @Edit="Edit" @Delete="Delete" />
        </el-col>
          <el-pagination
            @size-change="SizeChange"
            @current-change="CurrentChange"
            class="pageBottom"
            :current-page="page.current"
            :page-sizes="page.pageSizes"
            :page-size="page.paseSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total">
          </el-pagination>
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
        label-width="80px"
        ref="editForm"
        :model="editForm"
      >
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="editForm.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="密码" v-if="formFlag.title==='新建用户'">
          <el-input v-model="editForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" v-if="formFlag.title==='新建用户'">
          <el-input v-model="editForm.rePwd" placeholder="请再输入一次密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="是否禁用">
          <el-switch
                v-model="editForm.isEnabled"
                active-color="#ff4949"
                inactive-color="#13ce66"
              ></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formFlag.title,editForm)">提交</el-button>
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    </el-main>
  </el-container>
</template>
<script>
import ListTable from "@c/Table/treeTable.vue";
import { queryAllUnitList } from "@/request/sys/unit.js";
import {
  queryUserList,
  queryAllUser,
  addUser,
  deleteUser,
  updateUser
} from "@/request/sys/person.js";
export default {
  components: { ListTable },
  data() {
    return {
      dataFormat: [],
      unitList: [],
      defaultProps: {
        children: "children",
        label: "unitName"
      },
      page: {
        current: 1,
        pageSizes: [10, 20, 30, 40],
        pageSize: 10,
        total: 0,
      },
      editForm: {},
      formFlag: {
        title: "编辑人员",
        status: false
      },
      tableData: [],
      multipleSelection: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    SizeChange(val) {
      this.getUserListForPage();
    },
    CurrentChange(val) {
      this.getUserListForPage();
    },
    submitForm(title, form) {
      let self = this;
      if(title === "新建人员"){
        addUser(form).then(res => {
          if(res.data.resultCode === 200){
            this.getUserListForPage();
            self.$message({
              type: 'success',
              message: '添加成功!'
            });
          }
        })
      }else if(title === "更新人员") {
        updateUser(form).then(res => {
          if(res.data.resultCode === 200){
            this.getUserListForPage();
            self.$message({
              type: 'success',
              message: '更新成功!'
            });
          }
        })
      }
      
      self.formFlag.status = false;
    },
    resetForm() {

    },
    NodeClick(data) {
      let self = this;
      self.getUserListForPage();
    },
    SelectionChange(val) {
      this.multipleSelection = val;
    },
    Edit(title, row) {
      let self = this;
      self.formFlag.title = title;
      if(title === "新建人员"){
        self.editForm = {
          username: "",
          nickname: "",
          email: "",
          password: "",
          rePwd: "",
          isEnabled: false
        }
      }else if(title === "更新人员") {
        self.editForm = {
          id: row.id,
          username: row.username,
          nickname: row.nickname,
          email: row.email,
          isEnabled: row.isEnabled,
        };
      }
      self.formFlag.status = true;
    },
    Delete(index, row) {
      let self = this;
      self.$confirm('此操作将永久删除该人员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUser(row.id).then(res => {
            if(res.data.resultCode){
              this.getUserListForPage();
              self.$message({
              type: 'success',
              message: '删除成功!'
            });
            }
          })
        }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    getAllUnitList() {
      let self = this;
      queryAllUnitList().then(res => {
        this.unitList = res.data.data;
      });
    },
    getUserListForPage() {
      let self = this;
      let postData = {
        pageNum: self.page.current,
        pageSize: self.page.pageSize,
        name: '',
      }
      let result = queryUserList(postData);
      result.then(res => {
        self.page.current = res.data.data.pageNum;
        self.page.total = res.data.data.total;
        self.page.pageSize = res.data.data.pageSize;
        self.tableData = res.data.data.items;
        self.dataFormat = res.data.data.dataFormat;
        self.$forceUpdate();
      });
    },
    queryAllUser() {
      let self = this;
      let result = queryAllUser();
      result.then(res => {
        self.tableData = res.data.data;
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
  },
  created() {
    this.getUserListForPage();
    this.getAllUnitList();
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
.left-tree {
  height: calc(100% - 44px);
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
  line-height: 44px;
  padding-left: 5px;
  border-bottom: 1px solid #dbdbdb;
}
</style>
