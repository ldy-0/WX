<style scoped>
.tips {
  width: 100%;
  text-align: center;
  line-height: 100rpx;
  font-size: 30rpx;
}

.link-list > navigator {
  position: relative;
  margin: 5rpx 0;
  padding-right: 50rpx;
  line-height: 88rpx;
  background: white;
}

.link-list text {
  display: block;
  text-indent: 20rpx;
  font-size: 32rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.link-list image {
  width: 16rpx;
  height: 25rpx;
  margin-top: -12rpx;
  position: absolute;
  right: 20rpx;
  top: 50%;
}

.search {
  overflow: hidden;
  height: 108rpx;
  font: 28rpx PingFang-SC-Medium;
  color: #969696;
  background: #fff;
  text-align: center;
}
.search .search_content {
  width: 690rpx;
  line-height: 68rpx;
  margin: 20rpx auto;
  border-radius: 34rpx;
  background: #f2f2f2;
}

.search_text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-search {
  width: 40rpx;
  height: 40rpx;
}

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

.container {
  font: 32rpx PingFang-SC-Medium;
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
</style>

<template>
  <view class="container">
      <swiper class="swiper"  indicator-active-color="{{indicatorActiveColor}}" indicator-color="{{indicatorColor}}" indicator-dots="{{indicatorDots}}" autoplay="{{autoplay}}" interval="{{interval}}"  duration="{{duration}}"  circular="true">

            <repeat for="{{bannerList}}" key="index" index="index" item="item">   
          <swiper-item>
            <image src="{{item.url}}"  mode="aspectFill" />
          </swiper-item>
            </repeat> 
      </swiper> 
      <view class="warp">
      <view class="title">{{detailArticle.dynamic_title}}</view>  
       <!-- <view class="addtime">{{detailArticle.dynamic_created_at}}</view>   -->
        <repeat for="{{detailArticle.dynamic_content}}" key="index" index="index" item="itemInfo">   
       <view class="content">
              <image class="text_img" wx:if="{{itemInfo.Repeat_images[0].url}}" src="{{itemInfo.Repeat_images[0].url}}" mode="aspectFill"  ></image>
           <view class="text_info">
              {{itemInfo.Repeat_title}}
           </view>
       </view>
         </repeat> 
       </view>
   </view>
</template>


<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import getTimes from "../../utils/formatedate.js";
export default class AboutUs extends wepy.page {
  config = {
    navigationBarTitleText: "关于云仓"
  };
  data = {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 200,
    indicatorActiveColor: "#333333",
    indicatorColor: "#FFFFFF", //以上为轮播配置
    bannerList: [], //轮播图
    detailArticle: {} //案例详情
  };

  components = {};

  onLoad(options) {
    this.getCompanyList();
  }

  onShow() {}
  methods = {
    //进入商品详情
    intoDetail(id) {
      // console.log(id)
      wx.navigateTo({
        url: `store/goodsDetails?goods_commonid=${id}`
      });
    }
  };
  //获取公司列表
  async getCompanyList() {
    const res = await shttp
      .get(`/api/v2/member/dynamic`)
      .query({
        dynamic_type: "company"
      })
      .end();
    let list = res.data;
    if (res.status === 0) {
      if (list.length == 0) {
        wx.hideLoading();
        return wx.showToast({
          title: "暂无公司介绍",
          icon: "none",
          duration: 2000
        });
      } else {
        this.getCompanyDetail(list[0].dynamic_id);
      }
    }
    wx.stopPullDownRefresh();

    this.$apply();
  }
  //获取公司详情
  async getCompanyDetail(id) {
    const res = await shttp.get("/api/v2/member/dynamic/" + id).end();
    if (res.status === 0) {
      this.bannerList = JSON.parse(res.data.dynamic_images);
      this.detailArticle = res.data;
      this.detailArticle.dynamic_content = JSON.parse(res.data.dynamic_content);
      this.detailArticle.dynamic_created_at = getTimes.formatTime(
        res.data.dynamic_created_at * 1000,
        "Y-M-D h:m:s"
      );
    } else {
      wx.hideLoading();
    }
    wx.stopPullDownRefresh();
    wx.hideLoading();
    this.$apply();
  }
}
</script>
