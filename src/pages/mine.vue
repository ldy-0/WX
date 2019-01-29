<style>
page {
  background: #fff;
}
</style>
<style scoped>

.container {
  background: #fff;
  height: 100vh;
}

.user_wrap{
  position: relative;
  width: 100%;
  height: 272rpx;
}
.user_bg{
  width: 100%;
  height: 100%;
}

.user_info{
  position: absolute;
  left: 60rpx;
  top: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user_avatar{
  flex-shrink: 0;
  width: 121rpx;
  height: 121rpx;
  border-radius: 50%;
  border: 2rpx solid #fff;
  text-align: center;
  overflow: hidden;
}
.user_name{
  margin-left: 20rpx;
  font-size: 30rpx;
}

.item{
  padding: 30rpx;
  border-bottom: 2rpx solid #e4e4e4;
  font-size: 28rpx;
}
.clear{
  line-height: 1;
  border: none;
}



.my_manage {
  position: relative;
  z-index: 99;
  width: 690rpx;
  height: 230rpx;
  margin: 0 auto;
  margin-top: -40rpx;
  border-radius: 24rpx 24rpx 0 0;
  box-shadow: 0px 0px 10px 0px rgba(241, 231, 225, 0.6);
}
.my_manage_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 68rpx;
  padding: 0 18rpx;
  font-size: 24rpx;
  color: #636363;
  background: #fff;
  border-radius: 24rpx 24rpx 0 0;
}

.my_manage_status {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 160rpx;
  background: #fff;
  border-top: 1rpx solid #eee;
  border-bottom: 1rpx solid #eee;
}

.flex {
  display: flex;
  align-items: center;
}

.arrow {
  width: 16rpx;
  height: 26rpx;
}


.icon {
  width: 30rpx;
  height: 30rpx;
  margin-right: 25rpx;
}


.between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.s-fc-1{ color: #fff; }
.s-fc-2{ color: #222; }

.s-bg-1{ background: #fff; }
</style>

<template>
  <view class="container">

    <view class="user_wrap">
      <image class="user_bg" src="../images/my/bg.png">
      <view class="user_info s-fc-1">
        <image class='user_avatar' src='{{user.wx_avatar}}' />
        <view class='user_name'>{{user.wx_name}}</view>
        <!-- <open-data class="user-img" type="userAvatarUrl"></open-data> -->
        <!-- <open-data class="content inputStyle login" type="userNickName" lang="zh_CN"></open-data> -->
      </view>
    </view>

    <!-- <view class="my_manage">
      <navigator class="my_manage_title" url="/pages/my/orderList?choiceTab=0">
        <view>我的订单</view>
        <view class="flex">
          <view>全部订单</view>
          <image class="arrow" src="../images/icon_zuojiantou@2x.png">
        </view>
      </navigator>
      <view class="my_manage_status">
        <navigator class="column_around" url="/pages/my/orderList?choiceTab=1">
          <image src="../images/icon_3_daifukuan@2x.png">
          <view>待付款</view>
        </navigator>
        <navigator class="column_around" url="/pages/my/orderList?choiceTab=2">
          <image src="../images/icon_3_daifahuo@2x.png">
          <view>待发货</view>
        </navigator>
        <navigator class="column_around" url="/pages/my/orderList?choiceTab=3">
          <image src="../images/icon_3_daishouhuo@2x.png">
          <view>待收货</view>
        </navigator>
        <navigator class="column_around" url="/pages/my/orderList?choiceTab=4">
          <image src="../images/icon_3_daipingjia@2x.png">
          <view>待评价</view>
        </navigator>
        <navigator class="column_around" url="/pages/my/aftersale">
          <image src="../images/icon_3_shouhou@2x.png">
          <view>售后</view>
        </navigator>
      </view>
    </view> -->

    <view class="s-fc-2">
      <repeat for="{{list}}" item="item" wx:key='index'>

        <navigator class="item between" url="{{item.url}}">
          <view class="flex">
            <image class="icon" src="{{item.img}}">
            <view>{{item.name}}</view>
          </view>
          <image class="arrow" src="../images/icon_you@2x.png">
        </navigator>

      </repeat>

      <button class="clear item between" open-type="contact" session-from="weapp" plain="true">
        <view class="flex">
          <image class="icon" src="../images/my/connect.png">
          <view>联系客服</view>
        </view>
        <image class="arrow" src="../images/icon_you@2x.png">
      </button>
    </view>

  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../utils/http";

export default class Mine extends wepy.page {
  config = {
    navigationBarTitleText: "我的"
  };
  data = {
    isTime: false, //资讯入口封住
    user: null,
    list: [
      {
        name: "抵扣券",
        url: "/pages/article/couponList?type=mine",
        img: "../images/my/coupon.png"
      },
    ]
  };

  components = {};

  onLoad(options) {
    this.user = wx.getStorageSync("memberInfo");
  }

  onShow() {
    let timestamp = Date.parse(new Date()) / 1000;
    console.log("时间戳");
    //定在8.18 18：6分
    if (timestamp - Number(1534586760) > 86400) {
      this.isTime = true;
      this.$apply();
    }
  }
  methods = {};
}
</script>