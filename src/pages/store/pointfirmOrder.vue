<style>
.container {
  font: 32rpx PingFang-SC-Medium;
  background: #f4f4f4;
  height: 100%;
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

.person_info_wrap {
  height: 160rpx;
  font: 28rpx PingFang-SC-Medium;
  color: #636363;
  background: #fff;
}
.person_info_wrap image {
  width: 23rpx;
  height: 33rpx;
}
.person_info_wrap .person_info {
  width: 600rpx;
}
.person_info_wrap .person_info .person {
  display: flex;
  justify-content: space-between;
  margin: 20rpx 0;
}

.split_bar {
  width: 100%;
  height: 10rpx;
  margin-bottom: 20rpx;
  background: gray;
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
  height: 180rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.product_info .product .product_title {
  color: #333;
}
.product_info .product .product_price {
  font-size: 36rpx;
  color: #ff4444;
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

.order_info {
  padding: 0 24rpx;
  background: #fff;
  margin-bottom: 200rpx;
}
.order_info .flex {
  display: flex;
  align-items: center;
}
.order_info view {
  line-height: 88rpx;
  color: #000;
  border-top: 1rpx solid #f4f4f4;
}
.order_info view .right {
  float: right;
}
.order_info view .right-icon {
  width: 22rpx;
  height: 37rpx;
  padding-top: 25rpx;
}
.order_info view .text {
  display: inline-block;
  color: #636363;
}
.order_info .discount-num {
  padding: 10rpx;
  border: 1rpx solid #af0000;
  font-size: 22rpx;
  color: #af0000;
}
.order_info .couponInfo {
  width: 100%;
  text-align: right;
  position: absolute;
  right: 25rpx;
  top: 0rpx;
}
.order_info .discountBtn {
  border-bottom: 1rpx solid #f4f4f4;
  position: relative;
}

.bottom_bar {
  position: fixed;
  bottom: 0rpx;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100rpx;
  font-size: 28rpx;
  color: #282425;
  background: #fff;
}
.bottom_bar .sum {
  flex-grow: 1;
  line-height: 100%;
  padding: 0 18rpx;
}
.bottom_bar .sum .sum_number {
  color: #636363;
}
.bottom_bar .sum .sum_price text {
  font-size: 37rpx;
  color: #af0000;
}
.bottom_bar .btn {
  width: 190rpx;
  line-height: 100rpx;
  background: #ff4444;
  text-align: center;
  font-size: 30rpx;
  color: #fff;
}

.discount-bg {
  position: fixed;
  z-index: 9999;
  height: 100vh;
  background: rgba(1, 1, 1, 0.3);
  width: 100%;
  bottom: 0;
}

.discount-box {
  width: 100%;
  position: absolute;
  bottom: 0;
  background: #fff;
  border-radius: 6px 6px 0px 0px;
  height: 1080rpx;
}

.scroll-height {
  height: 892rpx;
}

.delete-btn {
  position: absolute;
  width: 28rpx;
  height: 28rpx;
  padding: 10rpx;
  border: 1rpx solid #888;
  right: 10rpx;
  top: 20rpx;
  background: #fff;
  border-radius: 50%;
}

.discount-title {
  width: 100%;
  text-align: center;
  font-size: 32rpx;
  padding-top: 26rpx;
  padding-bottom: 26rpx;
}

.discount-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10rpx 44rpx;
  font-size: 24rpx;
}

.big_circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44rpx;
  height: 44rpx;
  border: 1rpx solid #c3c3c3;
  border-radius: 50%;
}
.big_circle .fill_circle {
  width: 22rpx;
  height: 22rpx;
  border-radius: 50%;
  background: #ff4444;
}

.discount-infoBox {
  width: 504rpx;
  height: 200rpx;
  background-color: #fff3e7;
  border-radius: 6rpx;
  color: #ff4444;
  font-size: 22rpx;
}

.discount-infoPrice {
  font-size: 34rpx;
  align-item: center;
  padding-top: 30rpx;
  padding-left: 200rpx;
}
.discount-infoPrice text {
  font-size: 72rpx;
}

.discount-btn {
  font-size: 36rpx;
  color: #fff;
  text-align: center;
  padding: 27rpx 0;
  background: #ff4444;
}
</style>

<template>
  <view class="container">
    <navigator class="person_info_wrap around" url="/pages/my/addressList?type=order">
      <image src="../../images/icon_dingwei@2x.png">
      <view class="person_info">
        <view class="person">
          <view>收货人：{{address.address_realname}}</view>
          <view>{{address.address_tel_phone}}</view>
        </view>
        <view>收货地址：{{address.area_info}}{{address.address_detail}}</view>
      </view>
      <image src="../../images/icon_zuojiantou@2x.png">
    </navigator>
    <image src="../../images/img_1@2x.png" class="split_bar">
    <repeat for="{{goodsList}}" index="index" item="item">
      <view class="product_info around">
        <image src="{{item.goods_image}}">
        <view class="product">
          <view class="product_title">{{item.pgoods_name}}</view>
          <view class="row">
            <view class="product_price">¥{{item.pgoods_cost}}</view>
            <!-- <view class='product_address'>湖北武汉</view> -->
          </view>
          <view class="row">
            <view class="product_standard">规格：{{item.standard|| '统一规格'}}</view>
            <view class="product_number">×{{item.goods_num|| 1}}</view>
          </view>
        </view>
      </view>
    </repeat>
    <view class="order_info">
      <view>
        <text>运费：</text>
        <text class="right">¥{{freight}}</text>
      </view>
    </view>
    <view class="bottom_bar">
      <view class="sum row">
        <view class="sum_number">共计
          <text>{{goodsNum}}</text>件商品
        </view>
        <view class="sum_price">合计：
          <text>¥{{totalPrice}}</text>
        </view>
      </view>
      <view class="btn" @tap="bought()">提交订单</view>
    </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import calc from "calculatorjs";
import {
  showSuccessToast,
  showFailToast,
  exploitToast
} from "../../utils/tools";
export default class FirmOrder extends wepy.page {
  config = {
    navigationBarTitleText: "积分商品确认订单"
  };
  data = {
    //地址
    address: {},
    // 购物车所有商品的规格Id
    skuIds: "",
    //要买的商品列表
    goodsList: [],
    //是直接购买还是购物车购买类型
    type: "",
    //共计商品数量
    goodsNum: 0,
    //合计商品价格
    totalPrice: 0,
    //购物车下单商品列表
    cart_id: [],
    //购物车填1，直接购买填0
    ifcart: "",
    //运费
    freight: 0,

    //订单类型
    orderType: null,
    //流程下单结果
    OrderResult: {},
    //判断是否点击了提交
    isclick: false
  };

  components = {};
  onLoad(option) {
    this.isclick = false; //这里控制订单提交点击次数
    //下面判断商品来源
    console.log(option);
    this.type = option.type;
    this.getDefaultAddress();
    if (option.type == "nocart") {
      let goods = JSON.parse(decodeURIComponent(option.goods));
      console.log("商品");
      console.log(goods);
      let cartItem = "";
      let num = goods.goods_num || "1";
      cartItem = goods.goods_id + "|" + num;
      this.cart_id.push(cartItem);
      if (!goods.spec_value) {
        goods.standard = "统一规格";
      }
      this.goodsList.push(goods);
      this.orderType = 0;
    }
    this.$apply();
  }
  methods = {
    //提交订单
    bought() {
      if (this.isclick) return;
      this.isclick = true;
      this.placeOrder();
    }
  };
  //下订单
  async placeOrder() {
    console.log(this.address);
    if (JSON.stringify(this.address) == "{}") {
      showFailToast("缺少收货地址");
      return;
    }
    let params = {};
    if (this.goodsList.length == 1) {
      console.log("直接购买");
      params = {
        pgoods_id: this.goodsList[0].pgoods_id,
        address_id: this.address.address_id,
        quantity: this.goodsList[0].goods_num || "1",
        total_price: this.totalPrice,
        pay_name: "online"
      };
    }
    //先获取积分订单id
    const resOne = await shttp
      .post("/api/v1/member/integralbuyorder")
      .send(params)
      .end();
    console.log(resOne);
    if (resOne.status == 1) {
      return wx.showToast({
        title: resOne.error,
        icon: "none",
        duration: 2000
      });
    } else {
      //再获取普通订单id
      const resTow = await shttp
        .post("/api/v1/member/order")
        .send({
          cart_id: this.cart_id, //goods_id|num
          address_id: this.address.address_id,
          pay_name: "online",
          order_from: 2,
          pay_message: [],
          ifcart: 0, //购物车填1，直接购买填0
          voucher: [],
          point_orderid: resOne.data.point_orderid
        })
        .end();
      console.log(resTow);
      if (resTow.status == 0) {
        //最后存入两个id的关系
        const endRes = await shttp
          .get("/api/v1/member/writecorrespondence")
          .query({
            order_id: resTow.data.order_id,
            point_orderid: resOne.data.point_orderid
          })
          .end();
        console.log("已存入关系");
        if (endRes.status == 0) {
          //下单结果
          this.OrderResult = resTow.data;
          console.log("下单结果");
          console.log(this.OrderResult);
          //这里最后判断是否支付===============================》
          if (this.totalPrice != 0) {
            if (resOne.status === 0) {
              wx.showToast({
                title: "支付申请中...",
                icon: "none",
                duration: 2000
              });
              let order_id = this.OrderResult.order_id;
              let orderType = this.orderType;
              wx.requestPayment({
                timeStamp: this.OrderResult.timeStamp,
                nonceStr: this.OrderResult.nonceStr,
                package: this.OrderResult.package,
                signType: "MD5",
                paySign: this.OrderResult.paySign,
                success: function(res) {
                  console.log("支付成功返回的结果");
                  console.log(res);
                  wx.reLaunch({
                    url: `./pointbought?id=${order_id}&orderType=${orderType}&pointOrder=pointOrder`
                  });
                },
                fail: function(res) {
                  wx.redirectTo({
                    url: `./pointorderdetail?orderId=${order_id}&pointOrder=pointOrder`
                  });
                  // wx.showToast({
                  //   title: "支付失败,订单取消",
                  //   icon: "none",
                  //   duration: 1000
                  // });
                  // setTimeout(function() {
                  //   wx.navigateBack();
                  // }, 1100);
                  // wx.navigateBack()
                }
              });
            }
          } else {
            // return
            let order_id = this.OrderResult.order_id;
            let orderType = this.orderType;
            wx.reLaunch({
              url: `./pointbought?id=${order_id}&orderType=${orderType}&pointOrder=pointOrder`
            });
          }
        }
      }
    }
  }
  async onShow() {
    this.isclick = false; //这里控制订单提交点击次数
    let address = wx.getStorageSync("address");
    if (address) {
      console.log("有本地地址");
      this.address = address;
      wx.removeStorageSync("address");
      this.closeAccount();
    } else {
      console.log("没有本地地址");
    }
  }
  //获取默认地址
  async getDefaultAddress() {
    const res = await shttp
      .get("/api/v1/member/address")
      .query({})
      .end();
    if (res.data.length != 0) {
      res.data.forEach(item => {
        if (item.address_is_default === "1") {
          this.address = item;
          this.closeAccount();
        }
      });
    } else {
      wx.showToast({
        title: "请填写收货地址",
        icon: "none",
        duration: 2000
      });
    }
    console.log("地址");
    console.log(this.address);
    this.$apply();
  }
  //结算接口
  async closeAccount(coupons) {
    console.log("商品是什么");
    console.log(this.goodsList);
    let params = {};
    if (this.goodsList.length == 1) {
      console.log("直接购买");
      params = {
        pgoods_id: this.goodsList[0].pgoods_id,
        quantity: this.goodsList[0].goods_num || "1"
      };
    } else {
      console.log("购物车购买");
    }
    const res = await shttp
      .get("/api/v1/member/integralbuy")
      .query(params)
      .end();
    console.log("结算");
    let result = res.data;
    if (res.data) {
      this.freight = result.freight;
      this.totalPrice = result.total_price;
    } else {
      showFailToast(res.error);
    }
    this.$apply();
  }
}
</script>