<style>
page {
  background: #f5f5f5;
}
.container {
  font: 32rpx PingFang-SC-Medium;
}

.column {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
}

.share {
  background: #fff;
  padding: 0rpx;
  border: 0 !important;
  border-radius: 0 !important;
  margin: 0;
  line-height: 28rpx;
  color: #888888;
  font-size: 22rpx;
}

.column_center {
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #888;
  font-size: 20rpx;
}

.goods-swiper {
  width: 100%;
  height: 750rpx;
}
.swiper-box {
  width: 100%;
  height: 750rpx;
  position: relative;
}
.instructions {
  position: absolute;
  right: 20rpx;
  bottom: 30rpx;
  width: 80rpx;
  height: 44rpx;
  background-color: #000000;
  border-radius: 21rpx;
  opacity: 0.5;
  color: #fff;
  text-align: center;
  line-height: 44rpx;
  font-size: 20rpx;
}
.goods-swiper .goods_swiper_itme {
  width: 100%;
  height: 100%;
}
.goods-swiper .goods_swiper_itme image {
  width: 100%;
  height: 100%;
}

.product_info {
  background: #fff;
}
.product_info .goods {
  padding: 20rpx;
}
.product_info .goods .goods_main_info,
.product_info .goods .goods_other_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product_info .goods .product_title {
  width: 560rpx;
  color: #222222;
  font-size: 32rpx;
}
.product_info .goods .share_icon {
  width: 34rpx;
  height: 34rpx;
}
.product_info .goods .qr_icon {
  width: 38rpx;
  height: 36rpx;
  padding: 0 10rpx;
}
.product_info .goods .text {
  font-size: 24rpx;
  color: #888;
}
.product_info .goods .product_address {
  margin: 15rpx 0 45rpx;
}
.product_info .goods .product_address,
.product_info .goods .product_number {
  font-size: 28rpx;
  color: #888;
}
.product_info .goods .product_standard {
  font-size: 24rpx;
  color: #888;
}

.standard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88rpx;
  margin: 20rpx 0;
  padding: 0 19rpx;
  background: #fff;
  color: #888888;
}
.standard image {
  width: 16rpx;
  height: 28rpx;
}

.detail {
  margin-bottom: 20rpx;
  background: #fff;
}
.detail .detail_title {
  line-height: 88rpx;
  font-size: 28rpx;
  color: #636363;
  background: #fff;
  text-align: center;
}
.detail .detail_img {
  width: 100%;
}
.detail .space {
  height: 80rpx;
}
.space {
  height: 100rpx;
}
.product {
  position: absolute;
  background: #fff;
  /* height: 540rpx; */
  bottom: 0;
  left: 0;
  width: 100%;
}
.product .base_info {
  position: absolute;
  display: flex;
  padding: 0 30rpx;
  top: -38rpx;
  width: 100%;
  /* height: 180rpx; */
}
.product .base_info image {
  width: 180rpx;
  height: 180rpx;
  margin-right: 23rpx;
  border-radius: 20rpx;
}
.product .base_info .product_standard {
  font-size: 24rpx;
  color: #636363;
}
.delete-btn {
  position: absolute;
  width: 28rpx;
  height: 28rpx;
  padding: 30rpx;
  top: 0;
  right: 0;
  background: #fff;
  border-radius: 50%;
}
.product .standard_wrap {
  background: #fff;
  margin-top: 188rpx;
  padding: 0 30rpx;
}
.product .standard_wrap .standard_title {
  margin: 0 30rpx 30rpx;
  color: #222;
  font-size: 28rpx;
}
.product .standard_wrap .standard_info {
  display: flex;
  padding-left: 30rpx;
}
.product .standard_wrap .standard_info .checked {
  color: #fff;
  background: #f17f30;
}
.product .standard_wrap .standard_info view {
  margin: 0 40rpx 30rpx 0;
  padding: 7rpx 25rpx;
  border-radius: 5rpx;
  border: solid 1rpx #d3d3d3;
  font-size: 28rpx;
  color: #333333;
}
.product .row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product .row .number_title {
  margin: 36rpx 30rpx;
  color: #222;
  font-size: 28rpx;
}
.product .row .number_wrap {
  display: flex;
  margin-right: 30rpx;
  height: 64rpx;
  border: solid 1rpx #d3d3d3;
  border-radius: 5rpx;
}
.minus,
.add {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 82rpx;
}
.minus-bg {
  background-color: #f8f8f8;
}
.icon_minus {
  width: 19rpx;
  height: 2rpx;
}
.icon_add {
  width: 20rpx;
  height: 20rpx;
}
.number {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  width: 80rpx;
  color: #333;
  border-left: 1rpx solid #d3d3d3;
  border-right: 1rpx solid #d3d3d3;
}

.bottom_bar {
  position: fixed;
  bottom: 0rpx;
  display: flex;
  width: 100%;
  background: #fff;
  height: 104rpx;
}
.bottom_bar .icon {
  flex-grow: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  border-top: 1rpx solid #e6e6e6;
  height: 103rpx;
  font-size: 20rpx;
  width: 320rpx;
}
.bottom_bar .icon view {
  text-align: center;
}
.bottom_bar .icon .red_dot_wrap {
  position: relative;
}
.bottom_bar .icon .red_dot_wrap .red_dot {
  position: absolute;
  top: -7rpx;
  right: 0rpx;
  color: #fff;
  background: #fc332b;
  width: 34rpx;
  height: 34rpx;
  text-align: center;
  line-height: 34rpx;
  border-radius: 50%;
}

.warp_btn {
  width: 450rpx;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: 1rpx solid #e6e6e6;
}
.add_btn,
.buy_btn {
  width: 200rpx;
  text-align: center;
  height: 76rpx;
  line-height: 76rpx;
  border-radius: 10rpx;
  margin-right: 20rpx;
}
.warp_btn .buttonStyle {
  text-align: center;
  line-height: 104rpx;
  width: 215rpx;
  background: #fff;
  padding: 0rpx;
  border: 0 !important;
  border-radius: 0 !important;
  color: #fff;
  background: #ff4444;
}
.add_btn {
  color: #fff;
  background: #3a3a47;
}
.buy_btn {
  color: #fff;
  background: #f17f30;
}
.warp_btn .appointment-btn {
  width: 430rpx;
}

.warp_price {
  display: flex;
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  justify-content: space-between;
}

.pro_name {
  font-size: 28rpx;
  margin-left: 10rpx;
}
.product_name {
  font-size: 32rpx;
  color: #333333;
  margin-right: 12rpx;
  margin-top: 60rpx;
  margin-bottom: 20rpx;
}
.product_price {
  font-size: 40rpx;
  color: #dd3d27;
  margin-right: 12rpx;
}

.tab-icon2 {
  width: 46rpx;
  height: 42rpx;
}
.tab-icon1 {
  width: 44rpx;
  height: 43rpx;
}
.tab-icon3 {
  width: 45rpx;
  height: 43rpx;
}

.standard-box {
  position: fixed;
  z-index: 9999;
  height: 100vh;
  background: rgba(1, 1, 1, 0.3);
  width: 100%;
}

.description {
  width: 100%;
  padding: 30rpx 30rpx;
  color: #636363;
  font-size: 28rpx;
  background: #fff;
  white-space: pre-wrap;
  box-sizing: border-box;
}
.text3 {
  font-size: 24rpx;
  color: #888888;
  padding-left: 20rpx;
  text-decoration: line-through;
}
.comment {
  padding: 20rpx;
  font-size: 28rpx;
  color: #000;
  background: #fff;
}
.more_btn {
  display: flex;
  align-items: center;
}
.more_btn text {
  padding-right: 10rpx;
  color: #f17f30;
  font-size: 26rpx;
}
.comment .item .user {
  display: flex;
  align-items: center;
}
.comment .item .head {
  margin: 24rpx 20rpx 20rpx 0;
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
}
.over_model {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  width: 100%;
  height: 100%;
  top: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.save_btn {
  width: 280rpx;
  height: 60rpx;
  background: #fff;
  line-height: 60rpx;
  border: 1rpx solid #000;
  border-radius: 10rpx;
  text-align: center;
  margin-top: 60rpx;
}
.shareBox {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  height: 243rpx;
}
.shareBox-item {
  height: 80rpx;
  text-align: center;
  font-size: 30rpx;
  line-height: 80rpx;
  border-bottom: 1rpx solid #f5f5f5;
}
.text11 {
  font-size: 28rpx;
}
.text22 {
  padding-left: 44rpx;
  font-size: 24rpx;
  color: #888888;
}
.row-btnCtn {
  display: flex;
  justify-content: space-between;
  padding: 0 30rpx;
}
.row-btn {
  width: 330rpx;
  margin: 0;
}
.group_btn {
  width: 420rpx;
}
.countDown-txt {
  color: #9c9a9b;
  font-size: 24rpx;
}
.countDown-txt .countDown-txt2 {
  display: inline-block;
  width: 22rpx;
  height: 26rpx;
  background: #af0000;
  color: #fff;
  text-align: center;
  line-height: 26rpx;
  margin-right: 6rpx;
  font-size: 20rpx;
}
.countDown-box {
  height: 88rpx;
  line-height: 88rpx;
  background: #fff;
  text-align: center;
}
.countDown-txt1 {
  color: #af0000;
}
.countDown-txt3 {
  color: #af0000;
}
.headline-txt1 {
  height: 68rpx;
  line-height: 68rpx;
  padding-left: 20rpx;
  font-size: 28rpx;
  color: #ff7900;
  background: #fff;
  border-top: 1rpx solid #e5e5e5;
  border-bottom: 1rpx solid #e5e5e5;
}
.headimg-list {
  display: flex;
  background: #fff;
  flex-wrap: wrap;
  padding-top: 25rpx;
  padding-bottom: 25rpx;
}
.headimg-item {
  width: 125rpx;
  overflow: hidden;
  text-align: center;
  font-size: 24rpx;
  padding-top: 15rpx;
}
.headimg-itemImg {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
}
.headimg-itemMore {
  width: 72rpx;
  height: 72rpx;
  background: #d8d8d8;
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6rpx;
}
.headimg-itemMore image {
  width: 48rpx;
  height: 12rpx;
}
.groupon-box {
  width: 580rpx;
  border-radius: 15rpx;
  background: #fff;
}
.groupon-txt1 {
  font-size: 34rpx;
  width: 100%;
  text-align: center;
  padding-top: 55rpx;
  padding-bottom: 20rpx;
}
.groupon-txt2 {
  width: 100%;
  text-align: center;
  font-size: 28rpx;
}
.groupon-txt2 text {
  color: #af0000;
}
.groupon-txt3 {
  font-size: 26rpx;
  color: #888888;
}
.groupon-txt3Color {
  color: #ff7900;
}
.groupon-txt4 {
  font-size: 28rpx;
  color: #222;
}
.groupon-txt5 {
  display: flex;
  align-items: center;
}
.groupon-txt5 text {
  padding-right: 10rpx;
  font-size: 22rpx;
  color: #888;
}
.groupon-tag {
  border-top: 1rpx solid #f4f4f4;
  padding: 20rpx;
  background: #fff;
}
.groupon-tag1 {
  font-size: 28rpx;
  color: #888;
  padding-right: 16rpx;
  padding-top: 4rpx;
}
.groupon-tag2 {
  padding: 10rpx 24rpx;
  font-size: 28rpx;
  color: #fff;
  background: #feaa26;
  border-radius: 25rpx;
}
.groupon-tag3 {
  width: 290rpx;
  height: 50rpx;
  color: #fff;
  font-size: 28rpx;
  text-align: center;
  line-height: 50rpx;
  border-radius: 25rpx;
  margin-bottom: 20rpx;
  background: #feaa26;
}
.sales-box {
  display: flex;
}
.groupon-btn {
  margin: 0 auto;
  width: 500rpx;
  height: 86rpx;
  text-align: center;
  line-height: 86rpx;
  background-color: #ff7900;
  border-radius: 10rpx;
  font-size: 34rpx;
  margin-bottom: 37rpx;
  color: #fff;
}
.groupon-imgList {
  margin: 40rpx 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.grouponer-image {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  background: #f1f1f2;
  border: 1rpx dotted #a0a0a0;
  margin-right: 20rpx;
}
.groupon-list {
  background: #fff;
}
.groupon-mb {
  margin-bottom: 0;
}
.groupon-listBox {
  margin: 0 20rpx;
  padding: 20rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1rpx solid #e6e6e6;
}
.groupon-details {
  display: flex;
  width: 490rpx;
  padding-left: 30rpx;
  height: 80rpx;
  flex-direction: column;
  justify-content: space-between;
}
.groupon-detailsOne {
  font-size: 24rpx;
  color: #222222;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.groupon-bottom {
  font-size: 24rpx;
}
.groupon-bottom text {
  color: #af0000;
}
.groupon-goBtn {
  width: 120rpx;
  height: 44rpx;
  color: #ff7900;
  font-size: 28rpx;
  text-align: center;
  line-height: 44rpx;
  border-radius: 10rpx;
  border: 1rpx solid #ff7900;
}
.groupon-active {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  overflow: hidden;
}
.headimg-itemTxt {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.group_btnBg {
  background: #a0a0a0;
}
.comment-imgs {
  margin-top: 8rpx;
  display: flex;
  flex-wrap: wrap;
}
.comment-imgItem {
  width: 176rpx;
  height: 176rpx;
  margin-right: 2rpx;
  margin-bottom: 2rpx;
}
.comment-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.more_btnImg {
  width: 12rpx;
  height: 22rpx;
}
.star-image {
  width: 32rpx;
  height: 32rpx;
  margin-right: 5rpx;
  margin-left: 5rpx;
}
</style>

<template>
  <view class="container">
    <view wx:if="{{showStandard}}" class="standard-box">
      <view class="product">
        <view class="base_info">
          <image src="{{goods.goods_image}}" mode="aspectFill">
            <view>
              <view class="product_name">{{goods.goods_name}}</view>
              <view class="product_price">
                <text style="font-size:28rpx">¥</text>
                {{isMultiSku ? multiSku.price : goods.goods_price}}
              </view>
              <!-- <view class>库存：{{goods.goods_storage}}</view> -->
            </view>
        </view>
        <image class="delete-btn" src="../../images/icon_cha@2x.png" @tap="deleteBtn">

          <view class="standard_wrap" wx:if='{{isMultiSku}}'>
            <view class="standard_title">规格</view>
            <!-- <view class="standard_info">
            <repeat for="{{standards}}" index="index" item="item">
              <view class="{{isChecked==index?'checked':''}}" @tap="checked({{index}})">{{item}}</view>
            </repeat>
          </view> -->
            <scroll-view scroll-y='true' style='height: 200rpx;'>
              <multiSku :classList.sync='skuClassList' :skus.sync='skus' :field='field' @update.user='updateSku'></multiSku>
            </scroll-view>
          </view>
          <view class='standard_wrap' wx:else>
          </view>

          <view class="row">
            <view class="number_title">购买数量</view>
            <view class="number_wrap">
              <view class="minus {{getSize==1?'minus-bg':''}}" @tap="minus">
                <image class="icon_minus" src="../../images/icon_jian@2x.png">
              </view>
              <view class="number">{{getSize}}</view>
              <view class="add" @tap="add">
                <image class="icon_add" src="../../images/icon_jia@2x.png">
              </view>
            </view>
          </view>
          <view class="row-btnCtn">
            <view class="add_btn row-btn" @tap="addShoppingCart()">加入购物车</view>
            <view class="buy_btn row-btn" @tap="firmOrder()">立即购买</view>
          </view>
      </view>
    </view>
    <view>
      <view class="swiper-box">
        <swiper class="goods-swiper" indicator-active-color="{{indicatorActiveColor}}" indicator-color="{{indicatorColor}}" indicator-dots="{{indicatorDots}}" autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}" circular="true" bindchange="swiperchange">
          <repeat wx:if="{{TYPE== 'normal'}}" for="{{goods.goodsimagesList}}" key="index" index="index" item="item">
            <swiper-item class="goods_swiper_itme">
              <image src="{{item.goodsimage_url}}" mode="aspectFill">
            </swiper-item>
          </repeat>
          <repeat wx:if="{{TYPE== 'group'||TYPE== 'grouponing'}}" for="{{goods.images}}" key="index" index="index" item="item">
            <swiper-item class="goods_swiper_itme">
              <image src="{{item}}" mode="aspectFill">
            </swiper-item>
          </repeat>
        </swiper>
        <view class="instructions" wx:if="{{TYPE== 'normal'}}">{{current}}/{{goods.goodsimagesList.length}}</view>
        <view class="instructions" wx:if="{{TYPE== 'group' ||TYPE== 'grouponing'}}">{{current}}/{{goods.images.length}}</view>
      </view>
      <view class="product_info">
        <view class="goods">
          <view class="goods_main_info">
            <view class="column">
              <view class="product_title">{{goods.goods_name}}</view>
              <view class="product_title" wx:if="{{TYPE== 'group'||TYPE== 'grouponing'}}">{{goods.spec ||'单规格商品'}}</view>
            </view>
            <view wx:if="{{TYPE== 'normal'}}" class="column_center" @tap="enshrine">
              <image src="{{goods.enshrine_type==1?'../../images/icon_pingfen_hl@2x.png':'../../images/icon_pingfen@2x.png'}}" class="qr_icon">
                {{goods.enshrine_type==1?'已收藏':'收藏'}}
            </view>
            <view wx:if="{{TYPE== 'normal'}}" class="column_center" @tap="showShare">
              <image src="../../images/icon_6_fenxiang@2x.png" class="share_icon">分享
            </view>
          </view>
          <view class="product_price">
            <text class="text11">¥</text>
            {{goods.goods_price}}
            <text class="text3" wx:if="{{TYPE== 'group'||TYPE== 'grouponing'}}">¥{{goods.goods_marketprice}}</text>
            <text class="text22">运费:¥{{goods.goods_freight}}</text>
            <text class="text22" wx:if="{{TYPE== 'normal'}}">已售：{{goods.goods_salenum}}</text>
          </view>
          <!-- <view class="goods_other_info">
              <view class="text">库存：{{goods.goods_storage}}</view>
              <view class="text">已售：{{goods.goods_salenum}}</view>
            </view>-->
        </view>
      </view>
      <view wx:if="{{TYPE== 'normal'}}" class="standard" @tap="goStandard">
        <view>规格 {{isMultiSku ? multiSku.skuStr : goods.standard}}</view>
        <image src="../../images/icon_zuojiantou@2x.png">
      </view>
      <view wx:if="{{TYPE=='grouponing'}}">
        <view class="countDown-box" wx:if="{{pintuanDetails.pintuangroup_state == 1}}">
          <view class="countDown-txt">活动
            <text class="countDown-txt1">结束</text>倒计时
            <text class="countDown-txt3">{{wxTimerList['wxTimer1'].d!=0?wxTimerList['wxTimer1'].d+'天':''}}</text>
            <text class="countDown-txt2">{{wxTimerList['wxTimer1'].h1}}</text>
            <text class="countDown-txt2">{{wxTimerList['wxTimer1'].h2}}</text>时
            <text class="countDown-txt2">{{wxTimerList['wxTimer1'].m1}}</text>
            <text class="countDown-txt2">{{wxTimerList['wxTimer1'].m2}}</text>分
            <text class="countDown-txt2">{{wxTimerList['wxTimer1'].s1}}</text>
            <text class="countDown-txt2">{{wxTimerList['wxTimer1'].s2}}</text>秒
          </view>
        </view>
        <view class="countDown-box" wx:if="{{pintuanDetails.pintuangroup_state != 1}}">
          <view class="countDown-txt">
            <text class="countDown-txt1">活动结束</text>
          </view>
        </view>
        <view class="headline-txt1">参团人员</view>
        <view class="headimg-list">
          <repeat for="{{pintuanDetails.members}}" item="item">
            <view class="headimg-item">
              <image class="headimg-itemImg" src="{{item.member_avatar}}">
                <view class="headimg-itemTxt">{{item.member_name}}</view>
            </view>
          </repeat>
        </view>
      </view>
      <view class="groupon-list" wx:if="{{groupListshow}}">
        <view class="standard groupon-mb" @tap="goGroupList">
          <view class="groupon-txt4">{{groupInfo.pinsum}}人在开团，可直接参与</view>
          <view class="groupon-txt5">
            <text>查看更多</text>
            <image src="../../images/icon_zuojiantou@2x.png">
          </view>
        </view>
        <repeat for="{{groupInfo.pinlist}}" item="item" index="index">
          <view class="groupon-listBox">
            <image class="groupon-active" src="{{item.pintuangroup_avatar}}">
              <view class="groupon-details">
                <view class="groupon-detailsOne">{{item.pintuangroup_headname}}</view>
                <view class="groupon-bottom" wx:if="{{item.pintuangroup_state == 1}}">剩余
                  <text>{{wxTimerList[index].d!=0?wxTimerList[index].d+'天':''}} {{wxTimerList[index].wxTimer}}</text>结束，差
                  <text>{{item.pintuangroup_surplus}}</text>人
                </view>
                <view class="groupon-bottom" wx:if="{{item.pintuangroup_state != 1}}">已结束</view>
              </view>
              <view class="groupon-goBtn" @tap="gogroupon" data-groupondata="{{item}}">去拼团</view>
          </view>
        </repeat>
      </view>
      <view class="comment" wx:if="{{comment[0]}}">
        <view class="comment-top">
          <view>宝贝评价({{comment.length}})</view>
          <view class="more_btn" @tap="goComment" data-goodid="{{goods.SKUList[0].goods_id || goods.goods_id}}">
            <text>查看全部</text>
            <image class="more_btnImg" src="../../images/icon_chakanquanbu@2x.png">
          </view>
        </view>
        <view class="item">
          <view class="user">
            <image src="{{comment[0].geval_frommemberavatar}}" class="head">
              {{comment[0].geval_frommembername}}
              <block wx:for="{{comment[0].geval_scores}}" wx:key>
                <image class="star-image" src="../../images/icon_pingfen_hl@2x.png">
              </block>
              <block wx:for="{{5-comment[0].geval_scores}}" wx:key>
                <image class="star-image" src="../../images/icon_pingfen@2x.png">
              </block>
          </view>
          <view>{{comment[0].geval_content}}</view>
          <view class="comment-imgs" wx:if="{{comment[0].geval_image.length>0}}">
            <repeat for="{{comment[0].geval_image}}" item="img" index="index">
              <image src="{{img}}" class="comment-imgItem" mode="aspectFill">
            </repeat>
          </view>
        </view>
      </view>
      <view class="detail">
        <view class="detail_title">商品详情</view>
        <rich-text style="width: 100%; height: auto;" nodes="{{goodsBody}}"></rich-text>
        <view class="space"></view>
      </view>
    </view>
    <view class="bottom_bar">
      <view class="icon">
        <navigator open-type="switchTab" url="/pages/home" hover-class="none">
          <image class="tab-icon2" src="../../images/icon_2_shouye@2x.png">
            <view>主页</view>
        </navigator>
        <button class="share" plain="true" open-type="contact">
          <image class="tab-icon1" src="../../images/icon_2_kefu@2x.png">
            <view>客服</view>
        </button>
        <view class="red_dot_wrap" wx:if="{{TYPE== 'normal'}}">
          <image class="tab-icon3" src="../../images/icon_2_gouwuche@2x.png" @tap="goShoppingCart">
            <view>购物车</view>
            <view class="red_dot">{{carSize}}</view>
        </view>
      </view>
      <view class="warp_btn">
        <view wx:if="{{TYPE== 'normal'}}" class="add_btn" @tap="addShoppingCart()">加入购物车</view>
        <view wx:if="{{TYPE== 'normal'}}" class="buy_btn" @tap="firmOrder()">立即购买</view>
        <view wx:if="{{TYPE== 'group'}}" class="buy_btn group_btn" @tap="firmGroupOrder()">发起团购</view>
        <view class="buy_btn group_btn" @tap="joinGroup" wx:if="{{TYPE=='grouponing'&&pintuanDetails.pintuangroup_state == 1&&pintuanDetails.is_join != 1}}">参加团购</view>
        <view class="buy_btn group_btn group_btnBg" wx:if="{{TYPE=='grouponing'&&pintuanDetails.pintuangroup_state != 1||TYPE=='grouponing'&&pintuanDetails.is_join == 1}}">参加团购</view>
      </view>
    </view>
    <!-- QT -->
    <view class="over_model" @tap="closeModel" wx:if="{{isShowQT}}" catchtouchmove="{{true}}">
      <view class="poster_model">
        <canvas canvas-id="canvas" style="width: 275px; height: 440px;"></canvas>
      </view>
      <view class="save_btn" @tap="saveImg">保存</view>
    </view>
    <!--shareBox -->
    <view class="over_model" wx:if="{{isShare}}" catchtouchmove="{{true}}">
      <view class="shareBox">
        <button class="share" plain="true" open-type="share" @tap="closeShare">
          <view class="shareBox-item">发送给朋友</view>
        </button>
        <view class="shareBox-item" @tap="getQrCode">生成海报</view>
        <view class="shareBox-item" @tap="closeShare">取消</view>
      </view>
    </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import { getCode } from "../../utils/user-tools";
import getTimes from "../../utils/formatedate.js";
import multiSku from "../../components/multiSku";
import dayjs from "dayjs";
import timer from "../../utils/wxTimer";
import {
  showSuccessToast,
  showFailToast,
  exploitToast
} from "../../utils/tools";
export default class GoodsDetails extends wepy.page {
  config = {
    navigationBarTitleText: "商品详情"
  };
  data = {
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 200,
    indicatorActiveColor: "#333333",
    indicatorColor: "#FFFFFF", //以上为轮播配置
    //是否添加获取手机号按钮
    isPhone: true,
    //个人信息
    wxUserInfo: null,
    // Goods Id
    id: null,
    // 是否显示规格信息
    showStandard: false,
    // 购物车图标是否显示数量
    carSize: 0,
    // 规格列表
    standards: [],
    //
    isChecked: null,
    // 数量
    size: 1,
    //商品详情
    goods: {},
    comment: null,
    isShowQT: false,
    current: 1,
    isShare: false,
    TYPE: "normal", //normal:普通 groupon:团购 grouponing：团购进行中 bargain：砍价：bargain 砍价进行中：bargaining
    groupListshow: false,
    timeDatalist: [],
    wxTimer1: null,
    groupInfo: [],
    wxTimerList: {},
    pintuangroup_id: null,
    pintuanDetails: null,
    multiSku: {},
    // sku goods field
    field: {
      price: "goods_price",
      amount: "goods_storage"
    }
  };

  computed = {
    isShow() {
      return this.showStandard;
    },
    getSize: () => this.size,
    nowDate: () => getTimes.formatTime(new Date(), "Y-M-D"),
    goodsBody() {
      return (
        this.goods.goods_body &&
        this.goods.goods_body.replace(
          /<img/g,
          "<img style='display: block; width: 100%;'"
        )
      );
    },
    skuClassList() {
      if (this.goods && this.goods.spec_value) {
        let classList,
          spec_value = this.goods.spec_value,
          spec_name = this.goods.spec_name;

        classList = spec_name.map((v, i) => {
          return {
            name: v,
            items: spec_value[i].map(sku => {
              return { name: sku };
            })
          };
        });
        // console.error(classList);
        return classList;
      }

      return [];
    },
    skus() {
      return this.goods && this.goods.SKUList;
    },
    isMultiSku() {
      let goods = this.goods;
      return goods && goods.spec_name && goods.spec_name.length;
    }
  };

  components = {
    multiSku
  };
  methods = {
    onShareAppMessage: function(res) {
      return {
        title: this.goods.goods_name,
        path: `pages/store/goodsDetails?shareType=activity&goods_commonid=${
          this.goods.goods_commonid
        }`,
        success: function(res) {
          // 转发成功
          wx.showToast({
            title: "转发成功",
            icon: "success",
            duration: 2000
          });
        },
        fail: function(res) {
          // 转发失败
        }
      };
    },
    checked: index => {
      this.isChecked = index;
      this.goods.standard = this.standards[index];
      this.goods.goods_storage = this.goods.SKUList[index].goods_storage;
      this.goods.goods_price = this.goods.SKUList[index].goods_price;
      this.goods.goods_id = this.goods.SKUList[index].goods_id;
      this.goods.goods_num = this.size;
      this.goods.goods_freight = this.goods.SKUList[index].goods_freight;
      this.$apply();
    },
    minus() {
      if (this.size === 1) {
        return;
      }
      this.size--;
      this.goods.goods_num = this.size;
      this.$apply();
    },
    add() {
      this.size++;
      if (this.size > this.goods.goods_storage) {
        this.size--;
        return wx.showToast({
          title: "库存不足",
          icon: "none",
          duration: 1000
        });
      }

      this.goods.goods_num = this.size;
      this.$apply();
    },
    async addShoppingCart() {
      if (!this.goods.standard) {
        return this.goStandard();
      }
      if (this.goods.goods_storage < 1) {
        return wx.showToast({
          title: "库存不足",
          icon: "none",
          duration: 1000
        });
      }
      console.log(this.goods);

      const res = await shttp
        .post("/api/v2/member/cart")
        .send({
          goods_id: this.goods.goods_id,
          quantity: this.goods.goods_num || 1
        })
        .end();
      if (res.data.cart_num) {
        this.showStandard = false;
        wx.showToast({
          title: "成功加入购物车",
          icon: "success",
          duration: 1000
        });
        this.getShopCartNum();
      } else {
        return wx.showToast({
          title: res.error,
          icon: "none",
          duration: 1000
        });
      }
      this.$apply();
    },
    goShoppingCart() {
      wx.switchTab({
        url: "/pages/shoppingCart"
      });
    },

    firmOrder() {
      //未设置规格
      if (!this.goods.standard) {
        return this.goStandard();
      }
      if (this.goods.goods_storage < 1) {
        return showFailToast("库存不足");
      }
      wx.navigateTo({
        url:
          "/pages/store/firmOrder?type=nocart&goods=" +
          encodeURIComponent(JSON.stringify(this.goods))
      });
    },
    firmGroupOrder() {
      if (this.goods.goods_storage < 1) {
        return showFailToast("库存不足");
      }
      wx.navigateTo({
        url: `/pages/store/firmOrder?type=nocart&goods=${encodeURIComponent(
          JSON.stringify(this.goods)
        )}&groupontype=group`
      });
    },
    // udpate multi Sku
    updateSku(price, skuStr, img, goods) {
      // console.error('udpatesku', price, skuStr, goods);
      this.multiSku = { price, skuStr, img, goods };
      if (goods) {
        this.goods.standard = goods;
        this.goods.goods_storage = goods.goods_storage;
        this.goods.goods_price = goods.goods_price;
        this.goods.goods_id = goods.goods_id;
        this.goods.goods_num = this.size;
        this.goods.goods_freight = goods.goods_freight;
      }
    }
  };
  onLoad(option) {
    this.options = option;
    this.id = option.goods_commonid;
    this.scene = decodeURIComponent(option.scene);
  }
  onShow() {
    if (this.timeDatalist.length != 0) {
      this.timeDatalist.forEach(item => {
        item.stop();
      });
      this.timeDatalist = [];
      this.wxTimerList = {};
    }
    if (this.wxTimer1 != null) {
      this.wxTimer1.stop();
      this.wxTimerList = {};
      this.wxTimer1 = null;
    }
    this.wxUserInfo = wx.getStorageSync("memberInfo");
    wx.showLoading({
      title: "加载中"
    });
    console.log(this.scene);
    if (this.scene != "undefined") {
      let qrarry = this.scene.split(";");
      //TODO:分享参数数组，0位为类型,1位为相关id
      if (qrarry[0] == "normal") {
        this.id = qrarry[1];
      } else {
        this.pintuangroup_id = qrarry[1];
      }
      this.getType(qrarry[0]);
    } else {
      // revert sku info/恢复跳转前的规格设置
      if (this.multiSku && this.multiSku.goods) {
        let goods = this.multiSku.goods;
        this.goods.standard = goods;
        this.goods.goods_storage = goods.goods_storage;
        this.goods.goods_price = goods.goods_price;
        this.goods.goods_id = goods.goods_id;
        this.goods.goods_freight = goods.goods_freight;
        return wx.hideLoading();
      }

      this.getType(this.options.type);
    }
    if (!this.wxUserInfo.wx_name) {
      wx.navigateTo({
        url: `/pages/authorization?shareType=activity`
      });
    }
    this.getShopCartNum();
  }
  getType(type) {
    console.log(type);
    switch (type) {
      case "group":
        this.TYPE = type;
        this.groupGoodsDetails(this.id);
        break;
      case "grouponing":
        this.TYPE = type;
        this.getgroupDetails(this.pintuangroup_id);
        break;
      default:
        this.TYPE = "normal";
        this.goodsDetails(this.id);
        break;
    }
  }
  //购物车数量
  async getShopCartNum() {
    console.log("开始请求购物车数量");
    const res = await shttp.get(`/api/v2/member/cart`).end();
    console.log(res);
    if (!res.data.store_cart_list["1"]) {
      this.carSize = 0;
    } else {
      this.carSize = res.data.store_cart_list["1"].length;
    }

    this.$apply();
  }
  //商品详情
  async goodsDetails(id) {
    const res = await shttp.get(`/api/v2/member/goodscommon/${id}`).end();
    if (res.status == 0) {
      this.goods = res.data;
      this.goods.goods_salenum = this.goods.goods_faker_salenum
        ? this.goods.goods_faker_salenum
        : 0;
      if (this.goods.SKUList.length > 0) {
        this.goods.SKUList.forEach(item => {
          this.goods.goods_salenum += item.goods_salenum;
        });
        this.goods.goods_storage = this.goods.SKUList[0].goods_storage;
      }
      if (res.data.spec_value) {
        this.standards = res.data.spec_value;
      } else {
        this.standards = ["统一规格"];
      }

      // set multi sku
      if (this.goods.spec_value) {
        this.multiSku.price = this.getPrice(
          this.goods.SKUList.map(v => v.goods_price)
        );
      }

      this.getComment(this.goods.SKUList[0].goods_id);
    }

    wx.hideLoading();
    this.$apply();
  }
  //团购商品详情
  async groupGoodsDetails(id) {
    const res = await shttp.get(`/api/v2/member/goodsgroupbuy/${id}`).end();
    if (res.status == 0) {
      this.goods = res.data;
      //规格显示
      if(this.goods.goods.goods_spec){
        let spec = this.goods.goods.goods_spec;
        this.goods.spec = '';
        for(let i in spec){
          this.goods.spec +=`${i}:${spec[i]}/ `;
        }
        this.goods.spec = this.goods.spec.replace(/\/\s$/g,'');
      }
      this.goods.goods_salenum = this.goods.goods.goods_salenum;
      this.goods.goods_storage = this.goods.goods.goods_storage;
      this.goods.goods_name = this.goods.goods.goods_name;
      this.goods.goods_freight = this.goods.goods.goods_freight;
      this.goods.goods_marketprice = this.goods.goods.goods_marketprice;
      this.goods.goods_image = this.goods.goods.goods_image;
      this.standards = ["统一规格"];
      this.getComment(this.goods.goods_id);
      if (this.TYPE == "group") {
        this.getGroupList(this.goods.goods_id);
      }
    } else {
      const msg = res.error;
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
        success: function(res) {
          wx.showToast({
            title: msg,
            icon: "none",
            duration: 1000
          });
        }
      });
    }

    wx.hideLoading();
    this.$apply();
  }

  goStandard() {
    this.showStandard = true;
    if (this.standards[0] == "统一规格") {
      this.isChecked = 0;
      this.goods.standard = "统一规格";
      this.goods.goods_storage = this.goods.SKUList[0].goods_storage;
      this.goods.goods_price = this.goods.SKUList[0].goods_price;
      this.goods.goods_id = this.goods.SKUList[0].goods_id;
      this.goods.goods_freight = this.goods.SKUList[0].goods_freight;
      this.goods.goods_num = this.size;
    }
    if (!this.goods.standard) {
      wx.showToast({
        title: "请选择规格!",
        icon: "none",
        duration: 1000
      });
    }
    this.$apply();
  }
  //商品评论
  async getComment(id) {
    let send;
    send = {
      goods_id: id,
      goods_type: "real",
      page: 1,
      limit: 3
    };
    const res = await shttp
      .get(`/api/v2/member/goodsevaluate`)
      .query(send)
      .end();
    if (res.status === 0) {
      if (res.data.length != 0 && res.data != null) {
        this.comment = res.data;
        this.comment[0].geval_image =
          this.comment[0].geval_image !== ""
            ? JSON.parse(this.comment[0].geval_image)
            : [];
      }
    }

    this.$apply();
  }
  //评论列表
  goComment(e) {
    let id = e.currentTarget.dataset.goodid;
    wx.navigateTo({
      url: `./commentList?goodsId=${id}`
    });
    this.$apply();
  }
  //获取二维码
  async getQrCode() {
    this.isShowQT = true;
    this.$apply();
    this.isShare = false;
    wx.showLoading({ title: "loading..." });
    let content = wx.createCanvasContext("canvas");
    content.setFillStyle("#ffffff");
    content.fillRect(0, 0, 275, 440);
    let goodsImg = this.goods.goods_image;
    await this.drawImage(
      {
        img: goodsImg,
        top: 0,
        left: 0,
        width: 275,
        height: 275
      },
      content
    );
    const res = await shttp
      .post("/api/v2/member/wxcode")
      .send({
        page: "pages/store/goodsDetails",
        scene: "normal;" + this.id,
        width: 350, // 430
        is_hyaline: true // false,
      })
      .end();
    let qrpicUrl = res.data.url;
    await this.drawImage(
      {
        img: qrpicUrl.replace(/http/, "https"),
        top: 320,
        left: 180,
        width: 80,
        height: 80
      },
      content
    );
    content.fillStyle = "#000000";
    // content.setTextAlign("center");
    content.setFontSize(14);
    content.fillText(this.goods.goods_name, 20, 315, 140);
    content.fillStyle = "#dd3d27";
    content.setFontSize(14);
    content.fillText("￥", 20, 380);
    content.setFontSize(21);
    content.fillText(this.goods.goods_price, 32, 380);
    content.fillStyle = "#b9b9b9";
    content.setTextAlign("center");
    content.setFontSize(6);
    content.fillText("扫描或长按小程序码", 220, 410);
    content.draw(true);
    wx.hideLoading();
  }
  async drawImage(data, ctx) {
    console.log(data);
    let res = await new Promise((res, rej) => {
      wx.getImageInfo({
        src: data.img,
        success(e) {
          console.log(e);
          res(e.path);
        },
        fail(e) {
          console.log(e);
          rej(e);
        }
      });
    }).catch(e => {
      return e;
    });

    if (res.errMsg) {
      return wx.showModal({
        title: "提示",
        content: res.errMsg,
        showCancel: false
      });
    }
    console.log("draw", res);

    ctx.drawImage(
      res,
      data.left ? data.left : 0,
      data.top ? data.top : 0,
      data.width ? data.width : 100,
      data.height ? data.height : 100
    );
  }
  saveImg() {
    let that = this;
    wx.canvasToTempFilePath({
      canvasId: "canvas",
      x: 0,
      y: 0,
      width: 500,
      height: 500,
      success: function(res) {
        console.log(res);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(e) {
            wx.showToast({
              title: "保存成功!",
              icon: "success",
              duration: 2000
            });
            that.isShowQT = false;
            that.$apply();
          },
          fail: function(res) {
            if (
              res.errMsg === "saveImageToPhotosAlbum:fail:auth denied" ||
              res.errMsg === "saveImageToPhotosAlbum:fail auth denied"
            ) {
              wx.openSetting({
                success(settingdata) {
                  if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                    console.log("获取权限成功，再次点击图片保存到相册");
                  } else {
                    console.log("获取权限失败");
                  }
                }
              });
            }
          }
        });
      }
    });
  }
  closeModel() {
    this.isShowQT = false;
    this.$apply();
  }
  swiperchange(e) {
    this.current = e.detail.current + 1;
  }
  async enshrine() {
    const res = await shttp
      .post("/api/v2/member/enshrine")
      .send({
        goods_commonid: this.id
      })
      .end();
    if (res.status === 0) {
      wx.showToast({
        title: "收藏成功!",
        icon: "success",
        duration: 2000
      });
      this.goods.enshrine_type = 1;
    } else if (res.status === 1) {
      wx.showToast({
        title: res.error,
        icon: "none",
        duration: 2000
      });
    }
    this.$apply();
  }

  showShare() {
    this.isShare = true;
  }
  closeShare() {
    this.isShare = false;
  }
  deleteBtn() {
    this.showStandard = false;
  }
  //获取商品拼团列表
  async getGroupList(id) {
    const res = await shttp
      .get(`/api/v2/member/groupbuy/${id}`)
      .send({
        pintuangroup_goods_id: id,
        page: 1,
        limit: 3,
        pintuangroup_state: 1
      })
      .end();
    if (res.status == 0 && res.data.length != 0) {
      this.groupListshow = true;
      let startTime = new Date().getTime();
      this.groupInfo = res.data;
      this.groupInfo.pinlist.forEach((item, index) => {
        let endTime = item.pintuangroup_endtime * 1000;
        if (startTime < endTime) {
          let hour = dayjs(endTime).diff(dayjs(startTime), "hour");
          let diffhour = hour * 60;
          let minute = dayjs(endTime).diff(dayjs(startTime), "minute");
          let diffminute = minute * 60;
          minute -= diffhour;
          let second = dayjs(endTime).diff(dayjs(startTime), "second");
          second -= diffminute;
          let beginTime = hour + ":" + minute + ":" + second;
          let wxTimer = index;
          wxTimer = new timer({
            beginTime: beginTime,
            name: wxTimer,
            complete: function() {
              item.pintuangroup_state = 0;
            }
          });
          wxTimer.start(this);
          this.timeDatalist.push(wxTimer);
        } else {
          item.pintuangroup_state = 0;
        }
      });
    }
    this.$apply();
  }
  //获取团详情
  async getgroupDetails(id) {
    const res = await shttp.get(`/api/v2/member/groupbuy/${id}/edit`).end();
    if (res.status == 0) {
      this.pintuanDetails = res.data;
      //TODO:分享参团获取团详情后再获取团商品详情
      this.groupGoodsDetails(res.data.rule_id);
      //开启第一个定时器
      if (this.pintuanDetails.pintuangroup_state == 1) {
        let endTime = this.pintuanDetails.pintuangroup_endtime * 1000;
        let startTime = new Date().getTime();
        if (startTime < endTime) {
          let hour = dayjs(endTime).diff(dayjs(startTime), "hour");
          let diffhour = hour * 60;
          let minute = dayjs(endTime).diff(dayjs(startTime), "minute");
          let diffminute = minute * 60;
          minute -= diffhour;
          let second = dayjs(endTime).diff(dayjs(startTime), "second");
          second -= diffminute;
          let beginTime = hour + ":" + minute + ":" + second;
          let that = this;
          var wxTimer1 = new timer({
            beginTime: beginTime,
            name: "wxTimer1",
            complete: function() {
              that.pintuanDetails.pintuangroup_state = 0;
            }
          });
          wxTimer1.start(this);
          this.wxTimer1 = wxTimer1;
        } else {
          this.pintuanDetails.pintuangroup_state = 0;
        }
      }
    }
    this.$apply();
  }
  goGroupList() {
    wx.navigateTo({
      url: `groupon?commonid=${this.goods.goods_id}`
    });
  }
  gogroupon(e) {
    let groupondata = e.currentTarget.dataset.groupondata;
    wx.navigateTo({
      url: `/pages/store/goodsDetails?scene=${"grouponing;" +
        groupondata.pintuangroup_id}`
    });
  }
  joinGroup() {
    this.goods.goods_id = this.pintuanDetails.pintuangroup_goods_id;
    this.goods.goods_num = 1;
    console.log("grouponing");
    wx.navigateTo({
      url: `/pages/store/firmOrder?type=nocart&groupontype=grouponing&grouponid=${
        this.pintuangroup_id
      }&goods=${encodeURIComponent(JSON.stringify(this.goods))}`
    });
  }
  onUnload() {
    if (this.wxTimer1 != null) {
      this.wxTimer1.stop();
      this.wxTimerList = {};
      this.wxTimer1 = null;
    }
    if (this.timeDatalist.length != 0) {
      this.timeDatalist.forEach(item => {
        item.stop();
      });
      this.wxTimerList = {};
      this.timeDatalist = [];
    }
  }

  getPrice(priceArr) {
    let price = {};

    price.min = Math.min.apply(null, priceArr);
    price.max = Math.max.apply(null, priceArr);

    return price.min == price.max ? price.min : `${price.min}-${price.max}`;
  }
}
</script>

