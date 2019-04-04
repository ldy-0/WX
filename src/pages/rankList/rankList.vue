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
  margin-top: 128rpx;
}
.s_banner_img{
  margin: 68rpx auto 0;
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
  margin: 30rpx 0 0;
  height: 88rpx;
  /* border: 2rpx solid #7d6245; */
}
.activity_title_ctn{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  line-height: 88rpx;
  font-size: 34rpx;
  font-weight: bold;
  text-align: center;
}

.rank_list{
  padding: 20rpx 0 0;  
  /* min-height: 740rpx; */
}
.rank_item_wrap{
  padding: 15rpx 0;
  font-size: 25rpx;
  border-bottom: 2rpx solid #7d6245;
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
  height: 100%;
  line-height: 80rpx;
  font-size: 34rpx;
  font-weight: bold;
  text-align: center;
}

.flex{
  display: flex;
  justify-content: center;
  align-items: center;
}
.between{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.level{
  flex-shrink: 0;
  width: 100rpx;
  text-align: center;
}
.interval{
  flex-shrink: 0;
  width: 360rpx;
}
.name{
  flex-shrink: 0;
  width: 100rpx;
  text-align: center;
  word-break: break-all;
}

.scroll_wrap{
  height: 40vh;
}

.s_fc_1{ color: #fff; }
.s_fc_2{ color: #c49e71; }
.s_fc_3{ color: #5a2f08; }

.s_bg_2{ background: rgba(40, 37, 24, 1); }
.s_bg_3{ background: #060707 }
.s_bg_4{ background: #201b16 }
</style>

<template>
  <view class="container">
    <image class="bg_img" src="../../images/bg.png" mode='aspectFill' alt>
    <image class="banner_img {{isSmallScreen ? 's_banner_img' : ''}}" src="../../images/banner.png" alt>

    <view class='activity_title_wrap'>
        <!-- <view class='activity_title'> -->
          <image class='activity_title_bg' src='../../images/activity/activity_title_bg.png' />
          <view class='activity_title_ctn s_fc_1'>{{rankListTitle}}</view>
        <!-- </view> -->
    </view>
    <view class="main_wrap s_fc_1">

      <view class='scroll_wrap'>
      <scroll-view scroll-y style='height: 100%;'>

        <view class='rank_list'>
            <repeat for='{{rankList}}'>

              <view class="rank_item_wrap between {{index % 2 === 0 ? 's_bg_3' : 's_bg_4'}}">
                <view class='level'>{{item.level}}</view>
                <view class='interval'>{{item.groupName}}</view>
                <view class='name'>{{item.name}}</view>
              </view>

            </repeat>
        </view>

      </scroll-view>
      </view>

      <view class='btn_wrap' @tap='goHome'>
        <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
        <view class='btn_ctn s_fc_3'>继续冲刺</view>
      </view>

      <view class='' style='height: 270rpx; background: transparent;'></view>
    </view>


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
    rankListTitle: '极限英雄榜TOP10',
    tabBarList: [],
    rankList: [],
    levelList: ['第一名', '第二名', '第三名', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名'],
    isSmallScreen: false,
    analyTitle: 'sa_click',
  };

  components = {
    tabBar,
  };

  onLoad(options) {
    let gd = this.$parent.globalData;
    this.tabBarList = gd.adviserTabBarList;

    let sys = wx.getSystemInfoSync();
    this.isSmallScreen = sys.screenHeight < 568;
    // this.isSmallScreen = sys.screenHeight < 568 || /Huawei|HUAWEI/g.test(sys.brand);

    this.getRankList();
  }

  onShow() {
  }

  methods = {
    goHome(){
      let gb = this.$parent.globalData;
      gb.tabIndex = 0;

      let url = `/pages/waiterHome`;
      // wx.redirectTo({ url, });
      this.navigateTo(url);

      // analy
      wx.reportAnalytics(this.analyTitle, { page: `rankList`, el: `${'continueBtn'}` }); 
    },
    goModule(){

    }
  };

  format(v, i){
    let pattern = /^[\u4e00-\u9fa5]/g.test(v.name) && v.name.length === 3 ? /\S(?=\S$)/g : /\S$/g;
    // console.error('高丹华'.replace(/\S(?=\S$)/g, '*'));

    v.level = this.levelList[i];
    v.name = v.name.replace(pattern, '*');
  }

  async getRankList(){
    wx.showLoading({ content: 'Loading...' });
    let res = await shttp.get(`/api/v1/seller/ranks`).query({ page: 1, limit: 10 }).end();

    if(res.data){
      res.data.forEach(this.format.bind(this));
      this.rankList = res.data;
    }

    this.$apply();
    wx.hideLoading();
  }

  navigateTo(url){
    let length = getCurrentPages().length;
    length >= 9 ? wx.reLaunch({ url }) : wx.navigateTo({ url });
  }
}
</script>
