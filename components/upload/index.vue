<template>
  <view class="upload_wrap flex">

    <view class="upload_box" v-for="(item, index) in imgList" :key="index">
      <image class="img" :src="item"></image>

      <view class="i_close" @tap="del(index)">x</view>
    </view>

    <view class="upload_box upload s_fc_10" @tap="chooseImage" v-if="imgList.length < config.limit">+</view>

  </view>
</template>

<script>
	export default {
		props: {
			config: {
        type: Object,
        default(){
          return {
            limit: 1,
          };
        },
      },
		},
		
		data() {
			return {
        imgList: [],
        fileList: [],
			};
		},
		
		computed: {
		},
		
		methods: {
      chooseImage() {
        uni.chooseImage({ count: this.config.limit - this.imgList.length, success: this.success, fail: this.fail });
      },

      del(i) {
        this.imgList.splice(i, 1);
        this.fileList.splice(i, 1);
        this.$emit('success', this.fileList);
      },

      success(e) {
        this.imgList = this.imgList.concat(e.tempFilePaths);
        this.fileList = this.fileList.concat(e.tempFiles);
        this.$emit('success', this.fileList);
      },

      fail(e) {
        console.log('err', e);
      },
		}
	}
</script>

<style>
.upload_wrap{
  flex-wrap: wrap; 
}

.upload_box{
  position: relative;
  flex-shrink: 0;
  width: 208rpx;
  height: 156rpx;
  margin: 20rpx 20rpx 0 0;
}
.upload{
  line-height: 156rpx;
  font-size: 80rpx;
  border-radius:8rpx;
  border:1rpx dashed rgba(183,183,183,1);
  background:rgba(252,252,252,1);
  text-align: center;
}

.i_close{
  position: absolute;
  top: -15rpx;
  right: -15rpx;
  width: 36rpx;
  height: 36rpx;
  font-size: 40rpx;
  border-radius: 50%;
  line-height: 30rpx;
  text-align: center;
  color: #fff;
  background: #B7B7B7;
}

.s_fc_10{ color: #B7B7B7; }
.s_fc_11{ color: #5E5C75; }
</style>