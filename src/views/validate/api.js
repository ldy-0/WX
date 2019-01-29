import request from '@/utils/request'

// validate
async function setValidate(data, _this){
  let res = await request({
    url: '/api/v2/admin/storeinfo',
    method: 'post',
    data,
  });
  // console.log('res ', res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '添加成功' })// res.data; 
}

async function getValidateList(params, _this){
  let res = await request({
    url: '/api/v2/admin/storeinfo',
    methods: 'get',
    params,
  });

  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : res; 
}

async function getValidate(params, _this){
  let res = await request({
    url: `/api/v2/admin/admin`,
    methods: 'get',
    params,
  });

  return res.data.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : res.data.data; 
}

async function updateValidate(id, data, _this){
  let res = await request({
    url: `/api/v2/admin/storeinfo/${id}`,
    method: 'put',
    data,
  });
  // console.error('update ', res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '更新成功' })// res.data; 
}

async function deleteValidate(id, data, _this){
  let res = await request({
    url: `/api/v2/admin/storeinfo/${id}`,
    method: 'DELETE',
    data,
  });
  console.error('delete user', res.data);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '删除成功' })// res.data; 
}

export default {
  setValidate,
  getValidateList,
  getValidate,
  updateValidate,
  deleteValidate
}