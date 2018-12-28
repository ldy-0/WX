<style scoped>
.container {
  background: #fff;
}
.coupons-item {
  width: 650rpx;
  height: 240rpx;
  margin: 0 auto;
  position: relative;
  margin-bottom: 15rpx;
}
.coupons-itemImg {
  width: 650rpx;
  height: 240rpx;  
}
.coupons-txtbox {
  position: absolute;
  left: 0;
  top: 0;
  width: 542rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}
.coupons-txt1 {
  font-size: 70rpx;
}
.coupons-txt1 text {
  font-size: 32rpx;
}
.coupons-txt2 {
  font-size: 26rpx;
}
.coupons-txt3 {
  font-size: 24rpx;
}
.coupons-txtTop {
  font-size: 32rpx;
  width: 542rpx;
  padding-top: 18rpx;
  margin-left: 70rpx;
}
</style>  

<template>
  <view class="container">
    <view class="my_manage" wx:if="{{!is_empty}}">
      <repeat for="{{articleList}}" item="item">
        <view class="coupons-item" @tap="getcoupons({{item.id}})">
          <image
            class="coupons-itemImg"
            src="{{index==0?'../../images/img_1_1@2x.png':'../../images/img_1_2@2x.png'}}"
          >
          <view class="coupons-txtbox">
            <view class="coupons-txtTop">优惠券</view>
            <view class="coupons-txt1">
              <text>￥</text>{{20}}
            </view>
            <view class="coupons-txt2">无门槛使用</view>
            <view class="coupons-txt3">有效期至：2018-10-31</view>
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
export default class CouponList extends wepy.page {
  config = {
    navigationBarTitleText: "优惠劵列表"
  };
  data = {
    //显示提示的
    is_empty: false,
    //优惠劵列表
    articleList: [],
    //默认第一页
    page: 1
  };

  components = {
    placeholder: Placeholder
  };

  onLoad(options) {
    //获取优惠劵列表
    this.getArticleList();
    this.$apply();
  }
  //上拉加载更多
  onReachBottom() {
    this.page = this.page + 1;
    //获取优惠劵列表
    this.getArticleList();
  }
  onShow() {}
  //获取优惠劵列表
  async getArticleList() {
    wx.showLoading({
      title: "加载中..."
    });
    const res = await shttp
      .get(`/api/v2/member/information`)
      .query({
        limit: 10,
        page: this.page
      })
      .end();
    if (res.status === 0) {
      if (res.data != null && res.data.length != 0) {
        res.data.forEach((element, idx) => {
          element.information_image = JSON.parse(element.information_image);
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