<style scoped>
.container {
  background: #f4f4f4;
  height: 100vh;
  position: relative;
}
.container .red {
  height: 300rpx;
  width: 100%;
  background: #ff4444;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container .red text {
  font-size: 32rpx;
  color: #fff;
  padding-bottom: 40rpx;
}
.container .red .total .num {
  font-size: 80rpx;
  color: #fff;
}
.container .red .total .img_info {
  width: 52rpx;
  height: 42rpx;
  margin-left: 5rpx;
}
.container .body_view {
  background: #fff;
}
.container .body_view .title {
  height: 88rpx;
  color: #222222;
  font-size: 36rpx;
  line-height: 88rpx;
  padding: 0 32rpx 0 29rpx;
}
.container .body_view .list_content {
  padding: 0 32rpx 0 29rpx;
  height: 150rpx;
  display: flex;
  justify-content: space-between;
  border-top: solid 1px #f5f5f5;
}
.container .body_view .list_content .info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 60rpx;
}
.container .body_view .list_content .info .addname {
  font-size: 30rpx;
  color: #222222;
  font-weight: 700;
}
.container .body_view .list_content .info .time {
  font-size: 24rpx;
  color: #c2c2c2;
}
.container .body_view .list_content .img_a {
  width: 30rpx;
  height: 24rpx;
  margin-left: 5rpx;
}
.container .body_view .list_content .points {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 60rpx;
}
.container .body_view .list_content .points .addnum {
  font-size: 36rpx;
  color: #ff4444;
}
</style>


<template>
  <view class="container">
    <view class="red">
      <text>当前积分</text>
      <view class="total">
        <text class="num">{{myIntegral}}</text>
        <image class="img_info" src="../../images/icon_1_points@2x.png">
      </view>
    </view>
    <view class="body_view">
      <text class="title">积分明细</text>
      <repeat for="{{myList}}" item="item" key="index">
        <view class="list_content">
          <view class="info">
            <text class="addname">{{item.pl_desc}}</text>
            <view class="time">{{item.pl_addtime}}</view>
          </view>
          <view class="points">
            <text class="addnum">{{item.pl_token=="add"?'+':''}}{{item.pl_points}}</text>
            <image class="img_a" src="../../images/points@2x.png">
          </view>
        </view>
      </repeat>
    </view>
  </view>
</template>
<script>
import wepy from "wepy";
import dayjs from "dayjs";
import { shttp } from "../../utils/http";
import getTimes from "../../utils/formatedate.js";
export default class PointsDetails extends wepy.page {
  config = {
    enablePullDownRefresh: true,
    navigationBarTitleText: "我的积分"
  };
  data = {
    //积分总数
    myIntegral: 0,
    //当前页数
    page: 1,
    myList: []
  };
  computed = {};
  components = {};
  onLoad(options) {
    wx.showLoading({
      title: "玩命加载中"
    });
  }
  onShow() {
    //获取积分总数
    this.getAllIntegral();
    //获取积分详情列表
    this.getIntegralList();
  }
  //下拉刷新
  onPullDownRefresh() {
    this.page = 1;
    this.myList = [];
    //获取积分总数
    this.getAllIntegral();
    //获取积分详情列表
    this.getIntegralList();
  }
  //上拉加载更多
  onReachBottom() {
    let that = this;
    wx.showLoading({
      title: "玩命加载中"
    });
    this.page = this.page + 1;
    this.getIntegralList();
  }
  methods = {};
  //获取积分总数
  async getAllIntegral() {
    const res = await shttp
      .get(`/api/v2/member/getintegral`)
      .query({})
      .end();
    console.log(res);
    this.myIntegral = res.data.member_points;
    this.$apply();
  }
  //获取积分详情列表
  async getIntegralList() {
    const res = await shttp
      .get(`/api/v2/member/getntegralLog`)
      .query({
        limit: 10,
        page: this.page
      })
      .end();
    console.log(res);
    let list = res.data;
    for (let i = 0; i < list.length; i++) {
      this.myList.push(list[i]);
    }
    console.log(this.myList);
    wx.stopPullDownRefresh();
    wx.hideLoading();
    this.$apply();
  }
}
</script>
