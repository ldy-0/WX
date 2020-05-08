<template>
  <view class="order_wrap mt20 s_bg_f" @click="goDetail">
      <view class="order_state_wrap between">
        <view class="fs24 s_fc_10">订单号：{{config.order_sn}}</view>
        <view class="fs24 s_fc_price">{{config.stateStr}}</view>
      </view>

      <view class="goods_list_wrap ">
        <!-- <image class="goods_img" :src="item.goods_image"></image> -->

        <view class="goods_body">
          <view class="goods_title s_fc_10">{{config.invoice_company}}</view>

          <view class="flex mt20 s_fc_gray">
            <view class="fs24">发票代码：{{''}}</view>
            <view class="fs24 ml50">发票号码：{{''}}</view>
          </view>
        </view>
      </view>

      <view class="order_amount_wrap between s_fc_10">
        <view class="time s_fc_gray">创建时间：{{config.time}}</view>
        <view class="order_amount">开票金额：¥{{config.invoice_money}}</view>
      </view>

    </view>

  </view>
</template>

<script>
  import orderApi from '@/api/order';
  import * as gd from '@/common/global.js';

	export default {
		props: {
			config: Object,
		},
		
		data() {
			return {
				
			};
		},
		
		computed: {
      isDone(){ return this.config.invoice_status == 1; },
		},
		
		methods: {
      format(v) {
        v.stateStr = this.isDone ? '已开票' : '待处理';
      },

      goDetail() {
        let url = `/pages/my/order/detail?id=${this.config.order_id}`;

        // uni.navigateTo({ url, });
      },
    },
    
    created() {
      this.format(this.config);
    }
	}
</script>

<style>
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
  /* width: 500rpx; */
  /* font-weight: 600; */
  line-height: 1.2;
  /* white-space: nowrap; */
  overflow: hidden;
  text-overflow: ellipsis;
}

.order_amount_wrap{
  padding: 10rpx 0;
}
.order_amount{
  font-size: 26rpx;
}

.time{
  font-size: 20rpx;
  line-height: 1;
}

.s_fc_10{ color: #222848; }
.s_fc_11{ color: #3E3F55; }
.s_fc_12{ color: #FE4F52; }
</style>