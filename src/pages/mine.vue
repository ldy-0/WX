
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
.login{
  margin: 0 20rpx;
  font-size: 30rpx;
}
.level{
  padding: 8rpx 20rpx;
  border-radius: 20rpx;
  font-size: 22rpx;
}

.my_manage {
  z-index: 99;
  width: 100%;
  height: 230rpx;
  margin: 0 auto;
  margin-bottom: 20rpx;
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

.icon_wrap{
  width: 32rpx;
  height: 32rpx;
  margin-right: 25rpx;
}
.icon_wrap image{
  width: 100%;
  height: 100%;
  margin: 0;
}
.icon {
  width: 30rpx;
  height: 30rpx;
}
.btn-list {
  margin-top: 20rpx;
}
.img0{
  width: 21rpx;
  height: 21rpx;
}
.img1{
  width: 23rpx;
  height: 28rpx;
}
.img2, .img3{
  width: 28rpx;
  height: 28rpx;
}
.img4{
  width: 26rpx;
  height: 27rpx; 
}
.img5{
  width: 24rpx;
  height: 30rpx;
}
.img6{
  width: 28rpx;
  height: 30rpx;
}
.img7{
  width: 32rpx;
  height: 28rpx;
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

.center{
  display: flex;
  justify-content: center;
  align-items: center;
}

.s_bg_0{ background: rgba(0, 0, 0, 0.2); }
</style>

<template>
  <view class="container">
    <view class="my">
      <image class="bg-img" src="../images/bg_2@2x.png">
      <view class="head">
        <open-data class="user-img" type="userAvatarUrl"></open-data>
        <view class='flex'>
          <open-data class="login" type="userNickName" lang="zh_CN"></open-data>
          <view class='level s_bg_0'>{{level}}</view>
        </view>
      </view>
    </view>
    <view class="my_assets">
      <navigator  url="/pages/my/distribution/distribution">
        <view class="assets">
            <text>{{memberInfo.available_predeposit}}</text>
            <view>余额</view>
        </view>
      </navigator>
      <navigator  url="/pages/my/dScore/pointCenter">
        <view class="assets">
            <text>{{memberInfo.available_rc_balance}}</text>
            <view>德分</view>
        </view>
      </navigator>
      <view class="assets">
          <text>{{memberInfo.member_points}}</text>
          <view>积分</view>
      </view>
      <navigator url="/pages/article/couponList?type=mine">
        <view class="assets">
            <text>{{couponCount}}</text>
            <view>优惠券</view>
        </view>
      </navigator>
    </view>
    <view class="my_manage">
      <navigator class="my_manage_title" url="/pages/order/orderList?choiceTab=0">
        <view>我的订单</view>
        <view class="flex">
          <view>查看全部订单</view>
          <image class="arrow" src="../images/icon_zuojiantou@2x.png">
        </view>
      </navigator>
      <view class="my_manage_status">
        <navigator class="column_around" url="/pages/order/orderList?choiceTab=1">
          <image src="../images/icon_3_daifukuan@2x.png">
          <view>待付款</view>
        </navigator>
        <navigator class="column_around" url="/pages/order/orderList?choiceTab=2">
          <image src="../images/icon_3_daifahuo@2x.png">
          <view>待发货</view>
        </navigator>
        <navigator class="column_around" url="/pages/order/orderList?choiceTab=3">
          <image src="../images/icon_3_daishouhuo@2x.png">
          <view>待收货</view>
        </navigator>
        <navigator class="column_around" url="/pages/order/orderList?choiceTab=4">
          <image src="../images/icon_3_daipingjia@2x.png">
          <view>待评价</view>
        </navigator>
        <navigator class="column_around" url="/pages/order/aftersaleList">
          <image src="../images/icon_3_shouhou@2x.png">
          <view>售后</view>
        </navigator>
      </view>
    </view>
    <view class="btn-list">
      <repeat for="{{list}}" item="item">

        <button class="row_between" open-type="contact" session-from="weapp" plain="true" wx:if="{{item.type}}">
          <view class="flex">
            <view class='icon_wrap center'>
              <image class="icon img{{index}}" src="{{item.img}}" />
            </view>
            <view>{{item.name}}</view>
          </view>
          <image class="arrow" src="../images/icon_you@2x.png">
        </button>
        <navigator class="row_between" url="{{item.url}}" wx:else>
          <view class="flex">
            <view class='icon_wrap center'>
              <image class="icon img{{index}}" src="{{item.img}}" />
            </view> 
            <view>{{item.name}}</view>
          </view>
          <image class="arrow" src="../images/icon_you@2x.png">
        </navigator>

      </repeat>
      
      <!-- main mall -->
      <navigator @tap="toMainMall" class="row_between" app-id="wx34b07887a612c62c" target="miniProgram" path = "" version = "develop" wx:if="{{!isMain}}"> 
        <view class="flex">
          <view class='icon_wrap center'>
            <image class="icon img{{index}}" src="../images/my/mall.png" />
          </view>
          <view>我的商城</view>
        </view>
        <image class="arrow" src="../images/icon_you@2x.png">
      </navigator>
      <!-- card main mall -->
      <navigator @tap="toMyStore" class="row_between" app-id="wx377f4525af400383" target="miniProgram" path = "" version = "develop" wx:else> 
        <view class="flex">
          <view class='icon_wrap center'>
            <image class="icon img{{index}}" src="../images/my/mall.png" />
          </view>
          <view>我的商城</view>
        </view>
        <image class="arrow" src="../images/icon_you@2x.png">
      </navigator>

      <navigator class="row_between" url='/pages/my/manage/index' wx:if="{{hasCard}}"> 
        <view class="flex">
        <view class='icon_wrap center'>
            <image class="icon img{{index}}" src="../images/my/manage.png" />
          </view>
          <view>管理入口</view>
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
    memberInfo: null,
    couponCount: '',
    list: [
      {
        name: "我的团购",
        url: "/pages/my/groupbuyList",
        img: "../images/my/groupBuy.png"
      },
      {
        name: "我的砍价",
        url: "/pages/activities/bargainOrder",
        img: "../images/my/bargain.png"
      },
      {
        name: "我的秒杀",
        url: "/pages/activities/seckillOrder",
        img: "../images/my/seckill.png"
      },
      {
        name: "我的收藏",
        url: "/pages/my/collectList",
        img: "../images/my/collection.png"
      },
      {
        name: "分销中心",
        url: "/pages/my/distribution/distribution",
        img: "../images/my/distribution.png"
      },
      // {
      //   name: "我的优惠券",
      //   url: "/pages/article/couponList?type=mine",
      //   img: "../images/coupons@2x.png"
      // },
      {
        name: "地址管理",
        url: "/pages/my/addressList?referer=my",
        img: "../images/my/address.png"
      },
      {
        name: "联系客服",
        type: 'concat',
        img: "../images/my/concat.png"
      }
    ]
  };

  components = {};

  computed = {
    isMain(){ return this.$parent.globalData.type == 1 },
    hasCard(){ return this.memberInfo && this.memberInfo.card_mall; },
    level(){
      let level = [
        { id: 0, name: '体验代理' },
        { id: 1, name: 'VIP1' },
        { id: 2, name: 'VIP2' },
        { id: 3, name: 'VIP3' },
        { id: 4, name: 'VIP4' },
      ];

      if(this.memberInfo) return level.filter(v => v.id === this.memberInfo.vip_level)[0].name;
    }
  }

  onLoad(options){}

  onShow() {
    this.getUserInfo();
    this.getCouponCount();
  }

  methods = {
    toMainMall(){
      let path = `/pages/authorize`;
      console.error(path);

      wx.navigateToMiniProgram({
        appId: 'wx34b07887a612c62c',
        path,
        extraData: {},
        envVersion: 'develop',
        success(res) {
          console.error('success:', res);
        },
        fail(e){ console.error(e); }
      })
    },
    toMyStore(){
      let path = `/pages/authorize?referer=${encodeURIComponent(`/pages/card?referer=self`)}`;
      console.error(path);

      wx.navigateToMiniProgram({
        appId: 'wx377f4525af400383',
        path,
        extraData: {},
        envVersion: 'develop',
        success(res) {
          console.error('success:', res);
        },
        fail(e){ console.error(e); }
      })
    }
  };

  async getUserInfo(){
    let param = {};

    let res = await shttp.get(`/api/v2/member/memberinfo`).query(param).end();

    if(res && res.data){
      wx.setStorageSync('memberInfo', res.data);
    }

    this.memberInfo = wx.getStorageSync("memberInfo");
    this.$apply();
  }

  async getCouponCount(){
    let param = {
      voucher_state: 0
    };

    let res = await shttp.get(`/api/v2/member/coupon`).query(param).end();

    if(res && res.data){
      this.couponCount = res.data.length;
    }

    this.$apply();
  }
}
</script>