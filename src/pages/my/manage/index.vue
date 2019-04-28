<style scoped>
page {
  background: #fff;
}

.container {
  height: 100vh;
  background: #fff;
}

.main_wrap{
  padding: 0 30rpx;
}

.flex {
  display: flex;
  align-items: center;
}
.flex image {
  margin-left: 20rpx;
}

.arrow {
  width: 16rpx;
  height: 26rpx;
}

.row_between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  line-height: 88rpx;
  border: none;
  font-size: 28rpx;
  color: #888;
  background: #fff;
  border-bottom: 1rpx solid #f5f5f5;
}
.row_between .flex{
  color: #222222;
}
.icon {
  width: 30rpx;
  height: 30rpx;
  margin-right: 25rpx;
}
</style>

<template>
  <view class="container">

    <view class='main_wrap'>
      <repeat for="{{list}}" item="item">
        <navigator class="row_between" url="{{item.url}}">
          <view class="flex">
            <!-- <image class="icon img{{index}}" src="{{item.img}}"> -->
            <view>{{item.name}}</view>
          </view>
          <image class="arrow" src="../../../images/icon_you@2x.png">
        </navigator>
      </repeat>
      
    </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../../utils/http";

export default class Mine extends wepy.page {
  config = {
    navigationBarTitleText: "管理入口"
  };
  data = {
    wxUserInfo: null,
    list: [
      {
        name: "轮播图管理",
        url: "/pages/my/manage/slide",
      },
      {
        name: "名片管理",
        url: "/pages/my/manage/card",
      }
    ]
  };

  components = {};

  onLoad(options) {
    //获取微信个人信息
    this.wxUserInfo = wx.getStorageSync("wxUserInfo");

    // charAt 1. illegal number return '', 2. no number -> 0
    
  }

  onShow() { }

  methods = {
  };
}
</script>