<style scoped>
page {
  height: 100%;
}
.container {
  position: relative;
  min-height: 100%;
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
  margin: 70rpx 0 0;
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

.canvas{
  /* width: 0rpx; */
  /* height: 2rpx; */
  /* width: 688rpx; */
  /* height: 1068rpx; */
  width: 325px;
  height: 510px; 
  margin: 0 auto;
}

.poster_img{
  /* width: 688rpx; */
  width: 100%;
  height: 1068rpx;
  margin: 0 auto;
}

.between{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.scroll_wrap{
  height: 1260rpx;
}

.iphoneX_scroll_wrap{
  height: 100vh;
}
.x_canvas{
  width: 345px;
  height: 610px; 
  margin: 0 auto;
}
.iphoneX{
  /* margin: 20vh 0 0; */
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

    <view class="scroll_wrap {{isX ? 'iphoneX_scroll_wrap' : ''}}">
    <scroll-view scroll-y style='height: 100%;'>

      <view class="main_wrap s_fc_2 {{isX ? 'iphoneX' : ''}}">

        <!-- <image class='poster_img' src='{{poster}}' mode='aspectFill' /> -->
        <canvas canvas-id="canvas" class="canvas {{isX ? 'x_canvas' : ''}}"></canvas>

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
      <view class='' style='width: 100%; height: 100rpx; background: transparent;'></view>

    </scroll-view>
    </view>

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
    user: null,
    info: '',
    showSuccess: false,
    valueList: null,
    poster: '',
    isX: null,
  };

  components = {
    tabBar,
    toast
  };

  onLoad(options) {
    let gd = this.$parent.globalData,
        value = options.value;
    gd.tabIndex = -1;
    this.tabBarList = gd.adviserTabBarList;

    let sys = wx.getSystemInfoSync();
    this.isX = sys.screenHeight > 800;

    console.error(options, sys);

    // from share 
    if(options.user){
      this.user = JSON.parse(options.user);
      this.valueList = JSON.parse(options.value);

      return this.drawQrcode(this.user, this.valueList);
    }

    if(value) this.value = [value.substr(0, 20), value.substr(20, 20), value.substr(40, 20)];

    this.drawQrcode(wx.getStorageSync('adviserInfo'), this.value);
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
      wx.canvasToTempFilePath({ canvasId: "canvas", x: 0, y: 0, width: this.isX ? 690 : 500, height: this.isX ? 610 : 500,
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
    let path,
        user,
        adviser = wx.getStorageSync('adviserInfo');

    user = { name: adviser.name, phone: adviser.phone };
    path = `/pages/appointment/poster?user=${JSON.stringify(this.user || user)}&value=${JSON.stringify(this.valueList || this.value)}`;
    console.error('share', path, adviser);

    return {
      path,
    };
  }

  async drawQrcode(user, value){
    wx.showLoading({ content: 'Loading...' });
    let ctx = wx.createCanvasContext('canvas'),
        adviser = wx.getStorageSync('adviserInfo');

    if(this.isX){
      ctx.drawImage('../../images/appointment/x_poster.jpg', 0, 0, 345, 610);

      ctx.setFontSize(11);
      ctx.setFillStyle('#188948');
      ctx.fillText(`${user.name}  ${user.phone}`, 65, 424);

      ctx.setFontSize(11);
      ctx.setFillStyle('#c69d75');
      ctx.fillText(`${value[0]}`, 14, 470);
      ctx.fillText(`${value[1]}`, 14, 484);
      ctx.fillText(`${value[2]}`, 14, 498);

      let res = await mp.getImg('https://castrolmini.mgcc.com.cn/qn/Fv2ZBu1lEG5m224vKqbcxM_CngjB');
      // console.error('getImg res:', res.errMsg);
      res.errMsg 
      ? wx.showModal({ content: res.errMsg, showCancel: false })
      : ctx.drawImage(res, 14, 550, 50, 50);

      ctx.draw();
      return wx.hideLoading();
    }

    ctx.drawImage('../../images/appointment/poster.jpg', 0, 0, 325, 510);

    ctx.setFontSize(11);
    ctx.setFillStyle('#188948');
    ctx.fillText(`${user.name}  ${user.phone}`, 55, 380);

    ctx.setFontSize(11);
    ctx.setFillStyle('#c69d75');
    ctx.fillText(`${value[0]}`, 14, 420);
    ctx.fillText(`${value[1]}`, 14, 432);
    ctx.fillText(`${value[2]}`, 14, 444);

    let res = await mp.getImg('https://castrolmini.mgcc.com.cn/qn/Fv2ZBu1lEG5m224vKqbcxM_CngjB');
    // console.error('getImg res:', res.errMsg);
    res.errMsg 
    ? wx.showModal({ content: res.errMsg, showCancel: false })
    : ctx.drawImage(res, 14, 450, 50, 50);

    ctx.draw();
    // ctx.draw(false, setTimeout(() => {
    //   wx.canvasToTempFilePath({ x: 0, y: 0, width: 325, height: 510, destWidth: 325, destHeight: 510, canvasId: 'canvas', 
    //     success: e => { this.poster = e.tempFilePath; this.$apply(); },
    //   });
    // }));

    
    // wx.canvasGetImageData({ canvasId: 'canvas', x: 100, y: 100, width: 10, height: 10, success(res){ console.error(res); }, fail(e){ console.error(e); } });
    wx.hideLoading();
  }
  watch = {
    poster(v1, v2){
      console.error(v1, v2);
    }
  }
}
</script>
