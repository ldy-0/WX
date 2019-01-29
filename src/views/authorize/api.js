import request from '@/utils/request'

// user
async function setUser(data, _this){
  let res = await request({
    url: '/api/v2/seller/seller',
    method: 'post',
    data,
  });
  // console.log('res ', res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '添加成功' })// res.data; 
}

async function getUserList(params, _this){
  let res = await request({
    url: '/api/v2/seller/seller',
    methods: 'get',
    params,
  });

  // console.error(res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : res; 
}

async function getUser(params, _this){
  let res = await request({
    url: `/api/v2/seller/seller`,
    methods: 'get',
    params,
  });

  return res.data.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : res.data.data; 
}

async function updateUser(id, data, _this){
  let res = await request({
    url: `/api/v2/seller/seller/${id}`,
    method: 'put',
    data,
  });
  console.error('update ', res);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '更新成功' })// res.data; 
}

async function deleteUser(id, data, _this){
  let res = await request({
    url: `/api/v2/seller/seller/${id}?seller_id=${id}`,
    method: 'DELETE',
    data,
  });

  // console.error('delete user', res.data);
  return res.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.error, }) : _this.$notify.success({ title: '提示', message: '删除成功' })// res.data; 
}

async function getAuth(params, _this){
  let res = await request({
    url: `/api/v2/seller/auth`,
    methods: 'get',
    params,
  });

  return res.data.error !== '' ? _this.$notify.error({ title: '错误信息', message: res.data.error, }) : res.data.data; 
}

export default {
  setUser,
  getUserList,
  getUser,
  updateUser,
  deleteUser,
  getAuth
}