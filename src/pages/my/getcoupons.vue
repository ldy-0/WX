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
  width: 100rpx;
  height: 100rpx;
  top: 35%;
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
  margin: 0;
  line-height: 48rpx;
  color: #fff;
  position: absolute;
  bottom: 27rpx;
  right: 43rpx;
  font-size: 22rpx;
  background: #ee3b25;
  width: 120rpx;
  height: 48rpx;
}
</style>


<template>
  <view class="container">
      <repeat for='{{couponsList}}' key='index' item='item'>
        <view class="couponsBox">
            <image class="borImg" src="../../images/img_3@2x.png"></image>
            <view class="couponInfo">
                <view class="textInfo">
                    <view class="priceInfo">
                      <text class="unit">￥</text>
                      <text class="num">{{item.vouchertemplate_price}}</text>
                    </view>
                    <view class="ruleInfo">
                            <text class="dec">{{item.vouchertemplate_title}}</text>
                            <text class="time">有效期至{{item.vouchertemplate_enddate}}</text>
                    </view>
                </view>
                <image class="logo" src="../../images/logo@2x.png"></image>
            </view>
            <button @tap="getCoupon({{item.vouchertemplate_id}})" class="share" plain="true">
               立即领取           
            </button> 
        </view>
        </repeat>
       <!--暂无数据显示-->
      <placeholder :show.sync="is_empty" message="优惠券是空的呢"></placeholder> 
  </view>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import dayjs from "dayjs";
import Placeholder from "../../components/placeholder";
export default class Getcoupons extends wepy.page {
  config = {
    enablePullDownRefresh: true,
    navigationBarTitleText: "领券中心"
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
  onLoad(options) {
    //获取优惠券列表
    this.getCouponsList();
  }
  //下拉刷新
  onPullDownRefresh() {
    this.getCouponsList();
  }
  onShow() {}
  methods = {
    //立即领券
    getCoupon(id) {
      this.acquireCoupon(id);
    }
  };
  //获取优惠券列表
  async getCouponsList() {
    wx.showLoading({
      title: "加载中"
    });
    const res = await shttp
      .get(`/api/v1/member/fullreductionlist`)
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
        console.log("空");
        this.is_empty = true;
      }
    } else {
      console.log("空");
      this.is_empty = true;
      wx.hideLoading();
    }
    wx.stopPullDownRefresh();
    this.$apply();
  }
  //领券优惠券
  async acquireCoupon(id) {
    // wx.showLoading({
    //   title: "领取中..."
    // });
    const res = await shttp
      .get(`/api/v1/member/acquireCoupon`)
      .query({
        vouchertemplate_id: id
      })
      .end();

    if (res.status === 0) {
      // wx.hideLoading();
      wx.showToast({
        title: "领取成功",
        icon: "success",
        duration: 2000
      });
      setTimeout(() => {
        this.getCouponsList();
      }, 500);
    }
  }
}
</script>
