<template>
    <!-- 电子地图区域 -->
    <div class="mapContainer">
        <el-cascader
                class="areaSel"
                :show-all-levels="false"
                :options="areaList"
                size="mini"
                placeholder="请选择单位区域"
                v-model="selectAreaId"
                :props="{ checkStrictly: true }"
                @change="changeArea">
        </el-cascader>
        <!-- 单位地图缩放还原 -->
        <div id="scaleMap">
            <el-button
                    type="default"
                    icon="el-icon-zoom-in"
                    size="small"
                    title="放大"
                    circle
                    @click.native.prevent="plusBtn()"
            ></el-button>
            <el-button
                    type="default"
                    icon="el-icon-zoom-out"
                    size="small"
                    title="缩小"
                    circle
                    @click.native.prevent="minusBtn()"
            ></el-button>
            <el-button
                    type="default"
                    icon="el-icon-search"
                    size="small"
                    title="还原"
                    circle
                    @click.native.prevent="returnBtn()"
            ></el-button>
            <el-button
                    type="default"
                    icon="el-icon-s-home"
                    size="small"
                    title="单位主图"
                    circle
                    @click.native.prevent="homeBtn()"
            ></el-button>
        </div>
        <div id="mapContainer">
            <img id="mapPic" :src="imgSrc" draggable="false" @click="handelMarkFlag && handelAddMarks($event)" />
            <template v-if="initData.length!=0 && markLoad">
                <el-popover
                        v-for="(item,index) in initData" :key="index"
                        placement="right"
                        trigger="hover"
                        class="markPoints"
                        :class="[item.state?markState[item.state]:'offline',item.type]"
                        :style="{left:(item.x)/100*containW*bgRate+subLeftVal+'px',top:(item.y)/100*containH*bgRate+subTopVal+'px'}"
                >
                    <div slot="reference" class="img-box" @click="handelMarkFlag && getCurrentMarkData(item)">
                        <img :src="item.image?item.image:linkImg"/>
                    </div>
                    <div class="Hotspot_popup">
                        <div class="Hotspot_Title">{{item.name}}</div>
                        <div class="Hotspot_Message" v-html="item.content"></div>
                    </div>
                </el-popover>
            </template>
            <!--          单击添加标记点-->
            <div class="markPoints default" v-if="clickAdd" :style="clickAdd"></div>
        </div>

        <!--添加-编辑标记点弹窗-->
        <el-drawer
                :title="isAdd ? '添加标记信息':'编辑标记信息'"
                :visible.sync="showDialog"
                direction="rtl"
                width="70%"
                :before-close="cancelForm"
        >
            <el-form ref="digEquip" :model="digEquip" :rules="addRules" label-width="86px" size="small">
                <el-row>
                    <el-form-item label="设备名称" prop="typeName">
                        <el-cascader style="width: 100%"
                                     v-model="digEquip.typeName"
                                     :options="typeOptions"
                                     @change="handleSelType" :disabled="typeDisabled">
                            <template slot-scope="{ node, data }">
                                <span>{{ data.label }}</span>
                                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                            </template>
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="经度" prop="longitude" v-if="isEquip">
                        <label slot="label">经&nbsp;&nbsp;度</label>
                        <el-input v-model="digEquip.longitude" placeholder="设置经度" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="纬度" prop="latitude" v-if="isEquip">
                        <label slot="label">纬&nbsp;&nbsp;度</label>
                        <el-input v-model="digEquip.latitude" placeholder="设置纬度" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片" prop="fileList" v-if="uploadPic">
                        <el-input disabled v-model="digEquip.fileList.name" placeholder="上传文件类型为jpg、jpeg、png; 文件小于30M"/>
                        <el-button type="primary" @click="chooseImg" style="position: absolute;right: 0">上传文件</el-button>
                        <input type="file" id="upload_file" @change="getFile($event)" style="display:none">
                    </el-form-item>
                    <el-form-item label="图片预览" v-if="uploadPic && digEquip.fileList.url" style="text-align: left">
                        <img :src="digEquip.fileList.url" class="imgPreview"/>
                    </el-form-item>
                    <el-form-item label="水平坐标" prop="x">
                        <el-input v-model="digEquip.x" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="垂直坐标" prop="y">
                        <el-input v-model="digEquip.y" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="地图名称" prop="name" v-if="uploadPic">
                        <el-input v-model="digEquip.name"></el-input>
                    </el-form-item>
                    <el-form-item label="设备信息" prop="remark">
                        <el-input
                                type="textarea"
                                placeholder="请输入设备详细信息"
                                v-model="digEquip.remark"
                                maxlength="200"
                                rows="3"
                        ></el-input>
                    </el-form-item>
                    <el-form-item class="pull-right">
                        <el-button type="danger" size="small" v-if="!isAdd">删除</el-button>
                        <el-button type="warning" size="small" v-if="isEquip" @click="setLngLat">设置经纬度</el-button>
                        <el-button type="warning" size="small" v-if="showBaiduMap" @click="toBaiiduMap">进入监控平台</el-button>
                        <!--                        <el-button type="warning" size="small" v-if="toImgChild">查看副图</el-button>-->
                        <!--          默认-->
                        <el-button type="default" size="small" @click="cancelForm()">取消</el-button>
                        <el-button type="primary" size="small" @click="submitForm()">确定</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
        </el-drawer>
        <!--    选择标记点经纬度-->
        <choose-area ref="baidu" @getMarkPosition="getMarkPosition" :unitArea="unitArea"></choose-area>
        <!--    选择保护单位范围-->
        <!--           <choose-area ref="baidu" :rangeFlag="rangeFlag"></choose-area>-->
    </div>
</template>
<script>
    import $ from "jquery";
    import getMarksList from "@i/jsondata/protect/mapList.js";
    // import { getMarksList } from "@/request/protect";
    import ChooseArea from "../ChooseArea/index";
    export default {
        name: "emapMain",
        components: {ChooseArea},
        props:{
            // 是否可以添加编辑标记点
            handelMarkFlag: {
                type: Boolean,
                default: true
            },
        },
        data() {
            const defaultForm = {
                typeName:'',
                x:'',
                y:'',
                remark:'',
            }
            return {
                // rangeFlag:true,
                linkImg:require('@/assets/img/link.png'),
                // ...... 添加-编辑标记点弹窗.......
                unitArea:[],
                showDialog:false,
                isAdd:true,
                // 设备类型禁用
                typeDisabled:false,
                // 上传图片
                // imgFileName:'',
                // 图片类型-上传图片-地图名称
                uploadPic:false,
                // 设备类型-经度-纬度-设置经纬度
                isEquip:false,
                // 编辑框且经纬度有值
                showBaiduMap:false,
                // toImgChild:false,
                defaultForm:defaultForm,
                digEquip:Object.assign({}, defaultForm),
                addRules: {
                    typeName: [{
                        required: true,
                        trigger: 'blur',
                    }],
                    name: [{
                        required: true,
                        trigger: 'blur',
                    }],
                },
                typeOptions:[],
                // .......地图标记点部分........
                markLoad:false,
                imgSrc: "",
                // 标记点信息初始化
                initData: [],
                markState: {
                    "0": "offline",
                    "1": "online",
                    "2": "fault",
                    "3": "warning"
                },
                hasPicture: false,
                enlarge: true,
                mouseCenter: true,
                mousePosition: {
                    isDrag: false,
                    x: 0,
                    y: 0
                },
                beginX: 0,
                beginY: 0,
                endX: 0,
                endY: 0,
                // 缩放速率
                rate: 0.2,
                // 鼠标当前位置
                mouse: {},
                offsetInit: {},
                // 图片原始宽高
                containW: 0,
                containH: 0,
                // 单位背景图偏移及缩放率
                subTopVal: 0,
                subLeftVal: 0,
                bgRate: 0,
                // 单击添加标记点
                clickAdd: null,
                selectAreaId:["1"],
                areaList:[
                    {
                        value: '2',
                        label: '八路军前方总部旧址',
                        children:[
                            {
                                value: '108',
                                label: '廉政教育展馆',
                            },
                            {
                                value: '107',
                                label: '朝鲜义勇军队院和反战同盟院',
                            },
                        ]
                    },
                    {
                        value: '12',
                        label: '南安寺塔',
                    }
                ],
            };
        },
        created() {
        },
        mounted() {
            this.changeArea();
        },
        methods: {
            // ...........添加-编辑标记点弹窗...........
            getMarkPosition(markPos){
                this.digEquip.longitude=markPos.lng;
                this.digEquip.latitude=markPos.lat;
                console.log("百度地图获取经纬度",this.digEquip)
            },
            toBaiiduMap(){
                console.log("进入监控平台")
            },
            chooseImg(){ // 唤起change事件
                $('#upload_file').click()
            },
            getFile(e){
                //获取并记录图片的base64编码
                const that=this;
                var reader = new FileReader();
                const imageFile=e.target.files[0];
                reader.readAsDataURL(imageFile); // 读出 base64
                reader.fileName = imageFile.name;
                reader.onloadend = function (e) {
                    that.digEquip.fileList={
                        name:this.fileName,
                        url:this.result,
                    };
                };
            },
            // 设置经纬度
            setLngLat(){
                this.$refs.baidu.baiDuDialog=true;
            },
            cancelForm(){
                this.showDialog=false;
                this.clickAdd = null;
            },
            submitForm() {
                const that=this;
                that.$refs.digEquip.validate((valid) => {
                    if (valid) {
                        // const getTypeName=that.digEquip.typeName;
                        // that.digEquip.type=getTypeName[0];
                        // if(that.digEquip.type!=='img'){
                        //     that.digEquip.name=getTypeName[getTypeName.length-1];
                        // }
                        console.log("提交的数据",that.digEquip)
                        // mapListSave(that.digEquip).then(response => {
                        // const response=mapListSave;
                        // if(response.type === "SUCCESS"){
                        //     that.showDialog=false;
                        //     that.$message({
                        //         type:'success',
                        //         message: '标注成功',
                        //         duration:1000
                        //     });
                        //     if(that.digEquip.type==='img'){
                        //         Bus.$emit('changeTree')
                        //     }
                        //     that.reduction()
                        //     Bus.$emit('initDataList')
                        // }else{
                        //     that.$message({
                        //         type:'error',
                        //         message: '标注失败',
                        //         duration:1000
                        //     });
                        // }
                        // })
                    } else {
                        return false;
                    }
                });
            },
            handleSelType(value) {
                const that=this;
                console.log("value",value)
                if(that.digEquip.typeName[0]==='img'){
                    that.uploadPic=true;
                    that.isEquip=false;
                    that.digEquip.fileList={name: '', url: ''}
                }else{
                    that.uploadPic=false;
                    that.isEquip=true;
                }
            },
            // ..............添加编辑标记点..........
            handelAddMarks(e) {
                const that = this;
                if (that.hasPicture) {
                    console.log("单击可添加标记点")
                    e = e || window.event;
                    // 判断执行拖拽还是单击事件
                    const flagDrag = that.isdrag(
                        that.beginX,
                        that.beginY,
                        that.endX,
                        that.endY
                    );
                    if (!flagDrag) {
                        // 标记点的定位
                        const leftX = e.offsetX || e.layerX;
                        const topY = e.offsetY || e.layerY;
                        const x = ((leftX / (that.bgRate * that.containW)) * 100).toFixed(4);
                        const y = ((topY / (that.bgRate * that.containH)) * 100).toFixed(4);
                        // 添加标记点
                        that.clickAdd = {
                            left: leftX + that.subLeftVal + "px",
                            top: topY + that.subTopVal + "px"
                        };
                        const item={
                            x:x,
                            y:y,
                        }
                        that.isAdd=true;
                        that.showDialog=true;
                        that.typeDisabled=false;
                        that.uploadPic=false;
                        that.isEquip=false;
                        that.digEquip = Object.assign(that.defaultForm, item);
                        console.log("that.digEquip",that.digEquip)
                    }
                }
            },
            getCurrentMarkData(item) {
                const that=this;
                that.isAdd=false;
                that.showDialog=true;
                that.typeDisabled=true;
                // 对编辑框赋值
                that.digEquip=item;
                const initItem={
                    typeName:item.typeName,
                    x:item.x,
                    y:item.y,
                    remark:item.remark,
                };
                let editItem={}
                if(item.type==='img'){
                    that.uploadPic=true;
                    that.isEquip=false;
                    editItem={
                        fileList:item.fileList
                    };
                }else{
                    that.uploadPic=false;
                    if(item.type==='equip'){
                        // 设备
                        that.isEquip=true;
                        if(item.longitude!=null && item.latitude!='' && item.longitude!=undefined){
                            that.showBaiduMap=true;
                        }else{
                            that.showBaiduMap=false;
                        }
                        editItem={
                            longitude:item.longitude,
                            latitude:item.latitude,
                        };
                    }else{
                        // 传感器
                        that.isEquip=false;
                    }
                }
                that.digEquip = Object.assign(initItem, editItem)
            },
            // .......地图标记点部分........
            changeArea() {
                const that = this;
                // const params = {
                //     selectAreaId: this.selectAreaId,
                // };
                // getMarksList(params).then(res => {
                that.initData = getMarksList.initData;
                that.typeOptions = getMarksList.editData;
                if(this.selectAreaId.length==1){
                    this.unitArea=getMarksList.area;
                }
                // });
                that.hasPicture = getMarksList.hasPicture;
                that.initData.sort(this.sortId);
                that.markLoad = false;
                that.imgSrc ="http://47.93.31.210:9082/hyfcms/private/protect/map/getImage?id=2";
                that.sureImgSize(that.imgSrc);
            },
            // 区分拖动还是单击
            isdrag(x1, y1, x2, y2) {
                if (Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) <= 1) {
                    return false;
                }
                return true;
            },
            // 缩放及拖拽
            isDragEvent() {
                const that = this;
                /* 图片缩放 */
                const objImg = $("#mapPic");
                objImg.bind("mousewheel", function(event, delta) {
                    if (delta > 0) {
                        that.enlarge = true;
                        that.mouseCenter = true;
                        that.scale(that.enlarge, that.mouseCenter);
                    } else {
                        that.enlarge = false;
                        that.mouseCenter = true;
                        that.scale(that.enlarge, that.mouseCenter);
                    }
                    return false;
                });
                // 初始化拖动监听器
                objImg.mousedown(function(e) {
                    const offset = $(this).offset();
                    that.mousePosition.x = -offset.left + e.pageX;
                    that.mousePosition.y = -offset.top + e.pageY;
                    that.mousePosition.isDrag = true;
                    that.beginX = e.clientX;
                    that.beginY = e.clientY;
                });
                objImg.mouseup(function(e) {
                    that.mousePosition.isDrag = false;
                    that.endX = e.clientX;
                    that.endY = e.clientY;
                });
                objImg.mouseleave(function() {
                    that.mousePosition.isDrag = false;
                });
                objImg.mousemove(function(e) {
                    if (that.mousePosition.isDrag) {
                        // 图片拖动
                        // x>0向右移动，y>0向下移动
                        objImg.offset({
                            top: e.pageY - that.mousePosition.y,
                            left: e.pageX - that.mousePosition.x
                        });
                        that.initOffset();
                    }
                    that.mouse.x = e.pageX;
                    that.mouse.y = e.pageY;
                });
            },
            plusBtn() {
                const that = this;
                that.enlarge = true;
                that.mouseCenter = false;
                that.scale(that.enlarge, that.mouseCenter);
            },
            minusBtn() {
                const that = this;
                that.enlarge = false;
                that.mouseCenter = false;
                that.scale(that.enlarge, that.mouseCenter);
            },
            returnBtn() {
                const that = this;
                const imageDom = $("#mapPic");
                imageDom.height(that.containH);
                imageDom.width(that.containW);
                imageDom.offset(that.offsetInit);
                that.initOffset();
            },
            homeBtn() {},
            // 容器宽高比与盒子宽高比比较确定图片宽高
            sureImgSize(imgSrc) {
                const that = this;
                const mapContainer = $("#mapContainer");
                const boxWidth = mapContainer.width();
                const boxHeight = mapContainer.height();
                const scaleBox = boxWidth / boxHeight;
                const imgObj = $("#mapPic");
                this.loadImageAsync(imgSrc).then(function(scalePic) {
                    that.markLoad=true;
                    if (scalePic > scaleBox) {
                        imgObj.css({"width": boxWidth + "px", "height": "auto"})
                    } else {
                        imgObj.css({"height": boxHeight + "px", "width": "auto"})
                    }
                    that.containW = imgObj.width();
                    that.containH = imgObj.height();
                    that.offsetInit = imgObj.offset();
                    that.initOffset();
                    that.isDragEvent();
                });
            },
            // 图片缩放及重新定位
            scale(enlarge, mouseCenter) {
                const that = this;
                const rate = that.rate;
                const objImg = $("#mapPic");
                const offset = objImg.offset();
                // 获取当前图片宽高
                const h0 = objImg.height();
                const w0 = objImg.width();
                let top = 0;
                let left = 0;
                const scale_rate = w0 / that.containW;
                /* 控制图片缩放比在1-10之间 */
                /* enlarge 判断是放大还是缩小*/
                if (enlarge && scale_rate <= 10) {
                    top = offset.top - (h0 * rate) / 2;
                    left = offset.left - (w0 * rate) / 2;
                    objImg.height(h0 * (1 + rate));
                    objImg.width(w0 * (1 + rate));
                } else if (scale_rate > 1) {
                    top = offset.top + (h0 * rate) / 2;
                    left = offset.left + (w0 * rate) / 2;
                    objImg.height(h0 * (1 - rate));
                    objImg.width(w0 * (1 - rate));
                } else {
                    return false;
                }
                if (mouseCenter) {
                    objImg.offset({
                        top:
                            that.mouse.y - (objImg.height() * (that.mouse.y - offset.top)) / h0,
                        left:
                            that.mouse.x - (objImg.width() * (that.mouse.x - offset.left)) / w0
                    });
                } else {
                    objImg.offset({
                        top: top,
                        left: left
                    });
                }
                that.initOffset();
            },
            // 标记点定位更新
            initOffset() {
                const that = this;
                // 背景图片偏移差及缩放
                const imageDom = $("#mapPic");
                const boxDom = $("#mapContainer");
                const subTopVal = imageDom.offset().top - boxDom.offset().top;
                const subLeftVal = imageDom.offset().left - boxDom.offset().left;
                const bgRate = imageDom.width() / that.containW;
                that.subTopVal = subTopVal;
                that.subLeftVal = subLeftVal;
                that.bgRate = bgRate;
            },
            // 升降序
            sortId(b, a) {
                return a.x - b.x;
            },
            // 图片初始加载获取宽-高-宽高比
            loadImageAsync(imgSrc) {
                const that=this;
                return new Promise(function(resolve, reject) {
                    that.markLoad=false;
                    let oImg = new Image();
                    oImg.onload = function() {
                        const picWidth = oImg.width;
                        const picHeight = oImg.height;
                        const scalePic = picWidth / picHeight;
                        resolve(scalePic);
                    };
                    oImg.src = imgSrc;
                });
            }
        }
    };
</script>
<style scoped lang="scss" type="text/scss">
    .mapContainer {
        position: relative;
        width:100%;
        height: 100%;
        border:1px solid #918b8b;
        box-shadow: 1px 1px 6px -2px #d0d0d0;
        img{
            max-width: none!important
        }
        #mapContainer{
            height:100%;
            width:100%;
            box-sizing: border-box;
            overflow: hidden;
        }
        #scaleMap{
            position:absolute;
            right:20px;
            top:20px;
            width:50px;
            z-index:999;
            button{
                text-align: right;
                margin-bottom:15px;
                background: #F1F1F1;
                border: 1px solid #D2D2D2;
            }
        }
        .areaSel{
            position:absolute;
            right:80px;
            top:20px;
            width:160px;
            z-index:999;
        }
    }
    /*上传图片*/
    .imgPreview{
        height: 100px;
        border-radius: 4px
    }
</style>
