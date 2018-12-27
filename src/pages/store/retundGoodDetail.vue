<style scoped>
.container {
  font: 28rpx PingFang-SC-Medium;
  color: #000;
  background: #f4f4f4;
  height: 100vh;
}

.around {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.row {
  display: flex;
  justify-content: space-between;
}

.backaddr {
  border-bottom: solid 1rpx #f7f7f7;
}

.title {
  line-height: 88rpx;
  padding: 0 18rpx;
  background: #fff;
}

.person_info_wrap {
  height: 160rpx;
  margin-bottom: 20rpx;
  color: #636363;
  background: #fff;
}
.person_info_wrap .person_info {
  width: 640rpx;
}
.person_info_wrap .icon_diwei {
  width: 33rpx;
  height: 40rpx;
}
.person_info_wrap .icon_diwei .person {
  display: flex;
  justify-content: space-between;
  margin: 20rpx 0;
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
  color: #888;
}
.product_info .product .product_standard {
  font-size: 24rpx;
  color: #888;
}

.single_row {
  display: flex;
  align-items: center;
  height: 88rpx;
  padding: 0 27rpx;
  background: #fff;
  margin: 20rpx 0 0;
}
.single_row .price,
.single_row .description {
  margin-left: 30rpx;
}
.single_row .price {
  color: #af0000;
}
.single_row .description {
  color: #888;
}

.no_split_row {
  display: flex;
  align-items: center;
  height: 88rpx;
  padding: 0 27rpx;
  background: #fff;
}
.no_split_row .price,
.no_split_row .description {
  margin-left: 30rpx;
}
.no_split_row .price {
  color: #af0000;
}
.no_split_row .description {
  color: #888;
}

.split_line_row {
  display: flex;
  align-items: center;
  height: 88rpx;
  padding: 0 27rpx;
  background: #fff;
  border-top: 1rpx solid #f4f4f4;
}
.split_line_row .price,
.split_line_row .description {
  margin-left: 30rpx;
}
.split_line_row .price {
  color: #af0000;
}
.split_line_row .description {
  color: #888;
}

.bottom_bar {
  position: absolute;
  bottom: 0rpx;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100rpx;
  color: #010101;
  background: #fff;
}
.bottom_bar .Customer {
  padding: 0rpx;
  width: 144rpx;
  line-height: 44rpx;
  margin-right: 24rpx;
  border: 1rpx solid #333;
  border-radius: 10rpx;
  font-size: 28rpx;
  text-align: center;
}
.bottom_bar .btn {
  line-height: 44rpx;
  margin-right: 24rpx;
  padding: 0 17rpx;
  border: 1rpx solid #666;
  border-radius: 10rpx;
  text-align: center;
}
</style>

<template>
  <view class="container">
    <!-- <view class='title backaddr'>退货寄回地址</view>

      <view class='person_info_wrap around'>
          <image class="icon_diwei" src='../../images/icon_dingwei@2x.png' />
          <view class='person_info'>
              <view class='person'>
                  <view>收货人：{{orderDetail.buyerName}}</view>
                  <view>{{orderDetail.buyerPhone}}</view>
              </view>
              <view>收货地址：{{orderDetail.addressDetails}}</view>
          </view>
    </view>-->
    <view class="title">{{orderDetail.order_state}}</view>
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
    <view class="split_line_row row">
      <view>退款金额</view>
      <view class="price">{{orderDetail.order_amount}}</view>
    </view>

    <view class="split_line_row row">
      <view>退货/退款说明</view>
      <view class="description row">{{orderDetail.buyer_message}}</view>
    </view>
    <view class="split_line_row row" wx:if="{{orderDetail.express_name}}">
      <view>物流公司</view>
      <view class="description row">{{orderDetail.express_name}}</view>
    </view>
    <view class="split_line_row row" wx:if="{{orderDetail.invoice_no}}">
      <view>物流单号</view>
      <view class="description">{{orderDetail.invoice_no}}</view>
    </view>
    <view class="bottom_bar">
      <!-- <navigator class='btn' url='./select'>填写物流单号</navigator> -->
      <button class="Customer" open-type="contact" session-from="weapp" plain="true">联系客服</button>
      <!-- <view class='btn'>查看物流</view> -->
    </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class ReturnGoodsDetail extends wepy.page {
  config = {
    navigationBarTitleText: "退货换货详情"
  };
  data = {
    //订单商品详情
    orderDetail: {}
  };

  computed = {};

  components = {};

  methods = {};
  onLoad(option) {
    let id = option.refund_id;
    console.log("商品的详情" + id);
    this.getOrderInfo(id);
  }
  async getOrderInfo(id) {
    const res = await shttp
      .get(`/api/v2/member/refundreturn/${id}`)

      .end();
    console.log(res);
    if (res.status == 0) {
      this.orderDetail = res.data;
    }
    this.$apply();
  }
}
</script>

