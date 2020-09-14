<template>
  <div>
    <div class="pull-left topBar">
      <el-button @click="openEdit('添加机构')" type="primary" size="small">新增机构</el-button>
    </div>
    <!-- 树形表格 -->
    <ListTable :tableData="tableData" :dataFormat="dataFormat"
                 @Edit="openEdit" @Delete="Delete" />
    <!-- <el-table
      :data="tableData"
      class="treeTableStyle"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: !'hasChildren'}"
    >
      <el-table-column prop="unitName" label="机构名称" width="280"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="createUser" label="登记人" width="180"></el-table-column>
      <el-table-column prop="updateTime" label="登记时间" sortable width="180"></el-table-column>
      <el-table-column width="100">
        <template slot="header">
          <div>操作</div>
        </template>
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="openEdit('编辑机构', scope.row)">编辑</el-button>
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
      <el-form
        class="drawerForm"
        label-position="left"
        label-width="80px"
        ref="editForm"
        :model="editForm"
      >
        <el-form-item label="上级机构">
          <el-cascader
            :show-all-levels="false"
            v-model="editForm.parentId"
            size="small"
            :props="defaultProps"
            :options="tableData"
            placeholder="不选择默认为顶级机构"
            @change="selUnit"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="editForm.unitName" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="机构地址">
          <el-input v-model="editForm.address" placeholder="请输入机构地址"></el-input>
        </el-form-item>
        <el-form-item label="机构编码">
          <el-input v-model="editForm.unitCode" placeholder="请输入机构编码"></el-input>
        </el-form-item>
        <el-form-item label="机构简介">
          <el-input v-model="editForm.description" placeholder="请输入机构简介"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="editForm.telephone" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="电子邮件">
          <el-input v-model="editForm.email" placeholder="请输入电子邮件"></el-input>
        </el-form-item>
        <el-form-item label="网站地址">
          <el-input v-model="editForm.website" placeholder="请输入网站地址"></el-input>
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
import {
  queryAllUnitList,
  updateUnitDetail,
  addUnit,
  deleteUnitList
} from "@/request/sys/unit.js";
import ListTable from "@c/Table/treeTable.vue";
export default {
  components: { ListTable },
  data() {
    return {
      tableData: [],
      dataFormat: [],
      formFlag: {
        title: "编辑机构",
        status: false
      },
      editForm: {
        name: "",
        address: ""
      },
      defaultProps: {
        children: "children",
        label: "unitName",
        value: "id",
        checkStrictly: true,
        emitPath: false
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    openEdit(title, row) {
      let self = this;
      if (title === "添加机构") {
        self.editForm = {
          createTime: null,
          createUser: "",
          updateTime: "",
          updateUser: null,
          isDeleted: null,
          id: "",
          parentId: "",
          unitName: "",
          aliasName: null,
          unitCode: "",
          description: "",
          address: "",
          telephone: "",
          email: "",
          website: "",
          location: null,
          children: [],
          parentName: ""
        };
      } else if (title === "编辑机构") {
        console.log(row , '编辑机构')
        self.editForm = row;
      }
      self.formFlag.title = title;
      self.formFlag.status = true;
    },
    Delete(title,row) {
      let self = this;
      self.$confirm('此操作将永久删除该机构, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUnitList(row.id).then(res => {
            if(res.data.resultCode === 200) {
              self.getAllUnitList()
              self.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else{
              self.$message({
                type: 'warning',
                message: '操作异常!'
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
    submitForm(title, form) {
      console.log(title, form);
      let self = this;
      if (title === "添加机构") {
        addUnit(form).then(res => {
            self.getAllUnitList()
            self.$message({
              type: 'success',
              message: '添加成功!'
            });
          })
      } else if (title === "编辑机构") {
        updateUnitDetail(form).then(res => {
            self.getAllUnitList()
            self.$message({
              type: 'success',
              message: '更新成功!'
            });
          })
      }
      self.formFlag.status = false;
      self.editForm = {};
    },
    getAllUnitList() {
      let self = this;
      queryAllUnitList().then(res => {
        this.tableData = res.data.data;
        this.dataFormat = res.data.dataFormat;
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    selUnit(data) {
    }
  },
  created() {
    this.getAllUnitList();
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
.bor-bom {
  border-bottom: 1px solid #d6cece;
}
</style>