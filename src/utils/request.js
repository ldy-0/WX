import wepy from 'wepy';

// const DOMAIN = 'http://192.168.31.9:9527/';
// const DOMAIN = 'http://106.14.145.66:3000/';
const DOMAIN = 'http://101.37.30.205/';
// const DOMAIN = 'https://www.hi-zhan.com/';


async function get(url, params, contentType){
  let query = '';

  if(!/^http/.test(url)){

    url = DOMAIN + url;

  }

  if(typeof params === 'object'){

    for(let key in params){
      query += (query === '' ? '?' : '&') + key + '=' + params[key];
    }
    console.log(query);
  }

  const res = await wepy.request(url + query);

  return res.data;

}

async function post(url, params, contentType, responseType){

  if(!/^http/.test(url)){

    url = DOMAIN + url;

  }

  return new Promise(function(resolve, reject){

    wx.request({
      url: url,
      header: {
        'content-Type': contentType ? contentType : 'application/x-www-form-urlencoded',
      },
      data: params,
      method: 'POST',
      responseType: responseType ? responseType : 'text',
      success: res => resolve(res.data),
      fail: err => wx.showToast({ title: JSON.stringify(err), icon: 'none', }),
    });

  });

}

module.exports = {
  get,
  post,
  DOMAIN: 'http://101.37.30.205:3000',// 'https://www.hi-zhan.com', // // DOMAIN.substr(0, this.DOMAIN.length - 1) + ':3000',
};