import request from '@/utils/request'

async function getStoreList(params, _this){
  let res = await request({
    url: '/api/v2/admin/store',
    methods: 'get',
    params,
  });

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : res.data || []; 
}

async function getServiceList(params, _this){
  let res = await request({
    url: '/api/v2/common/storegc',
    methods: 'get',
    params,
  });

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : res.data || []; 
}

// comment
async function setComment(data, _this){
  let res = await request({
    url: '/api/v2/admin/goodsevaluate',
    method: 'post',
    data,
  });
  // console.log('res ', res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '添加成功' })// res.data; 
}

async function getCommentList(params, _this){
  let res = await request({
    url: '/api/v2/admin/goodsevaluate',
    methods: 'get',
    params,
  });

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : res; 
}

async function getComment(id, params, _this){
  let res = await request({
    url: `/api/v2/admin/goodsevaluate/${id}`,
    methods: 'get',
    params,
  });

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error || res.data.error, }) : res.data; 
}

async function updateComment(id, data, _this){
  let res = await request({
    url: `/api/v2/admin/goodsevaluate/${id}`,
    method: 'put',
    data,
  });
  console.error('update ', res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '更新成功' })// res.data; 
}

async function deleteComment(id, data, _this){
  let res = await request({
    url: `/api/v2/admin/goodsevaluate/${id}`,
    method: 'DELETE',
    data,
  });
  // console.error('delete user', res.data);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '删除成功' })// res.data; 
}

export default {
  getStoreList,
  getServiceList,
  setComment,
  getCommentList,
  getComment,
  updateComment,
  deleteComment,
}