import req from '../common/request.js';

// 提现
async function getWithdrawList(query, data, header){
	let res = await req.get(`/api/v2/member/memberwithdraw`, query, data, header);
	
	return res.data || res;
}

async function withdraw(data, header, query){
	let res = await req.post(`/api/v2/member/memberwithdraw`, query, data, header);
	
	return res.data || res;
}

// 收益
async function getIncomeList(query, data, header){
	let res = await req.get(`/api/v2/member/salercommission`, query, data, header);
	
	return res.data || res;
}

// 团队
async function getGroupList(id, query, data, header){
	let res = await req.get(`/api/v2/member/memberinfo/${id}`, query, data, header);
	
	return res.data || res;
}

export default {
	getWithdrawList,
	withdraw,

	getIncomeList,

	getGroupList,	
}