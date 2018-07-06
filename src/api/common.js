import request from '@/utils/request'

export function upFileToken_api(data) {
  return request({
    url: '/api/v1/admin/imgkey',
    method: 'get',
    params: data
  })
}