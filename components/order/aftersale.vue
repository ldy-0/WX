<template>
  <view class="order_wrap mt20 s_bg_f" @click="goDetail">
      <view class="order_state_wrap between">
        <view class="fs24 s_fc_10">订单号：{{config.order_sn}}</view>
        <view class="fs24 s_fc_price">{{config.stateStr}}</view>
      </view>

      <view class="goods_list_wrap flex" v-for="(item, index) in config.order_goods" :key="index">
        <image class="goods_img" :src="item.goods_image"></image>

        <view class="goods_body ml30">
          <view class="goods_title s_fc_10">{{item.goods_name}}</view>

          <view class="between mt20 s_fc_gray">
            <view>{{item.goods_spec || ''}}</view>
            <view class="s_fc_11">x {{item.goods_num}}</view>
          </view>
        </view>
      </view>

      <view class="order_amount_wrap between s_fc_10">
        <view class="fs20 lh1 s_fc_gray">创建时间：{{config.add_time}}</view>
        <view class="order_amount lh1">实付金额：¥{{config.order_amount}}</view>
      </view>

      <view class="reason_wrap between">
        <view class="s_fc_gray">
          <view class="fs20 lh1">申请时间：{{config.refund_add_time}}</view>
          <view class="reason fs20 lh1">退款原因：{{config.reason_info}}</view>
        </view>

        <view class="btn_wrap flex s_fc_12" @tap.stop="">
          <view class="btn" v-if="canCancel" @tap="cancel">撤销</view>
        </view>
      </view>
      
  </view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'	
import orderApi from '@/api/order';
import * as gd from '@/common/global.js';

export default {
  component: {
    uniPopup,
  },

  props: {
    config: Object,
  },
  
  data() {
    return {
      
    };
  },
  
  computed: {
    canCancel(){ return this.config.refund_state == gd.REFUNDING; },

    isRefund(){ return this.config.refund_type == gd.RETURN_MONEY; },
  },
  
  methods: {
    format(v) {
      if(this.canCancel) v.stateStr = this.isRefund ? '退款中' : '退货中';
      if(v.refund_state == 3) v.stateStr = this.isRefund ? '退款成功' : '退货成功';
    },

    goDetail() {
      let url = `/pages/my/order/detail?id=${this.config.order_id}`;

      // uni.navigateTo({ url, });
    },

    async cancel() {
      uni.showLoading({ title: 'loading...', mask: true, });

      let res = await orderApi.cancelAftersale(this.config.refund_id);
      uni.hideLoading();
      if(res && res.status == 0) {
        return this.$emit('success', this.config);
      }

      uni.showToast({ title: res ? res.error || res : '提交失败!', icon: 'none', });
    },
  },
  
  created() {
    this.format(this.config);
  },
}
</script>

<style scoped>
.order_wrap{
  padding: 0 20rpx;
  border-radius: 16rpx;
  word-break: break-all;
}
.order_state_wrap, .goods_list_wrap{
  border-bottom: 1rpx solid #F9F9F9;
}
.order_state_wrap{
  height: 72rpx;
}
.goods_list_wrap{
  padding: 20rpx 0 10rpx;
}
.goods_img{
  flex-shrink: 0;
  display: block;
	width: 140rpx; 
  height: 124rpx;
}

.goods_body{
  flex-grow: 1;
  align-self: flex-start;
}
.goods_title{
  width: 480rpx;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.order_amount_wrap{
  padding: 10rpx 0 0;
}
.order_amount{
  font-size: 26rpx;
}
.lh1{
  line-height: 1;
}

.reason_wrap{
  padding: 12rpx 0;
}
.reason{
  margin: 12rpx 0 0;
}
.btn_wrap{
  justify-content: flex-end;
  flex-wrap: wrap;
}
.btn{
  flex-shrink: 0;
  width: 140rpx;
  height: 48rpx;
  margin: 0 0 0 30rpx;
  font-size: 26rpx;
  line-height: 48rpx;
  border: 1rpx solid #FE4F52;
  border-radius: 42rpx;
  text-align: center;
}

.new_time{
  font-size: 24rpx;
  line-height: 2;
}

.s_fc_10{ color: #222848; }
.s_fc_11{ color: #3E3F55; }
.s_fc_12{ color: #FE4F52; }
</style>