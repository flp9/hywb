<template>
  <div>
    <!-- 树形表格 -->
    <ListTable :tableData="tableData" :dataFormat="dataFormat" 
               @Edit="Edit" @Delete="Delete"/>
    <!-- <el-table
      :data="tableData"
      class="treeTableStyle"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: !'hasChildren'}"
    >
      <el-table-column prop="permissionName" label="菜单名称" width="280"></el-table-column>
      <el-table-column prop="uri" label="地址" width="180"></el-table-column>
      <el-table-column prop="permission" label="权限标识" width="180"></el-table-column>
      <el-table-column prop="buttonName" label="按钮权限">
        <template slot-scope="scope">
          <el-button
            v-for="(item, ids) in scope.row.buttonName"
            :key="ids"
            plain
            size="mini"
          >{{item}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isShow" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column width="100">
        <template slot="header">
          <div>操作</div>
        </template>
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="Edit(scope.row)">编辑</el-button>
          <el-button
            type="text"
            size="mini"
            class="danger"
            @click="Delete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table> -->
    <!-- 编辑框 -->
    <el-drawer
      custom-class="drawerStyle"
      :title="formFlag.title"
      :visible.sync="formFlag.status"
      direction="rtl"
      width="70%"
      append-to-body
    >
      <template>
        <el-row>
          <el-col class="drawer-body pad-10">
            <el-form label-position="left" label-width="80px" :model="editForm">
              <el-form-item label="上级菜单">
                <el-cascader
                  :show-all-levels="false"
                  v-model="editForm.parentId"
                  :props="defaultProps"
                  placeholder="不选择默认为顶级机构"
                  :options="tableData"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="菜单名称">
                <el-input v-model="editForm.permissionName" placeholder="请输入菜单名称"></el-input>
              </el-form-item>
              <el-form-item label="英文名称">
                <el-input v-model="editForm.aliasName" placeholder="请输入英文名称"></el-input>
              </el-form-item>
              <el-form-item label="菜单介绍">
                <el-input v-model="editForm.description" placeholder="请输入菜单介绍"></el-input>
              </el-form-item>
              <el-form-item label="URL">
                <el-input v-model="editForm.uri" placeholder="请输入URL"></el-input>
              </el-form-item>
              <el-form-item label="权限标识">
                <el-input v-model="editForm.permission" placeholder="请输入权限标识"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-input v-model="editForm.icon" placeholder="请输入图标名称"></el-input>
              </el-form-item>
              <el-form-item label="按钮权限">
                <el-select
                  v-model="editForm.buttonName"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择或输入按钮名称"
                >
                  <el-option
                    v-for="item in btnOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否启用">
                <el-switch
                  v-model="editForm.isEnabled"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm(editForm)">提交</el-button>
                <el-button>重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </div>
</template>
<script>
import ListTable from "@c/Table/treeTable.vue";
import {
  queryPowerTree,
  deletePower,
  updatePower,
  addPower
} from "@/request/sys/sysPower";
export default {
  components: { ListTable },
  data() {
    return {
      tableData: [],
      formFlag: {
        title: "编辑机构",
        status: false
      },
      defaultProps: {
        children: "children",
        label: "permissionName",
        value: "id",
        checkStrictly: true,
        emitPath: false
      },
      editForm: {},
      btnOptions: [],
      dataFormat: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    Edit(title,row) {
      let self = this;
      self.editForm = JSON.parse(JSON.stringify(row));
      self.formFlag.status = true;
    },
    Delete(title, row) {
      console.log(title, row)
      let self = this;
      let postData = new FormData();
      postData.append("ids", row.id);
      self
        .$confirm("此操作将永久删除该菜单及菜单下的子目录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          deletePower(postData).then(res => {
            self.getAllMenuList();
            self.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {});
    },
    submitForm(data) {
      let self = this;
      updatePower(data).then(res => {
        if (res.data.resultCode === 200) {
          self.$message({
            message: "修改成功",
            type: "success"
          });
          self.getAllMenuList();
          self.formFlag.status = false;
        }
      });
    },
    getAllMenuList() {
      let self = this;
      queryPowerTree().then(res => {
        self.tableData = res.data.data;
        self.dataFormat = res.data.dataFormat;
      });
    }
  },
  created() {
    this.getAllMenuList();
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
.bor-bom {
  border-bottom: 1px solid #d6cece;
}
</style>