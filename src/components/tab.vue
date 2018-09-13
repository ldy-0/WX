<style lang="sass" scoped>
@import "../pages/base.sass"
.tab
  width: 100%
.header
  white-space: nowrap
  width: 100%
  background-color: #ffffff
  border-top: 1rpx solid #eeeeee
  border-bottom: 1rpx solid #eeeeee
  height: 76rpx
  display: flex
  justify-content: space-around
.header-item_wrap
  display: flex
  flex-direction: column
  width: 100%
.header-item_title
  height: 76rpx
  text-align: center
  color: #656565
  font-size: 32rpx
  line-height: 76rpx
.header-item_line
  height: 4rpx
  display: flex
  align-items: center
  justify-content: center
.active .header-item_title
  color: #222222 !important
.active .header-item_line:before
  content: ""
  width: 30rpx
  background-color: $orange
  height: 4rpx
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
    
    onLoad(options){}
    props = {
      tabOption: Object,
      nowindex: Number,
    };
    data = {

    };
    components = {};
    methods = {
      tabitem(e){
        let tempIndex = e.currentTarget.dataset.index
        this.$emit("tabitem", tempIndex);
      }
    }
  }
</script>