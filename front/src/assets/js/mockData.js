const Mock = require('mockjs');
const sideBar = require('../jsondata/sys/sidebarData');
// 。。。。。。。。。。。。。。。
const getMapNaviJson = require('../jsondata/protect/getMapNavi');
const getMarksListJson = require('../jsondata/protect/getMarksList');
// const unitTreeList = require('../jsondata/protect/getMarksList0');
const mapSave = require('../jsondata/protect/mapSave');

// ----------------------------系统设置mock数据引入开始------------

const unitTreeList = require('../jsondata/sys/unitData');
const personData = require('../jsondata/sys/personData');
const roleData = require('../jsondata/sys/roleData');
const menuData = require('../jsondata/sys/menuData');
const logData = require('../jsondata/sys/logData');
const rolePower = require('../jsondata/sys/rolePower');
// ----------------------------系统设置mock数据引入结束------------

// ----------------------------地图数据mock----------------------- 
const getMarksList = {
    url: '/api/getMarks',
    method: 'post',
    data: Mock.mock(getMarksListJson)
}
const getMapNavi = {
    url: '/api/getMapNavi',
    method: 'post',
    data: Mock.mock(getMapNaviJson)
}
const mapListSave = {
    url: '/api/mapSave',
    method: 'post',
    data: Mock.mock(mapSave)
}

// 系统登录及侧边菜单
const userLogin = {
    url: '/sysUser/login',
    method: 'post',
    data: Mock.mock({
        "resultCode": 200,
        "resultMsg": "操作成功",
        "data": {
            "tokenHead": "hysz",
            "expiration": "14400",
            "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE1OTA2MzA1NDAyMzgsImV4cCI6MTU5MDY0NDk0MH0.9IlYhRBq6Zz4AJ_-BleQiwmtrs07C_ANmqCpln7rOT7ioNjN4f-Kqt7mh3bafrzC-Q5_hkwvFFRSuvTcTwf7ww"
        }
    })
}
const sideMenu = {
    url: '/api/sideBar',
    method: 'post',
    data: Mock.mock({
        "resultCode": 200,
        "resultMsg": "操作成功",
        "data": sideBar
    })
}

// 系统设置mock数据
const unit = [
    {   // 机构管理树形结构获取
        url: '/sysUnit/tree',
        method: 'get',
        data: Mock.mock(unitTreeList)
    },{
        // 机构管理新增接口
        url: '/sysUnit',
        method: 'post',
        data: Mock.mock({
            "resultCode": 200,
            "resultMsg": "添加成功",
            "data": null
        })
    },{
        // 机构管理编辑接口
        url: '/sysUnit',
        method: 'put',
        data: Mock.mock({
            "resultCode": 200,
            "resultMsg": "编辑成功",
            "data": null
        })
    },{
        // 机构管理删除接口
        url: '/sysUnit?ids=',
        method: 'delete',
        data: Mock.mock({
            "resultCode": 200,
            "resultMsg": "删除成功",
            "data": null
        })
    }
]

// -----------------------------人员管理部分接口------------------------------------
const person = [
    {
        // 人员管理查询列表接口
        url: '/sysUser/list',
        method: 'get',
        data: Mock.mock(personData)
    },{
        // 人员管理新增接口
        url: '/sysUser/create',
        method: 'post',
        data: Mock.mock({
            "resultCode": 200,
            "resultMsg": "添加成功",
            "data": null
        })
    },{
        // 人员管理新增接口
        url: '/sysUser/update/209520f844a14f70ba8abd534fcd4d00/',
        method: 'put',
        data: Mock.mock({
            "resultCode": 200,
            "resultMsg": "编辑成功",
            "data": null
        })
    },{
        // 人员管理新增接口
        url: '/sysUser/delete/209520f844a14f70ba8abd534fcd4d00/',
        method: 'delete',
        data: Mock.mock({
            "resultCode": 200,
            "resultMsg": "删除成功",
            "data": null
        })
    },
]

// --------------------------------------角色管理部分接口----------------------------------------
const role = [
    {
        // 角色管理查询接口
        url: '/sysRole/list/',
        method: 'get',
        data: Mock.mock(roleData)
    },{
        // 角色管理新增接口
        url: '/sysRole/create/',
        method: 'post',
        data: Mock.mock({
            "resultCode": 200,
            "resultMsg": "添加成功",
            "data": null
        })
    },{
        // 角色管理修改接口
        url: '/sysRole/update/',
        method: 'put',
        data: Mock.mock({
            "resultCode": 200,
            "resultMsg": "修改成功",
            "data": null
        })
    },{
        // 角色管理权限修改接口
        url: '/sysRole/permission/update/',
        method: 'put',
        data: Mock.mock({
            "resultCode": 200,
            "resultMsg": "修改成功",
            "data": null
        })
    },{
        // 角色管理权限修改接口
        url: '/sysRole/permission/6c669ca6ca444de2b21ec288b6f36b76',
        method: 'put',
        data: Mock.mock(rolePower)
    },{
        // 角色管理权限修改接口
        url: '/sysRole/delete',
        method: 'delete',
        data: Mock.mock({
            "resultCode": 200,
            "resultMsg": "删除成功",
            "data": null
        })
    }
]

// -----------------------------菜单管理部分接口-----------------------------------
const menu = [
    {
        // 角色管理权限修改接口
        url: '/sysPermission/treeList',
        method: 'get',
        data: Mock.mock(menuData)
    },{
        // 角色管理权限修改接口
        url: '/sysPermission/update/d8b63a9c803a492680adb55fed6c5f8d',
        method: 'put',
        data: Mock.mock({
            "resultCode": 200,
            "resultMsg": "修改成功",
            "data": null,
        })
    },{
        // 角色管理权限修改接口
        url: '/sysPermission/delete/',
        method: 'delete',
        data: Mock.mock({
            "resultCode": 200,
            "resultMsg": "删除成功",
            "data": null,
        })
    },
]
// ------------------------------操作日志部分接口--------------------------------------------
const log = [
    {
        // 操作日志查询接口
        url: '/sysLog',
        method: 'get',
        data: Mock.mock(logData)
    }
]

const emapList = [sideMenu, userLogin, getMarksList, 
                  getMapNavi, mapListSave, ...unit, ...person, ...role, ...menu, ...log]
module.exports = emapList