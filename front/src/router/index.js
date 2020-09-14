import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '@v/Layout/Layout.vue'

Vue.use(VueRouter);

// 系统设置模块路由
const sysRoutes = [{
  path: '/sys',
  name: 'sys',
  component: Layout,
  redirect: '/sys/unit',
  meta: {
    title: '系统设置',
    checkCookie: true,
  },
  children: [{
      path: 'unit',
      name: 'sysUnit',
      component: () => import('@v/sys/unit.vue'),
      meta: {
        title: '机构管理',
        keepAlive: true,
        aside: true,
        type: 'sys',
        checkCookie: true,
      }
    },
    {
      path: 'person',
      name: 'sysPerson',
      component: () => import('@v/sys/person.vue'),
      meta: {
        title: '人员管理',
        keepAlive: true,
        aside: true,
        type: 'sys',
        checkCookie: true,
      }
    }, {
      path: 'role',
      name: 'sysRole',
      component: () => import('@v/sys/role.vue'),
      meta: {
        title: '角色管理',
        keepAlive: true,
        aside: true,
        type: 'sys',
        checkCookie: true,
      }
    }, {
      path: 'menu',
      name: 'sysMenu',
      component: () => import('@v/sys/menu.vue'),
      meta: {
        title: '菜单管理',
        keepAlive: true,
        aside: true,
        type: 'sys',
        checkCookie: true,
      }
    }, {
      path: 'log',
      name: 'sysLog',
      component: () => import('@v/sys/log.vue'),
      meta: {
        title: '操作日志',
        keepAlive: true,
        aside: true,
        type: 'sys',
        checkCookie: true,
      }
    }, {
      path: "/welcome",
      name: "welcome",
      component: () => import("@v/welcome.vue"),
      meta: {
        title: '网站导航',
        keepAlive: false,
        aside: false,
        checkCookie: true,
      }
    }
  ]
}, {
  path: '/protectUnit',
  name: 'protectUnit',
  component: Layout,
  redirect: '/protectUnit/unitInfo',
  meta: {
    title: '保护单位管理',
    checkCookie: true,
  },
  children: [{
    path: 'unitInfo',
    name: 'unitInfo',
    component: () => import('@v/protectUnit/unitInfo.vue'),
    meta: {
      title: '保护单位管理',
      keepAlive: true,
      aside: true,
      type: 'sys',
      checkCookie: true,
    }
  }, {
    path: 'deviceType',
    name: 'deviceType',
    component: () => import('@v/protectUnit/deviceType.vue'),
    meta: {
      title: '设备类型信息',
      keepAlive: true,
      aside: true,
      type: 'sys',
      checkCookie: true,
    }
  }, {
    path: 'unitMap',
    name: 'unitMap',
    component: () => import('@v/protectUnit/unitMap.vue'),
    meta: {
      title: '保护单位地图',
      keepAlive: true,
      aside: true,
      type: 'sys',
      checkCookie: true,
    }
  }]
}]

// 用户界面模块路由
const userRoutes = [{
  path: '/realTime',
  name: 'realTime',
  component: Layout,
  redirect: '/monitoring/map',
  meta: {
    title: '实时监控'
  },
  children: [{
    path: '/monitoring/map',
    name: 'map',
    component: () => import('@v/realTime/map.vue'),
    meta: {
      title: '地图监控',
      keepAlive: true,
      aside: true,
      type: 'user',
      checkCookie: true,
    }
  }, {
    path: '/monitoring/device',
    name: 'device',
    component: () => import('@v/realTime/device.vue'),
    meta: {
      title: '设备监控',
      keepAlive: true,
      aside: true,
      type: 'user',
      checkCookie: true,
    }
  }]
}, {
  path: '/alarm',
  name: 'alarm',
  component: Layout,
  redirect: '/alarm/info',
  meta: {
    title: '报警管理',
    checkCookie: true,
  },
  children: [{
    path: '/alarm/info',
    name: 'info',
    component: () => import('@v/alarm/info.vue'),
    meta: {
      title: '报警信息',
      keepAlive: true,
      aside: true,
      type: 'user',
      checkCookie: true,
    }
  }, {
    path: '/alarm/type',
    name: 'type',
    component: () => import('@v/alarm/type.vue'),
    meta: {
      title: '报警类型',
      keepAlive: true,
      aside: true,
      type: 'user',
      checkCookie: true,
    }
  }]
}, {
  path: '/history',
  name: 'history',
  component: Layout,
  redirect: '/history/data',
  meta: {
    title: '历史数据',
    checkCookie: true,
  },
  children: [{
    path: '/history/data',
    name: 'data',
    component: () => import('@v/history/history.vue'),
    meta: {
      title: '历史数据',
      keepAlive: true,
      aside: true,
      type: 'user',
      checkCookie: true,
    }
  }]
}, {
  path: "/doc",
  name: "doc",
  component: Layout,
  children: [{
    path: "/doc",
    name: "doc",
    component: () => import("@v/doc/doc.vue"),
    meta: {
      title: '文档管理',
      keepAlive: true,
      aside: true,
      type: 'user',
      checkCookie: true,
    }
  }]
}]

const routes = [{
    path: "/",
    name: "login",
    component: () => import("@v/login/login.vue"),
    meta: {
      checkCookie: false,
    }
  },
  ...sysRoutes,
  ...userRoutes,
  {
    path: '*',
    name: 'page404',
    component: () => import('@v/errorPage/404.vue'),
    meta: {
      checkCookie: false,
    }
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
