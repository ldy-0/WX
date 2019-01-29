import request from '@/utils/request'

// stylist 
async function setStylist(data, _this){
  let res = await request({
    url: '/api/v2/seller/goodscommon',
    method: 'post',
    data,
  });
  // console.log('res ', res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '添加成功' })// res.data; 
}

async function getStylistList(params, _this){
  let res = await request({
    url: '/api/v2/seller/goodscommon',
    methods: 'get',
    params,
  });

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : res; 
}

async function getStylist(id, params, _this){
  let res = await request({
    url: `/api/v2/seller/goodscommon/${id}`,
    methods: 'get',
    params,
  });

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : res.data; 
}

async function updateStylist(id, data, _this){
  let res = await request({
    url: `/api/v2/seller/goodscommon/${id}`,
    method: 'put',
    data,
  });
  console.error('update ', res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '更新成功' })// res.data; 
}

async function updateStylistState(id, data, _this){
  let res = await request({
    url: `/api/v2/seller/goodscommon/setting`,
    method: 'put',
    data,
  });
  console.error('update ', res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '更新成功' })// res.data; 
}

async function deleteStylist(id, data, _this){
  let res = await request({
    url: `/api/v2/seller/goodscommon/${id}`,
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

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : res.data; 
}


export default {
  setStylist,
  getStylistList,
  getStylist,
  updateStylist,
  updateStylistState,
  deleteStylist,
  getServiceList,
}