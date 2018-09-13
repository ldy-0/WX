<style lang='sass' scoped>
@import './base.sass'
.imgStyle
  width: 100%
</style>

<template>
  <view class='container'>
    <image class="imgStyle" src='{{imgurl}}' mode="widthFix"/>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
export default class AdvertisingPage extends wepy.page {
  data = {
    imgurl:""
  };

  components = {
  };

  onLoad(options) {
    this.imgurl = options.imgurl
  }
  onShow() {};
}
</script>