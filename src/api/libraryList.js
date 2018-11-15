import request from '@/utils/request'

export function getLibList(data) { //平台题库list
    return request({
        url: '/api/v1/admin/topic',
        method: 'get',
        params: data
    })
}

export function postLibSearchTitle(data) { //平台题库按title搜索
    return request({
        url: '/api/v1/admin/search',
        method: 'post',
        data
    })
}

export function getLibClassList(data) { //平台分类list
    return request({
        url: '/api/v1/admin/classify',
        method: 'get',
        params: data
    })
}

export function getLibSearchClass(data) { //平台按分类搜索
    return request({
        url: '/api/v1/admin/search',
        method: 'get',
        params: data
    })
}

export function deleteLibList(data) { //删除平台题目
    return request({
        url: '/api/v1/admin/topic',
        method: 'delete',
        data
    })
}

export function postLibAddList(data) { //添加平台题目
    return request({
        url: '/api/v1/admin/topic',
        method: 'post',
        data
    })
}

export function putLibEditList(data) { //修改平台题目
    return request({
        url: '/api/v1/admin/topic',
        method: 'put',
        data
    })
}

export function getClassList(data) { //平台分类list
    return request({
        url: '/api/v1/admin/classify',
        method: 'get',
        params: data
    })
}

export function postAddClass(data) { //添加平台分类
    return request({
        url: '/api/v1/admin/classify',
        method: 'post',
        data
    })
}

export function putEditClass(data) { //修改平台分类
    return request({
        url: '/api/v1/admin/classify',
        method: 'put',
        data
    })
}

export function deleteClassList(data) { //删除分类
    return request({
        url: '/api/v1/admin/classify',
        method: 'delete',
        data
    })
}

export function postImportLib(data) { //导入平台题目
    return request({
        url: '/api/v1/admin/topicImport',
        method: 'post',
        data
    })
}

export function getAnswerMember_api(data) {
    return request({
        url: '/api/v1/admin/huntSubscriber',
        method: 'get',
        params: data
    })
}
export function getAnswerList_api(data) {
    return request({
        url: '/api/v1/admin/huntQuestion',
        method: 'get',
        params: data
    })
}

export function getSalerList(data) {
    return request({
        url: '/api/v1/admin/getSalerList',
        method: 'get',
        params: data
    })
}

export function setting(data) {
    return request({
        url: '/api/v1/admin/setting',
        method: 'put',
        data
    })
}