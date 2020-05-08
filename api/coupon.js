import req from '../common/request.js';

// 用户优惠券列表
async function getList(query, data, header){
	let res = await req.get(`/api/v2/member/coupon`, query, data, header);
	
	return res.data || res;
}

// 优惠券列表
async function getAllList(query, data, header){
	let res = await req.get(`/api/v2/member/coupon/search`, query, data, header);
	
	return res.data || res;
}

// 订单可用优惠券
async function getValidList(id, query, data, header){
	let res = await req.get(`/api/v2/member/coupon/${id}`, query, data, header);
	
	return res.data || res;
}

async function accept(data, header, query){
	let res = await req.post(`/api/v2/member/coupon`, query, data, header);
	
	return res.data || res;
}

export default {
  getList,
	getAllList,
	getValidList,
	
	accept,
}