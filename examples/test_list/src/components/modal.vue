<style lang="sass">
@import "../pages/base.sass"
.modal-mask
  width: 100%
  height: 100%
  position: fixed
  top: 0
  left: 0
  background-color: rgba(0, 0, 0, 0.5)
  overflow: hidden
  z-index: 9000
  color: #fff

.modal-dialog
  width: 520rpx
  height: 296rpx
  overflow: hidden
  position: fixed
  top: 50%
  left: 50%
  z-index: 9999
  background: #f9f9f9
  margin-top: -180rpx
  margin-left: -260rpx
  border-radius: 10rpx

.modal-content
  padding: 73rpx 70rpx
  text-align: center
  font-size: 32rpx
  color: #000
  text
    color: $blue

.input
  width: 100%
  height: 82rpx
  font-size: 28rpx
  line-height: 28rpx
  padding: 0 20rpx
  box-sizing: border-box
  color: #333

input-holder
  color: #666
  font-size: 28rpx

.modal-footer
  position: absolute
  bottom: 0
  width: 520rpx
  display: flex
  flex-direction: row
  height: 70rpx
  border-top: 1rpx solid #dedede

.modal-button
  width: 50%
  height: 70rpx
  line-height: 70rpx
  text-align: center
  font-size: 32rpx
  border-radius: 0
  &:after
    border: none

.modal-cancel
  color: #888
  border-right: 1rpx solid #dedede

.modal-confirm
  color: $blue

</style>
<template>
<view class="modal-mask"  wx:if="{{showModal}}">
  <view class="modal-dialog">
    <view class="modal-content">当前权限仅有<text>一次</text>约课机会是否使用本次机会</view>
    <view class="modal-footer">
      <view class="modal-button modal-cancel" bindtap="onCancel" data-status="cancel">取消</view>
      <view class="modal-button modal-confirm" bindtap="onConfirm" data-status="confirm">确定</view>
    </view>
  </view>
</view>
</template>
<script>
import wepy from "wepy";
export default class Modal extends wepy.component {
  props = {
    // title: String,
    // content: String,
    // canShare: true,
    // confirm: String,
    // cancel: String
  };

  data = {
    showModal: false
  };

  methods = {
    onConfirm: () => {
      this.$emit("onConfirm");
      this.showModal = false;
    },

    onCancel: () => {
      this.showModal = false;
    }
  };

  events = {
    showModal: $event => {
      this.showModal = true;
    }
  };
}
</script>
