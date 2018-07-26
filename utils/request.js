import wepy from 'wepy';

// const DOMAIN = 'http://192.168.31.9:9527/';
const DOMAIN = 'http://106.14.145.66:3000/';
// const DOMAIN = 'https://www.hi-zhan.com/';

async function get(url, params, contentType){
  let query = '';

  if(typeof params === 'object'){

    for(let key in params){
      query += (query === '' ? '?' : '&') + key + '=' + params[key];
    }
    console.log(query);
  }

  const res = await wepy.request(DOMAIN + url + query);

  return res.data;

}

module.exports = {
  get,
};