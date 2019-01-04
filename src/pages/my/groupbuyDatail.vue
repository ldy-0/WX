<style scoped>
.nodata {
  margin-top: 50%;
  font-size: 38rpx;
  text-align: center;
}
.wire-gray {
  height: 20rpx;
  width: 100%;
  background: #f4f4f4;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 68rpx;
  padding: 0 30rpx;
  color: #202020;
  border-bottom: 1rpx solid #e5e5e5;
  background: #fff;
}
.product_info {
  border-top: 1rpx solid #e5e5e5;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #e5e5e5;
  background: #fff;
}
.product_info image {
  width: 310rpx;
  height: 310rpx;
}
.product_info .product {
  width: 350rpx;
  height: 300rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.product_info .product .product_title {
  color: #333;
  font-size: 32rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.product_info .product .product_price {
  font-size: 36rpx;
  color: #ff7900;
  padding-top: 20rpx;
}
.product_info .product .product_address,
.product_info .product .product_number {
  font-size: 28rpx;
  color: #888;
}
.product_info .product .product_standard {
  font-size: 24rpx;
  color: #888;
  width: 100%;
  height: 35rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.row .row-text {
  font-size: 22rpx;
  color: #8c8c8c;
}
.container {
  font: 32rpx PingFang-SC-Medium;
  color: #000;
  min-height: 100vh;
  background: #f4f4f4;
}
.group-xhx {
  text-decoration: underline;
}
.groupon-box {
  background: #fff;
  padding-bottom: 40rpx;
}
.groupon-txt1 {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34rpx;
  width: 100%;
  text-align: center;
  padding-top: 55rpx;
}
.groupon-txt1 image {
  width: 42rpx;
  height: 42rpx;
  padding-right: 14rpx;
}
.groupon-txt2 {
  width: 100%;
  text-align: center;
  font-size: 28rpx;
}
.groupon-txt2 text {
  color: #af0000;
}
.groupon-imgList {
  margin: 30rpx 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.grouponer-image {
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  background: #f1f1f2;
  border: 1rpx dotted #a0a0a0;
  margin-right: 20rpx;
  background: #f1f1f2;
  margin-bottom: 20rpx;
}
.btn-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 36rpx;
}
.groupon-btn {
  width: 168rpx;
  height: 44rpx;
  text-align: center;
  line-height: 44rpx;
  border: 1rpx solid #ff7900;
  border-radius: 10rpx;
  font-size: 28rpx;
  color: #ff7900;
}
.groupon-nobtn {
  width: 168rpx;
  height: 44rpx;
  text-align: center;
  line-height: 44rpx;
  border: 1rpx solid gray;
  border-radius: 10rpx;
  font-size: 28rpx;
  color: gray;
}
.time-style {
  display: flex;
  justify-content: center;
  align-items: center;
}
.over_model {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  width: 100%;
  height: 100%;
  top: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.save_btn {
  width: 280rpx;
  height: 60rpx;
  background: #fff;
  line-height: 60rpx;
  border: 1rpx solid #000;
  border-radius: 10rpx;
  text-align: center;
  margin-top: 20rpx;
}
.groupon-tagList {
  width: 290rpx;
  margin: 0 auto;
  margin-top: 40rpx;
}
.groupon-tag3 {
  width: 290rpx;
  height: 50rpx;
  color: #fff;
  font-size: 28rpx;
  text-align: center;
  line-height: 50rpx;
  border-radius: 25rpx;
  margin-bottom: 20rpx;
  background: #feaa26;
}
</style>


<template>
  <view class="container">
    <view class="product_info">
      <image src="{{details.goods_image}}" mode="aspectFill">
      <view class="product">
        <view class="product_title">{{details.goods_name}}</view>
        <view class="row">
          <view class="row-text">{{details.pintuangroup_limit_number}}人团</view>
          <view class="row-text">已团{{details.goods_salenum}}件</view>
          <view class="product_price">¥{{details.goods_pintuan_price}}</view>
        </view>
      </view>
    </view>
    <view class="groupon-box">
      <view class="groupon-txt1" wx:if="{{details.pintuangroup_state == 2}}">
        <image src="../../images/icon_chenggong@2x.png">拼团成功
      </view>
      <view class="groupon-txt1" wx:if="{{details.pintuangroup_state == 0}}">
        <image src="../../images/icon_shibai@2x.png">拼团失败
      </view>
      <view class="groupon-txt1" wx:if="{{details.pintuangroup_state == 1}}">
        <image src="../../images/icon_pintuanzhong@2x.png">拼团中
      </view>
      <view class="groupon-imgList">
        <repeat for="{{details.member_avatar}}" item="item">
          <image src="{{item}}" class="grouponer-image" mode="aspectFill">
        </repeat>
      </view>
      <view class="groupon-txt2" wx:if="{{details.pintuangroup_state == 2&&!share}}">商家正在努力发货，请耐心等待！</view>
      <view class="groupon-txt2" wx:if="{{details.pintuangroup_state == 2&&share}}">名额已满，已结束</view>
      <view class="groupon-txt2" wx:if="{{details.pintuangroup_state == 0}}">名额未满，已结束</view>
      <view
        class="groupon-txt2 time-style"
        wx:if="{{details.pintuangroup_state == 1&&!details.withrank}}"
      >仅剩
        <text>{{details.pintuangroup_surplus}}</text>
        个名额，{{wxTimerList['wxTimer1'].d!=0?wxTimerList['wxTimer1'].d+'天':''}} {{wxTimerList['wxTimer1'].wxTimer}}后结束
      </view>

      <view class="btn-box">
        <view class="groupon-btn" @tap="getQT" wx:if="{{!share}}">专属海报</view>

        <view class="groupon-btn" @tap="goOrder" wx:if="{{!share}}">查看订单</view>
        <view class="groupon-btn" @tap="gohome">继续逛逛</view>
      </view>
    </view>
    <!-- QT -->
    <view class="over_model" @tap="closeModel" wx:if="{{isShowQT}}" catchtouchmove="{{true}}">
      <view class="poster_model">
        <canvas canvas-id="canvas" style="width: 340px; height: 500px;"></canvas>
      </view>

      <view class="save_btn" @tap="saveImg">保存</view>
    </view>
  </view>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import timer from "../../utils/wxTimer";
import dayjs from "dayjs";
export default class GroupbuyDatail extends wepy.page {
  config = {
    navigationBarTitleText: "拼团详情"
  };
  data = {
    details: null,
    wxTimerList: {},
    wxTimer1: null,
    pintuanId: null,
    isShowQT: false,
    rankNum: null
  };
  components = {};

  onLoad(options) {
    this.pintuanId = options.id;
  }

  onShow() {
    this.getgroupDetails(this.pintuanId);
    if (this.wxTimer1 != null) {
      this.wxTimer1.stop();
      this.wxTimerList = {};
    }
  }
  methods = {};
  async getgroupDetails(id) {
    const res = await shttp
      .get(`/api/v1/member/mygroupbuy`)
      .send({
        pintuan_id: id
      })
      .end();
    if (res.status == 0) {
      this.details = res.data;
      //开启第一个定时器
      if (this.details.pintuangroup_state == 1) {
        let endTime = this.details.pintuangroup_endtime * 1000;
        let startTime = new Date().getTime();
        if (startTime < endTime) {
          let hour = dayjs(endTime).diff(dayjs(startTime), "hour");
          let diffhour = hour * 60;
          let minute = dayjs(endTime).diff(dayjs(startTime), "minute");
          let diffminute = minute * 60;
          minute -= diffhour;
          let second = dayjs(endTime).diff(dayjs(startTime), "second");
          second -= diffminute;
          let beginTime = hour + ":" + minute + ":" + second;
          var wxTimer1 = new timer({
            beginTime: beginTime,
            name: "wxTimer1",
            complete: function() {
              this.details.pintuangroup_state = 0;
            }
          });
          wxTimer1.start(this);
          this.wxTimer1 = wxTimer1;
        }
      }
    }
    this.$apply();
  }
  goOrder() {
    wx.navigateTo({
      url: `/pages/store/orderdetail?orderId=${this.details.order_id}`
    });
  }
  gohome() {
    wx.reLaunch({
      url: "/pages/home"
    });
  }

  async getQT() {
    this.isShowQT = true;
    wx.showLoading({ title: "loading..." });
    let content = wx.createCanvasContext("canvas");
    content.setFillStyle("#ffffff");
    content.fillRect(0, 0, 340, 500);
    await this.drawImage(
      {
        img:
          "https://admin-1256953590.cos.ap-shanghai.myqcloud.com/1537343505167%E7%BB%84-6%402x.png",
        top: 0,
        left: 0,
        width: 340,
        height: 500
      },
      content
    );
    let goodsImg = this.details.goods_image;
    if (goodsImg.slice(0, 5) == "http:") {
      goodsImg = goodsImg.replace("http:", "https:");
    } else {
      goodsImg = goodsImg.replace("file", "cos.ap-shanghai");
    }
    await this.drawImage(
      {
        img: goodsImg,
        top: 75,
        left: 120,
        width: 100,
        height: 100
      },
      content
    );
    const shopId = wx.getStorageSync("shopId");
    const member_id = wx.getStorageSync("memberInfo").member_id;
    const res = await shttp
      .post("/api/v1/member/wxcode")
      .send({
        page: "pages/store/goodsDetails",
        scene:
          "grouponing;" +
          this.details.pintuangroup_id +
          ";" +
          this.details.pintuangroup_goods_commonid +
          ";" +
          shopId +
          ";" +
          member_id,
        width: 350, // 430
        is_hyaline: true // false,
      })
      .end();
    let qrpicUrl = res.data.url;
    await this.drawImage(
      {
        img: qrpicUrl.replace(/http/, "https"),
        top: 275,
        left: 105,
        width: 125,
        height: 125
      },
      content
    );
    content.fillStyle = "#000000";
    content.setTextAlign("center");
    content.setFontSize(18);
    content.fillText(this.details.goods_name, 170, 200);
    content.setTextAlign("center");
    content.fillStyle = "#ff7900";
    content.setFontSize(17);
    content.fillText("￥" + this.details.goods_pintuan_price + "元", 170, 230);

    content.draw(true);

    wx.hideLoading();
  }
  async drawImage(data, ctx) {
    console.log(data);
    let res = await new Promise((res, rej) => {
      wx.getImageInfo({
        src: data.img,
        success(e) {
          console.log(e);
          res(e.path);
        },
        fail(e) {
          console.log(e);
          rej(e);
        }
      });
    }).catch(e => {
      return e;
    });

    if (res.errMsg) {
      return wx.showModal({
        title: "提示",
        content: res.errMsg,
        showCancel: false
      });
    }
    console.log("draw", res);

    ctx.drawImage(
      res,
      data.left ? data.left : 0,
      data.top ? data.top : 0,
      data.width ? data.width : 100,
      data.height ? data.height : 100
    );
  }
  saveImg() {
    let that = this;
    wx.canvasToTempFilePath({
      canvasId: "canvas",
      x: 0,
      y: 0,
      width: 500,
      height: 500,
      success: function(res) {
        console.log(res);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(e) {
            wx.showToast({
              title: "保存成功!",
              icon: "success",
              duration: 2000
            });
            that.isShowQT = false;
            that.$apply();
          },
          fail: function(res) {
            if (
              res.errMsg === "saveImageToPhotosAlbum:fail:auth denied" ||
              res.errMsg === "saveImageToPhotosAlbum:fail auth denied"
            ) {
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
  closeModel() {
    this.isShowQT = false;
    this.$apply();
  }
  onUnload() {
    if (this.wxTimer1 != null) {
      this.wxTimer1.stop();
      this.wxTimerList = {};
      this.wxTimer1 = null;
    }
  }
}
</script>
