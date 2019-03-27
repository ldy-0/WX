<template>
    <section>
        <view class="memberTotal">
            <view>100</view>
            <view>总人数(人)</view>
        </view>
        <view class="memberList">
            <view wx:for = "{{memberList}}" wx:key class="info">
                <view class="message">
                    <image src = "{{item.src}}"/>
                    <view>
                        <text>{{item.name}}</text>
                        <text>{{item.tell}}</text>
                    </view>
                </view>
                <view class="consume">
                    <text>总消费<text>{{item.consume}}</text>元</text>
                </view>
            </view>
        </view>
    </section>
</template>
<script>
import wepy from "wepy";
export default class MyGroup extends wepy.page {
    config = {
        navigationBarTitleText: "下级成员"
    };
    data = {
        memberList:[
            {
                src:"../../images/tab_wode_hl@2x.png",
                name:"快乐的小李",
                tell:"13967876765",
                consume:"1000",
            },
            {
                src:"../../images/tab_wode_hl@2x.png",
                name:"快乐的小王",
                tell:"13967876765",
                consume:"2000",
            }
        ]
       
    };
    methods = {
        
    }
}
</script>
<style scoped>
    section{
        background-color: rgb(248, 248, 248);
        min-height: 100vh;
    }
    .memberTotal{
        width: 100%;
        height: 272rpx;
        background-color: #fff;
        text-align: center;
        box-sizing: border-box;
        padding-top:48rpx;
    }
    .memberTotal view:first-child{
        color: #4fb84a;
        letter-spacing: 2rpx;
        font-size: 60rpx;
    }
    .memberTotal view:nth-child(2){
        color: #999;
        letter-spacing: 1rpx;
        font-size: 30rpx;
        margin-top: 34rpx;
    }
    .memberList{
        margin-top: 20rpx;
    }
    .info{
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 137rpx;
        box-sizing: border-box;
        padding: 26rpx 30rpx;
        background-color: #fff;
        margin-bottom: 1rpx;
    }
    .message{
        overflow: hidden;
    }
    .message image{
        width: 84rpx;
        height: 84rpx;
        border-radius: 50%;
        overflow: hidden;
        float: left;
        margin-right:20rpx;
    }
    .message view{
        display: flex;
        flex-direction: column;
        font-size: 28rpx;
        color: #333;
        line-height: 42rpx;
    }
    .consume{
        color: #4fb84a;
        font-size: 28rpx;
        line-height: 95rpx;
    }
</style>

