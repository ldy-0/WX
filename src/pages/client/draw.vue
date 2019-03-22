<style scoped>
page {
  height: 100%;
}
.container {
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
  left: calc(50% - 325rpx);
  width: 650rpx;
  margin: 15rpx 0 0;
}

.turntable_wrap{
  position: relative;
  width: 530rpx;
  height: 530rpx;
  margin: 100rpx auto 0;
}
.s_turntable_wrap{
  margin: 30rpx auto 0;
}
.i_turntable{
  width: 100%;
  height: 100%;
}
.i_pointer{
  position: absolute;
  top: calc(50% - 85rpx);
  left: calc(50% - 66rpx);
  z-index: 1;
  width: 132rpx;
  height: 170rpx;
}

.btn_wrap{
  position: relative;
  width: 300rpx;
  height: 80rpx;
  margin: 100rpx auto 0;
}
.s_btn_wrap{
  margin: 30rpx auto 0;
}
.i_btn{
  width: 100%;
  height: 100%;
}
.btn_ctn{
  position: absolute;
  top: 24rpx;
  left: calc(50% - 54rpx);
  width: 108rpx;
  font-size: 25rpx;
  font-weight: bold;
}

.desc_wrap{
  margin: 35rpx 0 0;
  font-size: 22rpx;
  text-align: center;
}

.toast_title_wrap{
  margin: 48rpx 0 0;
  font-size: 35rpx;
  text-align: center;
}
.write_btn_wrap{
  margin: 30rpx auto 0;
}
.write_btn_ctn{
  position: absolute;
  top: 24rpx;
  left: calc(50% - 75rpx);
  width: 150rpx;
  font-size: 25rpx;
  font-weight: bold;
}

.error_title{
  margin: 60rpx 0 0;
  font-size: 35rpx;
  text-align: center;
}

.turntable_item{
  position: absolute;
  width: 140rpx;
  height: 80rpx;
}
.i_left_top_prize{
  position: absolute;
  top: -8rpx;
  left: -4rpx;
  width: 22rpx;
  height: 22rpx;
}
.i_right_top_prize{
  position: absolute;
  bottom: 14rpx;
  right: 8rpx;
  width: 22rpx;
  height: 22rpx;
  transform: rotate(180deg);
}
.turntable_item_value{
  width: 130rpx;
  height: 100%;
  font-size: 22rpx;
  font-weight: bold;
  line-height: 1.1;
  text-align: center;
}
.top_prize{
  font-size: 28rpx;
}
.item0{
  top: 70rpx;
  left: calc(50% - 65rpx);
}
.item1{
  top: 160rpx;
  right: 60rpx;
  transform: rotate(60deg);  
}
.item2{
  bottom: 160rpx;
  right: 60rpx;
  transform: rotate(120deg);  
}
.item3{
  bottom: 70rpx;
  left: calc(50% - 65rpx);
  transform: rotate(180deg);  
}
.item4{
  bottom: 160rpx;
  left: 60rpx;
  transform: rotate(240deg);  
}
.item5{
  top: 160rpx;
  left: 60rpx;
  transform: rotate(300deg);  
}

.init{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(0deg);
}
.rotate{
  transform: rotate(1080deg);
  transition: transform 15s;
}


.flex{
  display: flex;
  align-items: center;
}

.s_fc_1{ color: #fff; }
.s_fc_2{ color: #c49e71; }
.s_fc_3{ color: #5a2f08; }
.s_fc_4{ color: #c2996f; }
.s_fc_5{ color: #ddd; }
.s_fc_6{ color: #000; }
.s_fc_7{ color: #bc936c; }

.s_bg_1{ background: #fff; }
.s_bg_2{ background: #c2996f; }
</style>

<template>
  <view class="container">
    <image class="bg_img" src="../../images/bg.png" mode='aspectFill' alt>
    <image class="banner_img" src="../../images/banner.png" alt>

    <view class="main_wrap s_fc_6">

      <view class="turntable_wrap {{isSmallScreen ? 's_turntable_wrap' : ''}}">
        <image class='i_pointer' src='{{pointerURL}}' mode='aspectFill' />

        <view class="init" style="transform: rotate({{rotate ? degree : 0}}deg); transition: transform {{rotate ? second : 0}}s">
          <image class='i_turntable' src='{{turntableURL}}' mode='aspectFill' />

          <view class="s_fc_7">
            <view class='turntable_item item0'>
              <image class='i_left_top_prize' src='{{topPrizeURL}}' mode='aspectFill' wx:if="{{list[0].level}}" />
              <image class='i_right_top_prize' src='{{topPrizeURL}}' mode='aspectFill' wx:if="{{list[0].level}}" />
              <view class="turntable_item_value {{list[0].level ? 'top_prize' : ''}}">{{list[0].name}}</view>
            </view>
            <view class='turntable_item item1'>
              <image class='i_left_top_prize' src='{{topPrizeURL}}' mode='aspectFill' wx:if="{{list[1].level}}" />
              <image class='i_right_top_prize' src='{{topPrizeURL}}' mode='aspectFill' wx:if="{{list[1].level}}" />
              <view class="turntable_item_value {{list[1].level ? 'top_prize' : ''}}">{{list[1].name}}</view>
            </view>
            <view class='turntable_item item2'>
              <image class='i_left_top_prize' src='{{topPrizeURL}}' mode='aspectFill' wx:if="{{list[2].level}}" />
              <image class='i_right_top_prize' src='{{topPrizeURL}}' mode='aspectFill' wx:if="{{list[2].level}}" />
              <view class="turntable_item_value {{list[2].level ? 'top_prize' : ''}}">{{list[2].name}}</view>
            </view>
            <view class='turntable_item item3'>
              <image class='i_left_top_prize' src='{{topPrizeURL}}' mode='aspectFill' wx:if="{{list[3].level}}" />
              <image class='i_right_top_prize' src='{{topPrizeURL}}' mode='aspectFill' wx:if="{{list[3].level}}" />
              <view class="turntable_item_value {{list[3].level ? 'top_prize' : ''}}">{{list[3].name}}</view>
            </view>
            <view class='turntable_item item4'>
              <image class='i_left_top_prize' src='{{topPrizeURL}}' mode='aspectFill' wx:if="{{list[4].level}}" />
              <image class='i_right_top_prize' src='{{topPrizeURL}}' mode='aspectFill' wx:if="{{list[4].level}}" />
              <view class="turntable_item_value {{list[4].level ? 'top_prize' : ''}}">{{list[4].name}}</view>
            </view>
            <view class='turntable_item item5'>
              <image class='i_left_top_prize' src='{{topPrizeURL}}' mode='aspectFill' wx:if="{{list[5].level}}" />
              <image class='i_right_top_prize' src='{{topPrizeURL}}' mode='aspectFill' wx:if="{{list[5].level}}" />
              <view class="turntable_item_value {{list[5].level ? 'top_prize' : ''}}">{{list[5].name}}</view>
            </view>
          </view>

        </view>

      </view>

      <view class="btn_wrap {{isSmallScreen ? 's_btn_wrap' : ''}}" @tap="go">
        <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
        <view class='btn_ctn s_fc_3'>{{btnTitle}}</view>
      </view>

    </view>

    <!-- toast/弹窗 -->
    <toast wx:if="{{showToast}}" @close.user='closeToast'>
      <view wx:if="showToast === 1">

        <view class='error_title s_fc_5' wx:if="{{showToast === -1}}">抱歉</view>

        <view class='toast_title_wrap s_fc_5'>
          <repeat for="{{toastInfo}}">
            <view>{{item}}</view>
          </repeat>
        </view>

        <view class='btn_wrap write_btn_wrap' @tap='goWriteInfo' wx:if="{{showToast == 1 && goods.rewardType !== 'VIRTUAL'}}">
          <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
          <view class='write_btn_ctn s_fc_3'>{{writeBtnTitle}}</view>
        </view>

      </view>
    </toast>

    <tabBar :list.sync='tabBarList'></tabBar>

  </view>
</template>

<script>
import wepy from "wepy";
import tabBar from "../../components/tabBar";
import toast from "../../components/toast";
import { shttp } from "../../utils/http";
import req from "../../utils/request";

export default class Waiterhome extends wepy.page {
  config = {
    navigationBarTitleText: "",
  };

  data = {
    turntableURL: '../../images/client/turntable.png', 
    pointerURL: '../../images/client/pointer.png',
    topPrizeURL: '../../images/client/topPrize.png',
    tabBarList: [],
    playURL: '../../images/global/play.png',
    list: [],
    orderId: null,
    btnTitle: '开始抽奖',
    writeBtnTitle: '填写领奖信息',
    toastInfo: [],
    successInfo: ['恭喜您', '获得XXX礼品一份', '请及时填写领奖信息', '方便工作人员寄送奖品'],
    errorInfo: ['请先从服务顾问处领取', '本次活动太阳码'],
    showToast: 0,
    rotate: false,
    degree: 0,
    second: 0,
    goods: null,
    canSubmit: true,
    drawEnd: false,
    isSmallScreen: false,
  };

  components = {
    tabBar,
    toast,
  };

  onLoad(options) {
    let gd = this.$parent.globalData;
    gd.tabIndex = -1;
    // gd.clientTabBarList[0].path = `/pages/client/index?scene=${options.orderId}`;
    this.tabBarList = gd.clientTabBarList;

    let sys = wx.getSystemInfoSync();
    console.error(sys);
    this.isSmallScreen = sys.screenHeight < 568 || /Huawei|HUAWEI/g.test(sys.brand);

    this.orderId = options.orderId;
    console.error('draw orderId', options.orderId);
    this.$apply();

    this.getList(); 
  }

  onShow() {}

  methods = {
    go(){
      let url;
      
      this.draw();
    },
    goWriteInfo(){
      let url = `/pages/client/writeInfo?orderId=${this.orderId}&goods=${encodeURIComponent(JSON.stringify(this.goods))}`;
      
      // wx.redirectTo({ url, });
      this.navigateTo(url);
    },
    closeToast(){
      let url = `/pages/client/writeInfo?orderId=${this.orderId}&goods=${encodeURIComponent(JSON.stringify(this.goods))}`;

      if(this.showToast === -1) return this.showToast = 0;

      if(this.goods && this.goods.rewardType === 'VIRTUAL') 
        return this.navigateTo(`/pages/client/poster?orderId=${this.orderId}&goods=${encodeURIComponent(JSON.stringify(this.goods))}`);
        // return wx.redirectTo({ url: `/pages/client/poster?orderId=${this.orderId}&goods=${encodeURIComponent(JSON.stringify(this.goods))}` });

      // if(this.showToast === 1){ return wx.redirectTo({ url, }); }
      if(this.showToast === 1){ return this.navigateTo(url); }
    }
  };

  async draw(){
    let index;

    if(!this.canSubmit){ return ; }
    this.canSubmit = false;

    this.rotate = true;
    let res = await req.post(`/castrol/api/v1/ownerOrder/lottery`, { orderId: Number(this.orderId) }, { 'Authorization': wx.getStorageSync('token') });

    if(res.data){
      this.list.forEach((v, i) => v.id === res.data.id ? index = i : null);
      this.degree = 360 * 12 + (360 - index * 60);
      this.second = 3 + index;
      this.goods = res.data;

      console.error('draw ', res, this.degree, this.second);
      this.successInfo[1] = `获得${this.goods.name}礼品一份`;
    }

    setTimeout(() => {
      this.showToast = this.goods ? 1 : -1;
      this.toastInfo = this.showToast === 1 ? this.successInfo : this.errorInfo;


      this.canSubmit = true;
      this.$apply();
    }, this.second * 1000);

    this.$apply();
  }

  async getList(){
    wx.showLoading({ title: 'Loading...' });
    let res = await req.get(`/castrol/api/v1/reward`, {}, { 'Authorization': wx.getStorageSync('token') });

    // console.error(res);
    if(res && res.data){
      this.list = res.data.rewards;
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
