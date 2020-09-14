import service from '../service.js'
import qs from 'qs'

// 获取所有人员
export function queryAllUser() {
  return service({
    // url: '/hylpmsnew/private/doLogin',
    url: 'sysRole/list',
    method: 'get',
    // params: qs.stringify(params)
  })
}

// 获取机构人员
export function queryUserFoUnit(id) {
  return service({
    // url: '/hylpmsnew/private/doLogin',
    url: '?unit=' + id,
    method: 'get',
    // params: qs.stringify(params)
  })
}


// 向xx机构添加人员
export function addUser(postData) {
    return service({
      // url: '/hylpmsnew/private/doLogin',
      url: 'sysRole/create',
      method: 'post',
      data: postData,
    })
}

// 在xx机构删除人员批量删除
export function deleteUser(ids) {
    return service({
      // url: '/hylpmsnew/private/doLogin',
      url: 'sysRole/delete',
      method: 'delete',
      data:ids,
    })
}

// 在xx机构修改人员信息
export function updateUser(postData) {
    return service({
      // url: '/hylpmsnew/private/doLogin',
      url: 'sysRole/update/' + postData.id + '/',
      method: 'put',
      data: postData,
    })
}

// 获取相应角色权限
export function getUserRole(roleId) {
  return service({
    // url: '/hylpmsnew/private/doLogin',
    url: 'sysRole/permission/'+ roleId,
    method: 'get',
    // data: postData.data,
  })
}

// 修改角色权限
export function editUserRole(postData) {
  // postData = {permissionIds: 123123213213, roleId: 213123};
  return service({
    // url: '/hylpmsnew/private/doLogin',
    url: 'sysRole/permission/update/',
    method: 'put',
    data: postData ,
  })
}

// 修改角色
export function editUser(id,postData) {
  return service({
    // url: '/hylpmsnew/private/doLogin',
    url: 'sysRole/update/'+ id + '/',
    method: 'put',
    data: postData,
  })
  // postData数据结构
  // postData = {
  //   "aliasName": "Admin",
  //   "createTime": "2019-12-21T01:22:08.057Z",
  //   "createUser": "string",
  //   "description": "Admin",
  //   "id": "13bf53c2687942adb00dc3236e6317e6",
  //   "isDeleted": true,
  //   "isEnabled": true,
  //   "location": 0,
  //   "roleCode": "admin",
  //   "roleName": "管理员",
  //   "unitId": "28fca3b04c97414da2c07bb8736508a6",
  //   "updateTime": "2019-12-21T01:22:08.057Z",
  //   "updateUser": "string"
  // }
}

export const roleManage = {queryAllUser, queryUserFoUnit, addUser ,deleteUser, updateUser, getUserRole, editUserRole, editUser}