<style>
.container {
  font: 32rpx PingFang-SC-Medium;
  background: #f4f4f4;
  min-height: 100vh;
}

.around {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.around_1 {
  display: flex;
  justify-content: space-around;
}

.row {
  display: flex;
  justify-content: space-between;
}

.person_info_wrap {
  height: 160rpx;
  font-size: 28rpx;
  color: #636363;
  background: #fff;
}
.person_info_wrap .person_info {
  width: 700rpx;
}
.person_info_wrap .person_info .person {
  display: flex;
  justify-content: space-between;
  margin: 20rpx 0;
}

.status_info {
  line-height: 88rpx;
  margin: 20rpx 0 0;
  padding-left: 30rpx;
  color: #202020;
  background: #fff;
  border-bottom: 2rpx solid #e5e5e5;
}

.product_info {
  padding: 30rpx 0;
  min-height: 250rpx;
  background: #fff;
}
.product_info image {
  width: 180rpx;
  height: 180rpx;
}
.product_info .product {
  width: 500rpx;
}
.product_info .product .product_title {
  color: #333;
}
.product_info .product .product_price {
  font-size: 36rpx;
  color: #dd3d27;
  margin: 50rpx 0 0;
}
.product_info .product .product_address {
  margin: 15rpx 0 45rpx;
}
.product_info .product .product_address,
.product_info .product .product_number {
  font-size: 24rpx;
  color: #888;
}
.product_info .product .product_standard {
  font-size: 24rpx;
  color: #888;
}

.words_info {
  line-height: 68rpx;
  padding-left: 21rpx;
  font-size: 28rpx;
  color: #000;
  background: #fff;
}

.order_info {
  line-height: 100rpx;
  margin: 20rpx 0 0;
  padding: 0 24rpx;
  background: #fff;
}
.order_price_wrap {
  color: #af0000;
}
.order_price{
  font-size: 40rpx;
}

.time_info {
  height: auto;
  /* margin: 22rpx 0 100rpx; */
  padding: 10rpx 30rpx 20rpx;
  border: 2rpx solid #e5e5e5;
  background: #fff;
  font-size: 20rpx;
  color: #636363;
  margin-bottom: 0rpx;
}
.time_info .time view {
  margin: 18rpx 0 0;
}
.time_info .btn {
  width: 100rpx;
  height: 34rpx;
  margin: 14rpx 0 0;
  border: 1rpx solid #282425;
  border-radius: 10rpx;
  font-size: 24rpx;
  color: #282425;
  text-align: center;
}

.bottom_bar {
  position: fixed;
  bottom: 0rpx;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100rpx;
  font-size: 28rpx;
  color: #282425;
  background: #fff;
}
.bottom_bar .btn {
  width: 144rpx;
  line-height: 44rpx;
  margin-right: 24rpx;
  border: 1rpx solid #282425;
  border-radius: 10rpx;
  text-align: center;
}

.Customer {
  padding: 0rpx;
  width: 144rpx;
  line-height: 44rpx;
  margin-right: 24rpx;
  border: 1rpx solid #333;
  border-radius: 10rpx;
  font-size: 28rpx;
  text-align: center;
}

.storeName {
  background: #fff;
  padding-left: 30rpx;
  font-size: 28rpx;
  padding-top: 10rpx;
  display: flex;
  align-items: center;
}
.storeName image {
  width: 30rpx;
  height: 30rpx;
  margin-right: 10rpx;
}

.boder-none {
  border: 0rpx solid #333;
}

.s_fc_2{ color: #979797; }
</style>

<template>
  <view class="container">
    <view wx:if="{{orderType!=2}}">
      <view class="person_info_wrap around" wx:if="{{order.order_reciver_info.name}}">
        <view class="person_info">
          <view class="person">
            <view>收货人：{{order.order_reciver_info.name}}</view>
            <view>{{order.order_reciver_info.phone}}</view>
          </view>
          <view class='s_fc_2'>收货地址：{{order.order_reciver_info.address}}</view>
        </view>
      </view>
      <view class="status_info" wx:if="{{order.order_state_id==10}}">待付款</view>
      <view class="status_info" wx:if="{{order.order_state_id==20}}">待发货</view>
      <view class="status_info" wx:if="{{order.order_state_id==30}}">待收货</view>
      <view class="status_info" wx:if="{{order.order_state_id==40}}">已收货</view>
      <view class="status_info" wx:if="{{order.order_state_id==50}}">待评价</view>
      <view class="status_info" wx:if="{{order.order_state_id==80}}">已完成</view>
      <view class="status_info" wx:if="{{order.order_state_id==100}}">已关闭</view>

      <view wx:if="{{orderType==0}}">
        <repeat for="{{order.order_goods}}" item="item">
          <view class="product_info around_1">
            <image src="{{item.goods_image}}" mode="aspectFill">
            <view class="product">
              <view class="product_title">{{item.goods_name}}</view>
              <view class="row">
                <view class="product_price">¥{{item.goods_price}}</view>
              </view>

              <view class="row">
                <!-- <view class="product_standard">规格：{{item.goods_spec || "统一规格"}}</view> -->
                <view class="product_number">×{{item.goods_num}}</view>
              </view>
            </view>
          </view>
        </repeat>
      </view>

      <view wx:if="{{orderType==1}}">
        <view class="product_info around_1">
          <image src="{{order.goods_image}}" mode="aspectFill">
          <view class="product">
            <view class="product_title">{{order.goods_name}}</view>
            <view class="row">
              <view class="product_price">¥{{order.goods_price}}</view>
            </view>
            <view class="row">
              <view class="product_standard"></view>
              <view class="product_number"></view>
            </view>
          </view>
        </view>
      </view>

      <view class="order_info row">
        <text>实付款:</text>
        <text class="order_price_wrap">¥<text class='order_price'>{{order.order_amount}}</text></text>
      </view>

      <view class="time_info row">
        <view class="time">
          <view>订单编号：{{order.order_sn}}</view>
          <view>下单时间：{{order.add_time}}</view>
          <view>付款时间：{{order.payment_time=='1970年01月01日 08:00'?"未支付":order.payment_time}}</view>
          <!-- <view>付款方式：微信支付</view> -->
          <view>优惠券抵扣：-¥{{order.Preferential}}</view>
          <view>积分抵扣：-¥{{order.pointPrice}}</view>
          <view>余额抵扣：-¥{{order.pd_amount}}</view>
          <view wx:if="{{order.shipping_code && order.shipping_code[0]}}">快递公司：{{order.shipping_code[0]}}</view>
          <view wx:if="{{order.shipping_code && order.shipping_code[1]}}">快递单号：{{order.shipping_code[1]}}</view>
        </view>
        <!-- <view class="btn" @tap="copyOrder">复制</view> -->
      </view>

      <view style='height: 100rpx;'></view>

      <!-- <view class="time_info row" wx:if="{{order.shipping_code && order.shipping_code[0]}}" >
        <view class="time">
          <view wx:if="{{order.shipping_code && order.shipping_code[0]}}">快递公司：{{order.shipping_code[0]}}</view>
          <view wx:if="{{order.shipping_code && order.shipping_code[1]}}">快递单号：{{order.shipping_code[1]}}</view>
          <view wx:if="{{order.shipping_code.linkmanName}}">联系人：{{order.shipping_code.linkmanName}}</view>
          <view wx:if="{{order.shipping_code.linkmanPhone}}">联系电话：{{order.shipping_code.linkmanPhone}}</view>
        </view>
        <view class="btn" @tap="copyexpress">复制</view>
      </view> -->

      <view class="bottom_bar">
        <button class="Customer" open-type="contact" session-from="weapp" plain="true">联系客服</button>
        <view class="btn" wx:if="{{order.order_state_id==30}}" @tap="Confirm">确认收货</view>
        <view class="btn" wx:if="{{order.order_state_id==10}}" @tap="payMoney">支付</view>
        <view class="btn" wx:if="{{unVip && canRefund}}" @tap="goAfterSale">申请售后</view>
      </view>
    </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import dayjs from "dayjs";
import calc from "calculatorjs";

export default class OrderDetail extends wepy.page {
  config = {
    navigationBarTitleText: "订单详情"
  };
  data = {
    //积分订单详情
    pointOrder: {},
    //订单详情
    order: null,
    //订单类型
    orderType: 0, //0实物订单 1虚拟订单 2待支付
    //地址
    address: null,
    unVip: false,
    type: null,
  };

  components = {};

  computed = {
    canRefund(){ return this.type !== 'secKill' && this.type !== 'group' && this.order && [20, 30].indexOf(this.order.order_state_id) !== -1 },
  }

  methods = {
    goAfterSale(){
      let order = this.order,
          freight = order.shipping_fee;

      if(order.pointPrice >= freight){
        order.pointPrice = calc.sub(order.pointPrice, freight);
      }else{
        freight = calc.sub(freight, order.pointPrice);
        order.pointPrice = 0;

        if(order.pd_amount >= freight){
          order.pd_amount = calc.sub(order.pd_amount, freight);
        }else{
          freight = calc.sub(freight, order.pd_amount);
          order.pd_amount = 0;

          order.refundPrice = calc.sub(order.refundPrice, freight);
        }
      }
      // console.error(freight, order.pointPrice, order.pd_amount, order.refundPrice);

      let url = `/pages/order/afterSale?goods=${encodeURIComponent(JSON.stringify(this.order))}`;

      wx.navigateTo({ url });
    },
    //确认收货
    Confirm(item) {
      let that = this;
      wx.showModal({
        title: "提示",
        content: "是否确认收货？",
        success: function(res) {
          if (res.confirm) {
            that.comfirmOrder(item.id);
          } else if (res.cancel) {
            return;
          }
        }
      });
    },
    copyOrder() {
      wx.setClipboardData({
        data: `订单号：${this.order.order_sn} 下单时间：${
          this.order.add_time
        } 支付时间：${this.order.payment_time}`,
        success: res =>
          wx.getClipboardData({ success: res => console.log(res) })
      });
    },
    copyexpress() {
      wx.setClipboardData({
        data: `${
          this.order.shipping_code.companyName
            ? "快递公司：" + this.order.shipping_code.companyName
            : ""
        } ${
          this.order.shipping_code.expressNumber
            ? "快递单号：" + this.order.shipping_code.expressNumber
            : ""
        } ${
          this.order.shipping_code.linkmanName
            ? "联系人：" + this.order.shipping_code.linkmanName
            : ""
        } ${
          this.order.shipping_code.linkmanPhone
            ? "联系电话：" + this.order.shipping_code.linkmanPhone
            : ""
        }`,
        success: res =>
          wx.getClipboardData({ success: res => console.log(res) })
      });
    }
  };
  async comfirmOrder(orderId) {
    let res = await orderApi.confirmReceive({
      params: {
        orderId: orderId
      }
    });
    console.log("确认返回的结果");
    console.log(res);
    if (res) {
      wx.showToast({
        title: "收货成功",
        icon: "success",
        duration: 2000
      });
    } else {
      wx.showToast({
        title: "收货失败",
        icon: "none",
        duration: 2000
      });
    }
  }
  async onLoad(opt) {
    this.type = opt.type;
    console.log(opt);

    if (opt.order) {
      this.orderType = 2;
      this.order = JSON.parse(decodeURIComponent(opt.order));
      console.log(this.order);
      const res = await shttp
        .get("/api/v2/member/order")
        .query({
          order_id: this.order[0].order_id
        })
        .end();
      console.log("待支付");
      console.log(res);
      this.address = res.data[0];
    } else if (opt.orderId) {
      console.log(opt.orderId);
      const res = await shttp.get("/api/v2/member/order/" + opt.orderId).end();
      console.log("实物订单", res, opt);

      res.data.forEach(this.format);

      // add order_id
      res.data[0].order_id = opt.orderId;

      this.order = res.data[0];
      this.order.add_time = dayjs(this.order.add_time).format( "YYYY年MM月DD日 HH:mm");
      this.order.payment_time = dayjs(this.order.payment_time).format( "YYYY年MM月DD日 HH:mm");

      this.unVip = JSON.parse(opt.unVip);
    }

    this.$apply();
  }

  format(order){
    order.pointPrice = calc.div(order.order_points, 10);
    order.Preferential =calc.sub( calc.add(order.goods_total_prices, order.shipping_fee), order.order_amount ).toFixed(2);
    order.refundPrice = calc.sub( calc.sub( order.order_amount, order.pointPrice), order.pd_amount );

    
    order.order_goods.forEach(v => {
      let spec = v.goods_spec,
          specStr = '';

      if(spec){

        for(let key in spec){ specStr += `${spec[key]}; `; }

        v.goods_spec = specStr.replace(/;\s$/g, '');
      }

    });
  }

  //支付
  async payMoney(e) {
    const res = await shttp
      .put("/api/v2/member/order/" + this.order.pay_sn)
      .end();
    if (res.data) {
      wx.showToast({
        title: "支付申请中...",
        icon: "none",
        duration: 2000
      });
      let order_id = res.data.order_id;
      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: "MD5",
        paySign: res.data.paySign,
        success: function(res) {
          wx.reLaunch({
            url: `./bought?id=${order_id}`
          });
        },
        fail: function(res) {
          wx.showToast({
            title: "支付失败",
            icon: "none",
            duration: 2000
          });
        }
      });
    }
  }
  //自己封装不要四舍五入tofixed()
  myTofiexd(e) {
    console.log(e);
    if (e < 0) return 0;
    let num = e;

    let bb = num + "";
    let dian = bb.indexOf(".");
    let result = "";
    if (dian == -1) {
      result = num.toFixed(2);
    } else {
      let cc = bb.substring(dian + 1, bb.length);
      if (cc.length >= 3) {
        result =
          ((Number(num.toFixed(2)) + 0.01) * 100000000000) / 100000000000; //js小数计算小数点后显示多位小数
      } else {
        result = num.toFixed(2);
      }
    }
    return result;
  }
}
</script>

