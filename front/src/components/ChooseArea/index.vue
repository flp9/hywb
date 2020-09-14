<template>
  <div class="el-dialog__wrapper f-mask" v-show="baiDuDialog" style="z-index: 6000">
    <div class="f-dialog modal-content" style='width:80%;z-index: 6001;height: calc(100% - 100px)'>
      <div class="f-dialog-header">
        <el-row>
          <el-col :span="6">
            <el-input v-model="setArea" placeholder="搜索定位" suffix-icon="el-icon-search" size="small" id="setAreaId"></el-input>
          </el-col>
          <el-col :span="14" :offset="4" class="pull-right">
            <span class='text-danger' style='margin-right:20px;font-weight:bold'>
              <b v-if="rangeFlag">单击鼠标右键结束保护单位范围选择</b>
              <b v-if="markFlag"> 请点击位置以选取经纬度</b>
            </span>
            <el-button type="default" size="small" @click="closeBaiDu">取消</el-button>
<!--            <el-button type="default" size="small" @click="clearAll" v-if="rangeFlag">清除所有覆盖物</el-button>-->
            <el-button type="primary"  size="small" @click="sureArea">确认选择</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="f-dialog-body dialog-body-form" style="height: calc(100% - 80px)">
        <baidu-map
          v-if="rangeFlag"
          style="height:100%"
          :center="pointCenter"
          :zoom="zoom"
          @ready="handler"
          :map-click="false"
          @mousemove="syncPolygon"
          @click="paintPolygon"
          @rightclick="newPolygon"
        >
          <bm-polygon
            :path="path"
            v-for="(path,index) of polygonPath.paths"
            :key="index"
            stroke-color="blue"
            :fill-opacity="0.8"
            :stroke-opacity="0.5"
            :stroke-weight="2"
            @click="alertpath"
          />
          <bm-control>
            <button @click="toggle('polygonPath')">{{ polygonPath.editing ? '停止绘制' : '开始绘制' }}</button>
          </bm-control>
        </baidu-map>

        <baidu-map
          v-if="markFlag"
          style="height:100%"
          :center="pointCenter"
          :zoom="zoom"
          @ready="handler"
          @click="getClickInfo"
        >
        </baidu-map>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "choose-area",
    props:{
      rangeFlag: {
        type: Boolean,
        default: false,
      },
      markFlag: {
        type: Boolean,
        default: true,
      },
      unitArea: {
        type: Array,
        default: ()=>[],
      },
    },
    data(){
      return {
        // 地图初始化,默认地图中心点石家庄
        pointCenter: { lng: 114.449485, lat: 38.031488 },
        zoom: 15,
        map:null,
        BMap:null,
        // 初始覆盖物
        polyline:[],
        // 绘制多边形
        polygonPath: {
          editing: false,
          paths: [] // 绘制完成后的经纬度，其实是在画的时候动态push的，因为在点击的时候触发了 paintPolygon 函数
        },

        // 选择标记点数据
        markPosition:{},
        // 即时搜索经纬度
        userLocation:{
          lng:"",
          lat:"",
        },
        // 即时搜索详细地址
        address_detail: null, //详细地址
        setArea:'',
        // 父组件传值
        baiDuDialog:false,
      }
    },
    created(){

    },
    mounted() {
      this.$nextTick(function(){
        var timer = setTimeout(() => {
          this.mapInit(this.unitArea);
        }, 500);
      })
    },
    methods:{
      handler ({BMap, map}) {
        this.map=map;
        this.BMap=BMap;
        // 滚轮缩放地图
        map.enableScrollWheelZoom(true)
        console.log("地图初始化")
      },
      mapInit(protectUnitArea){
        console.log("单位地图数据",protectUnitArea)
        const that=this;
        const map=that.map;
        // 搜索定位
        that.areaSearch();
        // that.clearAll();
        if(protectUnitArea.length!==0){
          let lng=0;
          let lat=0;
          const len=protectUnitArea.length;
          let marksArr=[];
          for(let x in protectUnitArea){
            lng+=protectUnitArea[x].lng;
            lat+=protectUnitArea[x].lat;
            marksArr.push(new BMap.Point(protectUnitArea[x].lng, protectUnitArea[x].lat))
          }
          // 有地图范围时重新定位地图中心点并绘制多边形
          const point = new BMap.Point(lng/len,lat/len)
          map.centerAndZoom(point,15);
          that.polyline = new BMap.Polyline(marksArr, {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.8});
          map.addOverlay(that.polyline)
        }
      },
      getClickInfo (e) {
        const map=this.map;
        this.clearAll();
        this.markPosition = e.point;
        map.addOverlay(this.polyline);
        const marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat));
        map.addOverlay(marker);
      },
      // 绘制保护单位范围多边形
      // 开启多边形绘制
      toggle(name) {
        this[name].editing = !this[name].editing;     // 在这里做一步判断，如果有路径且开启绘制就把原来的路径清空
        if (this.polygonPath.paths && this.polygonPath.editing) {
          this.polygonPath.paths = [];
          this.clearAll();
        }
      },
      // 鼠标移动时
      syncPolygon(e) {
        if (!this.polygonPath.editing) {
          return
        }
        const {paths} = this.polygonPath
        if (!paths.length) {
          return
        }
        const path = paths[paths.length - 1]
        if (!path.length) {
          return
        }
        if (path.length === 1) {
          path.push(e.point)
        }
        this.$set(path, path.length - 1, e.point)
      },
      // 鼠标左键点击时往路径里push一个点
      newPolygon(e) {
        if (!this.polygonPath.editing) {
          return
        }
        // 当开始绘制后把按钮调回开始绘制状态，防止绘制多个图形
        this['polygonPath'].editing = !this['polygonPath'].editing
        const {paths} = this.polygonPath
        if (!paths.length) {
          paths.push([])
        }
        const path = paths[paths.length - 1]
        path.pop()
        if (path.length) {
          paths.push([])
        }
      },
      // 鼠标右键多边形绘制完成
      paintPolygon(e) {
        if (!this.polygonPath.editing) {
          return
        }
        const {paths} = this.polygonPath
        !paths.length && paths.push([])
        paths[paths.length - 1].push(e.point)
      },
      alertpath(e) {
        // 打印绘制范围数据
        console.log("打印绘制范围数据1",e.currentTarget.zo)
        console.log("打印绘制范围数据2",JSON.stringify(this.polygonPath.paths[0]))
      },
      clearAll(){
        this.map.clearOverlays() // 清除地图上所有覆盖物
        this.markPosition={};
      },
      // 即时搜索和精确定位
      areaSearch(){
        const that=this;
        const BMap=that.BMap;
        let ac = new BMap.Autocomplete( // 建立一个自动完成的对象
          {
            'input': 'setAreaId',
            'location': that.map
          });
        ac.addEventListener('onconfirm', function(e) { // 鼠标点击下拉列表后的事件
          let _value = e.item.value //获取点击的条目
          const myValue = _value.province + _value.city + _value.district + _value.street + _value.business //地址拼接赋给一个变量
          // 获取详细地址
          that.address_detail = myValue;
          console.log("即使搜索详细地址",that.address_detail)
          that.clearAll();
          that.searchAddMark();
        })
      },
      searchAddMark(){
        const that=this;
        const map=that.map;
        function myFun() {
          that.userlocation = local.getResults().getPoi(0).point // 获取第一个智能搜索的结果
          map.centerAndZoom(that.userlocation, 18)
          map.addOverlay(that.polyline);
          map.addOverlay(new BMap.Marker(that.userlocation)) // 添加标注
        }
        var local = new BMap.LocalSearch(map, { // 智能搜索
          onSearchComplete: myFun
        })
        local.search(that.address_detail)
      },
      setLngLat(){
        const that=this;
        that.baiDuDialog=true;
      },
      sureArea(){
        // 选择标记点
        if(this.markFlag){
          if(Object.keys(this.markPosition).length == 0){
            this.$message.error('请单击地图选取经纬度!');
          }else{
            this.baiDuDialog=false;
            this.$emit("getMarkPosition",this.markPosition)
            this.clearAll();
          }
        }
        // 选择范围
        if(this.rangeFlag){
          const range=this.polygonPath.paths[0];
          if(range!==undefined){
            this.baiDuDialog=false;
            this.$emit("changeArea",range)
            this.clearAll();
            console.log("提交的值",range)
          }else{
            this.$message.error('请圈出保护单位范围！');
          }
        }

      },
      closeBaiDu(){
        this.baiDuDialog=false;
        this.clearAll();
      },
    }
  }
</script>

<style>
  .tangram-suggestion {
    z-index: 9999;
    background-color: rgba(0,0,0,0.3);
  }
</style>
