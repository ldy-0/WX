<style scoped>
.ctn_wrap{
  text-align: center;
}
.ctn{
  /* border: 6rpx solid #c79a70; */
  /* background: linear-gradient(180deg, rgba(199,154,112, 0.3), #000 30%); */
}

.s_bg_1{ background: #fff; }
</style>
<template>
  <view class='ctn_wrap' style="margin-top: {{config.top+'rpx'}}; font-size: {{config.size+'rpx'}};">

    <repeat for='{{list}}'>
      <view class='ctn'>{{item}}</view>
    </repeat> 

  </view>
</template>
<script>
import wepy from "wepy";

export default class Center extends wepy.component {
  components = {};

  props = {
    list: Array,
    config: Object,
  };

  data = {
    closeURL: '/images/global/close.png'
  };

  watch = {
    list(v1, v2){
      console.error(v1, v2);
    }
  }

  methods = {
    
  };
}
</script>