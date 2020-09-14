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
    <el-main class="main-container">
      <el-col class="personBar text-left">
        <el-button type="primary" size="small" @click="Edit('新建角色')">新建用户</el-button>
        <el-button type="danger" size="small" @click="Delete(idsSeletion)">批量删除</el-button>
      </el-col>
      <el-col>
        <ListTable
          :tableData="tableData"
          :dataFormat="dataFormat"
          @Edit="Edit"
          @Delete="Delete"
          @Power="Power"
          @SelectionChange="SelectionChange"
        />
        <!-- <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          :row-class-name="tableRowClassName"
          @selection-change="SelectionChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="roleName" label="名称" width="200"></el-table-column>
          <el-table-column prop="roleCode" label="标识" width="120"></el-table-column>
          <el-table-column prop="description" label="描述" show-overflow-tooltip></el-table-column>
          <el-table-column prop="isEnabled" label="是否启用" width="120">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.date" active-color="#ff4949" inactive-color="#13ce66"></el-switch>
            </template>
          </el-table-column>
          <el-table-column width="100">
            <template slot="header">
              <div>操作</div>
            </template>
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="Edit('更新角色', scope.row)">编辑</el-button>
              <el-button
                type="text"
                size="mini"
                class="warning"
                @click="Power(scope.$index, scope.row)"
              >权限</el-button>
            </template>
          </el-table-column>
        </el-table>-->
      </el-col>
      <!-- <el-pagination
        class="pageBottom"
        @size-change="SizeChange"
        @current-change="CurrentChange"
        :current-page="page.current"
        :page-sizes="page.pageSizes"
        :page-size="page.paseSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination> -->
      <!-- 编辑弹窗 -->
      <el-drawer
        custom-class="drawerStyle"
        :title="roleFormFlag.title"
        :visible.sync="roleFormFlag.status"
        direction="rtl"
        width="70%"
        append-to-body
      >
        <template v-if="roleFormFlag.drawerType==='edit'">
          <el-form
            class="drawerForm"
            label-position="left"
            label-width="80px"
            ref="editForm"
            :model="editForm"
          >
            <el-form-item label="所属机构">
              <el-cascader
                :show-all-levels="false"
                v-model="editForm.parentId"
                size="small"
                :props="unitProps"
                :options="unitList"
                placeholder="不选择默认为顶级机构"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="角色名称">
              <el-input v-model="editForm.roleName" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="权限标识">
              <el-input v-model="editForm.roleCode" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item label="角色描述">
              <el-input v-model="editForm.description" placeholder="请输入角色描述"></el-input>
            </el-form-item>
            <el-form-item label="是否启用">
              <el-switch
                v-model="editForm.isEnabled"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(roleFormFlag.title,editForm)">提交</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-form>
        </template>
        <template v-if="roleFormFlag.drawerType==='menuPower'">
          <el-row>
            <el-col>
              <el-tree
                style="background-color: #e3e9ea;"
                ref="roleTree"
                :data="rolePowerList"
                node-key="id"
                :props="roleProps"
                show-checkbox
                :check-strictly="true"
              >
                <el-col class="custom-tree-node" slot-scope="{ node, data }">
                  <el-col :span="12">{{ node.label }}</el-col>
                  <el-col :span="12">描述：{{ data.description }}</el-col>
                </el-col>
              </el-tree>
            </el-col>
            <el-col class="drawBtn">
              <el-button type="primary" size="small" @click="updateRolePower">完成</el-button>
            </el-col>
          </el-row>
        </template>
      </el-drawer>
    </el-main>
  </el-container>
</template>
<script>
import { queryAllUnitList } from "@/request/sys/unit.js";
import {
  queryAllUser,
  queryUserFoUnit,
  addUser,
  deleteUser,
  updateUser,
  getUserRole
} from "@/request/sys/role.js";
import { queryPowerTree } from "@/request/sys/sysPower.js";
import { editUserRole } from "@/request/sys/roleManage.js";
import ListTable from "@c/Table/treeTable.vue";
export default {
  components: { ListTable },
  data() {
    return {
      // page: {
      //   current: 1,
      //   pageSizes: [10, 20, 30, 40],
      //   paseSize: 10,
      //   total: 100
      // },
      unitList: [],
      defaultProps: {
        children: "children",
        label: "unitName"
      },
      unitProps: {
        children: "children",
        label: "unitName",
        value: "id",
        checkStrictly: true,
        emitPath: false
      },
      roleFormFlag: {
        title: "新建人员",
        status: false,
        drawerType: "edit"
      },
      rolePowerList: [],
      roleProps: {
        children: "children",
        label: "permissionName"
      },
      editForm: {},
      tableData: [],
      idsSeletion: [],
      dataFormat: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    SizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    CurrentChange(val) {
      console.log(`当前页: ${val}`);
      console.log(this.page);
    },
    NodeClick(data) {},
    SelectionChange(val) {
      console.log(val, "111SelectionChange");
      this.idsSeletion = val;
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    Edit(title, row) {
      let self = this;
      self.roleFormFlag.title = title;
      self.roleFormFlag.drawerType = "edit";
      if (title === "新建角色") {
        self.editForm = {
          aliasName: "",
          description: "",
          id: "",
          isDeleted: false,
          isEnabled: true,
          location: 0,
          roleCode: "",
          roleName: "",
          unitId: ""
        };
      } else if (title === "更新角色") {
        self.editForm = row;
      }
      self.roleFormFlag.status = true;
    },
    updateRolePower() {
      let that = this;
      let roleList = that.$refs.roleTree.getCheckedNodes();
      let postData = new FormData();
      for (let i of roleList) {
        postData.append("permissionIds", i.id);
      }
      postData.append("roleId", that.roleId);
      editUserRole(postData).then(res => {
        that.$message({
          message: "修改成功",
          type: "success"
        });
      });
      self.roleFormFlag.status = false;
    },
    submitForm(title, form) {
      let self = this;
      if (title === "新建角色") {
        addUser(form).then(res => {
          if (res.data.resultCode === 200) {
            self.getAllUser();
            self.$message({
              type: "success",
              message: "添加成功!"
            });
          }
        });
      } else if (title === "更新角色") {
        updateUser(form).then(res => {
          if (res.data.resultCode === 200) {
            self.getAllUser();
            self.$message({
              type: "success",
              message: "更新成功!"
            });
          }
        });
      }
      self.roleFormFlag.status = false;
    },
    Delete(ids) {
      let self = this;
      if (ids.length < 1) {
        self.$message({
          type: "warning",
          message: "请选择想删除的角色"
        });
        return;
      }
      let postData = new FormData();
      for (let item of ids) {
        postData.append("ids", item.id);
      }
      self
        .$confirm("此操作将永久删除选中角色, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          deleteUser(postData).then(res => {
            if (res.data.resultCode) {
              self.getAllUser();
              self.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(() => {});
    },
    Power(title, row) {
      let self = this;
      self.roleFormFlag.drawerType = "menuPower";
      self.roleFormFlag.title = title;
      self.selUserRole(row.id);
      self.roleFormFlag.status = true;
    },
    getAllUnitList() {
      let self = this;
      queryAllUnitList().then(res => {
        this.unitList = res.data.data;
      });
    },
    getAllUser() {
      let self = this;
      queryAllUser().then(res => {
        this.tableData = res.data.data;
        this.dataFormat = res.data.dataFormat;
      });
    },
    getPowerTree(id) {
      let that = this;
      queryPowerTree().then(res => {
        that.rolePowerList = res.data.data;
      });
    },
    selUserRole(id) {
      let that = this;
      getUserRole(id).then(res => {
        that.$refs.roleTree.setCheckedNodes(res.data.data);
      });
    }
  },
  created() {
    this.getPowerTree();
    this.getAllUnitList();
    this.getAllUser();
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
.left-tree {
  height: calc(100% - 40px);
  overflow: hidden;
  background-color: #e7e7e7;
}
.tree-header {
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  font-size: 18px;
  background-color: #e7e7e7;
}
.personBar {
  height: 45px;
  line-height: 44px;
  padding-left: 5px;
  border-bottom: 1px solid #dbdbdb;
}
.drawBtn {
  padding: 10px;
}
</style>