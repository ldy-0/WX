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

.tab {
  width: 100%;
}

.header {
  white-space: nowrap;
  width: 100%;
  background-color: #ffffff;
  border-top: 1rpx solid #eeeeee;
  border-bottom: 1rpx solid #eeeeee;
  height: 76rpx;
  display: flex;
  justify-content: space-around;
}

.header-item_wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.header-item_title {
  height: 76rpx;
  text-align: center;
  color: #656565;
  font-size: 32rpx;
  line-height: 76rpx;
}

.header-item_line {
  height: 4rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.active .header-item_title {
  color: #f17f30 !important;
}

.active .header-item_line:before {
  content: "";
  width: 30rpx;
  background-color: #f17f30;
  height: 4rpx;
}
</style>
<template>
  <view class="tab">
    <view class="header" scroll-x="true" >
      <view class="header-item " @tap="tabitem" 
        wx:for="{{tabOption.tabList}}" 
          data-index="{{index}}" 
          wx:for-item="item" wx:key="{{this}}">
        <view class="header-item_wrap {{index==nowindex?'active':''}}">
          <view class="header-item_title">
            {{item}}
          </view>
          <view class="header-item_line"></view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import wepy from "wepy";
// import test from "./test";
export default class tab extends wepy.component {
  onLoad(options) {}
  props = {
    tabOption: Object,
    nowindex: Number
  };
  data = {};
  components = {};
  methods = {
    tabitem(e) {
      let tempIndex = e.currentTarget.dataset.index;
      this.$emit("tabitem", tempIndex);
    }
  };
}
</script>