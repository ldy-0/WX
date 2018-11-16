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
  background: #f4f4f4;
  height: 100vh;
  position: relative;
}
.container .red {
  height: 300rpx;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAEsCAIAAAATt6G/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQzOTVFRDk5OUY2RDExRTg4NDJEQ0EzNTJBRTUwNTgzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQzOTVFRDlBOUY2RDExRTg4NDJEQ0EzNTJBRTUwNTgzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDM5NUVEOTc5RjZEMTFFODg0MkRDQTM1MkFFNTA1ODMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDM5NUVEOTg5RjZEMTFFODg0MkRDQTM1MkFFNTA1ODMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4qEACPAAAdyElEQVR42uzd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);
}
.container .red text {
  font-size: 32rpx;
  color: #fff;
}
.container .red .sharelist {
  font-size: 28rpx;
  color: #fff;
  position: absolute;
  text-decoration: underline;
  top: 25rpx;
  right: 20rpx;
}
.container .red .total_info {
  font-size: 20rpx;
  letter-spacing: 2rpx;
}
.container .red .total .num {
  font-size: 95rpx;
  color: #fff;
}
.container .red .total .img_info {
  width: 52rpx;
  height: 42rpx;
}
.container .red .withdraw {
  font-size: 28rpx;
  color: #fff;
  width: 132rpx;
  height: 41rpx;
  text-align: center;
  margin: 0 auto;
  border: solid 1rpx #fff;
  border-radius: 20rpx;
}
.container .body_view {
  background: #fff;
}
.container .body_view .titleList {
  height: 80rpx;
  color: #222222;
  display: flex;
  align-items: center;
  font-size: 28rpx;
  line-height: 80rpx;
}
.container .body_view .titleList view {
  width: 33.33%;
  text-align: center;
}
.container .body_view .list_content {
  height: 100rpx;
  display: flex;
  align-items: center;
  border-top: solid 1px #f5f5f5;
}
.container .body_view .list_content .row {
  width: 33.33%;
  text-align: center;
}
.container .body_view .list_content .money {
  font-size: 28rpx;
}
.container .body_view .list_content .info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.container .body_view .list_content .info .addname {
  font-size: 28rpx;
  color: #222222;
}
.container .body_view .list_content .info .time {
  font-size: 20rpx;
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
  font-size: 28rpx;
}
</style>


<template>
  <view class="container">
      <view class="red">
        <!-- <text class="sharelist">分销记录</text> -->
          <text class="total_info">累计收益</text>
          <view class="total">
              <text class="num">{{myIntegral}}</text>
          </view>
          <view @tap="toMoney()" class="withdraw">提现</view>
      </view>
      <view class="body_view">
        <view class="titleList">
           <view>分销人</view>
           <view>成交</view>
           <view>分销</view>
        </view>
           <repeat for="{{shareList}}" item="item" key="index">
          <view class="list_content">
              <view class="info row">
                  <text class="addname">{{item.saler_name}}</text>
                  <view class="time">{{item.ctime}}</view>
              </view>
              <view class="row money">￥{{item.real_price}}</view>
              <view class="points row">
                  <text class="addnum">￥{{item.commision_price}}</text>
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
    navigationBarTitleText: "分销中心"
  };
  data = {
    //金额总数
    myIntegral: 0,
    //当前页数
    page: 1,
    //分销记录
    shareList: []
  };
  computed = {};
  components = {};
  onLoad(options) {
    wx.showLoading({
      title: "玩命加载中"
    });
  }
  onShow() {
    //获取分销金额总数
    this.getAllIntegral();
    //获取分销列表
    this.getIntegralList();
  }
  //下拉刷新
  onPullDownRefresh() {
    this.page = 1;
    this.shareList = [];
    //获取分销金额总数
    this.getAllIntegral();
    //获取分销列表
    this.getIntegralList();
  }
  // //上拉加载更多
  // onReachBottom(){
  //     let that=this;
  //     wx.showLoading({
  //       title: '玩命加载中',
  //     })
  //     this.page=this.page+1;
  //      this.getIntegralList()
  // }
  methods = {
    //去到提现页面
    toMoney() {
      wx.navigateTo({
        url: "./tomoney"
      });
    }
  };
  //获取分销金额总数
  async getAllIntegral() {
    const res = await shttp
      .get(`/api/v1/member/withdrawinfo`)
      .query({})
      .end();
    // console.log(res)
    this.myIntegral = res.data.withdraw_total;
    wx.hideLoading();
    this.$apply();
  }
  //获取提现详情列表
  async getIntegralList() {
    this.shareList = [];
    const res = await shttp
      .get(`/api/v1/saler/saler`)
      .query({})
      .end();

    console.log(res);

    let list = res.data.sale_info;
    for (let i = 0; i < list.length; i++) {
      this.shareList.push(list[i]);
    }
    console.log(this.shareList);
    wx.stopPullDownRefresh();
    wx.hideLoading();
    this.$apply();
  }
}
</script>
