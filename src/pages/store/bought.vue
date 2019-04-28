<style>
.container {
  font: 32rpx PingFang-SC-Medium;
  background: #fff;
  min-height: 100vh;
}

.around {
  width: 100%;
  text-align: center;
}
.around image {
  width: 180rpx;
  height: 180rpx;
}
.around-txt {
  width: 100%;
  text-align: center;
  font-size: 32rpx;
  color: #222;
  margin-top: 20rpx;
  font-weight: 600;
}
.order_btn {
  width: 690rpx;
  height: 88rpx;
  background: #4fb84a;
  border-radius: 10rpx;
  border: solid 1rpx #4fb84a;
  color: #fff;
  font-size: 32rpx;
  text-align: center;
  line-height: 88rpx;
  margin: 60rpx auto;
}
.order_btnBg {
  background: #fff;
  color: #4fb84a;
}
.time_info {
  height: auto;
  padding: 10rpx 0;
  font-size: 32rpx;
  color: #222;
  margin: 0 30rpx;
  margin-top: 80rpx;
}
.time-br {
  width: 100%;
  border-bottom: 1rpx solid #e6e6e6;
}
.time_info .time view {
  margin: 18rpx 0 0;
}

.s_fc_2{ color:#4fb84a; }
</style>

<template>
  <view class="container">
    <view class="around">
      <image src="../../images/order/success.png">
      <view class="around-txt">订单支付成功！</view>
    </view>

    <view class="time_info">
      <view class="time">
        <view>订单编号：{{order.order_sn}}</view>
        <view>订单金额：¥{{orderPrice}}</view>
        <view wx:if="{{unPay}}">支付方式：微信支付</view>
        <view>下单时间：{{order.add_time}}</view>
        <view wx:if="{{!unPay}}">支付时间：{{order.payment_time}}</view>
        <view class="time-br"></view>
        <view wx:if="{{order.voucher_price != 0}}">优 惠 券：-¥{{order.Preferential}}</view>
        <view wx:if="{{order.order_points != 0}}">积分抵扣：-¥{{order.order_points}}</view>
        <view>实付金额：
          <text class="s_fc_2">￥{{order.order_amount}}</text>
        </view>
      </view>
    </view>

    <view class="order_btn" @tap="goOrderDetail">查看订单</view>
    <view class="order_btn order_btnBg" @tap="goHome">继续逛逛</view>
  </view>
</template>

<script>
import wepy from "wepy";
import dayjs from "dayjs";
import { shttp } from "../../utils/http";
import calc from "calculatorjs";
export default class Bought extends wepy.page {
  config = {
    navigationBarTitleText: "购买完成"
  };
  data = {
    order: null,
    //订单id
    option: null,
    orderPrice: null,
    isVip: false,
  };

  components = {};

  computed = {
    unPay(){ return this.order && /^1970/g.test(this.order.payment_time); }
  }

  methods = {
    goHome() {
      wx.reLaunch({
        url: "/pages/home"
      });
    },
    //去普通商品订单详情
    goOrderDetail() {
      switch (this.option.orderType) {
        case "group":
          wx.navigateTo({
            url: `/pages/my/groupbuyDatail?id=${this.option.ptId}`
          });
          break;
        default:
          wx.navigateTo({
            url: `/pages/store/orderdetail?orderId=${this.option.id}&unVip=${!this.isVip}&type=${this.option.orderType}`
          });
          break;
      }
    }
  };
  onLoad(option) {
    this.option = option;
    this.isVip = option.isVip;
    //获取订单详情
    this.getOrderInfo();
  }
  async getOrderInfo() {
    const res = await shttp.get(`/api/v2/member/order/${this.option.id}`).end();
    this.order = res.data[0];
    if (this.order.voucher_price == null) {
      this.order.voucher_price = "0.00";
    }
    this.orderPrice = calc
      .add(this.order.goods_total_prices, this.order.shipping_fee)
      .toFixed(2);
    this.order.Preferential = calc
      .sub(this.orderPrice, this.order.order_amount)
      .toFixed(2);
    this.order.add_time = dayjs(this.order.add_time).format(
      "YYYY年MM月DD日 HH:mm"
    );
    this.order.payment_time = dayjs(this.order.payment_time).format(
      "YYYY年MM月DD日 HH:mm"
    );
    this.$apply();
  }
}
</script>

