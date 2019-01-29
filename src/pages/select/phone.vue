<style scoped>
page {
  background: #fff;
}

.container {
  height: 100vh;
}

.title_wrap{
  padding: 30rpx 20rpx;
  font-size: 24rpx;
}
.title{
  font-size: 40rpx;
  font-weight: bold;
}
.sub_title{
  margin: 10rpx 0 0;
}

.form_wrap{
  padding: 0 40rpx;
  font-size: 28rpx;
}
.input_wrap{
  border-bottom: 2rpx solid #f3f3f3;
}
.input{
  flex-grow: 1;
  height: 112rpx;
}
/* .captcha_input{
  flex-grow: 1;
} */
.captcha_btn{
  height: 68rpx;
  line-height: 68rpx;
  padding: 0 40rpx;
  border-left: 2rpx solid #f1f3f5;
  font-size: 32rpx;
  text-align: center;
}


.bottom_bar{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 110rpx 0 0;
  font-size: 36rpx;
  text-align: center;
}
.submit_btn, .cancel_btn{
  width: 640rpx;
  height: 88rpx;
  line-height: 88rpx;
  border: 2rpx solid #10325f;
  border-radius: 10rpx;
}
.cancel_btn{
  margin: 40rpx 0 0;
}


.clear{
  line-height: 1;
  border: none;
}


.flex {
  display: flex;
  align-items: center;
}

.arrow {
  width: 16rpx;
  height: 26rpx;
}


.between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.s-fc-1{ color: #fff; }
.s-fc-2{ color: #222; }
.s-fc-3{ color: #8e939a; }
.s-fc-4{ color: #10325f; }
.s-fc-5{ color: #949494; }

.s-bg-1{ background: #fff; }
.s-bg-2{ background: #f4f4f4; }
.s-bg-3{ background: #999; }
.s-bg-4{ background: #10325f; }
.s-bg-5{ background: #f1f3f5; }
</style>

<template>
  <view class="container s-bg-1">

    <view class='title_wrap s-bg-5 s-fc-3'>
      <view class='title s-fc-2'>{{title}}</view>
      <view class='sub_title'>{{subTitle}}</view>
    </view>

    <view class='form_wrap s-fc-3 s-bg-1'>
      <view class='input_wrap'>
        <input type='number' class='input' placeholder='{{mobileText}}' @input='setMobile' />
      </view>
      <view class='input_wrap flex'>
        <input type='number' class='input' placeholder='{{captchaText}}' @input='setCaptcha' />
        <view class='captcha_btn' @tap='getCaptcha'>{{captchaBtnText}}</view>
      </view>
    </view>

    <!-- footer -->
    <view class='bottom_bar'>
      <view class='submit_btn s-fc-1 s-bg-4' @tap='goSubmit(1)'>{{submitText}}</view>
      <view class='cancel_btn s-fc-4 s-bg-1' @tap='goSubmit(0)'>{{cancelText}}</view>
    </view>

  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";

export default class Mine extends wepy.page {
  config = {
    navigationBarTitleText: "填写手机号"
  };
  data = {
    title: '请填写手机号',
    subTitle: '请填写您的手机号码',
    mobileText: '请输入您的手机号',
    captchaText: '请输入验证码',
    submitText: '确定',
    cancelText: '跳过',
    param: null, // param
    mobile: '',
    captcha: '',
    timer: null,
    cutdown: 0,
    list: [],
    total: 0
  };

  computed = {
    captchaBtnText(){
      return this.timer ? this.cutdown : '获取验证码';
    }
  }

  components = {};

  onLoad(options) {
    if(options.param) this.param = JSON.parse(decodeURIComponent(options.param));
  }

  onShow() {
    
  }

  onUnload(){
    clearInterval(this.timer);
  }

  methods = {
    setMobile(e){
      this.mobile = e.detail.value;
    },
    setCaptcha(e){
      this.captcha = e.detail.value;
    },
    async getCaptcha(){
      let mobile = /^((13[0-9])|(14[5|7|9])|(15([0-3]|[5-9]))|(17[0,1,3,5,6,7,8])|(18[0-9]))\d{8}$/;
      if(!mobile.test(this.mobile)) return wx.showModal({ content: '请输入正确的手机号!', showCancel: false }); 
      
      if(this.cutdown) return ;

      this.cutdown = 60;

      this.timer = setInterval(() => {
        this.cutdown--;
        this.$apply();
      }, 1000);

      let res = await shttp.post(`/api/v2/common/mobilecode`).send({ 
        mobile: this.mobile,
        type: 1 
      }).end();

      console.error(res);
      if(res.error){
        wx.showToast({ title: res.error, icon: 'none', duration: 1000 });
        clearInterval(this.timer);
      }

    },
    async goSubmit(status){
      let url = '/pages/select/time';
      console.error(status, status == 0, this.mobile, this.captcha);
      
      // no phone
      if(status == 0) return wx.redirectTo({ url: `${url}?stylist=${encodeURIComponent(JSON.stringify(this.param))}` });

      let mobile = /^((13[0-9])|(14[5|7|9])|(15([0-3]|[5-9]))|(17[0,1,3,5,6,7,8])|(18[0-9]))\d{8}$/;
      
      if(!mobile.test(this.mobile)) return wx.showModal({ content: '手机号格式不正确', showCancel: false });

      // if(!this.caphcha) return wx.showModal({ content: '验证码不正确', showCancel: false });

      let res = await shttp.post(`/api/v2/member/smsmobile`).send({
        mobile: this.mobile,
        code: this.captcha,
      }).end();

      if(res.error == ''){
        wx.showToast({ title: '绑定成功', icon: 'success', duration: 600 });

        let memberinfo = await shttp.get("/api/v2/member/memberinfo").end();
        memberinfo = memberinfo.data;
        wx.setStorageSync("memberInfo", memberinfo);

        // console.error(res);
        wx.navigateBack({ detail: 1 });
      }else{
        wx.showToast({ title: res.error, icon: 'none', duration: 1000 });
      }

    }

  };

  async getList(){
      let res = {
        data: [
          { date: '1-11', day: '5' },
        ]
      }; // await api.getList();

      if(res && res.data){

        res.data.forEach(v => {
        });

        this.dateList = res.data;
        // this.total = res.pagination && res.pagination.total || this.list.length;
      }
      
      this.$apply();
  }

  

}
</script>