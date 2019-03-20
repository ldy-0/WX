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


.activity_title_wrap, .main_wrap{
  position: relative;
  left: calc(50% - 300rpx);
  width: 600rpx;
}
.activity_title_bg, .activity_bg{
  width: 100%;
  height: 100%;
}

.activity_title_wrap{
  margin: 40rpx 0 0;
  height: 88rpx;
}
.activity_title_ctn{
  position: absolute;
  top: 30rpx;
  left: 0;
  width: 100%;
  font-size: 25rpx;
  text-align: center;
}

.main_wrap{
  margin: 50rpx 0 0;
}
.appointment_wrap{
  position: relative;
  width: 600rpx;
  height: 360rpx;
  border-radius: 12rpx;
  /* border: 2rpx solid #7d6245; */
}
.appointment_bg{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.5;
  border-radius: 12rpx;
}
.appointment{
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 24rpx;
  font-size: 25rpx;
}
.appointment_desc{
  margin: 25rpx 0 0;
  font-size: 22rpx;
}
.placeholder_wrap{
  position: absolute;
  top: 24rpx;
  left: 24rpx;
  font-size: 25rpx;
}

.btn_wrap{
  position: relative;
  width: 300rpx;
  height: 80rpx;
  margin: 40rpx auto 0;
}
.i_btn{
  width: 100%;
  height: 100%;
}
.btn_ctn{
  position: absolute;
  top: 0;
  left: calc(50% - 100rpx);
  width: 200rpx;
  height: 100%;
  line-height: 80rpx;
  font-size: 25rpx;
  font-weight: bold;
}

.copy_wrap{
  position: relative;
  width: 240rpx;
  height: 60rpx;
  margin: 40rpx auto 0;
}
.i_copy{
  width: 100%;
  height: 100%;
}
.copy_ctn{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  line-height: 60rpx;
  font-size: 21rpx;
  font-weight: bold;
  text-align: center;
}

.ctn_wrap{
  position: absolute;
  top: calc(50% - 40rpx);
  left: calc(50% - 140rpx);
  width: 280rpx;
  font-size: 35rpx;
  text-align: center;
}

.flex{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.scroll_wrap{
  height: 770rpx;
}

.mt10{
  margin: 10rpx 0 0;
}

.s_fc_1{ color: #fff; }
.s_fc_2{ color: #c49e71; }
.s_fc_3{ color: #ddd; }
.s_fc_4{ color: #5a2f08; }

.s_bg_1{ background: #fff; }
.s_bg_2{ background: #5a2f08; }
.s_bg_3{ background: #aaa; }
.s_bg_4{ background: rgba(40, 37, 24, 1); }
</style>

<template>
  <view class="container">
    <image class="bg_img" src="../../images/bg.png" mode='aspectFill' alt>
    <image class="banner_img" src="../../images/banner.png" alt>

    <view class='scroll_wrap'>
    <scroll-view scroll-y style='100%;'>

    <view class='activity_title_wrap'>
        <!-- <view class='activity_title'> -->
          <image class='activity_title_bg' src='../../images/activity/activity_title_bg.png' />
          <view class='activity_title_ctn s_fc_1'>{{activityTitle}}</view>
        <!-- </view> -->
    </view>

    <view class="main_wrap s_fc_2">

      <view class='appointment_wrap'>
        <view class='appointment_bg s_bg_3'></view>
        <textarea maxlength="60" class='appointment s_fc_1' placeholder-class="s_fc_1" value='{{info}}' bindfocus="focusTextarea" @blur='blur' @input='getInfo'></textarea> 
        <view class='placeholder_wrap s_fc_1' wx:if="{{!(info || isFocus)}}">
          <view>请输入活动信息</view>
          <view class='mt10'>例：2019年12月12日 下午14：00</view>
          <view>在上海普陀区XXX 免费更换滤芯 胎压检测</view>
        </view>
      </view>
      <view class='appointment_desc s_fc_3'>{{appointmentTip}}</view>

    </view>

    <view class='btn_wrap' @tap='goPoster'>
        <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
        <view class='btn_ctn s_fc_4'>定制高昂专属海报</view>
    </view>

    <view class='copy_wrap' @tap='copy'>
        <image class='i_copy' src='../../images/btn1.png' mode='aspectFill' />
        <view class='copy_ctn s_fc_4'>一键复制我的专享优惠</view>
    </view>

    <toast wx:if='{{showSuccess}}' @close.user='closeToast'>
      <view class='ctn_wrap s_fc_3'>
        <view>已复制成功</view>
        <view>请发送给您的车主</view>
      </view>
    </toast>

    </scroll-view>
    </view>

    <view class='' style='height: 90rpx; background: transparent'></view>

    <tabBar :list.sync='tabBarList'></tabBar>

  </view>
</template>

<script>
import wepy from "wepy";
import tabBar from "../../components/tabBar";
import toast from "../../components/toast";
import { shttp } from "../../utils/http";

export default class Waiterhome extends wepy.page {
  config = {
    navigationBarTitleText: "",
  };

  data = {
    activityTitle: '来店选嘉实多极护，赢取极护品牌体验之旅特权',
    appointmentTip: '注意：活动信息内容请勿超过50字',
    placeholderTitle: '请输入活动信息',
    tabBarList: [],
    user: {},
    info: '',
    infoBackup: '',
    showSuccess: false,
    isFocus: false,
  };

  components = {
    tabBar,
    toast
  };

  onLoad(options) {
    let gd = this.$parent.globalData;
    gd.tabIndex = -1;
    this.tabBarList = gd.adviserTabBarList;

    // this.getUserInfo();
  }

  onShow() {}

  methods = {
    goPoster(){
      if(!this.infoBackup.length) return wx.showModal({ content: '请输入文字', showCancel: false });

      // let url = `/pages/appointment/poster?user=${encodeURIComponent(JSON.stringify(this.user))}&value=${this.infoBackup}`;
      let url = `/pages/appointment/poster?value=${this.infoBackup}`;
      // wx.navigateTo({ url, });
      this.navigateTo(url);
    },
    focusTextarea(e){
      console.error('--focus--');
      this.isFocus = true;
    },
    blur(e){
      this.isFocus = false;
    },
    getInfo(e){
      let v = e.detail.value;
      this.infoBackup = this.info = v;
    },
    copy(){
      let data = `来店保养选嘉实多极护\r\n赢取极护品牌体验之旅特权\r\n领略专业赛道的速度与激情\r\n${this.info}`;

      wx.setClipboardData({ 
        data, 
        success: e => { wx.hideToast(); this.info = ''; this.showSuccess = true; this.$apply(); },
      });
    },
    closeToast(){
      this.showSuccess = false;
      this.info = this.infoBackup;
    }
  };

  navigateTo(url){
    let length = getCurrentPages().length;
    length >= 9 ? wx.reLaunch({ url }) : wx.navigateTo({ url });
  }
  // async getUserInfo(){
  //   this.user = {
  //     name: '李建国',
  //     address: '永达吴中路大众中心永达吴中路大众中心永达吴中路大众中心',
  //     score: 100,
  //     mobile: '13211122233',
  //   }
  // }
}
</script>
