import service from '../service.js'
import qs from 'qs'

// 获取所有人员
export function queryAllUser() {
  return service({
    // url: '/hylpmsnew/private/doLogin',
    url: 'sysUser/list',
    method: 'get',
    // params: qs.stringify(params)
  })
}

// 向xx机构添加人员
export function addUser(postData) {
    return service({
      // url: '/hylpmsnew/private/doLogin',
      url: '/sysUser/create',
      method: 'post',
      data: postData,
    })
}

// 在xx机构删除人员批量删除
export function deleteUser(ids) {
    return service({
      // url: '/hylpmsnew/private/doLogin',
      url: '/sysUser/delete/'+ ids,
      method: 'delete',
    })
}

// 在xx机构修改人员信息
export function updateUser(postData) {
    return service({
      // url: '/hylpmsnew/private/doLogin',
      url: '/sysUser/update/' + postData.id + '/',
      method: 'put',
      data: postData,
    })
}

export function queryUserList(params) {
  return service({
    url:'sysUser/list?pageNum='+params.pageNum+'&pageSize='+ params.pageSize+'&name='+params.name,
    method: 'get',
  })
}