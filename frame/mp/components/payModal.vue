<style scoped>
.modal_wrap{
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10rpx;
}
.i_close{
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  width: 26rpx;
  height: 26rpx;
}
.modal_title{
  padding: 40rpx 0 80rpx;
  font-size: 32rpx;
  text-align: center;
}
.pwd_wrap{
  position: relative;
  width: 600rpx;
  margin: 0 auto;
  border-top: 2rpx solid #f1f1f1;
  border-bottom: 2rpx solid #f1f1f1;
  text-align: center;
}
.pwd_item{
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100rpx;
  height: 100rpx;
  line-height: 100rpx;
  border-left: 2rpx solid #f1f1f1;
}
.last_item{
  border-right: 2rpx solid #f1f1f1;
}
.cursor{
  position: relative;
  top: calc(50% - 20rpx);
  left: calc(50% - 2rpx);
  width: 4rpx;
  height: 40rpx;
  background: #ccc;
}

.input{
  position: absolute;
  top: 0;
  left: 0;
  width: 1100rpx;
  height: 100rpx;
  margin-left: -500rpx;
  color: #fff;
  text-align: left;
}

.flex{
  display: flex;
  align-items: center;
}

.s_bg_f{ background: #fff; }

</style>
<template>

    <modal :config.sync="modalConfig" @close.user='closeModal'>
        <view class='modal_wrap s_bg_f' slot='center'>

          <image class='i_close' src='../images/dScore/close.png' @tap='closeModal' />
          <view class='modal_title s_fc_6'>请输入支付密码</view>

          <view class='pwd_wrap flex' wx:if="{{focus}}">
              <input class='input' type='number' maxlength='6' focus="{{focus}}" cursor='{{10}}' @input='input' />

              <repeat for="{{pwd}}">

                <view class="pwd_item {{pwd.length === index + 1 ? 'last_item' : ''}}">
                  <view class='cursor' wx:if="{{focusIndex === index}}"></view>
                  <view wx:else>{{item ? '*' : ''}}</view>
                </view>
                  <!-- <input type='number' maxlength='1' password='true'
                          focus="{{focusIndex === index}}"
                          class="pwd_item {{pwd.length === index + 1 ? 'last_item' : ''}}" 
                          @input='input({{index}})'
                          @focus='focusInput({{index}})' />
                   -->

              </repeat>
          </view>

        </view>
    </modal>

</template>
<script>
import wepy from "wepy";
import modal from './model';

/**
 * 
 * 密码弹窗
 * 使用focus属性会出现闪屏现象
 * 
 */

export default class PayModal extends wepy.component {
  props = {
    config: {
      type: Object,
      twoWay: true,
    }
  };

  components = {
    modal,
  }

  watch = {
    config(v1, v2){
      this.modalConfig.show = v1.show;

      if(v1.show){
        this.focus = true;
        this.focusIndex = 0;
        this.pwd = this.pwd.map(v => '');
      }

      this.$apply();
    }
  }
  
  data = {
    modalConfig: {
      width: 640,
      height: 400,
      center: true,
      show: false,
    },
    pwd: ['', '', '', '', '', ''],
    focusIndex: 0,
    focus: false,
  };

  methods = {
    input(e){
      let v = e.detail.value,
          pwd;

      this.pwd = this.pwd.map((val, index) => v[index] || '');
      this.focusIndex = v.length;
      // this.pwd[index] = v;

      // if(v) this.focusIndex = index + 1;

      pwd = this.pwd.join('');
      if(/\d{6}/g.test(pwd)) this.$emit('done', pwd);
    },
    
    focusInput(index){ if(this.focusIndex != index) this.focusIndex = index; console.error('focus: ', this.focusIndex); },

    closeModal(){
      this.config.show = this.modalConfig.show = false; 

      this.focus = false;
      this.focusIndex = 0;
      this.pwd = this.pwd.map(v => '');

      this.$emit('cancel', this.pwd.join(''));
    },
  };
}
</script>