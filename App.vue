<script>
import Vue from 'vue'
export default {
  onLaunch: function () {
    console.log("App Launch");
    // #ifdef APP-PLUS
    // 锁定屏幕方向
    plus.screen.lockOrientation("portrait-primary"); //锁定
    // 检测升级
    uni.request({
      url: "https://uniapp.dcloud.io/update", //检查更新的服务器地址
      data: {
        appid: plus.runtime.appid,
        version: plus.runtime.version,
        imei: plus.device.imei,
      },
      success: (res) => {
        if (res.statusCode == 200 && res.data.isUpdate) {
          let openUrl =
            plus.os.name === "iOS" ? res.data.iOS : res.data.Android;
          // 提醒用户更新
          uni.showModal({
            title: "更新提示",
            content: res.data.note ? res.data.note : "是否选择更新",
            success: (showResult) => {
              if (showResult.confirm) {
                plus.runtime.openURL(openUrl);
              }
            },
          });
        }
      },
    });
    // #endif

    uni.getSystemInfo({
        success:function(e){
            Vue.prototype.statusBar = e.statusBarHeight
            // #ifndef MP
            if(e.platform == 'android') {
                Vue.prototype.navBar = e.statusBarHeight + 50
            }else {
                Vue.prototype.navBar = e.statusBarHeight + 45
            }
            // #endif
            
            // #ifdef MP-WEIXIN
            let custom = wx.getMenuButtonBoundingClientRect()
            Vue.prototype.navBar = custom.bottom + custom.top - e.statusBarHeight
            // #endif
            
            // #ifdef MP-ALIPAY
            Vue.prototype.navBar = e.statusBarHeight + e.titleBarHeight
            // #endif
        }
    });
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  globalData: {
    test: "",
  },
};
</script>

<style>
/* #ifndef APP-PLUS-NVUE */
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import "./common/uni.css";

@font-face {
  font-family: "PingFang SC";
  src: url("./static/font/PingFangSC-Regular.woff2");
}

page {
  background-color: #f4f5f6;
  height: 100%;
  font-size: 28upx;
  line-height: 1.8;
}

.page_wrap{
  font-family: "PingFang SC";
	min-height: 100vh;
  word-break: break-all;
}

.uni-header-logo {
  padding: 30upx;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10upx;
}

.uni-header-image {
  width: 100px;
  height: 100px;
}

.uni-hello-text {
  color: #7a7e83;
}

.uni-hello-addfile {
  text-align: center;
  line-height: 300upx;
  background: #fff;
  padding: 50upx;
  margin-top: 10px;
  font-size: 38upx;
  color: #808080;
}

uni-radio:not([disabled]) .uni-radio-input:hover{
	border-color: #d1d1d1;
}

.flex {
  display: flex;
  align-items: center;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.img {
  width: 100%;
  height: 100%;
  /* background-color: #000000; */
}

.mt10 {
  margin-top: 10rpx;
}
.mt20 {
  margin-top: 20rpx;
}
.mt30 {
  margin-top: 30rpx;
}
.mt40 { margin-top: 40rpx; }
.mt50 { margin-top: 50rpx; }
.mt60 {
  margin-top: 60rpx;
}
.mt70 {
  margin-top: 70rpx;
}
.mt80 {
  margin-top: 80rpx;
}
.mt100 { margin-top: 100rpx; }
.mt150 { margin-top: 150rpx; }

.mb20 { margin-bottom: 20rpx; }
.mb60 { margin-bottom: 60rpx; }

.ml10 {
  margin-left: 10rpx;
}
.ml20 {
  margin-left: 20rpx;
}
.ml24 { margin-left: 24rpx; }
.ml30 {
  margin-left: 30rpx;
}
.ml40 { margin-left: 40rpx; }
.ml48 { margin-left: 48rpx; }
.ml50 { margin-left: 50rpx; }
.ml60 { margin-left: 60rpx; }
.ml130 { margin-left: 130rpx; }
.ml140 { margin-left: 140rpx; }
.ml150 { margin-left: 150rpx; }

.mr10 {
  margin-right: 10rpx;
}
.mr20 {
  margin-right: 20rpx;
}
.mr40 {
  margin-right: 40rpx;
}

.fs20 {
  font-size: 20rpx;
}
.fs24 {
  font-size: 24rpx;
}
.fs32 { font-size: 32rpx; }
.fs36 { font-size: 36rpx; }
.fs40 {
  font-size: 40rpx;
}
.bold {
  font-weight: bold;
}

.s_fc_0 {
  color: #000;
}
.s_fc_3 {
  color: #333;
}
.s_fc_6 {
  color: #666;
}
.s_fc_9 {
  color: #999;
}
.s_fc_f {
  color: #ffffff;
}

.s_fc_block {
  color: #282d4d;
}
.s_fc_gray {
  color: #5e5c75;
}
.s_fc_main {
  color: #48deb6;
}
.s_fc_price {
  color: #eb3f36;
}

.s_bg_0 { background: #000000; }
.s_bg_f { background: #ffffff; }
.s_bg_f7 { background: #f7f7f7; }
.s_bg_f9 { background: #f9f9f9; }
.s_bg_main { background: #48deb6; }
.s_bg_price { background: #eb3f36; }

/*  */
.seckill_countdown .uni-countdown__number {
  width: 30rpx !important;
}

.seckill_goods_countdown .uni-countdown__number{
  width: 30rpx !important;
}

.form_upload {
  
}
/* #endif*/
</style>
