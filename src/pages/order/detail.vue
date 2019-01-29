<style>
.container {
  font: 32rpx PingFang-SC-Medium;
  min-height: 100vh;
}

.order_wrap{
  padding: 30rpx 20rpx;
}

.appoinment_wrap{
  border-radius: 10rpx;
}
.appoinment_main, .appoinment_other{
  font-size: 32rpx;
  padding: 40rpx;
}
.title{
  flex-shrink: 0;
}
.appoinment_main .value{
  font-size: 28rpx;
}
.appoinment_time{
  margin: 40rpx 0 0;
}
.appoinment_tip1, .appoinment_tip2{
  font-size: 24rpx;
}
.appoinment_tip1{
  margin: 6rpx 0 0;
  text-align: right;
}
.appoinment_tip2{
  margin: 50rpx 0 0;
  text-align: left;
}

.appoinment_other{
  position: relative;
  border-top: 2rpx solid #f1f3f5;
  font-size: 24rpx;
}
.left_circle, .right_circle{
  position: absolute;
  top: -20rpx;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
}
.left_circle{
  left: -20rpx;
}
.right_circle{
  right: -20rpx;
}

.store_wrap{
  margin: 20rpx 0 0;
  padding: 50rpx 40rpx;
  border-radius: 10rpx;
  font-size: 28rpx;
}
.store_title{
  margin-bottom: 50rpx;
  font-size: 32rpx;
}
.store_item{
  margin: 20rpx 0 0;
}
.store_address{
  flex-grow: 1;
}
.store_btn{
  flex-shrink: 0;
  width: 80rpx;
  padding-left: 30rpx;
  border-left: 2rpx solid #eee;
  font-size: 24rpx;
}
.store .dot{
  flex-shrink: 0;
  width: 20rpx;
}

.order_info{
  margin: 20rpx 0 0;
  padding: 30rpx;
  border-radius: 10rpx;
  font-size: 24rpx;
}
.order_item{
  margin: 20rpx 0 0;
}

.status_info {
  line-height: 88rpx;
  margin: 20rpx 0 0;
  padding-left: 30rpx;
  color: #202020;
  background: #fff;
  border-bottom: 1rpx solid #e5e5e5;
}

.product_info {
  height: 250rpx;
  border-top: 1rpx solid #e5e5e5;
  border-bottom: 1rpx solid #e5e5e5;
  background: #fff;
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
}
.product_info .product .product_price {
  font-size: 36rpx;
  color: #ff4444;
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

.words_info {
  line-height: 68rpx;
  padding-left: 21rpx;
  font-size: 28rpx;
  color: #000;
  background: #fff;
}

/* .order_info {
  line-height: 100rpx;
  margin: 20rpx 0 0;
  padding: 0 24rpx;
  background: #fff;
}
.order_info .order_price {
  font-size: 37rpx;
  color: #af0000;
} */

.time_info {
  height: auto;
  margin: 22rpx 0 100rpx;
  padding: 10rpx 30rpx 20rpx;
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
  bottom: 0;
  width: 100%;
  font-size: 32rpx;
  text-align: center;
}
.bottom_bar .btn {
  width: 144rpx;
  line-height: 44rpx;
  margin-right: 24rpx;
  border: 1rpx solid #282425;
  border-radius: 10rpx;
  text-align: center;
}
.refund{
  width: 188rpx;
  height: 99rpx;
  line-height: 99rpx;
}
.update{
  flex-grow: 1;
  height: 99rpx;
  line-height: 99rpx;
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

.interval{
  margin: 20rpx 0;
}

.flex {
  display: flex;
  align-items: center;
}

.arrow {
  width: 16rpx;
  height: 26rpx;
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
.s-fc-5{ color: #999; }
.s-fc-6{ color: #555; }
.s-fc-7{ color: #e93b31; }
.s-fc-8{ color: #3e434a }

.s-bg-1{ background: #fff; }
.s-bg-2{ background: #f5f5f4; }
.s-bg-3{ background: #999; }
.s-bg-4{ background: #10325f;}
.s-bg-5{ background: #fafafa; }
</style>

<template>
  <view class="container s-bg-2">

    <view class='order_wrap'>

      <view class='appoinment_wrap s-bg-1'>

        <view class='appoinment_main'>
          <view class='between s-fc-2' style='align-items: flex-start;'>
            <view class='title'>预约发型师：</view>
            <view class='value'>{{order.stylist}}</view>
          </view>
          <view class='appoinment_time between'>
            <view class='title'>预计剪发时间：</view>
            <view class='value'>{{order.time}}</view>
          </view>
          <view class='appoinment_tip1 s-fc-3'>注：请提前5分钟到达门店等候服务</view>
          <view class='appoinment_tip2 s-fc-7'>请到店时主动告知订单号，便于我们更好地为您服务。</view>
        </view>

        <view class='appoinment_other s-fc-3'>
          <view class='left_circle s-bg-2'></view>
          <view class='right_circle s-bg-2'></view>
          <view class='between' style='align-items: flex-start;'>
            <view class='title'>预约门店：</view>
            <view class='value'>{{order.store_name}}</view>
          </view>
          <view class='interval between' style='align-items: flex-start;'>
            <view class='title'>预约服务：</view>
            <view class='value'>{{order.storegc_name}}</view>
          </view>
          <view class='between' style='align-items: flex-start;'>
            <view class='title'>预约价格：</view>
            <view class='value'>合计：¥{{order.order_amount}}</view>
          </view>
        </view>

      </view>

      <view class='store_wrap s-bg-1'>
        <view class='store_title s-fc-2'>门店信息</view>
        <view class='store s-fc-8'>
          <view class='store_item flex' style='align-items: flex-start;'>
            <view class='dot'>·</view>
            <view>营业时间：{{order.store_time}}</view>
          </view>
          <view class='store_item flex' style='align-items: flex-start;'>
            <view class='dot'>·</view>
            <view class='store_address'>{{order.store_address}}</view>
            <view class='store_btn s-fc-4' @tap='navigation'>导航</view>
          </view>
        </view>
      </view>

      <view class='order_info s-fc-3 s-bg-1'>
        <view class='order_item between'>
          <view>订单编号：{{order.order_sn}}</view>
          <view class='s-fc-4' @tap='copyOrder'>复制</view>
        </view>
        <view class='order_item'>付款时间：{{order.payment_time}}</view>
        <view class='order_item'>抵扣金额：-¥{{order.voucher_price}}</view>
      </view>

    </view>

    <view style='height: 99rpx;'></view>

    <view wx:if="{{orderType!=2}}">
      <!-- <view class="person_info_wrap around" wx:if="{{order.order_reciver_info.name}}">
        <view class="person_info">
          <view class="person">
            <view>收货人：{{order.order_reciver_info.name}}</view>
            <view>{{order.order_reciver_info.phone}}</view>
          </view>
          <view>收货地址：{{order.order_reciver_info.address}}</view>
        </view>
      </view> -->
      <!-- <view class="status_info" wx:if="{{order.order_state_id==10}}">待付款</view>
      <view class="status_info" wx:if="{{order.order_state_id==20}}">待发货</view>
      <view class="status_info" wx:if="{{order.order_state_id==30}}">待收货</view>
      <view class="status_info" wx:if="{{order.order_state_id==50}}">待评价</view>
      <view wx:if="{{orderType==0}}">
        <repeat for="{{order.order_goods}}" item="item">
          <view class="product_info around">
            <image src="{{item.goods_image}}" mode="aspectFill">
            <view class="product">
              <view class="product_title">{{item.goods_name}}</view>
              <view class="row">
                <view class="product_price">¥{{item.goods_price}}</view>
              </view>

              <view class="row">
                <view class="product_standard">规格：{{item.goods_spec || "统一规格"}}</view>
                <view class="product_number">×{{item.goods_num}}</view>
              </view>
            </view>
          </view>
        </repeat>
      </view>
      <view wx:if="{{orderType==1}}">
        <view class="product_info around">
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
      </view> -->

      <!-- <view class="order_info row">
        <text>实付款:</text>
        <text class="order_price">¥{{order.order_amount}}</text>
      </view> -->

      <!-- <view
        class="time_info row"
        wx:if="{{order.shipping_code.companyName||order.shipping_code.expressNumber||order.shipping_code.linkmanName||order.shipping_code.linkmanPhone}}"
      >
        <view class="time">
          <view wx:if="{{order.shipping_code.companyName}}">快递公司：{{order.shipping_code.companyName}}</view>
          <view
            wx:if="{{order.shipping_code.expressNumber}}"
          >快递单号：{{order.shipping_code.expressNumber}}</view>
          <view wx:if="{{order.shipping_code.linkmanName}}">联系人：{{order.shipping_code.linkmanName}}</view>
          <view
            wx:if="{{order.shipping_code.linkmanPhone}}"
          >联系电话：{{order.shipping_code.linkmanPhone}}</view>
        </view>
        <view class="btn" @tap="copyexpress">复制</view>
      </view> -->

      <view class="bottom_bar flex s-bg-1">
        <!-- <navigator class='btn' url='./select'>退货/换货</navigator> -->
        <view class="refund s-fc-4" @tap="showModal('refund')">申请退款</view>
        <view class="update s-fc-1 s-bg-4" @tap='showModal'>修改时间</view>
      </view>

    </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import dayjs from "dayjs";
export default class OrderDetail extends wepy.page {
  config = {
    navigationBarTitleText: "订单详情"
  };
  data = {
    //积分订单详情
    pointOrder: {},
    id: null,
    order: null,
    //订单类型
    orderType: 0, //0实物订单 1虚拟订单 2待支付
    //地址
    address: null,
    serviceList: [],
    dateList: [
      { id: 1, value: '周一' }, 
      { id: 2, value: '周二' }, 
      { id: 3, value: '周三' },
      { id: 4, value: '周四' },
      { id: 5, value: '周五' },
      { id: 6, value: '周六' },
      { id: 7, value: '周日' },
    ],
  };

  components = {};

  methods = {
    showModal(str){
      let refundContent = '请注意，如果您选择了退款，下单时所用的抵扣券将不会返还！如有疑问，请联系客服',
          updateContent = '每个订单仅限修改一次预约时间，请您确认后修改。如果需要更换预约发型师，需要先退单然后再次下单';

      return wx.showModal({ 
        title: '提示', 
        content: str === 'refund' ? refundContent : updateContent, 
        confirmColor: '#10325f',
        success: e => e.confirm && str === 'refund' ? this.goRefund() : this.goUpdate() 
      }); 
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

    navigation(){
    let param = {
      latitude: Number(this.order.store_latitude),
      longitude: Number(this.order.store_longitude)
    };
    wx.openLocation(param);
    }
    // copyexpress() {
    //   wx.setClipboardData({
    //     data: `${
    //       this.order.shipping_code.companyName
    //         ? "快递公司：" + this.order.shipping_code.companyName
    //         : ""
    //     } ${
    //       this.order.shipping_code.expressNumber
    //         ? "快递单号：" + this.order.shipping_code.expressNumber
    //         : ""
    //     } ${
    //       this.order.shipping_code.linkmanName
    //         ? "联系人：" + this.order.shipping_code.linkmanName
    //         : ""
    //     } ${
    //       this.order.shipping_code.linkmanPhone
    //         ? "联系电话：" + this.order.shipping_code.linkmanPhone
    //         : ""
    //     }`,
    //     success: res =>
    //       wx.getClipboardData({ success: res => console.log(res) })
    //   });
    // }
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
    // return console.error(opt);
    const storegc_res = await shttp.get(`/api/v2/common/storegc`).query({}).end();

    if(storegc_res && storegc_res.data){
      this.serviceList = storegc_res.data;
    }

    if (opt.orderId) {
      this.id = opt.orderId;
      const res = await shttp.get("/api/v2/member/order/" + opt.orderId).end();

      let order = res.data[0],
          goods = order.order_goods[0];
      console.error("实物订单", order);

      order.stylist = goods.goods_name;

      order.time = `${order.appointment_date} ${order.appointment_frame}`;

      // storegc_name
      let s = this.serviceList.filter(service => service.storegc_id == goods.goods_spec)[0];
      order.storegc_name = s ? s.storegc_name : '';

      // work time
      let time = order.store_workingtime.split('|');
      let dayList = time[0].split(',').map(v => parseInt(v)),
          t = time[1].split(',').map(v => { 
        let d = new Date(v); 
        return `${(d.getHours() < 10 ? '0' : '') + d.getHours()}:${(d.getMinutes() < 10 ? '0' : '') + d.getMinutes()}`; 
      });

      order.store_time = `${t[0]}-${t[1]} ${this.dateList.filter(v => dayList.indexOf(v.id) !== -1 ).map(v => v.value).join(' ')}`;
      
      this.order = order;
      // this.order.add_time = dayjs(this.order.add_time).format(
      //   "YYYY年MM月DD日 HH:mm"
      // );
      // this.order.payment_time = dayjs(this.order.payment_time).format(
      //   "YYYY年MM月DD日 HH:mm"
      // );
    }

    this.$apply();
  }

  goRefund(){
    wx.navigateTo({ url: `/pages/order/refundReason?id=${this.id}` });
  }

  async goUpdate(i){
    let storegc_res = await shttp.get(`/api/v2/common/storegc`).query({}).end();

    let param = await shttp.get(`/api/v2/member/goodsList`).query({
        goods_id: this.order.order_goods[0].goods_id,
      }).end(),
        stylist;

      stylist = param.data[0];

      // goods_img
      try{
        stylist.goods_img = (JSON.parse(stylist.goods_image)).url;
      }catch(e){
        stylist.goods_img = stylist.goods_image;
      }

      // get storegc_name
      let storegcArr = storegc_res.data.filter(service => service.storegc_id == stylist.goods_spec)[0];
      stylist.storegc = storegcArr ? storegcArr : {};

      // add order_id
      stylist.order_id = this.id;

      stylist = encodeURIComponent(JSON.stringify(stylist));
      // return console.error( storegc_res, JSON.parse(decodeURIComponent(stylist)).order_id );

      if(this.order.appointment_state == 0){
        // console.error(stylist);
        return wx.navigateTo({ url: `/pages/select/time?stylist=${stylist}` });
      }
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

