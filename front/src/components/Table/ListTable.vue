<template>
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    row-key="id"
    :tree-props="{children: 'children', hasChildren: !'hasChildren'}"
    @selection-change="SelectionChange">
  >
    <template v-for="(item, index) in dataFormat">
      <el-table-column
        v-if="item.type"
        :type="item.type"
        :key="index"
        :width="item.width==undefined?'auto':item.width"
        :label="item.label"
      ></el-table-column>
      <el-table-column
        v-if="!item.type"
        :type="item.type ? item.type: ''"
        :key="index"
        :label="item.label ? item.label : ''"
        :width="item.width"
      >
        <template v-if="!item.type" slot-scope="scope">
          <div v-if="item.cate==='text'">{{scope.row[item.prop]}}</div>
          <div v-else-if="item.cate==='switch'">
            <el-switch
              v-model="scope.row[item.prop]"
              disabled
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </div>
          <div v-else-if="item.cate==='handle'">
            <el-button
              v-for="(btn,index) in item.btnList"
              :key="index"
              type="text"
              size="mini"
              :class="btn.className"
              @click="submit(scope.row, btn.action)"
            >{{btn.label}}</el-button>
          </div>
        </template>
      </el-table-column>
    </template>
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
      multipleSelection: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    SelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection, "this.multipleSelection");
    },
    submit(form, action) {
      this.$emit(action, form);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='scss' scoped></style>