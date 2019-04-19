<!--客服组件-->
<style scoped>
.m_check_item{
  padding: 0 30rpx;
  display: flex;
  align-items: center;
}

.i_check, .uncheck{
  flex-shrink: 0;
  width: 40rpx;
  height: 40rpx;
}
.uncheck{
  width: 36rpx;
  height: 36rpx;
  border: 2rpx solid #ccc;
  border-radius: 50%;
}

.other_info{
  flex-grow: 1;
  /* background: #000; */
}
</style>
<template>

  <view class='m_check_item' style="height: {{config.height || 80}}rpx; background: {{config.bg || '#fff'}};">

    <icon class='i_check' type='success' @tap='change' wx:if="{{obj.checked}}"></icon>
    <view class='uncheck' @tap='change' wx:else></view>

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