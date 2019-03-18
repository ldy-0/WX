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
  margin-top: 18rpx;
}


.activity_title_wrap, .main_wrap{
  position: relative;
  left: calc(50% - 310rpx);
  width: 620rpx;
}
.activity_title, .activity{
  position: relative;
  margin: 10rpx 0 0 10rpx;
  width: calc(100% - 20rpx);
  height: calc(100% - 20rpx);
}
.activity_title_bg, .activity_bg{
  width: 100%;
  height: 100%;
}

.activity_title_wrap{
  margin: 120rpx 0 0;
  height: 128rpx;
  border: 2rpx solid #7d6245;
}
.activity_title_ctn{
  position: absolute;
  top: calc(50% - 30rpx);
  left: calc(50% - 145rpx);
  width: 330rpx;
  height: 60rpx;
  font-size: 25rpx;
  line-height: 1.2;
  text-align: center;
}

.main_wrap{
  margin: 60rpx 0 0;
  display: flex;
  justify-content: space-between;
}
.activity_wrap{
  position: relative;
  width: 260rpx;
  height: 260rpx;
  border: 2rpx solid #7d6245;
}
.activity_info_wrap{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
}
.activity_date, .activity_name, .activity_desc{
  width: 240rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.activity_date{
  height: 32rpx;
  margin: 25rpx 0 0;
  font-size: 25rpx;
}
.activity_name{
  height: 50rpx;
  margin: 40rpx 0 0;
  font-size: 36rpx;
}
.activity_desc{
  height: 30rpx;
  font-size: 23rpx;
}
.lock{
  opacity: 0.6;
}

.i_lock{
  position: absolute;
  right: 10rpx;
  bottom: 10rpx;
  width: 63rpx;
  height: 76rpx;
}


.flex{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.s_fc_1{ color: #fff; }
.s_fc_2{ color: #c49e71; }

</style>

<template>
  <view class="container">
    <image class="bg_img" src="../../images/bg.png" mode='aspectFill' alt>
    <image class="banner_img" src="../../images/banner.png" alt>

    <view class='activity_title_wrap'>
        <view class='activity_title'>
          <image class='activity_title_bg' src='../../images/activity/activity_title_bg.png' />
          <view class='activity_title_ctn s_fc_1'>{{activityTitle}}</view>
        </view>
    </view>

    <viwe class="main_wrap s_fc_2">

      <view class='activity_wrap' @tap="goModule('appointment')">
        <view class="activity ">
          <image class='activity_bg' src='../../images/activity/activity_bg.png' />
          <view class='activity_info_wrap s_fc_1'>
            <view class='activity_date'>{{activity.date}}</view>
            <view class='activity_name'>{{activity.name}}</view>
            <view class='activity_desc'>{{activity.desc}}</view>
          </view>
        </view>
        <!-- <image class='i_lock' src='../../images/activity/lock.png' mode='aspectFill' /> -->
      </view>

      <view class='activity_wrap' @tap="goModule('appointment')">
        <view class="activity lock">
          <image class='activity_bg' src='../../images/activity/activity_bg.png' />
          <view class='activity_info_wrap s_fc_1'>
            <view class='activity_date'>{{activity2.date}}</view>
            <view class='activity_name'>{{activity2.name}}</view>
            <view class='activity_desc'>{{activity2.desc}}</view>
          </view>
        </view>
        <image class='i_lock' src='../../images/activity/lock.png' mode='aspectFill' />
      </view>

    </viwe>


    <tabBar :list.sync='tabBarList'></tabBar>

  </view>
</template>

<script>
import wepy from "wepy";
import tabBar from "../../components/tabBar";
import { shttp } from "../../utils/http";

export default class Waiterhome extends wepy.page {
  config = {
    navigationBarTitleText: "",
  };

  data = {
    activityTitle: '2019年全年极护钛强服务顾问挑战赛活动规则',
    tabBarList: [],
    user: {},
    activity: { date: '4-5月主题', name: '极限由我极限由我', desc: '挑战自我  Show出实力挑战自我  挑战自我' },
    activity2: { date: '8-9月主题', name: '激发高昂表现', desc: '码上行动享极限之旅' },
  };

  components = {
    tabBar,
  };

  onLoad(options) {
    let gd = this.$parent.globalData;
    this.tabBarList = gd.adviserTabBarList;

    this.getUserInfo();
  }

  onShow() {}

  methods = {
    goUpdate(){
      let url = `/pages/register?user=${encodeURIComponent(JSON.stringify(this.user))}`;
      wx.navigateTo({ url, });
    },
    goModule(){

    }
  };

  async getUserInfo(){
    this.user = {
      name: '李建国',
      address: '永达吴中路大众中心永达吴中路大众中心永达吴中路大众中心',
      score: 100,
      mobile: '13211122233',
    }
  }
}
</script>
