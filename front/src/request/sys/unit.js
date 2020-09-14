import service from '../service.js'
// 获取全部机构列表，树形结构
export function queryAllUnitList() {
  return service({
    url:'sysUnit/tree',
    method: 'get',
  })
}

// 分页获取机构列表
export function queryUnitList(params) {
  return service({
    url:'sysUnit?curPage='+params.curPage+'&pageSize=' + params.pageSize,
    method: 'get',
  })
}
// 获取机构详情
export function getUnitDetail(params) {
  return service({
    url:'sysUnit?id='+params.id,
    method: 'get',
  })
}

// 更新机构信息
export function updateUnitDetail(params) {
  return service({
    url:'sysUnit',
    method: 'put',
    data: params,
  })
}

// 添加机构信息
export function addUnit(params) {
return service({
  url:'sysUnit',
  method: 'post',
  data: params
})
}

// 删除机构信息
export function deleteUnitList(id) {
  return service({
    url:'sysUnit?ids='+ id,
    method: 'delete',
  })
}

// 获取日志列表
export function getSystemLog(params) {
  return service({
    url:'sysLog?curPage='+params.curPage+'&pageSize=' + params.pagesize,
    method: 'get',
    // params: qs.stringify(params)
  })
}

