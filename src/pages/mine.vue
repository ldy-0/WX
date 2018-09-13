<style lang='sass' scoped>
@import './base.sass'
.container
  background: #f4f4f4
  height: 100vh
.my
  background: #f2f2f2
  .head
    display: flex
    flex-flow: column nowrap
    justify-content: center
    align-items: center
    height: 300rpx
    background: #fff
    border-top: 1rpx solid #eee
    .user-img
      width: 121rpx
      height: 121rpx
      border-radius: 50%
      text-align: center
      overflow: hidden
    .login
      padding: 22rpx
      font-size: 32rpx
      color: #666
.my_manage
  .my_manage_title
    @include between
    height: 68rpx
    padding: 0 18rpx
    font-size: 24rpx
    color: #636363
    background: $BG_WHITE
.my_manage_status
  @include around
  height: 160rpx
  background: $BG_WHITE
  border-top: 1rpx solid #eee
  border-bottom: 1rpx solid #eee      

.flex
  @include flex
  image
    margin-left: 20rpx
.arrow
  width: 16rpx
  height: 26rpx

.column_around
  @include column_around
  font-size: 24rpx
  color: #666666
  image
    width: 43rpx
    height: 42rpx 
    margin-top: 30rpx
  view
    margin-bottom: 20rpx  

.row_between
  @include between
  box-sizing: border-box
  line-height: 88rpx
  padding: 0 20rpx
  border-top: 1rpx solid #F4F4F4
  background: $BG_WHITE
  font-size: 28rpx
  color: #888
  .icon
    width: 70rpx
    height: 70rpx
    margin-right: 21rpx
    border-radius: 10rpx
</style>

<template>
  <view class='container'>

    <view class='my'>
      <view class='head'>
        <image class="user-img" src='{{wxUserInfo.avatarUrl}}'/>
        <text class='content inputStyle login'>{{wxUserInfo.nickName}}</text>
      </view>
    </view>
    <view class="wire-gray"></view>
    <view class='my_manage'>
      <navigator class='my_manage_title' url='/pages/my/orderList?choiceTab=0'>
          <view>个人管理</view>
          <view class='flex'>
              <view>全部订单</view>
              <image class='arrow' src='../images/icon_zuojiantou@2x.png' />
          </view>
      </navigator>
      <view class='my_manage_status'>
          <navigator class='column_around' url='/pages/my/orderList?choiceTab=1'>
              <image src='../images/icon_7_daifukuan@2x.png' />
              <view>待付款</view>
          </navigator>
          <navigator class='column_around' url='/pages/my/orderList?choiceTab=2'>
              <image src='../images/icon_7_daifahuo@2x.png' />
              <view>待发货</view>
          </navigator>
          <navigator class='column_around' url='/pages/my/orderList?choiceTab=3'>
              <image src='../images/icon_7_daishouhuo@2x.png' />
              <view>待收货</view>
          </navigator>
          <navigator class='column_around' url='/pages/my/orderList?choiceTab=4'>
              <image src='../images/icon_7_daipingjia@2x.png' />
              <view>待评价</view>
          </navigator>
      </view>
      <view class="wire-gray"></view>
      <repeat for='{{list}}' item='item'>
          <navigator class='row_between' url='{{item.url}}'>
              <view class='flex'>
                  <image class='icon' src='{{item.img}}' />
                  <view>{{item.name}}</view>
              </view>
              <image class='arrow' src='../images/icon_zuojiantou@2x.png' />
          </navigator>
      </repeat>
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
    wxUserInfo: null,
    list: [
      {
        name: "我的优惠券",
        url: "/pages/my/coupons",
        img: "../images/icon_8_youhuijian@2x.png"
      },
      {
        name: "我的预约",
        url: "/pages/my/appointment",
        img: "../images/icon_8_yuyue@2x.png"
      },
      {
        name: "我的砍价",
        url: "/pages/my/bargainList",
        img: "../images/icon_8_kanjia@2x.png"
      },
      {
        name: "我的团购",
        url: "/pages/my/groupbuyList",
        img: "../images/icon_8_tuangou@2x.png"
      },
      {
        name: "我的售后",
        url: "/pages/my/afterSale",
        img: "../images/icon_8_shouhou@2x.png"
      },
      {
        name: "收货地址管理",
        url: "/pages/my/addressList",
        img: "../images/icon_8_dizhi@2x.png"
      },
    ]
  };

  components = {};

  onLoad(options) {
    this.wxUserInfo = wx.getStorageSync("wxUserInfo");
  }
  onShow() {
    this.$apply();
  }
  methods = {};
}
</script>