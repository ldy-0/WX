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
      <navigator class='person_info_wrap around' url='/pages/my/addressList?type=order'>
          <image src='../../images/icon_dingwei@2x.png' />
          <view class='person_info'>
              <view class='person'>
                  <view>收货人：{{address.address_realname}}</view>
                  <view>{{address.address_tel_phone}}</view>
              </view>
              <view>收货地址：{{address.area_info}}{{address.address_detail}}</view>
          </view>
          <image src='../../images/icon_zuojiantou@2x.png' />
      </navigator> 
      <image src='../../images/img_1@2x.png' class='split_bar' />
      <repeat for='{{goodsList}}' index='index'  item='item'>
          <view class='product_info around'>
              <image src="{{item.goods_image}}" />
              <view class='product'>
                  <view class='product_title'>{{item.goods_name}}</view>
                  <view class='row'>
                      <view class='product_price'>¥{{item.goods_price}}</view>
                      <!-- <view class='product_address'>福建福州</view> -->
                  </view>
                  <view class='row'>
                      <view class='product_number'>×{{item.goods_num|| '1'}}</view>
                  </view>
                  <view class='row'>
                      <view class='product_address'>租用时间：{{item.goods_start}}到{{item.goods_end}}</view>
                  </view>
              </view>
          </view>
      </repeat>
      <view class='order_info'>
          <view><text>运费：</text><text class='right'>¥{{freightList[0]|| '0'}}</text></view>
      </view>
      <view class='bottom_bar'>
          <view class='sum row'>
              <view class='sum_number'>共计<text>{{goodsNum}}</text>件商品</view>
              <view wx:if="{{listPriceSum>9999}}" class='sum_price'>合计：<text>¥{{listPriceSum}}</text></view>
              <view else class='sum_price'>合计：<text>¥{{price}}</text></view>
              <view  wx:if="{{listPriceSum>9999}}">需定金：<text>¥{{price}}</text></view>
          </view>
          <view class='btn' @tap='bought()'>提交订单</view>
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
    //订单类型
    orderType: null,
    //判断是否点击了提交
    isclick: false,
    //商品列表总价
    listPriceSum: ""
  };

  components = {};

  onLoad(option) {
    this.isclick = false; //这里控制订单提交点击次数
    //进来就获取商城支付方式（固定）
    //下面判断商品来源
    console.log("订单==》onload");
    console.log(option);
    this.type = option.type;
    this.getDefaultAddress();
    if (option.type == "nocart") {
      let goods = JSON.parse(decodeURIComponent(option.goods));
      this.goodsList.push(goods);
      console.log("直接购买商品");
      console.log(this.goodsList);
      // return
      this.ifcart = 0;
      let cartItem = "";
      cartItem = goods.SKUList[0].goods_id + "|" + (goods.goods_num || 1);
      this.cart_id.push(cartItem);
      this.goodsNum = 1;
      this.orderType = goods.is_virtual;
    } else {
      this.ifcart = 1;
      this.goodsList = JSON.parse(decodeURIComponent(option.goods));
      console.log("购物车商品");
      console.log(this.goodsList);
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
      // console.log(this.goodsNum)
      // console.log("商品列表")
      // console.log(this.goodsList)
      console.log("购物车id列表");
      console.log(this.cart_id);
    }
    console.log("商品列表");
    console.log(this.goodsList);
    this.listPriceSum = this.goodsList.reduce(function(prev, cur, index, arr) {
      console.log(prev, cur, index); //输出的是第一项的值或上一次叠加的结果，正在被处理的元素，正在被处理的元素的索引值
      return Number(prev.goods_price) + Number(cur.goods_price);
    });
    console.log(this.listPriceSum); //输入数组本身和最后的结果
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
    params = {
      cart_id: this.cart_id, //goods_id|num
      address_id: this.address.address_id,
      pay_name: "online",
      order_from: 2,
      pay_message: [],
      ifcart: this.ifcart, //购物车填1，直接购买填0,
      goods_start: this.ifcart == 0 ? this.goodsList[0].goods_start : "",
      goods_end: this.ifcart == 0 ? this.goodsList[0].goods_end : ""
    };
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
      let orderType = this.orderType;
      let successUrl = `./bought?id=${order_id}&orderType=${orderType}`;
      let failUrl = `/pages/store/orderdetail?orderId=${order_id}`;

      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: "MD5",
        paySign: res.data.paySign,
        success: function(res) {
          console.log("支付成功返回的结果");
          console.log(res);
          wx.reLaunch({
            url: successUrl
          });
        },
        fail: function(res) {
          wx.showToast({
            title: "支付失败",
            icon: "none",
            duration: 2000
          });
          wx.redirectTo({
            url: failUrl
          });
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
  async onShow() {
    this.isclick = false; //这里控制订单提交点击次数
    console.log("show");
    let address = wx.getStorageSync("address");
    console.log("本地地址");
    console.log(address);
    if (address) {
      this.address = address;
      wx.removeStorageSync("address");
      this.closeAccount();
    } else {
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
    const res = await shttp
      .post("/api/v2/member/checkout")
      .send({
        cart_id: this.cart_id, //goods_id|num
        city_id: this.address.city_id,
        ifcart: this.ifcart, //购物车填1，直接购买填0
        voucher_list: [],
        goods_start: this.ifcart == 0 ? this.goodsList[0].goods_start : "",
        goods_end: this.ifcart == 0 ? this.goodsList[0].goods_end : ""
      })
      .end();
    console.log("结算");
    console.log(res);
    if (res.data.length != 0) {
      this.freightList = Object.values(res.data.freight_list);
      // console.log( this.freightList)
      let storePrice = Object.values(res.data.store_final_order_total);
      this.price = storePrice[0];
    } else {
      wx.showToast({
        title: "商品无效",
        icon: "none",
        duration: 1000
      });
    }
    this.$apply();
  }
}
</script>