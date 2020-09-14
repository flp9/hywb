import service from '../service'
import qs from 'qs'

// 添加权限
export function addPower(postData) {
  return service({
    // url: '/hylpmsnew/private/doLogin',
    url: 'sysPermission/create',
    method: 'post',
    data: postData
  })
}

// 批量删除权限
export function deletePower(id) {
  return service({
    // url: '/hylpmsnew/private/doLogin',
    url: 'sysPermission/delete',
    method: 'delete',
    data: id
  })
}

// 获取权限列表
export function queryPowerList() {
  return service({
    // url: '/hylpmsnew/private/doLogin',
    url: 'sysPermission/list',
    method: 'get',
    // params: qs.stringify(params)
  })
}

// 获取权限树状图
export function queryPowerTree() {
  return service({
    // url: '/hylpmsnew/private/doLogin',
    url: 'sysPermission/treeList',
    method: 'get',
    // params: qs.stringify(params)
  })
}

// 修改菜单权限
export function updatePower(postData) {
  return service({
    url: 'sysPermission/update/' + postData.id,
    method: 'put',
    data: postData
  })
}