
<style scoped>
.container {
  font: 32rpx PingFang-SC-Medium;
  background: #fff;
  width: 100%;
  overflow: hidden;
  height: 100vh;
}

.swiper {
  height: 400rpx;
  background: #c6c6d1;
}
.swiper image {
  width: 100%;
  height: 100%;
}

.warp {
  background: #fff;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 26rpx 40rpx;
}
.warp .title {
  font-size: 34rpx;
  line-height: 48rpx;
  color: #333333;
  height: 48rpx;
}
.warp .addtime {
  font-size: 26rpx;
  color: #a9a9a9;
  line-height: 37rpx;
  height: 37rpx;
}
.warp .content {
  font-size: 30rpx;
  color: #222222;
  line-height: 40rpx;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.warp .content .text_img {
  width: 100%;
  height: 400rpx;
}
.warp .content .text_info {
  line-height: 48rpx;
  font-size: 28rpx;
  color: #222222;
  white-space: pre-wrap;
  box-sizing: border-box;
}
.bannerImag{
  width: 100%;
  height: 425rpx;
}

.bannerImag image{
  width: 100%;
  height: 100%;
}
.msg{
  width: 100%;
  box-sizing: border-box;
  padding: 20rpx 30rpx 0;
}
.msg .msgDetail{
  display: flex;
}
.msg .msgDetail image{
  width: 26rpx;
  height: 32rpx;
}
.msg .msgDetail:nth-child(2) image{
  width: 30rpx;
  height: 26rpx;
}
.msg .msgDetail:nth-child(3) image{
  width: 29rpx;
  height: 23rpx;
}
.msg .msgDetail view{
  color: #666;
  font-size: 28rpx;
  margin-left: 16rpx;
  margin-bottom: 25rpx;
}

.detail_wrap{
  padding: 0 30rpx;
}

</style>

<template>
  <view class="container">
    <swiper
      class="swiper"
      indicator-active-color="{{indicatorActiveColor}}"
      indicator-color="{{indicatorColor}}"
      indicator-dots="{{indicatorDots}}"
      autoplay="{{autoplay}}"
      interval="{{interval}}"
      duration="{{duration}}"
      circular="true"
    >
      <repeat for="{{bannerList}}" key="index" index="index" item="item">
        <swiper-item>
          <image src="{{item}}" mode="aspectFill">
        </swiper-item>
      </repeat>
    </swiper>
    <!-- <view class="bannerImag">
      <image src = "{{companyInfomation.company_image[0]}}"/>
    </view> -->

    <view class="msg">
      <view wx:for = "{{info}}" wx:key class="msgDetail">
        <view class="info_image"><image src = '{{item.url}}'/></view>
        <view class="info_msg">{{item.msg}}</view>
      </view>
    </view>

    <view class='detail_wrap'>
      <rich-text style="width: 100%; height: auto;font-size: 28rpx;" nodes="{{detailInfo}}"></rich-text>
    </view>

  </view>
</template>


<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
import getTimes from "../utils/formatedate.js";
export default class AboutUs extends wepy.page {
  config = {
    navigationBarTitleText: "官网"
  };
  data = {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 200,
    indicatorActiveColor: "#333333",
    indicatorColor: "#FFFFFF", //以上为轮播配置
    bannerList: [], //轮播图
    detail: '',
    info:[
      { url:"../images/about/mobile.png", msg:"" },
      { url:"../images/about/address.png", msg:"" },
      { url:"../images/about/email.png", msg:"" }
    ]
  };

  components = {};

  computed = {
    detailInfo() {
      return this.detail && this.detail.replace( /<img/g, "<img style='display: block; width: 100%;'");
    },
  }

  onLoad(options) {
  }

  onShow(){
    this.getInfo();
  }

  methods = {
  };

  //获取公司信息
  async getInfo(){
    wx.showLoading({ title: 'Loading...' });

    const res = await shttp.get("/api/v2/member/about").end();
    
    console.log("-----",res.data);

    if(res && res.data){
      let data = res.data;

      this.bannerList = data.img;
      this.detail = data.desc;
      this.info[0].msg = data.phone;
      this.info[1].msg = data.address;
      this.info[2].msg = data.email;

    }
      
    this.$apply();
    wx.hideLoading();

    if(res.error) return wx.showModal({ content: res.error, showCancel: false });
  }
  
  
}
</script>
