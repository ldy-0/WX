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

.video_item{
  padding: 30rpx 0;
  
}
.line{
  border-bottom: 2rpx solid #7d6245;
}
.video_title{
  /* width: 450rpx; */
  font-size: 38rpx;
  /* font-weight: bold; */
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
.video_tip{
  margin: 20rpx 0 0;
  font-size: 18rpx;
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
  top: 20rpx;
  left: calc(50% - 70rpx);
  width: 140rpx;
  font-size: 34rpx;
  font-weight: bold;
}

.scroll_wrap{
  height: 50vh;
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

    <view class="main_wrap s_fc_1">

      <view class='scroll_wrap'>
        <scroll-view scroll-y style='height: 100%;'>

        <repeat for='{{list}}'>
          <view class="video_item {{(index + 1) < list.length ? 'line' : ''}}">
            <repeat for='{{item.nameList}}' item='name'>
              <view class='video_title'>{{name}}</view>
            </repeat>
            <video id="{{'video' + index}}" class='video' src='{{item.videoPath}}' play-btn-position='center' poster='{{item.content}}' autoplay='{{index === 0}}'></video>

            <repeat for='{{item.descList}}' item='desc' index='d_index'>
              <view class='video_desc flex s_fc_4' style='align-items: flex-start;'>
                <view class='dot s_bg_2'></view>
                <view class=''>{{desc}}</view>
              </view>
            </repeat>

            <view class='video_tip s_fc_4' wx:if="{{item.tip}}">{{item.tip}}</view>

          </view>
        </repeat>
      
        </scroll-view>
      </view>

      <view class='btn_wrap' @tap='goHome'>
        <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
        <view class='btn_ctn s_fc_3'>我已Get!</view>
      </view>

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
    playURL: '../../images/global/play.png',
    list: [],
  };

  components = {
    tabBar,
  };

  onLoad(options) {
    let gd = this.$parent.globalData;
    gd.tabIndex = -1;
    this.tabBarList = gd.adviserTabBarList;

    this.getList();
  }

  onShow() {}

  onHide(){
    let arr = this.list.map((v, i) => wx.createVideoContext(`video${i}`)); 
    arr.forEach(v => { v.stop(); });
  }

  onUnload(){
    let arr = this.list.map((v, i) => wx.createVideoContext(`video${i}`)); 
    arr.forEach(v => { v.stop(); });
  }

  methods = {
    goHome(){
      let url = `/pages/waiterHome`;
      wx.navigateBack({ delta: 1, });
    },
  };

  async getList(){
    wx.showLoading({ title: 'Loading...' });
    let res = await req.get(`/castrol/api/v1/marketVideo`, { size: 9999 }, { 'Authorization': wx.getStorageSync('token') });

    if(res && res.data){
      let vList = res.data.marketVideos;
      vList.forEach(v => {
        let page;

        v.nameList = v.title.split('\\br');
        v.otherData = JSON.parse(v.otherData);
        // get video descList and tip info
        page = v.otherData.needPage.filter(o => o.page === 1);
        v.descList = page[0] && page[0].description ? page[0].description.descList : [];
        v.tip = page[0] && page[0].description ? page[0].description.tip : '';
      });

      this.list = vList.filter(v => v.otherData.needPage.filter(o => o.page === 1).length);
      console.error(this.list, vList);
    }
    // this.list = [
    //   { nameList: ['嘉实多极护激发高昂表现'], src: 'aaa' },
    //   { nameList: ['嘉实多极护,钛强机油，遇强更强'], src: 'aaa', 
    //     descList: ['发动机金属部件间的摩擦可能会导致最高可达10%的动力损失。', 
    //                 '嘉实多极护专享系列拥有钛流体强化技术，专为领先汽车制造商研发，在压力之下激发更强性能表现,并减少金属间摩擦.',
    //                 '激发引擎设计性能'],
    //     tip: '*参考国际摩擦学47卷2012版',
    //   },
    //   { nameList: ['嘉实多极护SUPERCAR润滑油', '通过极限测试的极限性能表现'] }
    // ];
    wx.hideLoading();
    this.$apply();
  }
}
</script>
