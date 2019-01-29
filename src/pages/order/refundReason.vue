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

.reason_wrap{
  padding: 0 15rpx; 
  font-size: 28rpx;
}
.reason{
  margin: 60rpx 0 0;
}

.circle_wrap{
  width: 40rpx;
  height: 40rpx;
}
.circle{
  width: 100%;
  height: 100%;
  border: 2rpx solid #454a51;
  border-radius: 50%;
}

.submit_btn{
  width: 600rpx;
  height: 90rpx;
  line-height: 90rpx;
  margin: 70rpx auto 60rpx;
  border: 2rpx solid #10325f;
  border-radius: 10rpx;
  text-align: center;
}

.other{
  position: relative;
  padding: 50rpx 0 0;
  border-top: 2rpx solid #f5f5f5;
  font-size: 24rpx;
  font-weight: bold;
}
.left_circle, .right_circle{
  position: absolute;
  top: -20rpx;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
}
.left_circle{
  left: -40rpx;
}
.right_circle{
  right: -40rpx;
}

.bottom_bar {
  position: absolute;
  bottom: 0rpx;
  width: 100%;
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

    <view class='refund_wrap s-bg-1'>

      <view class='title_wrap'>
        <view class='s-fc-2'>{{titleText}}</view>
        <view class='sub_title s-fc-3'>{{subtitleText}}</view>
      </view>

      <view class='reason_wrap s-fc-2'>
        <repeat for='{{reasonList}}' wx:key='index'>
          <view class='reason between'>
            <view class='reason_name'>{{item}}</view>
            <view class='circle_wrap'>
              <icon type='success' size='20' color='#10325f' wx:if='{{index === selIndex}}'></icon>
              <view class='circle' @tap='changeReason({{index}})' wx:else></view>
            </view>
          </view>
        </repeat>

        <view class='submit_btn' @tap='showModal'>完成</view>
      </view>

      <view class='other s-fc-3'>
        <view class='left_circle s-bg-2'></view>
        <view class='right_circle s-bg-2'></view>
        <view>{{other_info1}}</view>
        <view>{{other_info2}}</view>
        <view>{{other_info3}}</view>
      </view>

    </view>
    
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class Refund extends wepy.page {
  config = {
    navigationBarTitleText: "退款原因"
  };
  data = {
    titleText: '退款原因',
    subtitleText: '请选择退款原因，我们会尽快为您办理退款',
    reasonList: [
      "突然不想剪了",
      "计划有变暂时不能剪发",
      "重复下单",
      "操作有误（服务、时间、门店信息选择错误）",
      "价格太贵",
      "有优惠券未使用",
      "找不到门店",
      "等待太久，未在承诺时间剪发",
      "推荐的剪发时间不合适",
      "其他"
    ],
    other_info1: '给你造成不好的体验',
    other_info2: '我们在此深表歉意',
    other_info3: '希望您下次再次光临手艺铺子',
    selIndex: null,
    refundReason: "",
    refundMemo: "",
    id: null,
  };

  computed = {};

  components = {};

  methods = {
    changeReason(index){
      this.selIndex = index;
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
            confirmColor: '#10325f',
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
          confirmColor: '#10325f',
          fail: e => console.error(e),
          success: e => e.confirm && this.refund()
        };

    if(e.confirm) return this.goUpdate();

    
    wx.showModal(config);

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

  async refund(){
    let param = {
        order_id: this.id, // this.orderDetail.order_id,
        refund_type: 1,
        reason_info: this.reasonList[this.selIndex],
        // buyer_message: this.refundMemo
      };
    // return console.error('refund', param);
    const res = await shttp.post("/api/v2/member/refundreturn").send(param).end();

    // if(res.error == ''){
      wx.navigateTo({ url: `/pages/order/refundSuccess?id=${this.id}` });
    // }else{
    //   wx.showModal({ content: res.error, showCancel: false });
    // }

    console.error(res);
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
  async onLoad(option) {
    console.log(option);
    this.id = option.id;
    // this.orderDetail = JSON.parse(decodeURIComponent(option.goods));
    const res = await shttp.get("/api/v2/member/order/" + option.id).end();

      let order = res.data[0],
          goods = order.order_goods[0];
      console.error("实物订单", order);

      // order.stylist = goods.goods_name;

      // order.time = `${order.appointment_date} ${order.appointment_frame}`;

      // order.store_time = `${t[0]}-${t[1]} ${this.dateList.filter(v => dayList.indexOf(v.id) !== -1 ).map(v => v.value).join(' ')}`;
      
      this.order = order;
    
    this.$apply();
  }

}
</script>

