import req from '../common/request.js';

// 分类
async function getClassList(query, data, header){
	let res = await req.get(`/api/v2/member/storegc`, query, data, header);
	
	return res.data || res;
}

// 商品
async function getGoodsList(query, data, header){
	let res = await req.get(`/api/v2/member/goodscommon`, query, data, header);
	
	return res.data || res;
}

async function getGoods(id, query, data, header){
	let res = await req.get(`/api/v2/member/goodscommon/${id}`, query, data, header);
	
	return res.data || res;
}

// 秒杀
async function getSeckillList(query, data, header){
	let res = await req.get(`/api/v2/member/seckill`, query, data, header);
	
	return res.data || res;
}

async function getSeckill(id, query, data, header){
	let res = await req.get(`/api/v2/member/seckill/${id}`, query, data, header);
	
	return res.data || res;
}

// 结算
async function checkout(data, header, query){
	let res = await req.post(`/api/v2/member/checkout`, query, data, header);
	
	return res.data || res;
}

// 购物车
async function getCartList(query, data, header){
	let res = await req.get(`/api/v2/member/cart`, query, data, header);
	
	return res.data || res;
}

async function addCart(data, header, query){
	let res = await req.post(`/api/v2/member/cart`, query, data, header);
	
	return res.data || res;
}

async function changeCart(id, data, header, query){
	let res = await req.put(`/api/v2/member/cart/${id}`, query, data, header);
	
	return res.data || res;
}

async function deleteCart(id, query, data, header){
	let res = await req.del(`/api/v2/member/cart/${id}`, query, data, header);
	
	return res.data || res;
}

async function getCommentList(query, data, header){
	let res = await req.get(`/api/v2/member/goodsevaluate`, query, data, header);
	
	return res.data || res;
}

export default {
	getClassList,

  getGoodsList,
	getGoods,

	getSeckillList,
	getSeckill,

	checkout,

	getCartList,
	addCart,
	changeCart,
	deleteCart,
	
	getCommentList,
}