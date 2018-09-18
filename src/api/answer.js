import request from '@/utils/request'

export function getShopList(data) { //商家题库list
    return request({
        url: '/api/v1/seller/question',
        method: 'get',
        params: data
    })
}

export function postAddShopList(data) {
    return request({
        url: '/api/v1/seller/question',
        method: 'post',
        data
    })
}

export function deleteShopList(data) {
    return request({
        url: '/api/v1/seller/question',
        method: 'delete',
        data
    })
}

export function putEditShopList(data) {
    return request({
        url: '/api/v1/seller/question',
        method: 'put',
        data
    })
}

export function grtLibList(data) { //获取题库list
    return request({
        url: '/api/v1/seller/library',
        method: 'get',
        params: data
    })
}

export function postAddLibList(data) { //获取题库list
    return request({
        url: '/api/v1/seller/library',
        method: 'post',
        data
    })
}

export function deleteLibIndexList(data) { //delete题库list
    return request({
        url: '/api/v1/seller/library',
        method: 'delete',
        data
    })
}

export function putEditClass(data) { //修改题库list
    return request({
        url: '/api/v1/seller/library',
        method: 'put',
        data
    })
}

export function postAddToLib(data) { //往题库里添加题目
    return request({
        url: '/api/v1/seller/information',
        method: 'post',
        data
    })
}

export function getShopLibList(data) { //获取对应题库里的题目
    return request({
        url: '/api/v1/seller/information',
        method: 'get',
        params: data
    })
}

export function deleteDialong(data) { //delete题库dialog list
    return request({
        url: '/api/v1/seller/information',
        method: 'delete',
        data
    })
}

export function putEditDialog(data) { //修改题库dialog list
    return request({
        url: '/api/v1/seller/information',
        method: 'put',
        data
    })
}

export function postGetLibFormShop(data) { //修改题库dialog list
    return request({
        url: '/api/v1/seller/batchInformation',
        method: 'post',
        data
    })
}

export function getMemberList(data) { //成员列表
    return request({
        url: '/api/v1/seller/subscriber',
        method: 'get',
        params: data
    })
}

export function postSearchNumber(data) {
    return request({
        url: '/api/v1/seller/subscriber',
        method: 'post',
        data
    })
}

export function postLibSearchTitle(data) {
    return request({
        url: '/api/v1/seller/seek',
        method: 'post',
        data
    })
}

//奖金模式 room

export function getBonusRoomInfo(data) { //奖金模式room列表
    return request({
        url: '/api/v1/seller/room',
        method: 'get',
        params: data
    })
}

export function postAddBonusRoom(data) { //奖金模式添加room
    return request({
        url: '/api/v1/seller/room',
        method: 'post',
        data
    })
}