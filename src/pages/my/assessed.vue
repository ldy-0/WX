<style scoped>
.container {
  height: 100%;
  font: 32rpx PingFang-SC-Medium;
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 93rpx;
}

.status_info_wrap {
  width: 500rpx;
  height: 200rpx;
  border-radius: 20rpx;
  color: #fff;
  background: #282425;
  margin-bottom: 35rpx;
}
.status_info_wrap .status_info {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.status_info_wrap .status_info image {
  width: 68rpx;
  height: 68rpx;
  margin-bottom: 13rpx;
}

.btn_wrap .btn {
  width: 500rpx;
  line-height: 68rpx;
  margin: 0 auto;
  border-radius: 10rpx;
  font-size: 28rpx;
  color: #fff;
  background: #ff4444;
  text-align: center;
}
</style>

<template>
  <view class="container">
    <view class="status_info_wrap">
      <view class="status_info">
        <image src="../../images/icon_pingjiachenggong@2x.png">
        <view>评价成功</view>
      </view>
    </view>

    <view class="btn_wrap">
      <navigator class="btn" open-type="redirectTo" url="../my/orderList">继续评价</navigator>
    </view>
  </view>
</template>

<script>
import wepy from "wepy";
export default class Assessed extends wepy.page {
  config = {
    navigationBarTitleText: "评价完成"
  };
  data = {};

  computed = {};

  components = {};

  methods = {};
}
</script>

