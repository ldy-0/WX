<template>
    <view class='model_wrap'>

        <view class='model' wx:if='{{show || config.show}}' catchtouchmove='preventMove'>
          <view class='mask' @tap='hide'></view>

          <view class="content" 
                style="top: calc(50% - {{config.height/2 || 150}}rpx); left: calc(50% - {{config.width/2 || 150}}rpx); width: {{config.width || 300}}rpx; height: {{config.height || 300}}rpx; "
                wx:if='{{config.center}}'>
            <slot name='center'></slot> 
          </view>
          <view class='content s_bg_f' wx:else>
            <slot name='bottom'></slot>
          </view>
        </view>
     
    </view>
</template>
<script>
import wepy from 'wepy';

export default class Model extends wepy.component {
  props = {
    config: {
      type: Object,
      twoWay: true,
    },
    show: {
      type: Boolean,
      twoWay: true,
    },
    center: Boolean,
    preventHide: Boolean,
  }

  components = {}

  data = {}

  // watch = {
  //   config(v){
  //     console.error(v);
  //   }
  // }

  onLoad() {
  
  }

  methods = {
    preventMove(){},
    hide(){
      if(this.preventHide || this.config.preventHide){ 
        return this.$emit('close'); 
      }

      this.show ? this.show = false : this.config.show = false;
      this.$emit('close');
    },
  }
  
}

</script>
<style scoped>
.model{
}

.mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    overflow: hidden;
}

.content{
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    overflow: hidden;
}

.center{
  position: absolute;
  top: calc(50% - 150rpx);
  left: calc(50% - 150rpx);
  width: 300rpx;
  height: 300rpx;
  background: #fff;
}

.s_bg_f{ background: #fff; }
</style>
