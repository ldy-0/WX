<style>
page {
  height: 100%;
}
</style>
<style scoped>
.container {
  height: 100%;
  overflow: hidden;
}
.bg_img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.banner_img {
  display: block;
  width: 714rpx;
  height: 344rpx;
  margin: 0 auto;
  margin-top: 18rpx;
}
.user_infoBox {
  position: relative;
  width: 694rpx;
  height: 108rpx;
  margin: 0 auto;
  margin-top: 34rpx;
}
.user_img {
  position: absolute;
  top: -8rpx;
  left: -2rpx;
  width: 118rpx;
  height: 118rpx;
  border-radius: 50%;
  border: 4rpx solid #d2a87c;
  overflow: hidden;
}
.info_bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 694rpx;
  height: 108rpx;
}
.user_txtBox {
  position: absolute;
  font-size: 25rpx;
  color: #ffffff;
  margin-left: 150rpx;
  margin-top: 22rpx;
}

.info_btn {
  position: absolute;
  display: block;
  width: 170rpx;
  height: 58rpx;
  top: 22rpx;
  right: 26rpx;
}
.nav_box {
  position: relative;
  width: 652rpx;
  height: 652rpx;
  margin: 0 auto;
  margin-top: 30rpx;
}
.nav_bg {
  position: absolute;
  top: 0;
  left: 0;
}
</style>

<template>
  <view class="container">
    <image class="bg_img" src="../../images/bg_3@2x.png" alt>
    <image class="banner_img" src="../../images/bg_1@2x.png" alt>
    <view class="user_infoBox">
      <image class="info_bg" src="../../images/btn_6@2x.png" alt>
      <view class="user_img">
        <open-data type="userAvatarUrl"></open-data>
      </view>
      <view class="user_txtBox">
        <view>李建国  永达吴中路大众中心</view>
        <view>目前钛强排名：100</view>
      </view>
      <image class="info_btn" src="../../images/btn_7@2x.png" alt>
    </view>
    <viwe class="nav_box">
       <image class="nav_bg" src="../../images/bg_4@2x.png" alt>
       <view >

       </view>
    </viwe>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
export default class Waiterhome extends wepy.page {
  config = {
    navigationBarTitleText: ""
  };
  data = {};

  components = {};

  onLoad(options) {}

  onShow() {}

  methods = {};
}
</script>
