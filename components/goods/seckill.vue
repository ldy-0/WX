<template>
  <view class="goods_wrap mb20 flex s_bg_f" hover-class="uni-list-cell-hover" @click="goDetail">
    <view class="goods_img_wrap">
      <image class="goods_img" :src="config.rule_image"></image>
    </view>

    <view class="goods_body ml30 s_fc_11">
      <view class="goods_title s_fc_10">{{config.rule_name}}</view>

      <!-- <view class="goods_desc">{{config.skuStr}}</view> -->
      <view class="goods_desc">
        <uni-countdown class="seckill_countdown" :day="countdown.day" :hour="countdown.hour" :minute="countdown.minute" :second="countdown.second" color="#FE5955" splitor-color="#FE5955" />
      </view>

      <view>
        <view class="progress_wrap">
          <view class="all_progress" :class="[ isDoing ? 's_bg_10' : 's_bg_12', ]">
            <view class="current_progress s_bg_11" :style="{ width: config.percent + '%', }" v-if="isDoing"></view>

            <view class="percent_text fs24 s_fc_f">{{config.percent}}%</view>
          </view>
        </view>

        <view class="seckill_num mt10 fs20 s_fc_13">已秒杀{{restNum}}/{{config.limit_num}}件</view>
      </view>

      <view class="between">
        <view class="price_wrap flex">
          <view class="goods_price s_fc_price">¥{{config.goods_price}}</view>

          <view class="goods_marketPrice ml20 s_fc_12">¥{{config.goods.goods_price}}</view>
        </view>

        <view class="seckill_btn fs24 s_fc_f s_bg_12" v-if="isToDo" @tap.stop=";">活动未开始</view>
        <view class="seckill_btn fs24 s_fc_f s_bg_13" v-if="isDoing">立即秒杀</view>
        <view class="seckill_btn fs24 s_fc_f s_bg_12" v-else @tap.stop=";">活动已结束</view>
      </view>
    </view>
  </view>
</template>

<script>
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
  import * as gd from '@/common/global.js';
  import mathjs from '@/common/math';

	export default {
		props: {
			config: Object,
    },
    
    components: {
      uniCountdown,
    },
		
		data() {
			return {
				countdown: {},
			};
		},
		
		computed: {
      isToDo(){ return this.config.status == gd.ToDo; },
      isDoing(){ return this.config.status == gd.DOING; },

      restNum(){ return mathjs.subtract(this.config.limit_num, this.config.goods.goods_storage); },
		},
		
		methods: {
      format(v){
        let st = new Date(this.config.start_time.replace(/-/g, '/')).getTime(),
            et = new Date(this.config.end_time.replace(/-/g, '/')).getTime(),
            ct = Date.now();

        v.percent = Math.round(this.restNum / v.limit_num * 100);

        v.status = ct > st ? ct >= et ? gd.DONE : gd.DOING : gd.TODO;

        let t = et - ct;
        this.countdown = {
					day: Math.floor((t = t / 1000) / 86400),
					hour: Math.floor((t = t % 86400) / 3600),
					minute: Math.floor((t = t % 3600) / 60),
					second: t,
				};
      },

      goDetail() {
        let url = `/pages/goods/detail?ruleId=${this.config.rule_id}`;

        uni.navigateTo({ url, });
      },		
    },
    
    created(){
      this.format(this.config);
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
  flex-grow: 1;
  align-self: flex-end;
}
.goods_title{
  height: 72rpx;
  font-size: 28rpx;
  font-weight: 600;
  line-height: 1.3;
  overflow: hidden;
}

.price_wrap{
  align-self: flex-end;
}
.goods_price{
  font-size: 28rpx;
  font-weight: 600;
}
.goods_marketPrice{
  font-size: 24rpx;
  text-decoration: line-through;
}

.goods_desc{
  font-size: 24rpx;
  line-height: 2.4;
}

.progress_wrap{
}
.all_progress{
  position: relative;
  width: 230rpx;
  height: 28rpx;
  border-radius: 16rpx;
  overflow: hidden;
}
.current_progress{
  height: 100%;
  border-radius: 16rpx;
}
.percent_text{
  position: absolute;
  top: 0;
  right: 10rpx;
  line-height: 28rpx;
}

.seckill_num{
  line-height: 1.3;
}

.seckill_btn{
  width: 160rpx;
  height: 52rpx;
  line-height: 52rpx;
  text-align: center;
  border-radius: 30rpx;
}

.s_fc_10{ color: #222848; }
.s_fc_11{ color: #5E5C75; }
.s_fc_12{ color: #BABABA; }
.s_fc_13{ color: #FE6B59; }

.s_bg_10{ background: #FBCEC8; }
.s_bg_11{ background: #FE6B59; }
.s_bg_12{ background: #BEBEBE; }
.s_bg_13{ background: linear-gradient(137deg, #FE705A 0%, #FD4750 100%); }
</style>