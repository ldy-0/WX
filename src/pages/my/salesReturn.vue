<style scoped>
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
  background: #f4f4f4;
  min-height: 100vh;
}
.product_info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 250rpx;
  background: #fff;
  margin-bottom: 20rpx;
  border-top: 1rpx solid #e5e5e5;
}
.product_info image {
  width: 180rpx;
  height: 180rpx;
}
.product_info .product {
  width: 500rpx;
  height: 180rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.product_info .product .product_title {
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.product_info .product .product_price {
  font-size: 36rpx;
  color: #ff7900;
  padding-top: 20rpx;
}
.product_info .product .product_address,
.product_info .product .product_number {
  font-size: 28rpx;
  color: #888;
}
.product_info .product .product_standard {
  font-size: 24rpx;
  color: #888;
  width: 100%;
  height: 35rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.nav-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 27rpx;
  background: #fff;
  border-bottom: 1rpx solid #e5e5e5;
}
.arrow {
  width: 15rpx;
  height: 25rpx;
}
.nav-btnTxt1 {
  font-size: 28rpx;
}
.nav-btnTxt2 {
  font-size: 20rpx;
  color: #636363;
}
</style>
<template>
  <view class="container">         
    <repeat for='{{order.order_goods}}' item='item'>
      <view class='product_info'>
        <image src='{{item.goods_image}}' mode="aspectFill"/>
        <view class='product'>
            <view class='product_title'>{{item.goods_name}}</view>
            <view class='row'>
                <view class='product_price'>¥{{item.goods_price}}</view>
            </view>
            <view class='row'>
                <view class='product_standard'></view>
                <view class='product_number'>×{{item.goods_num}}</view>
            </view>
        </view>
      </view>
    </repeat>
    <view class="nav-btn" @tap="return1">
      <view>
        <view class="nav-btnTxt1">仅退款</view>
        <view class="nav-btnTxt2">未收到货（包含未签收）</view>
      </view>
      <image class='arrow' src='../../images/icon_zuojiantou@2x.png' />
    </view>
    <view class="nav-btn" @tap="return2">
      <view>
        <view class="nav-btnTxt1">退货退款</view>
        <view class="nav-btnTxt2">已收到货，需要退还已收到的货物</view>
      </view>
      <image class='arrow' src='../../images/icon_zuojiantou@2x.png' />
    </view>
  </view>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class SalesReturn extends wepy.page {
  config = {
    navigationBarTitleText: "退货详情"
  };
  data = {
    order: {},
    orderType: null
  };
  components = {};
  onLoad(opt) {
    if (opt.order) {
      if (opt.type == "1") {
        this.orderType = "1";
        this.order = JSON.parse(decodeURIComponent(opt.order));
        this.order.order_goods = [];
        let goods = {
          goods_id: this.order.goods_id,
          goods_image: this.order.goods_image,
          goods_name: this.order.goods_name,
          goods_price: this.order.goods_price,
          goods_num: this.order.goods_num
        };
        this.order.order_goods.push(goods);
      } else if (opt.type == "2") {
        this.orderType = "1";
        this.order = JSON.parse(decodeURIComponent(opt.order));
        this.order.order_goods = [];
        let goods = {
          goods_id: this.order.goods_id,
          goods_image: this.order.goods_pic,
          goods_name: this.order.goods_name,
          goods_price: this.order.goods_price,
          goods_num: this.order.goods_num,
          appointment: 1
        };
        this.order.order_goods.push(goods);
      } else {
        this.order = JSON.parse(decodeURIComponent(opt.order));
      }
    }
    this.$apply();
  }
  onShow() {}
  return1() {
    if (this.orderType == "1") {
      wx.navigateTo({
        url:
          "/pages/my/salesReturnApplyfor?type=refund&orderType=1&order=" +
          encodeURIComponent(JSON.stringify(this.order))
      });
    } else {
      wx.navigateTo({
        url:
          "/pages/my/salesReturnApplyfor?type=refund&orderType=0&order=" +
          encodeURIComponent(JSON.stringify(this.order))
      });
    }
  }
  return2() {
    if (this.orderType == "1") {
      wx.navigateTo({
        url:
          "/pages/my/salesReturnApplyfor?orderType=1&order=" +
          encodeURIComponent(JSON.stringify(this.order))
      });
    } else {
      wx.navigateTo({
        url:
          "/pages/my/salesReturnApplyfor?orderType=0&order=" +
          encodeURIComponent(JSON.stringify(this.order))
      });
    }
  }
}
</script>
