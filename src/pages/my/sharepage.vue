<style scoped>
.container {
  height: 100%;
  font-family: PingFang-SC-Medium;
  background: #f6f5f5;
}

.bg_wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.bg_wrap .bg {
  width: 750rpx;
  height: 1207rpx;
  background: #f6f5f5;
}
.bg_wrap .info_wrap {
  position: absolute;
  top: 282rpx;
  border-radius: 50%;
  left: calc(50% - 170rpx);
}
.bg_wrap .info_wrap .qt_img {
  width: 334rpx;
  height: 334rpx;
  border-radius: 50%;
}
.bg_wrap .info_wrap .info {
  margin: 30rpx 0 0;
  font-size: 31rpx;
  font-weight: bold;
  color: #000;
  text-align: center;
}
.bg_wrap .info_wrap .info text {
  font-size: 41rpx;
  color: #ffbc2e;
}
.bg_wrap .share_wrap {
  position: absolute;
  top: 800rpx;
  right: 10rpx;
  border: 0;
  margin: 0;
  padding: 0;
}
.bg_wrap .share_wrap image {
  width: 90rpx;
  height: 90rpx;
}
</style>
<template>
  <view class="container">
    <view class="bg_wrap">
      <image class="bg" src="../../images/img_fenxiangzhuan@2x.png" mode="center	">

      <view class="info_wrap">
        <image class="qt_img" src="{{qr_url}}">
      </view>

      <button wx:if="{{qr_url}}" class="share_wrap" open-type="share" plain="true">
        <image src="../../images/icon_fenxiangzhuan@2x.png">
      </button>
    </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class Share extends wepy.page {
  config = {
    navigationBarTitleText: "分享赚"
  };
  data = {
    //获取的二维码
    qr_url: "",
    //分销的menberid
    memberInfo: {}
  };

  components = {};

  methods = {
    //分享商品
    onShareAppMessage: function(res) {
      console.log(this.memberInfo.member_id);
      let str = "";
      let that = this;
      str = "/pages/home?type=share" + "&memberId=" + this.memberInfo.member_id;
      return {
        title: "金柯便利店",
        path: str,
        success: function(res) {
          // 转发成功
          wx.showToast({
            title: "转发成功",
            icon: "success",
            duration: 2000
          });
        },
        fail: function(res) {
          // 转发失败
        }
      };
    }
  };
  onShow() {
    //获取分销用的memberId
    this.memberInfo = wx.getStorageSync("memberInfo");
  }
  onLoad(options) {
    //获取微信个人信息
    this.wxUserInfo = wx.getStorageSync("wxUserInfo");

    this.getQt(111);
  }

  async getQt(id) {
    wx.showLoading({ title: "loading..." });
    const res = await shttp
      .post(`/api/v1/member/qrcode`)
      .send({})
      .end();
    console.log(res);

    this.qr_url = res.data.qrcode_url;
    wx.hideLoading();

    this.$apply();
  }
}
</script>
