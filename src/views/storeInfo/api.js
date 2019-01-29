import request from '@/utils/request'

// storeInfo
async function setStoreInfo(data, _this){
  let res = await request({
    url: '/api/v2/seller/storeinfo',
    method: 'post',
    data,
  });
  // console.log('res ', res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '添加成功' })// res.data; 
}

async function getStoreInfoList(params, _this){
  let res = await request({
    url: '/api/v2/seller/storeinfo',
    methods: 'get',
    params,
  });

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : res; 
}

async function getStoreInfo(params, _this){
  let res = await request({
    url: `/api/v2/seller/storeinfo`,
    methods: 'get',
    params,
  });

  // console.error(res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : res.data; 
}

async function updateStoreInfo(id, data, _this){
  let res = await request({
    url: `/api/v2/seller/storeinfo/${id}`,
    method: 'put',
    data,
  });
  console.error('update ', res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '更新成功' })// res.data; 
}

async function deleteStoreInfo(id, data, _this){
  let res = await request({
    url: `/api/v2/seller/storeinfo/${id}`,
    method: 'DELETE',
    data,
  });
  console.error('delete user', res.data);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '删除成功' })// res.data; 
}

export default {
  setStoreInfo,
  getStoreInfoList,
  getStoreInfo,
  updateStoreInfo,
  deleteStoreInfo
}