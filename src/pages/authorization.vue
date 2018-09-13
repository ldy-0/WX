<style scoped>
.container {
  background: #fff;
  height: 100vh;
}

.imgbox {
  padding-top: 210rpx;
  text-align: center;
}

.image1 {
  width: 460rpx;
  height: 253rpx;
}
.author-text {
  width: 100%;
  text-align: center;
  font-size: 36rpx;
  color: #ffc300;
  font-weight: 600;
  margin-top: 60rpx;
  margin-bottom: 18rpx;
}

.author-text1 {
  width: 100%;
  text-align: center;
  font-size: 32rpx;
  color: #999;
}

.btn {
  position: absolute;
  width: 100%;
  height: 94rpx;
  line-height: 94rpx;
  background-image: linear-gradient(-90deg, #ff7900 0%, #feaa26 100%),
    linear-gradient(#ffda44, #ffda44);
  color: #fff;
  bottom: 20rpx;
  font-size: 36rpx;
  font-weight: 600;
  border-radius: 10rpx;
}
.btn::after {
  border: none;
}
</style>
<template>
  <view class="container">
    <view class="imgbox">
      <image class="image1" src="../images/logo.png" alt=""/>
    </view>
    <view class="author-text">
      预约、拼团、砍价、分销
    </view>
    <view class="author-text1">
      玩转商城全功能
    </view>   
    <button class="btn" open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo">进入小程序</button>
 </view>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
import { showSuccessToast, showFailToast } from "../utils/tools";
export default class Authorization extends wepy.page {
  config = {
    navigationBarTitleText: "微信授权"
  };
  data = {
    path: null,
    shareType: null
  };

  components = {};
  onLoad(options) {
    console.log(options.shopId, "shouquan");
    if (options.path == "/pages/public/publicList") {
      wx.setStorageSync("shopId", options.shopId);
      this.path = `${options.path}?type=${options.type}&gohome=1&shopId=${
        options.shopId
      }`;
    } else if (options.shareType == "bargain") {
      wx.setStorageSync("shopId", options.shopId);
      this.shareType = options.shareType;
    } else {
      wx.setStorageSync("shopId", options.shopId);
      this.path = "/pages/home";
    }
  }
  onShow() {
    this.wxUserInfo = wx.getStorageSync("wxUserInfo") || null;
    if (this.wxUserInfo != null) {
      if (this.path == "/pages/home") {
        wx.switchTab({
          url: "/pages/home"
        });
      } else if (this.shareType == "bargain") {
        wx.navigateBack();
      } else {
        wx.redirectTo({
          url: this.path
        });
      }
    }
  }

  //获取用户信息
  async onGotUserInfo(e) {
    let wxUserInfo = e.detail.userInfo;
    wx.setStorageSync("wxUserInfo", wxUserInfo);
    if (wxUserInfo != null) {
      const res = await shttp
        .post("/api/v1/member/memberinfo")
        .send({
          wx_name: wxUserInfo.nickName,
          wx_avatar: wxUserInfo.avatarUrl
        })
        .end();
      //获取个人资料/api/v1/member4/profile
      const memberRes = await shttp.get(`/api/v1/member/memberinfo`).end();
      let memberInfo = memberRes.data;
      wx.setStorageSync("memberInfo", memberInfo);
      if (this.path == "/pages/home") {
        wx.switchTab({
          url: "/pages/home"
        });
      } else if (this.shareType == "bargain") {
        wx.navigateBack();
      } else {
        wx.redirectTo({
          url: this.path
        });
      }
    }
  }
}
</script>
