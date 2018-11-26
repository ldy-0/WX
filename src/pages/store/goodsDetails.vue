<style>
.tips {
  width: 100%;
  text-align: center;
  line-height: 100rpx;
  font-size: 30rpx;
}

.link-list > navigator {
  position: relative;
  margin: 5rpx 0;
  padding-right: 50rpx;
  line-height: 88rpx;
  background: white;
}

.link-list text {
  display: block;
  text-indent: 20rpx;
  font-size: 32rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.link-list image {
  width: 16rpx;
  height: 25rpx;
  margin-top: -12rpx;
  position: absolute;
  right: 20rpx;
  top: 50%;
}

.search {
  overflow: hidden;
  height: 108rpx;
  font: 28rpx PingFang-SC-Medium;
  color: #969696;
  background: #fff;
  text-align: center;
}
.search .search_content {
  width: 690rpx;
  line-height: 68rpx;
  margin: 20rpx auto;
  border-radius: 34rpx;
  background: #f2f2f2;
}

.search_text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-search {
  width: 40rpx;
  height: 40rpx;
}

.nodata {
  margin-top: 50%;
  font-size: 38rpx;
  text-align: center;
}

.wire-gray {
  height: 20rpx;
  width: 100%;
  background: #f4f4f4;
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
}

.goods-swiper {
  width: 100%;
  height: 750rpx;
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
  border-bottom: solid 1rpx #f7f7f7;
  margin-bottom: 20rpx;
}
.product_info .goods {
  padding: 20rpx;
}
.product_info .goods view {
  padding-top: 10rpx;
}
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
}
.product_standard_info .product .standard_wrap .standard_info .checked {
  color: #fff;
  background: #ff7900;
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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: 1rpx solid #e6e6e6;
}
.warp_btn .add_btn,
.warp_btn .buy_btn {
  width: 215rpx;
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
.warp_btn .add_btn {
  color: #fff;
  background: #3a3a47;
}
.warp_btn .buy_btn {
  color: #fff;
  background: #fc5a4f;
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

.product_price {
  font-size: 32rpx;
  color: #fc5a4f;
  margin-right: 12rpx;
}

.tab-icon2 {
  width: 46rpx;
  height: 42rpx;
}

.tab-icon3 {
  width: 45rpx;
  height: 43rpx;
}

.standard-box {
  position: fixed;
  z-index: 9999;
  height: calc(100vh - 104rpx);
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
</style>

<template>
  <view class="container">
      <view wx:if='{{showStandard}}' class="standard-box">
          <view class='product_standard_info'>
              <view class='product'>
                  <view class='base_info'>
                      <image src='{{goods.goods_image}}' mode="aspectFill"/>
                      <view>
                          <view class='product_price'>¥{{goods.goods_price}}</view>
                          <view class=''>库存：{{goods.goods_storage}}</view>
                      </view>
                      <image class='delete-btn' src='../../images/icon_cha@2x.png' @tap='deleteBtn'/>
                  </view>
                  <view class='standard_wrap'>
                      <view class='standard_title'>规格</view>
                      <view class='standard_info'>
                          <repeat for='{{standards}}' index='index' item='item'>
                              <view class="{{isChecked==index?'checked':''}}" @tap='checked({{index}})'>{{item}}</view>
                          </repeat>
                      </view>
                  </view>
                  <view class='row'>
                      <view class='number_title'>购买数量</view>
                      <view class='number_wrap'>
                        <view class='minus' @tap='minus'><image class='icon_minus' src='../../images/icon_jian@2x.png' /></view>
                        <view class='number'>{{getSize}}</view>
                        <view class='add' @tap='add'><image class='icon_add' src='../../images/icon_jia@2x.png' /></view>
                      </view>
                  </view>
              </view>
              <view class='space'></view>
          </view>
      </view>
      <view>
      <swiper class="goods-swiper"  indicator-active-color="{{indicatorActiveColor}}" indicator-color="{{indicatorColor}}" indicator-dots="{{indicatorDots}}" autoplay="{{autoplay}}" interval="{{interval}}"  duration="{{duration}}"  circular="true">
            <repeat for="{{goods.goodsimagesList}}" key="index" index="index" item="item">   
          <swiper-item class="goods_swiper_itme">
            <image src="{{item.goodsimage_url}}"  mode="aspectFill" @tap="swipclick({{item.goodsimage_url}})"/>
          </swiper-item>
            </repeat> 
    
       
      </swiper>
        
          <view class='product_info'>
              <view class='goods'>
                  <view class='product_title'>{{goods.goods_name}}</view>
                  <view class='product_price'>¥{{goods.goods_price}}<text class="text3">¥{{goods.goods_marketprice}}</text></view>
                  <view class='goods_other_info'>
                    <!-- <view class='text'>湖北武汉</view> -->
                    <view class='text'>库存：{{goods.goods_storage}}</view>
                    <view class='text'>已售：{{goods.goods_salenum}}</view>
                  </view>
              </view>
          </view>
          <view class='standard' @tap='goStandard'>
            <view>规格 {{goods.standard}}</view>
            <image src='../../images/icon_zuojiantou@2x.png' />
        </view>
          <view class='detail'>
              <view class='detail_title'>商品详情</view>
              <repeat for='{{goodsimgList}}' item='item' >
                 <view class="description">{{item.Repeat_title}}</view>
                      <image src='{{item.Repeat_images[0].url}}'  mode="aspectFill" />
              </repeat>
              <view class='space'></view>
          </view>   
      </view>
      <view class='bottom_bar'>
          <view class='icon'>
              <navigator open-type="switchTab" url="/pages/home" hover-class="none">
                <image class='tab-icon2' src='../../images/xaingqing_sy@2x.png'  />
                <view>主页</view>
              </navigator>
              <view class='red_dot_wrap'>
                <image class='tab-icon3' src='../../images/xaingqing_gwc@2x.png'  @tap='goShoppingCart' />
                <view>购物车</view>
                <view class='red_dot'>{{carSize}}</view>
              </view>
          </view>
          <view class="warp_btn">
          <view class='add_btn'  @tap="addShoppingCart()">加入购物车</view>
          <view class='buy_btn'  @tap="firmOrder()">立即购买</view>
          </view>
      </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import { getCode } from "../../utils/user-tools";
import getTimes from "../../utils/formatedate.js";
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
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 200,
    indicatorActiveColor: "#333333",
    indicatorColor: "#FFFFFF", //以上为轮播配置
    //是否添加获取手机号按钮
    isPhone: true,
    //个人信息
    wxUserInfo: {},
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
    //商品详情图片列表
    goodsimgList: []
  };

  computed = {
    isShow() {
      return this.showStandard;
    },
    getSize: () => this.size,
    nowDate: () => getTimes.formatTime(new Date(), "Y-M-D")
  };

  components = {};
  methods = {
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
      this.goods.goods_num = this.size;
      this.$apply();
    },
    async addShoppingCart() {
      // console.log(this.goods)
      if (!this.showStandard) {
        return (this.showStandard = true);
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
          goods_id: this.goods.SKUList[0].goods_id,
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
    }
  };

  onShow() {
    this.getShopCartNum();
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
  async goodsDetails(id, type) {
    console.log("开始请求商品====" + id);
    let res = {};
    //普通商品
    res = await shttp
      .get(`/api/v1/member/goodscommon?goods_commonid=${id}`)
      .end();
    console.log(res);
    this.goods = res.data;
    this.goodsimgList = JSON.parse(this.goods.goods_body);
    this.goods.goods_salenum = this.goods.SKUList[0].goods_salenum;
    this.goods.goods_storage = this.goods.SKUList[0].goods_storage;
    if (res.data.spec_value == false) {
      this.standards = ["无"];
    } else {
      this.standards = res.data.spec_value;
    }
    console.log("普通商品详情");
    console.log(this.goods.goodsimagesList);

    wx.hideLoading();
    this.$apply();
  }

  async onLoad(option) {
    wx.showLoading({
      title: "加载中"
    });
    //初始化日期
    this.options = option;
    let wxUserInfo = wx.getStorageSync("memberInfo");
    // this.getShopCartNum();
    this.id = option.goods_commonid;
    // console.log(option)
    this.goodsDetails(this.id);
  }

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
  onUnload() {}
  deleteBtn() {
    this.showStandard = false;
  }
}
</script>

