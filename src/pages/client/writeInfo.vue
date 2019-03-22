<style scoped>
page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container {
  width: 100%;
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

.main_container{
  overflow: hidden;
}

.main_wrap{
  position: relative;
  left: calc(50% - 325rpx);
  width: 650rpx;
  margin: 15rpx 0 0;
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
  top: 25rpx;
  left: calc(50% - 36rpx);
  width: 75rpx;
  font-size: 25rpx;
  font-weight: bold;
}

.tip{
  margin: 30rpx auto 60rpx;
  font-size: 22rpx;
  text-align: center;
}

.input_wrap{
  box-sizing: border-box;
  width: 480rpx;
  height: 60rpx;
  margin: 40rpx auto 0;
  padding: 4rpx 20rpx;
  border-radius: 12rpx;
}
.input{
  height: 52rpx;
  line-height: 52rpx;
  font-size: 22rpx;
}

.toast_title_wrap{
  margin: 70rpx 0 0;
  font-size: 35rpx;
  text-align: center;
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
  margin: 10rpx 0 0;
}

.flex{
  display: flex;
  align-items: center;
}

.s_fc_1{ color: #fff; }
.s_fc_2{ color: #c49e71; }
.s_fc_3{ color: #5a2f08; }
.s_fc_4{ color: #c2996f; }
.s_fc_5{ color: #9d7c56; }
.s_fc_6{ color: #ddd; }

.s_bg_1{ background: #fff; }
.s_bg_2{ background: #c2996f; }
.s_bg_3{ background: #000; }
.s_bg_4{ background: rgba(197, 197, 197, 0.4); }
</style>

<template>
  <view class="container">
    <image class="bg_img" src="../../images/bg.png" mode='aspectFill' alt>
    <image class="banner_img" src="../../images/banner.png" alt>

    <view class='main_container'>

      <view class="main_wrap s_fc_1">

        <center :list.sync="titleList" :config.sync='centerConfig'></center>

        <view class='tip s_fc_6'>{{tipTitle}}</view>

        <view class='input_wrap s_bg_4'>
          <input class='input s_fc_6' placeholder="您的姓名" placeholder-style="color: #ddd;" value='{{name}}' @input="getName" />
        </view>

        <view class='input_wrap s_bg_4'>
          <input type='number' class='input s_fc_6' placeholder="联系方式" placeholder-style="color: #ddd;" value='{{mobile}}' @input="getMobile" />
        </view>

        <view class='input_wrap s_bg_4'>
          <input class='input s_fc_6' placeholder="收货地址" placeholder-style="color: #ddd;" value='{{address}}' @input="getAddress" />
        </view>

        <view class="agree_downBox">
          <view class="agree_btn" @tap="changeAgree">
            <view wx:if="{{agree}}" class="agree_btnSpot"></view>
          </view>
          <view class="agree_txt" @tap="changeAgreement">我已阅读并同意本协议</view>
        </view>

        <view class='btn_wrap' @tap='submit'>
          <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
          <view class='btn_ctn s_fc_3'>{{btnTitle}}</view>
        </view>

      </view>
    </view>

    <agreement :isX.sync='isX' @close.user='changeAgreement' wx:if="{{showAgreement}}"></agreement>

    <!-- toast/弹窗 -->
    <toast wx:if="{{showToast}}" @close.user='closeToast'>
      <view>

        <view class='toast_title_wrap s_fc_6'>
          <repeat for="{{saveSuccessInfo}}">
            <view class="{{index === 2 ? 's_fc_5' : ''}}">{{item.value || item}}<text class='s_fc_5' wx:if="{{item.name}}">{{item.name}}</text></view>
          </repeat>
        </view>

      </view>
    </toast>

    <tabBar :list.sync='tabBarList'></tabBar>

  </view>
</template>

<script>
import wepy from "wepy";
import tabBar from "../../components/tabBar";
import toast from "../../components/toast";
import agreement from "../../components/agreement";
import center from "../../components/center";
import { shttp } from "../../utils/http";
import req from "../../utils/request";
import mp from "../../utils/wx";

export default class Waiterhome extends wepy.page {
  config = {
    navigationBarTitleText: "",
  };

  data = {
    centerConfig: {
      size: 38,
      top: 30,
    },
    tabBarList: [],
    titleList: ['恭喜您，获得', 'XXXXXXX'],
    saveSuccessInfo: ['恭喜您，尊贵的', '您获取的礼品', '', '将会在X个工作日内审核通过', '并且发放给您 请注意查收'],
    tipTitle: '请您留下正确个人信息 以便我们与您联系礼品寄送事宜',
    type: 'upload',
    btnTitle: '下一步',
    showToast: 0,
    name: '',
    mobile: '',
    address: '',
    orderId: null,
    goods: null,
    agree: false,
    showAgreement: false,
    isX: false,
  };

  components = {
    tabBar,
    toast,
    agreement,
    center,
  };

  onLoad(param) {
    let goods,
        gd = this.$parent.globalData;
    gd.tabIndex = -1;
    // gd.clientTabBarList[0].path = `/pages/client/index?scene=${param.orderId}`;
    this.tabBarList = gd.clientTabBarList;

    let sys = wx.getSystemInfoSync();
    this.isX = sys.screenHeight > 800;

    try{
      goods = JSON.parse(decodeURIComponent(param.goods)); 
      this.goods = goods;
      this.titleList[1] = this.goods.name;
    }catch(e){
      console.error(e);
    }

    this.orderId = param.orderId;
    this.$apply();
  }

  onShow() {}

  methods = {
    changeAgree(){ this.agree = !this.agree },
    changeAgreement(){ this.showAgreement = !this.showAgreement },
    getName(e){ this.name = e.detail.value; },
    getMobile(e){ this.mobile = e.detail.value; },
    getAddress(e){ this.address = e.detail.value; },
    async submit(){
      let mobile = /^((13[0-9])|(14[5|7|9])|(15([0-3]|[5-9]))|(17[0,1,3,5,6,7,8])|(18[0-9]))\d{8}$/;

      if(!this.name){ return wx.showModal({ content: '请输入您的名字', showCancel: false, }); }
      if(!this.mobile){ return wx.showModal({ content: '请输入您的联系方式', showCancel: false, }); }
      if(!this.address){ return wx.showModal({ content: '请输入您的地址', showCancel: false, }); }

      if(!mobile.test(this.mobile)){ return wx.showModal({ content: '请输入正确的联系方式', showCancel: false, }); }

      if(!this.agree) return wx.showModal({ content: '请同意协议', showCancel: false });

      this.save();
    },
    closeToast(){
      // console.error('close toast');
      // let url = `/pages/client/index?scene=*${this.orderId}`;
      let url = `/pages/client/prizeList`;
      // wx.redirectTo({ url, });
      this.navigateTo(url);
      // wx.navigateBack({ delta: 999 });
    }
  };

  async save(){
    let param;

    param = {
      ownerName: this.name,
      ownerPhone: this.mobile,
      address: this.address,
      orderId: Number(this.orderId),
      rewardId: this.goods.id,
    };

    let res = await req.post(`/castrol/api/v1/ownerOrder`, param, { 'Authorization': wx.getStorageSync('token') });

    console.error(res);

    this.clear();

    this.showToast = 1;
    let infoArr = this.saveSuccessInfo;
    infoArr[0] = { value: infoArr[0], name: param.ownerName };
    // infoArr[1] = `将会在${this.goods.auditDay}个工作日内审核通过`;
    infoArr[3] = `将会在7个工作日内审核通过`;
    infoArr[2] = this.goods.name;
    this.$apply();
  }

  clear(){
    this.name = '';
    this.mobile = '';
    this.address = '';
  }

  navigateTo(url){
    let length = getCurrentPages().length;
    length >= 9 ? wx.reLaunch({ url }) : wx.navigateTo({ url });
  }

}
</script>
