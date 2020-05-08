<template>
  <view class="item_wrap" hover-class="uni-list-cell-hover">
    <view class="between s_fc_10">
      <view class="bold">提现</view>
      <view>-{{config.money}}</view>
    </view>

    <view class="between s_fc_11">
      <view class="fs24">{{config.time}}</view>
      <view class="fs24">{{config.statusStr}}</view>
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
      statusMap: {
        0: '处理中',
        1: '交易成功',
        2: '交易失败',
      }   
    };
  },
  
  computed: {
  },
  
  methods: {
    format(v) {
      v.time = utils.toString(v.ctime * 1000);

      v.statusStr = this.statusMap[v.status];
    },

    goDetail() {
      uni.navigateTo({ url: `/pages/classify/list?id=${this.config.goods_commonid}`, });
    },
  },
  
  created() {
    this.format(this.config); 
  },
}
</script>

<style>
.item_wrap{
  padding: 20rpx 0;
  border-bottom: 2rpx solid #F9F9F9;
}

.s_fc_10{ color: #222848; }
.s_fc_11{ color: #5E5C75; }
.s_fc_12{ color: #BABABA; }
</style>