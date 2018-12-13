import request from '@/utils/request'

// test

export function test(data) {
  return request({
    url: '/api/v1/seller/storegc',
    method: 'get',
    params: data
  })
}
//notice
  export function getNotice_api(data) {
    return request({
      url: '/api/v1/admin/affiche',
      method: 'get',
      params: data
    })
  }
  export function addNotice_api(data) {
    return request({
      url: '/api/v1/admin/affiche',
      method: 'post',
      data
    })
  }
//manageShop
  export function getPostionList_api(data) {
    console.log('inner getPostionList_api')
    return request({
      url: '/api/v1/admin/area',
      method: 'get',
      params: data
    })
  }

  export function getIndustryList_api(data) {
    return request({
      url: '/api/v1/admin/storeclass',
      method: 'get',
      params: data
    })
  }

  export function addShop_api(data) {
    return request({
      url: '/api/v1/admin/store',
      method: 'post',
      data
    })
  }
  export function editShop_api(data) {
    return request({
      url: '/api/v1/admin/store',
      method: 'put',
      data
    })
  }
  export function deleteShop_api(data) {
    return request({
      url: '/api/v1/admin/store',
      method: 'delete',
      data
    })
  }
  export function getShop_api(data) {
    return request({
      url: '/api/v1/admin/store',
      method: 'get',
      params: data
    })
  }
  export function upDownShop(data) {
    return request({
      url: '/api/v1/admin/storeinfo',
      method: 'put',
      data
    })
  }
  export function getROrderList_api(data) {
    return request({
      url: '/api/v1/seller/order',
      method: 'get',
      params: data
    })
  }

// manageSevice=>shopServer
  // 获取访问量列表 
  export function changeShopServer_api(data) {
    return request({
      url: '/api/v1/admin/storeview',
      method: 'put',
      data
    })
  }

// manageSevice=>flowPackages
  export function getFlowPackageList_api(data) {
    return request({
      url: '/api/v1/admin/flowpackage',
      method: 'get',
      data
    })
  }
  export function deleteFlowPackage_api(data) {
    return request({
      url: '/api/v1/admin/flowpackage',
      method: 'delete',
      data,
      params:data
    })
  }
  export function addFlowPackage_api(data) {
    return request({
      url: '/api/v1/admin/flowpackage',
      method: 'post',
      data
    })
  }
  export function editFlowPackage_api(data) {
    return request({
      url: '/api/v1/admin/flowpackage',
      method: 'put',
      data
    })
  }
// manageSevice=>industryList
  export function addIndustry_api(data) {
    return request({
      url: '/api/v1/admin/storeclass',
      method: 'post',
      data
    })
  }
  export function deleteIndustry_api(data) {
    return request({
      url: '/api/v1/admin/storeclass',
      method: 'delete',
      data
    })
  }
  export function editIndustry_api(data) {
    return request({
      url: '/api/v1/admin/storeclass',
      method: 'put',
      data
    })
  }
  // 已有
  // export function getIndustryList_api(data) {
  //   return request({
  //     url: '/api/v1/admin/storeclass',
  //     method: 'get',
  //     params:data
  //   })
  // }
// agent
  export function getAgentList_api(data) {
    return request({
      url: '/api/v1/admin/agent',
      method: 'get',
      params: data
    })
  }
  export function addAgent_api(data) {
    return request({
      url: '/api/v1/admin/agent',
      method: 'post',
      data: data
    })
  }
  export function editAgent_api(data) {
    return request({
      url: '/api/v1/admin/agent',
      method: 'put',
      data: data
    })
  }
  export function deleteAgent_api(data) {
    return request({
      url: '/api/v1/admin/agent',
      method: 'delete',
      data: data
    })
  }
// auth
export function getAuthList_api(data) {
  return request({
    url: '/api/v1/admin/admin',
    method: 'get',
    params: data
  })
}
  export function deleteAuth_api(data) {
    return request({
      url: '/api/v1/admin/admin',
      method: 'delete',
      data: data
    })
  }
  export function addAuth_api(data) {
    return request({
      url: '/api/v1/admin/admin',
      method: 'post',
      data: data
    })
  }
  export function editAuth_api(data) {
    return request({
      url: '/api/v1/admin/admin',
      method: 'put',
      data: data
    })
  }
// 
  // ---------------------
export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}


//------------------------------------
export function getAgentShop_api(data) {
  return request({
    url: '/api/v1/admin/store',
    method: 'get',
    params: data
  })
}
export function getShopOrderList_api(data) {
  return request({
    url: '/api/v1/admin/order',
    method: 'get',
    params: data
  })
}
export function getShopOrderList_api2(data) {
  return request({
    url: '/api/v1/admin/vrorder',
    method: 'get',
    params: data
  })
}

export function getAnswerMember_api(data) {
  return request({
    url: '/api/v1/admin/subscriber',
    method: 'get',
    params: data
  })
}
export function getAnswerList_api(data) {
  return request({
    url: '/api/v1/admin/question',
    method: 'get',
    params: data
  })
}
export function getHomeData_api(data) {
  return request({
    url: '/api/v1/admin/salesstats',
    method: 'get',
    params: data
  })
}
//平台浏览量
export function getFlowstats_api(data) {
  return request({
    url: '/api/v1/admin/flowstats',
    method: 'get',
    params: data
  })
}
//积分比例授权
export function getEditAuth_api(data) {
  return request({
    url: '/api/v1/admin/salersettingaudit',
    method: 'get',
    params: data
  })
}
export function editEditAuth_api(data) {
  return request({
    url: '/api/v1/admin/salersettingaudit',
    method: 'put',
    data
  })
}

// auth
async function getAuth(params, _this) {
  const res = await request({
    url: '/api/v1/admin/storeinfo',
    method: 'get',
    params
  })

  return res.error !== '' ? _this.$message.error({ message: res.error }) : res.data
}

async function setAuth(data, _this) {
  const res = await request({
    url: '/api/v1/admin/editmodulelist',
    method: 'PUT',
    data
  })

  return res.error !== '修改成功' ? null : _this.$message.success({ message: '修改成功' })
}

export default {
  getAuth,
  setAuth
}

