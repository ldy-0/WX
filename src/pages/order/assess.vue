<style>
.container {
  font: 32rpx PingFang-SC-Medium;
  height: 100%;
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
  margin-right: 40rpx;
}

.score_wrap{
  padding: 0 30rpx;
  font-size: 28rpx;
}
.score{
  margin-left: 30rpx;
}
.i_assess{
  width: 42rpx;
  height: 42rpx;
  margin-right: 8rpx;
}

.comment_wrap{
  position: relative;
  height: 248rpx;
  margin: 50rpx 0 0;
  padding: 0 30rpx;
  border-bottom: 2rpx solid #e2e2e2;
}
.comment_desc{
  position: absolute;
  right: 40rpx;
  bottom: 10rpx;
}

.submit_wrap{
  margin: 160rpx 0 0;
  padding: 0 30rpx;
}
.submit_btn{
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  border-radius: 10rpx;
  font-size: 36rpx;
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
.s-fc-5{ color: #919191; }
.s-fc-6{ color: #aeaeae; }

.s-bg-1{ background: #fff; }
.s-bg-2{ background: #f4f4f4; }
.s-bg-3{ background: #999; }
.s-bg-4{ background: #10325f; }
</style>

<template>
  <view class="container s-bg-1">

    <!-- <view class='title_wrap s-bg-1 s-fc-3'>
      <view class='title s-fc-2'>{{title}}</view>
      <view class='sub_title'>{{subTitle}}</view>
    </view> -->

    <view class='service_item flex' style='align-items: flex-start;'>

      <view class=''>
        <view class='service_img_wrap'>
          <image class='service_img' src='{{order.goods_img}}' mode='aspectFill' />
        </view>
      </view>

      <view class='service_info s-fc-5'>
        <view class='service_name s-fc-4'>{{order.service_name}}</view>
        <view class='service_price flex' style='align-items: flex-start;'>
          <view class='service_stylist'><text class='s-fc-2'>发型师：</text>{{order.stylist}}</view>
          <view class=''><text class='s-fc-2'>价格：</text>{{order.order_amount}}</view>
        </view>
        <view class='service_store'><text class='s-fc-2'>预约门店：</text>{{order.store_name}}</view>
        <view class='service_address'><text class='s-fc-2'>门店地址：</text>{{order.store_address}}</view>
      </view>

    </view>

    <view class='score_wrap flex'>
      <view class='s-fc-2'>{{scoreText}}</view>

      <view class='score flex'>
        <repeat for='{{5}}' wx:key='index'>
          <image class='i_assess' src="{{index + 1 > score ? '../../images/order/assess.png' : '../../images/order/assess_sel.png'}}" mode='aspectFill' @tap='setScore({{index}})' />
        </repeat>
      </view>

    </view>

    <view class='comment_wrap'>
      <view class='comment_desc s-fc-6'>{{comment.length}}/50</view>
      <textarea class='comment' maxlength='50' placeholder="{{commentText}}" @input='getComment'></textarea>
    </view>
    
 
    <view class='submit_wrap'>
      <view class='submit_btn s-fc-1 s-bg-4' @tap='assess'>{{submitText}}</view>
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
    navigationBarTitleText: "评价"
  };
  data = {
    title: '核对订单',
    subTitle: '请认真核对订单后下单',
    scoreText: '评分',
    commentText: '请输入评论...',
    submitText: '确认',
    service: {},
    score: 0,
    comment: '',
    id: null,
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

  computed = {
    sumText(){ return this.service && `合计：¥${this.service.price}`; },
  }

  components = {};

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

      order.stylist = goods.goods_name;

      order.time = `${order.appointment_date} ${order.appointment_frame}`;

      try{
        order.goods_img = (JSON.parse(goods.goods_image)).url;
      }catch(e){
        order.goods_img = order.goods_image;
      }

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
      // console.error("order:", order);
      this.$apply();
    }
  }
  
  methods = {
    setScore(index){
      this.score = index + 1;
    },
    getComment(e){
      this.comment = e.detail.value;
    },
    goTime(){
      wx.navigateTo({ url: `/pages/select/time?a` });
    },
  };

  onShow() {}

  async assess(){
    let param = {
      goods_id: this.order.order_goods[0].goods_id,
      order_id: this.id,
      order_no: this.order.order_sn,
      content: this.comment,
      score: this.score,
    };
    // return console.error(this.score, this.comment, param);
    
    let res = await shttp.post(`/api/v2/member/goodsevaluate`).send(param).end();

    console.error(res);
    if(res.error == ''){
      wx.showModal({ content: '评价成功', showCancel: false });
    }else{
      wx.showModal({ content: res.error, showCancel: false });
    }
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

  async discountSure() {
    setTimeout(() => {
      this.closeAccount();
    }, 500);
    this.discountShow = false;
  }
}
</script>