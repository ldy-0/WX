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
  min-height: 160rpx;
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
  border-radius: 10rpx;
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
  color: #f17f30;
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
.order_info .right {
  float: right;
}
.order_info .right-icon {
  width: 10rpx;
  height: 18rpx;
}
.order_info .text {
  display: inline-block;
  color: #636363;
}
.order_info .discount-num {
  width: 110rpx;
  height: 32rpx;
  background-image: linear-gradient(-90deg, #fca768 0%, #fe7f82 100%),
    linear-gradient(#343434, #343434);
  background-blend-mode: normal, normal;
  border-radius: 5rpx;
  text-align: center;
  line-height: 32rpx;
  color: #fff;
  font-size: 20rpx;
  margin-right: 20rpx;
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
  background: #f17f30;
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
  background: #f17f30;
}

.discount-infoBox {
  width: 504rpx;
  height: 200rpx;
  background-color: #fff3e7;
  border-radius: 6rpx;
  color: #f17f30;
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
  background: #f17f30;
}
.coupon-box {
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #666666;
  font-size: 28rpx;
  border-top: 1rpx solid #f4f4f4;
}
.coupon-boxR {
  display: flex;
  align-items: center;
}
.msgtext {
  width: 80%;
  height: 40rpx;
  font-size: 32rpx;
}

.coupon-boxH text {
  padding-top: 20rpx;
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
        <image src="{{item.goods_image}}" mode="aspectFill">
        <view class="product">
          <view class="product_title">{{item.goods_name}}</view>
          <view class="row">
            <view class="product_price">¥{{item.goods_price}}</view>
            <!-- <view class='product_address'>福建福州</view> -->
          </view>
          <view class="row">
            <view class="product_number">×{{item.goods_num|| '1'}}</view>
          </view>
        </view>
      </view>
    </repeat>
    <view class="order_info">
      <view class="coupon-box">
        <text>运费：</text>
        <text>¥{{freightList[0]|| '0'}}</text>
      </view>
      <view class="coupon-box">
        <text>备注：</text>
        <textarea
          class="msgtext"
          bindinput="textVal"
          maxlength="140"
          placeholder="文字内容"
          placeholder-style="font-size: 32rpx;"
        />
      </view>
      <view
        @tap="discountBtn"
        class="coupon-box"
        data-index="{{index}}"
        wx:if="{{couponList.length>0&&is_pintuan==0}}"
      >
        <view>优惠券：</view>
        <view class="coupon-boxR">
          <view wx:if="{{!coupon}}" class="discount-num">{{couponList.length}}张优惠券</view>
          <text wx:else>省：{{coupon.voucher_price}}元</text>
          <image class="right-icon" src="../../images/icon_zuojiantou@2x.png">
        </view>
      </view>
    </view>
    <view class="discount-bg" wx:if="{{discountShow}}">
      <view class="discount-box">
        <view class="discount-title">可用优惠券</view>
        <image class="delete-btn" src="../../images/icon_cha@2x.png" @tap="deleteBtn">
        <scroll-view scroll-y style="height:{{scrollHeight}}rpx">
          <repeat for="{{couponList}}" index="index" item="coupon">
            <view class="discount-info">
              <view
                class="big_circle"
                @tap="checkShop"
                data-coupon="{{coupon}}"
                data-index="{{index}}"
              >
                <view class="{{itemIndex==index ? 'fill_circle' : ''}}"></view>
              </view>
              <view class="discount-infoBox">
                <view class="discount-infoPrice">¥
                  <text>{{coupon.voucher_price}}</text>
                </view>
                <view style="text-align: center;">有效期至：
                  <text>{{coupon.voucher_enddate}}</text>
                </view>
                <view style="text-align: center;">无门槛使用</view>
              </view>
            </view>
          </repeat>
        </scroll-view>
        <view class="discount-btn" @tap="discountSure">确定</view>
      </view>
    </view>
    <view class="bottom_bar">
      <view class="sum row">
        <view class="sum_number">共计
          <text>{{goodsNum}}</text>件商品
        </view>
        <view class="sum_price">合计：
          <text>¥{{price}}</text>
        </view>
      </view>
      <view class="btn" @tap="bought()">提交订单</view>
    </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import getTimes from "../../utils/formatedate.js";
import calc from "calculatorjs";
import {
  showSuccessToast,
  showFailToast,
  exploitToast
} from "../../utils/tools";
export default class FirmOrder extends wepy.page {
  config = {
    navigationBarTitleText: "确认订单"
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
    price: 0,
    //购物车下单商品列表
    cart_id: [],
    //购物车填1，直接购买填0
    ifcart: "",
    //运费列表
    freightList: [],
    //判断是否点击了提交
    isclick: false,
    discountShow: false,
    couponList: [],
    itemIndex: [],
    coupon: null,
    checkVoucher: [],
    voucher: [],
    scrollHeight: 250,
    is_pintuan: 0,
    grouponid: null, //活动组id
    textMsg: ""
  };

  components = {};

  onLoad(option) {
    this.isclick = false; //这里控制订单提交点击次数
    //进来就获取商城支付方式（固定）
    //下面判断商品来源
    this.type = option.type;
    this.getDefaultAddress();
    if (option.type == "nocart") {
      let goods = JSON.parse(decodeURIComponent(option.goods));
      this.goodsList.push(goods);
      this.ifcart = 0;
      let cartItem = "";
      cartItem = goods.goods_id + "|" + (goods.goods_num || 1);
      this.cart_id.push(cartItem);
      this.goodsNum = 1;
      if (option.groupontype == "group") {
        this.is_pintuan = 1;
      }
      if (option.groupontype == "grouponing") {
        this.is_pintuan = 1;
        this.grouponid = option.grouponid;
      }
    } else {
      this.ifcart = 1;
      this.goodsList = JSON.parse(decodeURIComponent(option.goods));
      let cartItem = "";
      for (let i = 0; i < this.goodsList.length; i++) {
        cartItem =
          this.goodsList[i].cart_id + "|" + this.goodsList[i].goods_num;
        this.cart_id.push(cartItem);
      }
      let numArr = [];
      for (let i = 0; i < this.goodsList.length; i++) {
        numArr.push(this.goodsList[i].goods_num);
      }
      //console.log("数量")
      if (numArr.length == 1) {
        this.goodsNum = numArr[0];
      } else {
        this.goodsNum = calc.add(...numArr);
      }
    }
    this.$apply();
  }
  methods = {
    textVal(e) {
      this.textMsg = e.detail.value;
    },
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
    params = {
      cart_id: this.cart_id, //goods_id|num
      address_id: this.address.address_id,
      pay_name: "online",
      order_from: 2,
      pay_message: { 1: this.textMsg },
      ifcart: this.ifcart, //购物车填1，直接购买填0,
      voucher: this.voucher,
      is_pintuan: this.is_pintuan
    };
    if (this.grouponid) {
      params.group_id = this.grouponid;
    }
    const res = await shttp
      .post("/api/v2/member/order")
      .send(params)
      .end();
    //  console.log(res);
    if (res.status === 0) {
      wx.showToast({
        title: "支付申请中...",
        icon: "none",
        duration: 2000
      });
      let order_id = res.data.order_id;
      let pintuangroup_id = res.data.pintuan_id;
      let failUrl = `/pages/store/orderdetail?orderId=${order_id}`;
      let that = this;
      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: "MD5",
        paySign: res.data.paySign,
        success: function(res) {
          console.log("支付成功返回的结果");
          console.log(res);
          if (that.is_pintuan == 1) {
            wx.reLaunch({
              url: `./bought?id=${order_id}&orderType=group&ptId=${pintuangroup_id}`
            });
          } else {
            wx.reLaunch({
              url: `./bought?id=${order_id}&orderType=normal`
            });
          }
        },
        fail: function(res) {
          wx.showToast({
            title: "支付失败",
            icon: "none",
            duration: 2000
          });
          that.isclick = false;
          if (that.is_pintuan == 1) {
            console.log(res);
          } else {
            wx.redirectTo({
              url: failUrl
            });
          }
        }
      });
    } else {
      wx.showToast({
        title: res.error,
        icon: "none",
        duration: 2000
      });
    }
  }

  onShow() {
    this.isclick = false; //这里控制订单提交点击次数
    // let address = wx.getStorageSync("address");
    // if (address) {
    //   this.address = address;
    //   wx.removeStorageSync("address");
    //   this.closeAccount();
    // } else {
    //   wx.showToast({
    //     title: "请添加收货地址",
    //     icon: "none",
    //     duration: 2000
    //   });
    // }
    this.getDefaultAddress();
    this.getCouponList();
  }
  //获取默认地址
  async getDefaultAddress() {
    const res = await shttp
      .get("/api/v2/member/address")
      .query({})
      .end();

    if (res.data.length != 0) {
      res.data.forEach(item => {
        if (item.address_is_default == "1") {
          console.log("进来了吗");
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
  async closeAccount() {
    let sends;
    if (this.grouponid) {
      sends = {
        cart_id: this.cart_id, //goods_id|num
        city_id: this.address.city_id,
        ifcart: this.ifcart, //购物车填1，直接购买填0
        is_pintuan: this.is_pintuan,
        voucher_list: this.checkVoucher,
        pintuangroup_id: this.grouponid
      };
    } else {
      sends = {
        cart_id: this.cart_id, //goods_id|num
        city_id: this.address.city_id,
        ifcart: this.ifcart, //购物车填1，直接购买填0
        is_pintuan: this.is_pintuan,
        voucher_list: this.checkVoucher
      };
    }
    const res = await shttp
      .post("/api/v2/member/checkout")
      .send(sends)
      .end();
    console.log("结算");
    console.log(res);
    if (res.data.length != 0) {
      this.freightList = Object.values(res.data.freight_list);
      // console.log( this.freightList)
      let storePrice = Object.values(res.data.store_final_order_total);
      this.price = Math.floor(storePrice[0] * 100) / 100;
    } else {
      wx.showToast({
        title: "商品无效",
        icon: "none",
        duration: 1000
      });
    }
    this.$apply();
  }
  async getCouponList() {
    const res = await shttp
      .get(`/api/v2/member/coupon`)
      .query({
        voucher_state: 1
      })
      .end();
    if (res.status === 0) {
      res.data.forEach((element, idx) => {
        element.voucher_enddate = getTimes.formatTime(
          element.voucher_enddate * 1000,
          "Y-M-D"
        );
      });
    }

    this.couponList = res.data;
    let listLength = this.couponList.length;
    switch (listLength) {
      case 1:
        this.scrollHeight = 250;
        break;
      case 2:
        this.scrollHeight = 500;
        break;
      case 3:
        this.scrollHeight = 750;
        break;
      default:
        break;
    }
    this.$apply();
  }
  async discountBtn(e) {
    this.itemIndex = null;
    this.discountShow = true;
    this.$apply();
  }

  deleteBtn() {
    this.itemIndex = null;
    this.discountShow = false;
    this.$apply();
  }
  checkShop(e) {
    this.itemIndex = e.currentTarget.dataset.index;
    this.coupon = e.currentTarget.dataset.coupon;
    this.checkVoucher[0] =
      this.coupon.voucher_store_id + "|" + this.coupon.vouchertemplate_id;
    this.voucher[0] =
      this.coupon.voucher_store_id +
      ":" +
      this.coupon.vouchertemplate_id +
      "|" +
      this.coupon.voucher_id +
      "|" +
      this.coupon.voucher_price;
    this.$apply();
  }
  async discountSure() {
    setTimeout(() => {
      this.closeAccount();
    }, 500);
    this.discountShow = false;
  }
}
</script>