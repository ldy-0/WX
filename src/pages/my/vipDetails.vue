<template>
    <section>
        <view class="banner">
            <image src="../../images/img_8@2x.png"/>
        </view>
        <view class="center">
            <view wx:for = "{{list}}" wx:key class="itemMsg">
                <image src = "{{item.src}}"/>
                <view class="tag">
                    <text>{{item.title}}</text>
                    <text>{{item.describe}}</text>
                </view>
            </view>
        </view>
        <button @tap = "toBeVip">成为会员</button>
    </section>
</template>
<script>
    import wepy from "wepy";
    export default class vipDetails extends wepy.page {
        config = {
            navigationBarTitleText: "会员详情"
        };
        data = {
            list:[
                {
                    src:"../../images/icon_11_1@2x.png",
                    title:"购物折扣",
                    describe:"全场享受购物折扣",
                },
                {
                    src:"../../images/icon_11_2@2x.png",
                    title:"购物返积分",
                    describe:"积分当钱花",
                },
                {
                    src:"../../images/icon_11_3@2x.png",
                    title:"购物得佣金",
                    describe:"佣金可体现",
                },
                {
                    src:"../../images/icon_11_4@2x.png",
                    title:"分享赚钱",
                    describe:"分享赚佣金收益实时看",
                }
            ]
        };
        methods = {
            toBeVip() {
                wx.navigateTo({ url: "vipRegister" });
            }
        }
    }
</script>
<style scoped > 
    .banner {
        width: 750rpx;
        height: 450rpx;
    }
    .banner image{
        width: 100%;
        height: 100%;
    }
    .itemMsg {
        width: 100%;
        box-sizing: border-box;
        padding: 0 41rpx;
        overflow: hidden;
        margin: 24rpx 0;
    }
    .itemMsg image {
        width: 105rpx;
        height: 106rpx;
        margin-right: 42rpx;
        float: left;
    }
    .tag{
        letter-spacing: 1rpx;
        margin-top: 12rpx;
    }
    .tag text:first-child{
        color:#41cc6f;
        font-size: 29rpx;
        display: block;
    }
    .tag text:nth-child(2){
        color: #888;
        font-size: 25rpx;
    }
    button{
        width: 690rpx;
        height: 88rpx;
        background-color: #4fb84a;
        border-radius: 10rpx;
        color: #fff;
        font-size: 36rpx;
        border: none;
        outline: none;
    }
    .center{
        height: 618rpx;
        overflow: scroll;
    }
</style>



