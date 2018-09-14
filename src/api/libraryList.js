import request from '@/utils/request'

export function getLibList(data) {
    return request({
        url: '/api/v1/seller/topic',
        method: 'get',
        params: data
    })
}