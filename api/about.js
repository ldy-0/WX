import req from '../common/request.js';

// 平台简介
async function getCompany(query, data, header){
	let res = await req.get('/api/v2/member/company', query, data, header);
	
	return res.data || res;
}

// 分享链接
async function getLink(query, data, header){
	let res = await req.get('/api/v2/member/link', query, data, header);
	
	return res.data || res;
}

export default {
	getCompany,
	
	getLink,
}