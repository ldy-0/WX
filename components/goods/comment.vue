<template>
  <view class="goods_wrap s_bg_f" hover-class="uni-list-cell-hover">
    <view class="flex">
      <view class="avatar_img_wrap">
        <image class="avatar_img" :src="config.geval_frommemberavatar"></image>
      </view>

      <view class="goods_body ml10 s_fc_11">
        <view class="goods_title s_fc_10">{{config.name}}</view>

        <view class="goods_desc">{{config.time}}</view>
      </view>
    </view>

    <view class="mt30 fs24 lh1 s_fc_11">{{config.geval_content}}</view>

    <view class="eval_img_wrap">
      <view class="wrap between" v-if="[1, 2, 4, 6].indexOf(config.imgList.length) !== -1" @tap="preview">
        <image class="eval_img mt20" :class="{ eval_img_lg: config.imgList.length == 1, eval_img_sm: config.imgList.length == 6, }" :src="item" v-for="(item, index) in config.imgList" :key="index"></image>
      </view>

      <view class="wrap between" v-if="config.imgList.length == 3" @tap="preview">
        <image class="eval_img_main mt20" :src="config.imgList[0]"></image>
        <view class="">
          <image class="eval_img_vice mt20" :src="config.imgList[1]"></image>
          <image class="eval_img_vice mt20" :src="config.imgList[2]"></image>
        </view>
      </view>

      <view class="wrap between" v-if="config.imgList.length == 5" @tap="preview">
        <image class="eval_img mt20" :class="{ eval_img_sm: index > 1, }" :src="item" v-for="(item, index) in config.imgList" :key="index"></image>
      </view>
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
		},
		
		methods: {
      init(v) {
        v.time = utils.toString(v.geval_addtime * 1000);

        v.name = v.geval_frommembername.replace(/^(.).*/g, '$1**');

        try{
          v.imgList = JSON.parse(v.geval_image);
        }catch(err){
          console.log(`${ err.message }`);
        }
      },

      preview() {
				uni.previewImage({ urls: this.config.imgList });
			},
      		
    },
    
    created(){
      this.init(this.config);
    },
	}
</script>

<style>
.goods_wrap{
  padding: 40rpx 20rpx 0;
  word-break: break-all;
}
.avatar_img{
  display: block;
	width: 76rpx;
  height: 76rpx;
  border-radius: 50%;
}

.goods_body{
}
.goods_title{
  font-size: 28rpx;
  font-weight: 600;
  line-height: 1.3;
  overflow: hidden;
}
.goods_desc{
  font-size: 24rpx;
  line-height: 2;
}

.eval_img{
  flex-shrink: 0;
  display: block;
  width: 348rpx;
  height: 276rpx;
}
.eval_img_lg{
  width: 100%;
  height: 360rpx;
}
.eval_img_sm{
  width: 224rpx;
  height: 196rpx;
}
.eval_img_main{
  width: 410rpx;
  height: 400rpx;
}
.eval_img_vice{
  display: block;
  width: 280rpx;
  height: 196rpx;
}
.wrap{
  flex-wrap: wrap;
}

.lh1{ line-height: 1.3; }

.s_fc_10{ color: #3E3F55; }
.s_fc_11{ color: #9D9D9D; }
</style>