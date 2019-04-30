<template>
    <section>
        <view class="my">
            <image class="bg-img" src="../../../images/bg_2@2x.png">
            <view class="head">
                <!-- <open-data class="user-img" type="userAvatarUrl"></open-data> -->
                <image class='user-img' src='{{memberInfo.wx_avatar}}' />
                <view>
                    <!-- <open-data class="login" type="userNickName" lang="zh_CN"></open-data> -->
                    <view class='login'>{{memberInfo.wx_name}}</view>
                    <view class='parent s_bg_0' wx:if="{{parentStr}}">{{parentStr}}</view>
                </view>
            </view>
        </view>
        <view class="earnings">
            <view class="allEarnings">总收益(元)</view>
            <view class="cash">
                <text>{{info.total_predeposit}}</text>
                <text class='available_predeposit'>可提现佣金<text>{{info.available_predeposit}}</text>元</text>
            </view>
            <button @tap = "toDiscounting">提现</button>
        </view>
        <view class="invite">
            <view wx:for = "{{showArray}}" wx:key class="boxIndex" @tap = "switchPage" data-index = "{{index}}">
                <image src="{{item.src}}" />
                <view class="inviteMsg">
                    <text>{{item.title}}</text>
                    <text>{{item.describe}}</text>
                </view>
            </view>
        </view>
    </section>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../../../utils/http";

export default class Distribution extends wepy.page {
    config = {
        navigationBarTitleText: "分销中心"
    };
    data = {
        showArray:[
            {
                src:"../../../images/distribution/group.png",
                title: "",
                describe:"我的团队",
            },
            {
                src:"../../../images/distribution/invite.png",
                title:"邀请好友",
                describe:"扫码推广",
            }
        ],
        info: null,
        memberInfo: null,
    };

    computed = {
        isMain(){ return this.$parent.globalData.type == 1 },
        parentStr(){ 
            let inviter = this.info && this.info.inviter; 
            return inviter ? `推荐人：${inviter}` : ''; 
        },
    }

    methods = {
        switchPage(e){
            let index = e.currentTarget.dataset.index;
            let url = '';

            url = index === 0 ? `/pages/my/distribution/myGroup?count=${this.info.junior}` : "/pages/my/distribution/scanCode";

            if(index && this.memberInfo.call_mall == '0') return wx.showModal({ content: '未开启名片商城', showCancel: false });

            wx.navigateTo({ url, })
        },
        toDiscounting(){
            wx.navigateTo({ url: `/pages/my/distribution/discounting?price=${this.info.available_predeposit}` })
        }
    }

    onLoad(opt){
        this.memberInfo = wx.getStorageSync('memberInfo');

    }
    onShow(){
        this.getInfo();
    }

    async getInfo(){
      wx.showLoading({ title: 'Loading...' }); 
      let res = await shttp.get(`/api/v2/member/memberwithdraw/1`).query({}).end();

      if(res && res.data){
        this.info = res.data;
        this.showArray[0].title = res.data.junior;
      }

      this.$apply();
      wx.hideLoading();

      if(res.error){
        wx.showModal({ content: res.error, showCancel: false });
      }

    }
}
</script>

<style scoped>
    section{
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
    .login {
        margin: 0 0 0 22rpx;
        font-size: 32rpx;
    }
    .earnings{
        box-sizing: border-box;
        width: 690rpx;
        min-height: 322rpx;
        margin: 30rpx auto 0;
        padding: 30rpx 70rpx;
        border-radius: 10rpx;
        background-color: #fff;
    }
    .allEarnings{
        color: #444;
        font-size: 36rpx;
        letter-spacing: 1rpx;
    }
    .earnings button{
        width: 519rpx;
        height: 70rpx;
        line-height: 70rpx;
        border-radius: 35rpx;
        background-color: #4fb84a;
        border: none;
        outline: none;
        margin-top: 40rpx;
        color: #fff;
        font-size: 30rpx;
        letter-spacing: 1rpx;
    }
    .cash{
        margin-top: 30rpx;
    }
    .cash>text:first-child{
        color: #4fb84a;
        letter-spacing: 2rpx;
        font-size: 60rpx;
        margin-right: 42rpx;
    }
    .cash text:nth-child(2){
        color: #999;
        font-size: 30rpx;
        letter-spacing: 1rpx;
    }
    .cash text:nth-child(2) text{
        color: #222;
        font-size: 30rpx;
    }
    .invite{
        width: 690rpx;
        height: 322rpx;
        margin: 0 auto;
        margin-top: 50rpx;
        display: flex;
        justify-content: space-between;
        overflow: hidden;

    }
    .invite > view{
        width: 335rpx;
        height: 139rpx;
        border-radius: 10rpx;
        background-color: #fff;
        box-sizing: border-box;
        padding: 36rpx 65rpx;
        overflow: hidden;
    }
    .invite image{
        width: 55rpx;
        height: 45rpx;
        float: left;
        margin-top:12rpx;
        margin-right:18rpx;
    }
    .invite .boxIndex:nth-child(2) image{
        width: 48rpx;
        height: 48rpx;
    }
    .inviteMsg{
        display: flex;
        flex-direction: column;
    }
    .inviteMsg text:first-child{
        color: #222;
        letter-spacing: 1rpx;
        font-size: 30rpx;
    }
    .inviteMsg text:nth-child(2){
        color: #999;
        letter-spacing: 1rpx;
        font-size: 24rpx;
    }

.parent{
    margin: 20rpx 0 0 20rpx;
    padding: 10rpx 30rpx; 
    border-radius: 20rpx;
    font-size: 22rpx;
}

.available_predeposit{
  display: inline-block;
}

.s_bg_0{ background: rgba(0, 0, 0, 0.2) }
</style>