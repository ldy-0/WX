<style lang="sass">
.vkl-logo
  text-align: center
  position: fixed
  width: 100%
  bottom: 0rpx
  image
    width: 270rpx
    height: 60rpx  
</style>
<template>
 <view class="vkl-logo">
		<image src="../images/vkl-logo.png"></image>
	</view>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
export default class Victory extends wepy.component {
  props = {};
  data = {};
  methods = {};
}
</script>
