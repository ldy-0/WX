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
            <view class='video_title'>{{item.title}}</view>
            <video class='video' src='{{item.videoPath}}' poster='{{playURL}}'></video>

            <view class='desc_wrap s_fc_4'>
              <repeat for='{{descList}}'>
                <view>{{item}}</view>
              </repeat>
            </view>
            <!-- <view class='video_desc flex s_fc_4' style='align-items: flex-start;'>
              <view class='dot s_bg_2'></view>
              <view class=''>发动机金属部件间的摩擦可能会导致最高可达10%的动力损失。</view>
            </view> -->
          </view>
        </repeat>

      <navigator open-type='exit' target='miniProgram' class='btn_wrap' @tap='go'>
        <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
        <view class='btn_ctn s_fc_3'>{{btnTitle}}</view>
      </navigator>

    </view>

    <toast wx:if="{{showToast}}">
      <view class='auth_btn_wrap'>
        <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
        <button class="clear btn_ctn s_fc_3" plain='true' open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo">微信登入</button>
      </view>
    </toast>

    <tabBar :list.sync='tabBarList' wx:if="{{type !== ''}}"></tabBar>

  </view>
</template>

<script>
import wepy from "wepy";
import tabBar from "../../components/tabBar";
import toast from "../../components/toast";
import { shttp } from "../../utils/http";
import req from "../../utils/request";
import { signIn } from "../../utils/user-tools";

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
    user: {},
    orderId: null,
  };

  components = {
    tabBar,
    toast,
  };

  async onLoad(options) {
    let gd = this.$parent.globalData;
    gd.tabIndex = 0;
    gd.clientTabBarList[0].path = `/pages/client/index?scene=${options.scene}`;
    this.tabBarList = gd.clientTabBarList;

    //微信用户登录换取token，并将token存入本地缓存中
    wx.showLoading({ title: 'Loading...' });
    const userInfo = await signIn(false);
    // console.error('user', userInfo);

    if (userInfo.data.code === 1) {
      let auth = userInfo.header.Authorization;
      wx.setStorageSync("token", auth);
    }

    if(options.scene && options.scene.indexOf('*') !== -1){
      this.type = 'goDraw';
      this.btnTitle = '立即抽奖';
      this.orderId = Number(options.scene.substr(1));
      console.error(options.scene, this.type);
    }

    this.getUserInfo();
  }

  onShow() {

  }

  methods = {
    go(){
      let url;

      if(!this.type){ return ; } 

      if(this.type === 'goDraw'){
        url = `/pages/client/draw?orderId=${this.orderId}`;
      }

      wx.redirectTo({ url, });
    },
    // 查询用户是否有
    async onGotUserInfo(e){
      wx.showLoading({ title: 'Loading...' });
      let wxUserInfo = e.detail.userInfo,
          url;

      if(wxUserInfo){
        url = `/castrol/api/v1/users/userInfo/owner`;

        const res = await req.post(url, { encryptedData: e.detail.encryptedData, iv: e.detail.iv, }, { Authorization: wx.getStorageSync('token') });
        console.error('login', res.data);

        if(res.data){
          this.showToast = false;
        }else{
          return ;
        }

        // cached userinfo
        let memberInfo = {
          wx_name: wxUserInfo.nickName,
          wx_avatar: wxUserInfo.avatarUrl,
        };
        wx.setStorageSync("clientInfo", memberInfo);
        this.user = memberInfo;

      } 

      this.$apply();
      wx.hideLoading();
    }
  };
  
  getUserInfo(){
    let user = wx.getStorageSync('clientInfo'),
        url;

    if(!user){
      console.error('no client user');
      this.showToast = true;
    }else{
      this.user = user;
    }

    this.getList();
    this.$apply();
  }

  async getList(){
    let res = await req.get(`/castrol/api/v1/marketVideo`, { size: 9999 }, { 'Authorization': wx.getStorageSync('token') });

    if(res && res.data){
      let vList = res.data.marketVideos;
      vList.forEach(v => {
        let page;

        v.nameList = v.title.split('\br');
        v.otherData = JSON.parse(v.otherData);
        // get video descList and tip info
        page = v.otherData.needPage.filter(o => o.page === 2);
        v.descList = page[0] && page[0].description ? page[0].description.descList : [];
        v.tip = page[0] && page[0].description ? page[0].description.tip : '';
      });

      this.list = vList.filter(v => v.otherData.needPage.filter(o => o.page === 2).length);
      // console.error(this.list, vList);
    }

    wx.hideLoading();
    this.$apply();
  }
  
}
</script>
