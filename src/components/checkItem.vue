<!--客服组件-->
<style scoped>
.m_check_item{
  padding: 0 30rpx 0 14rpx;
  display: flex;
  align-items: center;
}

.check_wrap{
  padding: 8rpx 16rpx;
}
.i_check, .uncheck{
  flex-shrink: 0;
  width: 40rpx;
  height: 40rpx;
}
.uncheck{
  box-sizing: border-box;
  border: 2rpx solid #ccc;
  border-radius: 50%;
}

.other_info{
  flex-grow: 1;
}
</style>
<template>

  <view class='m_check_item' style="height: {{config.height || 80}}rpx; background: {{config.bg || '#fff'}};">

    <view class='check_wrap' @tap='change'>
      <icon class='i_check' type='success' wx:if="{{obj.checked}}"></icon>
      <view class='uncheck' wx:else></view>
    </view>

    <view class='other_info'>
      <slot></slot>
    </view>

  </view>
  
</template>
<script>
import wepy from "wepy";

export default class CheckItem extends wepy.component {
  props = {
    config: Object,
    obj: Object,
  };

  data = {};

  watch = {
    // obj(v1, v2){
    //   console.error(v1, v2);
    // }
  }

  methods = {
    change(){
      this.$emit('preChange', this.obj);
      if(this.obj.unCheck) return ;

      this.obj.checked = !this.obj.checked;
      this.$emit('change');
    }
  };

}
</script>