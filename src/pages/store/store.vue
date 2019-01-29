<style>
page {
  background: #f5f5f5;
}
.container {
  font: 32rpx PingFang-SC-Medium;
  background: #f4f4f4;
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
  height: 540rpx;
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
  height: 180rpx;
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

.sales-box {
  display: flex;
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

.slide_wrap{
}

/* store Info */
.store_info{
  padding: 30rpx 40rpx 40rpx;
}

.store_name{
  width: 450rpx;
  height: 1.2em;
  line-height: 1.2;
  font-size: 40rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.store_address, .store_time, .store_distance{
  font-size: 24rpx;
}

.store_time{
  margin: 30rpx 0 0;
}
.store_address{
  margin: 15rpx 0 0;
}
.address_name{
  width: 500rpx;
  line-height: 1.2em;
}

.i_time{
  width: 26rpx;
  height: 25rpx;
  margin-right: 6rpx;
}
.i_address{
  width: 20rpx;
  height: 24rpx;
  margin-right: 15rpx;
}

/* service */
.service_wrap, .standard_wrap, .comment_wrap, .detail_wrap{
  margin: 20rpx 0 0;
  padding: 0 40rpx;
}
.service_title, .standard_title, .comment_title, .detail_title{
  height: 112rpx;
  line-height: 112rpx;
  font-size: 32rpx;
  border-bottom: 2rpx solid #eee;
}

.service_item, .detail_item{
  padding: 40rpx 0;
}
.service_name{
  font-size: 32rpx;
}
.service_desc{
  margin: 10rpx;
  font-size: 24rpx;
}
.service_price{
  font-size: 28rpx;
}

.i_right_arrow{
  flex-shrink: 0;
  width: 12rpx;
  height: 22rpx;
  margin-left: 10rpx;
  /* background: gray; */
}

/* standard */
.standard_item{
  padding: 10rpx 0;
}
.standard_desc{
  font-size: 26rpx;
}
.i_standard{
  width: 62rpx;
  height: 62rpx;
  margin-right: 20rpx;
}

/* comment */
.comment_sub_title{
  font-size: 24rpx;
}
.comment_item{
  padding: 30rpx 0;
}
.comment_avatar{
  flex-shrink: 0;
  width: 60rpx;
  height: 60rpx;
  margin-right: 10rpx;
  /* background: gray; */
}
.comment_info{
  flex-grow: 1;
  margin: 20rpx 0 0;
  font-size: 24rpx;
}
.comment_name{
  width: 240rpx;
  height: 1.2em;
  line-height: 1.2;
  font-size: 28rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.comment_level, .comment_service, .comment_content{
  margin: 10rpx 0 0;
}
.score_title{
  margin-right: 10rpx;
}
.score{
  margin-right: 6rpx;
}
.i_assess{
  width: 16rpx;
  height: 16rpx;
  margin-right: 4rpx;
}

/* detail */
.detail_item{
  font-size: 28rpx;
}
.i_detail{
  flex-shrink: 0;
  width: 34rpx;
  height: 30rpx;
  margin-right: 10rpx;
  /* background: gray; */
}
.detail_desc{

}

.flex{
  display: flex;
  align-items: center;
}
.between{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.s-fc-1{ color: #fff; }
.s-fc-2{ color: #222; }
.s-fc-3{ color: #969696; }
.s-fc-4{ color: #8e939a; }
.s-fc-5{ color: #10325f; }

.s-bg-1{ background: #fff; }
</style>

<template>
  <view class="container">
    <!-- <view wx:if="{{showStandard}}" class="standard-box">
      <view class="product">
        <view class="base_info">
          <image src="{{goods.goods_image}}" mode="aspectFill">
          <view>
            <view class="product_name">{{goods.goods_name}}</view>
            <view class="product_price">
              <text style="font-size:28rpx">¥</text>
              {{goods.goods_price}}
            </view>
          </view>
        </view>
        <image class="delete-btn" src="../../images/icon_cha@2x.png" @tap="deleteBtn">
        <view class="standard_wrap">
          <view class="standard_title">规格</view>
          <view class="standard_info">
            <repeat for="{{standards}}" index="index" item="item">
              <view class="{{isChecked==index?'checked':''}}" @tap="checked({{index}})">{{item}}</view>
            </repeat>
          </view>
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
    </view> -->

      <view class='slide_wrap'>
        <slide :config.sync='slideConfig'></slide>
      </view>

      <!-- store Info -->
      <view class='store_info s-fc-3 s-bg-1'>
        <view class='between' style='align-items: flex-start;'>
          <view class='store_name s-fc-2'>{{store.store_name}}</view>
          <view class='store_distance'>{{store.distance}}</view>
        </view>

        <view class='store_time flex'>
          <image class='i_time' src='{{timeURL}}' />
          <view>{{store.time}}</view>
        </view>

        <view class='store_address between'>
          <view class='flex'>
            <image class='i_address' src='{{locationURL}}' />
            <view class='address_name'>{{store.store_address}}</view>
          </view>
          <view @tap='navigation'>导航</view>
        </view>
      </view>

      <!-- store Service -->
      <view class='service_wrap s-bg-1'>
        <view class='service_title s-fc-2'>请选择服务</view>
        <view class='service_list'>
          <repeat for='{{serviceList}}' wx:key='index'>

            <view class='service_item between' @tap='goSelect({{item}})'>
              <view class=''>
                <view class='service_name s-fc-2'>{{item.storegc_name}}</view>
                <view class='service_desc s-fc-4'>{{item.desc}}</view>
              </view>
              <view class='flex' style='align-items: center;'>
                <view class='service_price s-fc-5'>¥<text style='font-size: 40rpx;' wx:if='{{item.price1}}'>{{item.price1}}.</text>{{item.price2}}</view>
                <image class='i_right_arrow' src='{{rightArrowURL}}' />
              </view>
            </view>

          </repeat>
        </view>
      </view>

      <!-- store Service Standard -->
      <view class='standard_wrap s-bg-1'>
        <view class='standard_title s-fc-2'>服务标准</view>
        <view class='standard_list'>
          <repeat for='{{standardList}}' wx:key='index'>

            <view class='standard_item'>
              <view class='flex' style='align-items: center;'>
                <image class='i_standard' src='{{item.src}}' />
                <view class='standard_desc s-fc-4'>{{item.desc}}</view>
              </view>
            </view>

          </repeat>
        </view>
      </view>

      <!-- store Service comment -->
      <view class='comment_wrap s-bg-1'>
        <view class='comment_title between s-fc-2'>
          <view>服务评价</view>
          <view class='comment_sub_title s-fc-5' @tap='goComment'>查看全部评价</view>
        </view>
        <view class='comment_list'>
          <repeat for='{{commentList}}' wx:key='index'>

            <view class='comment_item'>

              <view class='flex' style='align-items: flex-start;'>
                <image class='comment_avatar' src='{{item.comment_avatar}}' />
                <view class='comment_info s-fc-4'>

                  <view class='between'>
                    <view class='comment_name s-fc-2'>{{item.geval_frommembername}}</view>
                    <view class='comment_time'>{{item.comment_time}}</view>
                  </view>
                  
                  <view class='comment_level flex' style='align-items: baseline;'>
                    <view class='score_title'>星级</view>
                    <view class='score flex'>
                        <repeat for='{{5}}' item='v' index='i' wx:key='i'>
                        <image class='i_assess' src="{{i + 1 > item.geval_scores ? '../../images/order/assess.png' : '../../images/order/assess_sel.png'}}" mode='aspectFill' />
                      </repeat>
                    </view>
                  </view>

                  <view class='comment_service'>服务 {{item.comment_service}}</view>

                  <view class='comment_content s-fc-2'>{{item.geval_content}}</view>

                </view>
              </view>

            </view>

          </repeat>
        </view>
      </view>

      <!-- store Service detail -->
      <view class='detail_wrap s-bg-1'>
        <view class='detail_title s-fc-2'>门店信息</view>
        <view class='detail_list'>
          <!-- <repeat for='{{detailList}}' wx:key='index'> -->

            <view class='detail_item between' @tap='goAbout'>
              <view class='flex'>
                <image class='i_detail' src='{{storeAddressURL}}' mode='aspectFill' />
                <view class='detail_desc s-fc-4'>{{store.store_address}}</view>
              </view>
              <image class='i_right_arrow' src='{{rightArrowURL}}' mode='aspectFill' />
            </view>

            <view class='detail_item'>
              <view class='flex'>
                <image class='i_detail' src='{{storeDescURL}}' mode='aspectFill' />
                <view class='detail_desc s-fc-4'>{{store.store_description}}</view>
              </view>
            </view>

          <!-- </repeat> -->
        </view>
      </view>

    <!-- <backTop> -->
      <view>

        <view class="">

          <!-- <view
            class="instructions"
            wx:if="{{TYPE== 'normal'}}"
          >{{current}}/{{goods.goodsimagesList.length}}</view>
          <view
            class="instructions"
            wx:if="{{TYPE== 'group' ||TYPE== 'grouponing'}}"
          >{{current}}/{{goods.images.length}}</view> -->
        </view>

        <!-- <view class="product_info">
          <view class="goods">
            <view class="goods_main_info">
              <view class="column">
                <view class="product_title">{{goods.goods_name}}</view>
              </view>
              <view wx:if="{{TYPE== 'normal'}}" class="column_center" @tap="enshrine">
                <image src="../../images/icon_pingfen_hl@2x.png" class="qr_icon">收藏
              </view>
              <view wx:if="{{TYPE== 'normal'}}" class="column_center" @tap="showShare">
                <image src="../../images/icon_6_fenxiang@2x.png" class="share_icon">分享
              </view>
            </view>
            <view class="product_price">
              <text class="text11">¥</text>
              {{goods.goods_price}}
              <text
                class="text3"
                wx:if="{{TYPE== 'group'||TYPE== 'grouponing'}}"
              >¥{{goods.goods_marketprice}}</text>
              <text class="text22">运费:¥{{goods.goods_freight}}</text>
              <text class="text22" wx:if="{{TYPE== 'normal'}}">已售：{{goods.goods_salenum}}</text>
            </view>
          </view>
        </view> -->

        <!-- <view wx:if="{{TYPE== 'normal'}}" class="standard" @tap="goStandard">
          <view>规格 {{goods.standard}}</view>
          <image src="../../images/icon_zuojiantou@2x.png">
        </view> -->

        <!-- <view class="detail">
          <view class="detail_title">商品详情</view>
          <rich-text style="width: 100%; height: auto;" nodes="{{goodsBody}}"></rich-text>
          <view class="space"></view>
        </view> -->
      </view>
    <!-- </backTop> -->
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
import backTop from "../../components/backTop";
import slide from "../../components/slide";
import dayjs from "dayjs";
import timer from "../../utils/wxTimer";
import {
  showSuccessToast,
  showFailToast,
  exploitToast
} from "../../utils/tools";
export default class GoodsDetails extends wepy.page {
  config = {
    navigationBarTitleText: "门店详情"
  };
  data = {
    timeURL: '../../images/time.png',
    locationURL: '../../images/location.png',
    rightArrowURL: '../../images/store/right_arrow.png',
    storeAddressURL: '../../images/store/store_address.png',
    storeDescURL: '../../images/store/store_desc.png',
    dateList: [
      { id: 1, value: '周一' }, 
      { id: 2, value: '周二' }, 
      { id: 3, value: '周三' },
      { id: 4, value: '周四' },
      { id: 5, value: '周五' },
      { id: 6, value: '周六' },
      { id: 7, value: '周日' },
    ],
    slideConfig: {
      height: 422,
      urls: [],
      indicatorDots: false,
      indicatorActiveColor: "#333333",
      indicatorColor: "#FFFFFF", 
    },
    store: {},
    standardList: [
      { src: '../../images/store/1.png', desc: '传承匠人精神，专注剪发，不推销，无套路。' },
      { src: '../../images/store/2.png', desc: '互联网+剪发，全程在线排号预约支付。' },
      { src: '../../images/store/3.png', desc: '标准化服务品质，不忘初心的纯粹手艺人。' },
      { src: '../../images/store/4.png', desc: '经典免水洗去油蓬松洗发喷雾，有效清洁发丝。' },
      { src: '../../images/store/5.png', desc: '剪发工具一客一消毒，确保安全卫生。' },
      { src: '../../images/store/6.png', desc: '进口碎发吸取技术，高效清洁剪发后的碎发。' },
    ],
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
    groupInfo: [],
    wxTimerList: {},
    pintuangroup_id: null,
    pintuanDetails: null
  };

  computed = {
    serviceList(){ 
      let store = this.store;

      if(store && store.storegc){
        store.storegc.forEach(v => {

          // if(typeof v.price === 'string'){
            v.price.forEach(p => {
              let price = p.goods_price.split('.');

              v.price1 = price[0];
              v.price2 = price[1];
            })

          // }
          // let t = new Date(v.geval_addtime * 1000);
          // v.comment_time = `${t.getFullYear()}/${t.getMonth() + 1}/${t.getDate()} ${t.getHours()}:${t.getMinutes()}`;
        });
        return store.storegc; 
      }
      return [];
    },
    commentList(){ 
      let store = this.store;

      if(store && store.evaluate){
        store.evaluate.forEach(v => {
          let t = new Date(v.geval_addtime * 1000),
              avatar;

          v.comment_time = `${t.getFullYear()}/${t.getMonth() + 1}/${t.getDate()} ${t.getHours()}:${t.getMinutes()}`;

          try{
            avatar = JSON.parse(v.geval_frommemberavatar);
            v.comment_avatar = avatar[0] ? avatar[0].url : '';
          }catch(e){
            v.comment_avatar = avatar;
          }

          v.comment_service = this.store.storegc.filter(o => o.storegc_id == v.geval_goodsspec)[0].storegc_name;
        });

        return store.evaluate; 
      }
      return [];
    },
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
    }
  };

  components = {
    backTop,
    slide
  };
  methods = {
    goSelect(item){
      wx.navigateTo({ url: `/pages/select/stylist?id=${this.id}&storegc=${JSON.stringify(item)}&address=${this.store.store_address}` });
    },
    goComment(item){
      wx.navigateTo({ url: `/pages/store/commentList?id=${this.id}&storegc_id=${item.storegc_id}&storegc=${encodeURIComponent(JSON.stringify(this.store.storegc))}` });
    },
    goAbout(){
      wx.navigateTo({ url: `/pages/store/about?id=${this.id}` });
    },
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
    // async addShoppingCart() {
    //   if (!this.goods.standard) {
    //     return this.goStandard();
    //   }
    //   if (this.goods.goods_storage < 1) {
    //     return wx.showToast({
    //       title: "库存不足",
    //       icon: "none",
    //       duration: 1000
    //     });
    //   }
    //   console.log(this.goods);

    //   const res = await shttp
    //     .post("/api/v2/member/cart")
    //     .send({
    //       goods_id: this.goods.goods_id,
    //       quantity: this.goods.goods_num || 1
    //     })
    //     .end();
    //   if (res.data.cart_num) {
    //     this.showStandard = false;
    //     wx.showToast({
    //       title: "成功加入购物车",
    //       icon: "success",
    //       duration: 1000
    //     });
    //   } else {
    //     return wx.showToast({
    //       title: res.error,
    //       icon: "none",
    //       duration: 1000
    //     });
    //   }
    //   this.$apply();
    // },
    // goShoppingCart() {
    //   wx.switchTab({
    //     url: "/pages/shoppingCart"
    //   });
    // },

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
    }
  };
  onLoad(option) {
    this.options = option;
    this.id = option.id;
    this.scene = decodeURIComponent(option.scene);

    this.getStore();
  }
  onShow() {
    this.wxUserInfo = wx.getStorageSync("memberInfo");
    console.log(this.scene);
  }

  // utils
  navigation(){
    let param = {
      latitude: Number(this.store.store_latitude),
      longitude: Number(this.store.store_longitude)
    };
    wx.openLocation(param);
  }

  async getStore(){
    wx.showLoading({ title: 'Loading...' });
    let location = wx.getStorageSync('location');

    let res = await shttp.get(`/api/v2/member/storeinfo/${this.id}?latitude=${location.latitude}&longitude=${location.longitude}&store_id=${this.id}`).end();

    if(res && res.data){
      let store = res.data,
          time = store.store_workingtime.split('|');

      this.slideConfig.urls = store.store_images;
      // distance 
      store.distance = store.distance > 1000 ? `${(store.distance / 1000).toFixed(0)}KM` : `${store.distance.toFixed(0)}M`;
      
      // time
      let dayList = time[0].split(',').map(v => parseInt(v)),
          t = time[1].split(',').map(v => { 
        let d = new Date(v); 
        return `${(d.getHours() < 10 ? '0' : '') + d.getHours()}:${(d.getMinutes() < 10 ? '0' : '') + d.getMinutes()}`; 
      });

      store.time = `${t[0]}-${t[1]} ${this.dateList.filter(v => dayList.indexOf(v.id) !== -1 ).map(v => v.value).join(' ')}`;

      this.store = store;
    }

    this.$apply();
    wx.hideLoading();
  }
  // async goodsDetails(id) {
  //   const res = await shttp.get(`/api/v2/member/goodscommon/${id}`).end();
  //   this.goods = res.data;
  //   this.goods.goods_salenum = this.goods.SKUList[0].goods_salenum;
  //   this.goods.goods_storage = this.goods.SKUList[0].goods_storage;
  //   if (res.data.spec_value) {
  //     this.standards = res.data.spec_value;
  //   } else {
  //     this.standards = ["无"];
  //   }
  //   this.getComment(this.goods.SKUList[0].goods_id);
  //   wx.hideLoading();
  //   this.$apply();
  // }

  goStandard() {
    this.showStandard = true;
    if (this.standards[0] == "无") {
      this.isChecked = 0;
      this.goods.standard = "无";
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
    let virtual = this.goods.is_virtual;
    let appoint = this.goods.is_appoint;
    console.log(id);
    wx.navigateTo({
      url: `./commentList?goodsId=${id}&virtual=${virtual}&appoint=${appoint}`
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
        scene: this.id + ";",
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
    } else if (res.status === 1) {
      wx.showToast({
        title: res.error,
        icon: "none",
        duration: 2000
      });
    }
  }

  showShare() {
    this.isShare = true;
  }
  closeShare() {
    this.isShare = false;
  }
  onUnload() {}
  deleteBtn() {
    this.showStandard = false;
  }

}
</script>

