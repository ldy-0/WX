<style scoped>
.container {
  padding: 30rpx;
  height: 100%;
  background: #f5f5f5;
  font: 28rpx PingFang-SC-Medium;
}

.form_item{
  position: relative;
  height: 100rpx;
  padding-left: 50rpx;   
  border-bottom: 2rpx solid #dfdfdf;
}
.input{
  flex-grow: 1;
  margin-left: 45rpx;
}

.icon_wrap{
  width: 40rpx;
  text-align: center;
}
.i_mobile{
  width: 32rpx;
  height: 50rpx;
}
.i_captcha{
  width: 40rpx;
  height: 32rpx;
}
.i_pwd, .i_confirm{
  width: 31rpx;
  height: 41rpx;
}
.form_item:first-child{
  border-radius: 20rpx 20rpx 0 0;
}
.form_item:last-child{
  border-radius: 0 0 20rpx 20rpx;
}

.captcha_btn{
  position: absolute;
  right: 20rpx;
  z-index: 2;
  width: 180rpx;
  height: 60rpx;
  line-height: 60rpx;
  border: 2rpx solid #4fb84a;
  border-radius: 30rpx;
  text-align: center;
}

.tip{
  margin: 30rpx 0 0;
  font-size: 26rpx;
}

.submit_btn{
  height: 70rpx;
  margin: 80rpx 0 0;
  line-height: 70rpx;
  border-radius: 10rpx;
  font-size: 36rpx;
  text-align: center;
}

.flex{
  display: flex;
  align-items: center;
}

.s_fc_1{ color: #fff; }
.s_fc_2{ color: #222; }
.s_fc_3{ color: #4fb84a; }

.s_bg_1{ background: #fff; }
.s_bg_2{ background: #f3f4f5; }
.s_bg_3{ background: #4fb84a; }
</style>

<template>
  <view class="container">

    <view class='form_wrap'>
      <repeat for='{{formList}}'>

        <view class="form_item flex s_bg_1 ">
          <view class='icon_wrap'>
            <image class="{{'i_' + item.name}}" src='{{item.url}}' mode='aspectFill' />
          </view>

          <input class='input' placeholder="{{item.placeholder}}" data-name='{{item.name}}' @input='input' />

          <view class='captcha_btn s_fc_3' wx:if="{{item.name === 'captcha'}}" @tap.stop='getCaptcha'>{{captchaText}}</view>
        </view>

      </repeat>
    </view>

    <view class='tip s_fc_3'>{{tipContent}}</view>

    <view class='submit_btn s_fc_1 s_bg_3' @tap='submit'>确定</view>

  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../../utils/http";

export default class Reset extends wepy.page {
  config = {
    navigationBarTitleText: "忘记密码",
    disableScroll: true,
  };
  data = {
    formList: [
      { name: 'mobile', placeholder: '188****1234', url: '../../../images/dScore/mobile.png', },
      { name: 'captcha', placeholder: '请输入验证码', url: '../../../images/dScore/captcha.png', },
      { name: 'pwd', placeholder: '请填写6位新密码', url: '../../../images/dScore/pwd.png' },
      { name: 'confirm', placeholder: '请确认6位新密码', url: '../../../images/dScore/pwd.png' },
    ],
    tipContent: '本操作将会充值您的德分支付密码，请牢记您的新密码',
    mobile: { value: '', alert: null },
    captcha: { value: '', alert: null },
    pwd: { value: '', alert: null },
    confirm: { value: '', alert: null },
    interval: null,
    countDown: -1,
    canGet: true,
    canSubmit: true,
  };

  components = {
  };

  computed = {
    captchaText(){ return this.countDown >= 0 ? this.countDown : '获取验证码' },
  };
  methods = {
    input(e){
      let v = e.detail.value,
          name = e.currentTarget.dataset.name;

      this[name].value = v;
      console.error('input');
    },
    async getCaptcha(){
      let mobile = /^(13[0-9]|14[579]|15[0-35-9]|17[0135-8]|18[0-9])\d{8}$/;

      if(!mobile.test(this.mobile.value)) return wx.showModal({ content: '手机号填写不正确', showCancel: false });

      if(!this.canGet) return ;
      this.canGet = false;

      let res = await shttp.post(`/api/v2/common/mobilecode`).send({ mobile: this.mobile.value, type: 3 }).end();
      console.error(res);

      this.countDown = 60;
      this.interval = setInterval(() => {
        this.countDown <= 0 ? this.countDown = -1 : this.countDown--;

        if(this.countDown === -1){
          this.canGet = true;
          clearInterval(this.interval); 
        }

        this.$apply();
      }, 1000);
    },

    submit(){
      let mobile = /^(13[0-9]|14[579]|15[0-35-9]|17[0135-8]|18[0-9])\d{8}$/,
          captcha = this.captcha,
          pwd = this.pwd.value,
          param;

      if(!mobile.test(this.mobile.value)) return wx.showModal({ content: '手机号填写不正确', showCancel: false, });

      if(!captcha.value) return wx.showModal({ content: '验证码不正确', showCancel: false, });

      if(pwd.length != 6) return wx.showModal({ content: '密码必须为6位', showCancel: false, });

      if(this.confirm.value != pwd) return wx.showModal({ content: '两次密码输入不一致', showCancel: false, });

      if(!this.canSubmit) return ;
      this.canSubmit = false;

      param = {
        mobile: this.mobile.value,
        code: this.captcha.value,
        paypwd: pwd,
      };

      this.save(param);
    }
  };

  onLoad() {}
  onUnload(){ if(this.interval) clearInterval(this.interval); }
  onShow() { }

  async save(param) {
    wx.showLoading({ title: "提交中..." });

    let res = await shttp.put(`/api/v2/member/paypwd/1`).send(param).end();
    // console.error(res);

    wx.hideLoading();

    if(res && !res.error){
      wx.showModal({ content: '修改成功!', showCancel: false, success(e){ if(e.confirm) wx.navigateBack({ delta: 1 }); } });
    }else{
      wx.showModal({ content: res.error, showCancel: false, });
    }

    this.canSubmit = true;
    this.$apply();

  }

  
}
</script>

