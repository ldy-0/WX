<template>
  <view class="goods_wrap mb20 flex s_bg_f" hover-class="uni-list-cell-hover" @click="goDetail">
    <view class="goods_img_wrap">
      <image class="goods_img" :src="config.goods_image"></image>
    </view>

    <view class="goods_body ml30 s_fc_11">
      <view class="goods_title s_fc_10">{{ config.goods_name }}</view>

      <view class="goods_desc">{{config.goods_specname}}</view>

      <view class="flex">
        <view class="goods_desc">销量：{{ config.goods_salenum}}</view>
        <view class="goods_desc ml40">库存：{{ config.goods_storage}}</view>
      </view>

      <view class="goods_price_wrap flex">
        <view class="goods_price s_fc_price">¥{{config.goods_price}}</view>

        <view class="goods_marketPrice ml20 s_fc_12">¥{{config.goods_marketprice}}</view>
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		props: {
			config: Object,
		},
		
		data() {
			return {
				
			};
		},
		
		computed: {
		},
		
		methods: {
      goDetail() {
        let url = `/pages/goods/detail?id=${this.config.goods_commonid}`;

        uni.navigateTo({ url, });
      },		
		}
	}
</script>

<style>
.goods_wrap{
  padding: 40rpx 30rpx;
  word-break: break-all;
}
.goods_img{
  display: block;
	width: 240rpx;
  height: 240rpx;
}

.goods_body{
  align-self: flex-end;
}
.goods_title{
  height: 72rpx;
  font-size: 28rpx;
  font-weight: 600;
  line-height: 1.3;
  overflow: hidden;
}
.goods_price_wrap{
  position: relative;
  top: 4rpx;
}
.goods_price{
  font-weight: 600;
  line-height: 1.3;
}
.goods_marketPrice{
  font-size: 24rpx;
  line-height: 1.3;
  text-decoration: line-through;
}

.goods_desc{
  font-size: 24rpx;
  line-height: 2.4;
}

.s_fc_10{ color: #222848; }
.s_fc_11{ color: #5E5C75; }
.s_fc_12{ color: #BABABA; }

</style>