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

.user_info{
  width: 650rpx;
  height: 30rpx;
  margin: 50rpx 0 0;
  padding: 0 60rpx;
  font-size: 25rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.main_wrap{
  position: relative;
  padding: 90rpx 15rpx 0;
}

.rank_title{
  padding: 10rpx 0;
  font-size: 25rpx;     
  text-align: center;
}
.prize, .prize_value{
  flex-basis: 10rpx;
  flex-grow: 1;
}
.status, .status_value{
  flex-basis: 10rpx;
  flex-grow: 3;
}

.rank_list{
  padding: 20rpx 0 0;  
  font-size: 22rpx;
  text-align: center;
}
.rank_item_wrap{
  border-top: 2rpx solid #7d6245;
}
.prize_value, .status_value{
  height: 100%;
  padding: 30rpx 0;
}
.status_value{
  border-left: 2rpx solid #7d6245;
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

    <view class='user_info s_fc_1'>姓名：{{name}} 联系电话：{{mobile}}  地址信息：{{address}}</view>

    <view class="main_wrap s_fc_1">

      <view class='rank_title flex s_fc_1 s_bg_2'>
        <view class='prize'>钛强礼品</view>
        <view class='status'>审核状态</view>
      </view>

      <view class='rank_list'>
        <repeat for='{{list}}'>

          <view class='rank_item_wrap flex'>
            <view class='prize_value'>{{item.rewardName}}</view>
            <view class='status_value'>
              <view wx:if="{{item.orderStatus === 'SUCCESS'}}">{{item.orderStatusStr}}</view>
              <view wx:if="{{item.orderStatus === 'AUDITING'}}">{{item.orderStatusStr}}</view>

              <view class='' wx:if="{{item.orderStatus === 'FAILED'}}" @tap='goError({{index}})'>
                <view class='s_fc_4'>审核失败</view>
                <view class='s_fc_5'>请点击重新上传</view>
              </view>

            </view>
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
    list: [],
    name: '',
    mobile: '',
    address: '',
  };

  components = {
    tabBar,
  };

  onLoad(options) {
    let gd = this.$parent.globalData;
    this.tabBarList = gd.clientTabBarList;

    this.getList();
  }

  onShow() {}

  methods = {
    goError(index){
      let item = this.list[index];

      let o = { info: item.reason, url: item.image, orderId: item.orderId, qrcode: item.qrCode };
      let url = `/pages/client/reupload?type=error&error=${JSON.stringify(o)}`;
      wx.redirectTo({ url, });
    },
    goResult(){
      let url = `/pages/limit/index?type=result`;
      wx.redirectTo({ url, });
    },
  };

  async getList(){
    wx.showLoading({ title: 'Loading...' });
    let res = await req.get(`/castrol/api/v1/ownerOrder`, {}, { 'Authorization': wx.getStorageSync('token') });

    if(res && res.data){
      let user = res.data.user;

      this.name = user.username || '';
      this.mobile = user.phone || '';
      this.address = user.address || '';
      // this.name = user.username ? user.username.substr(0, 1) : '';
      // this.mobile = user.phone ? user.phone.substr(0, 3) : '';
      // this.address = user.address ? user.address.replace(/(市|省|自治区|特别行政区).*/g, '$1') : '';

      this.list = res.data.ownerOrders;
    }
    // console.error(this.list);

    wx.hideLoading();
    this.$apply();
  }
}
</script>
