<template>
  <div>
    <el-form autoComplete="on" :model="modelForm" :rules="formRules" ref="modelForm"
             label-position="right" label-width="100px" size="small">
      <el-form-item v-for="(item,index) in formItem" :key="index" :prop="item.prop" :label="item.label">
        <el-cascader
          v-if="item.type==='cascade'"
          :options="cascadeArr"
          :props="item.casProps"
          v-model="modelForm[item.prop]" :placeholder="item.placeholder">
        </el-cascader>
        <el-switch v-else-if="item.type==='switch'"
                   v-model="modelForm[item.prop]"
                   active-color="#13ce66"
                   inactive-color="#ff4949">
        </el-switch>
<!--        上传图片文件-->
        <template v-else-if="item.type==='imageFile'">
          <el-input disabled v-model="imgFileName" :placeholder="item.placeholder"/>
          <el-button type="primary" @click="chooseImg" style="position: absolute;right: 0">上传文件</el-button>
          <input type="file" id="upload_file" @change="getFile($event)" style="display:none">
        </template>
<!--        预览图片-->
        <template v-else-if="item.type==='imgPreview'">
          <img :src="modelForm[item.prop]" class="imgPreview"/>
        </template>
<!--        单位地图范围-->
        <template v-else-if="item.type==='baiDuMap'">
<!--          <el-input v-model="protectUnitArea" style="display: none"/>-->
          <el-input  disabled :placeholder="protectUnitArea.length==0?item.placeholder:'已选择保护单位！'"/>
          <el-button type="primary" @click="chooseArea" style="position: absolute;right: 0">选择范围</el-button>
        </template>

        <el-input v-else :name="item.prop" clearable type="text" v-model="modelForm[item.prop]" autoComplete="on"
                  :placeholder="item.placeholder"/>
      </el-form-item>
      <slot name="btnGroup"></slot>
<!--      <el-form-item class="pull-right">-->
<!--        <el-button type="primary" @click.native.prevent="submitForm">确 定</el-button>-->
<!--        <el-button @click="resertForm">取 消</el-button>-->
<!--      </el-form-item>-->
    </el-form>

<!--    选择保护单位范围-->
    <choose-area ref="baidu" @changeArea="getArea" :markFlag="markFlag" :rangeFlag="rangeFlag"></choose-area>
  </div>
</template>

<script>
    import ChooseArea from "../ChooseArea/index";
    export default {
        name: "v-form",
      props:{
        modelForm: {
          type: Object,
          default: {},
        },
        formRules: {
          type: Object,
          default: {},
        },
        formItem: {
          type:Array,
          default:()=>[]
        },
        imgFileName:{
          type:String,
          default:""
        },
        protectUnitArea:{
          type:Array,
          default:()=>[]
        },
        cascadeArr:{
          type:Array,
          default:()=>[]
        },
      },
      components: {ChooseArea},
      data(){
        return {
          // 判断是百度地图保护单位范围还是百度地图上标记点
          rangeFlag:true,
          markFlag:false,
          // 保护单位范围弹窗
          baiDuDialog:false,
        }
      },
      created() {
      },
      methods:{
        chooseImg(){ // 唤起change事件
          $('#upload_file').click()
        },
        chooseArea(){
          const that=this;
          that.$refs.baidu.baiDuDialog=true;
          that.$refs.baidu.showMap(that.protectUnitArea);
          // if(that.protectUnitArea.length!==0){
          //   that.$refs.baidu.protectUnitArea=that.protectUnitArea;
          // }
          // 选择保护单位范围
          // 编辑保护单位范围
        },
        getArea(unitArea){
          this.$parent.protectUnitArea=unitArea;
        },
        getFile(e){
          this.$emit('getFile',e)
          // this.imageFile=e.target.files[0];
          // this.imgFileName=this.imageFile.name;
          // console.log("file",this.imageFile)
        },
        resertForm(){
          // this.formDialog=false;
          // this.$refs.modelForm.resetFields();
        },
        submitForm(){

        }
      }
    }
</script>

<style>
  /*上传图片*/
  .imgPreview{
    height: 100px;
    border-radius: 4px
  }
  .el-form-item__content:has(.imgPreview){
    border: 1px solid red;
    line-height: 0!important;
  }
  .el-form-item__content{

  }
</style>
