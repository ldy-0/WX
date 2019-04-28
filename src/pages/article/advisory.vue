<style scoped>
.container {
  background: #fff;
}

.flex {
  display: flex;
  align-items: center;
}
.flex image {
  margin-right: 38rpx;
}
.flex .pageInfo {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  height: 156rpx;
  width: 448rpx;
}
.flex .pageInfo .title {
  color: #222;
  width: 100%;
  font-size: 30rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.flex .pageInfo .time {
  font-size: 30rpx;
  color: #888;
}
.row_between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 30rpx;
  border-bottom: 1rpx solid #eeeeee;
  background: #fff;
  font-size: 25rpx;
  color: #aaaaaa;
  height: 240rpx;
}
.row_between .icon {
  width: 200rpx;
  height: 200rpx;
  border-radius: 10px;
}
</style>  

<template>
  <view class="container">
    <view class="my_manage" wx:if='{{!is_empty}}'>
      <repeat for="{{articleList}}" item="item">
        <view class="row_between" @tap="gotoNews({{item.information_id}})">
          <view class="flex">
            <image class="icon" src="{{item.information_image}}" mode="aspectFill">
            <view class="pageInfo">
              <view class="title">{{item.information_title}}</view>
              <view class="time">{{item.addtime}}</view>
            </view>
          </view>
        </view>
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
export default class Mine extends wepy.page {
  config = {
    navigationBarTitleText: ""
  };
  data = {
    titleMap: {
      1: '公司新闻',
      2: '行业动态',
      3: '产品案例',
      4: '合作案例',
    },
    //显示提示的
    is_empty: false,
    //文章列表
    articleList: [],
    //默认第一页
    page: 1
  };

  components = {
    placeholder: Placeholder
  };

  onLoad(options) {
    this.classify_id = options.classify_id;

    wx.setNavigationBarTitle({ title: this.titleMap[this.classify_id] });

    //获取文章列表
    this.getArticleList();
    this.$apply();
  }
  //上拉加载更多
  onReachBottom() {
    this.page = this.page + 1;
    //获取文章列表
    this.getArticleList();
  }
  onShow() {}
  //获取文章列表
  async getArticleList() {
    let param = { limit: 10, page: this.page, classify_id: this.classify_id };

    wx.showLoading({
      title: "加载中..."
    });

    const res = await shttp.get(`/api/v2/member/information`).query(param).end();
    if (res.status === 0) {
      if (res.data != null && res.data.length != 0) {
        res.data.forEach((element, idx) => {
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
      let url = `/pages/article/advisoryDetail?id=${id}&classify_id=${this.classify_id}`;

      wx.navigateTo({ url });
    }
  };
}
</script>