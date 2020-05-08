<template>
  <view class="goods_wrap mt40 flex s_fc_f" hover-class="uni-list-cell-hover">
    <image class="coupon_img" :src="canUse ? '/static/coupon/coupon.png' : '/static/coupon/coupon_invalid.png'"></image>

    <view class="coupon_price_wrap">
      <view>¥ <text class="coupon_price">{{config.voucher_price}}</text></view>

      <view class="fs24 s_fc_12">{{desc}}</view>
    </view>

    <view class="ml60">
      <view class="coupon_title">{{config.voucher_title}}</view>

      <view class="fs24 mt10 s_fc_12">开始时间：{{config.startTime}}</view>

      <view class="fs24 s_fc_12">失效时间：{{config.endTime}}</view>
    </view>
  </view>
</template>

<script>
import utils from '@/common/util.js';

export default {
  props: {
    config: Object,
  },
  
  data() {
    return {
      
    };
  },
  
  computed: {
    canUse(){ return this.config.voucher_state == 1; },
    desc(){ return this.config.voucher_limit == 0 ? `满${this.config.voucher_limit}元可用` : `满${this.config.voucher_limit}减${this.config.voucher_price}`; },
  },
  
  methods: {
    format(v) {
      if(v.vouchertemplate_state) v.voucher_state = v.vouchertemplate_state;
      if(v.vouchertemplate_title) v.voucher_title = v.vouchertemplate_title;
      if(v.vouchertemplate_limit) v.voucher_limit = v.vouchertemplate_limit;
      if(v.vouchertemplate_price) v.voucher_price = v.vouchertemplate_price;

      v.startTime = utils.toString((v.voucher_startdate || v.vouchertemplate_startdate) * 1000).slice(2, -3);
      v.endTime = utils.toString((v.voucher_enddate || v.vouchertemplate_enddate) * 1000).slice(2, -3);
      
      return v;
    },

    goDetail() {
      return console.log(this.config);
      uni.navigateTo({
        url: `/pages/classify/list?id=${this.config.goods_commonid}`,
      });
    },		
  },
  
  created() {
    this.format(this.config);
  },
}
</script>

<style scoped>
.goods_wrap{
  position: relative;
	width: 640rpx;
  height: 180rpx;
  z-index: 1;
  padding: 0;
  word-break: break-all;
  overflow: hidden;
}
.coupon_img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.coupon_title{
  width: 360rpx;
  font-size: 28rpx;
  line-height: 1.3;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.coupon_price_wrap{
  width: 210rpx;
  text-align: center;
  overflow: hidden;
  box-sizing: border-box;
}
.coupon_price{
  font-size: 52rpx;
}

.goods_desc{
  font-size: 24rpx;
  line-height: 2.4;
}

.s_fc_10{ color: #222848; }
.s_fc_11{ color: #5E5C75; }
.s_fc_12{ color: rgba(255, 255, 255, .7); }

.s_bg_11{ background: #D8D8D8; }
</style>