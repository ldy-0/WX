<!--获取手机号组件-->
<style scoped>
.getphone_wrap {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.219);
}

.getphone_btn1 {
  width: 540rpx;
  height: 88rpx;
  background-color: #09bb07;
  color: #fff;
  font-size: 30rpx;
  font-weight: 600;
  border-radius: 10rpx;
  border: solid 1rpx #029400;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 76rpx;
}
.getphone_btn1::after {
  border: none;
}
.getphone_modal {
  position: relative;
  left: 76rpx;
  top: 50%;
  margin-top: -195rpx;
  width: 600rpx;
  height: 390rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
}
.getphone_modalTitle {
  width: 100%;
  text-align: center;
  padding-top: 40rpx;
}
.img_modal {
  width: 47rpx;
  height: 38rpx;
  margin-right: 22rpx;
}
.getphone_btn2 {
  width: 100%;
  height: 88rpx;
  color: #666;
  font-size: 26rpx;
  font-weight: 600;
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10rpx;
}
.img_modal2 {
  width: 56rpx;
  height: 56rpx;
  margin-right: 22rpx;
}
.img_cha {
  width: 24rpx;
  height: 24rpx;
}
.getphone_cha {
  position: absolute;
  top: 0rpx;
  right: 0rpx;
  padding: 28rpx;
}
.getphone_modal2 {
  position: relative;
  left: 76rpx;
  top: 50%;
  margin-top: -284rpx;
  width: 600rpx;
  height: 568rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
}
.getphone_surebtn {
  width: 540rpx;
  height: 88rpx;
  text-align: center;
  line-height: 88rpx;
  background-color: #68d0b7;
  border-radius: 10rpx;
  border: solid 1rpx #53caad;
  color: #ffffff;
  font-size: 32rpx;
  margin: 30rpx auto;
}
.input-box {
  height: 90rpx;
  margin: 15rpx 50rpx;
  border-bottom: 1rpx solid #e8e7e7;
  display: flex;
  justify-content: space-between;
}
.input-sty {
  width: 400rpx;
  padding-top: 16rpx;
  font-size: 28rpx;
  padding-left: 10rpx;
}
.code-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200rpx;
  height: 74rpx;
  color: #68d0b7;
  font-size: 30rpx;
  overflow: hidden;
}
</style>
<template>
  <view class='getphone_wrap'>
        <view class="getphone_modal" wx:if='{{showmodal}}'>
            <view class="getphone_modalTitle">绑定手机号</view>
            <view class="getphone_cha">
               <image class="img_cha" src="../images/icon_cha_new@2x.png" />
            </view>
            <button class='getphone_btn1' plain="true" open-type="getPhoneNumber"  bindgetphonenumber="getPhoneNumber" >
                <image class="img_modal" src="../images/icon_1_weixin@2x.png" />
               微信手机号一键绑定
            </button>
            <view class="getphone_btn2" @tap='switchMode'>
                <image class="img_modal2" src="../images/icon_2_weixin@2x.png" />
                使用手机号绑定
            </view>  
        </view>
        <view class="getphone_modal2" wx:if='{{!showmodal}}'>
            <view class="getphone_modalTitle">绑定手机号</view>
            <view class="getphone_cha">
               <image class="img_cha" src="../images/icon_cha_new@2x.png" />
            </view>
            <view class="input-box">
				<input placeholder="手机号" type="number" maxlength="11" value="{{phone}}" bindinput="phoneInput"
				 name="phone" class="input-sty" placeholder-style="color:#d5d3d3;font-size:14px;" />
			</view>
			<view class="input-box">
				<input placeholder="短信验证码" type="text" name="code" bindinput="codeInput" class="input-sty" placeholder-style="color:#d5d3d3;font-size:14px;" />
				<view class="code-btn" @tap="sendCode">
					{{codetimeShow?codetime+'秒后获取':'获取验证码'}}
				</view>
			</view>
            <view class='getphone_surebtn' plain="true" @tap="sendCode">
              确定
            </view>
            <view class="getphone_btn2" @tap='switchMode'>
                <image class="img_modal2" src="../images/icon_2_weixin@2x.png" />
                微信手机号一键绑定
            </view>  
        </view>
    </view>
</template>
<script>
import wepy from "wepy";
export default class GetPhone extends wepy.component {
  props = {};
  data = {
    showmodal: true,
    codetime: 60,
    codetimeShow: false,
    phone: null,
    noteCode: null
  };
  methods = {
    switchMode() {
      this.showmodal = !this.showmodal;
    },
    phoneInput(e) {
      this.phone = e.detail.value;
      console.log(this.phone);
    },
    codeInput(e) {
      this.noteCode = e.detail.value;
    },
    sendCode(e) {
      if (!this.codetimeShow) {
        let phoneReg = /^[1][0-9][0-9]{9}$/;
        if (this.phone == "") {
          return wx.showToast({
            title: "请输入手机号",
            icon: "none",
            mask: false,
            duration: 1500
          });
        }
        if (!phoneReg.test(this.phone)) {
          return wx.showToast({
            title: "请输入正确的手机号",
            icon: "none",
            mask: false,
            duration: 1500
          });
        }
        // this.getCode();
        let that = this;
        that.codetimeShow = true;
        let interval = setInterval(() => {
          if (that.codetime-- <= 0) {
            that.codetime = 60;
            that.codetimeShow = false;
            clearInterval(interval);
          }
          that.$apply();
        }, 1000);
      }
    }
  };
}
</script>