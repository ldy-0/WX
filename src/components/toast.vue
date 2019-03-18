<style scoped>
.toast_wrap{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background: #000;
}
.toast{
  position: fixed;
  top: calc(50% - 187rpx);
  left: calc(50% - 307rpx);
  width: 615rpx;
  height: 375rpx;
  border: 6rpx solid #c79a70;
  background: linear-gradient(180deg, rgba(199,154,112, 0.3), #000 30%);
}

.i_close{
  position: absolute;
  top: -25rpx;
  right: -25rpx;
  width: 50rpx;
  height: 50rpx;
}

.s_bg_1{ background: #fff; }
</style>
<template>
  <view class='toast_wrap'>
    <view class="toast">
      <slot></slot>
      <image class='i_close' src='{{closeURL}}' mode='aspectFill' @tap='close' />
    </view>
  </view>
</template>
<script>
import wepy from "wepy";

export default class Toast extends wepy.component {
  props = {
    tabOption: Object,
  };

  data = {
    closeURL: '/images/global/close.png'
  };

  components = {};

  methods = {
    close(e) {
      this.$emit('close', e);
    }
  };
}
</script>