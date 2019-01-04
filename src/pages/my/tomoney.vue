<style scoped>
.container {
  background: #f4f4f4;
  height: 100vh;
  position: relative;
}
.container .red {
  height: 200rpx;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #e76b75;
  padding: 0 30rpx;
}
.container .red .title_info {
  width: 100%;
  height: 86rpx;
  color: #fff;
  letter-spacing: 2rpx;
  font-size: 20rpx;
  line-height: 86rpx;
}
.container .red .num_info {
  width: 100%;
  color: #fff;
  display: flex;
  position: relative;
}
.container .red .num_info .num {
  font-size: 86rpx;
  color: #fff;
  line-height: 86rpx;
}
.container .red .num_info .list_info {
  position: absolute;
  right: 60rpx;
  font-size: 28rpx;
  color: #fff;
  width: 146rpx;
  height: 44rpx;
  margin-top: 20rpx;
  text-align: center;
  border: solid 1rpx #fff;
  border-radius: 10rpx;
}
.container .body_view {
  background: #fff;
  margin-bottom: 90rpx;
}
.container .body_view .line_view {
  height: 100rpx;
  display: flex;
  align-items: center;
  border-bottom: solid 1px #f7f7f7;
  padding: 0 30rpx;
}
.container .body_view .line_view .left_info {
  font-size: 28rpx;
  color: #222222;
  flex-basis: 200rpx;
}
.container .body_view .line_view .unit {
  font-size: 37rpx;
  color: #222222;
}
.container .body_view .line_view .allget {
  flex-basis: 189rpx;
  height: 44rpx;
  border: solid 1rpx #e50012;
  border-radius: 10rpx;
  font-size: 28rpx;
  text-align: center;
  color: #e50012;
}
.container .body_view .tip_info {
  height: 60rpx;
  line-height: 60rpx;
  font-size: 24rpx;
  color: #888;
  padding: 0 30rpx;
}

.comfir_btn {
  width: 692rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  margin: 0 auto;
  color: #fff;
  border-radius: 10rpx;
  background: #e50012;
}
</style>


<template>
  <view class="container">
    <view class="red">
      <view class="title_info">可提现余额</view>
      <view class="num_info">
        <view class="num">￥{{myIntegral}}</view>
        <view @tap="toMoneyList()" class="list_info">提现明细</view>
      </view>
    </view>
    <view class="body_view">
      <view class="line_view">
        <text class="left_info">提现金额</text>
        <text class="unit">￥</text>
        <input class="ipt" bindinput="iptMoney" value="{{iptMoney}}" auto-focus>
        <text @tap="toAllMoney({{myIntegral}})" class="allget">全部提现</text>
      </view>
      <view class="tip_info">
        <text>提现金额最少为¥{{minGetmoney}}元</text>
      </view>
    </view>
    <view class="comfir_btn" @tap="getMoney()">提现</view>
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
    //最少提现金额
    minGetmoney: 0,
    //要提现的金额
    iptMoney: ""
  };
  computed = {};
  components = {};
  onLoad(options) {
    //  wx.showLoading({
    //   title: '玩命加载中',
    // })
  }
  onShow() {
    //获取分销金额总数
    this.getAllIntegral();
  }
  //下拉刷新
  onPullDownRefresh() {
    //获取分销金额总数
    this.getAllIntegral();
  }

  methods = {
    //获取输入的金额
    iptMoney(e) {
      console.log(e);
      this.iptMoney = e.detail.value;
      this.$apply();
    },
    //去提现明细
    toMoneyList() {
      wx.navigateTo({
        url: "./moneylist"
      });
    },
    //全部提现
    toAllMoney() {
      this.iptMoney = this.myIntegral;
      this.$apply();
    },
    //开始提现
    getMoney() {
      if (!this.iptMoney) {
        return wx.showToast({
          title: "请输入提现金额",
          icon: "none",
          duration: 2000
        });
      }
      if (isNaN(this.iptMoney)) {
        return wx.showToast({
          title: "输入金额不正确",
          icon: "none",
          duration: 2000
        });
      }
      (this.iptMoney == this.iptMoney) == "" ? "0" : this.iptMoney;
      console.log(this.iptMoney);
      if (this.iptMoney < this.minGetmoney) {
        wx.showToast({
          title: "提现额度过低",
          icon: "none",
          duration: 2000
        });
      } else if (this.iptMoney > this.myIntegral) {
        wx.showToast({
          title: "余额不足",
          icon: "none",
          duration: 2000
        });
      } else {
        this.toGetMoney();
      }
    }
  };
  //获取分销金额总数
  async getAllIntegral() {
    const res = await shttp
      .get(`/api/v2/member/withdrawinfo`)
      .query({})
      .end();
    // console.log(res)
    this.minGetmoney = res.data.min_withdraw;
    this.myIntegral = res.data.withdraw_total;
    this.$apply();
  }
  //开始提现金额
  async toGetMoney() {
    const res = await shttp
      .post(`/api/v2/member/withdraw`)
      .send({
        money: this.iptMoney
      })
      .end();
    console.log(res);
    if (res.status == 0) {
      wx.showToast({
        title: "提现成功",
        icon: "success",
        duration: 2000
      });
      this.iptMoney = "";
      this.getAllIntegral();
    } else {
      wx.showToast({
        title: res.error,
        icon: "none",
        duration: 2000
      });
      this.getAllIntegral();
    }
    this.$apply();
  }
}
</script>
