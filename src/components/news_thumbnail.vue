<style scoped>
.info_wrap{
  display: flex;  
  margin: 0 0 40rpx 0;
}
.info_img{
  flex-shrink: 0;
  width: 200rpx;
  height: 200rpx;
  border-radius: 10rpx;
}

.info_info{
  width: 450rpx;
  margin: 20rpx 0 0 40rpx;
  font-size: 30rpx;
}
.info_title{
  height: 72rpx;
  line-height: 1.2; 
  overflow: hidden;
}
.info_time{
  margin: 50rpx 0 0;
}

.s_fc_2{ color: #222; }
.s_fc_3{ color: #888; }
</style>
<template>
  <view class='info_wrap' @tap='click'>

    <image class='info_img' src='{{info.information_image}}' mode='aspectFill' />

    <view class='info_info'>
      <view class='info_title s_fc_2'>{{info.information_title}}</view>
      <view class='info_time s_fc_3'>{{info.addtime}}</view>
    </view>

  </view>
</template>
<script>
import wepy from "wepy";
export default class info_thumbnail extends wepy.component {
  props = {
    info: Object,
    classify: String,
  };

  data = {};

  methods = {
    click(){
      this.$emit('click', this.info.information_id, this.classify);
    }
  };
}
</script>