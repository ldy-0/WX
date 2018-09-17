import request from '@/utils/request'

export function getShopList(data) { //商家题库list
    return request({
        url: '/api/v1/seller/question',
        method: 'get',
        params: data
    })
}

export function postAddShopList(data){
    return request({
        url:'/api/v1/seller/question',
        method :'post',
        data
    })
}