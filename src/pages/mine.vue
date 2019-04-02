
<style scoped>
page {
  background: #fff;
}
.nodata {
  margin-top: 50%;
  font-size: 38rpx;
  text-align: center;
}

.container {
  background: rgb(244, 244, 244);
  height: 100vh;
}

.my {
  /* position: relative; */
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
  /* position: relative; */
  z-index: 99;
  width: 100%;
  height: 230rpx;
  margin: 0 auto;
  margin-bottom: 20rpx;
  /* margin-top: 0rpx;
  border-radius: 24rpx 24rpx 0 0; */
  /* box-shadow: 0px 0px 10px 0px rgba(241, 231, 225, 0.6); */
}
.my_manage_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 68rpx;
  padding: 0 18rpx;
  font-size: 24rpx;
  color: #222222;
  background: #fff;
  /* border-radius: 24rpx 24rpx 0 0; */
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
.my_manage .flex{
  color: #8f8f8f;
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
  padding:  0 30rpx 0;
  /* padding-right: 30rpx; */
}
.row_between .flex{
  color: #222222;
}
.icon {
  width: 30rpx;
  height: 30rpx;
  margin-right: 25rpx;
}
.btn-list {
  margin-top: 20rpx;
  /* margin-left: 30rpx; */
}
.img2 {
  width: 32rpx;
  height: 22rpx;
}
.img3 {
  width: 25rpx;
  height: 32rpx;
}
.my_assets{
  background-color: #fff;
  display:flex;
  justify-content: space-around;
  height: 150rpx;
  margin-bottom: 20rpx;
}
.my_assets .assets{
	color: #222222;
  text-align:center;
  font-family: PingFang-SC-Medium;
  letter-spacing: 1rpx;
  font-weight: normal;
	font-stretch: normal;
  margin-top:35rpx;

}
.my_assets .assets text{
  width: 80rpx;
	font-size: 38rpx;
	color: #5bbd5b;
}
.my_assets .assets view{
	font-size: 28rpx;
	color: #222222;
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
    <view class="my_assets">
      <navigator  url="/pages/my/distribution">
        <view class="assets">
            <text>0.00</text>
            <view>余额</view>
        </view>
      </navigator>
      <navigator  url="/pages/my/pointCenter">
        <view class="assets">
            <text>0.00</text>
            <view>德分</view>
        </view>
      </navigator>
      <view class="assets">
          <text>0.00</text>
          <view>积分</view>
      </view>
      <navigator  url="/pages/article/couponList">
        <view class="assets">
            <text>0.00</text>
            <view>优惠券</view>
        </view>
      </navigator>
    </view>
    <view class="my_manage">
      <navigator class="my_manage_title" url="/pages/my/orderList?choiceTab=0">
        <view>我的订单</view>
        <view class="flex">
          <view>查看全部订单</view>
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

        <navigator @tap="toMyStore" class="row_between" app-id="wx377f4525af400383" target="miniProgram" path = "" version = "develop"> 
            <view class="flex">
            <image class="icon" src="../images/icon_4_wodeshangcheng@2x.png">
            <view>我的商城</view>
          </view>
          <image class="arrow" src="../images/icon_you@2x.png">
        </navigator>
  
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
        img: "../images/icon_4_wodetuangou@2x.png"
      },
      {
        name: "我的砍价",
        url: "/pages/activities/bargainOrder",
        img: "../images/icon_4_wodekanjia@2x.png"
      },
      {
        name: "我的秒杀",
        url: "/pages/activities/seckillOrder",
        img: "../images/icon_4_wodemiaosha@2x.png"
      },
      {
        name: "我的收藏",
        url: "/pages/my/collectList",
        img: "../images/icon_4_wodeshoucang@2x.png"
      },
      {
        name: "分销中心",
        url: "/pages/my/distribution",
        img: "../images/icon_4_fenxiao@2x.png"
      },
      // {
      //   name: "我的优惠券",
      //   url: "/pages/article/couponList?type=mine",
      //   img: "../images/coupons@2x.png"
      // },
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
  methods = {
    toMyStore(){
      wx.navigateToMiniProgram({
        appId: 'wx377f4525af400383',
        path: '',
        extraData: {
          foo: 'bar'
        },
        envVersion: 'develop',
        success(res) {
          // 打开成功
        }
      })
    }
  };
}
</script>