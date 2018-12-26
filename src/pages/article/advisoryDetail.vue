<style scoped>
.container {
  background: #f4f4f4;
  width: 100%;
  overflow: hidden;
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
  padding: 26rpx 30rpx;
}
.warp .title {
  font-size: 34rpx;
  color: #000;
  padding-bottom: 15rpx;
}
.warp .addtime {
  font-size: 26rpx;
  color: #666;
  padding-bottom: 20rpx;
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
}
.warp .content .text_info {
  line-height: 48rpx;
  font-size: 28rpx;
  color: #222222;
  white-space: pre-wrap;
  box-sizing: border-box;
}
</style>

<template>
  <view class="container">
    <!-- <swiper
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
    </swiper> -->
    <image style="height:400rpx;width: 100%;" src="{{bannerList[0]}}" mode="aspectFill">
    <view class="warp">
      <view class="title">{{detailArticle.information_title}}</view>
      <view class="addtime">{{detailArticle.addtime}}</view>
      <rich-text style="width: 100%; height: auto;font-size: 28rpx;" nodes="{{detailArticle.information_content}}"></rich-text>
    </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import getTimes from "../../utils/formatedate.js";
export default class AdvisoryDetail extends wepy.page {
  config = {
    navigationBarTitleText: "新闻详情"
  };
  data = {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 200,
    indicatorActiveColor: "#333333",
    indicatorColor: "#FFFFFF", //以上为轮播配置
    bannerList: [], //轮播图
    detailArticle: null //新闻详情
  };

  computed = {};

  onLoad(options) {
    this.getNewsDetail(options.id);
  }

  onShow() {}
  methods = {};
  //获取新闻详情
  async getNewsDetail(id) {
    const res = await shttp.get("/api/v2/member/information/" + id).end();
    if (res.status === 0) {
      this.bannerList = JSON.parse(res.data.information_image);
      this.detailArticle = res.data;
      this.detailArticle.addtime = getTimes.formatTime(
        res.data.addtime * 1000,
        "Y-M-D"
      );
    } else {
      wx.hideLoading();
    }
    this.$apply();
  }
}
</script>
