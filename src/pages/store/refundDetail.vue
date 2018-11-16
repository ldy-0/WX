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

.title {
  line-height: 88rpx;
  padding: 0 18rpx;
  background: #fff;
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

      <view class='title'>{{orderDetail.refund_state}}</view>
       <repeat for="{{orderDetail.order_goods}}" key="index" index="index" item="item">
      <view class='product_info around'>
          <image  src='{{item.goods_image}}'/>
          <view class='product'>
              <view class='product_title'>{{item.goods_name}}</view>
              <view class='row'>
                  <view class='product_price'>¥{{item.goods_price}}</view>
                  <!-- <view class='product_address'>福建福州</view> -->
              </view>
              <view class='row'>
                  <view class='product_standard'>规格：{{item.spec_value|| '统一规格'}}</view>
                  <view class='product_number'>×{{item.goods_num}}</view>
              </view>
          </view>
      </view>
      </repeat>
      <view class='single_row row' >
          <view>退款原因</view>
          <view class='description'>{{orderDetail.reason_info}}</view>
      </view>

      <view class='split_line_row row'>
          <view>退款金额</view>
          <view class='price'>¥{{orderDetail.order_amount}}</view>
      </view>

      <view class='split_line_row row'>
          <view>退货说明</view>
          <view class='description'>{{orderDetail.buyer_message}}</view>
      </view>

      <view class='bottom_bar'>
          <!-- <navigator class='btn' url='./select'>填写物流单号</navigator> -->
           <button  class="Customer" open-type="contact" session-from="weapp" plain="true">联系客服</button>
          <!-- <view class='btn'>查看物流</view> -->
      </view>

  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class RefundDetail extends wepy.page {
  config = {
    navigationBarTitleText: "退款详情"
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
      .get("/api/v1/member/refundreturn")
      .query({
        refund_id: 3,
        refund_type: 1
      })
      .end();
    console.log(res);
    if (res.status == 0) {
      this.orderDetail = res.data;
    }
    this.$apply();
  }
}
</script>

