<style>
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
}

.goods-swiper {
  width: 100%;
  height: 750rpx;
}

.goods-swiperImg {
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
  width: 606rpx;
  color: #333;
}
.product_info .goods .share_icon {
  width: 36rpx;
  height: 40rpx;
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

.comment {
  position: relative;
  padding: 20rpx 20rpx 0;
  font-size: 28rpx;
  color: #000;
  background: #fff;
}
.comment .more_btn {
  position: absolute;
  left: calc(50% - 90rpx);
  width: 180rpx;
  line-height: 50rpx;
  margin: 25rpx 0;
  border: solid 1rpx #ff4444;
  color: #ff4444;
  border-radius: 25rpx;
  background: #fff;
  text-align: center;
}
.comment .item .user {
  line-height: 80rpx;
}
.comment .item .goodsku {
  color: #636363;
  font-size: 24rpx;
}
.comment .item .talkImg {
  width: 100%;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 31rpx 0rpx 20rpx 0rpx;
  display: flex;
  box-sizing: border-box;
  background: #fff;
}
.comment .item .talkImg .imgList {
  width: 222rpx;
  height: 222rpx;
  flex: 0 0 auto;
  box-sizing: border-box;
  margin-right: 9rpx;
  margin-bottom: 9rpx;
}
.comment .item .talkImg .imgList .imgOne {
  width: 100%;
  height: 100%;
}
.comment .item .head {
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  background: #000;
  vertical-align: middle;
  margin-right: 20rpx;
}

.detail {
  margin-bottom: 20rpx;
}
.detail .detail_title {
  line-height: 88rpx;
  font-size: 28rpx;
  color: #636363;
  background: #fff;
  text-align: center;
}
.detail image {
  width: 100%;
  height: 706rpx;
}
.detail .space {
  height: 80rpx;
}

.product_standard_info {
  background: #fff;
  position: absolute;
  bottom: 0;
  width: 100%;
}
.product_standard_info .space {
  height: 100rpx;
}
.product_standard_info .product {
  border-bottom: 1rpx solid #e5e5e5;
}
.product_standard_info .product .base_info {
  display: flex;
  padding: 32rpx 30rpx 17rpx;
  position: relative;
  border-bottom: 1px solid #e5e5e5;
}
.product_standard_info .product .base_info image {
  width: 180rpx;
  height: 180rpx;
  margin-right: 23rpx;
  background: skyblue;
  border-radius: 20rpx;
}
.product_standard_info .product .base_info .product_standard {
  font-size: 24rpx;
  color: #636363;
}
.product_standard_info .product .base_info .delete-btn {
  position: absolute;
  width: 28rpx;
  height: 28rpx;
  padding: 10rpx;
  border: 1rpx solid #888;
  right: 0;
  background: #fff;
  border-radius: 50%;
}
.product_standard_info .product .standard_wrap {
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
}
.product_standard_info .product .standard_wrap .standard_title {
  margin: 22rpx 30rpx 38rpx;
  color: #000;
}
.product_standard_info .product .standard_wrap .standard_info {
  display: flex;
  padding-left: 30rpx;
  color: #282425;
}
.product_standard_info .product .standard_wrap .standard_info .checked {
  color: #fff;
  background: #ff4444;
}
.product_standard_info .product .standard_wrap .standard_info view {
  margin: 0 40rpx 30rpx 0;
  padding: 10rpx 16rpx;
  border-radius: 10rpx;
  background: #e5e5e5;
}
.product_standard_info .product .row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product_standard_info .product .row .number_title {
  margin: 36rpx 30rpx;
  color: #000;
}
.product_standard_info .product .row .number_wrap {
  display: flex;
  line-height: 50rpx;
  text-align: center;
}
.product_standard_info .product .row .number_wrap .minus,
.product_standard_info .product .row .number_wrap .add {
  display: flex;
  align-items: center;
  padding: 0 18rpx;
  font-size: 48rpx;
  color: #959595;
}
.product_standard_info .product .row .number_wrap .minus .icon_minus,
.product_standard_info .product .row .number_wrap .add .icon_minus {
  width: 19rpx;
  height: 2rpx;
}
.product_standard_info .product .row .number_wrap .minus .icon_add,
.product_standard_info .product .row .number_wrap .add .icon_add {
  width: 20rpx;
  height: 20rpx;
}
.product_standard_info .product .row .number_wrap .number {
  margin: 0 8rpx;
  padding: 7rpx 25rpx;
  color: #333;
  background: #e5e5e5;
  border-radius: 10rpx;
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
  align-items: center;
  border-top: 1rpx solid #e6e6e6;
  height: 103rpx;
  font-size: 20rpx;
  justify-content: space-around;
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
.bottom_bar .add_btn,
.bottom_bar .buy_btn {
  width: 430rpx;
  text-align: center;
  line-height: 104rpx;
}
.bottom_bar .buttonStyle {
  text-align: center;
  line-height: 104rpx;
  width: 430rpx;
  background: #fff;
  padding: 0rpx;
  border: 0 !important;
  border-radius: 0 !important;
  color: #fff;
  background: #ff4444;
}
.bottom_bar .add_btn {
  color: #fff;
  background: #fa9c9c;
}
.bottom_bar .buy_btn {
  color: #fff;
  background: #ff4444;
}
.bottom_bar .appointment-btn {
  width: 430rpx;
}

.text3 {
  font-size: 24rpx;
  color: #888888;
  padding-left: 20rpx;
  text-decoration: line-through;
}

.product_price {
  margin-top: 66rpx;
  margin-bottom: 22rpx;
  font-size: 36rpx;
  color: #ff4444;
}

.tab-icon1 {
  width: 44rpx;
  height: 36rpx;
}

.tab-icon2 {
  width: 44rpx;
  height: 40rpx;
}

.tab-icon3 {
  width: 40rpx;
  height: 40rpx;
}

.standard-box {
  position: fixed;
  z-index: 9999;
  height: calc(100vh - 104rpx);
  background: rgba(1, 1, 1, 0.3);
  width: 100%;
}

.modal_wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: gray;
}
.modal_wrap .modal {
  color: #fff;
  padding: 50rpx 100rpx;
  position: relative;
}
.modal_wrap .modal .modal_btn {
  color: #fff;
  margin: 15rpx 0 0;
  font-size: 36rpx;
  padding: none;
  border: none;
  width: 808rpx;
  height: 732rpx;
}
.modal_wrap .modal .modal_btn image {
  width: 87%;
  height: 86%;
}
</style>

<template>
  <view class="container">
    <view>
      <swiper class="goods-swiper">
        <block wx:for="{{1}}" wx:key="key">
          <swiper-item>
            <image src="{{goods.goods_image}}" class="goods-swiperImg" mode="aspectFill">
          </swiper-item>
        </block>
      </swiper>

      <view class="product_info">
        <view class="goods">
          <view class="goods_main_info">
            <view class="column">
              <view class="product_title">{{goods.pgoods_name}}</view>
            </view>
            <button class="share" plain="true" open-type="share">
              <view class="column_center">
                <image src="../../images/icon_6_fenxiang@2x.png" class="share_icon">分享
              </view>
            </button>
          </view>
          <view class="product_price">¥{{goods.goods_price}}</view>
          <view class="goods_other_info">
            <view class="text">库存：{{goods.goods_storage}}</view>
            <view class="text">销量：{{goods.goods_salenum}}</view>
          </view>
        </view>
      </view>
      <view class="detail">
        <view class="detail_title">商品详情</view>
        <repeat for="{{goodsimgList}}" item="img">
          <image src="{{img}}" mode="widthFix">
        </repeat>
        <view class="space"></view>
      </view>
    </view>
    <view class="bottom_bar">
      <view class="icon">
        <button class="share sess_btn" open-type="contact" session-from="weapp" plain="true">
          <image class="tab-icon1" src="../../images/icon_6_kefu@2x.png">
          <view>客服</view>
        </button>
        <navigator open-type="switchTab" url="/pages/home" hover-class="none">
          <image class="tab-icon2" src="../../images/icon_6_zhuye@2x.png">
          <view>主页</view>
        </navigator>
      </view>
      <view class="buy_btn" @tap="firmOrder()">立即购买</view>
    </view>
    <view class="modal_wrap" wx:if="{{getInfoShow}}">
      <view class="modal">
        <button
          class="modal_btn"
          plain="true"
          open-type="getUserInfo"
          lang="zh_CN"
          bindgetuserinfo="bindGetUserInfo"
        >
          <image class="img_modal" mode="widthFix" src="../../images/getphone.png">
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import { getCode } from "../../utils/user-tools";
import {
  showSuccessToast,
  showFailToast,
  exploitToast
} from "../../utils/tools";
export default class GoodsDetails extends wepy.page {
  config = {
    navigationBarTitleText: "积分商品详情"
  };
  data = {
    //个人信息
    wxUserInfo: {},
    // Goods Id
    id: null,
    //商品详情
    goods: {},
    //商品详情图片列表
    goodsimgList: [],
    //预留类型字段
    btnType: null,
    //拉取用户信息
    getInfoShow: false,
    //传递的参数
    options: {}
  };

  computed = {};

  components = {};

  methods = {
    onShareAppMessage: function(res) {
      console.log(this.goods);
      let str = "";
      let that = this;
      str =
        "/pages/store/pointGoodsDetail?goods_commonid=" + this.goods.goods_id;
      return {
        title: this.goods.goods_name,
        path: str,
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

    //获取用户信息
    async bindGetUserInfo(e) {
      let wxUserInfo = e.detail.userInfo;
      wx.setStorageSync("wxUserInfo", wxUserInfo);
      if (wxUserInfo != null) {
        this.getInfoShow = false;
        const res = await shttp
          .post("/api/v1/member/memberinfo")
          .send({
            wx_name: wxUserInfo.nickName,
            wx_avatar: wxUserInfo.avatarUrl
          })
          .end();
        //获取个人资料/api/v1/member4/profile
        const memberRes = await shttp.get(`/api/v1/member/memberinfo`).end();
        let memberInfo = memberRes.data;
        wx.setStorageSync("memberInfo", memberInfo);
        this.goodsDetails(this.id, this.options.type);
        //这里获取购物车数量
        this.getShopCartNum();
      }
    },

    firmOrder(that) {
      console.log("立即购买");
      //这里判断是从哪里调起方法
      if (that) {
        console.log("这里1");
        if (that.goods.goods_storage < 1) {
          return showFailToast("库存不足");
        }
        wx.navigateTo({
          url:
            "/pages/store/pointfirmOrder?type=nocart&goods=" +
            encodeURIComponent(JSON.stringify(that.goods))
        });
      } else {
        console.log("这里2");
        if (this.goods.goods_storage < 1) {
          return showFailToast("库存不足");
        }
        wx.navigateTo({
          url:
            "/pages/store/pointfirmOrder?type=nocart&goods=" +
            encodeURIComponent(JSON.stringify(this.goods))
        });
      }
    }
  };

  onShow() {}
  //商品详情
  async goodsDetails(id, type) {
    console.log("开始请求商品====" + id);
    let res = {};
    res = await shttp.get(`/api/v1/member/integralgoods?pgoods_id=${id}`).end();
    console.log(res);
    this.goods = res.data;
    this.goodsimgList = JSON.parse(this.goods.pgoods_body);
    console.log("积分商品详情");
    console.log(this.goods);
    this.goods.goods_storage = this.goods.pgoods_storage;
    this.goods.goods_price = this.goods.pgoods_cost;
    this.goods.goods_id = this.goods.pgoods_id;
    this.goods.goods_salenum = this.goods.pgoods_salenum;
    this.goods.goods_image = JSON.parse(this.goods.pgoods_image);
    wx.hideLoading();
    this.$apply();
  }

  async onLoad(option) {
    wx.showLoading({
      title: "加载中"
    });
    this.options = option;
    let wxUserInfo = wx.getStorageSync("wxUserInfo");
    if (wxUserInfo) {
      this.id = option.goods_commonid;
      this.goodsDetails(this.id, option.type);
    } else {
      this.getInfoShow = true;
      this.id = option.goods_commonid;
    }
  }
}
</script>

