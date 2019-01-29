import request from '@/utils/request'

// store
async function setStore(data, _this){
  let res = await request({
    url: '/api/v2/admin/store',
    method: 'post',
    data,
  });
  // console.log('res ', res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '添加成功' })// res.data; 
}

async function getStoreList(params, _this){
  let res = await request({
    url: '/api/v2/admin/store',
    methods: 'get',
    params,
  });

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : res; 
}

async function getStore(id, params, _this){
  let res = await request({
    url: `/api/v2/admin/store/${id}`,
    methods: 'get',
    params,
  });

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : res.data; 
}

async function updateStore(id, data, _this){
  let res = await request({
    url: `/api/v2/admin/store/${id}`,
    method: 'put',
    data,
  });
  // console.error('update ', res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '更新成功' })// res.data; 
}

async function updateStoreState(id, data, _this){
  let res = await request({
    url: `/api/v2/admin/store/${id}/setting`,
    method: 'put',
    data,
  });
  console.error('update ', res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '更新成功' })// res.data; 
}

async function deleteStore(id, data, _this){
  let res = await request({
    url: `/api/v2/admin/store/${id}`,
    method: 'DELETE',
    data,
  });
  console.error('delete user', res.data);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '删除成功' })// res.data; 
}

async function getServiceList(params, _this){
  let res = await request({
    url: '/api/v2/common/storegc',
    methods: 'get',
    params,
  });

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : res || []; 
}

async function getCommentList(params, _this){
  let res = await request({
    url: '/api/v2/admin/goodsevaluate',
    methods: 'get',
    params,
  });

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : res; 
}

export default {
  setStore,
  getStoreList,
  getStore,
  updateStore,
  updateStoreState,
  deleteStore,
  getServiceList,
  getCommentList,
}