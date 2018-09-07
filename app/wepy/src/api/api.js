import wepy from 'wepy';
/**
 * 网络请求配置
 */

//host地址
//const host = 'http://mall.qinyuan.cn/';//todo 上线修改为https
// const host = 'https://temp.healthsource.com.cn/';
// const host = 'http://47.100.250.46/';
// const host = 'http://47.100.41.165/';
const host = "https://uatapi.handeson.com/";
// const host = "http://uatapi.handeson.com/";
// const host = 'https://uat.handeson.com/';
// const host = "https://hwapi.handeson.com/";
// var healthsource = 'hi_mall';
const healthsource = 'hds';
var thirdVersionId = 20180112;


/**
 * post请求
 */
async function post(url, params, message, success, fail, complete, method, contentType, handleErr) {
  
  if (params) {
    console.log(url);
    console.log("post"+params);
  }
  if (message) {
    wx.showLoading({
      title: message,
    })
  }
  // 每次提交请求时携带sessionId
  var sessionId = wx.getStorageSync('sessionId') || ''
  // if (sessionId == '' || sessionId == undefined) {
  //   await wxLogin(params)
  //   sessionId = wx.getStorageSync('sessionId') || ''
  // }

  var result = await wepy.request({
    url: host + url,
    data: params,
    header: {
      'content-type': contentType || 'application/x-www-form-urlencoded',
      'healthsource': healthsource,
      'thirdSessionId': sessionId,
      'thirdVersionId': thirdVersionId
    },
    method: method == 'get' ? 'get' : 'post',
    success: function (res) {
      if (res.statusCode == 200) {
        if (res.data.errorCode == 200) {
          if (success) {
            success(res.data.data)
          }

        } else if (res.data.errorCode > 0) {
          console.log(url + ':' + res.data.moreInfo)
          if (fail) {
            fail(res.data.moreInfo)
          }

        } else {
          console.log(url + ':' + res.data.moreInfo)
        }
      } else {
        console.log(url + ':' + res.statusCode)
        if (fail) {
          fail()
        }
      }
    },
    fail: function (res) {
      console.log(url + ':' + res)
      if (fail) {
        fail()
      }

    },
    complete: function (res) {
      if (message) {
        wx.hideLoading()
      }
      if (complete) {
        complete(res)
      }
    },
  })
  // if (result.data.errorCode != 0) {
  //   return result.data
  // }
  if(handleErr && result.data.moreInfo !== ''){ //
    return handleErr(result.data.moreInfo);
  }

  return result.data.data
}

/**
 * post请求
 */
async function post2(url, params, message, success, fail, complete, method) {
  
  if (params) {
    console.log(url);
    console.log("post"+params);
  }
  if (message) {
    wx.showLoading({
      title: message,
    })
  }
  // 每次提交请求时携带sessionId
  var sessionId = wx.getStorageSync('sessionId') || ''
  if (sessionId == '' || sessionId == undefined) {
    await wxLogin(params)
    sessionId = wx.getStorageSync('sessionId') || ''
  }

  var result = await wepy.request({
    url: host + url,
    data: params,
    header: {
      'content-type': 'application/json',
      'healthsource': healthsource,
      'thirdSessionId': sessionId,
      'thirdVersionId': thirdVersionId
    },
    method: method == 'get' ? 'get' : 'post',
    success: function (res) {
      if (res.statusCode == 200) {
        if (res.data.errorCode == 200) {
          if (success) {
            success(res.data.data)
          }

        } else if (res.data.errorCode > 0) {
          console.log(url + ':' + res.data.moreInfo)
          if (fail) {
            fail(res.data.moreInfo)
          }

        } else {
          console.log(url + ':' + res.data.moreInfo)
        }
      } else {
        console.log(url + ':' + res.statusCode)
        if (fail) {
          fail()
        }
      }
    },
    fail: function (res) {
      console.log(url + ':' + res)
      if (fail) {
        fail()
      }

    },
    complete: function (res) {
      if (message) {
        wx.hideLoading()
      }
      if (complete) {
        complete(res)
      }
    },
  })
  // if (result.data.errorCode != 0) {
  //   return result.data
  // }
  return result.data.data
}

/**
 * post请求
 */
async function postWithAllResp(url, params, message, success, fail, complete, method) {
  if (params) {
    console.log(url)
    console.log(params)
  }
  if (message) {
    wx.showLoading({
      title: message,
    })
  }
  // 每次提交请求时携带sessionId
  var sessionId = wx.getStorageSync('sessionId') || ''
  if (sessionId == '' || sessionId == undefined) {
    await wxLogin()
    sessionId = wx.getStorageSync('sessionId') || ''
  }

  var result = await wepy.request({
    url: host + url,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'healthsource': healthsource,
      'thirdSessionId': sessionId,
      'thirdVersionId': thirdVersionId
    },
    method: method == 'get' ? 'get' : 'post',
    success: function (res) {
      if (res.statusCode == 200) {
        if (res.data.errorCode == 200) {
          if (success) {
            success(res.data.data)
          }

        } else if (res.data.errorCode > 0) {
          console.log(url + ':' + res.data.moreInfo)
          if (fail) {
            fail(res.data.moreInfo)
          }

        } else {
          console.log(url + ':' + res.data.moreInfo)
        }
      } else {
        console.log(url + ':' + res.statusCode)
        if (fail) {
          fail()
        }
      }
    },
    fail: function (res) {
      console.log(url + ':' + res)
      if (fail) {
        fail()
      }

    },
    complete: function (res) {
      if (message) {
        wx.hideLoading()
      }
      if (complete) {
        complete(res)
      }
    },
  })
  // if (result.data.errorCode != 0) {
  //   return result.data
  // }
  return result.data
}

/**
 * post请求,适用响应体为rc,msg类型的
 */
async function postRC(url, params, message, success, fail, complete, handleErr) {
  if (params) {
    console.log(url)
    console.log(params)
  }
  if (message) {
    wx.showLoading({
      title: message,
    })
  }
  // 每次提交请求时携带sessionId
  var sessionId = wx.getStorageSync('sessionId') || '';

  if (sessionId == '' || sessionId == undefined) {
    await wxLogin()
    sessionId = wx.getStorageSync('sessionId') || '';
  }

  var result = await wepy.request({
    url: host + url,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'healthsource': healthsource,
      'thirdSessionId': sessionId,
      'thirdVersionId': thirdVersionId
    },
    method: 'post',
    success: function (res) {
      if (res.statusCode == 200) {
        if (res.data.rc == 1) {
          if (success) {
            success(res.data.msg)
          }

        } else {
          if (fail) {
            fail(res.data.msg)
          }
        }
      } else {
        console.log(url + ':' + res.statusCode)
        if (fail) {
          fail()
        }
      }
    },
    fail: function (res) {
      console.log(url + ':' + res)
      if (fail) {
        fail()
      }

    },
    complete: function (res) {
      if (message) {
        wx.hideLoading()
      }
      if (complete) {
        complete(res)
      }
    },
  })

  if(result.data.moreInfo !== ''){
    return handleErr(result.data.moreInfo);
  }

  return result.data.data
}



/**
 * 上传图片
 */
async function uploadFile(filePath, success, fail, complete, onProgress) {
  // 每次提交请求时携带sessionId
  var sessionId = wx.getStorageSync('sessionId') || '';
  var option = {
    url: host + 'v2/_f/u',
    filePath: filePath,
    name: 'file',
    header: {
      'healthsource': healthsource,
      'thirdSessionId': sessionId,
      'thirdVersionId': thirdVersionId
    },
    formData: {
      name: 'avatar.jpg',
      belong: 'PRODUCT'
    },
    success: function (res) {
      if (res.statusCode == 200) {
        res.data = JSON.parse(res.data)
        if (res.data.errorCode == 200) {
          if (success) {
            success(res.data.data)
          }

        } else if (res.data.errorCode > 0) {
          console.log(filePath + ':' + res.data.moreInfo)
          if (fail) {
            fail(res.data.moreInfo)
          }

        } else {
          console.log(filePath + ':' + res.data.moreInfo)
        }
      } else {
        console.log(filePath + ':' + res.statusCode)
        if (fail) {
          fail(res)
        }
      }

    },
    fail: function (res) {
      console.log(filePath + ':' + res)
      if (fail) {
        fail(res)
      }

    },
    complete: function (res) {
      if (complete) {
        complete(res)
      }

    }
  }
  var task = await wx.uploadFile(option)
  return task
}


async function downLoadFile(url, success, fail, complete) {
  // 每次提交请求时携带sessionId
  var sessionId = wx.getStorageSync('sessionId') || ''
  return await wepy.downloadFile({
    url: host + url,
    header: {
      'healthsource': healthsource,
      'thirdSessionId': sessionId,
      'thirdVersionId': thirdVersionId
    },
    success: function (res) {
      if (success) {
        success(res)
      }
    },
    fail: function (res) {
      if (fail) {
        fail(res)
      }
    },
    complete: function (res) {
      if (complete) {
        complete(res)
      }
    }
  })
}

async function wxLogin(params) {
  // var loginres = await wepy.login()
  // var code = loginres.code
  // var userInfoRes = await wepy.getUserInfo()
  // var encryptedData = userInfoRes.encryptedData
  // var iv = userInfoRes.iv
  console.log('in ---- ');
  await wepy.request(
    {
      url: host + 'v2/wechat/getSession',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'healthsource': healthsource,
        'thirdSessionId': '',
        'thirdVersionId': thirdVersionId
      },
      data: {
        encryptedData: params.encryptedData,
        iv: params.iv,
        code: params.code
      },
      // message: '正在登录...',
      success: function (res) {
        wx.setStorageSync('userInfo', res.user)
        wx.setStorageSync('sessionId', res.sessionId)
      },
      fail: function (res) {
        wx.showModal({
          title: '登录---------失效',
          content: '请重新打-----开小程序',
          showCancel: false
        })
      },
      complete: function (res) {
        console.log('complete')
      }
    }
  ).then((res) => {
    console.log(`---wxlogin: ${JSON.stringify(res)} ---`);
    wx.setStorageSync('userInfo', res.data.data.user);
    wx.setStorageSync('sessionId', res.data.data.sessionId);
    // wx.reLaunch({
    //   url: '/pages/home'
    // })
    console.log('out ---- wxlogin');
  }).catch(e => console.log(e));

}



module.exports = {
  host: host,
  post: post,
  post2,
  postWithAllResp,
  postRC: postRC,
  uploadFile: uploadFile,
  downLoadFile: downLoadFile,
  wxLogin,
}