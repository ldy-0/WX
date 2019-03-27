<template>
    <section>
        <view class="my">
            <image class="bg-img" src="../../images/bg_2@2x.png">
            <view class="head">
                <open-data class="user-img" type="userAvatarUrl"></open-data>
                <open-data class="content inputStyle login" type="userNickName" lang="zh_CN"></open-data>
            </view>
        </view>
        <view class = "earnings">
            <view class="allEarnings">
                总收益(元)
            </view>
            <view class="cash">
                <text>1000.00</text>
                <text>可提现佣金<text>50.00</text>元</text>
            </view>
            <button @tap = "toDiscounting">提现</button>
        </view>
        <view class="invite">
            <view wx:for = "{{showArray}}" wx:key class="boxIndex" @tap = "switchPage" data-index = "{{index}}">
                <image src = "{{item.src}}"/>
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
export default class Distribution extends wepy.page {
    config = {
        navigationBarTitleText: "分销中心"
    };
    data = {
        showArray:[
            {
                src:"../../images/icon_7_tuandui@2x.png",
                title:"11",
                describe:"我的团队",
            },
            {
                src:"../../images/icon_7_erweima@2x.png",
                title:"邀请好友",
                describe:"扫码推广",
            }
        ]
    };
    methods = {
        switchPage(e){
            let index = e.currentTarget.dataset.index;
            let url = '';
            url = index === 0 ? "./myGroup" : "./scanCode";
            if(url != ''){
                wx.navigateTo({
                    url,
                })
            }
        },
        toDiscounting(){
            wx.navigateTo({
                url: "./discounting"
            })
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
        /* position: relative; */
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
    .my .head .login {
        padding: 22rpx;
        font-size: 32rpx;
    }
    .earnings{
        width: 690rpx;
        height: 322rpx;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 10rpx;
        margin-top: 30rpx;
        box-sizing: border-box;
        padding: 30rpx 70rpx;
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
    .cash text:first-child{
        color: #4fb84a;
        letter-spacing: 2rpx;
        font-size: 60rpx;
    }
    .cash text:nth-child(2){
        color: #999;
        font-size: 30rpx;
        letter-spacing: 1rpx;
        margin-left: 42rpx;
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

</style>


