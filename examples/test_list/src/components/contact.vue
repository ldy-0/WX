<!--客服组件-->
<style lang="sass" scoped>
.contact
  position: fixed
  top: 75vh
  right: 32rpx
  width: 90rpx
  height: 90rpx
  background: #2FA2FF
  border-radius: 50%

.contact-icon 
  display: block
  position: fixed
  right: 32rpx
  width: 90rpx
  height: 90rpx

</style>
<template>
  <button class="contact" open-type="contact">
    <image class="contact-icon" src="/images/contact.png"></image>
  </button>
</template>
<script>
import wepy from "wepy";
export default class Contact extends wepy.component {
  props = {};
  data = {};
     methods = {}
}
</script>