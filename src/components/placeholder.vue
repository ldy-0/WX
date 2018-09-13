<template>
    <view class="empty-placeholder row-center" wx:if="{{show}}">
        <image class="icon-xl" src="../images/fangdajing.png" />
        <view class="txt">{{message}}</view>
    </view>
</template>
<script>
import wepy from "wepy";
export default class Placeholder extends wepy.component {
  props = {
    show: {
      type: Boolean,
      default: false
    },
    message: {
      default: "没有相关信息"
    },
  };
}
</script>
<style lang="sass">
.empty-placeholder 
  padding-top: 70rpx
  width: 100%
  text-align: center
  text 
    color: #666
    font-size: 40rpx
    margin-left: 30rpx
.icon-xl
  width: 363rpx
  height: 300rpx
  display: block
  margin: 0 auto
.txt 
  font-size: 36rpx
  color: #222
  margin-top: 60rpx

</style>
