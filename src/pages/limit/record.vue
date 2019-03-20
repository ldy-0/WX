<style scoped>
page {
  height: 100%;
}
.container {
  position: relative;
  height: 100%;
  overflow: hidden;
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
  /* margin-top: 18rpx; */
  margin-top: 68rpx;
}

.main_wrap{
  position: relative;
  padding: 40rpx 15rpx 0;
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
  /* text-align: left; */
}
.status{
  /* position: relative; */
  /* left: 68rpx; */
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
  width: 100rpx;
  height: 60rpx;
  margin: 0 0 40rpx 10rpx;
  /* margin: 0rpx auto 40rpx; */
}
.i_btn{
  width: 100%;
  height: 100%;
}
.btn_ctn{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  line-height: 60rpx;
  font-size: 30rpx;
  font-weight: bold;
  text-align: center;
}

.scroll_wrap{
  height: 620rpx;
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
.s_bg_4{ background: #060707 }
.s_bg_5{ background: #201b16 }
</style>

<template>
  <view class="container">
    <image class="bg_img" src="../../images/bg.png" mode='aspectFill' alt>
    <image class="banner_img" src="../../images/banner.png" alt>


    <view class="main_wrap s_fc_1">

      <view class='btn_wrap' @tap='goBack'>
        <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
        <view class='btn_ctn s_fc_3'>返回</view>
      </view>     

      <view class='rank_title flex s_fc_1 s_bg_2'>
        <view class='upload_time'>上传时间</view>
        <view class='status'>审核状态</view>
        <view class='score'>积分</view>
        <view class='qrcode'>太阳码</view>
      </view>

      <view class='scroll_wrap'>
        <scroll-view scroll-y style='height: 100%;'>

      <view class='rank_list'>
        <repeat for='{{rankList}}'>

          <view class="rank_item_wrap flex {{index % 2 === 0 ? 's_bg_4' : 's_bg_5'}}">
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

        </scroll-view>
      </view>

      <!-- <view class='btn_wrap'>
        <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
        <view class='btn_ctn s_fc_3'>继续冲刺</view>
      </view> -->

    </view>

    <view class='' style='width: 100%; height: 100rpx; background: transparent;'></view>

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
    goBack(){ wx.navigateBack({ delta: 1 }); },
    goError(index){
      let item = this.rankList[index];

      let o = { info: item.reason, url: item.image, orderId: item.orderId, qrcode: item.qrCode };
      let url = `/pages/limit/index?type=error&error=${JSON.stringify(o)}`;
      // wx.redirectTo({ url, });
      this.navigateTo(url);
    },
    goResult(index){
      let url = `/pages/limit/index?type=result&qrcode=${this.rankList[index].qrCode}`;
      // wx.redirectTo({ url, });
      this.navigateTo(url);
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

  navigateTo(url){
    let length = getCurrentPages().length;
    length >= 9 ? wx.reLaunch({ url }) : wx.navigateTo({ url });
  }
}
</script>
