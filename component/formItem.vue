<template>
    <view class='row'>
        <view><image class='input_icon' src='/images/signin/input.png' /></view>
        <input class='input' placeholder="{{config.placeholder}}" placeholder-style='color: #c5c5c5;' value='{{formData[config.value]}}' @input='handle' />
        <view class='star s-fc-4' wx:if='{{config.type}}'>*</view>
    </view>
</template>
<script>
import wepy from "wepy";
export default class formItem extends wepy.component {
  props = {
    config: {
      type: Object,
      default: {} 
    },
    formData: {
      type: Object,
      default: {}
    },
  };

  methods = {
    handle(e){
      let v = e.detail.value,
          type = this.config.type,
          phone = /^((13[0-9])|(14[5|7|9])|(15([0-3]|[5-9]))|(17[0,1,3,5,6,7,8])|(18[0-9]))\d{8}$/,
          email = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g; 

      this.formData[this.config.value] = v;

      if(type === 'name') this.config.invalid = v.length > 15 ? '姓名不能超过15个字符' : false;

      if(type === 'mobile') this.config.invalid = !phone.test(v) ? '手机号格式不正确' : false;

      if(type === 'email') this.config.invalid = !email.test(v) ? '邮箱格式不正确' : false;

      console.error(this.config, v.length);
    },
  };
}
</script>
<style lang="css" scoped>
.row{
  height: 100rpx;
  margin: 0 30rpx;
  display: flex;
  align-items: center;
  border-bottom: 2rpx solid #e4e4e4;
  font-size: 34rpx;
}
.input_icon{
  width: 44rpx;
  height: 44rpx;
  margin-right: 25rpx;
}
.input{
  flex: 1;
}
.star{
  height: 20rpx;
}

.s-fc-1{ color: #fff; }
.s-fc-2{ color: #9f9f9f; }
.s-fc-3{ color: #ff7900; }
.s-fc-4{ color: #ff0000; }
</style>
