import service from './service'

// 登录接口
export function loginApi(params) {
    return service({
        url: '/sysUser/login',
        method: 'post',
        data: params
    })
}

// 获取用户信息接口
export function getUserInfo(params) {
    return service({
      // url: '/hylpmsnew/private/userInfo',
      url: '/sysUser/info',
      method: 'get',
    })
}

// 注销登录接口
export function logout() {
    return service({
      url: '/sysUser/logout',
      method: 'post'
    })
}

// 获取系统菜单接口
export function getMenuList(userId) {
  return service({
    url: '/sysUser/sidebar/' + userId,
    method: 'get'
  })
}