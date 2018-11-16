<style scoped>
.imgStyle {
  width: 100%;
}
</style>

<template>
  <view class='container'>
    <image class="imgStyle" src='{{imgurl}}' mode="widthFix"/>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class AdvertisingPage extends wepy.page {
  config = {
    navigationBarTitleText: "轮播详情"
  };
  data = {
    imgurl: ""
  };

  components = {};

  onLoad(options) {
    this.imgurl = options.imgurl;
  }
  onShow() {}
}
</script>