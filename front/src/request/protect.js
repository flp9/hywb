// eleMap
import service from './service'
export function getMarksList(params) {
  return service({
    url:'/api/getMarks',
    method: 'post',
    data: params
  })
}
export function getMapNavi(params) {
  return service({
    url: '/api/getMapNavi',
    method: 'post',
    data: params
  })
}
export function mapListSave(params) {
  return service({
    url:'/api/mapSave',
    method: 'post',
    data: params
  })
}

