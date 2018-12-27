<style scoped>
.container {
  background: #f4f4f4;
  height: 100vh;
  position: relative;
}
.container .now {
  position: absolute;
  top: 20rpx;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 206rpx;
  height: 28rpx;
  background: #cccccc;
  font-size: 20rpx;
  color: #666666;
  border-radius: 5rpx;
  line-height: 28rpx;
}
</style>


<template>
  <view class="container">
    <view class="now">{{now}}</view>
  </view>
</template>
<script>
import wepy from "wepy";
import dayjs from "dayjs";
export default class News extends wepy.page {
  config = {
    navigationBarTitleText: "我的消息"
  };
  data = {};
  computed = {
    now() {
      return dayjs().format("YYYY-MM-DD HH:mm");
    }
  };
  components = {};
  onLoad(options) {}
  onShow() {}
  methods = {};
}
</script>
