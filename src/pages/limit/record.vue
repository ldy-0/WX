<style scoped>
page {
  height: 100%;
}
.container {
  position: relative;
  min-height: 100%;
  /* overflow: hidden; */
}
.bg_img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.banner_img {
  display: block;
  width: 714rpx;
  height: 344rpx;
  margin: 0 auto;
  margin-top: 18rpx;
}

.main_wrap{
  position: relative;
  padding: 120rpx 15rpx 0;
  /* left: calc(50% - 310rpx); */
  /* width: 620rpx; */
}

.rank_title{
  padding: 10rpx 0;
  font-size: 25rpx;     
  text-align: center;
}
.upload_time, .upload_time_value, .qrcode, .qrcode_value{
  flex-basis: 10rpx;
  flex-grow: 2;
}
.score, .score_value{
  flex-basis: 10rpx;
  flex-grow: 1;
}
.status, .status_value{
  flex-basis: 10rpx;
  flex-grow: 5;
  text-align: left;
}
.status{
  position: relative;
  left: 68rpx;
}

.rank_list{
  padding: 20rpx 0 0;  
  font-size: 22rpx;
  text-align: center;
}
.rank_item_wrap{
  border-top: 2rpx solid #7d6245;
}
.upload_time_value, .status_value, .score_value, .qrcode_value{
  padding: 30rpx 0;
}
.status_value{
  border-left: 2rpx solid #7d6245;
  text-align: center;
}
.error_info{
  width: 145rpx;
  margin-left: 24rpx;
  font-size: 18rpx;
}

.btn_wrap{
  position: relative;
  width: 300rpx;
  height: 80rpx;
  margin: 20rpx auto 0;
}
.i_btn{
  width: 100%;
  height: 100%;
}
.btn_ctn{
  position: absolute;
  top: 20rpx;
  left: calc(50% - 70rpx);
  width: 140rpx;
  font-size: 34rpx;
  font-weight: bold;
}

.flex{
  display: flex;
  justify-content: center;
  align-items: center;
}

.interval{
  width: 360rpx;
  margin: 0 40rpx;
}

.s_fc_1{ color: #fff; }
.s_fc_2{ color: #c49e71; }
.s_fc_3{ color: #5a2f08; }
.s_fc_4{ color: #ba0808; }
.s_fc_5{ color: #967651; }

.s_bg_2{ background: #ae8459; }
.s_bg_3{ background: rgba(40, 37, 24, 1); }
</style>

<template>
  <view class="container">
    <image class="bg_img" src="../../images/bg.png" mode='aspectFill' alt>
    <image class="banner_img" src="../../images/banner.png" alt>


    <view class="main_wrap s_fc_1">

      <view class='rank_title flex s_fc_1 s_bg_2'>
        <view class='upload_time'>上传时间</view>
        <view class='status'>审核状态</view>
        <view class='score'>积分</view>
        <view class='qrcode'>太阳码</view>
      </view>

      <view class='rank_list'>
        <repeat for='{{rankList}}'>

          <view class='rank_item_wrap flex'>
            <view class='upload_time_value'>{{item.createdAt}}</view>
            <view class='status_value'>
              <view wx:if="{{item.orderStatus === 'SUCCESS'}}">{{item.orderStatusStr}}</view>
              <view wx:if="{{item.orderStatus === 'AUDITING'}}">{{item.orderStatusStr}}</view>
              <view class='flex' wx:if="{{item.orderStatus === 'FAILED'}}" @tap='goError({{index}})'>
                <view class='s_fc_4'>审核失败</view>
                <view class='error_info s_fc_5'>
                  <view>点击查看原因并</view>
                  <view>重新上传证明文件</view>
                </view>
              </view>
            </view>
            <view class='score_value'>{{item.point}}</view>
            <view class='qrcode_value' @tap='goResult({{index}})'>查看</view>
          </view>

        </repeat>
      </view>

      <!-- <view class='btn_wrap'>
        <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
        <view class='btn_ctn s_fc_3'>继续冲刺</view>
      </view> -->

    </view>

    <view class='s_bg_3' style='width: 100%; height: 100rpx;'></view>

    <tabBar :list.sync='tabBarList'></tabBar>

  </view>
</template>

<script>
import wepy from "wepy";
import tabBar from "../../components/tabBar";
import { shttp } from "../../utils/http";
import req from "../../utils/request";

export default class Waiterhome extends wepy.page {
  config = {
    navigationBarTitleText: "",
  };

  data = {
    tabBarList: [],
    rankList: [],
  };

  components = {
    tabBar,
  };

  onLoad(options) {
    let gd = this.$parent.globalData;
    this.tabBarList = gd.adviserTabBarList;

    this.getRankList();
  }

  onShow() {}

  methods = {
    goError(index){
      let item = this.rankList[index];

      let o = { info: item.reason, url: item.image, orderId: item.orderId, qrcode: item.qrCode };
      let url = `/pages/limit/index?type=error&error=${JSON.stringify(o)}`;
      wx.redirectTo({ url, });
    },
    goResult(index){
      let url = `/pages/limit/index?type=result&qrcode=${this.rankList[index].qrCode}`;
      wx.redirectTo({ url, });
    },
  };

  async getRankList(){
    wx.showLoading({ title: 'Loading...' });

    let res = await req.get(`/castrol/api/v1/order/seller/all`, {}, { 'Authorization': wx.getStorageSync('token') });

    if(res && res.data){
      // console.error(res.data);
      this.rankList = res.data;
    }

    wx.hideLoading();
    this.$apply();
  }
}
</script>
