import wepy from 'wepy';

const DOMAIN = 'http://101.37.30.205/';
// const DOMAIN = 'https://www.hi-zhan.com/';

async getQR(id){
  wx.showLoading({ title: 'loading...' });

  let data = await request.post('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx9a04f683a41443f4&secret=e895bfeafb0941fda1b016cdba0f64e9');
  // console.log(data);

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


module.exports = {
  getQR
};