<style lang="sass">
.container-box
  background-color: rgba(0,0,0,0.5)
  height: 100vh
  width: 100%
  position: fixed
  top: 0
  z-index: 9999
  display: flex
  align-items: center

.img-box
  width: 690rpx
  height: 495rpx
  margin: 0 auto
  background-color: #fff
  border-bottom: 1rpx solid #e5e5e5
  position: relative
  text-align: center
  image
    width: 310rpx
    height: 310rpx
    background-color: #f9f9f9
  .clear-img
    position: absolute
    top: 0
    right: 0
    width: 40rpx
    height: 40rpx
    background-color: #fff
    padding: 30rpx  
.input-row
  margin: 30rpx auto
  border-bottom: 1rpx solid #e5e5e5
  border-top: 1rpx solid #e5e5e5
  display: flex
  align-items: center
  height: 88rpx
  padding: 0 32rpx
  background-color: #fff
  font-size: 34rpx
  color: #000
  input
    margin-left: 100rpx
    flex: 1

.mybtn
  width: 686rpx
  margin: 60rpx auto

.canvas-box
  position: fixed
  top: 999999rpx
  left: 0
.promotion-code
  width: 100%
  text-align: center
  font-size: 34rpx
  padding-top: 30rpx
  padding-bottom: 40rpx
.promotion-text
  padding-left: 30rpx
  font-size: 30rpx
  display: flex

</style>
<template>
<view wx:if="{{showCode}}">
  <view class="container-box">
    <view class="img-box">
      <image class="clear-img" @tap="clear" src="../images/icon_close@2x.png"/>
      <view class="promotion-code">优惠码</view>
      <view class="promotion-text">请向商家出示优惠码</view>
      <image bindtap="previewImg" mode="scaleToFill" src="{{imagePath}}" />
        </view>
</view>
<view class="canvas-box">
  <canvas  hidden="{{canvasHidden}}" style="width: 686rpx;height: 686rpx;background:#f1f1f1;" canvas-id="mycanvas"/>
</view>
</view>
</template>
<script>
import wepy from "wepy";
import QR from "../utils/qrcode.js";
export default class QrCode extends wepy.component {
  props = {};
  data = {
    canvasHidden: false,
    imagePath: "",
    showCode: false
  };
  onLoad(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // var size = this.setCanvasSize(); //动态设置画布大小
    // var initUrl = this.placeholder;
    // this.createQrCode(initUrl, "mycanvas", size.w, size.h);
  }
  //适配不同屏幕大小的canvas
  setCanvasSize() {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686; //不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width; //canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  }
  createQrCode(url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    setTimeout(() => {
      this.canvasToTempImage();
    }, 500);
  }
  //获取临时缓存照片路径，存入data中
  canvasToTempImage() {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: "mycanvas",
      success: function(res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.imagePath = tempFilePath;
        that.$apply();
        // canvasHidden:true
      },
      fail: function(res) {
        console.log(res);
      }
    });
  }
  methods = {
    //点击图片进行预览，长按保存分享图片
    previewImg(e) {
      var img = this.data.imagePath;
      console.log(img);
      wx.previewImage({
        current: img, // 当前显示图片的http链接
        urls: [img] // 需要预览的图片http链接列表
      });
    },
    // formSubmit(e) {
    //   var that = this;
    //   var url = e.detail.value.url;
    //   that.maskHidden = false;
    //   wx.showToast({
    //     title: "生成中...",
    //     icon: "loading",
    //     duration: 2000
    //   });
    //   var st = setTimeout(function() {
    //     wx.hideToast();
    //     var size = that.setCanvasSize();
    //     //绘制二维码
    //     that.createQrCode(url, "mycanvas", size.w, size.h);
    //     that.maskHidden = true;
    //     clearTimeout(st);
    //   }, 2000);
    // },
    clear() {
      this.showCode = false;
    }
  };

  events = {
    showCode: (data, $event) => {
      var that = this;
      that.showCode = true;
      setTimeout(function() {
        var size = that.setCanvasSize(); //动态设置画布大小
        var initUrl = data;
        console.log(initUrl);
        that.createQrCode(initUrl, "mycanvas", size.w, size.h);
      }, 0);
      that.$apply();
    }
  };
}
</script>
