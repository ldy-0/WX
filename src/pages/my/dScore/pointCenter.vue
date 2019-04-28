<template>
    <section>
        <view class="my">
            <image class="bg-img" src="../../../images/bg_2@2x.png">
            <view class="head">
              <open-data class="user-img" type="userAvatarUrl"></open-data>
              <view>
                <open-data class="name" type="userNickName" lang="zh_CN"></open-data>
                <view class='level s_bg_0'>{{level}}</view>
              </view>
            </view>
        </view>
        <view class="earnings">
            <view class="point">
                <view class="info" wx:for='{{pointArray}}' wx:key>
                    <view>{{item.point}}</view>
                    <view>{{item.path}}</view>
                </view>
            </view>
            <button @tap="toTransferAccounts">转出</button>
        </view>

        <view class="invite">
            <view wx:for="{{showArray}}" wx:key class="boxIndex" @tap="switchPage" data-index="{{index}}">
                <image src = "{{item.src}}"/>
                <text>{{item.title}}</text>
            </view>
        </view>

        <navigator class='reset s_fc_2' url='/pages/my/dScore/reset'>忘记密码</navigator>

    </section>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../../../utils/http";

export default class PointCenter extends wepy.page {
  config = {
    navigationBarTitleText: "德分中心",
    disableScroll: true,
  };
  data = {
    showArray: [
      {
        src: "../../../images/dScore/in.png",
        title: "收入明细"
      },
      {
        src: "../../../images/dScore/out.png",
        title: "支出明细"
      }
    ],
    pointArray: [
      {
        point: "",
        path: "历史德分"
      },
      {
        point: "",
        path: "可用德分"
      }
    ],
    memberinfo: null,
  };

  computed = {
    level(){
      let level = [
        { id: 0, name: '体验代理' },
        { id: 1, name: 'VIP1' },
        { id: 2, name: 'VIP2' },
        { id: 3, name: 'VIP3' },
        { id: 4, name: 'VIP4' },
      ];

      if(this.memberInfo) return level.filter(v => v.id === this.memberInfo.vip_level)[0].name;
    },
  }

  methods = {
    switchPage(e) {
      let index = e.currentTarget.dataset.index;
      let url = "";
      url = index === 0 ? "./income" : "./expenditure";
  
      wx.navigateTo({ url }); 
    },
    toTransferAccounts() {
      wx.navigateTo({
        url: `./transferAccounts?amount=${this.pointArray[1].point}`
      });
    }
  };

  onLoad(){
  }

  onShow(){
    this.getRcbalance();
    this.getUserInfo();
  }

  async getRcbalance(){
    let res = await shttp.get(`/api/v2/member/rcbalance/1`).end();

    if(res && res.data){
      this.pointArray[0].point = res.data.total_rc_balance;
      this.pointArray[1].point = res.data.available_rc_balance;
    }

    this.$apply();
  }

  async getUserInfo(){
    let param = {};

    let res = await shttp.get(`/api/v2/member/memberinfo`).query(param).end();

    if(res && res.data){
      wx.setStorageSync('memberInfo', res.data);
    }

    this.memberInfo = wx.getStorageSync("memberInfo");

    this.$apply();
  }

}
</script>

<style scoped>
section {
  min-height: 100vh;
  background-color: rgb(244, 244, 244);
}
.my {
  width: 100%;
  height: 272rpx;
  z-index: 0;
}
.bg-img {
  width: 100%;
  height: 272rpx;
}
.my .head {
  position: absolute;
  left: 60rpx;
  top: 60rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.my .head .user-img {
  width: 121rpx;
  height: 121rpx;
  border-radius: 50%;
  border: 2rpx solid #fff;
  text-align: center;
  overflow: hidden;
}
.name{
  margin-left: 20rpx;
  font-size: 32rpx;
}
.earnings {
  width: 690rpx;
  height: 322rpx;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10rpx;
  margin-top: 30rpx;
  box-sizing: border-box;
  padding: 44rpx 0;
}

.earnings button {
  width: 519rpx;
  height: 70rpx;
  line-height: 70rpx;
  border-radius: 35rpx;
  background-color: #4fb84a;
  border: none;
  outline: none;
  margin-top: 36rpx;
  color: #fff;
  font-size: 30rpx;
  letter-spacing: 1rpx;
}

.invite {
  width: 690rpx;
  height: 322rpx;
  margin: 0 auto;
  margin-top: 50rpx;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.invite > view {
  width: 335rpx;
  height: 139rpx;
  border-radius: 10rpx;
  background-color: #fff;
  box-sizing: border-box;
  padding: 36rpx 70rpx 0rpx 82rpx;
  overflow: hidden;
}
.invite image {
  width: 48rpx;
  height: 48rpx;
  float: left;
  margin-top: 12rpx;
  margin-right: 16rpx;
}
.invite text {
  color: #222;
  letter-spacing: 1rpx;
  font-size: 28rpx;
  line-height: 75rpx;
}
.point {
  display: flex;
  justify-content: space-between;
}
.info {
  width: 50%;
  text-align: center;
}
.info view:first-child {
  color: #4fb84a;
  font-size: 60rpx;
  letter-spacing: 2rpx;
}
.info view:nth-child(2) {
  color: #444;
  font-size: 36rpx;
  letter-spacing: 1rpx;
  margin-top: 12rpx;
}

.reset{
  position: fixed;
  left: 0;
  bottom: 80rpx;
  width: 100%;
  font-size: 28rpx;
  text-align: center;
}

.level{
  margin: 20rpx 0 0 20rpx;
  padding: 10rpx 30rpx;
  border-radius: 20rpx;
  font-size: 22rpx;
}

.s_fc_2{ color: #2562bd; }

.s_bg_0{ background: rgba(0, 0, 0, 0.2); }
</style>


