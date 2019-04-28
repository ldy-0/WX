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

.coupon_main_wrap{
  position: absolute;
  top: 0;
  left: 0;
  width: 430rpx;
  height: 100%;
  text-align: center;
}
.coupons-txt1{
  margin: 30rpx 0 0;
  font-size: 70rpx;
}
.coupon_desc{
  margin: 25rpx 0 0;
  font-size: 18rpx;
}

.coupon_vice_wrap{
  position: absolute;
  top: 0;
  right: 0;
  width: 210rpx;
  height: 100%;
}
.coupon_vice_title{
  margin: 60rpx 0 30rpx 36rpx;
  font-size: 45rpx;
}
.coupon_vice_desc{
  margin: 10rpx 0 0 36rpx;
  font-size: 18rpx;
}

.s_fc_1{ color: #fff; }

.s_bg_1{ background: #fff; }
</style>  

<template>
  <view class="container">
    <view class="my_manage" wx:if="{{!is_empty}}">
      <repeat for="{{couponList}}" item="item" wx:if="{{type=='all'}}">
        <view class="coupons-item s_fc_1" @tap="getcoupons" data-coupon="{{item}}" data-index="{{index}}">
          <image class="coupons-itemImg" src="{{item.fetch_states==2?'../../images/coupon/bg.png':'../../images/coupon/gray_bg.png'}}" >

          <view class="coupon_main_wrap">
            <view class="coupons-txt1">￥{{item.vouchertemplate_price}}</view>
            <view class="coupon_desc">满{{item.vouchertemplate_limit}}元可用</view>
            <view class="coupon_desc">使用规则：全场通用，不可与其他优惠同享</view>
          </view>
          <view class='coupon_vice_wrap'>
            <view class="coupon_vice_title">优惠券</view>
            <view class='coupon_vice_desc'>有效期至</view>
            <view class='coupon_vice_desc'>{{item.vouchertemplate_enddate}}</view>
          </view>
          
        </view>
      </repeat>

      <repeat for="{{couponList}}" item="item" wx:if="{{type=='mine'}}">
        <view class="coupons-item s_fc_1" data-coupon="{{item}}" data-index="{{index}}">
          <image class="coupons-itemImg" src="{{item.voucher_state==1?'../../images/coupon/bg.png':'../../images/coupon/gray_bg.png'}}" >

          <view class="coupon_main_wrap">
            <view class="coupons-txt1">￥{{item.voucher_price}}</view>
            <view class="coupon_desc">满{{item.voucher_limit}}元可用</view>
            <view class="coupon_desc">使用规则：全场通用，不可与其他优惠同享</view>
          </view>
          <view class='coupon_vice_wrap'>
            <view class="coupon_vice_title">优惠券</view>
            <view class='coupon_vice_desc'>有效期至</view>
            <view class='coupon_vice_desc'>{{item.voucher_enddate}}</view>
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
    navigationBarTitleText: "优惠劵"
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
    wx.showLoading({ title: "加载中..." });

    let param = { limit: 10,
        page: this.page,
        store_id: 1
      };

    const res = await shttp.get(url).query(param).end(); 

    if(res.data) {
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

    this.is_empty = this.couponList.length == 0 ? true : false;

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