<template>
  <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    :tree-props="{children: 'children', hasChildren: !'hasChildren'}"
    @selection-change="SelectionChange"
  >
    <template v-for="(item, index) in dataFormat">
      <el-table-column v-if="item.type" :type="item.type" :key="index"
        :width="item.width==undefined?'auto':item.width"
        :label="item.label"
      ></el-table-column>
      <el-table-column v-if="!item.type" :key="index" :width="item.width" 
                      :label="item.label">
        <template slot-scope="scope">
          <span v-if="item.cate==='text'">
            <span>{{scope.row[item.prop]}}</span>
          </span>
          <div v-else-if="item.cate==='handle'">
            <el-button
              v-for="(btn,index) in item.btnList"
              :key="index"
              type="text"
              size="mini"
              :class="btn.className"
              @click="submit(btn.title,scope.row, btn.action)"
            >{{btn.label}}</el-button>
          </div>
          <div v-else-if="item.cate==='switch'">
            <el-switch
              v-model="scope.row[item.prop]"
              disabled
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </div>
          <div v-else-if="item.cate==='btnList'">
            <el-button
              v-for="(btn,index) in scope.row[item.prop]"
              :key="index"
              size="mini"
              style="margin:3px"
            >{{btn}}</el-button>
          </div>
        </template>
      </el-table-column>
    </template>

    <!-- <el-table-column prop="unitName" label="机构名称" width="300"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
    <el-table-column prop="createUser" label="登记人" width="180"></el-table-column>
    <el-table-column prop="updateTime" label="登记时间" width="180"></el-table-column>-->
  </el-table>
</template>
<script>
export default {
  components: {},
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    dataFormat: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      multipleSelection: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    SelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection, "this.multipleSelection");
      this.$emit('SelectionChange', this.multipleSelection);
    },
    submit(title, form, action) {
      this.$emit(action, title,form);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='scss' scoped></style>