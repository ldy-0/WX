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
.user_infoBox {
  position: relative;
  width: 694rpx;
  height: 108rpx;
  margin: 0 auto;
  margin-top: 34rpx;
}
.user_img {
  position: absolute;
  top: -8rpx;
  left: -2rpx;
  width: 118rpx;
  height: 118rpx;
  border-radius: 50%;
  border: 4rpx solid #d2a87c;
  overflow: hidden;
}
.i_user{
  width: 100%;
  height: 100%;
}
.info_bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 694rpx;
  height: 108rpx;
}
.user_txtBox {
  position: absolute;
  width: 320rpx;
  margin-left: 140rpx;
  margin-top: 22rpx;
  font-size: 25rpx;
  color: #ffffff;
}
.user_name, .user_address{
  width: 120rpx;
  height: 30rpx;
  font-weight: bold;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.user_address{
  flex-shrink: 0;
  width: 220rpx;
  overflow: hidden;
}

.info_btn {
  position: absolute;
  display: block;
  width: 170rpx;
  height: 58rpx;
  top: 22rpx;
  right: 26rpx;
}
.nav_box {
  position: relative;
  width: 652rpx;
  height: 652rpx;
  margin: 0 auto;
  margin-top: 30rpx;
}

.main_wrap{
  position: relative;
  margin: 30rpx 0 0;
  display: flex;
  justify-content: center;
}
.main_bg {
  /* width: 650rpx; */
  /* height: 650rpx; */
}

.appointment_wrap, .story_wrap, .limit_wrap, .challenge_wrap{
  position: absolute;
}
.appointment_title, .story_title, .limit_title, .challenge_title{
  width: 88rpx;
  margin: 8rpx 0 0;
  font-size: 22rpx;
  text-align: center;
}

.appointment_wrap{
  top: 115rpx;
  left: calc(50% - 48rpx);
}
.i_car{
  width: 97rpx;
  height: 63rpx;
}
.story_wrap{
  top: 265rpx;
  left: 480rpx;
}
.story_title{
  width: 112rpx;
}
.i_story{
  display: block;
  width: 68rpx;
  height: 73rpx;
  margin: 0 auto;
}
.limit_wrap{
  top: 415rpx;
  left: calc(50% - 48rpx);
}
.i_limit{
  width: 97rpx;
  height: 70rpx;
}
.challenge_wrap{
  top: 265rpx;
  left: 170rpx;
}
.i_challenge{
  display: block;
  width: 68rpx;
  height: 73rpx;
  margin: 0 auto;
}

.logo_wrap{
  position: absolute;
  right: 8%;
  bottom: 16%;
}
.i_logo{
  width: 106rpx;
  height: 106rpx;
  background: #fff;
}

.btn_wrap{
  position: absolute;
  top: calc(50% - 40rpx);
  left: calc(50% - 150rpx);
  width: 300rpx;
  height: 80rpx;
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
  line-height: 80rpx;
  font-size: 25rpx;
  font-weight: bold;
  text-align: center;
}

.scroll_wrap{
  height: 650rpx;
}

.clear{
  padding: 0;
  border: none;
}

.flex{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.s_fc_1{ color: #fff; }
.s_fc_2{ color: #c49e71; }

.s_bg_2{ background: rgba(40, 37, 24, 1); }
</style>

<template>
  <view class="container">
    <image class="bg_img" src="../images/bg.png" alt>
    <image class="banner_img" src="../images/banner.png" alt>

    <view>
      <view class="user_infoBox">
        <image class="info_bg" src="../images/user_bg.png" alt>
        <view class="user_img">
          <image class='i_user' src='{{user.wx_avatar}}' mode='aspectFill' />
          <!-- <open-data type="userAvatarUrl"></open-data> -->
        </view>
        <view class="user_txtBox">
          <view class='flex'>
            <view class='user_name'>{{adviser.name}}</view>
            <view class='user_address'>{{adviser.groupName}}</view>
          </view>
          <view>目前钛强排名：{{adviser.rank}}</view>
        </view>
        <image class="info_btn" src="../images/my_btn.png" alt @tap='goUpdate' />
      </view>

    <!-- <view class='scroll_wrap'> -->
      <!-- <scroll-view scroll-y style='height: 100%;'> -->
        <view class="main_wrap s_fc_2">
          <image class="main_bg" style='width: {{height}}rpx; height: {{height}}rpx;' src="../images/module_bg.png" alt>

          <view class='appointment_wrap' @tap="goModule('appointment')">
            <image class='i_car' src='../images/home/car.png' />
            <view class='appointment_title'>{{appointmentText}}</view>
          </view>

          <view class='story_wrap' @tap="goModule('story')">
            <image class='i_story' src='../images/home/story.png' />
            <view class='story_title'>{{storyText}}</view>
          </view>

          <view class='limit_wrap' @tap="goModule('limit')">
            <image class='i_limit' src='../images/home/limit.png' />
            <view class='limit_title'>{{limitText}}</view>
          </view>

          <view class='challenge_wrap' @tap="goModule('challenge')">
            <image class='i_challenge' src='../images/home/challenge.png' />
            <view class='challenge_title'>{{challengeText}}</view>
          </view>

        </view>

        <!-- <view class='' style='width: 100%; height: 100rpx; background: transparent;'></view> -->
      <!-- </scroll-view> -->
    <!-- </view> -->
    </view>

    <!-- <view class='logo_wrap'>
      <image class='i_logo' src='../images/home/logo.png' />
    </view> -->

    <toast wx:if="{{showToast}}">
      <view class='btn_wrap' @tap='go'>
        <image class='i_btn' src='../images/btn1.png' mode='aspectFill' />
        <button class="clear btn_ctn s_fc_3" plain='true' open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo">微信登入</button>
      </view>
    </toast>

    <tabBar :list.sync='tabBarList'></tabBar>

  </view>
</template>

<script>
import wepy from "wepy";
import tabBar from "../components/tabBar";
import toast from "../components/toast";
import { shttp } from "../utils/http";
import { signIn } from "../utils/user-tools";
import req from "../utils/request.js";

export default class Waiterhome extends wepy.page {
  config = {
    navigationBarTitleText: "",
  };

  data = {
    appointmentText: '车主邀约助手',
    storyText: '嘉实多极护品牌故事',
    limitText: '我的极限挑战成果',
    challengeText: '极限挑战',
    tabBarList: [],
    showToast: false,
    adviser: {},
    user: {},
    scene: null,
    height: 650,
  };

  components = {
    tabBar,
    toast,
  };

  onLoad(options) {
    let gd = this.$parent.globalData;
    this.tabBarList = gd.adviserTabBarList;

    // 是否通过扫码进入
    if(options.scene){
      // console.error(options.scene);
      this.scene = options.scene;
    }
  }

  onShow() {
    this.getUserInfo();
    this.getAdviserInfo();

    let s = wx.getSystemInfoSync();
    this.height = this.height - (s.screenWidth - s.windowWidth) * s.pixelRatio;
    console.error(this.height, s);
  }

  methods = {
    goUpdate(){
      if(!this.adviser.name) return ;

      let url = `/pages/register?adviser=${encodeURIComponent(JSON.stringify(this.adviser))}`;
      // wx.navigateTo({ url, });
      this.navigateTo(url);
    },
    goModule(type){
      let url = `/pages/${type}/index`;

      this.navigateTo(url);
      // wx.reLaunch({ url });
    },
    // 查询用户是否有服务顾问信息
    async onGotUserInfo(e){
      wx.showLoading({ title: 'Loading...' });

      let wxUserInfo = e.detail.userInfo,
          url,
          param;

      if(wxUserInfo){
        url = `/castrol/api/v1/users/userInfo/seller`;

        param = { encryptedData: e.detail.encryptedData, iv: e.detail.iv, };
        // if(this.scene === '0') param.scan = true;
        param.scan = this.scene === '0' ? true : false;

        const res = await req.post(url, param, { Authorization: wx.getStorageSync('token') });
        console.error('login', res.data);

        // 用户且没有扫码进入(108: 已抽奖用户)
        if(res.code == 108 || res.code == 109){
          // console.error(res);
          wx.setStorageSync('code', res.code);
          return this.navigateTo(`/pages/client/prizeList`);
        }

        if(res.data){
          wx.setStorageSync('adviserInfo', res.data);
          this.adviser = res.data;
          this.showToast = false;
        }else{
          // if(res.moreInfo) return wx.showModal({ content: res.moreInfo, showCancel: false, });
          wx.navigateTo({ url: `/pages/register`, });
        }

        // cached userinfo
        let memberInfo = {
          wx_name: wxUserInfo.nickName,
          wx_avatar: wxUserInfo.avatarUrl,
        };
        wx.setStorageSync("memberInfo", memberInfo);
        this.user = memberInfo;

      } 

      this.$apply();
      wx.hideLoading();
    }
  };

  navigateTo(url){
    let length = getCurrentPages().length;
    length >= 9 ? wx.reLaunch({ url }) : wx.navigateTo({ url });
  }
  // 获取服务顾问信息
  async getAdviserInfo(){
    let adviser = wx.getStorageSync('adviserInfo');
    console.error('adviser :', adviser);

    //微信用户登录换取token，并将token存入本地缓存中
    const userInfo = await signIn(false);
    if (userInfo.data.code === 1) {
      wx.setStorageSync("token", userInfo.header.Authorization);
    }

    // if(this.user.wx_name && !adviser) return wx.redirectTo({ url: `/pages/register` });
    if(this.user.wx_name && !adviser) return this.navigateTo(`/pages/register`);

    let res = await req.get(`/castrol/api/v1/seller/one`, {}, { 'Authorization': wx.getStorageSync('token') });
    // console.error('rank :', res.data);
    if(res && res.data && adviser){
      adviser.rank = res.data.rank;
      wx.setStorageSync('adviserInfo', adviser);
    }

    this.adviser = adviser;
    this.$apply();
  }
  // 获取微信用户信息
  getUserInfo(){
    let user = wx.getStorageSync('memberInfo'),
        url;

    // 
    if(!user){
      console.error('no memberInfo');
      this.showToast = true;
    }else{
      this.user = user;
      this.showToast = false;
    }
  }

}
</script>
