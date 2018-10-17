
const DOMAIN = process.env.NODE_ENV === 'development' ? 'http://132.232.75.240:88' : 'http://www.yijulifehall.com';

console.log('process.env', process.env.NODE_ENV, DOMAIN)

async function get (url, params, header, responseType) {
  let query = ''
  let headerConfig = {
    'content-Type': 'application/x-www-form-urlencoded'
  }

  if (!/^http/.test(url)) {
    url = DOMAIN + url
  }

  if (typeof params === 'object') { // && header['content-Type'] !== 'application/json'

    for (let key in params) {
      query += (query === '' ? '?' : '&') + key + '=' + params[key]
    }
    console.log(query)
  }

  if (header) {
    for (let key in header) {
      headerConfig[key] = header[key]
    }
  }

  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      header: headerConfig,
      data: params,
      method: 'GET',
      responseType: responseType ? responseType : 'text',
      success: res => resolve(res.data),
      fail: err => wx.showToast({ title: JSON.stringify(err), icon: 'none' })
    })
  })
}

async function put (url, params, header, responseType) {
  let headerConfig = {
    'content-Type': 'application/x-www-form-urlencoded'
  }

  if (!/^http/.test(url)) {
    url = DOMAIN + url
  }

  if (header) {
    for (let key in header) {
      headerConfig[key] = header[key]
    }
  }

  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      header: headerConfig,
      data: params,
      method: 'put',
      responseType: responseType ? responseType : 'text',
      success: res => resolve(res.data),
      fail: err => wx.showToast({ title: JSON.stringify(err), icon: 'none' })
    })
  })
}

async function post (url, params, header, responseType) {

  let headerConfig = {
    'content-Type': 'application/x-www-form-urlencoded',
  }

  if (!/^http/.test (url) ) {

    url = DOMAIN + url

  }

  if (header) {

    for (let key in header) {
      headerConfig[key] = header[key]
    }

  }

  return new Promise (function (resolve, reject) {

    wx.request ({
      url: url,
      header: headerConfig,
      // {
      //   'content-Type': contentType ? contentType : 'application/x-www-form-urlencoded',
      // },
      data: params,
      method: 'POST',
      responseType: responseType ? responseType : 'text',
      success: res => resolve (res.data) ,
      fail: err => wx.showToast ({ title: JSON.stringify (err) , icon: 'none', }) ,
    }) 

  }) 

}

async function del (url, params, header, responseType) {

  let headerConfig = {
    'content-Type': 'application/x-www-form-urlencoded',
  }

  if (!/^http/.test (url) ) {

    url = DOMAIN + url

  }

  if (header) {

    for (let key in header) {
      headerConfig[key] = header[key]
    }

  }
  

  return new Promise (function (resolve, reject) {

    wx.request ({
      url: url,
      header: headerConfig,
      // {
      //   'content-Type': contentType ? contentType : 'application/x-www-form-urlencoded',
      // },
      data: params,
      method: 'DELETE',
      responseType: responseType ? responseType : 'text',
      success: res => resolve (res.data) ,
      fail: err => wx.showToast ({ title: JSON.stringify (err) , icon: 'none', }) ,
    }) 

  }) 

}

function toQueryString (paramObj) {
  let query = ''

  for (let key in paramObj) {
    query +=  (query === '' ? '?' : '&')  + key + '=' + paramObj[key]
  }

  return query
}

export default {
  get,
  post,
  put,
  delete: del,
  DOMAIN: '121.42.184.125:88'// 'http://101.37.30.205:3000',// 'https://www.hi-zhan.com', 
}