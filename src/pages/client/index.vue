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

.video_item{
  padding: 10rpx 0 20rpx 0;
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
  margin: 0rpx auto 0;
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
  margin: 25rpx 0 0;
  font-size: 22rpx;
  text-align: center;
}
.desc_item{
  min-height: 22rpx;
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

.agree_btn {
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
  border: solid 1rpx #ba8e60;
  margin-right: 12rpx;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.agree_btnSpot {
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  background: #ba8e60;
}
.agree_txt {
  font-family: HYb1gj;
  font-size: 22rpx;
  font-weight: normal;
  font-stretch: normal;
  line-height: 31px;
  letter-spacing: 0px;
  color: #dddddd;
  opacity: 0.86;
}
.agree_downBox {
  display: flex;
  justify-content: center;
  align-items: center;
}

.x_banner_img{
  margin: 180rpx auto 0;
}

.exit_title{
  margin: 80rpx 0 0;
  font-size: 36rpx;
  text-align: center;
}
.exit_btn_wrap{
  position: relative;
  top: 60rpx;
  left: calc(50% - 150rpx);
  width: 300rpx;
  height: 80rpx;
}

.x_agreement{
  margin: 40rpx 0 0;
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

.s_bg_1{ background: #fff; }
.s_bg_2{ background: #c2996f; }
</style>

<template>
  <view class="container">
    <image class="bg_img" src="../../images/bg.png" mode='aspectFill' alt>
    <image class="banner_img {{isX ? 'x_banner_img' : ''}}" src="../../images/banner.png" alt>

    <view class="main_wrap s_fc_1 {{isX ? 'x_main_wrap' : ''}}">

        <repeat for='{{list}}'>
          <view class='video_item'>
            <view class='video_title'>{{item.title}}</view>
            <video class='video' src='{{item.videoPath}}' poster='{{playURL}}'  wx:if='{{!showToast}}'></video>

            <view class='desc_wrap s_fc_4'>
              <repeat for='{{descList}}'>
                <view class='desc_item'>{{item}}</view>
              </repeat>
            </view>
            <!-- <view class='video_desc flex s_fc_4' style='align-items: flex-start;'>
              <view class='dot s_bg_2'></view>
              <view class=''>发动机金属部件间的摩擦可能会导致最高可达10%的动力损失。</view>
            </view> -->
          </view>
        </repeat>

      <!-- <navigator open-type='exit' target='miniProgram' class='btn_wrap' wx:if="{{type != 'goDraw'}}"> -->
      <view class='btn_wrap' @tap='changeExit' wx:if="{{canShow && type != 'goDraw'}}">
        <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
        <view class='btn_ctn s_fc_3'>{{btnTitle}}</view>
      </view>
      <!-- </navigator> -->
      <view class='btn_wrap' @tap='go' wx:if="{{canShow && type == 'goDraw'}}">
        <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
        <view class='btn_ctn s_fc_3'>{{btnTitle}}</view>
      </view>

      <view class="agree_downBox {{isX ? 'x_agreement' : ''}}" wx:if="{{canShow && type === 'goDraw'}}">
        <view class="agree_btn" @tap="changeAgree">
          <view wx:if="{{agree}}" class="agree_btnSpot"></view>
        </view>
        <view class="agree_txt" @tap="changeAgreement">我已了解消费者活动机制</view>
      </view>

    </view>

    <toast @close.user='closeToast' wx:if="{{showToast && !showExit}}">
      <view class='auth_btn_wrap'>
        <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
        <button class="clear btn_ctn s_fc_3" plain='true' open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo" wx:if="{{!showExit}}">微信登入</button>
      </view>
    </toast>
    <toast @close.user='closeToast' wx:if="{{showToast && showExit}}">
      <view class='exit_title s_fc_5'>是否确认退出小程序</view>
      <view class='exit_btn_wrap'>
        <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
        <navigator open-type='exit' target='miniProgram' class="clear btn_ctn s_fc_3" plain='true' lang="zh_CN" wx:if="{{showExit}}">确认</navigator>
      </view>
    </toast>

    <consumerActivity :isX.sync='isX' @close.user='changeAgreement' wx:if="{{showAgreement}}"></consumerActivity>

    <tabBar :list.sync='tabBarList' wx:if="{{type !== ''}}"></tabBar>

  </view>
</template>

<script>
import wepy from "wepy";
import tabBar from "../../components/tabBar";
import toast from "../../components/toast";
import consumerActivity from "../../components/consumerActivity";
import { shttp } from "../../utils/http";
import req from "../../utils/request";
import { signIn } from "../../utils/user-tools";

export default class Waiterhome extends wepy.page {
  config = {
    navigationBarTitleText: "",
  };

  data = {
    descList: [
      '站在每一次极限边缘',
      '勇敢突破，为自已赢得喝彩',
      ' ',
      '嘉实多极护专享系列',
      '拥有钛流体强化技术',
      '领先科技，激发引擎设计性能',
      '让每一次表现都是一次超越',
      '在每一次行动中，突破极限',
    ],
    tabBarList: [],
    playURL: '../../images/global/play.png',
    list: [],
    type: '',
    btnTitle: '我已Get!',
    showToast: false,
    user: {},
    orderId: null,
    status: -1, // 0: 页面跳转进入
    agree: false,
    showAgreement: false,
    isX: false,
    showExit: false,
    canShow: false,
  };

  components = {
    tabBar,
    toast,
    consumerActivity,
  };

  onLoad(options) {
    let gd = this.$parent.globalData,
        code = wx.getStorageSync('code'),
        token = wx.getStorageSync('token');
    gd.tabIndex = 0;
    gd.clientTabBarList[0].path = `/pages/client/index?scene=${options.scene}&status=0`;
    this.tabBarList = gd.clientTabBarList;
    console.error('options', options);

    // 海报二维码进入
    if(options.scene === '0'){ wx.setStorageSync('clientReferer', 'poster'); return ; }

    if(code == '108'){
      this.type = 'goDraw';
      this.btnTitle = '立即抽奖';
      this.orderId = Number(options.scene.substr(1));
      return ;
    }

    // 抽奖码进入
    if(options.scene && options.scene.indexOf('*') !== -1){
      this.type = 'goDraw';
      this.btnTitle = '立即抽奖';
      this.orderId = Number(options.scene.substr(1));
      wx.setStorageSync('clientReferer', 'draw');
      this.status = options.status;
      console.error(options, this.type, this.status);
    }

  } 
  async onShow() {
    let referer = wx.getStorageSync('clientReferer'),
        code = wx.getStorageSync('code');

    let sys = wx.getSystemInfoSync();
    this.isX = sys.screenHeight > 800;

    wx.showLoading({ title: 'Loading...' });
    const userInfo = await signIn(false);

    if (userInfo.data.code === 1) {
      let auth = userInfo.header.Authorization;
      wx.setStorageSync("token", auth);
    }else{
      return wx.showModal({ content: userInfo.data.error, showCancel: false });
    }

    if(referer !== 'poster' && this.status !== '0' && code != '108'){
      this.showToast = true;
    }

    this.canShow = true;

    this.getList();
  }

  methods = {
    changeAgree(){ this.agree = !this.agree },
    changeAgreement(){ this.showAgreement = !this.showAgreement },
    changeExit(){ this.showToast = this.showExit = true; },
    closeToast(){ if(this.showExit) this.showToast = this.showExit = false; },
    go(){
      let url;

      if(!this.type){ return ; } 

      if(!this.agree) return wx.showModal({ content: '请了解消费者活动机制', showCancel: false });

      if(this.type === 'goDraw'){
        url = `/pages/client/draw?orderId=${this.orderId}`;
      }

      // wx.redirectTo({ url, });
      this.navigateTo(url);
    },
    // 查询用户是否有
    async onGotUserInfo(e){
      wx.showLoading({ title: 'Loading...' });
      let wxUserInfo = e.detail.userInfo,
          url;

      if(wxUserInfo){
        url = `/castrol/api/v1/users/userInfo/owner`;

        const res = await req.post(url, { encryptedData: e.detail.encryptedData, iv: e.detail.iv, }, { Authorization: wx.getStorageSync('token') });
        console.error('login', res);

        // 已注册SA用户
        if(res.code == 107){
          this.type = '';
          this.btnTitle = '我已Get!';
          this.showToast = false;
          wx.setStorageSync('isSA', true);
          wx.hideLoading();
          return this.$apply();
        }

        if(res.data){
          // if(res.code === 108){
          //   this.type = 'goDraw';
          //   this.btnTitle = '立即抽奖';
          // }
          this.showToast = false;
          wx.setStorageSync('code', 108);
        }else{
          wx.hideLoading();
          return wx.showModal({ content: res.moreInfo, showCancel: false, });
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
        // v.descList = page[0] && page[0].description ? page[0].description.descList : [];
        // v.tip = page[0] && page[0].description ? page[0].description.tip : '';
      });

      this.list = vList.filter(v => v.otherData.needPage.filter(o => o.page === 2).length);
      // console.error(this.list, vList);
    }else{
      wx.hideLoading();
      return wx.showModal({ content: res.moreInfo, showCancel: false, });
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
