<style scoped>
.tips {
  width: 100%;
  text-align: center;
  line-height: 100rpx;
  font-size: 30rpx;
}

.link-list > navigator {
  position: relative;
  margin: 5rpx 0;
  padding-right: 50rpx;
  line-height: 88rpx;
  background: white;
}

.link-list text {
  display: block;
  text-indent: 20rpx;
  font-size: 32rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.link-list image {
  width: 16rpx;
  height: 25rpx;
  margin-top: -12rpx;
  position: absolute;
  right: 20rpx;
  top: 50%;
}

.search {
  overflow: hidden;
  height: 108rpx;
  font: 28rpx PingFang-SC-Medium;
  color: #969696;
  background: #fff;
  text-align: center;
}
.search .search_content {
  width: 690rpx;
  line-height: 68rpx;
  margin: 20rpx auto;
  border-radius: 34rpx;
  background: #f2f2f2;
}

.search_text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-search {
  width: 40rpx;
  height: 40rpx;
}

.nodata {
  margin-top: 50%;
  font-size: 38rpx;
  text-align: center;
}

.wire-gray {
  height: 20rpx;
  width: 100%;
  background: #f4f4f4;
}

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
