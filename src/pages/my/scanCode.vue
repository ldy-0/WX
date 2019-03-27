<template>
    <section>
        <image src="../../images/bg_4@2x.png" class="bgImg"/>
        <view class="codeBox">
            <view class="relativeBox">
                <image src="../../images/bg_5@2x.png" class="codeBg"/>
                <view class="useInfo">
                    <open-data type = "userAvatarUrl" class="userAva icon" mode = "aspectFit"></open-data>
                    <open-data type = "userNickName" class="userNickName"></open-data>
                </view>
                <view class="code">
                    <image src = "../../images/img_4@2x.png">
                </view>
            </view>
        </view>
    </section>
</template>
<script>
import wepy from "wepy";
export default class ScanCode extends wepy.page {
    config = {
        navigationBarTitleText: "二维码"
    };
    data = {
       
    };
    methods = {
        
    }
}
</script>
<style scoped>
    .bgImg{
        width: 100%;
        height: 862rpx;
    }
    .codeBox{
        width: 690rpx;
        height: 820rpx;
        position: absolute;
        top: 100rpx;
        z-index: 333;
        box-sizing:border-box;
        padding:0 30rpx;

    }
    .relativeBox{
        position: relative;
        margin: 0 auto;
    }
    .codeBg{
        width: 690rpx;
        height: 820rpx;
    }
    .useInfo{
        position: absolute;
        top: -13rpx;
        left: 278rpx;
        overflow: hidden;
        text-align: center;
    }
    .useInfo .userAva{
        display: block;
        width: 128rpx;
        height: 128rpx;
        border-radius: 50%;
        overflow: hidden;
        border: 2rpx solid #76cd74;
    }
    .useInfo .userNickName{
        font-size: 28rpx;
        color: #222;
        margin-top: 24rpx;
    }
    .code{
        width: 458rpx;
        height: 458rpx;
        border: 1rpx solid forestgreen;
        position: absolute;
        top: 210rpx;
        left: 116rpx;
    }
    .code image{
        width: 100%;
        height: 100%;
    }
</style>

