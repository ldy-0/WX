<style scoped>
.container {
  background: #fff;
  min-height:100vh;
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
      <repeat for="{{couponList}}" item="item" wx:if="{{type=='all'}}">
        <view class="coupons-item" @tap="getcoupons" data-coupon="{{item}}" data-index="{{index}}">
          <image
            class="coupons-itemImg"
            src="{{item.fetch_states==2?'../../images/img_1_1@2x.png':'../../images/img_1_2@2x.png'}}"
          >
          <view class="coupons-txtbox">
            <view class="coupons-txtTop">优惠券</view>
            <view class="coupons-txt1">
              <text>￥</text>
              {{item.vouchertemplate_price}}
            </view>
            <view class="coupons-txt2">无门槛使用</view>
            <view class="coupons-txt3">{{item.vouchertemplate_startdate}} ~ {{item.vouchertemplate_enddate}}</view>
          </view>
        </view>
      </repeat>
      <repeat for="{{couponList}}" item="item" wx:if="{{type=='mine'}}">
        <view class="coupons-item" data-coupon="{{item}}" data-index="{{index}}">
          <image
            class="coupons-itemImg"
            src="{{item.voucher_state==1?'../../images/img_1_1@2x.png':'../../images/img_1_2@2x.png'}}"
          >
          <view class="coupons-txtbox">
            <view class="coupons-txtTop">优惠券</view>
            <view class="coupons-txt1">
              <text>￥</text>
              {{item.voucher_price}}
            </view>
            <view class="coupons-txt2">无门槛使用</view>
            <view class="coupons-txt3">{{item.voucher_startdate}} ~ {{item.voucher_enddate}}</view>
          </view>
        </view>
      </repeat>
    </view>
    <!--暂无数据显示-->
    <placeholder :show.sync="is_empty" message="还没有优惠券"></placeholder>
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
    couponList: [],
    //默认第一页
    page: 1,
    type: "all"
  };

  components = {
    placeholder: Placeholder
  };

  onLoad(options) {
    //获取优惠劵列表
    if (options.type) {
      this.type = options.type;
    }
    if (this.type == "mine") {
      wx.setNavigationBarTitle({
        title: "我的优惠券"
      });
    }
    this.getCouponList();
    this.$apply();
  }
  //上拉加载更多
  onReachBottom() {
    this.page = this.page + 1;
    //获取优惠劵列表
    this.getCouponList();
  }
  onShow() {}
  //获取优惠劵列表
  async getCouponList() {
    let url = "";
    if (this.type == "mine") {
      url = "/api/v2/member/coupon";
    } else {
      url = "/api/v2/member/coupon/search";
    }
    wx.showLoading({
      title: "加载中..."
    });
    const res = await shttp
      .get(url)
      .query({
        limit: 10,
        page: this.page,
        store_id: 1
      })
      .end();
    if (res.status === 0) {
      if (res.data != null && res.data.length != 0) {
        if (this.type == "mine") {
          res.data.forEach(item => {
            item.voucher_enddate = getTimes.formatTime(
              item.voucher_enddate * 1000,
              "Y-M-D"
            );
            item.voucher_startdate = getTimes.formatTime(
              item.voucher_startdate * 1000,
              "Y-M-D"
            );
          });
        }
        this.couponList = this.couponList.concat(res.data);
      }
    }
    if (this.couponList.length == 0) {
      this.is_empty = true;
    } else {
      this.is_empty = false;
    }
    wx.hideLoading();
    this.$apply();
  }

  methods = {
    async getcoupons(e) {
      let id = e.currentTarget.dataset.coupon.vouchertemplate_id;
      let index = e.currentTarget.dataset.index;
      let fetch_states = e.currentTarget.dataset.coupon.fetch_states;
      if (fetch_states == 1) {
        return wx.showToast({
          title: "请不要重复领取",
          icon: "none",
          duration: 1000
        });
      }
      const res = await shttp
        .post("/api/v2/member/coupon")
        .send({
          vouchertemplate_id: id
        })
        .end();
      if (res.status == 0) {
        wx.showToast({
          title: "领取成功",
          icon: "success",
          duration: 2000
        });
        this.couponList[index].fetch_states = 1;
        this.$apply();
      } else if (res.status == 1) {
        wx.showToast({
          title: res.error,
          icon: "none",
          duration: 2000
        });
      }
    }
  };
}
</script>