import request from '@/utils/request'

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
    url: `/api/v2/admin/admin/${id}?admin_id=${id}`,
    method: 'DELETE',
    data,
  });
  console.error('delete user', res.data);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '删除成功' })// res.data; 
}

async function getAuth(params, _this){
  let res = await request({
    url: `/api/v2/admin/auth`,
    methods: 'get',
    params,
  });

  return res.data.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : res.data.data; 
}

export default {
  setBanner,
  getBannerList,
  updateBanner,
  deleteBanner,
  setUser,
  getUserList,
  getUser,
  updateUser,
  deleteUser,
  getAuth
}