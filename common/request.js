const HOST =  'https://test1.whweiya.cn'; //'https://test17.healthsource.com.cn';

function toQueryString(query){
	if(query && typeof query == 'object'){
		return Object.keys(query).reduce((p, v, i) => i === 0 ? `?${v}=${query[v]}` : `${p}&${v}=${query[v]}`, '');
	}
	
	return '';
}

function get(url, query, data, head) {
  return request('GET', url, query, data, head);
}

function post(url, query, data, head) {
  return request('POST', url, query, data, head);
}

function put(url, query, data, head) {
  return request('PUT', url, query, data, head);
}

function del(url, query, data, head) {
  return request('DELETE', url, query, data, head);
}

function request(method, url, query, data, head){
	let header = {},
      token = uni.getStorageSync('token');

	if(token)	header.token = token;
		
	if(head && typeof head == 'object'){
		for(let k in head) header[k] = head[k];
	}
	
	if(!/^https?/.test(url)) url = `${HOST}${url}`;
	if(query && typeof query == 'object') url += toQueryString(query);
    
	let p = new Promise(resolve => {
		uni.request({
			url,
			method,
			header,
			data,
			success: res => resolve(res),
			fail:    err => resolve(err.message || err.errMsg),
			// complete(e){
			// 	console.error('complete', e);
			// }
		})
	});
	
	return p;
}

export default {
  get,
  post,
  put,
  del,
};