<style>
.container {
  font: 32rpx PingFang-SC-Medium;
  background: #f4f4f4;
  height: 100%;
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

.title_wrap{
  padding: 30rpx 20rpx;
  font-size: 24rpx;
}
.title{
  font-size: 40rpx;
}
.sub_title{
  margin: 10rpx 0 0;
}

.service_item{
  padding: 40rpx;
  border-top: 2rpx solid #eee;
}
.service_img_wrap{
  position: relative;
}
.service_img{
  width: 204rpx;
  height: 204rpx;
  margin-right: 10rpx;
  border-radius: 6rpx;
  /* background: gray; */
}
.service_info{
  flex-grow: 1;
  font-size: 24rpx;
}
.service_name{
  font-size: 28rpx;
}
.service_price, .service_store, .service_address{
  margin: 10rpx 0 0;
}
.service_stylist{
  width: 240rpx;
  margin-right: 30rpx;
}

.time_row{
  margin: 20rpx 0 0;
  padding: 40rpx;
  font-size: 28rpx;
}

.bottom_bar{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  font-size: 32rpx;
}
.bottom_desc{
  flex-grow: 1;
  padding-left: 40rpx;
  line-height: 98rpx;
}
.submit_btn{
  width: 320rpx;
  height: 98rpx;
  line-height: 98rpx;
  text-align: center;
}


.flex {
  display: flex;
  align-items: center;
}

.arrow {
  width: 16rpx;
  height: 26rpx;
  margin-left: 40rpx;
  /* background: gray; */
}


.between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.s-fc-1{ color: #fff; }
.s-fc-2{ color: #222; }
.s-fc-3{ color: #8e939a; }
.s-fc-4{ color: #10325f; }
.s-fc-5{ color: #919191; }

.s-bg-1{ background: #fff; }
.s-bg-2{ background: #f4f4f4; }
.s-bg-3{ background: #999; }
.s-bg-4{ background: #10325f; }
</style>

<template>
  <view class="container s-fc-">

    <view class='title_wrap s-bg-1 s-fc-3'>
      <view class='title s-fc-2'>{{title}}</view>
      <view class='sub_title'>{{subTitle}}</view>
    </view>

    <view class='service_item flex s-bg-1' style='align-items: flex-start;'>

      <view class=''>
        <view class='service_img_wrap'>
          <image class='service_img' src='{{stylist.goods_img}}' mode='aspectFill' />
        </view>
      </view>

      <view class='service_info s-fc-5'>
        <view class='service_name s-fc-4'>{{stylist.storegc.storegc_name}}</view>
        <view class='service_price flex' style='align-items: flex-start;'>
          <view class='service_stylist'><text class='s-fc-2'>发型师：</text>{{stylist.goods_name}}</view>
          <view class=''><text class='s-fc-2'>价格：</text>{{stylist.goods_price}}</view>
        </view>
        <view class='service_store'><text class='s-fc-2'>预约门店：</text>{{stylist.store_name}}</view>
        <view class='service_address'><text class='s-fc-2'>门店地址：</text>{{stylist.address || stylist.store_address}}</view>
      </view>

    </view>

    <view class='time_row between s-bg-1' @tap='goTime'>
      <view class='s-fc-5'>{{timeText}}</view>
      <view class='flex'>
        <view class='s-fc-5'>{{appoinmentTime}}</view>
        <image class='arrow' src='{{rightArrowURL}}' mode='aspectFill' />
      </view>
    </view>
    
 
      <!-- <view
        @tap="discountBtn"
        class="time_row between s-bg-1"
        data-index="{{index}}"
        wx:if="{{couponList.length>0}}"
      >
        <view class='s-fc-5'>抵扣券：</view>
        <view class="coupon-boxR">
          <view wx:if="{{!coupon}}" class="discount-num">{{couponList.length}}张抵扣券</view>
          <text wx:else>省：{{coupon.voucher_price}}元</text>
          <image class="arrow" src="../../images/icon_zuojiantou@2x.png" mode='aspectFill' />
        </view>
      </view> -->
    
    <!-- <view class="discount-bg" wx:if="{{discountShow}}">
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
    </view> -->


    <!-- footer -->
    <view class='bottom_bar'>
      <view class='bottom_desc s-fc-4 s-bg-1'>{{sumText}}</view>
      <view class='submit_btn s-fc-1 s-bg-4' @tap='bought'>{{submitText}}</view>
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
    navigationBarTitleText: "核对订单"
  };
  data = {
    title: '核对订单',
    subTitle: '请认真核对订单后下单',
    timeText: '预计剪发时间',
    submitText: '立即支付',
    rightArrowURL: '../../images/select/right_arrow.png',
    stylist: {},
    time: null,
    orderId: null, // change appoinment time
    order_id: null, // pay success
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
    //判断是否点击了提交
    isclick: false,
    discountShow: false,
    couponList: [],
    itemIndex: [],
    coupon: null,
    checkVoucher: [],
    voucher: [],
    scrollHeight: 250,
  };

  computed = {
    appoinmentTime(){ 
      let time = this.time;
      return time ? `${time.dateSelect.fullDate} ${time.time.time}` : ''; 
    },
    sumText(){ return this.stylist && `合计：¥${this.stylist.goods_price}`; },
  }

  components = {};

  onLoad(options) {
    if(options.stylist) this.stylist = JSON.parse(decodeURIComponent(options.stylist));
    if(this.stylist.order_id) this.orderId = this.stylist.order_id;

    if(options.time) this.time = JSON.parse(options.time);
    console.error(this.stylist, this.time, 'order_id', this.orderId);

    this.ifcart = 0;
    this.goodsNum = 1;
  }
  methods = {
    goTime(){
      let stylist = encodeURIComponent(JSON.stringify(this.stylist));

      wx.navigateTo({ url: `/pages/select/time?stylist=${stylist}&referer=submit&time=${JSON.stringify(this.time)}` });
    },
    //提交订单
    bought() {
      if(this.isclick) return ;
      this.isclick = true;
      this.orderId ? this.changeOrder() : this.submitOrder();
    }
  };
  async changeOrder(){

    let param = {
      state_type: 'change_time',
      appointment_date: this.time.dateSelect.fullDate,
      appointment_frame: this.time.time.time, 
    }

    // return console.error(this.orderId, param);
    let res = await shttp.put(`/api/v2/member/orderstate/${this.orderId}`).send(param).end();

    if(res.error === ''){
      this.goSuccess();
    }else{
      wx.showModal({ content: res.error, showCancel: false });
    }
    // console.error(res);
  };
  //下订单
  async submitOrder() {
    let params = {};
    // return wx.redirectTo({ url: `/pages/order/success?id=${123}` });
    
    params = {
      cart_id: [`${this.stylist.goods_id}|1`],//this.cart_id, //goods_id|num
      // address_id: this.address.address_id,
      pay_name: "online",
      order_from: 2,
      // pay_message: { 1: this.textMsg },
      ifcart: 0,
      voucher: this.voucher,
      appointment_date: this.time.dateSelect.fullDate,
      appointment_frame: this.time.time.time,
      is_pintuan: 0, //this.is_pintuan
    };

    
    const res = await shttp.post("/api/v2/member/order").send(params).end();
    // return console.log(res);
    if (res.status === 0) {
      wx.showToast({
        title: "支付申请中...",
        icon: "none",
        duration: 2000
      });
      let order_id = res.data.order_id;
      let pintuangroup_id = res.data.pintuan_id;
      let failUrl = `/pages/order/detail?orderId=${order_id}`;
      let that = this;

      this.order_id = order_id;

      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: "MD5",
        paySign: res.data.paySign,
        success: function(res) {
          console.log("支付成功返回的结果");
          console.log(res);

          // if (that.is_pintuan == 1) {
          //   wx.reLaunch({
          //     url: `./bought?id=${order_id}&orderType=group&ptId=${pintuangroup_id}`
          //   });
          // } else {
          //   wx.reLaunch({
          //     url: `./bought?id=${order_id}&orderType=normal`
          //   });
          // }
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
    wx.showLoading({ content: 'Loading...' });
    // pay success
    if(this.order_id) return this.goSuccess();

    let time = wx.getStorageSync('time');

    if(time){
      this.time = time;
      wx.removeStorageSync('time');
    }

    this.isclick = false;

    this.getCouponList();
  }

  async goSuccess(id){
    wx.reLaunch({ url: `/pages/order/success?order_id=${this.order_id || this.orderId}` });
    this.order_id = this.orderId = null;
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
    console.log("结算", res);

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
    const res = await shttp.get(`/api/v2/member/coupon`).query({
        voucher_state: 1
      }).end();
    if (res.status === 0) {
      res.data.forEach((element, idx) => {
        element.voucher_enddate = getTimes.formatTime(
          element.voucher_enddate * 1000,
          "Y-M-D"
        );
      });
    }

    console.error(res);
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
    wx.hideLoading();
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
    this.checkVoucher = { [this.coupon.voucher_store_id]: this.coupon.voucher_code};
    this.voucher = { [this.coupon.voucher_store_id]: this.coupon.voucher_code};
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