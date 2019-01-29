<style scoped>
.container {
  width: 100%;
  height: 100%; 
}

.m_coupon_container{
  width: 726rpx;
  height: 357rpx;
  margin: 10rpx auto;
  padding: 10rpx;
}
.m_coupon_wrap{
  padding: 11rpx 8rpx;
}
.m_coupon{
  padding: 20rpx;
  border: 2rpx solid #e6edf5;
}
.m_coupon_main{
  padding-bottom: 20rpx;
  border-bottom: 2rpx dashed #e9e9e9;
}

.m_coupon_info{

}
.m_coupon_price{
  padding: 30rpx 30rpx 30rpx 0;
  border-right: 2rpx dashed #eee;
  font-size: 36rpx;
}
.m_coupon_time_wrap{
  margin-left: 50rpx;
  font-size: 30rpx;
  text-align: center;
}
.m_coupon_time{
  margin: 20rpx 0 0;
  font-size: 24rpx;
}

.m_coupon_other{
  font-size: 22rpx;
}
.m_coupon_logo_wrap{
  margin-bottom: 50rpx;
}
.m_coupon_logo{
  width: 70rpx;
  height: 70rpx;
  margin-left: 40rpx;
}

.m_coupon_rules{
  font-size: 22rpx;
}
.m_coupon_rule{
  margin-top: 6rpx;
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

.flex {
  display: flex;
  align-items: center;
}

.arrow {
  width: 16rpx;
  height: 26rpx;
  margin-left: 40rpx;
  background: gray;
}


.between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.s-fc-1{ color: #fff; }
.s-fc-2{ color: #222; }
.s-fc-3{ color: #8e939a; }
.s-fc-4{ color: #10325f; }
.s-fc-5{ color: #e9e9e9; }

.s-bg-1{ background: #fff; }
.s-bg-2{ background: #f4f4f4; }
.s-bg-3{ background: #999; }
.s-bg-4{ background: #10325f; }
</style>  

<template>
  <view class="container s-bg-2">
    <view class="my_manage" wx:if="{{!is_empty}}">
      <!-- <repeat for="{{couponList}}" item="item" wx:if="{{type=='all'}}">
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
            <view class="coupons-txt3">有效期至：{{item.vouchertemplate_enddate}}</view>
          </view>
        </view>
      </repeat> -->
      <repeat for="{{couponList}}" item="item" wx:if="{{type=='mine'}}">

        <view class="m_coupon_container s-bg-1">
          <view class='m_coupon_wrap s-bg-4'>
            <view class='m_coupon s-fc-1'>

              <view class='m_coupon_main between'>
                <view class='m_coupon_info flex'>
                  <view class='m_coupon_price'><text style='font-size: 60rpx;'>{{item.voucher_price}}</text>元</view>
                  <view class='m_coupon_time_wrap'>
                    <view>{{item.voucher_title}}</view>
                    <view class='m_coupon_time s-fc-5'>有效期至{{item.voucher_enddate}}</view>
                  </view>
                </view>

                <view class='m_coupon_other s-fc-5'>
                  <view class='m_coupon_logo_wrap'><image class='m_coupon_logo' src='../../images/my/coupon_logo.png' /></view>
                  <view>使用规则</view>
                </view>
              </view>

              <view class='m_coupon_rules s-fc-5'>
                <view class='m_coupon_rule'>· 抵扣券每次限用一张，不可与其他优惠叠加使用</view>
                <view class='m_coupon_rule'>· 邀请好友 当好友首次体验理发服务时 各得10元抵扣卷</view>
                <view class='m_coupon_rule'>· 使用范围：所有门店通用</view>
              </view>
            </view>
          </view>
          <!-- <image class="coupons-itemImg" src="{{item.voucher_state==1?'../../images/img_1_1@2x.png':'../../images/img_1_2@2x.png'}}">
          <view class="coupons-txtbox">
            <view class="coupons-txtTop">优惠券</view>
            <view class="coupons-txt1">
              <text>￥</text>
              {{item.voucher_price}}
            </view>
            <view class="coupons-txt2">无门槛使用</view>
            <view class="coupons-txt3">有效期至：{{item.voucher_enddate}}</view>
          </view> -->
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
    navigationBarTitleText: "抵扣券"
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
    this.type = options.type;
  // wx.setNavigationBarTitle({ title: "我的优惠券" });
    this.getCouponList();
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

    wx.showLoading({ title: "加载中..." });

    if (this.type == "mine") {
      url = "/api/v2/member/coupon";
    }

    const res = await shttp.get(url).query({
        limit: 10,
        page: this.page,
        // store_id: 1
        // voucher_state: 0,
      }).end();

    if (res && res.data) {
        if (this.type == "mine") {
          res.data.forEach(item => {
            item.voucher_enddate = getTimes.formatTime(item.voucher_enddate * 1000, "Y-M-D");
          });
        }
        this.couponList =  this.couponList.concat(res.data);
    }

    // this.couponList = [
    //   { voucher_price: 12.12, voucher_enddate: '2019/1/11 12:11', voucher_state: 1 },
    //   { voucher_price: 12.12, voucher_enddate: '2019/1/11 12:11', voucher_state: 1 },
    // ];
    if (this.couponList.length == 0) { this.is_empty = true; } else { this.is_empty = false; }
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