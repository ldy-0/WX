import req from '../common/request.js';

async function getNewsList(query, data, header){
	let res = await req.get(`/api/v2/member/information`, query, data, header);
	
	return res.data || res;
}

async function getNews(id, query, data, header){
	let res = await req.get(`/api/v2/member/information/${id}`, query, data, header);
	
	return res.data || res;
}

export default {
	getNewsList,
	getNews,
}