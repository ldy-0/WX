<template>
  <view class="order_wrap mt20 s_bg_f" @click="goDetail">
      <view class="order_state_wrap between">
        <view class="fs24 s_fc_10">订单号：{{config.order_sn}}</view>
        <view class="fs24 s_fc_price">{{config.order_state}}</view>
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
        <view class="fs24 lh1 s_fc_gray">创建时间：{{config.add_time}}</view>
        <view class="order_amount lh1">实付金额：¥{{config.order_amount}}</view>
      </view>

      <view class="btn_wrap flex s_fc_12" @tap.stop="">
        <view class="btn" v-if="isNormal && isUnPay">支付</view>
        <view class="btn" v-if="isNormal && isUnSend" @tap="refund">退款</view>
        <view class="btn" v-if="isNormal && isSended" @tap="returnGoods">退换货</view>
        <view class="btn" v-if="isSended" @tap="confirm">确认收货</view>
        <view class="btn" v-if="showInvoice" @tap.stop="goInvoice">申请开票</view>
        <view class="btn" v-if="showEval" @tap.stop="goEval">评价</view>
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
      isNormal(){ return this.config.type == gd.NORMAL_ORDER; },
      isSeckill(){ return this.config.type == gd.SECKILL_ORDER; },

      isUnPay(){ return this.config.order_state_id == gd.ORDER_UN_PAY && this.config.contrary_type == 0; },
      isUnSend(){ return this.config.order_state_id == gd.ORDER_PAYED; },
      isSended(){ return this.config.order_state_id == gd.ORDER_SEND; },
      isDone(){ return this.config.order_state_id == gd.ORDER_RECEIVE; },

      showInvoice(){ return this.isDone && this.config.is_invoice == 0; },
      showEval(){ return this.isDone && this.config.evaluation_state == 0; },
		},
		
		methods: {
      refund() {
        this.$emit('return', this.config, 'refund');
      },

      returnGoods() {
        this.$emit('return', this.config, 'return');
      },

      goEval() {
        let url = `/pages/my/order/eval?id=${this.config.order_id}`;

        uni.navigateTo({ url, });
      },

      goInvoice() {
        let url = `/pages/my/invoice/apply?id=${this.config.order_id}&sn=${this.config.pay_sn}`;

        uni.navigateTo({ url, });
      },

      goDetail() {
        let url = `/pages/my/order/detail?id=${this.config.order_id}`;

        uni.navigateTo({ url, });
      },

      async confirm() {
        uni.showLoading({ title: 'loading...', mask: true, });

        let param = {
          state_type: 'order_receive',
        };
        
        let res = await orderApi.changeOrder(this.config.order_id, param);
        uni.hideLoading();
        if(res && res.status == 0) {
          return this.$emit('success', this.config);
        }

        uni.showToast({ title: res ? res.error || res : '确认收货失败!', icon: 'none', });
      },
		}
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
  height: 68rpx;
}
.order_amount{
  font-size: 26rpx;
}
.lh1{
  line-height: 1;
}

.btn_wrap{
  justify-content: flex-end;
  flex-wrap: wrap;
}
.btn{
  flex-shrink: 0;
  width: 140rpx;
  height: 48rpx;
  margin: 12rpx 0 12rpx 30rpx;
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