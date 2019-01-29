<style>
page {
  background: #f5f5f5;
}
.container {
  min-height: 100%;
  font: 32rpx PingFang-SC-Medium;
}

.column {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
}

.column_center {
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #888;
  font-size: 20rpx;
}

.store_info_wrap{
  padding: 0 30rpx;
}
.store_info{
  font-size: 28rpx;
}

.store_mobile, .store_address, .store_email{
  margin: 10rpx 0;
}

.store_desc{
  margin: 30rpx 0 0;
  line-height: 48rpx;
}

.i_mobile, .i_address, .i_email{
  flex-shrink: 0;
  margin-right: 20rpx;
  /* background: gray; */
}
.i_mobile{
  width: 26rpx;
  height: 32rpx;
}
.i_address{
  width: 30rpx;
  height: 26rpx;
}
.i_email{
  width: 30rpx;
  height: 23rpx;
}

.info{
  height: 1.2em;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


.i_right_arrow{
  flex-shrink: 0;
  width: 12rpx;
  height: 22rpx;
  margin-left: 10rpx;
  background: gray;
}


.flex{
  display: flex;
}
.between{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.s-fc-1{ color: #fff; }
.s-fc-2{ color: #666; }
.s-fc-3{ color: #333; }
.s-fc-5{ color: #10325f; }

.s-bg-1{ background: #fff; }
</style>

<template>
  <view class="container s-bg-1">

      <view class='slide_wrap'>
        <slide :config.sync='slideConfig'></slide>
      </view>

      <view class='store_info_wrap'>

        <view class='store_info s-fc-2 s-bg-1'>

          <!-- <repeat for='{{configList}}' wx:key='index'> -->
            <view class='store_mobile flex'>
              <image class='i_mobile' src='{{mobileURL}}' />
              <view class=''>18812345678</view>
            </view>

            <view class='store_address flex' style='align-items: center;'>
              <image class='i_address' src='{{addressURL}}' />
              <view>{{store.store_address}}</view>
            </view>

            <view class='store_email flex' style='align-items: center;'>
              <image class='i_email' src='{{emailURL}}' />
              <view class=''>bby@163.com</view>
            </view>
          <!-- </repeat> -->

            <rich-text class='store_desc s-fc-3' nodes='{{desc}}'></rich-text>

        </view>
      </view>


    <!-- QT -->
    <!-- <view class="over_model" @tap="closeModel" wx:if="{{isShowQT}}" catchtouchmove="{{true}}">
      <view class="poster_model">
        <canvas canvas-id="canvas" style="width: 275px; height: 440px;"></canvas>
      </view>
      <view class="save_btn" @tap="saveImg">保存</view>
    </view> -->
    <!--shareBox -->
    <!-- <view class="over_model" wx:if="{{isShare}}" catchtouchmove="{{true}}">
      <view class="shareBox">
        <button class="share" plain="true" open-type="share" @tap="closeShare">
          <view class="shareBox-item">发送给朋友</view>
        </button>
        <view class="shareBox-item" @tap="getQrCode">生成海报</view>
        <view class="shareBox-item" @tap="closeShare">取消</view>
      </view>
    </view> -->
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import { getCode } from "../../utils/user-tools";
import getTimes from "../../utils/formatedate.js";
import backTop from "../../components/backTop";
import slide from "../../components/slide";
import dayjs from "dayjs";
import timer from "../../utils/wxTimer";
import {
  showSuccessToast,
  showFailToast,
  exploitToast
} from "../../utils/tools";
export default class GoodsDetails extends wepy.page {
  config = {
    navigationBarTitleText: "关于手艺铺子"
  };
  data = {
    mobileURL: '../../images/store/mobile.png',
    addressURL: '../../images/store/address.png',
    emailURL: '../../images/store/email.png',
    slideConfig: {
      height: 426,
      urls: [],
      indicatorDots: false,
      indicatorActiveColor: "#333333",
      indicatorColor: "#FFFFFF", 
    },
    store: {},
    desc: '',
    id: null,
    isShare: false,
  };

  computed = {
    serviceList(){ return this.store && this.store.serviceList; },
    commentList(){ return this.store && this.store.commentList; },
  };

  components = {
    backTop,
    slide
  };
  methods = {
    goAbout(){
      wx.navigateTo({ url: `pages/store/about?id=${11}` });
    },
    onShareAppMessage: function(res) {
      return {
        title: this.goods.goods_name,
        path: `pages/store/goodsDetails?shareType=activity&goods_commonid=${
          this.goods.goods_commonid
        }`,
        success: function(res) {
          // 转发成功
          wx.showToast({
            title: "转发成功",
            icon: "success",
            duration: 2000
          });
        },
        fail: function(res) {
          // 转发失败
        }
      };
    },

  };
  onLoad(option) {
    this.id = option.id;
    this.scene = decodeURIComponent(option.scene);

    this.getStore();

    this.getAbout();
  }
  onShow() {
  }

  async getStore(){
    wx.showLoading({ title: 'Loading...' });
    let location = wx.getStorageSync('location');

    let res = await shttp.get(`/api/v2/member/storeinfo/${this.id}?latitude=${location.latitude}&longitude=${location.longitude}&store_id=${this.id}`).end();

    if(res && res.data){
      let store = res.data,
          time = store.store_workingtime.split('|');

      // this.slideConfig.urls = store.store_images;
      // distance 
      // store.distance = store.distance > 1000 ? `${(store.distance / 1000).toFixed(0)}KM` : `${store.distance.toFixed(0)}M`;
      
      // time
      let t = time[1].split(',').map(v => { 
        let d = new Date(v); 
        return `${d.getHours() < 10 ? '0' : '' + d.getHours()}:${d.getMinutes() < 10 ? '0' : '' + d.getMinutes()}`; 
      });
      store.time = `${t[0]}-${t[1]}`;

      this.store = store;
    }

    this.$apply();
    wx.hideLoading();
  }

  async getAbout(){
    let res = await shttp.get(`/api/v2/common/about`).end();

    if(res && res.data){
      let o = res.data.split('&|');

      this.slideConfig.urls = (JSON.parse(o[0])).map(v => v.url);

      this.desc = o[1].replace(/<img/g, "<img style='display: block; width: 100%;'");
      
    }

    this.$apply();
  }
  
  //获取二维码
  // async getQrCode() {
  //   this.isShowQT = true;
  //   this.$apply();
  //   this.isShare = false;
  //   wx.showLoading({ title: "loading..." });
  //   let content = wx.createCanvasContext("canvas");
  //   content.setFillStyle("#ffffff");
  //   content.fillRect(0, 0, 275, 440);
  //   let goodsImg = this.goods.goods_image;
  //   await this.drawImage(
  //     {
  //       img: goodsImg,
  //       top: 0,
  //       left: 0,
  //       width: 275,
  //       height: 275
  //     },
  //     content
  //   );
  //   const res = await shttp
  //     .post("/api/v2/member/wxcode")
  //     .send({
  //       page: "pages/store/goodsDetails",
  //       scene: this.id + ";",
  //       width: 350, // 430
  //       is_hyaline: true // false,
  //     })
  //     .end();
  //   let qrpicUrl = res.data.url;
  //   await this.drawImage(
  //     {
  //       img: qrpicUrl.replace(/http/, "https"),
  //       top: 320,
  //       left: 180,
  //       width: 80,
  //       height: 80
  //     },
  //     content
  //   );
  //   content.fillStyle = "#000000";
  //   // content.setTextAlign("center");
  //   content.setFontSize(14);
  //   content.fillText(this.goods.goods_name, 20, 315, 140);
  //   content.fillStyle = "#dd3d27";
  //   content.setFontSize(14);
  //   content.fillText("￥", 20, 380);
  //   content.setFontSize(21);
  //   content.fillText(this.goods.goods_price, 32, 380);
  //   content.fillStyle = "#b9b9b9";
  //   content.setTextAlign("center");
  //   content.setFontSize(6);
  //   content.fillText("扫描或长按小程序码", 220, 410);
  //   content.draw(true);
  //   wx.hideLoading();
  // }
  // async drawImage(data, ctx) {
  //   console.log(data);
  //   let res = await new Promise((res, rej) => {
  //     wx.getImageInfo({
  //       src: data.img,
  //       success(e) {
  //         console.log(e);
  //         res(e.path);
  //       },
  //       fail(e) {
  //         console.log(e);
  //         rej(e);
  //       }
  //     });
  //   }).catch(e => {
  //     return e;
  //   });

  //   if (res.errMsg) {
  //     return wx.showModal({
  //       title: "提示",
  //       content: res.errMsg,
  //       showCancel: false
  //     });
  //   }
  //   console.log("draw", res);

  //   ctx.drawImage(
  //     res,
  //     data.left ? data.left : 0,
  //     data.top ? data.top : 0,
  //     data.width ? data.width : 100,
  //     data.height ? data.height : 100
  //   );
  // }
  // saveImg() {
  //   let that = this;
  //   wx.canvasToTempFilePath({
  //     canvasId: "canvas",
  //     x: 0,
  //     y: 0,
  //     width: 500,
  //     height: 500,
  //     success: function(res) {
  //       console.log(res);
  //       wx.saveImageToPhotosAlbum({
  //         filePath: res.tempFilePath,
  //         success(e) {
  //           wx.showToast({
  //             title: "保存成功!",
  //             icon: "success",
  //             duration: 2000
  //           });
  //           that.isShowQT = false;
  //           that.$apply();
  //         },
  //         fail: function(res) {
  //           if (
  //             res.errMsg === "saveImageToPhotosAlbum:fail:auth denied" ||
  //             res.errMsg === "saveImageToPhotosAlbum:fail auth denied"
  //           ) {
  //             wx.openSetting({
  //               success(settingdata) {
  //                 if (settingdata.authSetting["scope.writePhotosAlbum"]) {
  //                   console.log("获取权限成功，再次点击图片保存到相册");
  //                 } else {
  //                   console.log("获取权限失败");
  //                 }
  //               }
  //             });
  //           }
  //         }
  //       });
  //     }
  //   });
  // }
  closeModel() {
    this.isShowQT = false;
    this.$apply();
  }
  swiperchange(e) {
    this.current = e.detail.current + 1;
  }
  // async enshrine() {
  //   const res = await shttp
  //     .post("/api/v2/member/enshrine")
  //     .send({
  //       goods_commonid: this.id
  //     })
  //     .end();
  //   if (res.status === 0) {
  //     wx.showToast({
  //       title: "收藏成功!",
  //       icon: "success",
  //       duration: 2000
  //     });
  //   } else if (res.status === 1) {
  //     wx.showToast({
  //       title: res.error,
  //       icon: "none",
  //       duration: 2000
  //     });
  //   }
  // }

  showShare() {
    this.isShare = true;
  }
  closeShare() {
    this.isShare = false;
  }
  onUnload() {}
  deleteBtn() {
    this.showStandard = false;
  }

}
</script>

