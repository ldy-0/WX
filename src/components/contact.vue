<!--客服组件-->
<style scoped>
.contact {
  position: fixed;
  top: 75vh;
  right: 32rpx;
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
}

.contact::after {
  border: none;
}

.contact-icon {
  display: block;
  position: fixed;
  right: 32rpx;
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
}
</style>
<template>
  <button class="contact" open-type="contact">
    <image class="contact-icon" src="../images/contact_icon.png"/>
  </button>
</template>
<script>
import wepy from "wepy";
export default class Contact extends wepy.component {
  props = {};
  data = {};
  methods = {};
}
</script>