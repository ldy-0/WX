<style scoped>
page {
  height: 100%;
}
.container {
  position: relative;
  height: 100%;
  /* overflow: hidden; */
}
.bg_img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.banner_img {
  display: block;
  width: 714rpx;
  height: 344rpx;
  margin: 0 auto;
  margin-top: 18rpx;
}

.main_wrap{
  margin: 50rpx 0 0;
}

.btn_wrap{
  position: relative;
  width: 270rpx;
  height: 60rpx;
  margin: 40rpx auto 0;
  border-radius: 12rpx;
  line-height: 1.2;
  overflow: hidden;
}
.i_btn{
  width: 100%;
  height: 100%;
}
.btn_ctn{
  position: absolute;
  top: 18rpx;
  left: 0;
  width: 100%;
  font-size: 25rpx;
  font-weight: bold;
  text-align: center;
}
.clear{
  padding: 0;
  border: none;
  line-height: 1.2;
}

.ctn_wrap{
  position: absolute;
  top: calc(50% - 40rpx);
  left: calc(50% - 140rpx);
  width: 280rpx;
  font-size: 35rpx;
  text-align: center;
}

.poster_img{
  width: 100%;
}
.canvas{
  width: 325px;
  height: 510px; 
  margin: 0 auto;
}

.between{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.s_fc_1{ color: #fff; }
.s_fc_2{ color: #c49e71; }
.s_fc_3{ color: #ddd; }
.s_fc_4{ color: #5a2f08; }

.s_bg_1{ background: #fff; }
.s_bg_2{ background: #5a2f08; }
.s_bg_3{ background: #aaa; }
.s_bg_4{ background: rgba(40, 37, 24, 1); }
</style>

<template>
  <view class="container">
    <image class="bg_img" src="../../images/bg.png" mode='aspectFill' alt>
    <!-- <image class="banner_img" src="../../images/bg_1@2x.png" alt> -->


    <view class="main_wrap s_fc_2">

      <!-- <image class='poster_img' src='' mode='aspectFill' /> -->
      <canvas canvas-id="canvas" class='canvas'></canvas>

    </view>

    <view class='between'>
      <view class='btn_wrap' @tap='saveImg'>
          <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
          <view class='btn_ctn s_fc_4'>保存至相册</view>
      </view>

      <button open-type='share' class='clear btn_wrap' plain='true' @tap='copy'>
          <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
          <view class='btn_ctn s_fc_4'>一键转发</view>
      </button>
    </view>

    <!-- <toast wx:if='{{showSuccess}}' @close.user='closeToast'>
      <view class='ctn_wrap s_fc_3'>
        <view>已复制成功</view>
        <view>请发送给您的车主</view>
      </view>
    </toast> -->
    <view class='s_bg_4' style='width: 100%; height: 100rpx;'></view>

    <tabBar :list.sync='tabBarList'></tabBar>

  </view>
</template>

<script>
import wepy from "wepy";
import tabBar from "../../components/tabBar";
import toast from "../../components/toast";
import { shttp } from "../../utils/http";
import mp from "../../utils/wx";

export default class Waiterhome extends wepy.page {
  config = {
    navigationBarTitleText: "",
  };

  data = {
    tabBarList: [],
    user: {},
    info: '',
    showSuccess: false,
  };

  components = {
    tabBar,
    toast
  };

  onLoad(options) {
    let gd = this.$parent.globalData;
    gd.tabIndex = -1;
    this.tabBarList = gd.adviserTabBarList;

    this.drawQrcode();
  }

  onShow() {}

  methods = {
    // copy(){
    //   let data = this.info;

    //   wx.setClipboardData({ 
    //     data, 
    //     success: e => { wx.hideToast(); this.showSuccess = true; this.$apply(); },
    //   });
    // },
    closeToast(){
      this.showSuccess = false;
    },
    saveImg() {
      let that = this;
      wx.canvasToTempFilePath({ canvasId: "canvas", x: 0, y: 0, width: 500, height: 500,
        success: function(res) {
          console.error('', res);
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(e) { wx.showToast({ title: "保存成功!", icon: "success", duration: 2000 }); },
            fail: function(res) {
              if ( res.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || res.errMsg === "saveImageToPhotosAlbum:fail auth denied") {
                wx.openSetting({
                  success(settingdata) {
                    if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                      console.log("获取权限成功，再次点击图片保存到相册");
                    } else {
                      console.log("获取权限失败");
                    }
                  }
                });
              }
            }
            // fail(err){
            //   console.log('save', err);
            // }
          });
        }
      });
    }
  };

  onShareAppMessage(){
    console.error('share');
    return {};
  }

  async drawQrcode(){
    wx.showLoading({ content: 'Loading...' });
    let ctx = wx.createCanvasContext('canvas'),
        adviser = wx.getStorageSync('adviserInfo');

    let res = await mp.getImg('http://castrolqiniu.mgcc.com.cn/Fv2ZBu1lEG5m224vKqbcxM_CngjB');

    ctx.drawImage('../../images/appointment/adviser.png', 0, 0, 325, 510);

    ctx.setFontSize(11);
    ctx.setFillStyle('#188948');
    ctx.fillText(`${adviser.name}  ${adviser.phone}`, 55, 380);

    // console.error(res);
    ctx.drawImage(res, 14, 450, 50, 50);

    ctx.draw();

    // wx.canvasGetImageData({ canvasId: 'canvas', x: 100, y: 100, width: 10, height: 10, success(res){ console.error(res); }, fail(e){ console.error(e); } });
    wx.hideLoading();
  }
}
</script>
