
async pay(res){

  wx.showToast({ title: "支付申请中...", icon: "none", duration: 2000 });

  if (res) {

    wx.requestPayment({
      timeStamp: res.timeStamp,
      nonceStr: res.nonceStr,
      package: res.package,
      signType: "MD5",
      paySign: res.paySign,
      success: res => {
        // console.log(res)
        resolve(res);
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

toQueryStr(obj){
  let query = '';

  for(let key in params){
    if(params.hasOwnProperty(key))){
      query += (query === '' ? '?' : '&') + key + '=' + params[key];
    }
  }

  return query;
}

add_minus(nub1, nub2){
  let len1, len2, m;
 
  try{len1 = nub1.toString().split('.')[1].length;}catch(e){len1 = 0;}
  try{len2 = nub2.toString().split('.')[1].length;}catch(e){len2 = 0;}
  m = 10**Math.max(len1, len2);
 
  return (nub1*m+nub2*m)/m;
}

setTime(_second){
   
    let _this = this;

    this.interval = setInterval(function(){

      if(_second <= 0){
        return ;
      }

      let _minute = _second / 60,
          _hour = _minute / 60,
          second = parseInt(_second) % 60,
          minute = parseInt(_minute) % 60,
          hour = parseInt(_hour) % 24,
          day = parseInt(_hour / 24),
          countDown = _this.countDown;

      console.log(day, hour, minute, second, _second);
      
      countDown.day = day;
      countDown.hour = hour;
      countDown.minute = minute;
      countDown.second = second;
      _this.$apply();
      
      _second--;

    }, 1000);

}

modifyPhone(phone){ 
  return phone.toString().replace(/\d{4}(?=\d{4}$)/, '****'); 
}


module.exports = {
  // getQR,
  add_minus,
  toQueryStr,
  setTime,
};