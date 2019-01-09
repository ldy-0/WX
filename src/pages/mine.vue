<style>
page {
  background: #fff;
}
</style>
<style scoped>
.nodata {
  margin-top: 50%;
  font-size: 38rpx;
  text-align: center;
}

.container {
  background: #fff;
  height: 100vh;
}

.my {
  position: relative;
  width: 100%;
  height: 272rpx;
  z-index: 0;
}
.bg-img {
  width: 100%;
  height: 272rpx;
}
.my .head {
  position: absolute;
  left: 60rpx;
  top: 60rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.my .head .user-img {
  width: 121rpx;
  height: 121rpx;
  border-radius: 50%;
  border: 2rpx solid #fff;
  text-align: center;
  overflow: hidden;
}
.my .head .login {
  padding: 22rpx;
  font-size: 32rpx;
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
.flex image {
  margin-left: 20rpx;
}

.arrow {
  width: 16rpx;
  height: 26rpx;
}

.column_around {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  flex-direction: column;
  height: 100%;
  font-size: 24rpx;
  color: #666666;
}
.column_around image {
  width: 44rpx;
  height: 38rpx;
  margin-top: 30rpx;
}
.column_around view {
  margin-bottom: 20rpx;
}

.row_between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  line-height: 88rpx;
  border: none;
  background: #fff;
  font-size: 28rpx;
  color: #888;
  border-bottom: 1rpx solid #f5f5f5;
  padding: 0;
  padding-right: 30rpx;
}
.icon {
  width: 30rpx;
  height: 30rpx;
  margin-right: 25rpx;
}
.btn-list {
  margin-top: 20rpx;
  margin-left: 30rpx;
}
.img2 {
  width: 32rpx;
  height: 22rpx;
}
.img3 {
  width: 25rpx;
  height: 32rpx;
}
</style>

<template>
  <view class="container">
    <view class="my">
      <image class="bg-img" src="../images/bg_2@2x.png">
      <view class="head">
        <open-data class="user-img" type="userAvatarUrl"></open-data>
        <open-data class="content inputStyle login" type="userNickName" lang="zh_CN"></open-data>
      </view>
    </view>
    <view class="my_manage">
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
    </view>
    <view class="btn-list">
      <repeat for="{{list}}" item="item">
        <navigator class="row_between" url="{{item.url}}">
          <view class="flex">
            <image class="icon img{{index}}" src="{{item.img}}">
            <view>{{item.name}}</view>
          </view>
          <image class="arrow" src="../images/icon_you@2x.png">
        </navigator>
      </repeat>
      <button class="row_between" open-type="contact" session-from="weapp" plain="true">
        <view class="flex">
          <image class="icon" src="../images/icon_4_lianxikefu@2x.png">
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
    wxUserInfo: null,
    list: [
      {
        name: "我的团购",
        url: "/pages/my/groupbuyList",
        img: "../images/icon_tuangou@2x.png"
      },
      {
        name: "我的收藏",
        url: "/pages/my/collectList",
        img: "../images/icon_4_wodeshoucang@2x.png"
      },
      {
        name: "我的优惠券",
        url: "/pages/article/couponList?type=mine",
        img: "../images/coupons@2x.png"
      },
      {
        name: "地址管理",
        url: "/pages/my/addressList",
        img: "../images/icon_4_dizhiguanli@2x.png"
      }
    ]
  };

  components = {};

  onLoad(options) {
    //获取微信个人信息
    this.wxUserInfo = wx.getStorageSync("wxUserInfo");
  }

  onShow() {
    //资讯隐藏分割=====
    let timestamp = Date.parse(new Date()) / 1000;
    console.log("时间戳");
    //定在8.18 18：6分
    //console.log(timestamp-Number(1534586760))
    if (timestamp - Number(1534586760) > 86400) {
      this.isTime = true;
      this.$apply();
    }
    //资讯隐藏分割
  }
  methods = {};
}
</script>