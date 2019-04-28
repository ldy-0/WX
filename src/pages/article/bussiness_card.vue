
<style scoped>
.container {
  min-height: 100%;
  background: #fff;
}

.swiper {
  height: 400rpx;
  background: #c6c6d1;
}
.swiper image {
  width: 100%;
  height: 100%;
}

.detail_wrap{
  padding: 30rpx;
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

    <view class='detail_wrap'>
      <rich-text style="width: 100%; height: auto;font-size: 28rpx;" nodes="{{detail}}"></rich-text>
    </view>

  </view>
</template>

<script>
import wepy from "wepy";

import getTimes from "../../utils/formatedate.js";
import { shttp } from "../../utils/http";

export default class Videos extends wepy.page {
  config = {
    navigationBarTitleText: "招商"
  };
  data = {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 200,
    indicatorActiveColor: "#333333",
    indicatorColor: "#FFFFFF", //以上为轮播配置
    bannerList: [],
    detail: '',
  };

  components = {
  };

  onLoad(options) {
  }

  onShow(){
    this.getInfo();
  }

  async getInfo() {
    let param = { };
    wx.showLoading({ title: "加载中..." });

    const res = await shttp.get(`/api/v2/member/business/1`).query(param).end();

    if(res && res.data){

      this.bannerList = res.data.img;
      this.detail = res.data.desc.replace( /<img/g, "<img style='display: block; width: 100%;'");
    }
    
    wx.hideLoading();
    this.$apply();

    if(res.error) return wx.showModal({ content: res.error, showCancel: false });
  }

  methods = {
  };
}
</script>