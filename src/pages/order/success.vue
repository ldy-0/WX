<style scoped>
.container {
  padding: 30rpx;
  font: 32rpx PingFang-SC-Medium;
  min-height: 100vh;
}

.refund_wrap{
  padding: 40rpx 20rpx;
  border-radius: 10rpx;
}

/* .title_wrap{
  padding: 0 15rpx 40rpx 15rpx;
  border-bottom: 2rpx solid #eee;
  font-size: 40rpx;
}
.sub_title{
  margin: 10rpx 0 0;
  font-size: 24rpx;
} */

.info_wrap{ 
  padding: 30rpx 0 88rpx 0;
  display: flex;
  justify-content: center;  
  align-items: center;
}
.info{
  width: 354rpx;
  height: 222rpx;
  text-align: center;
}
.info_img{
  width: 200rpx;
  height: 200rpx;
  /* background: gray; */
}
.info_title{
  margin: 20rpx 0 0;
  font-size: 32rpx;
}

.order_wrap{
  position: relative;
  /* border-top: 2rpx solid #f5f5f5; */
}
/* .left_circle, .right_circle{
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
} */

.store_wrap{
  margin-left: 10rpx;
  padding-bottom: 48rpx;
  font-size: 32rpx;
}
.store{
  width: 400rpx;
}

.service{
  padding: 40rpx 0 40rpx 10rpx;
  border-top: 2rpx solid #f3f3f3;
}
.service_img{
  flex-shrink: 0;
  width: 200rpx;
  height: 200rpx;
  border-radius: 10rpx;
  background: gray;
}
.service_info{
  flex-grow: 1;
  margin-left: 20rpx;
}
.service_name{
  font-size: 28rpx;
}
.service_time{
  margin: 20rpx 0 0;
  font-size: 24rpx;
}

.price{
  padding: 50rpx 0;
  border-top: 2rpx solid #f3f3f3;
  font-size: 32rpx;
  text-align: right;
}

.order_info{
  font-size: 32rpx;
}
.order_main{
  border-bottom: 2rpx solid #e6e6e6;
  margin-bottom: 30rpx;
}
.order_item{
  margin-bottom: 30rpx;
}
.order_title{
  width: 128rpx;
}

.btn_wrap{
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  margin: 50rpx 0 0;
  border-radius: 10rpx;
  font-size: 36rpx;
  text-align: center;
}

.tip_wrap{
  width: 372rpx;
  margin: 70rpx auto 0;
  font-size: 28rpx;
}
.i_share{
  width: 40rpx;
  height: 40rpx;
  margin-right: 8rpx;
  /* background: gray; */
}

.flex {
  display: flex;
  align-items: center;
}

.arrow {
  width: 16rpx;
  height: 26rpx;
  background: gray;
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
  <view class="container s-fc-2 s-bg-1">

    <!-- <view class='info_wrap s-bg-1'> -->

      <view class='info_wrap'>
        <view class='info'>
          <image class='info_img' src='{{successURL}}' mode='aspectFill' />
          <view class='info_title'>{{infoTitle}}</view>
        </view>
      </view>

      <view class='order_wrap'>
        <!-- <view class='left_circle s-bg-2'></view> -->
        <!-- <view class='right_circle s-bg-2'></view> -->

        <!-- <view class='store_wrap between s-fc-2' @tap='goStore'>
          <view class='store'>国际企业峰sdkfsjof手动阀撒旦顶顶顶顶顶顶顶顶顶顶顶顶顶顶撒旦佛山的发票汇店</view>
          <image class='arrow' src='' mode='aspectFill' />
        </view>

        <view class='service flex'>
          <image class='service_img' src='' mode='aspectFill' />
          <view class='service_info'>
            <view class='service_name s-fc-2'>预约服务：{{infoTitle}}</view>
            <view class='service_time s-fc-3'>预约剪发时间：{{infoDesc}}</view>
          </view>
        </view> -->

        <view class='order_info'>
          <view class='order_main'>
            <view class='order_item'>订单编号：{{order.order_sn}}</view>
            <view class='order_item'>订单金额：¥{{order.order_amount}}</view>
            <view class='order_item'>预约门店：{{order.store_name}}</view>
            <view class='order_item'>付款时间：{{order.payment_time}}</view>
          </view>
          <view class='order_item flex'>
            <view class='order_title between'>
              <view wx:for='{{orderTitle}}' wx:key='index'>{{item}}</view>
            </view>
            <view class=''>：-¥{{order.voucher_price}}</view>
          </view>
          <view class='order_item'>实付金额：¥{{order.order_amount}}</view>
        </view> 

        <view class='btn_wrap s-fc-1 s-bg-4' @tap='goDetail'>查看订单</view>

        <view class='tip_wrap flex s-fc-3'>
          <image class='i_share' src='{{shareURL}}' mode='aspectFill' />
          <view class=''>{{tipText}}</view>
        </view>
      </view>

    <!-- </view> -->
    
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class Refund extends wepy.page {
  config = {
    navigationBarTitleText: "购买完成"
  };
  data = {
    infoTitle: '订单支付成功！',
    tipText: '分享新用户,各自得抵扣卷',
    orderTitle: '抵扣券',
    successURL: '../../images/order/success.png',
    shareURL: '../../images/order/share.png',
    selIndex: null,
    id: null,
    order: {},
  };

  computed = {};

  components = {};

  methods = {
    goDetail(){
      let url = `/pages/order/detail?orderId=${this.id}`;
      wx.navigateTo({ url });
    },
    
  };


  onLoad(option) {
    if(option.order_id) this.id = option.order_id;
    console.error(option);

    this.getOrder();
    // this.orderDetail = JSON.parse(decodeURIComponent(option.goods));

    console.log(this.orderDetail);
  }

  async getOrder(){
    let res = await shttp.get("/api/v2/member/order/" + this.id).end();

    let order = res.data[0],
        goods = order.order_goods[0];
      console.error("实物订单", order);

      order.stylist = goods.goods_name;

      order.time = `${order.appointment_date} ${order.appointment_frame}`;

      // storegc_name 
      // let s = this.serviceList.filter(service => service.storegc_id == goods.goods_spec)[0];
      // order.storegc_name = s ? s.storegc_name : '';

      // work time
      let time = order.store_workingtime.split('|');
      let dayList = time[0].split(',').map(v => parseInt(v)),
          t = time[1].split(',').map(v => { 
        let d = new Date(v); 
        return `${(d.getHours() < 10 ? '0' : '') + d.getHours()}:${(d.getMinutes() < 10 ? '0' : '') + d.getMinutes()}`; 
      });

      // order.store_time = `${t[0]}-${t[1]} ${this.dateList.filter(v => dayList.indexOf(v.id) !== -1 ).map(v => v.value).join(' ')}`;
      
      this.order = order;
      this.$apply();
  }
}
</script>

