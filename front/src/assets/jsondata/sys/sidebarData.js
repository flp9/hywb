module.exports = {
    sysMenuList: [{
        name: '系统设置',
        path: '/sys',
        icon: '',
        children: [{
            name: '机构管理',
            path: '/sys/unit',
            icon: '',
        }, {
            name: '人员管理',
            path: '/sys/person',
            icon: '',
        }, {
            name: '角色管理',
            path: '/sys/role',
            icon: '',
        }, {
            name: '菜单管理',
            path: '/sys/menu',
            icon: '',
        }, {
            name: '操作日志',
            path: '/sys/log',
            icon: '',
        }]
    }, {
        name: '保护单位管理',
        path: '/protectUnit',
        icon: '',
        children: [{
            name: '保护单位信息',
            path: '/protectUnit/unitInfo',
            icon: '',
        }, {
            name: '设备类型信息',
            path: '/protectUnit/deviceType',
            icon: '',
        }, {
            name: '保护单位地图',
            path: '/protectUnit/unitMap',
            icon: '',
        }]
    }],
    userMenuList: [{
        name: '实时监控',
        path: '/realTime',
        icon: '',
        children: [{
            name: '地图监控',
            path: '/monitoring/map',
            icon: '',
        }, {
            name: '设备监控',
            path: '/monitoring/device',
            icon: '',
        }]
    }, {
        name: '报警管理',
        path: '/alarm',
        icon: '',
        children: [{
            name: '报警信息',
            path: '/alarm/info',
            icon: '',
        }, {
            name: '报警类型',
            path: '/alarm/type',
            icon: '',
        }]
    }, {
        name: '历史数据',
        path: '/history',
        icon: '',
        children: [{
            name: 'xxxx数据',
            path: '/history/data',
            icon: '',
        }]
    }, {
        name: '文档管理',
        path: '/doc',
        icon: '',
    }],
}
