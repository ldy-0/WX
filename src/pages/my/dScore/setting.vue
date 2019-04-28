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

          <input type='number' class='input' placeholder="{{item.placeholder}}" data-name='{{item.name}}' @input='input' />

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
    navigationBarTitleText: "设置密码",
    disableScroll: true,
  };
  data = {
    formList: [
      // { name: 'mobile', placeholder: '188****1234', url: '../../../images/dScore/mobile.png', },
      // { name: 'captcha', placeholder: '请输入验证码', url: '../../../images/dScore/captcha.png', },
      { name: 'pwd', placeholder: '请填写6位新密码', url: '../../../images/dScore/pwd.png' },
      { name: 'confirm', placeholder: '请确认6位新密码', url: '../../../images/dScore/pwd.png' },
    ],
    tipContent: '该密码在使用德分的时候需要输入，请牢记您的密码',
    pwd: { value: '', alert: null },
    confirm: { value: '', alert: null },
    canSubmit: true,
  };

  components = {
  };

  computed = {
  };

  methods = {
    input(e){
      let v = e.detail.value,
          name = e.currentTarget.dataset.name;

      this[name].value = v;
    },
    submit(){
      let mobile = /^(13[0-9]|14[579]|15[0-35-9]|17[0135-8]|18[0-9])\d{8}$/,
          pwd = this.pwd.value,
          param;

      if(!/\d{6}/g.test(pwd)) return wx.showModal({ content: '密码必须为6位数字', showCancel: false, });

      if(this.confirm.value != pwd) return wx.showModal({ content: '两次密码输入不一致', showCancel: false, });

      if(!this.canSubmit) return ;
      this.canSubmit = false;

      param = {
        paypwd: pwd,
      };

      this.save(param);
    }
  };

  onLoad() {}
  onShow() { }

  async save(param) {
    wx.showLoading({ title: "加载中" });

    let res = await shttp.post(`/api/v2/member/paypwd`).send(param).end();
    console.error(res);

    if(!res.error){
      wx.navigateBack({ delta: 1 });
    }

    wx.hideLoading();
    this.canSubmit = true;
    this.$apply();
  }

  
}
</script>

