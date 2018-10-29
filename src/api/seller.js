import request from '@/utils/request'

// test
  export function test2(data) {
    return request({
      url: '/api/v1/seller/storeinfo',
      method: 'put',
      data
    })
  }
  export function test(data) {
    return request({
      url: '/api/v1/seller/school',
      method: 'get',
      params: {
        limit:0
      }
    })
  }
// sellerGoods
  export function addGoods_api(data) {
    return request({
      url: '/api/v1/seller/goodscommon',
      method: 'post',
      data
    })
  }
  export function getGoodsList_api(data) {
    return request({
      url: '/api/v1/seller/goodscommon',
      method: 'get',
      params: data
    })
  }
  export function editGoods_api(data) {
    return request({
      url: '/api/v1/seller/goodscommon',
      method: 'put',
      data
    })
  }
  export function getGoods_api(data) {
    return request({
      url: '/api/v1/seller/goodscommon',
      method: 'get',
      params: data
    })
  }
  export function getSchoolList_api(data) { //获取门店列表
    console.log('inner getPostionList_api')
    return request({
      url: '/api/v1/seller/school',
      method: 'get',
      params: data
    })
  }
  export function upDownGoods_api(data) {
    return request({
      url: '/api/v1/seller/goodscommon',
      method: 'put',
      data
    })
  }
  
  
// order => rOrder
  export function changeROrder_api(data) {
    return request({
      url: '/api/v1/seller/orderstate?order_id='+data.order_id,
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
  export function getROrder_api(data) {
    return request({
      url: '/api/v1/seller/order',
      method: 'get',
      params: data
    })
  }

// order => VOrder
  export function changeVOrder_api(data) {
    return request({
      url: '/api/v1/seller/vrorder?order_id='+data.order_id,
      method: 'put',
      data
    })
  }
  export function getVOrderList_api(data) {
    return request({
      url: '/api/v1/seller/vrorder',
      method: 'get',
      params: data
    })
  }
  export function getVOrder_api(data) {
    return request({
      url: '/api/v1/seller/vrorder',
      method: 'get',
      params: data
    })
  }
// return => rReturn
  export function getReturnList(data) {
    return request({
      url: '/api/v1/seller/refundreturn',
      method: 'get',
      params:data,
    })
  }
  export function editReturnList(data) {
    return request({
      url: '/api/v1/seller/refundreturn',
      method: 'put',
      data,
    })
  }
  
// appointment
  export function getAppointmentList_api(data) {
    return request({
      url: '/api/v1/seller/appointment',
      method: 'get',
      params: data
    })
  }
  export function changeAppointmentList_api(data) {
    return request({
      url: '/api/v1/seller/appointment',
      method: 'put',
      params: data,
      data
    })
  }
// Coupon
  export function getCouponList_api(data) {
    return request({
      url: '/api/v1/seller/discountCoupon',
      method: 'get',
      params: data
    })
  }
  export function addCoupon_api(data) {
    return request({
      url: '/api/v1/seller/discountCoupon',
      method: 'post',
      data
    })
  }
  export function deleteCoupon_api(data){
    return request ({
      url:'/api/v1/seller/discountCoupon',
      method:'delete',
      data
    })
  }
//server => entry
  export function getEntryList_api(data) {
    return request({
      url: '/api/v1/seller/storegc',
      method: 'get',
      params: data
    })
  }
  export function editEntry_api(data) {
    return request({
      url: '/api/v1/seller/storegc',
      method: 'put',
      data
    })
  }
//server => rec
  //获取推荐列表 这里和 getGoodsList_api 共用一个接口 goods_commend 0 1
    // export function getGoodsList_api(data) {
    //   return request({
    //     url: '/api/v1/seller/goodscommon',
    //     method: 'get',
    //     params: data
    //   })
    // }

  // 编辑 goods_commonid:id type:"recommend", "notrecommend"
  export function editRec_api(data) { 
    return request({
      url: '/api/v1/seller/goodscommon',
      method: 'put',
      data
    })
  }
//server => Activity =>dis
  export function getActivityList_api(data) {
    return request({
      url: '/api/v1/seller/distribution',
      method: 'get',
      params: data
    })
  }
  export function addActivity_api(data) { 
    return request({
      url: '/api/v1/seller/distribution',
      method: 'post',
      data
    })
  }
  export function deleteActivity_api(data) { 
    return request({
      url: '/api/v1/seller/distribution?distribution_id='+data.distribution_id,
      method: 'delete',
    })
  }
//server => Activity => vote
  export function getVoteList_api(data) {
    return request({
      url: '/api/v1/seller/vote',
      method: 'get',
      params: data
    })
  }
  export function addVote_api(data) { 
    return request({
      url: '/api/v1/seller/vote',
      method: 'post',
      data
    })
  }
  export function deleteVote_api(data) { 
    return request({
      url: '/api/v1/seller/vote?vote_id='+data.vote_id,
      method: 'delete',
    })
  }
//server => school
  // this.getSchoolList() 已存在
  export function deleteSchool_api(id) { 
    return request({
      url: '/api/v1/seller/school?school_id='+id,
      method: 'delete',
    })
  }
  export function addSchool_api(data) { 
    return request({
      url: '/api/v1/seller/school',
      method: 'post',
      data
    })
  }
  export function editSchool_api(data) { 
    return request({
      url: '/api/v1/seller/school?school_id='+data.school_id,
      method: 'put',
      data
    })
  }
//server => banner
  export function getBannerList_api(data) {
    return request ({
      url:'/api/v1/seller/banner',
      method:'get',
      data
    })
  }

  export function deleteBanner_api(id){
    return request ({
      url:'/api/v1/seller/banner?banner_id='+ id,
      method:'delete',
    })
  }

  export function addBanner_api(data){
    return request({
      url:'/api/v1/seller/banner',
      method:'post',
      data
    })
  }

  export function editBanner_api(data){
    return request({
      url:'/api/v1/seller/banner',
      method:'put',
      data
    })
  }
//server => act
  export function deleAct_api(data) {
    return request({
      url: '/api/v1/seller/dynamic',
      method: 'delete',
      data: data
    })
  }
  export function addAct_api(data) {
    return request({
      url: '/api/v1/seller/dynamic',
      method: 'post',
      data
    })
  }
  export function getActList_api(data) {
    return request({
      url: '/api/v1/seller/dynamic',
      method: 'get',
      params: data
    })
  }
// server => shop
  export function editShopText_api(data){
    return request({
      url:'/api/v1/seller/storeinfo',
      method:'put',
      data
    })
  }

  export function getIntroForm_api(data){
    return request({
      url:'/api/v1/seller/storeinfo',
      method:'get',
      params:data
    })
  }
// server => glow
  export function getFlowList_api(data){
    return request({
      url:'/api/v1/seller/flowpackage',
      method:'get',
      params:data
    })
  }
  export function buyFlow_api(data){
    return request({
      url:'/api/v1/seller/floworder',
      method:'post',
      params:data,
      data
    })
  }
  export function buyFlowState_api(data){
    return request({
      url:'/api/v1/seller/floworder',
      method:'get',
      params:data
    })
  }
// server => kill
export function getKillList_api(data){
  return request({
    url:'/api/v1/seller/cutprice',
    method:'get',
    params:data
  })
}
export function addKillBuy_api(data){
  return request({
    url:'/api/v1/seller/cutprice',
    method:'post',
    params:data,
    data
  })
}
export function deleteKill_api(data){
  return request({
    url:'/api/v1/seller/cutprice',
    method:'delete',
    params:data,
    data
  })
}
// server => allBuy
export function getAllBuyList_api(data){
  return request({
    url:'/api/v1/seller/groupbuying',
    method:'get',
    params:data
  })
}
export function addAllBuy_api(data){
  return request({
    url:'/api/v1/seller/groupbuying',
    method:'get',
    params:data
  })
}
export function deleteAllBuy_api(data){
  return request({
    url:'/api/v1/seller/groupbuying',
    method:'get',
    params:data
  })
}
export function editAllBuy_api(data){
  return request({
    url:'/api/v1/seller/groupbuying',
    method:'post',
    params:data,
    data
  })
}

// auth
  export function getAuthList_api(data) {
    return request({
      url: '/api/v1/seller/seller',
      method: 'get',
      params: data
    })
  }
  export function deleteAuth_api(data) {
    return request({
      url: '/api/v1/seller/seller',
      method: 'delete',
      data: data
    })
  }
  export function addAuth_api(data) {
    return request({
      url: '/api/v1/seller/seller',
      method: 'post',
      data: data
    })
  }
  export function editAuth_api(data) {
    return request({
      url: '/api/v1/seller/seller',
      method: 'put',
      data: data
    })
  }
// ----------------------------------------------
// signIn
async function setAddress(data, _this){
  let res = await request({
    url: '/api/v1/seller/addteachaddr',
    method: 'post',
    data,
  });
  console.log('res ', res);
  return res.error !== '添加成功' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: res.error })// res.data; 
}

async function updateAddress(data, _this){
  let res = await request({
    url: '/api/v1/seller/editteachaddr',
    method: 'post',
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data
  });
  console.log('update address', res);
  return res.error !== '修改成功' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: res.error })// res.data; 
}

async function deleteAddress(data, _this){
  let res = await request({
    url: '/api/v1/seller/deleteteachaddr',
    method: 'post',
    data,
  });
console.log('delete address', res);
  return res.error !== '删除成功' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: res.error })// res.data; 
}

async function getAddressList(params, _this){
  let res = await request({
    url: '/api/v1/seller/gettcaddrlist',
    methods: 'get',
    params,
  });

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : res; 
}
// teacher
async function setTeacher(data, _this){

  let res = await request({
    url: '/api/v1/seller/addteacher',
    method: 'post',
    data,
  });

  return res.error !== '添加成功' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : _this.$notify.success({ title: '提示', message: res.error })// res.data; 
}

async function updateTeacher(data, _this){

  let res = await request({
    url: '/api/v1/teacher/edit',
    method: 'post',
    data,
  });

  return res.error !== '添加成功' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : _this.$notify.success({ title: '提示', message: res.error })// res.data; 
}

async function deleteTeacher(data, _this){

  let res = await request({
    url: '/api/v1/seller/deleteteacher',
    method: 'post',
    data,
  });

  return res.error !== '删除成功' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : _this.$notify.success({ title: '提示', message: res.error })// res.data; 
}

async function getTeacherList(params, _this){
  let res = await request({
    url: '/api/v1/seller/getteacherlist/getlist',
    methods: 'get',
    params,
  });

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : res; 
}

async function getTeacherCoulse(params, _this){
  let res = await request({
    url: '/api/v1/seller/getteacourse',
    methods: 'get',
    params,
  });

  return res.error !== '' ? this.$notify.error({ title: '错误信息', message: res.error, }) : res; 
}

async function getTeacherItemCourse(params, _this){
  let res = await request({
    url: '/api/v1/seller/getcsemesterlist',
    methods: 'get',
    params,
  });

  return res.error !== '' ? this.$notify.error({ title: '错误信息', message: res.error, }) : res; 
}

async function setCoulse(data, _this){
  let res = await request({
    url: '/api/v1/seller/addcourse',
    method: 'post',
    data,
  }); 

  return res.error !== '添加成功' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : _this.$notify.success({ title: '提示', message: res.error }); 
}

async function getCoulseList(params, _this){
  let res = await request({
    url: '/api/v1/seller/getcourselist',
    methods: 'get',
    params,
  });

  return res.error !== '' ? this.$notify.error({ title: '错误信息', message: res.error, }) : res; 
}

async function deleteCoulse(params, _this){
  let res = await request({
    url: '/api/v1/seller/deletecourse',
    method: 'get',
    params,
  });

  return res.error !== '添加成功' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : _this.$notify.success({ title: '提示', message: res.error }); 
}

async function setRealCoulse(data){
  let res = await request({
    url: '/api/v1/cschedule/add',
    methods: 'post',
    data,
  }); 

  return res.data.error !== '' ? this.$notify.error({ title: '错误信息', message: res.data.error, }) : res.data; 
}

async function getRealCoulseList(params){
  let res = await request({
    url: '/api/v1/cschedule/getlist',
    methods: 'get',
    params,
  });

  return res.data.error !== '' ? this.$notify.error({ title: '错误信息', message: res.data.error, }) : res.data; 
}

async function getStudentList(params){
  let res = await request({
    url: '/api/v1/student/getsimplelist',
    methods: 'get',
    params,
  });

  return res.data.error !== '' ? this.$notify.error({ title: '错误信息', message: res.data.error, }) : res.data; 
}

// food
async function getDeskList(params, _this){
  let res = await request({
    url: '/api/v1/seller/getdiningtable',
    methods: 'get',
    params,
  });

  return res.error !== '查询成功' ? this.$notify.error({ title: '错误信息', message: res.data.error, }) : res; 
}

async function createQRcode(data, _this){
  let res = await request({
    url: '/api/v1/seller/wxcode',
    method: 'post',
    data,
  }); 

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : res.data; 
}

async function addDesk(data, _this){
  let res = await request({
    url: '/api/v1/seller/adddiningtable',
    method: 'post',
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data,
  }); 
console.log('res',res)
  return res.error !== '添加成功' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : _this.$notify.success({ title: '提示', message: res.error, }); 
}

async function deleteDesk(params){
  let res = await request({
    url: '/api/v1/seller/deldiningtable',
    methods: 'get',
    params,
  });

  return res.error !== '删除成功' ? this.$notify.error({ title: '错误信息', message: res.data.error, }) : this.$notify.success({ title: '提示', message: res.error, }); 
}

async function updateDesk(data, _this){
  let res = await request({
    url: '/api/v1/seller/editdiningtable',
    method: 'post',
    data,
  }); 

  return res.error !== '修改成功' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : _this.$notify.success({ title: '提示', message: res.error, }); 
}

async function getOrderList(params, _this){
  let res = await request({
    url: '/api/v1/seller/order',
    methods: 'get',
    params,
  });

  return res.error !== '' ? this.$notify.error({ title: '错误信息', message: res.data.error, }) : res; 
}

async function getOrderDetail(params){
  let res = await request({
    url: '/api/v1/seller/order',
    methods: 'get',
    params,
  });

  return res.error !== '' ? this.$notify.error({ title: '错误信息', message: res.data.error, }) : res; 
}

async function updateOrderState(data, _this){
  let res = await request({
    url: '/api/v1/seller/orderstate',
    method: 'put',
    data,
  }); 

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : _this.$notify.success({ title: '提示', message: res.error, }); 
}

export default {
  setAddress,
  updateAddress,
  deleteAddress,
  getAddressList,
  setTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherList,
  getTeacherCoulse,
  getTeacherItemCourse,
  setCoulse,
  getCoulseList,
  deleteCoulse,
  getRealCoulseList,
  getStudentList,
  getDeskList,
  createQRcode,
  addDesk,
  updateDesk,
  deleteDesk,
  getOrderList,
  getOrderDetail,
  updateOrderState,
}
