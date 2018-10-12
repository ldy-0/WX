
function isPhone (phone) {
  let reg = /^((13[0-9])|(14[5|7|9])|(15([0-3]|[5-9]))|(17[0,1,3,5,6,7,8])|(18[0-9]))\d{8}$/
  
  return reg.test(phone)
}

async function pay (res) {

  return new Promise(function(resolve, reject){

    wx.requestPayment({
      nonceStr: res.nonceStr,
      package: res.package, 
      signType: res.signType,
      paySign: res.paySign, 
      timeStamp: res.timeStamp,
      success(e){ resolve(e) },
      fail(e){ reject(e); console.log(e); },
    })

  }).catch(e => e.errMsg)
  
}

async function uploadFile (obj) {

  return new Promise(function(resolve, reject){
    obj.success = res => {
      console.log('upload --', res) 
      resolve(res.data)
    }
    obj.fail = e => resolve(e)

    wx.uploadFile(obj)
  })
}

export default {
  pay,
  isPhone,
  uploadFile
}