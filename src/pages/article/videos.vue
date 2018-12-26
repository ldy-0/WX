<style scoped>
.container {
  background: #fff;
}
.video-item {
  width: 690rpx;
  margin: 0 auto;
}
.video-title {
  font-size: 28rpx;
  letter-spacing: 0rpx;
  color: #222222;
  margin-top: 15rpx;
  margin-bottom: 35rpx;
}
</style>  

<template>
  <view class="container">
    <view class="my_manage" wx:if="{{!is_empty}}">
      <repeat for="{{articleList}}" item="item">
        <view class="video-item">
          <video
            style="width:100%;height:350rpx;"
            id="{{item.video_id}}"
            src="{{item.video_lik}}"
            controls
            poster="{{item.video_image[0]}}"
            show-fullscreen-btn
          ></video>
          <view class="video-title">{{item.video_title}}</view>
        </view>

        <!-- <view class="row_between" @tap="gotoNews({{item.information_id}})">
          <view class="flex">
            <image class="icon" src="{{item.video_image[0]}}" mode="aspectFill">
            <view class="pageInfo">
              <view class="title">{{item.video_title}}</view>
              <view class="time">{{item.addtime}}</view>
            </view>
          </view>
        </view>-->
      </repeat>
    </view>
    <!--暂无数据显示-->
    <placeholder :show.sync="is_empty" message="还没有相关的内容"></placeholder>
  </view>
</template>

<script>
import wepy from "wepy";

import Placeholder from "../../components/placeholder";
import getTimes from "../../utils/formatedate.js";
import { shttp } from "../../utils/http";
export default class Videos extends wepy.page {
  config = {
    navigationBarTitleText: "视频"
  };
  data = {
    //显示提示的
    is_empty: false,
    //视频列表
    articleList: [],
    //默认第一页
    page: 1
  };

  components = {
    placeholder: Placeholder
  };

  onLoad(options) {
    //获取视频列表
    this.getArticleList();
    this.$apply();
  }
  //上拉加载更多
  onReachBottom() {
    this.page = this.page + 1;
    //获取视频列表
    this.getArticleList();
  }
  onShow() {}
  //获取视频列表
  async getArticleList() {
    wx.showLoading({
      title: "加载中..."
    });
    const res = await shttp
      .get(`/api/v2/member/video`)
      .query({
        limit: 10,
        page: this.page
      })
      .end();
    if (res.status === 0) {
      if (res.data != null && res.data.length != 0) {
        res.data.forEach((element, idx) => {
          element.video_image = JSON.parse(element.video_image);
          element.addtime = getTimes.formatTime(
            element.addtime * 1000,
            "Y-M-D"
          );
        });
        this.articleList = this.articleList.concat(res.data);
      }
    }
    if (this.articleList.length == 0) {
      this.is_empty = true;
    } else {
      this.is_empty = false;
    }
    wx.hideLoading();
    this.$apply();
  }

  methods = {
    //进入新闻详情
    gotoNews(id) {
      wx.navigateTo({
        url: "./advisoryDetail?id=" + id
      });
    }
  };
}
</script>