<style scoped>
page {
  height: 100%;
}
.container {
  position: relative;
  min-height: 100%;
  /* overflow: hidden; */
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
  margin: 50rpx 0 0;
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
}
.interval{
  flex-shrink: 0;
  width: 360rpx;
  /* height: 60rpx; */
  margin: 0 40rpx;
  /* white-space: nowrap; */
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
}
.name{
  flex-shrink: 0;
  width: 100rpx;
  text-align: center;
}

.s_fc_1{ color: #fff; }
.s_fc_2{ color: #c49e71; }
.s_fc_3{ color: #5a2f08; }

.s_bg_2{ background: rgba(40, 37, 24, 1); }
</style>

<template>
  <view class="container">
    <image class="bg_img" src="../../images/bg.png" mode='aspectFill' alt>
    <image class="banner_img" src="../../images/banner.png" alt>

    <view class='activity_title_wrap'>
        <!-- <view class='activity_title'> -->
          <image class='activity_title_bg' src='../../images/activity/activity_title_bg.png' />
          <view class='activity_title_ctn s_fc_1'>{{rankListTitle}}</view>
        <!-- </view> -->
    </view>

    <view class=''>
    <view class="main_wrap s_fc_1">

      <view class='rank_list'>
        <repeat for='{{rankList}}'>

          <view class="rank_item_wrap between">
            <view class='level'>{{item.level}}</view>
            <view class='interval'>{{item.groupName}}</view>
            <view class='name'>{{item.name}}</view>
          </view>

        </repeat>
      </view>

      <view class='btn_wrap' @tap='goHome'>
        <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
        <view class='btn_ctn s_fc_3'>继续冲刺</view>
      </view>

    </view>
    </view>

    <view class='s_bg_2' style='height: 90rpx;'></view>

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
  };

  components = {
    tabBar,
  };

  onLoad(options) {
    let gd = this.$parent.globalData;
    this.tabBarList = gd.adviserTabBarList;

    this.getRankList();
  }

  onShow() {}

  methods = {
    goHome(){
      let gb = this.$parent.globalData;
      gb.tabIndex = 0;

      let url = `/pages/waiterHome`;
      wx.redirectTo({ url, });
    },
    goModule(){

    }
  };

  async getRankList(){
    wx.showLoading({ content: 'Loading...' });
    let res = await shttp.get(`/api/v1/seller/ranks`).end();

    if(res.data){
      res.data.forEach((v, i) => v.level = this.levelList[i]);
      this.rankList = res.data;
    }
    // this.rankList = [
    //   { name: '李X琳', address: '上海XX门店上海XX门店上海XX门店', },
    //   { name: '李X琳', address: '上海XX门店上海XX门店上海XX门店上海XX门店', },
    //   { name: '李X琳', address: '上海XX门店上海XX门店上海XX门店上海XX门店', },
    //   { name: '李X琳', address: '上海XX门店上海XX门店上海XX门店上海XX门店', },
    //   { name: '李X琳', address: '上海XX门店上海XX门店上海XX门店上海XX门店', },
    //   { name: '李X琳', address: '上海XX门店上海XX门店上海XX门店上海XX门店', },
    //   { name: '李X琳', address: '上海XX门店上海XX门店上海XX门店上海XX门店', },
    //   { name: '李X琳', address: '上海XX门店上海XX门店上海XX门店上海XX门店', },
    //   { name: '李X琳', address: '上海XX门店上海XX门店上海XX门店上海XX门店', },
    //   { name: '李X琳', address: '上海XX门店上海XX门店上海XX门店上海XX门店', },
    // ];

    this.$apply();
    wx.hideLoading();
  }
}
</script>
