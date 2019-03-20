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
  left: calc(50% - 325rpx);
  width: 650rpx;
  margin: 15rpx 0 0;
}

.top_list{
  margin: 40rpx 0 0; 
  width: 100%;
  white-space: nowrap;
}
.top_item{
  display: inline-block;
  position: relative;
  top: -10rpx;
  width: 210rpx;
  height: 320rpx;
  margin: 0 4rpx 0 0;
  background: #fff;
}
.top_item_bg{
  width: 100%;
  height: 100%;
}
.top_item_index{
  position: absolute;
  top: 20rpx;
  left: 0rpx;
  font-size: 23rpx;
  transform: rotate(-45deg);
}
.i_index{
  position: absolute;
  top: 0;
  left: 0;
  width: 80rpx;
  height: 80rpx;
}
.top_1{
  top: 0;
  width: 230rpx;
  height: 350rpx;
  margin: 0 4rpx 0 20rpx;
}
.i_first{
  position: absolute;
  top: 10rpx;
  right: 10rpx;
  width: 53rpx;
  height: 30rpx;
}

.rule_title{
  margin: 40rpx 0 20rpx 0;
  font-size: 22rpx;
  font-weight: bold;
}
.rule_desc{
  margin: 8rpx 0 0;
  line-height: 36rpx;
  font-size: 22rpx;
}
.dot{
  flex-shrink: 0;
  width: 14rpx;
  height: 14rpx;
  margin: 10rpx 10rpx 0 0;
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
  top: 20rpx;
  left: calc(50% - 70rpx);
  width: 140rpx;
  font-size: 34rpx;
  font-weight: bold;
}

.video_wrap{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  margin: 20rpx auto 0;
}
.video{
  width: 100%;
  height: 100%;
}

.scroll_wrap{
  height: 240rpx;
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
.s_bg_3{ background: rgba(40, 37, 24, 1); }
</style>

<template>
  <view class="container">
    <image class="bg_img" src="../../images/bg.png" mode='aspectFill' alt>
    <image class="banner_img" src="../../images/banner.png" alt>

    <scroll-view scroll-x class='top_list'>
        <repeat for='{{list}}'>

          <view class="top_item {{index ? '' : 'top_1'}}" @tap='goDetail({{index}})'>
            <image class='top_item_bg' src='{{item.douYinPicture}}' mode='aspectFill' />

            <image class='i_index' src='{{indexURL}}' mode='aspectFill' />
            <view class='top_item_index s_fc_1'>TOP{{index + 1}}</view> 

            <image class='i_first' src='{{topURL}}' mode='aspectFill' wx:if='{{!index}}' />
          </view>

        </repeat>
    </scroll-view>

    <view class='video_wrap' wx:if='{{showVideo}}'>
      <video class='video' id='video' src='{{video.douYinVideoPath}}' poster='{{video.douYinPicture}}' bindfullscreenchange="fullScreenChange"></video>
    </view>

    <view class="main_wrap s_fc_1">


      <view class='rule_title'>活动规则</view>

      <view class='scroll_wrap' wx:if="{{!isX}}">
      <scroll-view scroll-y style='height: 100%;'>

        <repeat for='{{ruleList}}'>
          <view class='rule_desc flex s_fc_4' style='align-items: flex-start;'>
            <view class='dot s_bg_2'></view>
            <view class=''>{{item.name}}</view>
          </view>
        </repeat>
      <!-- <view class='btn_wrap'>
        <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
        <view class='btn_ctn s_fc_3'>我已Get!</view>
      </view> -->
        <view class='' style='width: 100%; height: 100rpx; background: transparent;'></view>
      </scroll-view>
      </view>

      <view wx:if="{{isX}}">
        <repeat for='{{ruleList}}'>
          <view class='rule_desc flex s_fc_4' style='align-items: flex-start;'>
            <view class='dot s_bg_2'></view>
            <view class=''>{{item.name}}</view>
          </view>
        </repeat>
        <view class='' style='width: 100%; height: 100rpx; background: transparent;'></view>
      </view>

    </view>


    <tabBar :list.sync='tabBarList'></tabBar>

  </view>
</template>

<script>
import wepy from "wepy";
import tabBar from "../../components/tabBar";
import { shttp } from "../../utils/http";
import req from "../../utils/request.js";

export default class Waiterhome extends wepy.page {
  config = {
    navigationBarTitleText: "",
  };

  data = {
    ruleList: [
      { name: '挑战者需根据主题《极限由我，激发高昂表现》进行短视频创作并带有标签#极限由我#或#激发高昂表现#或#嘉实多极护#于抖音平台发布；' },
      { name: '视频内容需有嘉实多LOGO或极护专享产品露出；' },
      { name: '主办方将会根据视频创意，质量及点赞数为依据，评选出四个优秀视频，入选者每人还会得到额外50积分奖励！ 优秀视频中的Top1还可获得嘉实多极护品牌体验之旅特权 领略专业赛道的速度与激情.' },
      { name: '需入选者在销售智多星平台联系工作人员获得积分。' },
    ],
    tabBarList: [],
    indexURL: '../../images/challenge/index.png',
    topURL: '../../images/challenge/top_1.png',
    list: [],
    showVideo: false,
    video: {},
    videoCtx: null,
    isX: false,
  };

  components = {
    tabBar,
  };

  onLoad(options) {
    let gd = this.$parent.globalData;
    gd.tabIndex = -1;
    this.tabBarList = gd.adviserTabBarList;

    let sys = wx.getSystemInfoSync();
    this.isX = sys.screenHeight >= 667;// 750;
    // console.error(sys.screenHeight);

    this.getList();
  }

  onShow() {}

  methods = {
    fullScreenChange(e){
      let o = e.detail;
      if(!o.fullScreen) this.showVideo = false;
    },
    goDetail(index){
      
      this.video = this.list[index];

      this.videoCtx = wx.createVideoContext('video');
      this.videoCtx.requestFullScreen({ direction: 0 });


      this.showVideo = true;
      // let url = `/pages/challenge/video?video=${encodeURIComponent(JSON.stringify(this.list[index]))}`;
      // wx.redirectTo({ url });
    },
    goUpdate(){
      let url = `/pages/register?user=${encodeURIComponent(JSON.stringify(this.user))}`;
      wx.navigateTo({ url, });
    },
    goModule(){

    }
  };

  async getList(){
    wx.showLoading({ title: 'Loading...' });
    let res = await req.get(`/castrol/api/v1/douYinVideo`, { size: 9999, page: 1 }, { Authorization: wx.getStorageSync('token') });

    if(res && res.data){
      // console.error(res.data);
      this.list = res.data.videos.slice(0, 4);
    }

    wx.hideLoading();
    this.$apply();
  }
}
</script>
