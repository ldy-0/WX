import req from '../common/request.js';

async function getOrderList(query, data, header){
	let res = await req.get(`/api/v2/member/order`, query, data, header);
	
	return res.data || res;
}

async function getOrder(id, query, data, header){
	let res = await req.get(`/api/v2/member/order/${id}`, query, data, header);
	
	return res.data || res;
}

async function submit(data, header, query){
	let res = await req.post(`/api/v2/member/order`, query, data, header);
	
	return res.data || res;
}

async function publicPay(data, header, query){
	let res = await req.put(`/api/v2/member/order/contrary`, query, data, header);
	
	return res.data || res;
}

async function changeOrder(id, data, header, query){
	let res = await req.put(`/api/v2/member/orderstate/${id}`, query, data, header);
	
	return res.data || res;
}

// 评价
async function evaluate(data, header, query){
	let res = await req.post(`/api/v2/member/goodsevaluate`, query, data, header);
	
	return res.data || res;
}

// 退款
async function getReasonList(query, data, header){
	let res = await req.get(`/api/v2/member/refundreason`, query, data, header);
	
	return res.data || res;
}

// 售后
async function getAftersaleList(query, data, header){
	let res = await req.get(`/api/v2/member/refundreturn`, query, data, header);
	
	return res.data || res;
}

// 申请售后
async function aftersale(data, header, query){
	let res = await req.post(`/api/v2/member/refundreturn`, query, data, header);
	
	return res.data || res;
}

async function cancelAftersale(id, data, header, query){
	let res = await req.put(`/api/v2/member/refundreturn/${id}`, query, data, header);
	
	return res.data || res;
}

// 发票
async function getInvoiceList(query, data, header){
	let res = await req.get(`/api/v2/member/invoice`, query, data, header);
	
	return res.data || res;
}

async function applyInvoice(data, header, query){
	let res = await req.post(`/api/v2/member/invoice`, query, data, header);
	
	return res.data || res;
}

export default {
	getOrderList,
	getOrder,
	submit,
	publicPay,
	changeOrder,

	evaluate,

	getInvoiceList,
	applyInvoice,

	getReasonList,
	getAftersaleList,
	aftersale,	
	cancelAftersale,
}