<style scoped>
.model{
  box-sizing: border-box;
  position: fixed;
  top: calc(50% - 120rpx);
  left: calc(50% - 120rpx);
  width: 240rpx;
  height: 240rpx;
  padding: 36rpx 0 0;
  border-radius: 10rpx;
  font-size: 26rpx;
  text-align: center;
}
.i_alert{
  width: 20rpx;
  height: 100rpx;
  margin-bottom: 24rpx;
}

.s-fc-1{ color: #fff; }

.s-bg-1{ background: #fff; }
.s_bg_2{ background: rgba(0, 0, 0, 0.7); }
</style>

<template>
  <view class='model s-fc-1 s_bg_2' wx:if='{{show}}'>

      <image class='i_alert' src='{{config.url}}' />
      <view class=''>{{config.tip1}}</view>
      <view class=''>{{config.tip2}}</view>

  </view>
</template>

<script>
import wepy from "wepy";
export default class Toast extends wepy.component {
  props = {
    show: {
      type: Boolean
    },
    config: {
      type: Object
    }
  };

  data = {
    
  };

  methods = {
    
  };
}
</script>
