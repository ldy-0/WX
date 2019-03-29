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
            <view class="point">
                <view class="info" wx:for = '{{pointArray}}' wx:key>
                    <view>{{item.point}}</view>
                    <view>{{item.path}}</view>
                </view>
            </view>
            <button @tap = "toTransferAccounts">转出</button>
        </view>
        <view class="invite">
            <view wx:for = "{{showArray}}" wx:key class="boxIndex" @tap = "switchPage" data-index = "{{index}}">
                <image src = "{{item.src}}"/>
                <text>{{item.title}}</text>
            </view>
        </view>
    </section>
</template>
<script>
import wepy from "wepy";
export default class PointCenter extends wepy.page {
    config = {
        navigationBarTitleText: "德分中心"
    };
    data = {
        showArray:[
            {
                src:"../../images/icon_8_shouru@2x.png",
                title:"收入明细", 
            },
            {
                src:"../../images/icon_8_zhichu@2x.png",
                title:"支出明细",
            }
        ],
        pointArray:[
            {
                point:"1000",
                path:"历史德分"
            },
            {
                point:"2000",
                path:"可用德分"
            }
        ]
    };
    methods = {
        switchPage(e){
            let index = e.currentTarget.dataset.index;
            let url = '';
            url = index === 0 ? "./income" : "./expenditure";
            if(url != ''){
                wx.navigateTo({
                    url,
                })
            }
        },
        toTransferAccounts(){
            wx.navigateTo({
                url: "./transferAccounts"
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
        padding: 44rpx 85rpx;
    }
  
    .earnings button{
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
        padding: 36rpx 70rpx 0rpx 82rpx;
        overflow: hidden;
    }
    .invite image{
        width: 48rpx;
        height: 48rpx;
        float: left;
        margin-top:12rpx;
        margin-right:16rpx;
    }
    .invite text{
        color: #222;
        letter-spacing: 1rpx;
        font-size: 28rpx;
        line-height:75rpx;
    }
    .point{
        display: flex;
        justify-content: space-between;
    }
    .info{
        width: 50%;
        text-align: center;
    }
    .info view:first-child{
        color: #4fb84a;
        font-size: 60rpx;
        letter-spacing: 2rpx;
    }
    .info view:nth-child(2){
        color: #444;
        font-size: 36rpx;
        letter-spacing: 1rpx;
        margin-top: 12rpx;
    }
</style>


