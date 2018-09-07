import wepy from 'wepy';

// const DOMAIN = 'http://106.14.145.66:3000/';
// const DOMAIN = 'http://101.37.30.205/';
// const DOMAIN = 'http://121.42.184.125:88';
const DOMAIN = 'http://101.37.30.205:3003';


async function get(url, params, header, responseType){
  let query = '',
      headerConfig = {
    'content-Type': 'application/x-www-form-urlencoded',
  };

  if(!/^http/.test(url)){

    url = DOMAIN + url;

  }

  if(typeof params === 'object'){ // && header['content-Type'] !== 'application/json'

    for(let key in params){
      query += (query === '' ? '?' : '&') + key + '=' + params[key];
    }
    console.log(query);
  }

  if(header){

    for(let key in header){
      headerConfig[key] = header[key];
    }

  }

  return new Promise(function(resolve, reject){

    wx.request({
      url: url,
      header: headerConfig,
      data: params,
      method: 'GET',
      responseType: responseType ? responseType : 'text',
      success: res => resolve(res.data),
      fail: err => wx.showToast({ title: JSON.stringify(err), icon: 'none', }),
    });

  });

}

async function put(url, params, header, responseType){

  let headerConfig = {
    'content-Type': 'application/x-www-form-urlencoded',
  };

  if(!/^http/.test(url)){

    url = DOMAIN + url;

  }

  if(header){

    for(let key in header){
      headerConfig[key] = header[key];
    }

  }
  

  return new Promise(function(resolve, reject){

    wx.request({
      url: url,
      header: headerConfig,
      // {
      //   'content-Type': contentType ? contentType : 'application/x-www-form-urlencoded',
      // },
      data: params,
      method: 'PUT',
      responseType: responseType ? responseType : 'text',
      success: res => resolve(res.data),
      fail: err => wx.showToast({ title: JSON.stringify(err), icon: 'none', }),
    });

  });

}

async function post(url, params, header, responseType){

  let headerConfig = {
    'content-Type': 'application/x-www-form-urlencoded',
  };

  if(!/^http/.test(url)){

    url = DOMAIN + url;

  }

  if(header){

    for(let key in header){
      headerConfig[key] = header[key];
    }

  }

  return new Promise(function(resolve, reject){

    wx.request({
      url: url,
      header: headerConfig,
      // {
      //   'content-Type': contentType ? contentType : 'application/x-www-form-urlencoded',
      // },
      data: params,
      method: 'POST',
      responseType: responseType ? responseType : 'text',
      success: res => resolve(res.data),
      fail: err => wx.showToast({ title: JSON.stringify(err), icon: 'none', }),
    });

  });

}

async function del(url, params, header, responseType){

  let headerConfig = {
    'content-Type': 'application/x-www-form-urlencoded',
  };

  if(!/^http/.test(url)){

    url = DOMAIN + url;

  }

  if(header){

    for(let key in header){
      headerConfig[key] = header[key];
    }

  }
  

  return new Promise(function(resolve, reject){

    wx.request({
      url: url,
      header: headerConfig,
      // {
      //   'content-Type': contentType ? contentType : 'application/x-www-form-urlencoded',
      // },
      data: params,
      method: 'DELETE',
      responseType: responseType ? responseType : 'text',
      success: res => resolve(res.data),
      fail: err => wx.showToast({ title: JSON.stringify(err), icon: 'none', }),
    });

  });

}

function toQueryString(paramObj){
  let query = '';

  for(let key in paramObj){
    query += (query === '' ? '?' : '&') + key + '=' + paramObj[key];
  }

  return query;
}

module.exports = {
  get,
  post,
  put,
  delete: del,
  DOMAIN: '121.42.184.125:88'// 'http://101.37.30.205:3000',// 'https://www.hi-zhan.com', 
};