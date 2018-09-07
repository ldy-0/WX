import request from './request.js';

const token = wx.getStorageSync('token');
const appid = 13;

async function getCarousels(params){

  let res = await request.get(`/api/v2/contexts/${appid}/carousels`, params);

  // if(res.error !== ''){
  //   return wx.showModal( {title: '提示', content: res.error, showCancel: false, } );
  // } 

  return res.result[0].data;
}

async function getVideo(params){

  let res = await request.get(`/api/v2/contexts/${appid}/videos`, params);

  // if(res.error !== ''){
  //   return wx.showModal( {title: '提示', content: res.error, showCancel: false, } );
  // }

  return res.result;

}

async function getVideoList(params){
  
  let res = await request.get(`/api/v2/contexts/${appid}/videos`, params);

  return res.result;
}

async function getDetailList(params){
  let res = await request.get(`/api/v2/contexts/${appid}/detail`, params, {
    'content-Type': 'application/json',
  });

  return res.result;
}

async function getDetail(id, params){
  let res = await request.get(`/api/v2/contexts/${appid}/detail/${id}`, params);

  return res.result;

}

async function getSection(params){

  let res = await request.get(`/api/v2/contexts/${appid}/section`, params, {
      'token': wx.getStorageSync('token'),
  });

  return res.result[0];

}

async function getNewsList(params){

  let res = await request.get(`/api/v2/contexts/${appid}/news`, params);

  return res.result;
}
// advert 
async function setAdvert(params){

  let res = await request.post(`/api/v2/contexts/${appid}/visitors`, params, {
    'content-Type': 'application/json',
  });

  return res;
}
// 




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
async function getBanner(){
  let res = await request.get('/api/v2/member/banner', null, {
      'token': wx.getStorageSync('token'),
  });

  if(res.error !== ''){
    return wx.showModal({ title: '提示', content: res.error, showCancel: false, });
  }

  return res.data;

}

async function getActive(params){
  let res = await request.get('/api/v2/member/activity', params, {
      'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res;
}

async function getSeckill(params){
  let res = await request.get('/api/v2/member/seckill', params, {
      'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res;
}

// food
async function getStoreClass(params){

  let res = await request.get('/api/v2/member/storeclass', params, {
      'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

async function getStoreList(params){

  let res = await request.get('/api/v2/member/store', params, {
      'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res;

}

async function getStore(id, params){

  let res = await request.get(`/api/v2/member/storeinfo/${id}`, null, {
      'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;

}

async function getBusinessCouponList(id, params){

  let res = await request.get(`/api/v2/member/Coupon/${id}`, null, {
    'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

async function getBusinessCommnetList(params){

  let res = await request.get('/api/v1/member/goodsevaluate', params, {
    'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

async function getGoods(id, params){

  let res = await request.get(`/api/v2/member/goodscommon/${id}`, params, {
      'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

async function getPayMethod(id, params){

  let res = await request.get(`/api/v2/member/payment/${id}`, params, {
      'token': wx.getStorageSync('token'),
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
async function getOrderList(params){

  let res = await request.get('', params, {
    'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

async function getOrderInfo(id, params){

  let res = await request.get('', params, {
    'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;
}

async function getCommentList(params){

  let res = await request.get('', params, {
    'token': wx.getStorageSync('token'),
  });

  return res.error !== '' ? wx.showModal({ title: '提示', content: res.error, showCancel: false, }) : res.data;

}

export default {
  getCarousels, //home
  getVideo,
  getVideoList,
  getDetailList,
  getDetail,
  getSection, // introduction
  getNewsList,
  setAdvert, // advert
  updateAddress,
  deleteAddress,
  getBanner, // home
  getActive,
  getSeckill,
  getStoreList, // food
  getStoreClass,
  getStore,
  getBusinessCouponList,
  getBusinessCommnetList,
  getGoods,
  getPayMethod,
  addCart, // shoppingCart
  getCartList,
  updateCart,
  deleteCart,
  checkout,
  getOrderList,
  getOrderInfo,
  getCommentList,
}