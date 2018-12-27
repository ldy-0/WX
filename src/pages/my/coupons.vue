<style scoped>
.container {
  font: 32rpx PingFang-SC-Medium;
  color: #000;
  min-height: 100vh;
  background: #f4f4f4;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.couponsBox {
  position: relative;
  display: flex;
  width: 639rpx;
  height: 266rpx;
  justify-content: space-between;
  margin-top: 28rpx;
  border-radius: 6rpx;
  margin-bottom: 25rpx;
}
.couponsBox .borImg {
  width: 29rpx;
  height: 266rpx;
}
.couponsBox .couponInfo {
  width: 610rpx;
  height: 266rpx;
  background: #fff;
  display: flex;
  justify-content: space-between;
}
.couponsBox .couponInfo .logo {
  width: 120rpx;
  height: 120rpx;
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
  right: 41rpx;
}
.couponsBox .couponInfo .textInfo {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding-left: 40rpx;
}
.couponsBox .couponInfo .textInfo .priceInfo .unit {
  font-size: 41rpx;
}
.couponsBox .couponInfo .textInfo .priceInfo .num {
  font-size: 74rpx;
}
.couponsBox .couponInfo .ruleInfo {
  color: #222;
  display: flex;
  flex-direction: column;
}
.couponsBox .couponInfo .ruleInfo .dec {
  font-size: 28rpx;
  font-weight: bold;
}
.couponsBox .couponInfo .ruleInfo .time {
  font-size: 22rpx;
}
.couponsBox .share {
  padding: 0rpx;
  border: 0 !important;
  border-radius: 0 !important;
  margin: 0;
  line-height: 28rpx;
  color: #888888;
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  font-size: 22rpx;
}
.couponsBox .share .share_icon {
  width: 36rpx;
  height: 38rpx;
}
</style>


<template>
  <view class="container">
    <repeat for="{{couponsList}}" key="index" item="item">
      <view class="couponsBox">
        <button class="share" plain="true" open-type="share" data-coupon="{{item}}">
          <view class="column_center">
            <image src="../../images/icon_6_fenxiang@2x.png" class="share_icon">
          </view>
        </button>
        <image class="borImg" src="../../images/img_3@2x.png">
        <view class="couponInfo">
          <view class="textInfo">
            <view class="priceInfo">
              <text class="unit">￥</text>
              <text class="num">{{item.voucher_price}}</text>
            </view>
            <view class="ruleInfo">
              <text class="dec">{{item.voucher_title}}</text>
              <text class="time">有效期至{{item.vouchertemplate_enddate}}</text>
            </view>
          </view>
          <image class="logo" src="../../images/logo@2x.png">
        </view>
      </view>
    </repeat>
    <!--暂无数据显示-->
    <placeholder :show.sync="is_empty" message="优惠券空的呢"></placeholder>
  </view>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import dayjs from "dayjs";
import Placeholder from "../../components/placeholder";
export default class coupons extends wepy.page {
  config = {
    enablePullDownRefresh: true,
    navigationBarTitleText: "我的优惠券"
  };
  data = {
    is_empty: false,
    //领券列表
    couponsList: [],
    //页码
    page: 1
  };
  components = {
    placeholder: Placeholder
  };
  //下拉刷新
  onPullDownRefresh() {
    this.getCouponsList();
  }
  onLoad(options) {
    //获取优惠券列表
    this.getCouponsList();
  }
  onShow() {}
  methods = {
    onShareAppMessage: function(res) {
      let nowCoupon = res.target.dataset.coupon;
      return {
        title: nowCoupon.voucher_title,
        path: "/pages/authorization?couponId=" + nowCoupon.voucher_id,
        success: function(res) {
          // 转发成功
          wx.showToast({
            title: "转发成功",
            icon: "success",
            duration: 2000
          });
        },
        fail: function(res) {
          wx.showToast({
            title: "转发失败",
            icon: "none",
            duration: 2000
          });
        }
      };
    }
  };
  //获取优惠券列表
  async getCouponsList() {
    wx.showLoading({
      title: "加载中"
    });
    const res = await shttp
      .get(`/api/v1/member/myfullreduction`)
      .query({
        page: this.page,
        limit: 1000
      })
      .end();
    if (res.status === 0) {
      res.data.forEach(item => {
        item.vouchertemplate_enddate = dayjs(item.appointment_time).format(
          "YYYY-MM-DD"
        );
      });
      console.log("优惠券列表");
      console.log(res.data);
      //this.couponsList = this.couponsList.concat(res.data); 分页
      this.couponsList = res.data; //不分页
      wx.hideLoading();
      if (this.couponsList.length == 0) {
        this.is_empty = true;
      }
    } else {
      this.is_empty = true;
      wx.hideLoading();
    }
    wx.stopPullDownRefresh();
    this.$apply();
  }
}
</script>
