import request from '@/utils/request'

export function getMemberList(data) { //获取人员列表
    return request({
        url: '/api/v1/seller/getSalerList',
        method: 'get',
        params: data
    })
}

export function getSaler(data) { //获取人员上下级
    return request({
        url: '/api/v1/seller/getSaler',
        method: 'get',
        params: data
    })
}

export function getWithdraw(data) { //获取提现申请管理列表
    return request({
        url: '/api/v1/seller/memberwithdraw',
        method: 'get',
        params: data
    })
}

export function editState(data) { //修改提现状态
    return request({
        url: '/api/v1/seller/memberwithdraw',
        method: 'put',
        data
    })
}

export function deleteWithdraw(data) { //删除提现列表
    return request({
        url: '/api/v1/seller/memberwithdraw',
        method: 'delete',
        data
    })
}

export function getSettingInfo(data) { //获取分销设置
    return request({
        url: '/api/v1/seller/salersetting',
        method: 'get',
        params: data
    })
}

export function postSetting(data) { //删除提现列表
    return request({
        url: '/api/v1/seller/salersetting',
        method: 'post',
        data
    })
}