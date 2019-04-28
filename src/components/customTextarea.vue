<style scoped>
.flex{
  display: flex;
  align-items: center;
}
.between{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input_wrap{
  position: relative;
  display: flex;
  margin-bottom: 40rpx;
}

.title{
  flex-shrink: 0;
  height: 76rpx;
  margin: 0 30rpx 0 0;
  font-size: 28rpx;
}

.textarea{
  box-sizing: border-box;
  flex-grow: 1;
  height: 100%; 
  padding: 20rpx;
  border: 2rpx solid #c9c8d0;
  border-radius: 4rpx;
  font-size: 28rpx;
}

.required{
  position: absolute;
  top: 30rpx;
  right: 20rpx;
  font-size: 28rpx;
}

.statistic{
  position: absolute;
  bottom: 30rpx;
  right: 20rpx;
  font-size: 28rpx;
}

.s_fc_6{ color: #666; }
.s_fc_10{ color: #ff0000; }
</style>

<template>

  <view class='input_wrap' style='height: {{obj.height}}rpx;'>
    <view class='title between' style="width: {{obj.width}}rpx;">
      <repeat for="{{obj.title || obj.name}}">
        <view>{{item}}</view>
      </repeat>
    </view>

    <textarea class='textarea' value='{{obj.value}}' maxlength='200' @input="input"></textarea>

    <view class='required s_fc_10' wx:if="{{required}}">*</view>

    <view class='statistic s_fc_6' wx:if="{{obj.showStatistic}}">{{statistic}}</view>
  </view>
  
</template>

<script>
import wepy from "wepy";

export default class customInput extends wepy.component {
  props = {
    obj: Object
  };

  data = {
    
  };

  computed = {
    required(){ 
      let required,
          o = this.obj; 

      required = 'alert' in this.obj;

      if(required && !o.value) return o.alert = `请输入${o.title || o.name}`;

      o.alert = null;
      return required; 
    },
    statistic(){ return `${this.obj.value ? this.obj.value.length : 0}/200`; }
  }

  methods = {
    input(e){ 
      let v = e.detail.value,
          o = this.obj;

      o.value = v;

      // if(this.required && !v) return o.alert = `请输入${o.title || o.name}`;

      // o.alert = null;
    },
  };
}
</script>