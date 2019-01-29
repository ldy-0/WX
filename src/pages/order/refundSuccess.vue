<style scoped>
.container {
  padding: 30rpx 20rpx;
  font: 32rpx PingFang-SC-Medium;
  min-height: 100vh;
}

.refund_wrap{
  padding: 40rpx 20rpx;
  border-radius: 10rpx;
}

.title_wrap{
  padding: 0 15rpx 40rpx 15rpx;
  border-bottom: 2rpx solid #eee;
  font-size: 40rpx;
}
.sub_title{
  margin: 10rpx 0 0;
  font-size: 24rpx;
}

.info_wrap{ 
  padding: 76rpx 0 50rpx 0;
  display: flex;
  justify-content: center;  
  align-items: center;
  border-radius: 10rpx;
}
.info{
  width: 354rpx;
  height: 222rpx;
  text-align: center;
}
.info_img{
  width: 102rpx;
  height: 102rpx;
  /* background: gray; */
}
.info_title{
  margin: 40rpx 0 0;
  font-size: 32rpx;
}
.info_desc{
  margin: 10rpx 0 0;
  font-size: 24rpx;
}

.order_wrap{
  position: relative;
  padding: 60rpx 20rpx 0 20rpx;
  border-top: 2rpx solid #f5f5f5;
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
  /* background: gray; */
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
  padding: 40rpx 0 40rpx;
  border-top: 2rpx solid #f3f3f3;
  border-radius: 10rpx;
  font-size: 24rpx;
}
.order_item{
  margin: 20rpx 0 0;
}

.bottom_bar {
  position: absolute;
  bottom: 0rpx;
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  color: #fff;
  background: #ff4444;
  text-align: center;
}

.flex {
  display: flex;
  align-items: center;
}

.arrow {
  width: 16rpx;
  height: 26rpx;
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

    <!-- <view class='refund_wrap s-bg-1'> -->

      <!-- <view class='title_wrap'>
        <view class='s-fc-2'>{{titleText}}</view>
        <view class='sub_title s-fc-3'>{{subtitleText}}</view>
      </view> -->

      <view class='info_wrap s-bg-1'>
        <view class='info'>
          <image class='info_img' src='{{successURL}}' mode='aspectFill' />
          <view class='info_title s-fc-2'>{{infoTitle}}</view>
          <view class='info_desc s-fc-3'>{{infoDesc}}</view>
        </view>
      </view>

      <view class='order_wrap s-fc-3 s-bg-1'>
        <view class='left_circle s-bg-2'></view>
        <view class='right_circle s-bg-2'></view>

        <view class='store_wrap between s-fc-2' @tap='goStore'>
          <view class='store'>{{order.store_name}}</view>
          <image class='arrow' src='{{rightArrowURL}}' mode='aspectFill' />
        </view>

        <view class='service flex'>
          <image class='service_img' src='{{order.goods_img}}' mode='aspectFill' />
          <view class='service_info'>
            <view class='service_name s-fc-2'>预约服务：{{order.storegc_name}}</view>
            <view class='service_time s-fc-3'>预约剪发时间：{{order.time}}</view>
          </view>
        </view>

        <view class='price s-fc-3'>
          <view class=''>合计：¥{{order.order_amount}}</view>
        </view>

        <view class='order_info s-fc-3 s-bg-1'>
          <view class='order_item'>订单编号：{{order.order_sn}}</view>
          <view class='order_item'>付款时间：{{order.payment_time}}</view>
          <view class='order_item'>抵扣金额：-¥{{order.voucher_price}}</view>
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
    navigationBarTitleText: "退款成功"
  };
  data = {
    successURL: '../../images/order/refundSuccess.png',
    rightArrowURL: '../../images/order/right_arrow.png',
    infoTitle: '退款成功',
    infoDesc: '退款将于3日内到达您的支付账户',
    selIndex: null,
    order: null,
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

  computed = {};

  components = {};

  methods = {
    goStore(){
      let url = `/pages/store/store?id=${this.order.store_id}`;
      wx.reLaunch({ url });
    },
    iptVal(e) {
      this.refundMemo = e.detail.value;
    },
    //原因选择
    bindPickerChange: function(e) {
      this.refundReason = this.array[e.detail.value];
      this.setData({
        index: e.detail.value
      });
    },
    showModal() {
      let tip = {
            title: '当前服务时间不合适',
            content: '您可直接更换最适合您的时间',
            cancelText: '继续退款',
            confirmText: '重新预约',
            fail: e => console.error(e),
            success: e => this.goRefund(e)
          };

      if (this.selIndex == null) {
        return wx.showToast({ title: "请选择退款原因", icon: "none", duration: 2000});
      }

      wx.showModal(tip);
    }
  };

  goRefund(e){
    let config = {
          title: '确认退款',
          content: '您确认要立即退款吗？交易时间超过一年的订单无法提交退款。退款有一定延时，零钱支付退款20分钟内到账，银行卡支付退款3个工作日内到账',
          fail: e => console.error(e),
          success: e => e.confirm && this.refund()
        };

    if(e.confirm) return this.goUpdate();

    
    wx.showModal(config);

  }

  goUpdate(){
    console.error('udpate');
  }

  refund(){
    console.error('refund');
  }

  //开始申请退款

  async refuns() {
    const res = await shttp
      .post("/api/v2/member/refundreturn")
      .send({
        order_id: this.orderDetail.order_id,
        refund_type: 1,
        reason_info: this.refundReason,
        buyer_message: this.refundMemo
      })
      .end();
    console.log(res);
    if (res.status == 0) {
      wx.showToast({
        title: "操作成功",
        icon: "none",
        duration: 2000
      });
      wx.navigateBack();
    } else if (res.status == 1) {
      return wx.showToast({
        title: res.error,
        icon: "none",
        duration: 2000
      });
    } else {
      return wx.showToast({
        title: "操作失败",
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

    if (opt.id) {
      this.id = opt.id;
      const res = await shttp.get("/api/v2/member/order/" + opt.id).end();

      let order = res.data[0],
          goods = order.order_goods[0];
      // console.error("实物订单", order);
      try{
        order.goods_img = (JSON.parse(goods.goods_image)).url;
      }catch(e){
        order.goods_img = order.goods_image;
      }

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
    }

    this.$apply();
  }
  
}
</script>

