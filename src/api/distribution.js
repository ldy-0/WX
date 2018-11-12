import request from '@/utils/request'

export function getMemberList(data) {
    return request({
        url: '/api/v1/seller/getSalerList',
        method: 'get',
        params: data
    })
}

export function getSaler(data) {
    return request({
        url: '/api/v1/seller/getSaler',
        method: 'get',
        params: data
    })
}