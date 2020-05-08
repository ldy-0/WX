import req from '../common/request.js';

async function getBannerList(query, data, header){
	let res = await req.get(`/api/v2/member/banner`, query, data, header);
	
	return res.data || res;
}

async function getConfig(query, data, header){
	let res = await req.get('/api/v2/common/indexconfig', query, data, header);
	
	return res.data || res;
}

// 省市区
async function getArea(query, data, header){
	let res = await req.get(`/api/v2/member/area`, query, data, header);
	
	return res.data || res;
}

async function getFreeArea(id, query, data, header){
	let res = await req.get(`/api/v2/common/area/${id}`, query, data, header);
	
	return res.data || res;
}

// 短信验证码
async function getSms(data, header, query){
	let res = await req.post(`/api/v2/common/mobilecode`, query, data, header);
	
	return res.data || res;
}

// 图片上传
async function getImgKey(data, header, query){
	let res = await req.get(`/api/v2/common/imgkey`, query, data, header);
	
	return res.data || res;
}

export default {
	getBannerList,
	getConfig,

	getArea,
	getFreeArea,

	getSms,

	getImgKey,
}