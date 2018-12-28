<template>
    <view class="empty-placeholder row-center" wx:if="{{show}}">
        <image class="icon-xl" src="../images/c1@2x.png" />
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
    info: {
      default: "没有相关信息"
    }
  };
}
</script>
<style scoped>
.empty-placeholder {
  padding-top: 290rpx;
  width: 100%;
  text-align: center;
}
.empty-placeholder text {
  color: #666;
  font-size: 40rpx;
  margin-left: 30rpx;
}

.icon-xl {
  width: 203rpx;
  height: 122rpx;
  display: block;
  margin: 0 auto;
}

.txt {
  font-size: 26rpx;
  color: #848484;
  margin-top: 26rpx;
}
</style>
