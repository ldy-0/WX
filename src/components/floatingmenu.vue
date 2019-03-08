<!--悬浮菜单组件-->
<style scoped>
.contact {
  position: fixed;
  top: 64vh;
  right: 32rpx;
  width: 90rpx;
  height: 90rpx;
  background: #ff4444;
  display: flex;
  opacity: 0.5;
  color: #fff;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 50%;
}

.contact-icon {
  width: 40rpx;
  height: 34rpx;
}

.fontS {
  font-size: 24rpx;
}
</style>
<template>
  <navigator open-type="navigateTo" url="/pages/advisory"  class="contact">
    <image class="contact-icon" src="../images/icon_zixun@2x.png"/>
   <text class="fontS">资讯</text>
  </navigator>
</template>
<script>
import wepy from "wepy";
export default class floatingmenu extends wepy.component {
  props = {};
  data = {};
  methods = {};
}
</script>