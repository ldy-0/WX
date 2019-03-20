<style scoped>
page {
  height: 100%;
}
.container {
  position: relative;
  height: 100%;
  overflow: hidden;
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
  margin: 80rpx 0 0;
}

.btn_wrap{
  position: relative;
  width: 360rpx;
  height: 80rpx;
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
  box-sizing: border-box;
  position: absolute;
  top: 15rpx;
  left: 0;
  width: 100%;
  padding: 0 40rpx;
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
  display: block;
  width: 680rpx;
  height: 1060rpx;
  margin: 0 auto;
}
.canvas{
  width: 680rpx;
  height: 1060rpx; 
}

.flex{
  display: flex;
  justify-content: center;
  align-items: center;
}
.between{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.scroll_wrap{
  height: 1260rpx;
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

    <view class='scroll_wrap'>
    <scroll-view scroll-y style='height: 100%;'>

    <view class="main_wrap s_fc_2">

      <image class='poster_img' src='{{goods.image}}' mode='aspectFill' />
      <!-- <canvas canvas-id="canvas" class='canvas'></canvas> -->

    </view>

    <view class='flex'>
      <view class='btn_wrap' @tap='saveImg'>
          <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
          <view class='btn_ctn s_fc_4'>{{btnTitle}}</view>
      </view>

      <!-- <button open-type='share' class='clear btn_wrap' plain='true' @tap='copy'>
          <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
          <view class='btn_ctn s_fc_4'>一键转发</view>
      </button> -->
    </view>

    <!-- <toast wx:if='{{showSuccess}}' @close.user='closeToast'>
      <view class='ctn_wrap s_fc_3'>
        <view>已复制成功</view>
        <view>请发送给您的车主</view>
      </view>
    </toast> -->
    <view class='' style='width: 100%; height: 200rpx; background: transparent;'></view>

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
    user: {},
    info: '',
    showSuccess: false,
    btnTitle: '保存至相册并扫描二维码加入嘉实多专享保障计划',
    goods: {},
  };

  components = {
    tabBar,
    toast
  };

  onLoad(options) {
    let goods,
        gd = this.$parent.globalData;

    gd.tabIndex = -1;
    // gd.clientTabBarList[0].path = `/pages/client/index?scene=${options.orderId}`;
    this.tabBarList = gd.clientTabBarList;

    try{
      goods = JSON.parse(decodeURIComponent(options.goods));      
      this.goods = goods;
    }catch(e){
      console.error('poster page err', e);
    }
    console.error(this.goods);
    // this.getUserInfo();
  }

  onShow() {}

  methods = {
    copy(){
      let data = this.info;

      wx.setClipboardData({ 
        data, 
        success: e => { wx.hideToast(); this.showSuccess = true; this.$apply(); },
      });
    },
    closeToast(){
      this.showSuccess = false;
    },
    async saveImg() {
      let that = this;

      // console.error('---', this.goods.image.replace(/http/g, 'https'));
      let res = await mp.getImg(this.goods.image);
      // console.error('getImg res:', res, '\n', res.errMsg.split(/[iI]mage/g, -Infinity));
      if(res.errMsg) return wx.showModal({ content: res.errMsg, showCancel: false })

      // wx.canvasToTempFilePath({ canvasId: "canvas", x: 0, y: 0, width: 500, height: 500,
        // success: function(res) {
          // console.error('', res);
          wx.saveImageToPhotosAlbum({
            filePath: res, // res.tempFilePath,
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
            },
            fail(err){ console.log('save img err:', err); }
          });
        // }
      // });
    }
  };

  onShareAppMessage(){
    console.error('share');
    return {};
  }

  // async getUserInfo(){
  //   this.user = {
  //     name: '李建国',
  //     address: '永达吴中路大众中心永达吴中路大众中心永达吴中路大众中心',
  //     score: 100,
  //     mobile: '13211122233',
  //   };
  // }
}
</script>
