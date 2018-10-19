import request from './request.js';

const token = wx.getStorageSync('token');
/**
 * 
 * @param {String} code 
 */
async function getToken(code){

  let res = await request.post('/api/v2/member/login', { code });

  if(res.error !== ''){
    return wx.showModal( {title: '提示', content: res.error, showCancel: false, } );
  } 

  wx.setStorageSync('token', res.data.token);
  return res.data.token;
}

/**
 * 
 * @param {Object} params 
 */
async function setUserInfo(params){

  let res = await request.post('/api/v2/member/memberinfo', params, {
      'token': wx.getStorageSync('token'),
  });

  if(res.error !== ''){
    return wx.showModal( {title: '提示', content: res.error, showCancel: false, } );
  }

  return res.data;

}

async function setPhone(params){

  let res = await request.post('/api/v2/member/telephone', params, {
      'token': wx.getStorageSync('token'),
      // 'content-Type': 'application/json'
  });

  if(res.error !== ''){
    return wx.showModal( {title: '提示', content: res.error, showCancel: false, } );
  }

  return res.data.telephone;

}

async function getUserInfo(params){
  
  let res = await request.get('/api/v2/member/memberinfo', params, {
      'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

// Address
// 省市区数据
async function getAddressInfo(params){
  
  let res =await request.get('/api/v2/admin/area', params, {
      'token': wx.getStorageSync('token'),
  });

  if(res.error !== ''){
    return wx.showModal( {title: '提示', content: res.error, showCancel: false, } );
  }

  return res.data;
  
}

async function setAddress(params){

  let res = await request.post('/api/v2/member/address', params, {
      'token': wx.getStorageSync('token'),
  });

  if(res.error !== ''){
    return wx.showModal( {title: '提示', content: res.error, showCancel: false, } );
  }

  return res.data;
}
// 
/**
 * 
 * 获取地址列表或默认地址
 * @param {Object} params 
 * page, limit, address_is_default
 */
async function getAddressList(params){

  let res = await request.get('/api/v2/member/address', params, {
      'token': wx.getStorageSync('token'),
  });

  if(res.error !== ''){
    return wx.showModal( {title: '提示', content: res.error, showCancel: false, } );
  }

  return res.data;
}

async function getDefaultAddress(params){
  let res = await request.get('/api/v2/member/address', params, {
    'token': wx.getStorageSync('token'),
    'content-Type': 'application/json',
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

async function updateAddress(id, params){

  let res = await request.put('/api/v2/member/address/' + id, params, {
      'token': wx.getStorageSync('token'),
  });

  if(res.error !== ''){
    return wx.showModal( {title: '提示', content: res.error, showCancel: false, } );
  }

  return res.data;
}

async function deleteAddress(id){
  let res = await request.delete('/api/v2/member/address/' + id, null, {
      'token': wx.getStorageSync('token'),
  });

  if(res.error !== ''){
    return wx.showModal( {title: '提示', content: res.error, showCancel: false, } );
  }

  return res.data;
}

// home
async function getBanner(params){
  let res = await request.get(`/api/v2/member/banner`, params, {
      'token': wx.getStorageSync('token'),
  });

  if(res.error !== ''){
    return wx.showModal({ title: '提示', content: res.error, showCancel: false, });
  }

  return res.data;

}

// async function getActive(params){
//   let res = await request.get('/api/v2/member/activity', params, {
//       'token': wx.getStorageSync('token'),
//   });

//   return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res;
// }

// async function getSeckill(params){
//   let res = await request.get('/api/v2/member/seckill', params, {
//       'token': wx.getStorageSync('token'),
//   });

//   return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res;
// }

// goods 
async function getGoodsClass(id, params){

  let res = await request.get(`/api/v2/member/storegc/${id}`, params, {
      'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

async function getGoodsList(params){

  let res = await request.get('/api/v2/member/goodscommon', params, {
      'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res;

}

// async function getStore(id, params){

//   let res = await request.get(`/api/v2/member/storeinfo/${id}`, null, {
//       'token': wx.getStorageSync('token'),
//   });

//   return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;

// }

// async function getBusinessCouponList(id, params){

//   let res = await request.get(`/api/v2/member/Coupon/${id}`, null, {
//     'token': wx.getStorageSync('token'),
//   });

//   return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
// }


// goods
async function getGoods(id, params){

  let res = await request.get(`/api/v2/member/goodscommon/${id}`, params, {
      'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

// async function getPayMethod(id, params){

//   let res = await request.get(`/api/v2/member/payment/${id}`, params, {
//       'token': wx.getStorageSync('token'),
//   });

//   return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
// }

async function submitOrder(params){

  let res = await request.post(`/api/v2/member/order`, params, {
      'token': wx.getStorageSync('token'),
      'content-Type': 'application/json',
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

async function payOrder(paySign, params){

  let res = await request.put(`/api/v2/member/order/${paySign}`, params, {
      'token': wx.getStorageSync('token'),
  });


  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

async function assess(params){

  let res = await request.post('/api/v2/member/goodsevaluate', params, {
      'token': wx.getStorageSync('token'),
      'content-Type': 'application/json',
  });


  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

// shoppingCart
async function addCart(params){

  let res = await request.post('/api/v2/member/cart', params, {
      'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

async function getCartList(params){

  let res = await request.get('/api/v2/member/cart', params, {
      'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

async function updateCart(id, params){
  
  let res = await request.put(`/api/v2/member/cart/${id}`, params, {
      'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

async function deleteCart(id, params){
  
  let res = await request.delete(`/api/v2/member/cart/${id}`, params, {
      'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

async function checkout(params){

  let res = await request.post('/api/v2/member/checkout', params, {
      'token': wx.getStorageSync('token'),
      'content-Type': 'application/json'
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

// my
// async function getBuyInfo(params){

//   let res = await request.get('/api/v2/member/gradeorder', params, {
//     'token': wx.getStorageSync('token'),
//   });

//   return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
// }

// async function buy(params){

//   let res = await request.post('/api/v2/member/gradeorder', params, {
//     'token': wx.getStorageSync('token'),
//   });

//   return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
// }

async function getOrderList(params){

  let res = await request.get('/api/v2/member/order', params, {
    'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res;
}

async function getOrderInfo(id, params){

  let res = await request.get(`/api/v2/member/order/${id}`, params, {
    'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data[0];
}


async function setOrderStatus(type, params){

  let res = await request.put(`/api/v2/member/orderstate/${type}`, params, {
    'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

async function getCommentList(params){

  let res = await request.get('/api/v2/member/goodsevaluate', params, {
    'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res;

}

async function getHelp(params){

  let res = await request.get('/api/v2/member/help', params, {
    'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

async function setCustommadeinfo(params){

  let res = await request.post('/api/v2/member/custommadeinfo', params, {
    'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

async function getCustommadeinfo(params){

  let res = await request.get('/api/v2/member/custommadeinfo', params, {
    'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

// refund
async function setRefund(params){

  let res = await request.post('/api/v2/member/refundreturn', params, {
    'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

// afterService
async function getAfterServiceList(params){

  let res = await request.get('/api/v2/member/refundreturn', params, {
    'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res;

}

async function getAfterService(id, params){

  let res = await request.get(`/api/v2/member/refundreturn/${id}`, params, {
    'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;

}

async function cancelRefund(id, params){

  let res = await request.put('/api/v2/member/refundreturn/' + id, params, {
    'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

// article
async function getArticleList(params){

  let res = await request.get('/api/v2/member/academy', params, {
    'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res;

}

async function getArticle(id, params){

  let res = await request.get(`/api/v2/member/academy/${id}`, params, {
    'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;

}

export default {
  getToken,
  setUserInfo,
  setPhone,
  getUserInfo,
  getAddressInfo, // address
  setAddress,
  getAddressList,
  getDefaultAddress,
  updateAddress,
  deleteAddress,
  getBanner, // home
  // getActive,
  // getSeckill,
  getGoodsList, // food
  getGoodsClass,
  // getStore,
  // getBusinessCouponList,
  getGoods, // goods
  // getPayMethod,
  submitOrder,
  payOrder,
  assess,
  addCart, // shoppingCart
  getCartList,
  updateCart,
  deleteCart,
  checkout,
  // getBuyInfo, // my
  // buy,
  getOrderList,
  getOrderInfo,
  setOrderStatus,
  getCommentList,
  getHelp,
  setCustommadeinfo,
  getCustommadeinfo,
  setRefund,
  getAfterServiceList,
  getAfterService,
  cancelRefund,
  getArticleList,
  getArticle,
}