
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

export default {
  pay
}