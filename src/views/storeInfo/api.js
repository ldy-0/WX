import request from '@/utils/request'

// class 
async function setClass(data, _this) {
  let res = await request({
    url: '/api/v2/seller/storegc',
    method: 'post',
    data,
  });
  console.log('res ', res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error }) : _this.$notify.success({ title: '提示', message: '添加成功' })// res.data; 
}

async function updateClass(id, data, _this) {
  let res = await request({
    url: `/api/v2/seller/storegc/${id}`,
    method: 'put',
    data,
  });
  console.log('update address', res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error }) : _this.$notify.success({ title: '提示', message: '更新成功' })// res.data; 
}

async function deleteClass(id, data, _this) {
  let res = await request({
    url: `/api/v2/seller/storegc/${id}`,
    method: 'DELETE',
    data
  });
  console.log('delete address', res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error }) : _this.$notify.success({ title: '提示', message: '删除成功' })
}

async function getClassList(params, _this) {
  let res = await request({
    url: '/api/v2/seller/storegc',
    methods: 'get',
    params,
  });

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : res; 
}

async function setGoods(data, _this){
  let res = await request({
    url: '/api/v2/seller/goodscommon',
    method: 'post',
    data,
  });
  console.log('res ', res);
  return res.data.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : _this.$notify.success({ title: '提示', message: '添加成功' })// res.data; 
}

async function getGoodsList(params, _this){
  let res = await request({
    url: '/api/v2/seller/goodscommon',
    methods: 'get',
    params,
  });

  return res.data.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : res.data; 
}

async function getGoods(id, params, _this){
  let res = await request({
    url: `/api/v2/seller/goodscommon/${id}`,
    methods: 'get',
    params,
  });

  return res.data.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : res.data.data; 
}

async function updateGoods(id, data, _this){
  let res = await request({
    url: `/api/v2/seller/goodscommon/${id}`,
    method: 'put',
    data,
  });
  console.log('update address', res);
  return res.data.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : _this.$notify.success({ title: '提示', message: '更新成功' })// res.data; 
}

async function deleteGoods(id, data, _this){
  let res = await request({
    url: `/api/v2/seller/goodscommon/${id}`,
    method: 'DELETE',
    data,
  });
  console.log('delete address', res);
  return res.data.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : _this.$notify.success({ title: '提示', message: '删除成功' })// res.data; 
}

async function setGoodsStatus(data, _this){
  let res = await request({
    url: `/api/v2/seller/goodscommon/setting`,
    method: 'PUT',
    data,
  });
  console.log('上下架', res);
  return res.data.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : _this.$notify.success({ title: '提示', message: '修改成功' })// res.data; 
}

// 设计师+易居学院
async function setAcademy(data, _this){
  let res = await request({
    url: '/api/v2/seller/academy',
    method: 'post',
    data,
  });
  console.log('res ', res);
  return res.data.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : _this.$notify.success({ title: '提示', message: '添加成功' })// res.data; 
}

async function getAcademyList(params, _this){
  let res = await request({
    url: '/api/v2/seller/academy',
    methods: 'get',
    params,
  });

  return res.data.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : res.data; 
}

async function updateAcademy(id, data, _this){
  let res = await request({
    url: `/api/v2/seller/academy/${id}`,
    method: 'put',
    data,
  });
  console.log('update address', res);
  return res.data.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : _this.$notify.success({ title: '提示', message: '更新成功' })// res.data; 
}

async function deleteAcademy(id, data, _this){
  let res = await request({
    url: `/api/v2/seller/academy/${id}`,
    method: 'DELETE',
    data,
  });
  console.log('delete address', res);
  return res.data.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : _this.$notify.success({ title: '提示', message: '删除成功' })// res.data; 
}

async function getAcademy(id, params, _this){
  let res = await request({
    url: `/api/v2/seller/academy/${id}`,
    methods: 'get',
    params,
  });

  return res.data.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : res.data.data; 
}

// 半包
async function updateCustommade(data, _this){
  let res = await request({
    url: '/api/v2/seller/custommade',
    method: 'post',
    data,
  });
  console.log('res ', res);
  return res.data.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : _this.$notify.success({ title: '提示', message: '修改成功' })// res.data;
}

async function getCustommadeList(params, _this){
  let res = await request({
    url: '/api/v2/seller/custommade',
    methods: 'get',
    params,
  });

  return res.data.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : res.data; 
}

async function setBanner(data, _this){
  let res = await request({
    url: '/api/v2/seller/banner',
    method: 'post',
    data,
  });
  console.log('res ', res);
  return res.data.error !== 'ok' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : _this.$notify.success({ title: '提示', message: '添加成功' })// res.data; 
}

async function getBannerList(params, _this){
  let res = await request({
    url: '/api/v2/seller/banner',
    methods: 'get',
    params,
  });

  return res.data.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : res.data; 
}

async function updateBanner(id, data, _this){
  let res = await request({
    url: `/api/v2/seller/banner/${id}`,
    method: 'put',
    data,
  });
  console.log('update address', res);
  return res.data.error !== '修改成功' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : _this.$notify.success({ title: '提示', message: '更新成功' })// res.data; 
}

async function deleteBanner(id, data, _this){
  let res = await request({
    url: `/api/v2/seller/banner/${id}`,
    method: 'DELETE',
    data,
  });
  console.log('delete address', res);
  return res.data.error !== '删除成功' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : _this.$notify.success({ title: '提示', message: '删除成功' })// res.data; 
}

// user
async function setUser(data, _this){
  let res = await request({
    url: '/api/v2/admin/admin',
    method: 'post',
    data,
  });
  // console.log('res ', res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '添加成功' })// res.data; 
}

async function getUserList(params, _this){
  let res = await request({
    url: '/api/v2/admin/admin',
    methods: 'get',
    params,
  });

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : res; 
}

async function getUser(params, _this){
  let res = await request({
    url: `/api/v2/admin/admin`,
    methods: 'get',
    params,
  });

  return res.data.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : res.data.data; 
}

async function updateUser(id, data, _this){
  let res = await request({
    url: `/api/v2/admin/admin/${id}`,
    method: 'put',
    data,
  });
  console.error('update ', res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '更新成功' })// res.data; 
}

async function deleteUser(id, data, _this){
  let res = await request({
    url: `/api/v2/admin/admin/${id}`,
    method: 'DELETE',
    data,
  });
  console.error('delete user', res.data);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '删除成功' })// res.data; 
}

export default {
  getClassList,
  setClass,
  updateClass,
  deleteClass,
  setGoods,
  getGoodsList,
  getGoods,
  updateGoods,
  deleteGoods,
  setGoodsStatus,
  setAcademy,
  getAcademyList,
  updateAcademy,
  deleteAcademy,
  getAcademy,
  updateCustommade,
  getCustommadeList,
  setBanner,
  getBannerList,
  updateBanner,
  deleteBanner,
  setUser,
  getUserList,
  getUser,
  updateUser,
  deleteUser
}