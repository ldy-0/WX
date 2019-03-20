<style>
page {
  height: 100%;
}
</style>
<style scoped>
.container {
  height: 100%;
  font: 28rpx PingFang-SC-Medium;
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
.user_img {
  width: 148rpx;
  height: 148rpx;
  border-radius: 50%;
  border: 4rpx solid #d2a87c;
  overflow: hidden;
  margin: 0rpx auto;
  margin-top: 105rpx;
  margin-bottom: 84rpx;
}
.input_box {
  width: 485rpx;
  height: 62rpx;
  box-shadow: inset 0rpx 3rpx 1rpx 0px rgba(90, 47, 8, 0.52);
  border-radius: 12rpx;
  border: solid 1rpx #4a4332;
  margin: 0 auto;
  margin-bottom: 38rpx;
  background: rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
}
.input{
  width: 100%;
}
.inline {
  padding-left: 20rpx;
  color: #dddddd;
}
.input_downbox {
  width: 485rpx;
  justify-content: space-between;
  color: #dddddd;
  font-size: 22rpx;
  position: relative;
}
.input_downImg {
  width: 50rpx;
  height: 54rpx;
  padding-right: 4rpx;
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
.agreement_modal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: #000;
}
.agreement_box {
  position: fixed;
  border: 4rpx solid #bd956e;
  width: 624rpx;
  height: 1180rpx;
  background: #000;
  color: #ddd;
  left: 64rpx;
  top: 100rpx;
  z-index: 999;
}
.close_wrap{
  position: absolute;
  top: -25rpx;
  left: -25rpx;
}
.i_close{
  width: 50rpx;
  height: 50rpx;
}
.agreement_cha {
  position: absolute;
  width: 50rpx;
  height: 50rpx;
  top: -14rpx;
  right: -16rpx;
}
.agreement_txt {
  width: 556rpx;
  margin: 0 auto;
  font-family: HYb1gj;
  font-size: 21rpx;
  font-weight: normal;
  font-stretch: normal;
  line-height: 31rpx;
  letter-spacing: 0rpx;
}
.m_top {
  margin-top: 90rpx;
}
.agreement_title {
  color: #bd956e;
  width: 556rpx;
  margin: 0 auto;
  font-size: 21rpx;
  margin-top: 50rpx;
}
.m_top2 {
  margin-top: 50rpx;
}
.submit_btn {
  position: relative;
  width: 544rpx;
  margin: 0 auto;
  margin-top: 30rpx;
  font-size: 32rpx;
  background: rgba(255, 255, 255, 0);
  height: 84rpx;
  z-index: 3;
}
.sub_img {
  width: 504rpx;
  height: 84rpx;
}
.sub_txt {
  position: absolute;
  top: 0;
  left: 0;
  width: 544rpx;
  height: 84rpx;
  font-family: HYb2gj;
  text-align: center;
  line-height: 100rpx;
  color: #5a2f08;
  font-size: 26rpx;
}
.logo_img {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 414rpx;
  height: 173rpx;
  z-index: 2;
}
.scroll_box {
  position: absolute;
  left: 0;
  bottom: -229rpx;
  width: 482rpx;
  height: 229rpx;
  border-radius: 10rpx;
  background: #000;
  z-index: 9;
}
.check_show {
  width: 100%;
  height: 44rpx;
  line-height: 44rpx;
  background: #ba926c;
  color: #000;
  padding-left: 20rpx;
}
.check_hide {
  width: 100%;
  height: 44rpx;
  line-height: 44rpx;
  color: #fff;
  padding-left: 20rpx;
}
</style>

<template>
  <view class="container">
    <image class="bg_img" src="../images/bg.png" alt>
    <view class="user_img">
      <open-data type="userAvatarUrl"></open-data>
    </view>
    <form bindsubmit="formSubmit">
      <view class="input_box">
        <input 
          type="text"
          name="name"
          class="inline input"
          placeholder-style="font-size:22rpx;color:#dddddd;"
          placeholder="您的姓名"
          value='{{user.name}}' >
      </view>
      <view class="input_box">
        <input
          type="number"
          name="phone"
          class="inline input"
          placeholder-style="font-size:22rpx;color:#dddddd;"
          placeholder="您的电话"
          value='{{user.mobile}}'
        >
      </view>
      <view class="input_box input_downbox">
        <text class="inline">{{scrollTxt1? scrollTxt1:'您的职位'}}</text>
        <image class="input_downImg" src="../images/btn_5@2x.png" alt @tap="checkScroll(1)">
        <scroll-view scroll-y style="height:230rpx" class="scroll_box" wx:if="{{checkIndex==1}}">
          <repeat for="{{positionList}}" index="index" item="itemtxt">

            <view class="{{positionIndex == index ? 'check_show' : 'check_hide'}}" @tap="checkShop1" data-itemtxt="{{itemtxt}}" data-index="{{index}}">{{itemtxt.name}}</view>

          </repeat>
        </scroll-view>
      </view>
      <view class="input_box input_downbox">
        <text class="inline">{{scrollTxt2? scrollTxt2:'集团'}}</text>
        <image class="input_downImg" src="../images/btn_5@2x.png" alt @tap="checkScroll(2)">
        <scroll-view scroll-y style="height:230rpx" class="scroll_box" wx:if="{{checkIndex==2}}">
          <repeat for="{{groupList}}" index="index" item="itemtxt">

            <view class="{{groupIndex == index ? 'check_show' : 'check_hide'}}" @tap="checkShop2" data-itemtxt="{{itemtxt}}" data-index="{{index}}" >{{itemtxt.groupName}}</view>

          </repeat>
        </scroll-view>
      </view>
      <view class="input_box input_downbox">
        <text class="inline">{{scrollTxt3? scrollTxt3:'品牌'}}</text>
        <image class="input_downImg" src="../images/btn_5@2x.png" alt @tap="checkScroll(3)">
        <scroll-view scroll-y style="height:230rpx" class="scroll_box" wx:if="{{checkIndex==3}}">
          <repeat for="{{brandList}}" index="index" item="itemtxt">

            <view class="{{brandIndex == index ? 'check_show' : 'check_hide'}}" @tap="checkShop3" data-itemtxt="{{itemtxt}}" data-index="{{index}}">{{itemtxt.brandName}}</view>

          </repeat>
        </scroll-view>
      </view>
      <view class="agree_downBox">
        <view class="agree_btn" @tap="agreeBtn">
          <view wx:if="{{agree}}" class="agree_btnSpot"></view>
        </view>
        <view class="agree_txt" @tap="agreementBtn">我已阅读并同意本协议</view>
      </view>
      <button formType="submit" class="submit_btn">
        <image class="sub_img" src="../images/btn_4@2x.png" alt>
        <view class="sub_txt">{{isUpdate ? '修改信息' : '即刻注册 参加极护钛强服务顾问挑战赛'}}</view>
      </button>
    </form>

    <image class="logo_img" src="../images/logo.png" alt>

    <view class='agreement_modal' wx:if="{{agreement}}" @tap='agreementBtn'>
      <view class="agreement_box">

        <view class='close_wrap'>
          <image class='i_close' src='../images/global/close.png' mode='aspectFill' />
        </view>

        <view
          class="agreement_txt m_top"
        >为更好地提升用户服务及使用体验，我们可能会收集、保存并使用您的个人信息（例如姓名，手机号码、电子邮箱、地址、出生年月、社交媒体信息、个人喜好等）。</view>
        <view class="agreement_title">信息的收集和保存</view>
        <view
          class="agreement_txt"
        >我们将收集并储存您通过注册账户、填写电子表单、口述等各种方式直接或间接提供给我们的信息。我们可能会将您的个人信息分享给BP集团的其他公司以及第三方服务供应商（统称为“接受方”）。这些接受方可能在中国大陆以外的地区。</view>
        <view class="agreement_title">信息的使用</view>
        <view
          class="agreement_txt"
        >我们使用您的个人信息来向您提供所需的产品或服务。同时，我们将通过您的个人信息联系您，并向您介绍您可能感兴趣的嘉实多产品或服务。</view>
        <view class="agreement_title">信息的保护</view>
        <view class="agreement_txt"
        >我们制定了政策和程序，来促使您的个人信息在受我们控制时（包括接受方控制时）得到保护（无论是静止数据还是传送中的数据）。但是同其他公司一样，我们无法保证您的信息百分之百安全或保密，特别是在黑客袭击或第三方的服务器被入侵等特殊情况之下。</view>
        <view class="agreement_txt m_top2"
        >通过勾选“同意”并继续使用我们的服务，您同意我们向您发送营销通讯，并确认您同意本同意书所列的条款。如您不希望使用我们的服务，请勾选“我不同意授权使用个人信息”并提交。</view>
        <view class="agreement_txt m_top2">再次感谢您的信任与支持。</view>
        <view class="agreement_txt m_top2">嘉实多（深圳）有限公司</view>
      </view>
    </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
import req from "../utils/request.js";
export default class register extends wepy.page {
  config = {
    navigationBarTitleText: ""
  };
  data = {
    agree: false,
    agreement: false,
    checkIndex: null, 
    itemList1: [1, 2, 3, 4],
    positionIndex: -1,
    groupIndex: -1,
    brandIndex: -1,
    scrollTxt1: null,
    scrollTxt2: null,
    scrollTxt3: null,
    user: {},
    adviser: {},
    isUpdate: false,
    brandList: [],
    groupList: [],
    positionList: [
      // { id: -1, name: '未选择' },
      { id: 1, name: '服务顾问' },
      { id: 2, name: '服务经理' },
      { id: 3, name: '其他' },
      { id: 4, name: '机修工' },
      { id: 5, name: '备件经理' },
      { id: 6, name: '总经理' },
    ],
    canSubmit: true,
  };
  components = {};
  computed = {};
  methods = {
    agreeBtn() {
      this.agree = !this.agree;
    },
    agreementBtn() {
      this.agreement = !this.agreement;
    },
    formSubmit(e) {
      let v = e.detail.value,
        phone = /^((0\d{2,3}-\d{7,8})|(1\d{10}))$/;

      if (!v.name) {
        return wx.showToast({ title: "姓名不能为空!", icon: "none", duration: 1000 });
      }
      if (v.phone === "" || !phone.test(v.phone)) {
        return wx.showToast({ title: "手机号格式不正确!", icon: "none", duration: 1000 });
      }

      if(this.positionIndex === -1) return wx.showToast({ title: "请选择职位!", icon: "none", duration: 1000 });
      if(this.groupIndex === -1) return wx.showToast({ title: "请选择集团!", icon: "none", duration: 1000 });
      if(this.brandIndex === -1) return wx.showToast({ title: "请选择品牌!", icon: "none", duration: 1000 });
      console.error(this.positionIndex, this.groupIndex, this.brandIndex);

      if(!this.agree){
        return wx.showToast({ title: "请点击同意协议!", icon: "none", duration: 1000 });
      }

      if(!this.canSubmit) return console.error('cancel');
      this.canSubmit = false;

      this.save(v);
    },
    checkShop1(e) {
      this.positionIndex = e.currentTarget.dataset.index;
      this.scrollTxt1 = e.currentTarget.dataset.itemtxt.name;
      this.checkIndex = null;
    },
    checkShop2(e) {
      let ds = e.currentTarget.dataset;

      this.groupIndex = ds.index;
      this.scrollTxt2 = ds.itemtxt.groupName;
      this.checkIndex = null;
    },
    checkShop3(e) {
      let ds = e.currentTarget.dataset;

      this.brandIndex = ds.index;
      this.scrollTxt3 = ds.itemtxt.brandName;
      this.checkIndex = null;
    },
    checkScroll(e) {
      if (e === this.checkIndex) {
        this.checkIndex = 0;
      } else {
        this.checkIndex = e;
      }
    },
  };

  onLoad(opt){
    if(opt.adviser){
      this.isUpdate = true;
      this.adviser = JSON.parse(decodeURIComponent(opt.adviser));
      this.init();
    }

    this.getGroupList();
    this.getBrandList();
  }

  onShow() {}

  init(){
    let ad = this.adviser,
        index;

    this.user = {
      name: ad.name,
      mobile: ad.phone,
    };

    if(ad.position){
      this.scrollTxt1 = this.positionList[ad.position - 1].name;
      this.positionIndex = ad.position - 1;
    }

    this.scrollTxt2 = ad.groupName;
    this.scrollTxt3 = ad.brandName;

    this.agree = ad.agreement;
  }

  async save(v){
    wx.showLoading({ title: 'Loading...' });

    let group = this.groupList[this.groupIndex],
        brand = this.brandList[this.brandIndex],
        param;
    
    param = {
      name: v.name,
      phone: v.phone,
      position: this.positionList[this.positionIndex].id,
      groupId: group.groupId,
      groupName: group.groupName,
      brandId: brand.brandId,
      brandName: brand.brandName,
      agreement: this.agree,
    }

    let res = this.isUpdate 
              ? await req.put(`/castrol/api/v1/seller`, param, { Authorization: wx.getStorageSync('token') })
              : await req.post(`/castrol/api/v1/seller`, param, { Authorization: wx.getStorageSync('token') });

    console.error(`register type ${this.isUpdate ? 'update' : 'add'}`, res);
    if(res.data){
      wx.setStorageSync('adviserInfo', res.data);

      // return wx.redirectTo({ url: `/pages/waiterHome`, });
      return this.navigateTo(`/pages/waiterHome`);
    }else{
      this.canSubmit = true;
      wx.hideLoading();
      return wx.showModal({ content: res.moreInfo, showCancel: false });
    }

    this.canSubmit = true;
    wx.hideLoading();
    wx.showModal({ content: res.moreInfo, showCancel: false });
  }

  async getBrandList(){
    let index,
        res = await req.get(`/castrol/api/v1/seller/brands`, {}, { Authorization: wx.getStorageSync('token') });

    // console.error('brandList ', res);
    if(!res.data){
      return wx.showModal({ content: res.moreInfo, showCancel: false });
    }

    this.brandList = res.data;

    if(this.isUpdate){
      this.brandList.forEach((v, i) => { v.brandId == this.adviser.brandId ? index = i : null; });
      this.brandIndex = index;
    }

    this.$apply();
  }
  async getGroupList(){
    let index,
        res = await req.get(`/castrol/api/v1/seller/groups`, {}, { Authorization: wx.getStorageSync('token') });
    // console.error(res);
    if(!res.data){
      return wx.showModal({ content: res.moreInfo, showCancel: false });
    }

    this.groupList = res.data;

    if(this.isUpdate){
      this.groupList.forEach((v, i) => { v.groupId == this.adviser.groupId ? index = i : null; });
      this.groupIndex = index;
    }

    this.$apply();
  }

  navigateTo(url){
    let length = getCurrentPages().length;
    length >= 9 ? wx.reLaunch({ url }) : wx.navigateTo({ url });
  }
}
</script>

