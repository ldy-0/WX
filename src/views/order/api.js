import request from '@/utils/request'

// order 
async function setOrder(data, _this){
  let res = await request({
    url: '/api/v2/admin/admin',
    method: 'post',
    data,
  });
  // console.log('res ', res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '添加成功' })// res.data; 
}

async function getOrderList(params, _this){
  let res = await request({
    url: '/api/v2/admin/order',
    methods: 'get',
    params,
  });

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : res; 
}

async function getOrder(id, params, _this){
  let res = await request({
    url: `/api/v2/admin/order/${id}`,
    methods: 'get',
    params,
  });

  return res.data.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : res.data.data; 
}

async function updateOrder(id, data, _this){
  let res = await request({
    url: `/api/v2/admin/admin/${id}`,
    method: 'put',
    data,
  });
  console.error('update ', res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '更新成功' })// res.data; 
}

async function deleteOrder(id, data, _this){
  let res = await request({
    url: `/api/v2/admin/order/${id}`,
    method: 'DELETE',
    data,
  });
  console.error('delete user', res.data);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '删除成功' })// res.data; 
}

async function getStoreList(params, _this){
  let res = await request({
    url: '/api/v2/admin/store',
    methods: 'get',
    params,
  });

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : res; 
}

async function getServiceList(params, _this){
  let res = await request({
    url: '/api/v2/common/storegc',
    methods: 'get',
    params,
  });

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : res; 
}

export default {
  setOrder,
  getOrderList,
  getOrder,
  updateOrder,
  deleteOrder,
  getStoreList,
  getServiceList,
}