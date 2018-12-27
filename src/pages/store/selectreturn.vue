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
  font: 32rpx PingFang-SC-Medium;
  background: #f4f4f4;
  height: 100%;
}

.around {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20rpx;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product_info {
  height: 250rpx;
  background: #fff;
}
.product_info image {
  width: 180rpx;
  height: 180rpx;
  background: gray;
}
.product_info .product {
  width: 500rpx;
}
.product_info .product .product_title {
  color: #333;
}
.product_info .product .product_price {
  line-height: 44rpx;
  border-radius: 22rpx;
  font-size: 37rpx;
  color: #ff4444;
  text-align: center;
}
.product_info .product .product_price,
.product_info .product .product_address {
  margin: 15rpx 0 45rpx;
}
.product_info .product .product_address,
.product_info .product .product_number {
  font-size: 28rpx;
  color: #888;
}
.product_info .product .product_standard {
  font-size: 24rpx;
  color: #888;
}

.flex {
  display: flex;
  flex-direction: column;
  height: 100rpx;
}
.flex image {
  margin-left: 20rpx;
}
.flex text {
  height: 50rpx;
  line-height: 50rpx;
}
.flex .title {
  font-size: 28rpx;
  color: #000;
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
  width: 43rpx;
  height: 42rpx;
  margin-top: 30rpx;
}

.row_between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  line-height: 88rpx;
  padding: 0 20rpx;
  border-bottom: 1rpx solid #f4f4f4;
  background: #fff;
  font-size: 28rpx;
  color: #888;
}
.row_between .icon {
  width: 70rpx;
  height: 70rpx;
  margin-right: 21rpx;
  border-radius: 10rpx;
}
</style>

<template>
  <view class="container">
    <repeat for="{{orderDetail.order_goods}}" key="index" index="index" item="item">
      <view class="product_info around">
        <image src="{{item.goods_image}}" mode="aspectFill">
        <view class="product">
          <view class="product_title">{{item.goods_name}}</view>
          <view class="row">
            <view class="product_price">¥{{item.goods_price}}</view>
            <!-- <view class='product_address'>福建福州</view> -->
          </view>
          <view class="row">
            <view class="product_standard">规格：{{item.goods_spec|| '统一规格'}}</view>
            <view class="product_number">×{{item.goods_num}}</view>
          </view>
        </view>
      </view>
    </repeat>
    <repeat for="{{list}}" item="item">
      <view @tap="gotoReturn({{item.url}})" class="row_between">
        <view class="flex">
          <text class="title">{{item.name}}</text>
          <text>{{item.info}}</text>
        </view>
        <image class="arrow" src="../../images/icon_zuojiantou@2x.png">
      </view>
    </repeat>
  </view>
</template>

<script>
import wepy from "wepy";

export default class Select extends wepy.page {
  data = {
    //订单商品详情
    orderDetail: {},
    list: [
      {
        name: "仅退款",
        url: "/pages/store/refund?goods=",
        info: "未收到货（包含未签收)"
      },
      {
        name: "退货退款",
        url: "/pages/store/retundgood?goods=",
        info: "已收到货,需要退还已收到的货物"
      }
    ]
  };

  computed = {};

  components = {};

  methods = {
    //去相应退款或者退货页面、
    gotoReturn(toUrl) {
      wx.redirectTo({
        url: toUrl + encodeURIComponent(JSON.stringify(this.orderDetail))
      });
    }
  };
  onLoad(option) {
    this.orderDetail = JSON.parse(decodeURIComponent(option.goods));

    console.log(this.orderDetail);
    this.$apply();
  }
}
</script>

