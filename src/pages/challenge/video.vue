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

.main_wrap{
  position: relative;
  left: calc(50% - 325rpx);
  width: 650rpx;
  margin: 15rpx 0 0;
}

.video_item{
  padding: 30rpx 0;
  /* border-bottom: 2rpx solid #7d6245; */
}
.video_title{
  width: 450rpx;
  font-size: 38rpx;
  margin: 0 auto;
  text-align: center;
}
.video{
  display: block;
  width: 480rpx;
  height: 270rpx;
  margin: 20rpx auto 0;
}
.video_desc{
  margin: 20rpx 0 0;
  font-size: 22rpx;
}
.dot{
  flex-shrink: 0;
  width: 14rpx;
  height: 14rpx;
  margin: 8rpx 10rpx 0 0;
  border-radius: 50%;
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
  top: 0;
  left: 0;
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 25rpx;
  font-weight: bold;
  text-align: center;
}

.desc_wrap{
  margin: 35rpx 0 0;
  font-size: 22rpx;
  text-align: center;
}

.auth_btn_wrap{
  position: relative;
  top: calc(50% - 40rpx);
  left: calc(50% - 150rpx);
  width: 300rpx;
  height: 80rpx;
}
.clear{
  padding: 0;
  border: none;
}

.flex{
  display: flex;
  align-items: center;
}

.s_fc_1{ color: #fff; }
.s_fc_2{ color: #c49e71; }
.s_fc_3{ color: #5a2f08; }
.s_fc_4{ color: #c2996f; }

.s_bg_1{ background: #fff; }
.s_bg_2{ background: #c2996f; }
</style>

<template>
  <view class="container">
    <image class="bg_img" src="../../images/bg.png" mode='aspectFill' alt>
    <image class="banner_img" src="../../images/banner.png" alt>

    <view class="main_wrap s_fc_1">

        <repeat for='{{list}}'>
          <view class='video_item'>
            <view class='video_title'>{{item.douYinName}}</view>
            <video class='video' src='{{item.douYinVideoPath}}' poster='{{item.douYinPicture}}'></video>

            <!-- <view class='desc_wrap s_fc_4'>
              <repeat for='{{descList}}'>
                <view>{{item}}</view>
              </repeat>
            </view> -->
            <!-- <view class='video_desc flex s_fc_4' style='align-items: flex-start;'>
              <view class='dot s_bg_2'></view>
              <view class=''>发动机金属部件间的摩擦可能会导致最高可达10%的动力损失。</view>
            </view> -->
          </view>
        </repeat>

      <!-- <view class='btn_wrap' @tap='go'>
        <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
        <view class='btn_ctn s_fc_3'>{{btnTitle}}</view>
      </view> -->

    </view>

    <!-- <toast wx:if="{{showToast}}">
      <view class='auth_btn_wrap'>
        <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
        <button class="clear btn_ctn s_fc_3" plain='true' open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo">微信登入</button>
      </view>
    </toast> -->

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
    descList: [
      '做任何事',
      '不仅需要发挥到百分之百',
      '更要学会挑战极限',
      '学会以最佳状态面对每一天',
      '在每一次超越别人，战胜自我的过程中',
      '发掘内心新的能量，激发高昂表现',
    ],
    tabBarList: [],
    playURL: '../../images/global/play.png',
    list: [],
    type: '',
    btnTitle: '我已Get!',
    showToast: false,
  };

  components = {
    tabBar,
    toast,
  };

  onLoad(options) {
    let gd = this.$parent.globalData;
    gd.tabIndex = -1;
    this.tabBarList = gd.adviserTabBarList;

    if(options.video){
      let video = JSON.parse(decodeURIComponent(options.video));
      console.error(video);
      this.list = [video];
    }

    this.type = options.type;
    this.$apply();

  }

  onShow() {}

  methods = {
    go(){
      let url;

      if(this.type === 'noRegister'){
        url = `/pages/client/index?type=goDraw`;
        // url = `/pages/register?user=${encodeURIComponent(JSON.stringify(this.user))}`;
      }else if(this.type === 'goDraw'){
        url = `/pages/client/draw`;
      }

      wx.redirectTo({ url, });
    },
  };

  async getUserInfo(){
    let user = wx.getStorageSync('memberInfo'),
        url;

    // 
    if(!user){
      console.error('no user');
      this.showToast = true;
      this.type === 'noRegister';
    }else{
      this.user = user;
      this.type === 'goDraw';
      this.btnTitle = '立即抽奖';
    }

    this.$apply();
  }

}
</script>
