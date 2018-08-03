import wepy from 'wepy';

const DOMAIN = 'http://101.37.30.205/';
// const DOMAIN = 'https://www.hi-zhan.com/';

async pay(orderId){

  wx.showToast({ title: "支付申请中...", icon: "none", duration: 2000 });

  let res = await orderApi.getPayInfo({
    params: {
      orderId: orderId,
      payType: "WEIXIN",
      currentUrl:
        "https%3A%2F%2Fwoxifan.51shop.mobi%2Fshop%3Fcode%3D001nLu8P1MW8Z21JDn9P1TVq8P1nLu89%26state%3Dwxloginmhaawxloginaj6wd1mm"
    }
  });
  // console.log(res)
  if (res) {

    wx.requestPayment({
      timeStamp: res.timeStamp,
      nonceStr: res.nonceStr,
      package: res.package,
      signType: "MD5",
      paySign: res.paySign,
      success: res => {
        // console.log(res)
        this.$apply();
      },
      fail: res => wx.showToast({ title: "支付失败", icon: "none", duration: 2000, }),
    });

  }
  
}

async getQR(id){
  wx.showLoading({ title: 'loading...' });

  let data = await request.post('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx9a04f683a41443f4&secret=e895bfeafb0941fda1b016cdba0f64e9');

  // url: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token='+data.data.access_token, // ACCESS_TOKEN
  let code = await request.post('https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token='+data.access_token, {
    // "path": "pages/home",
    page: 'pages/home/goodsDetail', // 'pages/share',
    scene: 'product=' + id,
    width: 350, // 430
    is_hyaline: true,
  }, 'application/json', 'arraybuffer');
  
  this.qr_url = 'data:image/png;base64,' + wx.arrayBufferToBase64(code);
  this.$apply();

  wx.hideLoading();
}

add_minus(nub1, nub2){
  let len1, len2, m;
 
  try{len1 = nub1.toString().split('.')[1].length;}catch(e){len1 = 0;}
  try{len2 = nub2.toString().split('.')[1].length;}catch(e){len2 = 0;}
  m = 10**Math.max(len1, len2);
 
  return (nub1*m+nub2*m)/m;
}


module.exports = {
  getQR,
  add_minus
};