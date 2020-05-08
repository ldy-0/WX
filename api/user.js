import req from '../common/request.js';

// 
async function login(data, header, query){
	let res = await req.post(`/api/v2/member/login`, query, data, header);
	
	return res.data || res;
}

async function register(data, header, query){
	let res = await req.post(`/api/v2/member/audit`, query, data, header);
	
	return res.data || res;
}

// 修改密码
async function changePwd(data, header, query){
	let res = await req.post(`/api/v2/member/smsmobile`, query, data, header);
	
	return res.data || res;
}

async function getInfo(query, data, header){
  let res = await req.get(`/api/v2/member/memberinfo`, query, data, header);

	return res.data || res;
}

// 修改头像
async function setInfo(data, header, query){
  let res = await req.post(`/api/v2/member/memberinfo`, query, data, header);

	return res.data || res;
}

// 地址
async function getAddressList(query, data, header){
	let res = await req.get(`/api/v2/member/address`, query, data, header);
	
	return res.data || res;
}

async function addAddress(data, header, query){
	let res = await req.post(`/api/v2/member/address`, query, data, header);
	
	return res.data || res;
}

async function setAddress(id, data, header, query){
	let res = await req.put(`/api/v2/member/address/${id}`, query, data, header);
	
	return res.data || res;
}

async function deleteAddress(id, data, header, query){
	let res = await req.del(`/api/v2/member/address/${id}`, query, data, header);
	
	return res.data || res;
}

export default {
	login,
	register,
	changePwd,
	getInfo,
	setInfo,

  getAddressList,
  addAddress,
  setAddress,
  deleteAddress,
}